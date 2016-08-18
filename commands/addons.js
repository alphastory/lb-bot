var mute = require( '../helpers/mute' );

module.exports = function( bot, message ){
	bot.sendMessage( message, 'Feature not yet added.' );
	mute.activate( 10 );
}