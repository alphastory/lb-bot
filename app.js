var http = require( 'https' );
var request = require( 'request' );
var Discord = require( 'discord.js' );

var mute = false;
var muteTimer;

var server = http.createServer().list( process.env.PORT || 5000 );
// server.listen( process.env.PORT || 5000 );

if( typeof localStorage === 'undefined' || localStorage === null ){
	var LocalStorage = require( 'node-localstorage' ).LocalStorage;
	localStorage = new LocalStorage( './scratch' );
}

// ====================================
// Battle.net Stuff
// ====================================
var bnetKey = 'q6k9yhwahdvafnmn58qsk3ubnn6sheer';
var bnetSecret = 'a5QxxT84eZhQbQMvP8Cddw82AKptzA82';

// ====================================
// Command List
// ====================================
var commands = [
	{
		cmd: '!help',
		res: 'Shows list of available commands.'
	},{
		cmd: '!ping',
		res: 'Responds with pong.'
	},{
		cmd: '!guildmaster',
		res: 'Will send user a Direct Message with the Guild Master\'s Battle.net Tag'
	},{
		cmd: '!ratings NAME-REALM',
		res: 'Will retrieve the character\'s PvP Ratings. (e.g., !ratings Lokien-Anub\'arak )'
	},{
		cmd: '!realmstatus',
		res: 'Will output realm status for each of the guild\'s connected realms.'
	},{
		cmd: '!about',
		res: 'Will output general information about the bot.'
	}
]

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

bot.on( 'message', function( message ){
	
// ========================================
// USER ACCESSIBLE COMMANDS
// ========================================
	// !help
	// ====================================
	// Send Commands
	// ====================================
	if( message.content.startsWith( '!help' ) ){
		bot.sendMessage( message, 'Command list sent to ' + message.author.toString() + ' via Direct Message.' );
		bot.sendMessage( message.author, '#Available Commands' );
		for( var i = 0; i < commands.length; i++ ){
			bot.sendMessage( message.author, '**' + commands[i].cmd + '**\n' + commands[i].res );
			// bot.sendMessage( message, commands[i].res );
		}
	}

	// ====================================
	// !addons
	// ====================================
	// Responds with required addons.
	// ====================================
	if( message.content.startsWith( '!addons' ) && !mute ){
		bot.sendMessage( message, 'Feature not yet added.' );
		muteBot();
	}

	// ====================================
	// !ping
	// ====================================
	// Ping-Pong!
	// ====================================
	if( message.content === '!ping' && !mute ){
		bot.reply( message, 'pong' );
		muteBot();
	}

	// ====================================
	// !ping
	// ====================================
	// Ping-Pong!
	// ====================================
	if( message.content.startsWith( 'Hey WB,' && !mute ) ){
		var msg = message.content.slice(8);
		console.log( message.author.username );
		if( message.author.username == 'Montygrail13' ){
			bot.sendMessage( message, 'Fuck you.' );
			muteBot();
			return;
		}

		if( msg.toLowerCase() === 'i\'m sad' ){
			bot.sendMessage( message, 'It\'s okay buddy. I\'m here. *-gently pats ' + message.author + '-*' );
			muteBot();
		}
	}

	// ====================================
	// !guildmaster
	// ====================================
	// Send the user a DM containing the
	// GM information
	// ====================================
	if( message.content === '!guildmaster' ){
		console.log( 'Sending PM to user for GM info.' );
		bot.sendMessage( message.author, 'The guild master is Lokien. His battletag is XtasyArmada#1751' );
		bot.reply( message, 'Please check your Direct Messages' );
	}

	// ====================================
	// !ratings <NAME-REALM>
	// ====================================
	// Send the user a DM containing the
	// GM information
	// ====================================
	if( message.content.startsWith( '!ratings' ) && !mute ){
		muteBot();
		var ts = Date.now();
		var param = message.content.split( ' ' )[1];
		var toon = param.split( '-' )[0];
		var realm = param.split( '-' )[1];
		bot.sendMessage( message, '*Fetching Ratings for ' + toon + '-' + realm + '. Please wait.*' );
		var url = 'https://us.api.battle.net/wow/character/' + realm + '/' + toon + '?fields=pvp&locale=en_US&apikey=' + bnetKey;

		// https.get( url, function( res ){
		request( url, function( error, res, body ){
			if( !error && res.statusCode === 200 ){
				var data = JSON.parse( res.body );
				var brackets = data.pvp.brackets;
				var two = brackets.ARENA_BRACKET_2v2.rating;
				var three = brackets.ARENA_BRACKET_3v3.rating;
				var rbg = brackets.ARENA_BRACKET_RBG.rating;

				var content = '**Arena Ratings for ' + toon + '-' + realm + '**';
					content += '\n2v2: ' + two;
					content += '\n3v3: ' + three;
					content += '\nRBG: ' + rbg;
					content += '\n*Received in ' + ( Date.now() - ts ) + 'ms.*'
				bot.sendMessage( message, content );
				return;
			}
		} );
	}

	// if( message.content.startsWith( '@SynBot' ) ){
	// 	bot.sendMessage( message, 'Fuck that guy.' );
	// }

	// if( message.content.startsWith( '~' ) ){
	// 	bot.sendMessage( message, 'Fuck that SynBot guy. I\'m much better.' );
	// }

	if( message.content.startsWith( '!realmstatus' ) && !mute ){
		muteBot();
		var ts = Date.now();
		var ourRealms = ['anubarak', 'garithos', 'crushridge', 'nathrezim', 'smolderthorn' ];
		var url = 'https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=' + bnetKey;
		request( url, function( error, res, body ){
			if( !error && res.statusCode === 200 ){
				var data = JSON.parse( res.body );
				var filteredRealms = data.realms.filter( function( realm ){
					return ourRealms.indexOf( realm.slug ) != -1;
				} );
				for( var i = 0; i < filteredRealms.length; i++ ){
					bot.sendMessage( message, '```\n' + filteredRealms[i].name + ' is ' + ( ( filteredRealms[i].status ) ? 'UP' : 'DOWN' ) + '\n```' );
					if( i === filteredRealms.length - 1 ){
						bot.sendMessage( message, '*Received in ' + ( Date.now() - ts ) + 'ms.*' );
					}
				}
			}
		} );
	}

	// ====================================
	// !about
	// ====================================
	// Provides information about the bot
	// ====================================
	if( message.content.startsWith( '!about' ) && !mute ){
		muteBot();
		var ts = Date.now();
		var content = '**Wretched-Bot**';
			content += '\nA Discord bot that has been developed and will be maintained by Lokien and Kizzim.';
			content += '\nVersion: 0.0.1';
		bot.sendMessage( message, content );
	}

	if( message.content.startsWith( '!mute' ) ){
		bot.sendMessage( message, 'I have been muted for 5 minutes.' );
		mute = true;
		muteTimer = setTimeout( function(){
			mute = false;
			bot.sendMessage( message, 'I am now unmuted' );
		}, 5 * 60000 );
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

function muteBot(){
	mute = true;
	muteTimer = setTimeout( function(){
		mute = false;
	}, 10000 );
}