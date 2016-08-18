var mute = require( '../helpers/mute' );

module.exports = function( bot, message ){

	params = message.content.split( ' ' );
	params.shift();

	var duration = Number( params[0] );
	console.log( duration );
	var multiplier = ( params[1].toLowerCase() === 'hours' ) ? ( 60 * 60 ) : ( params[1].toLowerCase() === 'minutes' ) ? ( 60 ) : 0;
	console.log( multiplier );
	var actual = duration * multiplier;

	bot.sendMessage( message, 'I have been muted for ' + params[0] + ' ' + params[1] + '.' );

	mute.activate( actual, function(){
		bot.sendMessage( message, 'I have been unmuted.' );
	} );
}