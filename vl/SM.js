/*
Name: ScreenManager
Programmer: Alexey Shvalev
version: 2.3
*/

var Popup = function(name) {
   this.name = name;
   this.visible = false;
}

var Page = function(name) {
   this.name = name;
}

var SM = function(crestron) {
   var that = this;
   this.crestron = crestron;
   this.checkInterval = 5000;
   this.page;
   this.popups = [];
   this.o = 0;    //0 - horizontal | 1 - vertical
   this.canRotate = false;
   this.showWaitConnection = false;
   
   this.setRotate = function(canRotate) {
      this.canRotate = canRotate;
   }
   this.setCheckInterval = function(checkInterval) {
      this.checkInterval = checkInterval;     
   }
   this.addPopup = function(popupName) {
      var popup = new Popup(popupName);
      this.popups.push(popup);   
   }
   this.addPage = function(pageName) {
      var page = new Page(pageName);
      this.page = page;
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE , this.crestron.device, function(name,value)
   {
      for (var i=0; i<that.popups.length; i++) {
         if (name == that.popups[i].name) {
            that.popups[i].visible = value;
            break;
         }
      }
      that.draw();   
   });
   
   this.draw = function() {
      for (var i=0; i<this.popups.length; i++) {
         if (this.popups[i].visible == true) {
            if (this.canRotate && this.o == 1) {
               IR.ShowPopup(this.popups[i].name + "V");
               IR.HidePopup(this.popups[i].name);
            } else {
               IR.ShowPopup(this.popups[i].name);
               IR.HidePopup(this.popups[i].name + "V");
            }            
         } else {
            IR.HidePopup(this.popups[i].name);
            if (this.canRotate) {
               IR.HidePopup(this.popups[i].name + "V");
            }
         }
      }
      if (this.canRotate && this.o == 1) {
            IR.ShowPage(this.page.name + "V");
      } else {
            IR.ShowPage(this.page.name);
      }
      if (this.showWaitConnection) {
         if (that.canRotate && that.o == 1) {
            IR.ShowPopup("PopupWaitConnectionV");
            IR.HidePopup("PopupWaitConnection");
         } else {
            IR.ShowPopup("PopupWaitConnection");
            IR.HidePopup("PopupWaitConnectionV");
         } 
      } else {
         IR.HidePopup("PopupWaitConnection");
         IR.HidePopup("PopupWaitConnectionV");
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
   
   
   IR.AddListener(IR.EVENT_ORIENTATION, 0, function(orientation)
   {
      switch (orientation) {
         case 1:                                         
            that.o = 1;
         break;
         case 2:                                         
            that.o = 1;
         break;
         case 3:
            that.o = 0;
         break;
         case 4:
            that.o = 0;
         break;
         default:
            IR.Log("orientation: unknown");
         break;
      }
      that.draw(true);//draw: orientation changed
   });
   
   IR.AddListener(IR.EVENT_OFFLINE, this.crestron.device, function() {
      that.showWaitConnection = true;
      that.draw();    
   });
   
   IR.AddListener(IR.EVENT_ONLINE, this.crestron.device, function() {
      that.showWaitConnection = false; 
      that.draw();     
   });
   
   IR.SetTimeout(5000, function() {
      if (!that.crestron.getConnectionStatus()) {
         that.showWaitConnection = true;
         that.draw();
      }
   });
}