var mute = require( '../helpers/mute' );

module.exports = function( bot, message ){
	mute.activate( 10 );
	var ts = Date.now();
	var content = '**Wretched-Bot**';
		content += '\nA Discord bot that has been developed and will be maintained by Lokien and Kizzim.';
		content += '\nVersion: 0.1.0';
	bot.sendMessage( message, content );
}