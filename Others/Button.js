function Button(crestron, settings) {
   var that = this;
   this.settings = settings;
   this.crestron = crestron;
   this.timeout = 200;
   this.releaseTimeoutID;
   //items
   this.popup = settings.popup;
   this.popupItem = settings.popupItem;
   if (this.popupItem == null)
      this.popupItem = IR.GetPopup(this.popup);
   this.itemBG = settings.bg;
   this.itemIndicator = settings.indicator;
   this.itemBGObject = this.popupItem.GetItem(this.itemBG);
   this.itemIndicatorObject = this.popupItem.GetItem(this.itemIndicator);
   //signals
   this.signalFb = settings.signalFb;
   //actions
   this.funcPress = null;
   //status
   this.status = false;
   
   this.setFunc = function(funcPress) {
      if (funcPress != null) this.funcPress = funcPress; 
   }
   
   this.setListeners = function() {
      IR.AddListener(IR.EVENT_ITEM_PRESS, this.itemBGObject, function() {
         that.press();
      });
      IR.AddListener(IR.EVENT_ITEM_RELEASE, this.itemBGObject, function() {
         that.release();
      });
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, crestron.device, function(name, value) {
      if (name == that.signalFb) {
         that.setStatus();
      }
   });
   IR.AddListener(IR.EVENT_ONLINE, crestron.device, function() {
      IR.SetTimeout(2000, function() {
         that.setStatus();
      });
   });
   IR.SetInterval(5000, function() {
      that.setStatus();
   });
   
   this.press = function() { 
      this.itemBGObject.Value = 1;
      if (that.funcPress != null) that.funcPress();
   }
   
   this.release = function() {
      that.itemBGObject.Value = 0;
   }
   
   this.animate = function() {
      if (this.status) {
         this.itemIndicatorObject.GetState(0).Opacity = 255;
      } else {
         this.itemIndicatorObject.GetState(0).Opacity = 0;
      }
      /*var interval = IR.SetInterval(1000, function() {
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
      });*/ 
   }
   
   this.setStatus = function() {
      this.status = this.crestron.getValue(this.signalFb);
      this.animate();
   }
   this.setStatus();
}