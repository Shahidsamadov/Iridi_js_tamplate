var Page = function(name) {
   IR.Log("Page " + name + " created");
   this.name = name;
   this.nameV = this.name + "V";
   this.nameH = this.name + "H";
   this.itemV = IR.GetItem(this.nameV);
   this.itemH = IR.GetItem(this.nameH);
   this.isOpened; 
   
   this.getItemH = function(item_name) {
      return this.itemH.GetItem(item_name);
   }
   this.getItemV = function(item_name) {
      return this.itemV.GetItem(item_name);
   }
   
   this.addListener = function(item_name, event, func) {
      IR.AddListener(event, this.getItemH(item_name), func);
      IR.AddListener(event, this.getItemV(item_name), func);
   }
   
   this.addListenerToPage = function(event, func) {
      IR.AddListener(event, this.itemH, func);
      IR.AddListener(event, this.itemV, func);
   }
}

var Popup = function(name) {
   IR.Log("Popup " + name + " created");
   this.name = name;
   this.nameV = this.name + "V";
   this.nameH = this.name + "H";
   this.itemV = IR.GetItem(this.nameV);
   this.itemH = IR.GetItem(this.nameH);
   this.isOpened;
   this.backPopup;
   
   this.getItemH = function(item_name) {
      return this.itemH.GetItem(item_name);
   }
   this.getItemV = function(item_name) {
      return this.itemV.GetItem(item_name);
   } 
   
   this.addListener = function(item_name, event, func) {
      IR.AddListener(event, this.getItemH(item_name), func);
      IR.AddListener(event, this.getItemV(item_name), func);      
   }
   
   this.addListenerToPopup = function(event, func) {
      IR.AddListener(event, this.itemH, func);
      IR.AddListener(event, this.itemV, func);
   }
}

var ScreenManager = function() {
   IR.Log("ScreenManager started");
   var that = this;
   this.pagesArray = [];
   this.popupsArray = [];
   this.currentPage;
   this.orientation = IR.GetVariable("System.ViewOrientation");

   this.updateListenerFunc = function() {
   };
   this.updateListenerFunc2 = function() {
   };
   this.updateListenerFunc3 = function() {
   };
   this.updateListenerFunc4 = function() {
   };
   this.updateListenerFunc5 = function() {
   };
   this.updateListenerFunc6 = function() {
   };
   this.updateListenerFunc7 = function() {
   };
   this.updateListenerFunc8 = function() {
   };
   this.updateListenerFunc9 = function() {
   };
   this.updateListenerFunc10 = function() {
   };
   //methods
   this.addUpdateListener = function(func) {
      this.updateListenerFunc = func;   
   }
   this.addUpdateListener2 = function(func) {
      this.updateListenerFunc2 = func;   
   }
   this.addUpdateListener3 = function(func) {
      this.updateListenerFunc3 = func;   
   }
   this.addUpdateListener4 = function(func) {
      this.updateListenerFunc4 = func;   
   }
   this.addUpdateListener5 = function(func) {
      this.updateListenerFunc5 = func;   
   }
   this.addUpdateListener6 = function(func) {
      this.updateListenerFunc6 = func;   
   }
   this.addUpdateListener7 = function(func) {
      this.updateListenerFunc7 = func;   
   }
   this.addUpdateListener8 = function(func) {
      this.updateListenerFunc8 = func;   
   }
   this.addUpdateListener9 = function(func) {
      this.updateListenerFunc9 = func;   
   }
   this.addUpdateListener10 = function(func) {
      this.updateListenerFunc10 = func;   
   }
   
   this.isPopupOpen = function(popupName) {
      var popupOpen = false;
      for (var i=0; i<this.popupsArray.length; i++) {
         if (this.popupsArray[i].name == popupName && this.popupsArray[i].isOpened)
            popupOpen = true;
      }
      return popupOpen;
   }
   
   this.addPage = function(page) {
      this.pagesArray.push(page);   
   }
   
   this.addPopup = function(popup) {
      this.popupsArray.push(popup);
   }
   
   this.openPage = function(page) {
      IR.Log("Open page: " + page.name);
      IR.Log("Orientation is: " + this.orientation);
      this.currentPage = page;
      if (this.orientation)
         IR.ShowPage(page.nameH);
      else
         IR.ShowPage(page.nameV);
      page.isOpened = true;
      for (var i=0; i<this.pagesArray.length; i++)
         if (this.pagesArray[i].name != page.name && this.pagesArray[i].isOpened)
            this.pagesArray[i].isOpened = false;
      //
      IR.HideAllPopups();
      for(var i=0; i<this.popupsArray.length; i++)
         if (this.popupsArray[i].isOpened)
            this.openPopup(this.popupsArray[i]);
      
   }
   
   this.openPopup = function(popup) {
      IR.Log("Open popup: " + popup.name);
      if (this.orientation) {
         IR.Log("Show popup: " + popup.nameH);
         IR.ShowPopup(popup.nameH);
      }
      else if (!this.orientation) {
         IR.Log("Show popup: " + popup.nameV);
         IR.ShowPopup(popup.nameV);
      }
      popup.isOpened = true;
      this.updateListenerFunc();
      this.updateListenerFunc2();
      this.updateListenerFunc3();
      this.updateListenerFunc4();
      this.updateListenerFunc5();
      this.updateListenerFunc6();
      this.updateListenerFunc7();
      this.updateListenerFunc8();
      this.updateListenerFunc9();
      this.updateListenerFunc10();
   }
   
   this.closePopup = function(popup) {
      IR.Log("Close popup: " + popup.name);
      if (this.orientation) {
         IR.Log("Close popup: " + popup.nameH);
         IR.HidePopup(popup.nameH);
      }
      else {
         IR.Log("Close popup: " + popup.nameV);
         IR.HidePopup(popup.nameV);
      }
      popup.isOpened = false;
   }
   
   this.closeAllPopups = function() {
      IR.Log("Close all popups");
         for (var i=0; i<this.popupsArray.length; i++)
            if (this.popupsArray[i].isOpened)
               this.closePopup(this.popupsArray[i]);  
   }
   
   this.printAll = function() {
      IR.Log("Print all pages: ")
      for(var i=0; i<this.pagesArray.length; i++) {
         IR.Log("Page № " + i + ": " + this.pagesArray[i].name);   
      }
      IR.Log("Print all PopUps: ")
      for(var i=0; i<this.popupsArray.length; i++) {
         IR.Log("PopUp № " + i + ": " + this.popupsArray[i].name);   
      }
   }
   
   this.rotate = function() {
      IR.Log("do rotate");
      this.openPage(this.currentPage);
   }

   //rotator
   IR.AddListener(IR.EVENT_ORIENTATION,0, function(orientation) {
      var orientationOld = that.orientation;
      switch (orientation)
      {
         case IR.ORIENTATION_PORTRAIT:
            that.orientation = false;   
         break;
         case IR.ORIENTATION_PORTRAIT_UPSIDE_DOWN:
            that.orientation = false;
         break;
         case IR.ORIENTATION_LANDSCAPE_LEFT:
            that.orientation = true;
         break;
         case IR.ORIENTATION_LANDSCAPE_RIGHT:
            that.orientation = true;
         break;
      }
      if (orientationOld != that.orientation)
         that.rotate();  
   });
   
}