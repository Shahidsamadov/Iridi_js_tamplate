function WeatherUA(device, page, list, zip, lang){

	// Items
	list = IR.GetItem(page).GetItem(list); 
	device = IR.GetDevice(device);
    
	// Variables
	var text_buf = "";
	var day = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	var idDay = 0;
	var next = 0;
	var time = 0;

   var humidity = " % humidity";
   var cels = "°c";
   var pressure = " mm Hg";
   var ms = " m/s";	
	
	// functions
	function Request(){	 
	  device.Send(['GET,/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+ zip +'%22)%20and%20u%3D%22c%22' + '&format=json']);
	  list.SetPosition(0);
    }         
	 
	function CircleDay(num){
	 
	  if (num >= 7)
	   return num - 7; 
	  else
	   return num;
	}
	 
	function convertCloud(num){
	 
	  if (num < 10) {return 0}
	  if (num < 20) {return 1}
	  if (num < 40) {return 2}
	  if (num < 60) {return 3}
	  if (num < 90) {return 4}
	  if (num >= 90){return 5}
	 }
	 
	function idWeekday(){
	 
	   switch(IR.GetVariable("System.Date.Weekday")){
	   
		case "Monday":
		  idDay = 0;
		break;    
	  
		case "Tuesday":
		  idDay = 1;
		break;  
	  
		case "Wednesday":
		  idDay = 2;
		break;  
	  
		case "Thursday":
		  idDay = 3;
		break;  
	  
		case "Friday":
		  idDay = 4;
		break;  
				 
		case "Saturday":
		 idDay = 5;
		break;
	  
		case "Sunday":
		  idDay = 6;
		break;
	  }
	}  
	  
	function checkdate(in_date){

		if(in_date >= 32) 
		   return in_date - 31;
		 else
		   return in_date;     
	}
	
	function MagicTime(time){
	
		 if(time - 2 < 9)
		  next = 5;

		 if(time - 2 >= 9 && time - 2 < 15)  
		  next = 4;

		 if(time - 2 >= 15 && time - 2 < 21)
		  next = 1;

		 if(time - 2 >= 21)
		  next = 2;                                                                                                                                  
	}
   
   function offline_days(){
   
      var date = IR.GetVariable("System.Date.Day");
      
      device.SetFeedback("Day 1", checkdate(date));
      device.SetFeedback("WeekDay 1", day[CircleDay(idDay)]);
      device.SetFeedback("Day 2", checkdate(date + 1));
      device.SetFeedback("WeekDay 2", day[CircleDay(idDay + 1)]);         
      device.SetFeedback("WeekDay 3", day[CircleDay(idDay + 2)]);
      device.SetFeedback("Day 3", checkdate(date + 2));
      device.SetFeedback("Day 4", checkdate(date + 3));
      device.SetFeedback("WeekDay 4", day[CircleDay(idDay + 3)]);
      device.SetFeedback("Day 5", checkdate(date + 4));
      device.SetFeedback("WeekDay 5", day[CircleDay(idDay + 4)]);
   }
   
   function clearTokens(){
   
      var clr_str = "--";
      
      device.SetFeedback("City", clr_str); 
      device.SetFeedback("Country", clr_str);
      device.SetFeedback("Temperature", clr_str + cels);     
      device.SetFeedback("Humidity", clr_str + humidity);       
      device.SetFeedback("Pressure", clr_str + pressure);
      device.SetFeedback("Wind", clr_str + ms); 
      device.SetFeedback("Cloud", clr_str);  
      
      for(var i = 1; i < 6; i++){
      
         device.SetFeedback("Temperature Day " + i, clr_str + "/" + clr_str+ cels);
         device.SetFeedback("Humidity Day " + i, clr_str+ ".." +  clr_str + humidity);
         device.SetFeedback("Pressure Day " + i, clr_str + ".." + clr_str + pressure);
         device.SetFeedback("Wind Day " + i, clr_str + ".." +  clr_str + ms);
         device.SetFeedback("Cloud Day " + i, clr_str);
      }  
   }
   // System function
   function LinkCreate(image){
      switch(image){
       case 27:
       case 29:
       case 31:
       case 33:
         return image += "n";
         break;     
       default: 
         return image += "d";
       };  
   };
   
	function Parser(text){    

      text_buf += text;
      
      var Can = (text.lastIndexOf("}}}}}}") != -1 || text.lastIndexOf('"results":null}}') != -1);
      if (Can == true)
      {
         list.SetPosition(1);
         var json = JSON.Parse(text_buf).query;
         
         device.SetFeedback("City",json.results.channel ["location"]["city"]); 
         device.SetFeedback("Country", json.results.channel ["location"]["country"] + " " + json.results.channel ["location"]["region"]);
         device.SetFeedback("Temperature", json.results.channel.item["condition"]["temp"] + "°" + json.results.channel ["units"]["temperature"]);     
         device.SetFeedback("Humidity", json.results.channel ["atmosphere"]["humidity"] + "%"); 
         device.SetFeedback("Pressure", json.results.channel ["atmosphere"]["pressure"] + " " + json.results.channel ["units"]["pressure"]);
         device.SetFeedback("Wind", json.results.channel ["wind"]["speed"] + " " + json.results.channel ["units"]["speed"]); 
         device.SetFeedback("Cloud", json.results.channel ["atmosphere"]["visibility"] + " " + json.results.channel ["units"]["distance"]); 
         //1
         device.SetFeedback("Temperature Day 1", json.results.channel.item ["forecast"][0]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][0]["high"] + "°"+json.results.channel ["units"]["temperature"]);
         device.SetFeedback("WeekDay 1", json.results.channel.item ["forecast"][0]["day"]);
         device.SetFeedback("Day 1", json.results.channel.item ["forecast"][0]["date"].split(" ")[0]);
         device.SetFeedback("Cloud Day 1", json.results.channel.item ["forecast"][0]["text"]);
         var image = LinkCreate(json.results.channel.item ["condition"]["code"])        
         IR.GetPopup("Office_Weather_2").GetItem("Item 2").GetState(0).Image  = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
         //2     
         device.SetFeedback("Temperature Day 2", json.results.channel.item ["forecast"][1]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][1]["high"] + "°"+json.results.channel ["units"]["temperature"]);
         device.SetFeedback("WeekDay 2", json.results.channel.item ["forecast"][1]["day"]);
         device.SetFeedback("Day 2", json.results.channel.item ["forecast"][1]["date"].split(" ")[0]);
         device.SetFeedback("Cloud Day 2", json.results.channel.item ["forecast"][1]["text"]);
         image = LinkCreate(json.results.channel.item ["forecast"][1]["code"]); 
         IR.GetPopup("Office_Weather_2").GetItem("Item 17").GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
         //3
         device.SetFeedback("Temperature Day 3", json.results.channel.item ["forecast"][2]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][2]["high"] + "°"+json.results.channel ["units"]["temperature"]);
         device.SetFeedback("WeekDay 3", json.results.channel.item ["forecast"][2]["day"]);
         device.SetFeedback("Day 3", json.results.channel.item ["forecast"][2]["date"].split(" ")[0]);
         device.SetFeedback("Cloud Day 3", json.results.channel.item ["forecast"][2]["text"]);
         image = LinkCreate(json.results.channel.item ["forecast"][2]["code"]); 
         IR.GetPopup("Office_Weather_2").GetItem("Item 18").GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
         //4
         device.SetFeedback("Temperature Day 4", json.results.channel.item ["forecast"][3]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][3]["high"] + "°"+json.results.channel ["units"]["temperature"]);
         device.SetFeedback("WeekDay 4", json.results.channel.item ["forecast"][3]["day"]);
         device.SetFeedback("Day 4", json.results.channel.item ["forecast"][3]["date"].split(" ")[0]);
         device.SetFeedback("Cloud Day 4", json.results.channel.item ["forecast"][3]["text"]);
         image = LinkCreate(json.results.channel.item ["forecast"][3]["code"]); 
         IR.GetPopup("Office_Weather_2").GetItem("Item 26").GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
         //5
         device.SetFeedback("Temperature Day 5", json.results.channel.item ["forecast"][4]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][4]["high"] + "°"+json.results.channel ["units"]["temperature"]);
         device.SetFeedback("WeekDay 5", json.results.channel.item ["forecast"][4]["day"]);
         device.SetFeedback("Day 5", json.results.channel.item ["forecast"][4]["date"].split(" ")[0]);
         device.SetFeedback("Cloud Day 5", json.results.channel.item ["forecast"][4]["text"]);
         image = LinkCreate(json.results.channel.item ["forecast"][4]["code"]); 
         IR.GetPopup("Office_Weather_2").GetItem("Item 34").GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
      }
      else 
         list.SetPosition(0);   
   };
	  
	// Subscribe
	IR.SetTimeout(300, Request);
	IR.SetInterval(1200000, Request);    
	IR.AddListener(IR.EVENT_CHANNEL_SET,  device, Request);
   IR.AddListener(IR.EVENT_RECEIVE_TEXT, device, Parser); 
};
var WeatherUA_1 = WeatherUA("Weather UA", "Office_Photo", "List", 29, "en");  