var g_sRESOLUTION = 0;//0- tablet, 1 - phone
var g_oRoomsList = null;
var g_oWidgetsList = null
var RoomsBuff; //= HomeList;//IR.GetPage("Main page").GetItem("Home").Text.split("\n");
var WidgetsBuff = [];
var g_oActivitesList = null;
var ActivitesBuff = [];
var WidgetOnPlanList = null;
var WidgetOnPlanBack;
var BackPopup = "BUTTON_BACK";
var SubscriberBuff = [];        
var MainTitle;
var PlanTitle;			  
                      
/**
  * Get project width and height
  * if width more than height then it is tablet
  * else it is phone
*/

IR.AddListener(IR.EVENT_START, 0, function()
{  
   for (var key in Rooms) {
      sliderWidjetBuff = Rooms[key];
      for (var j = 0; j <= sliderWidjetBuff.length - 1; j++) {
         widjetName = sliderWidjetBuff[j];
         widjetLength  = IR.GetItem(widjetName).ItemsCount;
         for (var k = 0; k <= widjetLength - 1; k++) {
            itemName = IR.GetItem(widjetName).GetItem(k);
            typeItem = itemName.Type
            if (typeItem === 20) {                   
               height = itemName.Height
               width = itemName.Width
               if (height >= width) {
                  itemName.Value1SliderOffset = width / 2.34;
               } else if (width >= height) {
                  itemName.Value1SliderOffset = height / 2.34;
               }
            }   
         }
      }
   }
   IR.GetItem("LIST_ROOM_TABLET").GetItem("List").Type = 3;
   IR.GetItem("LIST_ROOM_TABLET").GetItem("List").Direction = 1;
   RoomsBuff = HomeList;
   g_sRESOLUTION = IR.GetPage("Main page").Width > IR.GetPage("Main page").Height ? 0 : 1;
   if (g_sRESOLUTION)
   {
     g_oRoomsList = IR.GetItem("LIST_ALL_ROOMS_PHONE").GetItem("List");
     g_oWidgetsList = IR.GetItem("LIST_ROOM_PHONE").GetItem("List");
     g_oActivitesList = IR.GetItem("LIST_PLANS_PHONE").GetItem("List");
     WidgetOnPlanList = IR.GetItem("LIST_WIDGET_PHONE").GetItem("List");
     MainTitle = IR.GetItem("LIST_ROOM_PHONE").GetItem("Name page");
     PlanTitle = IR.GetItem("LIST_PLANS_PHONE").GetItem("Name page");
   }
   else
   {
     g_oRoomsList = IR.GetItem("LIST_ALL_ROOMS_TABLET").GetItem("List 1");
     g_oWidgetsList = IR.GetItem("LIST_ROOM_TABLET").GetItem("List");
     g_oActivitesList = IR.GetItem("LIST_PLANS_TABLET").GetItem("List");
     WidgetOnPlanList = IR.GetItem("LIST_WIDGET_TABLET").GetItem("List");
     WidgetOnPlanBack = IR.GetItem("LIST_WIDGET_BG_TABLET");
     MainTitle = IR.GetItem("LIST_ROOM_TABLET").GetItem("Name page");
     PlanTitle = IR.GetItem("LIST_PLANS_TABLET").GetItem("Name page");
     //var backPopupHeight = 40;
	 // IR.GetItem(BackPopup).GetItem("Item 1").Y = backPopupHeight;
    // IR.GetItem(BackPopup).GetItem("Item 2").Y = backPopupHeight;
   }
   FillRooms(); 
});

function FillRooms()
{  
   g_oRoomsList.Clear();
   if (g_sRESOLUTION)
      g_oRoomsList.AddPopup("PHONE_POPUPS_Photo_home (5)");
   
   for (var i = 0; i <= RoomsBuff.length - 1; i++)
   {
     if (RoomsBuff[i].length > 0)
     {
       if(RoomsBuff[i].indexOf("HOME_Scenes (2)") > 0){
         if(g_sRESOLUTION)
            g_oRoomsList.AddPopup(RoomsBuff[i]);
       }     
       else   
         g_oRoomsList.AddPopup(RoomsBuff[i]);
     }  
   }
   //g_oRoomsList.AddPopup("PHONE_POPUPS_End Popup Home");   
   IR.ShowPopup(g_oRoomsList.Parent.Name);
}

var chekInTypeOpen = 0;
var valueOpen = 0;
var planFlag = 0;
function OpenWidget() {
    WidgetOnPlanList.Clear();
    nameThis = this.Parent.Name;
    planFlag = nameThis.indexOf("Plan");
 if (chekInTypeOpen == 0){
   OpenOnRoomWidget();
 } else {
  valueOpen++;
  OpenOnPlan();
 }
}

/** 
 * Popup Lights_templates Light 4
 * Color selection function
 */
var l_nColor;
function RGB_Select_Color() 
{
    // You get an item to conctrol brightness on the same popup
    limitValue = this.Parent.GetItem("Limit").Text;
    // You get the color value from the pressed item
    var l_nColor = this.PickColor;
    var R,G,B;
    var l_nNowValue;
    // Devide the color into RGB channels
    if (this.Parent.GetItem("MlvBrigthness") != undefined)
       l_nNowValue = this.Parent.GetItem("MlvBrigthness").Value;
    else
       l_nNowValue = limitValue;
    if (limitValue == "100") {
       R = ((l_nColor >> 24) & 0xFF) * 100 / 255;
       G = ((l_nColor >> 16) & 0xFF) * 100 / 255;
       B = ((l_nColor >> 8)  & 0xFF) * 100 / 255;
       l_nColor = R * 255 / 100 << 24 | G * 255 / 100 << 16 | B * 255 / 100 << 8 | l_nNowValue * 255 / 100;
    } else {
       R = (l_nColor >> 24) & 0xFF;
       G = (l_nColor >> 16) & 0xFF;
       B = (l_nColor >> 8)  & 0xFF;
       l_nColor = R << 24 | G << 16 | B << 8 | l_nNowValue;
    }
    // Select the dominating color channel
    this.Parent.GetItem("FeedLblRed").Value   = R;
    this.Parent.GetItem("FeedLblGreen").Value = G;
    this.Parent.GetItem("FeedLblBlue").Value  = B;
    // Set the color value of the displayed item
    this.Parent.GetItem("BtnDisplayColor").GetState(0).FillColor = l_nColor;
    this.Parent.GetItem("FeedLblRed").StartActions(IR.EVENT_ITEM_PRESS, true);
    this.Parent.GetItem("FeedLblGreen").StartActions(IR.EVENT_ITEM_PRESS, true);
    this.Parent.GetItem("FeedLblBlue").StartActions(IR.EVENT_ITEM_PRESS, true);
    this.Parent.GetItem("FeedLblRed").StartActions(IR.EVENT_ITEM_RELEASE, true);
    this.Parent.GetItem("FeedLblGreen").StartActions(IR.EVENT_ITEM_RELEASE, true);
    this.Parent.GetItem("FeedLblBlue").StartActions(IR.EVENT_ITEM_RELEASE, true);
    this.Parent.GetItem("FeedLblRed").StartActions(IR.EVENT_ITEM_MOVE, true);
    this.Parent.GetItem("FeedLblGreen").StartActions(IR.EVENT_ITEM_MOVE, true);
    this.Parent.GetItem("FeedLblBlue").StartActions(IR.EVENT_ITEM_MOVE, true);
    this.Parent.GetItem("FeedLblRed").StartActions(IR.EVENT_ITEM_HOLD, true);
    this.Parent.GetItem("FeedLblGreen").StartActions(IR.EVENT_ITEM_HOLD, true);
    this.Parent.GetItem("FeedLblBlue").StartActions(IR.EVENT_ITEM_HOLD, true);
}
function RGB_Select_Color_Brigthness() {
	var MlvBrigthness = this.Parent.GetItem("MlvBrigthness");
   var R,G,B;
   var l_nColor;
   limitValue = this.Parent.GetItem("Limit").Text;
   var l_nNowValue;
   // Devide the color into RGB channels
   if (this.Parent.GetItem("MlvBrigthness") != undefined)
      l_nNowValue = MlvBrigthness.Value;
   else
      l_nNowValue = limitValue;
   if (limitValue == "100") {
      R = this.Parent.GetItem("FeedLblRed").Value * 255 / 100;
      G = this.Parent.GetItem("FeedLblGreen").Value * 255 / 100;
      B = this.Parent.GetItem("FeedLblBlue").Value * 255 / 100;
      l_nColor = R << 24 | G << 16 | B << 8 | l_nNowValue * 255 / 100;  
   } else { 
      R = this.Parent.GetItem("FeedLblRed").Value;
      G = this.Parent.GetItem("FeedLblGreen").Value;
      B = this.Parent.GetItem("FeedLblBlue").Value;
      l_nColor = R << 24 | G << 16 | B << 8 | l_nNowValue;
   } 
   this.Parent.GetItem("BtnDisplayColor").GetState(0).FillColor = l_nColor;
}

/*
   Popups Types:
   1 - color picker
   2 - Circle dimmer
   3 - Circle climate
*/

function OpenRoom()
{
  var l_oTempPopup = null;
  WidgetsBuff = Rooms[this.Text];
  chekInTypeOpen = 0;
  g_oWidgetsList.Clear();
  ClearListeners();
  for (var i = 0; i <= WidgetsBuff.length - 1; i++)
  {
     if(g_sRESOLUTION){
        if(WidgetsBuff[i].toLowerCase().indexOf("separator") == -1)
           g_oWidgetsList.AddPopup(WidgetsBuff[i]);
     } else
        g_oWidgetsList.AddPopup(WidgetsBuff[i]);
     l_oTempPopup = IR.GetPopup(WidgetsBuff[i]).GetItem("Type");
     if (l_oTempPopup != null)
     {
       switch (l_oTempPopup.Text)
       {
         case '1':
           AddPickerListeners(WidgetsBuff[i]);
         break; 
       }
     }
  } 
  
  g_oWidgetsList.SetPosition(0);
  IR.HidePopup(g_oRoomsList.Parent.Name);
  IR.ShowPopup(g_oWidgetsList.Parent.Name);
  IR.ShowPopup(BackPopup);
  MainTitle.Text = this.Text;
 
}
function OpenRoomsPopup()
{
  chekValue = 0;
  valueOpen = 0;
  IR.HideAllPopups();
  nameWidgetPlan = [];
  //IR.HidePopup(this.Parent.Name);
  //IR.HidePopup(WidgetOnPlanList.Parent.Name);
  IR.ShowPopup(g_oRoomsList.Parent.Name);						 
}

function OpenActivities()
{
  ActivitesBuff = Activites[this.Text];
  g_oActivitesList.SetPosition(0);
  g_oActivitesList.Clear();
  chekInTypeOpen = 1;
  for (var i = 0; i <= ActivitesBuff.length - 1; i++)
  {
     var resolution = IR.GetItem(ActivitesBuff[i]).Width > IR.GetItem(ActivitesBuff[i]).Height ? 0 : 1;
     if(resolution == g_sRESOLUTION)
         g_oActivitesList.AddPopup(ActivitesBuff[i]);
     buffbutton = 1;
  } 
  
  IR.HidePopup(g_oRoomsList.Parent.Name);
  
  IR.ShowPopup(g_oActivitesList.Parent.Name);
  PlanTitle.Text = this.Text;
  IR.ShowPopup(BackPopup);
}

function ShowActivitiesPopup()
{
   if (g_sRESOLUTION)
   {
      if (!buffbutton){
         if (checkedNumb != 0) {
            IR.HidePopup("LIST_WIDGET_PHONE");
            IR.ShowPopup(g_oActivitesList.Parent.Name); 
            IR.ShowPopup("BUTTON_BACK");
            nameWidgetPlan = [];
         } else { 
         IR.HidePopup("LIST_WIDGET_PHONE");
         IR.ShowPopup("LIST_ROOM_PHONE");
         IR.ShowPopup("BUTTON_SCENES");
         IR.ShowPopup("BUTTON_BACK");
         nameWidgetPlan = [];
         }
      } else { 
      if (chekValue == 2){
       WidgetOnPlanList.Clear();
       WidgetOnPlanList.AddPopup(nameWidgetPlan[0]); 
       chekValue = 1;
       WidgetOnPlanList.SetPosition(0);
       //nameWidgetPlan = [];
       } else {
         chekValue = 0
         IR.HidePopup("LIST_WIDGET_PHONE");
         //IR.ShowPopup(g_oActivitesList.Parent.Name); 
         IR.ShowPopup("BUTTON_BACK");
         nameWidgetPlan = [];
       }
      }        
   }else {   
       //IR.HidePopup(WidgetOnPlanList.Parent.Name);
       if (valueOpen == 1) {
         ClosePopupFromActivies();
         nameWidgetPlan = [];
         valueOpen = 0;
      } else if (valueOpen >= 2) { 
        if (planFlag == -1) {                                                     
         apdateWidgetPlan(nameWidgetPlan)
        } else {
         IR.HidePopup("LIST_WIDGET_TABLET");                        
         //IR.ShowPopup("LIST_ALL_ROOMS_TABLET"); 
        }   
      } else
         IR.HidePopup("LIST_WIDGET_TABLET");
   } 
}
var checkedNumb = 0;
var nameWidgetPlan = [];
var countNumb = 0;				 
var chekValue = 0;
var buffbutton = null;
function OpenOnPlan()
{
   //IR.HidePopup("BUTTON_BACK");
   IR.HidePopup("BUTTON_SCENES");
   //if (g_sRESOLUTION !== 0)
      //IR.HidePopup(g_oActivitesList.Parent.Name);       
   IR.HidePopup("LIST_ALL_ROOMS_TABLET");
   WidgetOnPlanList.Clear();
   var Widget = IR.GetVariable("Global.PlanWidget");
   var buff = Widget.split(",");
   for (var i = 0; i <= buff.length - 1; i++)   
   {
      WidgetOnPlanList.AddPopup(buff[i]);
      l_oTempPopup = IR.GetPopup(buff[i]).GetItem("Type");
      if (l_oTempPopup != undefined) {
         switch (l_oTempPopup.Text) {
         case '1':
           AddPickerListeners(buff[i]);
         break; 
         }
      }
    }  
   if (g_sRESOLUTION !== 0) {
      IR.ShowPopup(g_oActivitesList.Name);
      wdjName = g_oActivitesList.Name;
            chekValue++;
      nameWidgetPlan.push(Widget);
      if (wdjName == "LIST_WIDGET_PHONE") {
      checkedNumb = 1;
      }
   }   
   IR.ShowPopup(WidgetOnPlanList.Parent.Name);  
   wdjName = WidgetOnPlanList.Parent.Name
   if (wdjName == "LIST_WIDGET_TABLET") {
      countNumb = countNumb + 1;
      if (planFlag == -1){
        nameWid = Widget;
      } else {
         nameWidgetPlan = Widget;
      }
   } 
}

function OpenOnRoomWidget()
{
   //IR.HidePopup("BUTTON_BACK");
   IR.HidePopup("BUTTON_SCENES");     											
   var Widget = IR.GetVariable("Global.PlanWidget");
   var buff = Widget.split(",");
   for (var i = 0; i <= buff.length - 1; i++)   
   {
      WidgetOnPlanList.AddPopup(buff[i]);
      buffbutton = null;
    }  
   if (g_sRESOLUTION !== 0) {
      IR.ShowPopup(g_oActivitesList.Name);
      checkedNumb = 0;
   }
   IR.ShowPopup(WidgetOnPlanList.Parent.Name);
   
   if (g_sRESOLUTION) {
     IR.HidePopup("LIST_ROOM_PHONE");
   } else {
      IR.ShowPopup(BackPopup);
   }
}

function ClosePopupFromActivies()
{                                         
   IR.HidePopup("LIST_WIDGET_TABLET");                            
   //IR.ShowPopup("LIST_ALL_ROOMS_TABLET");
   checkIn = 0;
}

function apdateWidgetPlan(nameIn){  
     WidgetOnPlanList.Clear(); 
     WidgetOnPlanList.AddPopup(nameIn);   
     valueOpen = 1; 
}

function motor_run(in_parent, in_limit, in_val)
{
  var slider = in_parent.GetItem("Animation");
  if (slider.Value != in_limit)
  {
    slider.Value += in_val
  } 
  else
  {
    IR.ClearInterval(in_parent.GetItem("timer").Text);
  }  
}

function motor_up()
{
  var old_mode = this.Parent.GetItem("mode").Text;
  if (old_mode != 1)
  {
    var FullTime = this.Parent.GetItem("time").Text;
    var interval = Math.floor((FullTime / this.Parent.GetItem("Animation").StatesCount));
														 
							 
    this.Parent.GetItem("mode").Text = 1;
    IR.ClearInterval(this.Parent.GetItem("timer").Text); 
    var parent = this.Parent;
    var timer = IR.SetInterval(interval, function(){motor_run(parent,parent.GetItem("Animation").StatesCount , 1)});
    this.Parent.GetItem("timer").Text = timer;
  }      
}
function motor_down()
{
  var old_mode = this.Parent.GetItem("mode").Text;
  if (old_mode != -1)
  {
    var FullTime = this.Parent.GetItem("time").Text;
    var interval = Math.floor((FullTime / this.Parent.GetItem("Animation").StatesCount));
    
    this.Parent.GetItem("mode").Text = -1;
																				
    IR.ClearInterval(parseInt(this.Parent.GetItem("timer").Text)); 
    var parent = this.Parent;
    var timer = IR.SetInterval(interval, function(){motor_run(parent,0 , -1)}); 
    this.Parent.GetItem("timer").Text = timer;
  } 
}


function motor_center()
{
    var FullTime = this.Parent.GetItem("time").Text;
    var interval = Math.floor(((FullTime / this.Parent.GetItem("Animation").StatesCount)));
    
    this.Parent.GetItem("mode").Text = 3;
    
    IR.ClearInterval(parseInt(this.Parent.GetItem("timer").Text)); 
    var parent = this.Parent;
    
    if (parent.GetItem("Animation").Value > parent.GetItem("Animation").StatesCount/2)
    {
      var timer = IR.SetInterval(interval, function(){motor_run(parent,parent.GetItem("Animation").StatesCount/2 , -1)}); 
    } else
    {
       var timer = IR.SetInterval(interval, function(){motor_run(parent,parent.GetItem("Animation").StatesCount/2, 1)});
    }
    
    this.Parent.GetItem("timer").Text = timer; 
}

function motor_stop()
{
  this.Parent.GetItem("mode").Text = 0;
  IR.ClearInterval(parseInt(this.Parent.GetItem("timer").Text));
};

function motor_angle_run(in_parent, in_limit, in_val)
{
  var slider = in_parent.GetItem("angle animation");
  if (slider.Value != in_limit)
  {
    slider.Value += in_val
  } 
  else
  {
    IR.ClearInterval(in_parent.GetItem("timer angle").Text);
    in_parent.GetItem("angle stop").Hit=IR.HIT_PASS_THROUGH;
    in_parent.GetItem("angle stop").State = 0;
  }  
}


function motor_angle_up()
{
  var old_mode = this.Parent.GetItem("mode angle").Text;
  if (old_mode != 1)
  {
    var FullTime = this.Parent.GetItem("time angle").Text;
    var interval = Math.floor((FullTime / this.Parent.GetItem("angle animation").StatesCount));
															   
    
    this.Parent.GetItem("mode angle").Text = 1;
    IR.ClearInterval(this.Parent.GetItem("timer angle").Text); 
    var parent = this.Parent;
    var timer = IR.SetInterval(interval, function(){motor_angle_run(parent,parent.GetItem("angle animation").StatesCount , 1)});
    this.Parent.GetItem("timer angle").Text = timer;
    this.Parent.GetItem("angle stop").State = 1;
    this.Parent.GetItem("angle stop").Hit = IR.HIT_ACTIVE_TOUCH;
  } 
  else 
  {
     this.Parent.GetItem("angle stop").Hit=IR.HIT_PASS_THROUGH;
     this.Parent.GetItem("angle stop").State = 0;       
  }
}
function motor_angle_down()
{
  var old_mode = this.Parent.GetItem("mode angle").Text;
  if (old_mode != -1)
  {
    var FullTime = this.Parent.GetItem("time angle").Text;
    var interval = Math.floor((FullTime / this.Parent.GetItem("angle animation").StatesCount));
    
    this.Parent.GetItem("mode angle").Text = -1;
																					  
    IR.ClearInterval(parseInt(this.Parent.GetItem("timer angle").Text)); 
    var parent = this.Parent;
    var timer = IR.SetInterval(interval, function(){motor_angle_run(parent,0 , -1)}); 
    this.Parent.GetItem("timer angle").Text = timer;
    this.Parent.GetItem("angle stop").State = 1;
    this.Parent.GetItem("angle stop").Hit = IR.HIT_ACTIVE_TOUCH;
  } 
  else 
  {
     this.Parent.GetItem("angle stop").Hit=IR.HIT_PASS_THROUGH;
     this.Parent.GetItem("angle stop").State = 0;       
  }
}

function motor_angle_stop()
{
  this.Parent.GetItem("mode angle").Text = 0;
  IR.ClearInterval(parseInt(this.Parent.GetItem("timer angle").Text));
  this.Parent.GetItem("angle stop").Hit=IR.HIT_PASS_THROUGH;
  this.Parent.GetItem("angle stop").State = 0;
};

function ClearListeners()
{
  var l_sElement = null;
  while (SubscriberBuff.length != 0)
  {
    l_sElement = SubscriberBuff.pop();
    IR.UnsubscribeTagChange(l_sElement);
  }
}

function AddPickerListeners(in_sPopupName)
{
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FeedLblRed.Value");
  SubscriberBuff.push("UI." + in_sPopupName + ".FeedLblRed.Value");
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FeedLblGreen.Value");
  SubscriberBuff.push("UI." + in_sPopupName + ".FeedLblGreen.Value");
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FeedLblBlue.Value");
  SubscriberBuff.push("UI." + in_sPopupName + ".FeedLblBlue.Value");
  IR.SubscribeTagChange("UI." + in_sPopupName + ".MlvBrigthness.Value");
  SubscriberBuff.push("UI." + in_sPopupName + ".MlvBrigthness.Value");
  SetBrightness(in_sPopupName);
}					  
function SetBrightness(in_path)
{
   var item = in_path;
   var R,G,B;
   var l_nNowValue;
   var l_nColor;
   limitValue = IR.GetItem(item).GetItem("Limit").Text;
   if (IR.GetItem(item).GetItem("MlvBrigthness") != undefined)
      l_nNowValue = IR.GetItem(item).GetItem("MlvBrigthness").Value;
   else
      l_nNowValue = limitValue;
   if (limitValue == "100") {
      var R = IR.GetItem(item).GetItem("FeedLblRed").Value * 255 / 100;
      var G = IR.GetItem(item).GetItem("FeedLblGreen").Value * 255 / 100;
      var B = IR.GetItem(item).GetItem("FeedLblBlue").Value * 255 / 100;
      l_nColor = R << 24 | G << 16 | B << 8 | l_nNowValue * 255 / 100;   
   } else { 
      var R = IR.GetItem(item).GetItem("FeedLblRed").Value;
      var G = IR.GetItem(item).GetItem("FeedLblGreen").Value;
      var B = IR.GetItem(item).GetItem("FeedLblBlue").Value;
      l_nColor = R << 24 | G << 16 | B << 8 | l_nNowValue;
   }
   //It sets the new color value of the displaying item
   IR.GetItem(item).GetItem("BtnDisplayColor").GetState(0).FillColor = l_nColor;
}
//Set global listener
IR.SetGlobalListener(IR.EVENT_GLOBAL_TAG_CHANGE, function(name, value) 
{
	  
     var item = name.split(".");
     switch (item[2])
     {
        case "MlvBrigthness":
        case "FeedLblRed":
        case "FeedLblGreen":
        case "FeedLblBlue":
          SetBrightness(item[1])
        break;
     }
});