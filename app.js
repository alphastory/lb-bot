var http = require( 'http' );
var Discord = require( 'discord.js' );

if( typeof localStorage === 'undefined' || localStorage === null ){
	var LocalStorage = require( 'node-localstorage' ).LocalStorage;
	localStorage = new LocalStorage( './scratch' );
}

var bot = new Discord.Client();

bot.loginWithToken( 'MjE1MTkxMDk3NjQ1NzI3NzQ1.CpZGVQ.J9hIKBBStBpP69X3qGAHfDOkOTY', function( err, token ){
	if( err ){
		console.log( 'There was an error loggin in: ' + error );
		return;
	} else {
		console.log( 'Logged in. Token: ' + token );
	}
} );

bot.on( 'message', function( message ){

	// 
	if( message.content === '!ping' ){
		console.log( 'Ping-Pong' );
		bot.reply( message, 'pong' );
	}

	// Admin, show the contents of message.
	if( message.content === '!log' ){
		console.log( message );
		bot.sendMessage( message, 'Data logged. Check shell bash.' )
	}

	// Send Guild Master Information
	if( message.content === '!guildmaster' ){
		console.log( 'Sending PM to user for GM info.' );
		bot.sendMessage( message.author, 'The guild master is Lokien. His battletag is XtasyArmada#1751' );
		bot.reply( message, 'Please check your Direct Messages' );
	}

	if( message.content.startsWith( '!addcharacter' ) ){
		// Get an argument with the command
		var charName = message.content.split( ' ' )[1]
		var userData;
		if( localStorage.getItem( message.author.id ) ){
			userData = localStorage.getItem( message.author.id );
		} else {
			userData = {};
		}
		userData.characters = userData.characters || [];
		var characters = userData.characters;
		// var characters = ( userData.characters.length > 0 ) ? userData.characters : [];
		// message.content.split( ' ' )[2]
		// etc.
		// var user = bot.users.get( 'id', message.author.id );
		// console.log( characters );

		// var characters = bot.users.get( 'id', message.author.id ).get( 'characters' ) || bot.users.get( 'id', message.author.id ).add( 'characters' );
		characters.push( { id: characters.length, name: charName } );
		localStorage.setItem( message.author.id, userData );
		bot.sendMessage( message, 'Cached ' + charName + ' to your profile.' );
	}

	if( message.content === '!characters' ){

		var userData = localStorage.getItem( message.author.id );
		if( userData.characters !== null ){
			console.log( JSON.stringify( userData ) );
			// var characters = userData.characters;
			// for( var i = 0; i < characters.length; i++ ){
			// 	bot.sendMessage( message, characters[i] );
			// }
		} else {
			bot.sendMessage( message, 'No characters added. Use !addcharacter <your_character> to add a new character.' );
		}

	}

	if( message.content.startsWith( '!id' ) ){
		var user_id = message.author.id;
		bot.reply( message, 'Your ID is ' + user_id );
	}


} );