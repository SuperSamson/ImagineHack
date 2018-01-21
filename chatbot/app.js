/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
var EVENT_INFO = {
	"Activity": [{
			"type": "Activity",
			"properties": {
				"id": 00001,
				"CourseName": "Happy Tutorial Group",
				"Organizer": "St. James' Settlement",
				"Venue": "St. James' Center",
				"Speaker": "Mr. KO",
				"EventDay": "2018-03-21",				
				"StartTime": "2018-03-21 16:00:00",
				"EndTime": "2018-03-21 18:00:00",
				"Price": 20
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00002,
				"CourseName": "Basketball",
				"Organizer": "St. James' Settlement",
				"Venue": "St. James' Center",
				"Speaker": "Mr. KO",
				"EventDay": "2018-05-23",					
				"StartTime": "2018-05-23 16:00",
				"EndTime": "2018-05-23 18:00",
				"Price": 10
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00003,
				"CourseName": "Football",
				"Organizer": "St. James' Settlement",
				"Venue": "St. James' Center",
				"Speaker": "Ms. KO",
				"EventDay": "2018-05-29",					
				"StartTime": "2018-05-29 16:00",
				"EndTime": "2018-05-29 18:00",
				"Price": 10
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00004,
				"CourseName": "Swimming",
				"Organizer": "YAN OI TONG",
				"Venue": "Yan Oi Tong Community Centre",
				"Speaker": "Mr. LEE",
				"EventDay": "2018-06-10",					
				"StartTime": "2018-06-10 16:00:00",
				"EndTime": "2018-06-10 18:00:00",
				"Price": 25
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00005,
				"CourseName": "Quick input method class",
				"Organizer": "YAN OI TONG",
				"Venue": "Yan Oi Tong Community Centre",
				"Speaker": "Mr. LI",
				"EventDay": "2018-06-15",					
				"StartTime": "2018-06-15 16:00:00",
				"EndTime": "2018-06-15 18:00:00",
				"Price": 50
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00006,
				"CourseName": "Rubbish Transformation",
				"Organizer": "YAN OI TONG",
				"Venue": "Yan Oi Tong Community Centre",
				"Speaker": "Mr. KU",
				"EventDay": "2018-08-26",					
				"StartTime": "2018-08-26 16:00:00",
				"EndTime": "2018-08-26 18:00:00",
				"Price": 60
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00001,
				"CourseName": "Junior Master Chief",
				"Organizer": "YMCA",
				"Venue": "YMCA Jordan Centre",
				"Speaker": "Ms. CHEUNG",
				"EventDay": "2018-10-1",					
				"StartTime": "2018-10-1 16:00:00",
				"EndTime": "2018-10-1 18:00:00",
				"Price": 100
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00007,
				"CourseName": "Island Travel",
				"Organizer": "YMCA",
				"Venue": "YMCA Jordan Centre",
				"Speaker": "Ms. CHUI",
				"EventDay": "2018-11-13",					
				"StartTime": "2018-11-13 16:00:00",
				"EndTime": "2018-11-13 18:00:00",
				"Price": 10
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00008,
				"CourseName": "Chat Group",
				"Organizer": "YMCA",
				"Venue": "YMCA Jordan Centre",
				"Speaker": "Ms. CHENG",
				"EventDay": "2018-11-21",					
				"StartTime": "2018-11-21 16:00:00",
				"EndTime": "2018-11-21 18:00:00",
				"Price": 50
			},
			"geometry": null
		},
		{
			"type": "Activity",
			"properties": {
				"id": 00009,
				"CourseName": "Happy Day",
				"Organizer": "YMCA",
				"Venue": "YMCA Jordan Centre",
				"Speaker": "Ms. WONG",
				"EventDay": "2018-12-31",					
				"StartTime": "2018-12-31 16:00:00",
				"EndTime": "2018-12-31 18:00:00",
				"Price": 0
			},
			"geometry": null
		}
	]
};

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('Greeting', (session) => {
    session.send('You reached Greeting intent, you said \'%s\'.', session.message.text);
})
.matches('Help', (session) => {
    session.send('You reached Help intent, you said \'%s\'.', session.message.text);
})
.matches('Cancel', (session) => {
    session.send('You reached Cancel intent, you said \'%s\'.', session.message.text);
})
.matches('None', (session) => {
    session.send("Hi... I'm the note bot sample. I can create new notes, read saved notes to you and delete notes.");

   // If the object for storing notes in session.userData doesn't exist yet, initialize it
   if (!session.userData.notes) {
       session.userData.notes = {};
       console.log("initializing userData.notes in default message handler");
   }
})
.matches('getEventWithDate', [(session, args, next) => {
    var intent = args.intent;     
    var date = builder.EntityRecognizer.findEntity(args.entities, "builtin.datetimeV2.date");
        
    var input_time = null;
    if (date){
        input_time = new Date(date.resolution.values[0].timex);
		input_time.setFullYear(2018); 
        var input_day_timestamp = input_time.getTime(); 
        var input_second_day_timestamp = input_day_timestamp + 3600*24*1000; 
        
 		var events = getEventWithTimeRange(input_day_timestamp, input_second_day_timestamp); 	
		var events_msg = events.map((ev)=>{	
			var s_time = new Date(ev.StartTime); 
			var s_yr = s_time.getFullYear();
			var s_mo = s_time.getMonth()+1;
			var s_dt = s_time.getDate();
			var start_time = s_mo+"/"+s_dt+"/"+s_yr; 
			
			var e_time = new Date(ev.StartTime); 
			var e_yr = e_time.getFullYear();
			var e_mo = e_time.getMonth()+1;
			var e_dt = e_time.getDate();			
			var end_time = e_mo+"/"+e_dt+"/"+e_yr; 
	        
			return(
				"&nbsp;Event: " + ev.CourseName + "<br/>" + 
				"   Start At " + start_time + "<br/>" + 
				"   End At " + end_time + "<br/><br/>"); 	
		});
        if(events_msg.length===0){
            session.send("Sorry, so far we don't have event for that day...Maybe try another one?");
            // display all currently available event;
            session.beginDialog('getAllEvents');  
        } else{ 		
            var return_msg = "Here are the events: <br/>" + events_msg; 
    		session.endDialog(return_msg);   
        }
        
    } else { 
        session.endDialog("sorry, cannot understand your time, can you change the format and try again?");
    }
    // { values: [ { timex: '2018-01-21', type: 'date', value: '2018-01-21'})
    //console.log("======================", event_timestamp); 
}])
.matches('getEventWithTimeRange', [(session, args, next) => {
    console.log("============ the args: ", args);
    var intent = args.intent;     
    var date_range = builder.EntityRecognizer.findEntity(args.entities, "builtin.datetimeV2.daterange");
    var date_time_range = builder.EntityRecognizer.findEntity(args.entities, "builtin.datetimeV2.datetimerange");	
    var date = null; 
	if(date_time_range){
		date = date_time_range; 
	}else{
		date = date_range; 
	}
	    //console.log("============ the date: ", date_time_range);            
	    //console.log("============ the date: ", date_range);            
	
    var input_s_time = null;
    var input_e_time = null;	
    console.log("============ the date: ", date.resolution);            
    if (date){
        input_s_time = new Date(date.resolution.values[0].start);
        input_e_time = new Date(date.resolution.values[0].end);		
		input_s_time.setFullYear(2018); 
		input_e_time.setFullYear(2018); 
        var input_s_timestamp = input_s_time.getTime(); 
		var input_e_timestamp = input_e_time.getTime(); 
      
	    console.log("============ the input_s_time: ", input_s_time);  
        console.log("============ the input_e_time: ", input_e_time);     
		  
 		var events = getEventWithTimeRange(input_s_timestamp, input_e_timestamp); 	
		var events_msg = events.map((ev)=>{	
			var s_time = new Date(ev.StartTime); 
			var s_yr = s_time.getFullYear();
			var s_mo = s_time.getMonth()+1;
			var s_dt = s_time.getDate();
			var start_time = s_mo+"/"+s_dt+"/"+s_yr; 
			
			var e_time = new Date(ev.StartTime); 
			var e_yr = e_time.getFullYear();
			var e_mo = e_time.getMonth()+1;
			var e_dt = e_time.getDate();			
			var end_time = e_mo+"/"+e_dt+"/"+e_yr; 
	        
			return(
				"&nbsp;Event: " + ev.CourseName + "<br/>" + 
				"   Start At " + start_time + "<br/>" + 
				"   End At " + end_time + "<br/><br/>"); 	
		});
        if(events_msg.length===0){
            session.send("Sorry, so far we don't have event during that period...Maybe try another one?");
            // display all currently available event;
            session.beginDialog('getAllEvents');  
        } else{ 		
            var return_msg = "Here are the events: <br/>" + events_msg; 
    		session.endDialog(return_msg);   
        }        
    } else { 
        session.endDialog("sorry, cannot understand at least one of the time you inputted, can you change the format and try again?");
    } 
}])
.matches('register', [
	function (session, args, next){
		var intent = args.intent; 
		var eventName = builder.EntityRecognizer.findEntity(args.entities, 'courses');		
		if(eventName){			
			session.dialogData.eventName = eventName.entity; 
			next(); 
		}else{
			session.beginDialog('askForEventName');
		}
	},
    function (session, results, next) {
		if(results.response){
	        session.dialogData.eventName = results.response;
		}
        session.send(`Registed event ${session.dialogData.eventName} for you!`);
        session.endDialog("See you then!");
    }
])
.matches('recommend', [ (session) => {
		var sports_event = [
			{
				"id": 00002,
				"CourseName": "Basketball",
				"Organizer": "St. James' Settlement",
				"Venue": "St. James' Center",
				"Speaker": "Mr. KO",
				"EventDay": "2018-05-23",					
				"StartTime": "2018-05-23 16:00",
				"EndTime": "2018-05-23 18:00",
				"Price": 10
			},
			{	
				"id": 00003,
				"CourseName": "Football",
				"Organizer": "St. James' Settlement",
				"Venue": "St. James' Center",
				"Speaker": "Ms. KO",
				"EventDay": "2018-05-29",					
				"StartTime": "2018-05-29 16:00",
				"EndTime": "2018-05-29 18:00",
				"Price": 10
			},
			{
				"CourseName": "Swimming",
				"Organizer": "YAN OI TONG",
				"Venue": "Yan Oi Tong Community Centre",
				"Speaker": "Mr. LEE",
				"EventDay": "2018-06-10",					
				"StartTime": "2018-06-10 16:00:00",
				"EndTime": "2018-06-10 18:00:00",
				"Price": 25
			}
		];
		
		var sports_events_msg = sports_event.map((ev)=>{
		var s_time = new Date(ev.StartTime); 
		var s_yr = s_time.getFullYear();
		var s_mo = s_time.getMonth()+1;
		var s_dt = s_time.getDate();
		var s_hr = s_time.getHours();		
		var start_time = s_mo+"-"+s_dt+"-"+s_yr+" "+s_hr+":00"; 
		
		var e_time = new Date(ev.EndTime); 
		var e_yr = e_time.getFullYear();
		var e_mo = e_time.getMonth()+1;
		var e_dt = e_time.getDate();
		var e_hr = e_time.getHours();							
		var end_time = e_mo+"/"+e_dt+"/"+e_yr+" "+e_hr+":00"; 
					
		return(
			"   Event: " + ev.CourseName + "<br/>" + 
			"   Start At " + start_time + "<br/>" + 
			"   End At " + end_time + "<br/><br/>"); 	
		}); 
		
		session.endDialog("Here are some events about sports: <br />"+sports_events_msg);
	}
])
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents);    

bot.dialog('getAllEvents', [
	function(session){
		var events = getAllEvents(); 	
		var events_msg = events.map((ev)=>{
			var s_time = new Date(ev.StartTime); 
			var s_yr = s_time.getFullYear();
			var s_mo = s_time.getMonth()+1;
			var s_dt = s_time.getDate();
			var s_hr = s_time.getHours();		
			var start_time = s_mo+"-"+s_dt+"-"+s_yr+" "+s_hr+":00"; 
			
			var e_time = new Date(ev.EndTime); 
			var e_yr = e_time.getFullYear();
			var e_mo = e_time.getMonth()+1;
			var e_dt = e_time.getDate();			
			var e_hr = e_time.getHours();							
			var end_time = e_mo+"/"+e_dt+"/"+e_yr+" "+e_hr+":00"; 
						
			return(
				"   Event: " + ev.CourseName + "<br/>" + 
				"   Start At " + start_time + "<br/>" + 
				"   End At " + end_time + "<br/><br/>"); 	
		}); 
		var return_msg = "And you may want to check our some other events here :)<br/>"+events_msg; 
		session.endDialog(return_msg);
	}
])

// =========== 
// HELPER FUNCTIONS
// ===========
function getAllEvents(){
	// return name and time 
	// for detain info, further enter name to check detail: 
	var events = [];
	var all_events = EVENT_INFO.Activity; 
	var len = all_events.length; 
	for (var i = 0; i < len; i++){
		events.push({
			CourseName: all_events[i].properties.CourseName,
			StartTime: all_events[i].properties.StartTime,
			EndTime: all_events[i].properties.EndTime
		});
	}
	return events; 
}

function getEventWithTimeRange(startTime, endTime){ 	
	//console.log("==== start_time: ", startTime, '==endTime: ', endTime);    
	
	var events = [];
	var all_events = EVENT_INFO.Activity; 

	var len = all_events.length; 
	for (var i = 0; i < len; i++){
        var ev_s_time = new Date(all_events[i].properties.StartTime).getTime();
        var ev_e_time = new Date(all_events[i].properties.EndTime).getTime();   
		     
		//console.log('=========', all_events[i].properties.StartTime, "===", all_events[i].properties.EndTime);        
		//console.log('=========', ev_s_time, "===", ev_e_time);
		if(startTime <= ev_s_time && ev_e_time < endTime){
			events.push({
			CourseName: all_events[i].properties.CourseName,
			StartTime: all_events[i].properties.StartTime,
			EndTime: all_events[i].properties.EndTime
			}); 		
		}
	}
	return events; 
}

/*
	==================
	sub-dialog (for register)
	==================
*/
bot.dialog('askForEventName',[
	function(session){
		builder.Prompts.text(session, "Hi! What's the event you want to register? (event name)");
	},
	function(session, results){
		session.endDialogWithResult(results); 
	}
]);