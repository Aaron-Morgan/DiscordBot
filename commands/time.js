const { SlashCommandBuilder } = require('@discordjs/builders');
const token = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('Converts day(Today/Tomorrow) and time(format: 00:00AM/PM) to local time zone!')
        .addStringOption(option => option.setName('time').setDescription('Your local time.')),
        async execute(interaction) {
            var timeInput = interaction.options.getString('time');
            var user = interaction.user.tag;
            var dayInput = /^([a-z]+)?\s*(\d\d?):?(\d\d)?\s*(am|pm)?$/im.exec(timeInput);
            var outputDate = new Date();
            var timezones = token.timezone;
            
            console.log(dayInput[1]+'-'+dayInput[2]+'-'+dayInput[3]+'-'+dayInput[4]);
            
            console.log(user);

            if (!(typeof dayInput[1] === 'undefined') && dayInput[1].toLowerCase() == 'tomorrow' ) {outputDate.setDate(outputDate.getDate()+1);}
            if (!(typeof dayInput[4] === 'undefined') && dayInput[2] > 12){throw 'Use a number smaller than 12 if you are using am/pm'}
            if (1 < dayInput[2] > 24){throw 'Please use an hour between 1-24'}
            if (0 < dayInput[3] > 59){throw 'Please use minutes between 00-59'}

            if ( dayInput[4].toLowerCase() == 'pm' ) {
                if(dayInput[2] == 12 ){
                    outputDate.setHours(dayInput[2]);
                } else {
                    outputDate.setHours(parseInt(dayInput[2]) + 12);
                }
            } else {
                if(dayInput[2] == 12 ){
                    outputDate.setHours(parseInt(dayInput[2]) + 12);
                } else {
                    outputDate.setHours(dayInput[2]);
                }
            }

            if (typeof dayInput[3] == 'undefined'){
                outputDate.setMinutes(0);
            } else {
                outputDate.setMinutes(dayInput[3]);
            }

            
                if (timezones.sierra.find(user)>0) {
                   outputDate.setTime(outputDate.getTime()+9000000);
                } else if (timezones.alpha.find(user)>0) {
                    outputDate.setTime(outputDate.getTime()-12600000);
                } else if (timezones.quebec.find(user)>0){ 
                    outputDate.setTime(outputDate.getTime()+5400000);
                }
            
            
            await interaction.reply( 'We Gaming on: <t:' + (outputDate.getTime()/1000|0) +':f>?' );
        }
}