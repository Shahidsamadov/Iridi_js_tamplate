function Indicator(crestron, settings) {
   var that = this;
   this.settings = settings;
   this.crestron = crestron;
   //items
   this.popup = settings.popup;
   this.popupItem = settings.popupItem;
   if (this.popupItem == null)
      this.popupItem = IR.GetPopup(this.popup);
   this.itemIndicator = settings.indicator;
   this.itemIndicatorObject = this.popupItem.GetItem(this.itemIndicator);
   //signals
   this.signalFb = settings.signalFb;
   //status
   this.status = false;
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, crestron.device, function(name, value) {
      if (name == that.signalFb) {
         that.setStatus();
      }
   });
   
   this.animate = function() {
      var interval = IR.SetInterval(10, function() {
         var opacity = that.itemIndicatorObject.GetState(0).Opacity;
         if (that.status && opacity < 255) {
           var opl = that.itemIndicatorObject.GetState(0).Opacity + 50;
           if (opl > 255) opl = 255;
           that.itemIndicatorObject.GetState(0).Opacity = opl; 
         } else if (!that.status && opacity > 0) {
           var opl = that.itemIndicatorObject.GetState(0).Opacity - 50;
           if (opl < 0) opl = 0;
           that.itemIndicatorObject.GetState(0).Opacity = opl; 
         } else {
            IR.ClearInterval(interval);
      }   
      }); 
   }
   
   this.setStatus = function() {
      this.status = this.crestron.getValue(this.signalFb);
      this.animate();
   }
   this.setStatus();
}