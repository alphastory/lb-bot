var request = require( 'request' );
var mute = require( '../helpers/mute' );
var bnet = require( '../helpers/bnet' );

module.exports = function( bot, message ){

	mute.activate( 10 );
	var ts = Date.now();
	var param = message.content.split( ' ' )[1];
	var toon = param.split( '-' )[0];
	var realm = param.split( '-' )[1];
	bot.sendMessage( message, '*Fetching Ratings for ' + toon + '-' + realm + '. Please wait.*' );
	var url = 'https://us.api.battle.net/wow/character/' + realm + '/' + toon + '?fields=pvp&locale=en_US&apikey=' + bnet.key;

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