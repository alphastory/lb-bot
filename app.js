var http = require( 'http' );
var Discord = require( 'discord.js' );

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
	if( message.content === '!ping' ){
		bot.reply( message, 'pong' );
	}

	if( message.content === '!log' ){
		console.log( message );
		bot.sendMessage( message, 'Data logged. Check shell bash.' )
	}
} );