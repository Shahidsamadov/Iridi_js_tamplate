// For Two Popups
var YahooWeatherWidget = function(Name, Popup, PopupSmall, Zip)
{                                                                 //weather.yahooapis.com
   var Device = IR.CreateDevice(IR.DEVICE_CUSTOM_HTTP_TCP, Name, "query.yahooapis.com", 80);
                                                                  
   var iPopup = IR.GetItem(Popup);
   var iPopupSmall = IR.GetItem(PopupSmall);

   var iCity = iPopup.GetItem("City");
   var iCountry = iPopup.GetItem("Country");
   var iChill = iPopup.GetItem("Chill");
   var iDirection = iPopup.GetItem("Direction");
   var iSpeed = iPopup.GetItem("Speed");
   var iHumidity = iPopup.GetItem("Humidity");
   var iVisibility = iPopup.GetItem("Visibility");
   var iPressure = iPopup.GetItem("Pressure");
   var iRising = iPopup.GetItem("Rising");   
   var iSunrise = iPopup.GetItem("Sunrise");
   var iSunset = iPopup.GetItem("Sunset");
   var iPressure = iPopup.GetItem("Pressure");       
   
   var iToday_day = iPopup.GetItem("Today_day");    
   var iToday_date = iPopup.GetItem("Today_date");
   var iToday_high_low = iPopup.GetItem("Today_high_low");
   var iToday_text = iPopup.GetItem("Today_text");
   
   var iTommorow_day = iPopup.GetItem("Tommorow_day");
   var iTommorow_date = iPopup.GetItem("Tommorow_date");
   var iTommorow_high_low = iPopup.GetItem("Tommorow_high_low");
   var iTommorow_text = iPopup.GetItem("Tommorow_text");
                                                       
   var iWeather_image_today = iPopup.GetItem("Weather_image_today"); 
   var iWeather_image_today_bg = iPopup.GetItem("Weather_image_today_bg"); 
   var iWeather_image_tommorow = iPopup.GetItem("Weather_image_tommorow");     
   var iWeather_image_tommorow_bg = iPopup.GetItem("Weather_image_tommorow_bg"); 
   
   
   var iWeather_image_today2 = iPopupSmall.GetItem("Weather_image_today");
   var iWeather_image_tommorow2 = iPopupSmall.GetItem("Weather_image_tommorow");   
   
   var iToday_day2 = iPopupSmall.GetItem("Today_day"); 
   var iTommorow_day2 = iPopupSmall.GetItem("Tommorow_day"); 
   
   var iToday_date2 = iPopupSmall.GetItem("Today_date");
   var iTommorow_date2 = iPopupSmall.GetItem("Tommorow_date");
   
   var iToday_high_low2 = iPopupSmall.GetItem("Today_high_low");
   var iTommorow_high_low2 = iPopupSmall.GetItem("Tommorow_high_low");
   
   var iToday_text2 = iPopupSmall.GetItem("Today_text");
   var iTommorow_text2 = iPopupSmall.GetItem("Tommorow_text");
   
   var iPressure2 = iPopupSmall.GetItem("Pressure");    
   var iHumidity2 = iPopupSmall.GetItem("Humidity");
   
   var iRefresh = iPopup.GetItem("Refresh");
   var iRefresh2 = iPopupSmall.GetItem("Refresh");
   
   function AutoUpdate(){
         Device.Send(['GET,/v1/public/yql?q=' + 'select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+ Zip +'%22)%20and%20u%3D%22c%22' + '&format=json']);     //yahooQuery
      }; 
      
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
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE,iRefresh, AutoUpdate);
   IR.AddListener(IR.EVENT_ITEM_RELEASE,iRefresh2, AutoUpdate);
                                          
   IR.AddListener(IR.EVENT_START, 0, function()          
   {   
      AutoUpdate();        
      IR.SetInterval(1800000, AutoUpdate); 
   });
   
   IR.AddListener(IR.EVENT_RECEIVE_TEXT, Device, function(text)
   {
     var json = JSON.Parse(text).query;
     
     var image = LinkCreate(json.results.channel.item ["condition"]["code"])   
     if(iWeather_image_today != 0)  
         iWeather_image_today.GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
     if(iWeather_image_today_bg != 0){  
         iWeather_image_today_bg.GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/bkgnd/" + image + "-106755.jpg");  
         iWeather_image_today2.GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
        }
     image = LinkCreate(json.results.channel.item ["forecast"][1]["code"])             
     if(iWeather_image_tommorow != 0)
         iWeather_image_tommorow.GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
     if(iWeather_image_tommorow_bg != 0){
         iWeather_image_tommorow_bg.GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/bkgnd/" + image + "-106755.jpg");   
         iWeather_image_tommorow2.GetState(0).Image = ("http://l.yimg.com/os/mit/media/m/weather/images/icons/l/" + image + "-100567.png");
        }
     if(iCity != 0)     
         iCity.Text = json.results.channel ["location"]["city"];
     if(iCountry != 0)
         iCountry.Text = json.results.channel ["location"]["country"] + " " + json.results.channel ["location"]["region"]; 
     if(iChill != 0)
         iChill.Text = json.results.channel.item["condition"]["temp"] + "°" + json.results.channel ["units"]["temperature"];
     if(iDirection != 0)
         iDirection.Text = json.results.channel ["wind"]["direction"];
     if(iSpeed != 0)
         iSpeed.Text = json.results.channel ["wind"]["speed"] + " " + json.results.channel ["units"]["speed"];
     if(iHumidity != 0)      
         iHumidity.Text = json.results.channel ["atmosphere"]["humidity"] + "%";
     if(iVisibility != 0)  
         iVisibility.Text = json.results.channel ["atmosphere"]["visibility"] + " " + json.results.channel ["units"]["distance"]; 
     if(iPressure != 0) 
         iPressure.Text = json.results.channel ["atmosphere"]["pressure"] + " " + json.results.channel ["units"]["pressure"];
     if(iRising != 0) 
         iRising.Text = json.results.channel ["atmosphere"]["rising"];
     if(iSunrise != 0) 
         iSunrise.Text = json.results.channel ["astronomy"]["sunrise"];
     if(iSunset != 0) 
         iSunset.Text = json.results.channel ["astronomy"]["sunset"];       
     if(iToday_day != 0)     
         iToday_day.Text  = json.results.channel.item ["forecast"][0]["day"];
     if(iToday_date != 0)
         iToday_date.Text = json.results.channel.item ["forecast"][0]["date"];
     if(iToday_high_low != 0)
         iToday_high_low.Text = json.results.channel.item ["forecast"][0]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][0]["high"] + "°"+json.results.channel ["units"]["temperature"];
     if(iToday_text != 0)
         iToday_text.Text = json.results.channel.item["condition"]["text"];
     if(iTommorow_day != 0)
         iTommorow_day.Text = json.results.channel.item ["forecast"][1]["day"];
     if(iTommorow_date != 0)       
         iTommorow_date.Text = json.results.channel.item ["forecast"][1]["date"];
     if(iTommorow_high_low != 0)
         iTommorow_high_low.Text = json.results.channel.item ["forecast"][1]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][1]["high"] + "°"+json.results.channel ["units"]["temperature"];
     if(iTommorow_text != 0)
         iTommorow_text.Text = json.results.channel.item ["forecast"][1]["text"];
     if(iToday_day2 != 0)
         iToday_day2.Text = json.results.channel.item ["forecast"][0]["day"].split(" ");
     if(iToday_date2 != 0)       
         iToday_date2.Text = json.results.channel.item ["forecast"][0]["date"].split(" ")[0];
     if(iToday_high_low2 != 0)
         iToday_high_low2.Text = json.results.channel.item ["forecast"][0]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][2]["high"] + "°"+json.results.channel ["units"]["temperature"];
     if(iToday_text2 != 0)
         iToday_text2.Text = json.results.channel.item ["forecast"][0]["text"]; 
     if(iTommorow_day2 != 0)
         iTommorow_day2.Text = json.results.channel.item ["forecast"][1]["day"];
     if(iTommorow_date2 != 0)       
         iTommorow_date2.Text = json.results.channel.item ["forecast"][1]["date"].split(" ")[0];
     if(iTommorow_high_low2 != 0)
         iTommorow_high_low2.Text = json.results.channel.item ["forecast"][1]["low"] + "°"+json.results.channel ["units"]["temperature"]+" .. " + json.results.channel.item ["forecast"][2]["high"] + "°"+json.results.channel ["units"]["temperature"];
     if(iTommorow_text2 != 0)
         iTommorow_text2.Text = json.results.channel.item ["forecast"][1]["text"];  
     
     iPressure2.Text = json.results.channel ["atmosphere"]["pressure"] + " " + json.results.channel ["units"]["pressure"];
     iHumidity2.Text = json.results.channel ["atmosphere"]["humidity"] + "%"; 
   });
};        
var YahooThree = new YahooWeatherWidget("YahooBlack", "Yahoo Weather Black", "Weather", "44418");