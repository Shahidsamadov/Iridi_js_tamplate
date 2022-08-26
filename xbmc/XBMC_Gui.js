// * Configuration will can change
var XBMC_item_bg = IR.GetItem("XBMC_Main"); // First Popup for Start   
var XBMC_item = IR.GetItem("XBMC_Audio_Main"); // First Popup for Start   
var XBMC_aTime = 300;                    // Time for animation
var XBMC_tween= "TWEEN_LINEAR";
var XBMC_MenuShow = false;
var XBMC_PrevOpen = "";
var XBMC_PrevMenu = -1;

// * Configuration will can not change  
var XBMC_dir = "";         
var XBMC_timer = 0;
var XBMC_DragNow = false;
var XBMC_menu = IR.GetItem("XBMC_Menu");

// * User Function for Macros Script Call
function XBMC_iMenu_DragTrue()
{
   XBMC_DragNow = true;
}              
function XBMC_iMenu_DragFalse()
{
   XBMC_DragNow = false;
}

function XBMC_iMenu_newItem()
{
   XBMC_dir = "left";
   XBMC_item= IR.GetItem(IR.GetVariable("Tokens.XBMC_Curent_Popup"));
   IR.ShowPopup(XBMC_item.Name);
}

function XBMC_iMenu_Switch()
{
    if(XBMC_dir == "")
    {
         if(XBMC_item.X == XBMC_menu.Width)
         {
            XBMC_dir = "left";                                 
         }
                             
         if(XBMC_item.X == 16)
         { 
            XBMC_dir = "right";                
         }                
    }
}

function XBMC_iMenu_Random()
{
   IR.SetVariable("Tokens.XBMC_Menu", Math.random() * -100 - 1);
}

function XBMC_BackButton()
{
     XBMC_dir = "right";      
     IR.GetItem("XBMC_Main").GetItem("Back").Y = -100;    
}

// Add 23/08
function XBMC_PlaylistButton()
{
   if((IR.GetVariable("Tokens.XBMC_Menu") == 0) || (IR.GetVariable("Tokens.XBMC_Menu") == 1))
   {
      IR.GetItem("XBMC_Main").GetItem("Back").Y = 16; 
      XBMC_PrevOpen = XBMC_item;
      XBMC_PrevMenu = IR.GetVariable("Tokens.XBMC_Menu");
      IR.ShowPopup("XBMC_Audio_Playlist");
      XBMC_item = IR.GetPopup("XBMC_Audio_Playlist");
      IR.SetVariable("Tokens.XBMC_Menu",2)
      XBMC_dir = "left";     
   }       
}

function XBMC_GUIStart()
{         
    XBMC_MenuShow = false;
    IR.SetVariable("Tokens.XBMC_Menu", 0);
    IR.SetVariable("Tokens.XBMC_Curent_Popup", "XBMC_Audio_Main");
    XBMC_item_bg = IR.GetItem("XBMC_Main");
    XBMC_item= IR.GetItem("XBMC_Audio_Main");
    IR.ShowPage("XBMC_Background");
    IR.RemoveRecognizer(IR.GESTURE_SWIPE_LEFT);
    IR.RemoveRecognizer(IR.GESTURE_SWIPE_RIGHT);
    IR.ShowPopup(XBMC_menu.Name);
    IR.ShowPopup(XBMC_item_bg.Name);
    IR.ShowPopup(XBMC_item.Name); 
    IR.AddRecognizer(IR.GESTURE_SWIPE_LEFT);
    IR.AddRecognizer(IR.GESTURE_SWIPE_RIGHT);
}  

// Add Search
IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("XBMC_Audio_Source").GetItem("SearchShow"), function()
{
   if(IR.GetItem("XBMC_Audio_Source").GetItem("SearchShow").Value == 1)
   {
      IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_PRESS); 
   }
   else
   {
     IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_RELEASE);   
   }   
});

IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("XBMC_Video_Source").GetItem("SearchShow"), function()
{
   if(IR.GetItem("XBMC_Video_Source").GetItem("SearchShow").Value == 1)
   {
      IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_PRESS); 
   }
   else
   {
     IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_RELEASE);   
   }   
});

IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("XBMC_Photo_Source").GetItem("SearchShow"), function()
{
   if(IR.GetItem("XBMC_Photo_Source").GetItem("SearchShow").Value == 1)
   {
      IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_PRESS); 
   }
   else
   {
     IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_RELEASE);   
   }   
});


IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("XBMC_TVShow_Source").GetItem("SearchShow"), function()
{
   if(IR.GetItem("XBMC_TVShow_Source").GetItem("SearchShow").Value == 1)
   {
      IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_PRESS); 
   }
   else
   {
     IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_RELEASE);   
   }   
});
     
// * System Function
IR.AddListener(IR.EVENT_START, 0, function()  
{     
    XBMC_GUIStart();
    IR.AddListener(IR.EVENT_GESTURE_BEGIN, IR.GetPage("XBMC_Background"), function(gesture, x, y)
    {
        if(!XBMC_DragNow)
        {
           switch(gesture)
           {
              case IR.GESTURE_SWIPE_LEFT:
                  if (XBMC_MenuShow != false)
                  {
                    if(XBMC_item.X > XBMC_menu.X + 16) 
                        XBMC_dir = "left";                             
                  }
                  else 
                  {                            
                       if (IR.GetVariable("Tokens.XBMC_Menu") != 2)
                        {
                            // Add 23/08
                           XBMC_PlaylistButton();  
                        }   
                  }                   
              break;
              
              case IR.GESTURE_SWIPE_RIGHT:
              if(XBMC_PrevOpen == "" )
              {    
                 if(XBMC_item.X < XBMC_menu.Width)
                     XBMC_dir = "right"; 
                  else
                  if(XBMC_MenuShow)
                  {
                    // IR.GetItem("XBMC_Menu").GetItem("Back").StartActions(IR.EVENT_ITEM_RELEASE);  
                  } 
              }
              else
              {
               XBMC_BackButton(); 
              }    
              break;
           }
        }
    });
});

function XBMC_AnimMenu(time, aStart, aFinish, oStart, oFinish, sStart, sFinish, ifValue, fValue, XBMC_tween)
{
      XBMC_timer += time;
        
      XBMC_item.X = IR.Tween(XBMC_tween, XBMC_timer, aStart, aFinish, XBMC_aTime); 
      
      // Add 23/08
      if (XBMC_PrevOpen != "")
      {
      XBMC_PrevOpen.ScaleX = XBMC_PrevOpen.ScaleY = IR.Tween(XBMC_tween, XBMC_timer, sStart, sFinish, XBMC_aTime); 
      XBMC_PrevOpen.GetState(0).Opacity = IR.Tween(XBMC_tween, XBMC_timer, oStart, oFinish, XBMC_aTime);
      }
      
      if (XBMC_PrevOpen == "")
      XBMC_item_bg.X = IR.Tween(XBMC_tween, XBMC_timer, aStart, aFinish, XBMC_aTime);           
      XBMC_menu.GetState(0).Opacity  = IR.Tween(XBMC_tween, XBMC_timer, oStart, oFinish, XBMC_aTime);
      XBMC_menu.ScaleX = XBMC_menu.ScaleY = IR.Tween(XBMC_tween, XBMC_timer, sStart, sFinish, XBMC_aTime);
}
      
function XBMC_ClearAnim(fValue)
{
   XBMC_dir = ""; 
   XBMC_item.X = fValue;  
   XBMC_timer = 0; 
}

IR.AddListener(IR.EVENT_WORK, 0, function(time)
{            
   switch(XBMC_dir)
   {
      case "right":
            IR.HidePopup("XBMC_Audio_Source_Searching");
            IR.HidePopup("XBMC_Photo_Source_Searching");
            IR.HidePopup("XBMC_TVShow_Source_Searching");
            IR.HidePopup("XBMC_Video_Source_Searching");
            IR.GetItem("XBMC_Audio_Source").GetItem("SearchShow").Value = 0;
            IR.GetItem("XBMC_Video_Source").GetItem("SearchShow").Value = 0;
            IR.GetItem("XBMC_Photo_Source").GetItem("SearchShow").Value = 0;
            IR.GetItem("XBMC_TVShow_Source").GetItem("SearchShow").Value = 0;
            IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_RELEASE);
            
            XBMC_AnimMenu(time, XBMC_menu.X, XBMC_menu.Width, 0, 255, 0.9, 0.1, XBMC_menu.Width - 10, XBMC_menu.Width, XBMC_tween);
            if (XBMC_item.X > XBMC_menu.Width - 10)
            {
               XBMC_ClearAnim(XBMC_menu.Width);   
                if (XBMC_PrevOpen == "")
                {
                  XBMC_MenuShow = true
                  XBMC_menu.GetState(0).Opacity = 255;
                  XBMC_item_bg.X = XBMC_menu.Width - 16;
               }
               else
               {
                  XBMC_MenuShow = false;
                  XBMC_item = IR.GetPopup(XBMC_PrevOpen.Name); 
                  XBMC_PrevOpen = "";  
                  IR.ShowPopup(XBMC_item_bg); 
                  IR.ShowPopup(XBMC_PrevOpen.Name);
                  IR.HidePopup("XBMC_Audio_Playlist");  
                  IR.SetVariable("Tokens.XBMC_Menu",XBMC_PrevMenu);   
                  
                  // Add 23/08
                  XBMC_item.GetState(0).Opacity = 255;
                  XBMC_item.ScaleX = XBMC_item.ScaleY = 1;                             
               }   
            }  
         break;
      case "left":            
            IR.HidePopup("XBsMC_Audio_Source_Searching");
            IR.HidePopup("XBMC_Photo_Source_Searching");
            IR.HidePopup("XBMC_TVShow_Source_Searching");
            IR.HidePopup("XBMC_Video_Source_Searching");
            IR.GetItem("XBMC_Audio_Source").GetItem("SearchShow").Value = 0;
            IR.GetItem("XBMC_Video_Source").GetItem("SearchShow").Value = 0;
            IR.GetItem("XBMC_Photo_Source").GetItem("SearchShow").Value = 0;
            IR.GetItem("XBMC_TVShow_Source").GetItem("SearchShow").Value = 0;
            IR.GetItem("XBMC_Audio_Source").GetItem("HideKeyboardEvent").StartActions(IR.EVENT_ITEM_RELEASE);
            
         XBMC_AnimMenu(time, XBMC_menu.Width, -XBMC_menu.Width, 255, -255, 1, -0.1, XBMC_menu.X + 5, XBMC_menu.X, XBMC_tween);
         if (XBMC_item.X < XBMC_menu.X + 5)
         {
            XBMC_ClearAnim(XBMC_menu.X + 16);
            XBMC_item_bg.X = XBMC_menu.X;  
            XBMC_MenuShow = false;      
         };
         break;
   }    
});    