// ====================================
// Dependencies
// ====================================
var http = require( 'http' );
var Discord = require( 'discord.js' );
var mute = require( './helpers/mute' );

// ====================================
// Server Stuff
// ====================================
var server = http.createServer().listen( process.env.PORT || 5000 );

// ====================================
// Local Storage Stuff
// ====================================
if( typeof localStorage === 'undefined' || localStorage === null ){
	var LocalStorage = require( 'node-localstorage' ).LocalStorage;
	localStorage = new LocalStorage( './scratch' );
}

// ====================================
// Battle.net Stuff
// ====================================
var bnet = require( './helpers/bnet' );

// The Bot
var bot = new Discord.Client();

// ====================================
// Login to the Discord Service
// ====================================
bot.loginWithToken( 'MjE1MTkxMDk3NjQ1NzI3NzQ1.CpZGVQ.J9hIKBBStBpP69X3qGAHfDOkOTY', function( err, token ){
	if( err ){
		console.log( 'There was an error loggin in: ' + error );
		return;
	} else {
		console.log( 'Logged in. Token: ' + token );
	}
} );

// ====================================
// Command List
// ====================================
var help = require( './commands/help' );
var addons = require( './commands/addons' );
var guildmaster = require( './commands/guildmaster' );
var ratings = require( './commands/ratings' );
var realmstatus = require( './commands/realmstatus' );
var about = require( './commands/about' );
var shutup = require( './commands/shutup' );

// ====================================
// Command Handlers
// ====================================
bot.on( 'message', function( message ){
	
// ========================================
// USER ACCESSIBLE COMMANDS
// ========================================
	// !help
	// ====================================
	// Send Commands
	// ====================================
	if( message.content.startsWith( '!help' ) ){
		help( bot, message );
	}

	// ====================================
	// !addons
	// ====================================
	// Responds with required addons.
	// ====================================
	if( message.content.startsWith( '!addons' ) && !mute.muted ){
		addons( bot, message );
	}

	// ====================================
	// !ping
	// ====================================
	// Ping-Pong!
	// ====================================
	if( message.content.startsWith( '!ping' ) && !mute.muted ){
		mute.activate( 10 );
		bot.reply( message, 'pong' );
	}

	// ====================================
	// !guildmaster
	// ====================================
	// Send the user a DM containing the
	// GM information
	// ====================================
	if( message.content.startsWith( '!guildmaster' ) ){
		guildmaster( bot, message );
	}

	// ====================================
	// !ratings <NAME-REALM>
	// ====================================
	// Send the user a DM containing the
	// GM information
	// ====================================
	if( message.content.startsWith( '!ratings' ) && !mute.muted ){
		ratings( bot, message );
	}

	// ====================================
	// !realmstatus
	// ====================================
	// Send the user that status of 
	// our connected realms.
	// ====================================
	if( message.content.startsWith( '!realmstatus' ) && !mute.muted ){
		realmstatus( bot, message );
	}

	// ====================================
	// !about
	// ====================================
	// Provides information about the bot
	// ====================================
	if( message.content.startsWith( '!about' ) && !mute.muted ){
		about( bot, message );
	}

	// ====================================
	// !mute
	// ====================================
	// Mutes the bot for a specified
	// duration or for 5 minutes, by
	// default.
	// ====================================
	if( message.content.startsWith( '!shutup' ) ){
		shutup( bot, message );
	}

// ========================================
// CHARACTER INFORMATION
// ========================================
	// !addcharacter
	// ====================================
	if( message.content.startsWith( '!addcharacter' ) ){
		// Get an argument with the command
		var charName = message.content.split( ' ' )[1];
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

	// ====================================
	// !characters
	// ====================================
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
	
// ========================================
// DEVELOPER/ADMIN COMMANDS
// ========================================
	// !id
	// ====================================
	// Developer Information for user_id
	// ====================================
	if( message.content.startsWith( '!id' ) ){
		var user_id = message.author.id;
		bot.reply( message, 'Your ID is ' + user_id );
	}

	// ====================================
	// !log
	// ====================================
	// Send Admin Package information
	// ====================================
	if( message.content === '!log' ){
		console.log( message );
		bot.sendMessage( message, 'Data logged. Check shell bash.' )
	}


} );