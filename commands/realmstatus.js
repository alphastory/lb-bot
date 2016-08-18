var request = require( 'request' );
var mute = require( '../helpers/mute' );
var bnet = require( '../helpers/bnet' );

module.exports = function( bot, message ){

	mute.activate( 10 );
	var ts = Date.now();
	var ourRealms = ['anubarak', 'garithos', 'crushridge', 'nathrezim', 'smolderthorn' ];
	var url = 'https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=' + bnet.key;
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