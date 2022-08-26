function Switch(crestron, settings) {
   var that = this;
   this.crestron = crestron;
   this.settings = settings;
   this.timeout = 200;
   this.releaseTimeoutID;
   this.releaseOnTheEdge = false;
   //items
   this.popup = settings.popup;
   this.popupItem = settings.popupItem;
   if (this.popupItem == null)
      this.popupItem = IR.GetPopup(this.popup);
   this.itemBG = settings.bg;
   this.itemIndicator = settings.indicator;
   this.itemSlider = settings.slider;
   this.itemXY = settings.xy;
   this.itemSliderObject = this.popupItem.GetItem(this.itemSlider);
   this.itemXYObject = this.popupItem.GetItem(this.itemXY);
   this.itemIndicatorObject = this.popupItem.GetItem(this.itemIndicator);
   //sizes
   this.sliderYOffset = settings.sliderYOffset;
   this.sliderXOffsetOFF = settings.sliderXOffsetOff;
   this.sliderXOffsetON = settings.sliderXOffsetOn;
   this.bgX = this.popupItem.GetItem(that.itemBG).X;
   //signals
   this.signalFb = settings.signalFb;
   //actions
   this.funcOff = null;
   this.funcOn = null;
   this.funcExecuted = false;
   //status
   this.status = false;
   this.finger = false;
   this.startX;
   this.startOX;
   
   this.setTimeout = function(timeout) {
      this.timeout = timeout;
   }
   
   this.setListeners = function() {
      IR.AddListener(IR.EVENT_MOUSE_DOWN, this.itemXYObject, function() {
         //IR.Log("press");
         that.press();
      });
      IR.AddListener(IR.EVENT_MOUSE_UP, this.itemXYObject, function() {
         //IR.Log("release");
         that.release();
      });
      IR.AddListener(IR.EVENT_MOUSE_MOVE, this.itemXYObject, function() {
         //IR.Log("move");
         that.move();
      });
      IR.AddListener(IR.EVENT_TOUCH_DOWN, this.itemXYObject, function() {
         that.press();
      });
      IR.AddListener(IR.EVENT_TOUCH_UP, this.itemXYObject, function() {
         that.release();
      });
      IR.AddListener(IR.EVENT_TOUCH_MOVE, this.itemXYObject, function() {
         that.move();
      });
   }
   
   this.setFunc = function(funcOff, funcOn) {
      if (funcOn != null) this.funcOn = funcOn;
      if (funcOff != null) this.funcOff = funcOff;      
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
      that.releaseOnTheEdge = false;
      if (that.releaseTimeoutID != null)
         IR.ClearInterval(that.releaseTimeoutID);
      var sliderAbsX = that.itemSliderObject.X;
      var sliderWidth = that.itemSliderObject.Width;
      var xyAbsX = that.itemXYObject.X + that.itemXYObject.ValueX;
      if (xyAbsX >= sliderAbsX && xyAbsX <= sliderWidth + sliderAbsX) {
         that.finger = true;	
         that.startX = that.itemXYObject.X + that.itemXYObject.ValueX;
         that.startOX = that.itemSliderObject.X;
      }
   }

   this.release = function() {
      that.finger = false;
      that.funcExecuted = false;
      if (that.releaseOnTheEdge) {
         that.releaseTimeoutID = IR.SetTimeout(that.timeout, function() {
            that.animate();
         });
      } else {
         that.animate();
      }
   }
   
   this.move = function() {
      if (that.finger) {
         var onX = that.bgX + that.sliderXOffsetON;
         var offX = that.bgX + that.sliderXOffsetOFF;
         var position = that.startOX + ((that.itemXYObject.X + that.itemXYObject.ValueX) - that.startX);
         if (position < offX) {
            position = offX;
            if (!that.funcExecuted && that.status && that.funcOff != null) {   
               that.funcOff();
               that.funcExecuted = true;
               that.releaseOnTheEdge = true; 
            }
         }        
         if (position > onX) {
            position = onX;
            if (!that.funcExecuted && !that.status && that.funcOn != null) {
               that.funcOn();
               that.funcExecuted = true;
               that.releaseOnTheEdge = true;
            }
         }
         that.itemIndicatorObject.GetState(0).Opacity = (position-offX)/(onX-offX)*255;
         that.itemSliderObject.X = position;
      }	   
   }
   
   /*IR.SetInterval(10000, function() {
      that.setStatus();
   });*/
   
   this.animate = function() {
      var onX = that.bgX + that.sliderXOffsetON;
      var offX = that.bgX + that.sliderXOffsetOFF;
      
      if (that.status && !that.finger) {
         that.itemSliderObject.X = onX;
         that.itemIndicatorObject.GetState(0).Opacity = 255;
      } else if (!that.status && !that.finger) {
         that.itemSliderObject.X = offX;
         that.itemIndicatorObject.GetState(0).Opacity = 0;
      } 
      
      //IR.Log("animate");
      /*var interval = IR.SetInterval(10, function() {
      if (that.status && !that.finger && ((that.itemSliderObject.X + 1) < onX)) {
         that.itemSliderObject.X = that.itemSliderObject.X + ((that.bgX + that.sliderXOffsetON) - that.itemSliderObject.X)/2;   
         that.itemIndicatorObject.GetState(0).Opacity = (that.itemSliderObject.X-offX)/(onX-offX)*255;
      } else if (!that.status && !that.finger && ((that.itemSliderObject.X - 1) > offX)) {
         that.itemSliderObject.X = that.itemSliderObject.X - (that.itemSliderObject.X - (that.bgX + that.sliderXOffsetOFF))/2;
         that.itemIndicatorObject.GetState(0).Opacity = (that.itemSliderObject.X-offX)/(onX-offX)*255;
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