function iTunes_Move_Long_Text(page, item, max, destination){
   var i = 0;
   
   item = IR.GetItem(page).GetItem(item);
   destination = IR.GetItem(page).GetItem(destination);
   
   function Start(){
      var text = item.GetState(0).Text;
         
      if(text.length > max)
         if(i <= text.length - max){
            destination.GetState(0).Text = text.substring(i, i + max);
            i++;
         }                                               
         else
            i = 0;           
      else
         destination.GetState(0).Text = text;    
   }
   IR.SetInterval(250, Start)
}
iTunes_Move_Long_Text("XBMC_Audio","Track", 28, "Track_Anim");
iTunes_Move_Long_Text("XBMC_Video","Track", 28, "Track_Anim");
iTunes_Move_Long_Text("XBMC_TVShows","Track", 28, "Track_Anim");
