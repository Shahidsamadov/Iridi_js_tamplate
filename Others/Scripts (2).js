var g_sRESOLUTION = 1;//0- tablet, 1 - phone
var g_oRoomsList = null;
var g_oWidgetsList = null;
var g_oSourcesList = null;
var RoomsBuff; //= HomeList;//IR.GetPage("Main page").GetItem("Home").Text.split("\n");
var WidgetsBuff = [];
var SourcesBuff = [];
var g_oActivitesList = null;
var ActivitesBuff = [];
var MainTitle = IR.GetItem("Main page").GetItem("Name page");
var SourceTitle = IR.GetItem("Main page").GetItem("Source page");
var WidgetOnPlanList = null;
var WidgetOnPlanBack;
var BackPopup = "BUTTON_BACK";
var SubscriberBuff = [];

var CurrentLocation;
var CurrentSource;
var previoussource;

var TargetLocation;
var TargetSource;

// Global static values
var g_nHexOnePercentOf29  = 255 / 20;
var g_n180PercentOf29     = 180 / 20;
var g_n180PercentOf100    = 180 / 100;
var g_nHexOnePercentOf100 = 255 / 100;
var g_n234OnePercentOf30  = 234 / 30;
var g_n234PercentOf100    = 360 / 100;
var g_n100PercentOf30     = 100 / 30;

var ACTXT = "Для воспроизведения музыки воспользуйтесь\n\nфункцией AirPlay на вашем iPhone, iPad или iMac.\n\nВ качестве источника выберите Music Home."

var ASTXT = "Для воспроизведения музыки воспользуйтесь\n\nфункцией AirPlay на вашем iPhone, iPad или iMac.\n\nВ качестве источника выберите Music Spa."

/**
  * Get project width and height
  * if width more than height then it is tablet
  * else it is phone
*/

IR.AddListener(IR.EVENT_START, 0, function()
{  
   IR.GetItem("LIST_ROOM_TABLET").GetItem("List").Type = 3;
   IR.GetItem("LIST_ROOM_TABLET").GetItem("List").Direction = 1;
   RoomsBuff = HomeList;
   MainTitle.Text = "Home";
   //SourceTitle.Text = "";
   g_sRESOLUTION = IR.GetPage("Main page").Width > IR.GetPage("Main page").Height ? 0 : 1;
   
   if (g_sRESOLUTION == 1)
   {
     g_oRoomsList = IR.GetItem("LIST_ALL_ROOMS_PHONE").GetItem("List");
     g_oWidgetsList = IR.GetItem("LIST_ROOM_PHONE").GetItem("List");
     g_oSourcesList = IR.GetItem("LIST_SOURCE_PHONE").GetItem("List");
     g_oActivitesList = IR.GetItem("LIST_PLANS_PHONE").GetItem("List");
     WidgetOnPlanList = IR.GetItem("LIST_WIDGET_PHONE").GetItem("List");
   }
   else
   {
     g_oRoomsList = IR.GetItem("LIST_ALL_ROOMS_TABLET").GetItem("List 1");
     g_oWidgetsList = IR.GetItem("LIST_ROOM_TABLET").GetItem("List");
     g_oActivitesList = IR.GetItem("LIST_PLANS_TABLET").GetItem("List");
     WidgetOnPlanList = IR.GetItem("LIST_WIDGET_TABLET").GetItem("List");
     WidgetOnPlanBack = IR.GetItem("LIST_WIDGET_BG_TABLET");
     
   }    
   FillRooms();
   listen();
   EnableGestures();
});

function FillRooms()
{  
   g_oRoomsList.Clear();
//   if (g_sRESOLUTION)
//      g_oRoomsList.AddPopup("PHONE_POPUPS_Photo_home (5)");
   
   for (var i = 0; i <= RoomsBuff.length - 1; i++)
   {
     if (RoomsBuff[i].length > 0)
     {
       g_oRoomsList.AddPopup(RoomsBuff[i]);
     }  
   }
   

   //g_oRoomsList.AddPopup("PHONE_POPUPS_End Popup Home");
   
   IR.ShowPopup(g_oRoomsList.Parent.Name);
   g_oRoomsList.ScrollEnabled = 0;
   //IR.ShowPopup("LIST_ALL_ROOMS_PHONE_STATIC");
   IR.ShowPopup("CONNECTING_POPUP");
   IR.SetTimeout(2000, seticonsource);
}

function CloseRoom()
{
//    DisableGestures();
    IR.HidePopup("LIST_ROOM_PHONE");
    IR.HidePopup("LIST_SOURCE_PHONE");
    IR.HidePopup("BUTTON_BACK");
    DeactivateSource(CurrentLocation, CurrentSource);
    IR.ShowPopup(g_oRoomsList.Parent.Name);
    MainTitle.Text = "Home";
    MainTitle.State = 0;
    //SourceTitle.Text = "";
    IR.Log("setting icon source");
    IR.SetTimeout(1000, seticonsource);
    displaymulticons();
    enableswipe = 0;
}

function OpenRoomCheck()
{
    CurrentSource = this.Text;
    CheckSourceBusy(CurrentLocation, CurrentSource, OpenRoom);
}

function CheckSourceBusy(location, source, callback)
{
    if (SourceBusy(location, source) == true)
    {
        IR.GetItem("SOURCE_BUSY").GetItem("Source").Visible = true;
        IR.ShowPopup("SOURCE_BUSY");
    }
    else
        callback();
}

function OpenRoomDeactivate()
{
    DeactivateSource(deactivateroom,deactivatesource);
    OpenRoom();
}

function OpenRoom()
{
  IR.HidePopup("SOURCE_BUSY");
  //CurrentSource = this.Text;
  
  
  if (DetectSource(CurrentLocation, CurrentSource) == false)
  {
      IR.Log("Source is not active, activating");
      if (ActivateSource(CurrentLocation, CurrentSource) == false)
      {
        IR.Log("source " + CurrentSource + " in " + CurrentLocation + " activation failed");
        //return;
      }
  }
  else
  {
      IR.Log("Source is already active");
  }
  
  if (CurrentSource == "Спутниковое")
  {
      if (CurrentLocation == "Кинотеатр")
      {
          IR.GetItem("SATELLITE_TV Remote small-version (11)").GetItem("Wait1").Visible = true;
          IR.GetItem("SATELLITE_TV Remote small-version (11)").GetItem("Wait2").Visible = true;
          IR.GetDevice("Humax").SetParameters({NetID: 8});
      }
      else
      {
          IR.GetItem("SATELLITE_TV Remote small-version (11)").GetItem("Wait1").Visible = false;
          IR.GetItem("SATELLITE_TV Remote small-version (11)").GetItem("Wait2").Visible = false;
          IR.GetDevice("Humax").SetParameters({NetID: 9});
      }
  }
  
  if (CurrentSource == "AirPlay")
  {
      if (CurrentLocation == "Кинотеатр" || CurrentLocation == "Бильярд")
      {
        IR.GetItem("AIRPLAY").GetItem("Text").Text = ACTXT;
      }
      else
      {
        IR.GetItem("AIRPLAY").GetItem("Text").Text = ASTXT;
      }
  }
  
  previoussource = CurrentSource;
  
//  IR.SetTimeout(1000, function() {  
      //IR.Log("Location " + asc[CurrentLocation]);
      //IR.Log("Level feedback " + IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Volume_Level"));
      g_oVolumeLevel.Value = IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Volume_Level");
      //IR.Log("Vol Val " + g_oVolumeLevel.Value);
      //IR.Log("Phantom feedback " + IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Volume_Level_Phantom"));
      g_oVolumeLevelPhantom.Value = IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Volume_Level");
      //IR.Log("Phantom Val " + g_oVolumeLevelPhantom.Value);
      IR.GetItem("VOLUME_WIDGET").GetItem("VolumeText").Value = IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Volume_Level") / 655;
      g_oMute.Value = IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Mute_Is_On");
      //g_oBassLevel.Value = (IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Bass_Level")<<16>>16);
      //g_oTrebleLevel.Value = (IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Treble_Level")<<16>>16);  
//  });
  
  var l_oTempPopup = null;
  WidgetsBuff = Rooms[CurrentSource];
  g_oWidgetsList.Clear();
  for (var i = 0; i <= WidgetsBuff.length - 1; i++)
  {
     g_oWidgetsList.AddPopup(WidgetsBuff[i]);
  } 
  
  g_oWidgetsList.SetPosition(0);
  IR.HidePopup(g_oRoomsList.Parent.Name);
  IR.ShowPopup(g_oWidgetsList.Parent.Name);
  g_oWidgetsList.ScrollEnabled = 0;
  IR.ShowPopup(BackPopup);
  MainTitle.State = 1;
  //MainTitle.Text = "<" + MainTitle.Text + ">";
  //SourceTitle.Text = CurrentSource;
//  EnableGestures(CurrentSource); 
  displaymulticons();
  enableswipe = 1;
  SwipeRight();
  UpdatePlayer();
}

function OpenSource()
{
   CurrentLocation = this.Text;

   SourceBuff = Sources[CurrentLocation];
   g_oSourcesList.SetPosition(0);
   g_oSourcesList.Clear();
   for (var i = 0; i <= SourceBuff.length - 1; i++)
   {
      g_oSourcesList.AddPopup(SourceBuff[i]);
   }
   IR.HidePopup(g_oRoomsList.Parent.Name);
   IR.HidePopup(this.Parent.Name);
   IR.ShowPopup(g_oSourcesList.Parent.Name);
   g_oSourcesList.ScrollEnabled = 0;
   MainTitle.Text = CurrentLocation;
   IR.ShowPopup(BackPopup);
   seticonvalue(CurrentLocation);
}

function OpenSource2()
{
   SourceBuff = Sources[CurrentLocation];
   g_oSourcesList.SetPosition(0);
   g_oSourcesList.Clear();
   for (var i = 0; i <= SourceBuff.length - 1; i++)
   {
      g_oSourcesList.AddPopup(SourceBuff[i]);
   }
   IR.HidePopup(g_oRoomsList.Parent.Name);
   IR.HidePopup(this.Parent.Name);
   IR.ShowPopup(g_oSourcesList.Parent.Name);
   g_oSourcesList.ScrollEnabled = 0;
   MainTitle.Text = CurrentLocation;
   IR.ShowPopup(BackPopup);
   seticonvalue(CurrentLocation);
   enableswipe = 0;
}

function OpenSource3(locationarg)
{
    CurrentLocation = locationarg;
   SourceBuff = Sources[CurrentLocation];
   g_oSourcesList.SetPosition(0);
   g_oSourcesList.Clear();
   for (var i = 0; i <= SourceBuff.length - 1; i++)
   {
      g_oSourcesList.AddPopup(SourceBuff[i]);
   }
   IR.HidePopup(g_oRoomsList.Parent.Name);
   IR.ShowPopup(g_oSourcesList.Parent.Name);
   g_oSourcesList.ScrollEnabled = 0;
   MainTitle.Text = CurrentLocation;
   IR.ShowPopup(BackPopup);
   seticonvalue(CurrentLocation);
}

function OpenRoomsPopup()
{
//  DisableGestures();
  IR.HidePopup(this.Parent.Name);
  IR.ShowPopup(g_oRoomsList.Parent.Name);
  //IR.ShowPopup("LIST_ALL_ROOMS_PHONE_STATIC");
  MainTitle.Text = "Home";
  MainTitle.State = 0;
  //SourceTitle.Text = "";
  IR.Log("Setting icon source");
  IR.SetTimeout(1000, seticonsource);
  displaymulticons();
  enableswipe = 0;
}

function OpenActivities()
{
  ActivitesBuff = Activites[this.Text];
  g_oActivitesList.SetPosition(0);
  g_oActivitesList.Clear();
  for (var i = 0; i <= ActivitesBuff.length - 1; i++)
  {
     g_oActivitesList.AddPopup(ActivitesBuff[i]);
  } 
  
  IR.HidePopup(g_oRoomsList.Parent.Name);
  
  IR.ShowPopup(g_oActivitesList.Parent.Name);
  MainTitle.Text = this.Text;
  IR.ShowPopup(BackPopup);
}

function ShowActivitiesPopup()
{
   enableswipe = 1;
   IR.HidePopup(WidgetOnPlanList.Parent.Name);
   
   if (!g_sRESOLUTION)
   {
      IR.HidePopup(WidgetOnPlanBack.Name);
   }else
   {   
      //IR.ShowPopup(g_oActivitesList.Parent.Name);
   }  
}

function OpenOnPlan()
{
   WidgetOnPlanList.SetPosition(0); 
   WidgetOnPlanList.Clear();
   var Widget = IR.GetVariable("Global.PlanWidget");   
   var buff = Widget.split(",");
   for (var i = 0; i <= buff.length - 1; i++)   
   {
      WidgetOnPlanList.AddPopup(buff[i]);
    }  
   if (g_sRESOLUTION)
   {
     //IR.HidePopup(g_oActivitesList.Parent.Name);
   } else
   {
     IR.ShowPopup(WidgetOnPlanBack.Name);
   }
  
   IR.ShowPopup(WidgetOnPlanList.Parent.Name);
   WidgetOnPlanList.ScrollEnabled = 0;  
}


function ClearListeners()
{
  var l_sElement = null;
  while (SubscriberBuff.length != 0)
  {
    l_sElement = SubscriberBuff.pop();
    IR.UnsubscribeTagChange(l_sElement);
  }
}

function AddDimmerListeners(in_sPopupName)
{

}

function AddCondListeners(in_sPopupName)
{

}


function AddPickerListeners(in_sPopupName)
{

}

//Set global listener
IR.SetGlobalListener(IR.EVENT_GLOBAL_TAG_CHANGE, function(name, value) 
{
     //IR.Log("Global Listener Activated: " + name + "\tValue: " + value);
     var item = name.split(".");
     switch (name)
     {
         case "Drivers.Crestron.Online":
            SetPopup("CONNECTING_POPUP", !value);
         break;
     }
});

IR.SubscribeTagChange("Drivers.Crestron.Online");
//IR.SubscribeTagChange("Drivers.Crestron.Splash");

function SetPopup(name, value)
{
      if (value)
      {
         IR.ShowPopup(name);
      }
      else
      {
         IR.HidePopup(name);
      }
}
