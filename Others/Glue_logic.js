var RoomNumber = {
  "Бассейн" : 1,
  "Парная": 3,
  "Спорт" : 4,
  "Кинотеатр": 0,
  "Бильярд": 0
}

var deactivatesource;
var deactivateroom;

function SourceBusy(location, source)
{
    if (location == "Кинотеатр" && source == "Радио" && IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Input_Is_Airplay") && IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Power_Is_On"))
    {
        deactivatesource = "AirPlay";
        deactivateroom = "Бильярд";
        return true;
    }
    if (location == "Бильярд" && source == "Радио" && IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_Airplay") && IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Power_Is_On"))
    {
        deactivatesource = "AirPlay";
        deactivateroom = "Кинотеатр";
        return true;
    }
    if (location == "Кинотеатр" && source == "AirPlay" && IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Input_Is_Net_Radio") && IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Power_Is_On"))
    {
        deactivatesource = "Радио";
        deactivateroom = "Бильярд";
        return true;
    }
    if (location == "Бильярд" && source == "AirPlay" && IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_Net_Radio") && IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Power_Is_On"))
    {
        deactivatesource = "Радио";
        deactivateroom = "Кинотеатр";
        return true;
    }
        
    if (location == "Кинотеатр" && source == "Радио" && IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Input_Is_Net_Radio") && IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Power_Is_On"))
    {
        deactivatesource = "Радио";
        deactivateroom = "Бильярд";
        return true;
    }
    if (location == "Бильярд" && source == "Радио" && IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_Net_Radio") && IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Power_Is_On"))
    {
        deactivatesource = "Радио";
        deactivateroom = "Кинотеатр";
        return true;
    }
    if (location == "Кинотеатр" && source == "AirPlay" && IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Input_Is_Airplay") && IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Power_Is_On"))
    {
        deactivatesource = "AirPlay";
        deactivateroom = "Бильярд";
        return true;
    }
    if (location == "Бильярд" && source == "AirPlay" && IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_Airplay") && IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Power_Is_On"))
    {
        deactivatesource = "AirPlay";
        deactivateroom = "Кинотеатр";
        return true;
    }
    
    switch (location)
        {
            case "Бассейн":
            case "Парная":
            case "Спорт":
                if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Main_Input_Is_Net_Radio") && source == "AirPlay" && IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Main_Power_Is_On"))
                {
                    deactivatesource = "Радио";
                    deactivateroom = location;
                    return true;
                }
                if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Main_Input_Is_Airplay") && source == "Радио" && IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Main_Power_Is_On"))
                {
                    deactivatesource = "AirPlay";
                    deactivateroom = location;
                    return true;
                }
                break;
        }    
    return false;
}

function deactivateallrooms(inputnumber)
{
    IR.Log("Deactivating rooms within input " + inputnumber);
         for (i = 1; i < 5; i++) {
             if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room" + i + "_Is_Src") == inputnumber)
             {
                    IR.Log("room number " + i + " found active");
                    IR.Log("Crestron_Reciever_Room" + i + "_Off");
                    SetValueAndWait("Crestron_Reciever_Room" + i + "_Src", 0, "Crestron_Reciever_Room" + i + "_Is_Src", function(){IR.Log("Room " + i + " Source is 0")});
                    SetOffAndWait("Crestron_Reciever_Room" + i + "_Off", "Crestron_Reciever_Room" + i + "_Is_On", function(){IR.Log("Crestron Reciever  Room " + i + " Off")});
             }   
         }
}

function DeactivateSource(location, source)
{
   switch (location)
   {
      case "Кинотеатр":
         IR.Log("Using Yamaha Reciever");
         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Connected") == 1)
         {
            IR.Log("Powering Yamaha main zone off");
            SetAndWait("Yamaha_Main_Power_Standby", "Yamaha_Main_Power_Is_Standby", function() {IR.Log("Yamaha main zone is now standby")});
         }
         else
         {
            IR.Log("Yamaha not connected");
         }
         IR.Log("Using Sony Projector");
         SetAndWait("Sony_Off", "Sony_Is_Off", function() {IR.Log("Sony Projector is now off")});
         switch (source)
         {
             case "Спутниковое":
                 //Pulse("Humax_1_Power");
             break;
             case "Apple TV":
                 Pulse("Apple_TV_Menu");
             break;
             case "Kodi":
                 //kodi.Request("Player.Stop", {playerid: active});
                 kodistop();
             break;
         }
      break;
      case "Бильярд":
         IR.Log("Using Yamaha Reciever");
         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Connected") == 1)
         {
            IR.Log("Powering Yamaha second zone on");
            SetAndWait("Yamaha_Zone2_Power_Standby", "Yamaha_Zone2_Power_Is_Standby", function(){IR.Log("Yamaha zone 2 is now standby")});
            //disable AirStop(tm)                     
            //IR.GetDevice("Crestron").Set("airstop_enable", 0);
         }
         else
         {
            IR.Log("Yamaha not connected");
         }
      break;
      case "Бассейн":
      case "Спорт":
      case "Парная":
         IR.Log("Using Crestron Reciever");
         //SetValueAndWait("Crestron_Reciever_Room" + RoomNumber[location] + "_Src", 0, "Crestron_Reciever_Room" + RoomNumber[location] + "_Is_Src", function(){IR.Log("Room " + RoomNumber[location] + " Source is 0")});
         //SetOffAndWait("Crestron_Reciever_Room" + RoomNumber[location] + "_Off", "Crestron_Reciever_Room" + RoomNumber[location] + "_Is_On", function(){IR.Log("Crestron Reciever  Room " + RoomNumber[location] + " Off")});
         switch (source)
         {
            case "Спутниковое":
              //Pulse("Humax_2_Power");
              Pulse("Samsung_Power_Off");
              deactivateallrooms(1);
            break;
            case "AirPlay":
            case "Радио":
              deactivateallrooms(2);
              IR.Log("Using Mini Yamaha Reciever");
              if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Connected") == 1)
              {
                IR.Log("Powering Mini Yamaha main zone off");
                SetAndWait("Mini_Yamaha_Main_Power_Standby", "Mini_Yamaha_Main_Power_Is_Standby", function(){IR.Log("Mini Yamaha is now standby")});
              }
              else
              {
                 IR.Log("Mini Yamaha not connected");
              }
            break;
         }
      break;
   }
}

function ActivateSource(location, source)
{
   switch (location)
   {
      case "Кинотеатр":
         IR.Log("Using Yamaha Reciever");
         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Connected") == 1)
         {
                IR.Log("Powering Yamaha main zone on");                   
                IR.GetDevice("Crestron").Set("airstop_disable", 1);
                
                IR.SetTimeout(1000, function(){
                                      IR.GetDevice("Crestron").Set("airstop_disable", 0);
                                   });                
                
                SetAndWait("Yamaha_Main_Power_On", "Yamaha_Main_Power_Is_On", function()
                {
                   IR.SetTimeout(2000, function () {
                       IR.GetDevice("Crestron").Set("Yamaha_Main_Volume", IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Volume_Level"));
                   });
                   switch (source)
                   {
                      case "Спутниковое":
                         IR.Log("Sattelite seq started");
                         Pulse("Humax_1_0");
                         SetAndWait("Yamaha_Main_Input_AV2", "Yamaha_Main_Input_Is_AV2", function(){IR.Log("Input is AV2")});
                         SetAndWait("Sony_On", "Sony_Is_On", function() {IR.Log("Sony Projector is now on")});
                         IR.Log("Sattelite seq over");
                         IR.GetItem("SATELLITE_TV Remote small-version (11)").GetItem("Wait1").Visible = true;
                         IR.GetItem("SATELLITE_TV Remote small-version (11)").GetItem("Wait2").Visible = true;
                         //pause appletv
                         Pulse("Apple_TV_Menu");
                         //stop kodi
                         kodistop();
                         return true;
                      break;
                      case "Apple TV":
                         IR.Log("Apple TV seq started");
                         SetAndWait("Yamaha_Main_Input_AV1", "Yamaha_Main_Input_Is_AV1", function(){IR.Log("Input is AV1")});
                         SetAndWait("Sony_On", "Sony_Is_On", function() {IR.Log("Sony Projector is now on")});
                         Pulse("Apple_TV_Menu");
                         //stop kodi
                         kodistop();
                         return true;
                      break;
                      case "AirPlay":
                         IR.Log("Airplay seq started");
                         SetAndWait("Yamaha_Main_Input_Airplay", "Yamaha_Main_Input_Is_Airplay", function(){IR.Log("Input is Airplay")});
                         SetAndWait("Sony_Off", "Sony_Is_Off", function() {IR.Log("Sony Projector is now off")});
                         //pause appletv
                         Pulse("Apple_TV_Menu");
                         //stop kodi
                         kodistop();
                         return true;
                      break;
                      case "Радио":
                         IR.Log("Radio seq started");
                         SetAndWait("Yamaha_Main_Input_Net_Radio", "Yamaha_Main_Input_Is_Net_Radio", function(){IR.Log("Input is Net Radio")});
                         SetAndWait("Sony_Off", "Sony_Is_Off", function() {IR.Log("Sony Projector is now off")});
                         //pause appletv
                         Pulse("Apple_TV_Menu");
                         //stop kodi
                         kodistop();
                         return true;
                      break;
                      case "Kodi":
                         IR.Log("Kodi seq started");
                         SetAndWait("Yamaha_Main_Input_AV3", "Yamaha_Main_Input_Is_AV3", function(){IR.Log("Input is AV3")});
                         SetAndWait("Sony_On", "Sony_Is_On", function() {IR.Log("Sony Projector is now on")});
                         // cho ot esche naern
                         UpdatePlayer();
                         //pause appletv
                         Pulse("Apple_TV_Menu");
                         return true;
                      break;
                      case "XBOX":
                          IR.Log("XBOX seq started");
                          SetAndWait("Yamaha_Main_Input_AV4", "Yamaha_Main_Input_Is_AV4", function(){IR.Log("Input is AV4")});
                          SetAndWait("Sony_On", "Sony_Is_On", function() {IR.Log("Sony Projector is now on")});
                          Pulse("Apple_TV_Menu");
                          kodistop();
                          return true;
                      break;
                   }
                });
         }
         else
         {
            IR.Log("Yamaha not connected");
            return false;
         }
      break;
      case "Бильярд":
         IR.Log("Using Yamaha Reciever");
         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Connected") == 1)
         {
            IR.Log("Powering Yamaha second zone on");
            SetAndWait("Yamaha_Zone2_Power_On", "Yamaha_Zone2_Power_Is_On", function()
            {
               IR.GetDevice("Crestron").Set("Yamaha_Zone2_Volume", IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Volume_Level"));
               switch (source)
               {
                  case "AirPlay":
                     IR.Log("Airplay zone2 seq started");
                     SetAndWait("Yamaha_Zone2_Input_Airplay", "Yamaha_Zone2_Input_Is_Airplay", function(){IR.Log("Input is Airplay")});
                     //enable AirStop(tm)                     
                     //IR.GetDevice("Crestron").Set("airstop_enable", 1);
                     return true;
                  break;
                  case "Радио":
                     IR.Log("Radio zone2 seq started");
                     SetAndWait("Yamaha_Zone2_Input_Net_Radio", "Yamaha_Zone2_Input_Is_Net_Radio", function(){IR.Log("Input is Net Radio")});
                     return true;
                  break;
               }
            });
         }
         else
         {
            IR.Log("Yamaha not connected");
            return false;
         }
      break;
      case "Бассейн":
      case "Спорт":
      case "Парная":
         IR.Log("Using Crestron Reciever");
         SetAndWait("Crestron_Reciever_Room" + RoomNumber[location] + "_On", "Crestron_Reciever_Room" + RoomNumber[location] + "_Is_On", function(){IR.Log("Crestron Reciever  Room " + RoomNumber[location] + " On")});
         switch (source)
         {
            case "Спутниковое":
              IR.Log("Using Humax satellite Reciever");
              IR.Log("Sattelite seq started");
              IR.Log("Powering Humax on");
              Pulse("Humax_2_0");
              IR.Log("Powering Samsung TV on");
              Pulse("Samsung_Power_On");
              IR.SetTimeout(3000, function() {Pulse("Samsung_Hdmi_1")});
              IR.SetTimeout(5000, function() {  IR.GetDevice("Crestron").Set("Samsung_Volume_Down", 1);     });
              IR.SetTimeout(10000, function() {  IR.GetDevice("Crestron").Set("Samsung_Volume_Down", 0);     });
              SetValueAndWait("Crestron_Reciever_Room" + RoomNumber[location] + "_Src", 1, "Crestron_Reciever_Room" + RoomNumber[location] + "_Is_Src", function(){IR.Log("Room " + RoomNumber[location] + " Source is 1")});
              //magic
            break;
            case "AirPlay":
              if (location == "Спорт")
                  shutdowntv();
              IR.Log("Using Mini Yamaha Reciever");
              if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Connected") == 1)
              {
                IR.Log("Powering Mini Yamaha main zone on");
                IR.Log("startairplay1");
                SetAndWait("Mini_Yamaha_Main_Power_On", "Mini_Yamaha_Main_Power_Is_On", function()
                {
                  IR.Log("Mini Yamaha Airplay seq started");
                  IR.Log("startairplay2");
                  Pulse("Mini_Yamaha_Main_Input_Airplay");
                  SetAndWait("Mini_Yamaha_Main_Input_Airplay", "Mini_Yamaha_Main_Input_Is_Airplay", function(){IR.Log("Input is Airplay")});
                  SetValueAndWait("Crestron_Reciever_Room" + RoomNumber[location] + "_Src", 2, "Crestron_Reciever_Room" + RoomNumber[location] + "_Is_Src", function(){IR.Log("Room " + RoomNumber[location] + " Source is 2")});
                  return true;
                });
              }
              else
              {
                 IR.Log("Mini Yamaha not connected");
                 return false;
              }
            break;
            case "Радио":
              if (location == "Спорт")
                  shutdowntv();
              IR.Log("Using Mini Yamaha Reciever");
              if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Connected") == 1)
              {
                IR.Log("Powering Mini Yamaha main zone on");
                SetAndWait("Mini_Yamaha_Main_Power_On", "Mini_Yamaha_Main_Power_Is_On", function()
                {
                  IR.Log("Mini Yamaha Radio seq started");
                  SetAndWait("Mini_Yamaha_Main_Input_Net_Radio", "Mini_Yamaha_Main_Input_Is_Net_Radio", function(){IR.Log("Input is Net Radio")});
                  SetValueAndWait("Crestron_Reciever_Room" + RoomNumber[location] + "_Src", 2, "Crestron_Reciever_Room" + RoomNumber[location] + "_Is_Src", function(){IR.Log("Room " + RoomNumber[location] + " Source is 2")});
                  return true;
                });
              }
              else
              {
                 IR.Log("Mini Yamaha not connected");
                 return false;
              }
            break;
         }
      break;
   }   
   return true;
}

function shutdowntv()
{
    if(DetectSource("Спорт", "Спутниковое"))
    {
        Pulse("Samsung_Power_Off");
        //SetValueAndWait("Crestron_Reciever_Room4_Src", 0, "Crestron_Reciever_Room4_Is_Src", function(){IR.Log("Room 4 Source is 0")});
        SetOffAndWait("Crestron_Reciever_Room4_Off", "Crestron_Reciever_Room4_Is_On", function(){IR.Log("Crestron Reciever  Room 4 Off")});
    }
}

function SetOffAndWait(tokentoset, tokentowait, callback)
{
   Pulse(tokentoset);
   var interval = IR.SetInterval(100, function() {
   if (IR.GetDevice("Crestron").GetFeedback(tokentowait) == 0)
       {
           IR.ClearInterval(interval);
           callback();
       }
   });
}

function SetAndWait(tokentoset, tokentowait, callback)
{
   Pulse(tokentoset);
   var interval = IR.SetInterval(100, function() {
   if (IR.GetDevice("Crestron").GetFeedback(tokentowait) == 1)
       {
           IR.ClearInterval(interval);
           callback();
       }
   });
}

function SetValueAndWait(tokentoset, value, tokentowait, callback)
{
   IR.Log("Set value " + tokentoset + " to " + value + " and wait for " + tokentowait);
   IR.GetDevice("Crestron").Set(tokentoset, value);
   var interval = IR.SetInterval(100, function() {
   if (IR.GetDevice("Crestron").GetFeedback(tokentowait) == value)
       {
           IR.ClearInterval(interval);
           callback();
       }
   });
}

function Pulse(tokentopulse)
{
   IR.GetDevice("Crestron").Set(tokentopulse, 1);
   IR.SetTimeout(1, function(){
      IR.GetDevice("Crestron").Set(tokentopulse, 0);
   });
}
