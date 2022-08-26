function UserSlider(Level, Slider){   

   function Move(){

      Slider.X = Level.X + Level.Value * Level.Width / 100 - Slider.Width * Level.Value / 100 ;
   }

   IR.AddListener(IR.EVENT_START, 0, Move); 

   IR.AddListener(IR.EVENT_ITEM_PRESS, Level, Move); 
   IR.AddListener(IR.EVENT_MOUSE_MOVE, Level, Move); 
   IR.AddListener(IR.EVENT_TOUCH_MOVE, Level, Move); 

   IR.SetInterval(1000, Move);
}
                  
function UserSlider_vert(Level, Slider){   

   function Move(){
   
      Slider.Y = Level.Y + Level.Height - Level.Value * Level.Height / 100 - (Slider.Height - Slider.Height * Level.Value / 100);
             

   }

   IR.AddListener(IR.EVENT_START, 0, Move); 

   IR.AddListener(IR.EVENT_ITEM_PRESS, Level, Move); 
   IR.AddListener(IR.EVENT_MOUSE_MOVE, Level, Move);
   IR.AddListener(IR.EVENT_TOUCH_MOVE, Level, Move); 

   IR.SetInterval(1000, Move);
}
        
var UserSlider_1 = new UserSlider(IR.GetItem("Office_R1_Activites").GetItem("Slider1"), IR.GetItem("Office_R1_Activites").GetItem("Slider Dimmer"));
var UserSlider_2 = new UserSlider(IR.GetItem("Office_R1_Activites").GetItem("Slider2"), IR.GetItem("Office_R1_Activites").GetItem("Slider Temperature"));
var UserSlider_3 = new UserSlider(IR.GetItem("Office_R2_Activites").GetItem("Slider1"), IR.GetItem("Office_R2_Activites").GetItem("Slider Dimmer"));
var UserSlider_4 = new UserSlider(IR.GetItem("Office_R2_Activites").GetItem("Slider2"), IR.GetItem("Office_R2_Activites").GetItem("Slider Temperature"));
var UserSlider_5 = new UserSlider(IR.GetItem("Office_R3_Activites").GetItem("Slider1"), IR.GetItem("Office_R3_Activites").GetItem("Slider Temperature"));
var UserSlider_6 = new UserSlider(IR.GetItem("DVD").GetItem("Slider"), IR.GetItem("DVD").GetItem("Slider Audio"));
var UserSlider_7 = new UserSlider(IR.GetItem("Audio").GetItem("Slider"), IR.GetItem("Audio").GetItem("Slider Audio")); 
var UserSlider_8 = new UserSlider(IR.GetItem("TV").GetItem("Slider"), IR.GetItem("TV").GetItem("Slider TV"));
var UserSlider_9 = new UserSlider(IR.GetItem("Radio").GetItem("Slider"), IR.GetItem("Radio").GetItem("Slider Radio")); 
var UserSlider_10 = new UserSlider(IR.GetItem("Room").GetItem("Slider1"), IR.GetItem("Room").GetItem("Slider Dimmer"));
var UserSlider_11 = new UserSlider(IR.GetItem("Room").GetItem("Slider2"), IR.GetItem("Room").GetItem("Slider Temperature")); 
var UserSlider_12 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level1"), IR.GetItem("Group Sound").GetItem("Slider Sound1"));
var UserSlider_13 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level2"), IR.GetItem("Group Sound").GetItem("Slider Sound2"));
var UserSlider_14 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level3"), IR.GetItem("Group Sound").GetItem("Slider Sound3"));
var UserSlider_15 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level4"), IR.GetItem("Group Sound").GetItem("Slider Sound4"));
var UserSlider_16 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level5"), IR.GetItem("Group Sound").GetItem("Slider Sound5"));
var UserSlider_17 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level6"), IR.GetItem("Group Sound").GetItem("Slider Sound6"));
var UserSlider_18 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level7"), IR.GetItem("Group Sound").GetItem("Slider Sound7"));
var UserSlider_19 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level8"), IR.GetItem("Group Sound").GetItem("Slider Sound8"));
var UserSlider_20 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level9"), IR.GetItem("Group Sound").GetItem("Slider Sound9"));
var UserSlider_21 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level10"), IR.GetItem("Group Sound").GetItem("Slider Sound10"));
var UserSlider_22 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level11"), IR.GetItem("Group Sound").GetItem("Slider Sound11"));
var UserSlider_23 = new UserSlider(IR.GetItem("Group Sound").GetItem("Level12"), IR.GetItem("Group Sound").GetItem("Slider Sound12"));



var UserSlider_vert_1 = new UserSlider_vert(IR.GetItem("setBlind1").GetItem("Slider"), IR.GetItem("setBlind1").GetItem("Slider setBlind1"));
var UserSlider_vert_2 = new UserSlider_vert(IR.GetItem("setBlind2").GetItem("Slider"), IR.GetItem("setBlind2").GetItem("Slider setBlind2"));
var UserSlider_vert_3 = new UserSlider_vert(IR.GetItem("setTurn1").GetItem("Slider"), IR.GetItem("setTurn1").GetItem("Slider setTurn1"));
var UserSlider_vert_4 = new UserSlider_vert(IR.GetItem("setTurn2").GetItem("Slider"), IR.GetItem("setTurn2").GetItem("Slider setTurn2"));
var UserSlider_vert_5 = new UserSlider_vert(IR.GetItem("setTemp 1").GetItem("Slider"), IR.GetItem("setTemp 1").GetItem("Slider setTemp1"));
var UserSlider_vert_6 = new UserSlider_vert(IR.GetItem("setTemp 2").GetItem("Slider"), IR.GetItem("setTemp 2").GetItem("Slider setTemp2"));
var UserSlider_vert_7 = new UserSlider_vert(IR.GetItem("setTemp 3").GetItem("Slider"), IR.GetItem("setTemp 3").GetItem("Slider setTemp3"));
var UserSlider_vert_8 = new UserSlider_vert(IR.GetItem("setTemp 4").GetItem("Slider"), IR.GetItem("setTemp 4").GetItem("Slider setTemp4"));
var UserSlider_vert_9 = new UserSlider_vert(IR.GetItem("setTemp 5").GetItem("Slider"), IR.GetItem("setTemp 5").GetItem("Slider setTemp5"));
var UserSlider_vert_10 = new UserSlider_vert(IR.GetItem("setTemp 6").GetItem("Slider"), IR.GetItem("setTemp 6").GetItem("Slider setTemp6"));
var UserSlider_vert_11 = new UserSlider_vert(IR.GetItem("setTemp 7").GetItem("Slider"), IR.GetItem("setTemp 7").GetItem("Slider setTemp7"));
var UserSlider_vert_12 = new UserSlider_vert(IR.GetItem("setTemp 8").GetItem("Slider"), IR.GetItem("setTemp 8").GetItem("Slider setTemp8"));
var UserSlider_vert_13 = new UserSlider_vert(IR.GetItem("setTemp 9").GetItem("Slider"), IR.GetItem("setTemp 9").GetItem("Slider setTemp9"));
var UserSlider_vert_14 = new UserSlider_vert(IR.GetItem("setTemp 10").GetItem("Slider"), IR.GetItem("setTemp 10").GetItem("Slider setTemp10"));
var UserSlider_vert_15 = new UserSlider_vert(IR.GetItem("setTemp 11").GetItem("Slider"), IR.GetItem("setTemp 11").GetItem("Slider setTemp11"));
var UserSlider_vert_16 = new UserSlider_vert(IR.GetItem("setTemp 12").GetItem("Slider"), IR.GetItem("setTemp 12").GetItem("Slider setTemp12"));






