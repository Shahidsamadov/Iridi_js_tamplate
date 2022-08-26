var SM = function(crestron) {
   var that = this;
   this.crestron = crestron;
   this.checkInterval = 5000;
   this.popups = [];
   
   this.addPopup = function(popupName) {
      var popup = new Popup(popupName);
      this.popups.push(popup);   
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE , this.crestron.device, function(name,value)
   {
      var index = -1;
      for (var i=0; i<that.popups.length; i++) {
         if (name == that.popups[i].name) {
            index = i;
            that.popups[i].visible = value;
            break;
         }
      }
      that.draw();   
   });
   
   this.draw = function() {
      for (var i=0; i<this.popups.length; i++) {
         if (this.popups[i].visible == true) {
            IR.Log("Show Popup: " + this.popups[i].name);
            IR.ShowPopup(this.popups[i].name);            
         } else {
            IR.HidePopup(this.popups[i].name);
         }
      }
   }
   
   IR.SetInterval(this.checkInterval, function() {
      var redraw = false;
      for (var i=0; i<that.popups.length; i++) {
         var value = that.crestron.getValue(that.popups[i].name);
         if (value != that.popups[i].visible) {
            redraw = true;
            that.popups[i].visible = value;   
         }
      }
      if (redraw)
         that.draw();
   });
}