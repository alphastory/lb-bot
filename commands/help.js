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
];

module.exports = function( bot, message ){
	bot.sendMessage( message, 'Command list sent to ' + message.author.toString() + ' via Direct Message.' );
	bot.sendMessage( message.author, '#Available Commands' );
	for( var i = 0; i < commands.length; i++ ){
		bot.sendMessage( message.author, '**' + commands[i].cmd + '**\n' + commands[i].res );
	}
}