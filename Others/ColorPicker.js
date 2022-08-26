function work_pick_color(in_color_picker, in_color_resipient, in_sRed, in_sGreen, in_sBlue)
{

   var color = in_color_picker.PickColor;
   var red = (color  >> 24) & 0xFF;
   var green = (color >> 16) & 0xFF;
   var blue = (color >> 8) & 0xFF;
 
   in_color_resipient.GetState(0).FillColor = color;


}



IR.AddListener(IR.EVENT_ITEM_RELEASE,
               IR.GetItem("setColor").GetItem("Item Color Picker"),       
               function()
               {
                  work_pick_color(
                     IR.GetItem("setColor").GetItem("Item Color Picker"), 
                     IR.GetItem("setColor").GetItem("Item Display Color"), 
                     "Red",                                                      
                     "Green",                                                    
                     "Blue");                                                    
               }                                                                 
               );
               
               

               
               IR.AddListener(IR.EVENT_MOUSE_MOVE,IR.GetItem("setColor").GetItem("Item Color Picker"),       
               function()
               {
                  work_pick_color(
                     IR.GetItem("setColor").GetItem("Item Color Picker"), 
                     IR.GetItem("setColor").GetItem("Item Display Color"), 
                     "Red",                                                      
                     "Green",                                                    
                     "Blue");                                                    
               }                                                                 
               );
               
               
               IR.AddListener(IR.EVENT_TOUCH_MOVE,IR.GetItem("setColor").GetItem("Item Color Picker"),       
               function()
               {
                  work_pick_color(
                     IR.GetItem("setColor").GetItem("Item Color Picker"), 
                     IR.GetItem("setColor").GetItem("Item Display Color"), 
                     "Red",                                                      
                     "Green",                                                    
                     "Blue");                                                    
               }                                                                 
               );