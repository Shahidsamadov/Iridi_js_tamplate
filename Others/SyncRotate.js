var SyncRotate = function(crestron, popup, item) {
   var that = this;
   this.crestron = crestron;
   this.popup = popup;
   this.item = item;
   this.itemObject = IR.GetPopup(this.popup).GetItem(this.item);
   this.timerID = null;
   this.active = false;
   this.startAnimation = function() {
      if (!this.active) {
         this.active = true;
         this.timerID = IR.SetInterval(5, function() {
            that.itemObject.Angle = that.itemObject.Angle + 1;
         });   
      }
   }
   this.stopAnimation = function() {
      this.active = false;
      if (this.timerID != null) {
         IR.ClearInterval(this.timerID);
      }
   } 
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name, value) {
      if (name == that.popup) {
         if (value) 
            that.startAnimation();
         else 
            that.stopAnimation();
      }   
   });
}