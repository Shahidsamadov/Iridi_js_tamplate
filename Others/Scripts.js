var g_sRESOLUTION = 0;//0- tablet, 1 - phone
var g_oRoomsList = null;
var g_oWidgetsList = null
var RoomsBuff; //= HomeList;//IR.GetPage("Main page").GetItem("Home").Text.split("\n");
var WidgetsBuff = [];
var g_oActivitesList = null;
var ActivitesBuff = [];
var MainTitle = IR.GetItem("Main page").GetItem("Name page");
var WidgetOnPlanList = null;
var WidgetOnPlanBack;
var BackPopup = "BUTTON_BACK";
var SubscriberBuff = []

// Global static values
var g_nHexOnePercentOf29  = 255 / 20;
var g_n180PercentOf29     = 180 / 20;
var g_n180PercentOf100    = 180 / 100;
var g_nHexOnePercentOf100 = 255 / 100;
var g_n234OnePercentOf30  = 234 / 30;
var g_n234PercentOf100    = 360 / 100;
var g_n100PercentOf30     = 100 / 30;


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
   g_sRESOLUTION = IR.GetPage("Main page").Width > IR.GetPage("Main page").Height ? 0 : 1;
   
   if (g_sRESOLUTION == 1)
   {
     g_oRoomsList = IR.GetItem("LIST_ALL_ROOMS_PHONE").GetItem("List");
     g_oWidgetsList = IR.GetItem("LIST_ROOM_PHONE").GetItem("List");
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
       g_oRoomsList.AddPopup(RoomsBuff[i]);
     }  
   }
   

   //g_oRoomsList.AddPopup("PHONE_POPUPS_End Popup Home");
   
   IR.ShowPopup(g_oRoomsList.Parent.Name);
}

/** 
 * Popup Lights_templates Light 4
 * Color selection function
 */
function RGB_Select_Color() 
{
    // It gives an item to control brightness on the same popup
    var MlvBrigthness = this.Parent.GetItem("MlvBrigthness");

    var l_nLimit = this.Parent.GetItem("Limit").Text; 
    // It gives color value from a pressed item
    var l_nColor = this.PickColor;

    // It devides the color into RGB channels
    var R = (l_nColor >> 24) & 0xFF;
    var G = (l_nColor >> 16) & 0xFF;
    var B = (l_nColor >> 8)  & 0xFF;

    // It identifies the dominating color channel
    var l_nMax = Math.max(R, G, B);

    
    // It saves colors to adjust opacity 
    if (l_nLimit == '100')
    {
      
      this.Parent.GetItem("LblRed").Text   = Math.floor(R * (100 / 255));
      this.Parent.GetItem("LblGreen").Text = Math.floor(G * (100 / 255));
      this.Parent.GetItem("LblBlue").Text  = Math.floor(B * (100 / 255));
    } else
    {
      this.Parent.GetItem("LblRed").Text   = R;
      this.Parent.GetItem("LblGreen").Text = G;
      this.Parent.GetItem("LblBlue").Text  = B;
    } 
	
	// It gives the current value of opacity
    var l_nNowValue = MlvBrigthness.State * g_nHexOnePercentOf29;  

    // It forms values to set the item color
    var l_nColor = R << 24 | G << 16 | B << 8 | l_nNowValue;

    // It sets the color value of the displaying item 
    //this.Parent.GetItem("BtnDisplayColor").GetState(0).FillColor = l_nColor;

}

/** 
 * Popup Lights_templates Light 4
 * This function adjusts the opacity of the current color
 */
function RGB_Select_Color_Brigthness() 
{
	var JstLevel = this;
	var MlvBrigthness = this.Parent.GetItem("MlvBrigthness");

	// It sets variables required for calculations
	var sinus1, sinus2;
	var x, y, l_fAngle;
	
	// It moves values to define the center as 0.0
	x = JstLevel.ValueX - 50;
	y = JstLevel.ValueY - 50;
	
	// An angle is calculated by coordinates on x(-50:50) y(-50:50) axes.
	sinus1 = x/Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	sinus2 = y/Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	if(x>=0&&y>=0) 
		l_fAngle = 180*Math.asin(sinus1)/3,14159;
	else if(x>=0&&y<=0)
		l_fAngle = 90 + Math.abs(180*Math.asin(sinus2)/3,14159);
	else if(x<=0&&y<=0)
		l_fAngle = 180 + Math.abs(180*Math.asin(sinus1)/3,14159); 
	else if(x<=0&&y>=0)
		l_fAngle = 270 + Math.abs(180*Math.asin(sinus2)/3,14159); 

	// It limits the range, as the level does not take 360 degrees
	l_fAngle > 270 ? l_fAngle = 270 : 0;
	l_fAngle < 90  ? l_fAngle = 90  : 0;
	
	// It turns the range the other way and 0 shifts to the visible position of the level
	l_fAngle = 270 - l_fAngle;
	
	MlvBrigthness.State = l_fAngle / g_n180PercentOf29;

	// It gets the value of each color
    var R = parseInt(this.Parent.GetItem("LblRed").Text);
    var G = parseInt(this.Parent.GetItem("LblGreen").Text);
    var B = parseInt(this.Parent.GetItem("LblBlue").Text);
	
	// It gets the current value of opacity
    var l_nNowValue = MlvBrigthness.State * g_nHexOnePercentOf29;   
	
    // It forms values to sent the item color
    var l_nColor = R << 24 | G << 16 | B << 8 | l_nNowValue;

    // It sets the new color value of the displaying item 
    //this.Parent.GetItem("BtnDisplayColor").GetState(0).FillColor = l_nColor;
    
    var l_nLimit = this.Parent.GetItem("Limit").Text;
    
    if (l_nLimit == 100)
    {
       this.Parent.GetItem("LblBright").Text = Math.floor(l_nNowValue * (100 / 255))
    } else
    {
       this.Parent.GetItem("LblBright").Text = parseInt(l_nNowValue);
    }
    
    //IR.Log("l_nNowValue = " + Math.floor(l_nNowValue * (100 / 255)))
}


/** 
 * Lights_templates Light 5 popup
 * Function to register dimmer brightness
 */  
function Dimmer_Joystick_Select()  // The function calculates the slider position with regard to the level
{
	// It gets interface items
	var JstDimmer = this;
	var MlvDimmer = this.Parent.GetItem("МlvDimmer");
	var LblValue  = this.Parent.GetItem("LblValue");
    
	
	// It identifies variables required for calculations
	var sinus1, sinus2;
	var x, y, l_fAngle, l_nAngle;
	
	// It moves values to define the center as 0.0
	x = JstDimmer.ValueX - 50;
	y = JstDimmer.ValueY - 50;
	
	// An angle is calculated by coordinates on x(-50:50) y(-50:50) axes
	sinus1 = x/Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	sinus2 = y/Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	if(x>=0&&y>=0) 
		l_fAngle = 180*Math.asin(sinus1)/3,14159;
	else if(x>=0&&y<=0)
		l_fAngle = 90 + Math.abs(180*Math.asin(sinus2)/3,14159);
	else if(x<=0&&y<=0)
		l_fAngle = 180 + Math.abs(180*Math.asin(sinus1)/3,14159); 
	else if(x<=0&&y>=0)
		l_fAngle = 270 + Math.abs(180*Math.asin(sinus2)/3,14159);    
	
	// It limits the range, as the level does not take 360 degrees
	l_fAngle > 360 ? l_fAngle = 360 : 0;
	l_fAngle < 0  ? l_fAngle = 0  : 0;
	
	// It turns the range the other way and 0 shifts to the visible position of the level
	l_fAngle = 360 - l_fAngle;
	
   // It sets the level value 1 from 30
	//MlvDimmer.Value = (l_fAngle / g_n234OnePercentOf30).toFixed(0); 
	
   MlvDimmer.Value = (MlvDimmer.Min + l_fAngle / (360 / (MlvDimmer.Max - MlvDimmer.Min))).toFixed(0); 
	
   // It sets the dimmer value 1 from 100
	LblValue.Value  = MlvDimmer.Value;//(l_fAngle / g_n234PercentOf100).toFixed(0);
   
   if (this.Parent.GetItem("Type").Text == 2)
   {
      var limit = this.Parent.GetItem("Limit").Text;
      if (limit == 100)
      {
        this.Parent.GetItem("ChBright").Text = (l_fAngle / g_n234PercentOf100).toFixed(0);
      } else
      {
        this.Parent.GetItem("ChBright").Text = (l_fAngle / (360 / 255)).toFixed(0);
      }
   } else if (this.Parent.GetItem("Type").Text == 3)
   {
      this.Parent.GetItem("ChTemp").Text = LblValue.Value;
   }
}

/** 
 * Lights_templates Light 5 popup
 * Function to indicate the limit
 */  var l_IncTimeout = {}; // additinal helpers in the function
function Dimmer_Increase_Decrease_Press()
{
	// It gets interface items
	var LblValue  = this.Parent.GetItem("LblValue"); 
	var LblLastColor  = this.Parent.GetItem("LblLastColor");
	
	// If parameters are the smallest and the largest, they are hilighted red
	/*if(LblValue.Value === 100)
	{
		if(this.Text === "&") // Plus icon
			LblValue.GetState(0).TextColor = 0xFF0000FF;
	}	
	else if(LblValue.Value === 0)
	{
		if(this.Text === "%") // Minus icon
			LblValue.GetState(0).TextColor = 0xFF0000FF;
	} */
	// additional helpers - neither release nor hold work when a list is moved
	IR.ClearInterval(l_IncTimeout);
	IR.SetTimeout(1000, function(){
		this.GetState(0).TextColor = 0xFFFFFFFF;
	},LblValue)
}

/** 
 * Lights_templates Light 1 popup
 * Function to increase dimmer brightness by 1 
 */  
function Dimmer_Increase_Release_1()
{
	// It gets interface items
	var MlvDimmer     = this.Parent.GetItem("МlvDimmer");
	var LblValue      = this.Parent.GetItem("LblValue"); 
	var LblLastColor  = this.Parent.GetItem("LblLastColor");
	
	// It returns the color
	LblValue.GetState(0).TextColor = 0xffffffff;
	
	// It increases the current value by 1
	var NewValue = LblValue.Value > MlvDimmer.Min ? LblValue.Value : MlvDimmer.Min;
   
   LblValue.Value = NewValue < MlvDimmer.Max ? NewValue + this.Delta : MlvDimmer.Max; 
   
	
	var d1 = MlvDimmer.Max - MlvDimmer.Min;
   //IR.Log("d1 = " + d1);
   var d2 = LblValue.Value - MlvDimmer.Min;
   //IR.Log("d2 = " + d2);
   
   var percent = 100 * d2 / d1;
   
   //IR.Log("percent = " + percent)
   
   var state =  (percent / 100) * d1 + MlvDimmer.Min; 
   
   MlvDimmer.Value = state; 
   if (this.Parent.GetItem("Type").Text == 2)
   {
      var limit = this.Parent.GetItem("Limit").Text;
      if (limit == 100)
      {
        this.Parent.GetItem("ChBright").Text = percent;
      } else
      {
        this.Parent.GetItem("ChBright").Text = parseInt((percent / 100) * 255);
      }
   } else if (this.Parent.GetItem("Type").Text == 3)
   {
      this.Parent.GetItem("ChTemp").Text = LblValue.Value;
   }    
}

/** 
 * Lights_templates Light 5 popup
 * Function to increase dimmer brightness by 5
 */  
function Dimmer_Increase_Release()
{
	// It gets interface items
	var MlvDimmer     = this.Parent.GetItem("МlvDimmer");
	var LblValue      = this.Parent.GetItem("LblValue"); 
	var LblLastColor  = this.Parent.GetItem("LblLastColor");
	
	// It returns the color
	LblValue.GetState(0).TextColor = 0xffffffff;
	
	var NewValue = LblValue.Value > MlvDimmer.Min ? LblValue.Value : MlvDimmer.Min;
   
   LblValue.Value = NewValue < MlvDimmer.Max ? NewValue + this.HoldDelta : MlvDimmer.Max; 
   
	
	var d1 = MlvDimmer.Max - MlvDimmer.Min;
   //IR.Log("d1 = " + d1);
   var d2 = LblValue.Value - MlvDimmer.Min;
   //IR.Log("d2 = " + d2);
   
   var percent = 100 * d2 / d1;
   
   //IR.Log("percent = " + percent)
   
   var state =  (percent / 100) * d1 + MlvDimmer.Min; 
   
   MlvDimmer.Value = state;
   if (this.Parent.GetItem("Type").Text == 2)
   {
      var limit = this.Parent.GetItem("Limit").Text;
      if (limit == 100)
      {
        this.Parent.GetItem("ChBright").Text = percent;
      } else
      {
        this.Parent.GetItem("ChBright").Text = parseInt((percent / 100) * 255);
      }
   } else if (this.Parent.GetItem("Type").Text == 3)
   {
      this.Parent.GetItem("ChTemp").Text = LblValue.Value;
   }
}

/** 
 * Lights_templates Light 1 popup
 * Function to decrease dimmer brightness by 1 
 */  
function Dimmer_Decrease_Release_1()
{
	// It gets interface items
	var MlvDimmer     = this.Parent.GetItem("МlvDimmer");
	var LblValue      = this.Parent.GetItem("LblValue"); 
	var LblLastColor  = this.Parent.GetItem("LblLastColor");
	
	// It returns the color
	LblValue.GetState(0).TextColor = 0xffffffff;
	
	// It increases the current value by 1
	var NewValue = LblValue.Value < MlvDimmer.Max ? LblValue.Value : MlvDimmer.Max;
   
   LblValue.Value = NewValue > MlvDimmer.Min ? NewValue + this.Delta : MlvDimmer.Min;
	
	var d1 = MlvDimmer.Max - MlvDimmer.Min;
   
   var d2 = LblValue.Value - MlvDimmer.Min;   
   
   var percent = 100 * d2 / d1;
   
   var state =  (percent / 100) * d1 + MlvDimmer.Min; 
   
   MlvDimmer.Value = state;
   if (this.Parent.GetItem("Type").Text == 2)
   {
      var limit = this.Parent.GetItem("Limit").Text;
      if (limit == 100)
      {
        this.Parent.GetItem("ChBright").Text = percent;
      } else
      {
        this.Parent.GetItem("ChBright").Text = parseInt((percent / 100) * 255);
      }
   } else if (this.Parent.GetItem("Type").Text == 3)
   {
      this.Parent.GetItem("ChTemp").Text = LblValue.Value;
   }
}

/** 
 * Lights_templates Light 5 popup
 * Function to decrease dimmer brightness by 5 
 */  
function Dimmer_Decrease_Release()
{
	// It gets interface items
	var MlvDimmer     = this.Parent.GetItem("МlvDimmer");
	var LblValue      = this.Parent.GetItem("LblValue"); 
	var LblLastColor  = this.Parent.GetItem("LblLastColor");
	
	// It returns the color
	LblValue.GetState(0).TextColor = 0xffffffff;
	
	// It increases the current value by 1
	var NewValue = LblValue.Value < MlvDimmer.Max ? LblValue.Value : MlvDimmer.Max;
   
   LblValue.Value = NewValue > MlvDimmer.Min ? NewValue + this.HoldDelta : MlvDimmer.Min;
	
	var d1 = MlvDimmer.Max - MlvDimmer.Min;
   
   var d2 = LblValue.Value - MlvDimmer.Min;   
   
   var percent = 100 * d2 / d1;
   
   var state =  (percent / 100) * d1 + MlvDimmer.Min; 
   
   MlvDimmer.Value = state;
   if (this.Parent.GetItem("Type").Text == 2)
   {
      var limit = this.Parent.GetItem("Limit").Text;
      if (limit == 100)
      {
        this.Parent.GetItem("ChBright").Text = percent;
      } else
      {
        this.Parent.GetItem("ChBright").Text = parseInt((percent / 100) * 255);
      }
   } else if (this.Parent.GetItem("Type").Text == 3)
   {
      this.Parent.GetItem("ChTemp").Text = LblValue.Value;
   }
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
  
  g_oWidgetsList.Clear();
  ClearListeners();
  for (var i = 0; i <= WidgetsBuff.length - 1; i++)
  {
     g_oWidgetsList.AddPopup(WidgetsBuff[i]);
     l_oTempPopup = IR.GetPopup(WidgetsBuff[i]).GetItem("Type");
     if (l_oTempPopup != null)
     {
       switch (l_oTempPopup.Text)
       {
         case '1':
           AddPickerListeners(WidgetsBuff[i]);
         break; 
         case '2':
           AddDimmerListeners(WidgetsBuff[i]);
         break;
         case '3':
           AddCondListeners(WidgetsBuff[i]);
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
  IR.HidePopup(this.Parent.Name);
  IR.ShowPopup(g_oRoomsList.Parent.Name);
  MainTitle.Text = "Home";
  
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
    //IR.Log("interval = " + interval);
    
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
    //IR.Log('this.Parent.GetItem("timer").Text = ' + this.Parent.GetItem("timer").Text)
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
    //IR.Log("interval = " + interval);
    
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
    //IR.Log('this.Parent.GetItem("timer").Text = ' + this.Parent.GetItem("timer").Text)
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

function AddDimmerListeners(in_sPopupName)
{
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FbBright.Text");
  SubscriberBuff.push("UI." + in_sPopupName + ".FbBright.Text");
  SetDimmerFromTag("UI." + in_sPopupName + ".FbBright.Text", IR.GetItem(in_sPopupName).GetItem("FbBright").Text);  
}

function AddCondListeners(in_sPopupName)
{
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FeedTemp.Text");
  SubscriberBuff.push("UI." + in_sPopupName + ".FeedTemp.Text");
  SetTemperature("UI." + in_sPopupName + ".FeedTemp.Text", IR.GetItem(in_sPopupName).GetItem("FeedTemp").Text); 
}


function AddPickerListeners(in_sPopupName)
{
  //IR.Log("in_sPopupName = " + in_sPopupName)
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FeedLblRed.Text");
  SubscriberBuff.push("UI." + in_sPopupName + ".FeedLblRed.Text");
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FeedLblGreen.Text");
  SubscriberBuff.push("UI." + in_sPopupName + ".FeedLblGreen.Text");
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FeedLblBlue.Text");
  SubscriberBuff.push("UI." + in_sPopupName + ".FeedLblBlue.Text");
  IR.SubscribeTagChange("UI." + in_sPopupName + ".FeedLblBright.Text");
  SubscriberBuff.push("UI." + in_sPopupName + ".FeedLblBright.Text");
  SetBrightness("UI." + in_sPopupName + ".FeedLblBright.Text", IR.GetItem(in_sPopupName).GetItem("FeedLblBright").Text);
}


function SetTemperature(in_path, in_value)
{
   var item = in_path.split(".");
   IR.GetItem(item[1]).GetItem("LblValue").Value = in_value;
   IR.GetItem(item[1]).GetItem("МlvDimmer").Value = in_value;
}

function SetBrightness(in_path, in_value)
{
  var item = in_path.split(".");
  
  if (IR.GetItem(item[1]).GetItem("Limit").Text == 100)
  {
    IR.GetItem(item[1]).GetItem("MlvBrigthness").State = parseInt(in_value * 21 / 100);
  } else
  {
    IR.GetItem(item[1]).GetItem("MlvBrigthness").State = parseInt(in_value * 21 / 255);
  }
  
  var R = parseInt(IR.GetItem(item[1]).GetItem("FeedLblRed").Text);
  var G = parseInt(IR.GetItem(item[1]).GetItem("FeedLblGreen").Text);
  var B = parseInt(IR.GetItem(item[1]).GetItem("FeedLblBlue").Text);
	
	// It gets the current value of opacity
   var l_nNowValue = IR.GetItem(item[1]).GetItem("MlvBrigthness").State * g_nHexOnePercentOf29;   
	
   // It forms values to sent the item color
   var l_nColor = R << 24 | G << 16 | B << 8 | l_nNowValue;

   // It sets the new color value of the displaying item 
   IR.GetItem(item[1]).GetItem("BtnDisplayColor").GetState(0).FillColor = l_nColor; 
}

function SetDimmerFromTag(in_path, in_value)
{
  //IR.Log("in_path = " + in_path)
  var item = in_path.split(".");
  
  if (IR.GetItem(item[1]).GetItem("Limit").Text == 100)
  {
    IR.GetItem(item[1]).GetItem("МlvDimmer").State = parseInt(in_value * 46 / 100);
  } else
  {
    IR.GetItem(item[1]).GetItem("МlvDimmer").State = parseInt(in_value * 46 / 255);
  }
  IR.GetItem(item[1]).GetItem("LblValue").Value = in_value;
  
    
   //var l_nNowValue = IR.GetItem(item[1]).GetItem("MlvBrigthness").State * g_nHexOnePercentOf29;   
	
}


//Set global listener
IR.SetGlobalListener(IR.EVENT_GLOBAL_TAG_CHANGE, function(name, value) 
{
     //IR.Log("Global Listener Activated: " + name + "\tValue: " + value);
     var item = name.split(".");
     switch (item[2])
     {
        case "FeedLblBright":
        case "FeedLblRed":
        case "FeedLblGreen":
        case "FeedLblBlue":
          SetBrightness(name, value)
        break;
        case "FbBright":
          SetDimmerFromTag(name, value)
        break;
        case "FeedTemp":
          SetTemperature(name, value);
        break;
     }
});
