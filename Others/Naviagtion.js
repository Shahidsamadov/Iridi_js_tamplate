//////////////////////////////////////////////////////////////// CLASS HOME ////
var Home = function()
{
  //-------------------------------------------------------
  // Data Home
  //------------------------------------------------------- 
  this.DriverName;
  this.device;
  this.nameMemmory = "";
  this.PrevPage = ["Home"];
  this.PrevCounter = 0;
  this.Remote = ["Sonos", "Audio", "Radio", "XBOX", "DVD", "TV"];
  
  //-------------------------------------------------------
  // Home Initialization
  //------------------------------------------------------- 
  function Initialization()
  {
     // Connect
     this.device = IR.GetDevice(this.DriverName);
     
     // Next Space
     var that    = this;
     
     // DEFAULT Data
     IR.SetVariable("Drivers." + that.DriverName + ".Room", "Home");
     IR.SetVariable("Tokens.ModeAuto", 1);  
     IR.SetVariable("Tokens.ModeOff", 0);
     IR.SetVariable("Tokens.ModeHeat", 0);
     IR.SetVariable("Tokens.ModeCool", 0);
     
     // Show Room
     function ShowRoom(name)
     {
       IR.ShowPopup("Room");
       IR.ShowPopup("LeftUpTV");
       IR.ShowPopup("Room_Scenario");
       IR.ShowPopup("LeftDownSonos");
       IR.ShowPopup("hidePopup");
       
       if (that.nameMemmory != "Back")
       {
          that.PrevCounter += 1;
          that.PrevPage[that.PrevCounter] = name;
       }
       that.nameMemmory = "";
       IR.SetVariable("Drivers." + that.DriverName + ".Room", name);
       
       if (Think == "no")
       {
          HouseDO = 0;
       }
       for(var i = 0; i < that.Remote.length; i++)
       {
       IR.SetVariable("Drivers." + that.DriverName + "." + that.Remote[i], 0); 
       }
     };
     
     // Show Remote
     function ShowRemote(name)
     {
       if (IR.GetVariable("Drivers." + that.DriverName + "." + name) == 0 )
       {
       IR.ShowPopup(name);
       IR.ShowPopup("hideDown");
       
        if ((that.nameMemmory != "Back") && (that.PrevCounter < 2))
        {
          that.PrevCounter += 1;
          that.PrevPage[that.PrevCounter] = name;
        }
       that.nameMemmory = "";
       IR.SetVariable("Drivers." + that.DriverName + ".Room", name); 
       IR.SetVariable("Drivers." + that.DriverName + ".PrevRoom", that.PrevPage[that.PrevCounter-1]);
       for(var i = 0; i < that.Remote.length; i++)
       {
       IR.SetVariable("Drivers." + that.DriverName + "." + that.Remote[i], 0); 
       }
       IR.SetVariable("Drivers." + that.DriverName + "." + name, 1);
       }
       else
       {
        that.PrevCounter -= 1;
        ShowRoom(that.PrevPage[that.PrevCounter]);
       }
     }; 
     
     //-------------------------------------------------------
     // Activate function
     //------------------------------------------------------- 
     IR.AddListener(IR.EVENT_CHANNEL_SET, this.device, function(name)
     {       
      // Back
      if (name == "Back")
      {
        that.nameMemmory = name;
        name = that.PrevPage[that.PrevCounter-1];
        if (that.PrevCounter > 0) 
        {
        that.PrevCounter -=1;
        }
        else
        {
        name = "Home"
        }
      }      
      // Other
      switch(name)
      {
       case "Home":     
       if(Think == "yes")
       {
       IR.ShowPopup("Home_Rooms");
       IR.ShowPopup("Home_Photo");
       IR.ShowPopup("Home_Scenario");
       IR.ShowPopup("Home_Time");
       IR.ShowPopup("Home_Weather");
       
       IR.SetVariable("Drivers." + that.DriverName + ".Room", name);
       
       that.PrevCounter = 0; 
       that.nameMemmory = "";
       
       HouseDO = 1;
       }         
       break;
       
       case "Bedroom one":
       ShowRoom(name);          
       break;
       
       case "Bathroom":
       ShowRoom(name);
       break;
       
       case "Kitchen":
       ShowRoom(name);
       break;
       
       case "Kids room":
       ShowRoom(name);
       break;
       
       case "Theater":
       ShowRoom(name);
       break;
       
       case "Garage":
       ShowRoom(name);
       break;
       
       case "Bedroom two":
       ShowRoom(name);
       break;
       
       case "Hall":
       ShowRoom(name);
       break;
       
       case "Entry":
       ShowRoom(name);
       break;
       
       case "Climat":
       IR.ShowPopup("GroupClimat_Content");
       if (GroupClimat_SelectItems > 0)
       {
       IR.ShowPopup("GroupClimat_Settings");
       }
       else
       {
       IR.ShowPopup("hideRight");
       }
       IR.ShowPopup("GroupClimat_Down");
       IR.ShowPopup("hideOther");
       IR.ShowPopup("hidePopup");
       
       IR.SetVariable("Drivers." + that.DriverName + ".Room", name);
       
       if (Think == "no")
       {
          HouseDO = 0;
       }      
       break;
       
       case "Lights":  
       IR.ShowPopup("GroupLight_Content");
       IR.ShowPopup("hideOther");
       IR.ShowPopup("hidePopup");
       IR.ShowPopup("hideRight");
       IR.ShowPopup("hideDown");
             
       IR.SetVariable("Drivers." + that.DriverName + ".Room", name);
       
       if (Think == "no")
       {
          HouseDO = 0;
       }
       break;
       
       case "Sound":
       IR.ShowPopup("GroupSound_Content");
       if (GroupSound_SelectItems > 0)
       {
       IR.ShowPopup("GroupSound_Settings");
       }
       else
       {
       IR.ShowPopup("hideRight");
       }
       IR.ShowPopup("GroupSound_Down");
       IR.ShowPopup("hideOther");
       IR.ShowPopup("hidePopup");
       
       IR.SetVariable("Drivers." + that.DriverName + ".Room", name);
       
       if (Think == "no")
       {
          HouseDO = 0;
       }
       break;
       
       case "Cameras":
       IR.ShowPopup("GroupCamera_Content");
       IR.ShowPopup("CameraView6");
       IR.ShowPopup("Camera_Time");
       IR.ShowPopup("hideDown");
       IR.ShowPopup("hideOther");
       
       IR.SetVariable("Drivers." + that.DriverName + ".Room", name);
       
       if (Think == "no")
       {
          HouseDO = 0;
       }
       break;
       
       case "Sonos":
       ShowRemote(name);
       break;
       
       case "XBOX":
       ShowRemote(name);
       break;
       
       case "DVD":
       ShowRemote(name);
       break;
       
       case "TV":
       ShowRemote(name);
       break;
       
       case "Radio":
       ShowRemote(name);
       break;
       
       case "Audio":
       ShowRemote(name);
       break;
      }
     }); // End Activate function
  }; // End Home Initialization 
  
  //------------------------------------------------------- 
  // Public
  //------------------------------------------------------- 
  this.Init  = Initialization;
   
}; // End Home Initialization 
//////////////////////////////////////////////////////////////////// USER ////// 
var iRidium = new Home();
iRidium.DriverName = "Home";
iRidium.Init();

GroupClimat_Change = [false,false,false,false,false,false,false,false,false,false,false,false,false];
GroupClimat_SelectItems = 0;
_GroupTemp = 0;
NewTemp = [17,17,17,17,17,17,17,17,17,17,17,17,17];

GroupSound_Change = [false,false,false,false,false,false,false,false,false,false,false,false,false];
GroupSound_SelectItems = 0;
_GroupSound = 0;
NewSound = [17,17,17,17,17,17,17,17,17,17,17,17,17];
SaveItem = 1;
SaveItemSound = 1;

// Color Picker
function ColorPicker()
{
 IR.GetItem("Room").GetItem("Item 66").GetState(0).FillColor = IR.GetItem("setColor").GetItem("Item 1").PickColor;
}
// DEFAULT List
IR.AddListener(IR.EVENT_START, 0, function()
{
  IR.GetItem("Home_Rooms").GetItem("Item 1").CreateItem(1,1,{});
  IR.GetItem("Home_Scenario").GetItem("Item 1").CreateItem(1,1,{});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(1,1,{});
  IR.GetItem("GroupLight_Content").GetItem("Item 1").CreateItem(1,1,{});  
  IR.GetItem("GroupCamera_Content").GetItem("Item 1").CreateItem(1,1,{});
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(1,1,{});
  IR.GetItem("Room_Scenario").GetItem("Item 1").CreateItem(1,1,{}); 
  Sonos_lists();
  CreateCameras();
  CreateClimat();
  CreateSound();
});

////////////////////////////////////////////////////////////////////////////////
// Cameras
function CreateCameras()
{
 for(var i = 1; i<9;i++)
  {
  IR.GetItem("GroupCamera_Content").GetItem("Item 1").CreateItem(i, 1, {});
  IR.GetItem("GroupCamera_Content").GetItem("Item 1").CreateItem(i, 3, {Text: "Camera "+i});
  }
  IR.GetItem("GroupCamera_Content").GetItem("Item 1").CreateItem(1, 1, {X: 8});
  
  IR.AddListener(IR.EVENT_ITEM_SELECT, IR.GetItem("GroupCamera_Content").GetItem("Item 1"), function(item, subItem)
  {
  IR.ShowPopup("CameraView"+item);
  IR.ShowPopup("Camera_Time");
  for(var i = 1; i<9;i++)
  {
  IR.GetItem("GroupCamera_Content").GetItem("Item 1").CreateItem(i, 1, {X: 398});
  }
  IR.GetItem("GroupCamera_Content").GetItem("Item 1").CreateItem(item, 1, {X: 8});    
  });
}; 
////////////////////////////////////////////////////////////////////////////////
// Climat
// Temp Group
function ReloadSelectItem()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupClimat_Change[i] == true)
 {
 IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 9, {Text: IR.GetVariable("Drivers." + "Home" + ".GroupTemp").toFixed(0)+"°"});
 IR.SetVariable("Drivers." + "Home" + ".Temp" + i, IR.GetVariable("Drivers." + "Home" + ".GroupTemp"));
 }
 } 
};
// Mode Off Group
function SelectItemOff()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupClimat_Change[i] == true)
 { 
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 15, {X: 356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 16, {X: 1356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 17, {X: 1356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 18, {X: 1356});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".ModeOff", 1)
 IR.SetVariable("Drivers." + "Home" + ".ModeAuto", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeHeat", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeCool", 0)
 };
// Mode Auto Group
function SelectItemAuto()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupClimat_Change[i] == true)
 { 
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 16, {X: 424});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 15, {X: 1356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 17, {X: 1356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 18, {X: 1356});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".ModeOff", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeAuto", 1)
 IR.SetVariable("Drivers." + "Home" + ".ModeHeat", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeCool", 0)
 };
// Mode Heat Group
function SelectItemHeat()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupClimat_Change[i] == true)
 { 
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 17, {X: 492});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 16, {X: 1356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 15, {X: 1356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 18, {X: 1356});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".ModeOff", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeAuto", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeHeat", 1)
 IR.SetVariable("Drivers." + "Home" + ".ModeCool", 0)
 };
// Mode Cool Group
function SelectItemCool()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupClimat_Change[i] == true)
 { 
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 18, {X: 560});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 16, {X: 1356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 17, {X: 1356});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 15, {X: 1356});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".ModeOff", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeAuto", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeHeat", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeCool", 1)
 };

// Fan Group
function SelectItemFan()
{
 if (IR.GetVariable("Drivers." + "Home" + ".Fan") == 0)
 { 
 for(var i = 1; i<13;i++)
 {
 if (GroupClimat_Change[i] == true)
 { 
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 19, {X: 636});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".Fan", 1)
 }
 else
 { 
 for(var i = 1; i<13;i++)
 {
 if (GroupClimat_Change[i] == true)
 { 
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 19, {X: 1636});    
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".Fan", 0)
 } 
};
// Temp one
function ReloadItem()
{
 IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(SaveItem, 9, {Text: IR.GetVariable("Drivers." + "Home" + ".Temp" + SaveItem).toFixed(0)+"°"}); 
};
// Create List and GUI
function CreateClimat()
{
 aRooms = ["","","Bedroom one", "Bathroom", "Kids room","","Kitchen", "Entry", "Garage", "","Theater", "Bedroom two", "Hall"];
 aFloor = ["","Upper floor","","","","Main floor","","","","Lower floor"];
 
 IR.SetVariable("Drivers." + "Home" + ".Fan", 0)
 IR.SetVariable("Drivers." + "Home" + ".ModeOff", 1)
 for(var i = 1; i<13;i++)
  {
  if((i == 1) || (i == 5) || (i == 9))
  {
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 14, {Text: aFloor[i], X: 8});
  }
  else
  {
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 12, {Text: aRooms[i]});
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 16, {X: 424});
  IR.SetVariable("Drivers." + "Home" + ".Temp" + i, Math.floor(Math.random()*17)+15)
  IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(i, 9, {Text: IR.GetVariable("Drivers." + "Home" + ".Temp" + i).toFixed(0)+"°"}); 
  }
  }
  IR.AddListener(IR.EVENT_ITEM_SELECT, IR.GetItem("GroupClimat_Content").GetItem("Item 1"), function(item, subItem)
  {
  IR.Log(subItem)
  switch(subItem)
  {
  case 11:
  if (GroupClimat_Change[item] == true)
  {
      GroupClimat_Change[item] = false;
      GroupClimat_SelectItems = GroupClimat_SelectItems - 1;
      IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 1, {X: -1400});

  }
  else
  {
     GroupClimat_Change[item] = true;
     GroupClimat_SelectItems = GroupClimat_SelectItems + 1;
     IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 1, {X: 8});
     
     _GroupClimat = NewTemp[item-1];       // По последней выбранной

  }

    if (GroupClimat_SelectItems == 0)
    {
     IR.ShowPopup("hideRight");
     GroupTemp  = 0;
     _GroupTemp = 0;
    }
    else
    {
     IR.ShowPopup("GroupClimat_Settings");
    }          
           
    IR.SetVariable("Drivers." + "Home" + ".GroupTemp", _GroupClimat);
  break;
  
  case 2:
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 15, {X: 356}); 
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 16, {X: 1356});  
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 17, {X: 1356});     
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 18, {X: 1356});  
  break;
  case 3:
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 15, {X: 1356}); 
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 16, {X: 424});  
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 17, {X: 1356});     
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 18, {X: 1356});  
  break;
  case 4:
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 15, {X: 1356}); 
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 16, {X: 1356});  
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 17, {X: 492});     
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 18, {X: 1356}); 
  break;
  case 5:
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 15, {X: 1356}); 
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 16, {X: 1356});  
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 17, {X: 1356});     
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 18, {X: 560});
  break;
  case 7:
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 19, {X: 636});
  break;
  case 19:
    IR.GetItem("GroupClimat_Content").GetItem("Item 1").CreateItem(item, 19, {X: 1636});
  break;
  case 8:
    IR.ShowPopup("setTemp"+item);
    SaveItem = item;
  break;
  }
  });
  
    // Select All
    IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("GroupClimat_Down").GetItem("Item 1"), function(item, subItem)
    { 
    GroupClimat = IR.GetItem("GroupClimat_Content").GetItem("Item 1")
   
    for (var i = 1; i<13; i++) 
    {
    if((i == 1) || (i == 5) || (i == 9))
    {
    //
    }
    else
    {
    GroupClimat.CreateItem(i, 1, {X: 8});        
    GroupClimat_Change[i] = true;
    }
    }
    GroupClimat_SelectItems = 9;
    _GroupTemp = NewTemp[8]; 
    IR.ShowPopup("GroupClimat_Settings");
    IR.SetVariable("Drivers." + "Home" + ".GroupTemp", _GroupTemp);
    });
   
    // Deselect All
    IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("GroupClimat_Down").GetItem("Item 2"), function(item, subItem)
    { 
    GroupClimat = IR.GetItem("GroupClimat_Content").GetItem("Item 1")
   
    for (var i = 1; i<13; i++) 
    {
    GroupClimat.CreateItem(i, 1, {X: 1200});        
    GroupClimat_Change[i] = false;
    }    
    GroupClimat_SelectItems = 0;
    _GroupTemp = NewTemp[8]; 
    IR.HidePopup("GroupClimat_Settings");
    IR.SetVariable("Drivers." + "Home" + ".GroupTemp", _GroupTemp); 
    });
} 
////////////////////////////////////////////////////////////////////////////////
// Sound
// On / Off Group
function SelectOff()
{
 if (IR.GetVariable("Drivers." + "Home" + ".Off") == 0)
 {
 for(var i = 1; i<13;i++)
 {
 if (GroupSound_Change[i] == true)
 { 
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 11, {X: 257});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".Off", 1)
 }
 else
 {
 for(var i = 1; i<13;i++)
 {
 if (GroupSound_Change[i] == true)
 { 
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 11, {X: 1357});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".Off", 0)
 }
 };
 // Mute Group
function SelectMute()
{
if (IR.GetVariable("Drivers." + "Home" + ".Mute") == 0)
 {
 for(var i = 1; i<13;i++)
 {
 if (GroupSound_Change[i] == true)
 { 
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 12, {X: 671});
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 6, {Value: IR.GetVariable("Drivers." + "Home" + ".GroupSound")});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".Mute", 1)
 }
 else
 {
 for(var i = 1; i<13;i++)
 {
 if (GroupSound_Change[i] == true)
 { 
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 12, {X: 1671});
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 6, {Value: IR.GetVariable("Drivers." + "Home" + ".GroupSound")});
 }
 }
 IR.SetVariable("Drivers." + "Home" + ".Mute", 0)
 }
 };
 
// Slider Sound
function SelectSlider()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupSound_Change[i] == true)
 { 
   if (IR.GetVariable("Drivers." + "Home" + ".GroupSound") == 0)
   {
    IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 12, {X: 671});
   }
   else
   {
    IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 12, {X: 1671});
   }
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 6, {Value: IR.GetVariable("Drivers." + "Home" + ".GroupSound")});
 }
 }
};
// Sonos set
function SelectSonos()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupSound_Change[i] == true)
 { 
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 9, {Text: "Sonos"}); 
 }
 }
};
// Radio set
function SelectRadio()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupSound_Change[i] == true)
 { 
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 9, {Text: "Radio"}); 
 }
 }
}; 
// Audio set
function SelectAudio()
{
 for(var i = 1; i<13;i++)
 {
 if (GroupSound_Change[i] == true)
 { 
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 9, {Text: "Audio"}); 
 }
 }
}; 

// Sonos set one
function oneSonos()
{
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(SaveItemSound, 9, {Text: "Sonos"});
  IR.HidePopup("GroupSound_setSource" + SaveItemSound); 
};
// Radio set one
function oneRadio()
{
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(SaveItemSound, 9, {Text: "Audio"});
  IR.HidePopup("GroupSound_setSource" + SaveItemSound); 
};
// Audio set one
function oneAudio()
{
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(SaveItemSound, 9, {Text: "Radio"});
  IR.HidePopup("GroupSound_setSource" + SaveItemSound); 
};
// Create List 
function CreateSound()
{
 aRooms = ["","","Bedroom one", "Bathroom", "Kids room","","Kitchen", "Entry", "Garage", "","Theater", "Bedroom two", "Hall"];
 aFloor = ["","Upper floor","","","","Main floor","","","","Lower floor"];
 for(var i = 1; i<13;i++)
  {
  if((i == 1) || (i == 5) || (i == 9))
  {
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 10, {Text: aFloor[i], X: 8});
  }
  else
  {
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 4, {Text: aRooms[i]});
  IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(i, 6, {Value: Math.floor(Math.random()*85)+15});
  }
  }
  IR.AddListener(IR.EVENT_ITEM_SELECT, IR.GetItem("GroupSound_Content").GetItem("Item 1"), function(item, subItem)
  {
  switch(subItem)
  {
  case 5:
  IR.ShowPopup("GroupSound_setSource"+item);
  SaveItemSound = item;
  break;
  
  case 7:
   IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(item, 11, {X: 257}); 
  break;
  
  case 11:
     IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(item, 11, {X: 1357});
  break;
  
  case 8:
     IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(item, 12, {X: 671});
     IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(item, 6, {Value: 0});
  break;
  
  case 12:
    IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(item, 12, {X: 1671});
    IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(item, 6, {Value: 100});
  break;
  
  case 3:
  if (GroupSound_Change[item] == true)
  {
      GroupSound_Change[item] = false;
      GroupSound_SelectItems = GroupSound_SelectItems - 1;
      IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(item, 1, {X: -1400});

  }
  else
  {
     GroupSound_Change[item] = true;
     GroupSound_SelectItems = GroupSound_SelectItems + 1;
     IR.GetItem("GroupSound_Content").GetItem("Item 1").CreateItem(item, 1, {X: 8});
     
     _GroupSound = NewSound[item-1];       // По последней выбранной

  }

    if (GroupSound_SelectItems == 0)
    {
     IR.ShowPopup("hideRight");
     GroupSound  = 0;
     _GroupSound = 0;
    }
    else
    {
     IR.ShowPopup("GroupSound_Settings");
    }          
           
    IR.SetVariable("Drivers." + "Home" + ".GroupSound", _GroupSound);
  break;
  }
  });
  
    // Select All
    IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("GroupSound_Down").GetItem("Item 1"), function(item, subItem)
    { 
    GroupSound = IR.GetItem("GroupSound_Content").GetItem("Item 1")
   
    for (var i = 1; i<13; i++) 
    {
    if((i == 1) || (i == 5) || (i == 9))
    {
    //
    }
    else
    {
    GroupSound.CreateItem(i, 1, {X: 8});        
    GroupSound_Change[i] = true;
    }
    }
    GroupSound_SelectItems = 9;
    _GroupSound = NewSound[8]; 
    IR.ShowPopup("GroupSound_Settings");
    IR.SetVariable("Drivers." + "Home" + ".GroupSound", _GroupSound);
    });
   
    // Deselect All
    IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("GroupSound_Down").GetItem("Item 2"), function(item, subItem)
    { 
    GroupSound = IR.GetItem("GroupSound_Content").GetItem("Item 1")
   
    for (var i = 1; i<13; i++) 
    {
    GroupSound.CreateItem(i, 1, {X: 1200});        
    GroupSound_Change[i] = false;
    }    
    GroupSound_SelectItems = 0;
    _GroupSound = NewSound[8]; 
    IR.HidePopup("GroupSound_Settings");
    IR.SetVariable("Drivers." + "Home" + ".GroupSound", _GroupSound); 
    });
}
////////////////////////////////////////////////////////////////////////////////
// Заполнение листов соноса
function Sonos_lists()
{           
// Инициализация     
var listALL   = IR.GetItem("Sonos").GetItem("Item 90");
var listQueue = IR.GetItem("Sonos").GetItem("Item 91");

// Random Value
var sound = ['The Wall', 'Run Run Run',  'I m Sticking With You', 'Girl You Know Its True',  'The Logical Song', 'Castellorizon', 'Horses in the Sky'];    
var artist = ['Osewoudt', 'Red Hot Chili Peppers',  'Foster the People', 'The Beatles',  'The Roling Stones', 'Michaelangelo ', 'The Chemical Brothers'];

// Queue + All List	 
for(var i = 0; i < 15; ++i)
{
 x = sound[Math.floor(Math.random()*5)];
 y = artist[Math.floor(Math.random()*5)];
   
 listQueue.CreateItem(i + 1, 2, { Text: x });
 listQueue.CreateItem(i + 1, 3, { Text: y});
 listALL.CreateItem(i + 1, 2, { Text: x });
 listALL.CreateItem(i + 1, 3, { Text: y});
 if (i == 0)
 {
 listALL.CreateItem(i + 1, 4, { X: 0, Text: "A" });
 listALL.CreateItem(i + 1, 2, { X: 1000 });
 listALL.CreateItem(i + 1, 3, { X: 1000 });
 listALL.CreateItem(i + 1, 1, { X: 1000 });
 }
 if (i == 5)
 {
 listALL.CreateItem(i + 1, 4, { X: 0, Text: "B" });
 listALL.CreateItem(i + 1, 2, { X: 1000 });
 listALL.CreateItem(i + 1, 3, { X: 1000 });
 listALL.CreateItem(i + 1, 1, { X: 1000 });
 }
 if (i == 11)
 {
 listALL.CreateItem(i + 1, 4, { X: 0, Text: "C" });
 listALL.CreateItem(i + 1, 2, { X: 1000 });
 listALL.CreateItem(i + 1, 3, { X: 1000 }); 
 listALL.CreateItem(i + 1, 1, { X: 1000 });
 }
} 
}                
////////////////////////////////////////////////////////////////////////////////
// Настройки анимации
var timer1= 0;  
var timer2= 0;
var TimeAnimation = 400; // скорость анимации
var StartX = 0;          // Начальное x попапа
var EndX = 0;            // На сколько переместить попап  
var HouseDO = -1;    /*  Флаг для попапа навигации при главной странице дома кнопки назад нет, во всех отсальных она есть,
                      и флаг меняется только когда вызывается функциия Show House на 1, с главной можно уйти либо на доплнения либо на настройку комнаты
                      в этих функция будет присваиваться 0 и попап будет перемещаться   */
var Think = "no";
var NavPopup = IR.GetItem("Back");       
////////////////////////////////////////////////////////////////////////////////
// Твинер замедление под конец
function delta4(progress) {                        
    return Math.cos((1-progress) * Math.PI/2);
}        
////////////////////////////////////////////////////////////////////////////////  
// Анимация
IR.AddListener(IR.EVENT_WORK,0,function(time)
{ 
  if (HouseDO == 0)
  {
        timer1+=time;			 
			 
	if (timer1 <= TimeAnimation )
        {               
         NavPopup.X = -61 + 61* delta4(timer1/TimeAnimation);
        }
        else
        {
         // В твинере есть неточность, поэтому добиваем    
         NavPopup.X = 0;
         // Очистка
         timer1 = 0;
         HouseDO = -1;
         Think = "yes";
	}   
  }
  if (HouseDO == 1)
  {
        timer2+=time;			 	 
	if (timer2 <= TimeAnimation )
        {               
         NavPopup.X = (-61)* delta4(timer2/TimeAnimation);
        }         
        else
        {
         // В твинере есть неточность, поэтому добиваем    
         NavPopup.X = -61;
         // Очистка
         timer2 = 0;
         HouseDO = -1;
         Think = "no";
	} 
  }
});                                                                                                                   