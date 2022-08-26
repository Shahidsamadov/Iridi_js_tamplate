var SATModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;
this.setFinished = false;

this.popupSAT;
this.popupSATC;
this.popupFlat;
this.btnBackH;
this.btnBackV;
this.btnCloseH;
this.btnCloseV;
this.btnBack2H;
this.btnBack2V;
this.btnClose2H;
this.btnClose2V;
this.btnControlH;
this.btnControlV;
this.btnControl2H;
this.btnControl2V;

this.btn1H;
this.btn1V;
this.btn2H;
this.btn2V;
this.btn3H;
this.btn3V;
this.btn4H;
this.btn4V;
this.btn5H;
this.btn5V;
this.btn6H;
this.btn6V;
this.btn7H;
this.btn7V;
this.btn8H;
this.btn8V;
this.btn9H;
this.btn9V;

this.btn1fb;
this.btn2fb;
this.btn3fb;
this.btn4fb;
this.btn5fb;
this.btn6fb;
this.btn7fb;
this.btn8fb;
this.btn9fb;

this.chArray = [];

this.finishSet = function() {
   this.setFinished = true;
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSAT.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSAT.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBack2H, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSAT.backPopup);
   });                                                
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnClose2H, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBack2V, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSAT.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnClose2V, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnControlH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSATC);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnControlV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSATC);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnControl2H, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSAT);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnControl2V, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSAT);
   });
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function (name,value) {
      if (that.setFinished == true) {
      if (name == that.btn1fb) {
         that.btn1H.GetState(0).Image = that.chArray[value];
         that.btn1V.GetState(0).Image = that.chArray[value]; 
      }
      if (name == that.btn2fb) {
         that.btn2H.GetState(0).Image = that.chArray[value];
         that.btn2V.GetState(0).Image = that.chArray[value]; 
      }
      if (name == that.btn3fb) {
         that.btn3H.GetState(0).Image = that.chArray[value];
         that.btn3V.GetState(0).Image = that.chArray[value]; 
      }
      if (name == that.btn4fb) {
         that.btn4H.GetState(0).Image = that.chArray[value];
         that.btn4V.GetState(0).Image = that.chArray[value]; 
      }
      if (name == that.btn5fb) {
         that.btn5H.GetState(0).Image = that.chArray[value];
         that.btn5V.GetState(0).Image = that.chArray[value]; 
      }
      if (name == that.btn6fb) {
         that.btn6H.GetState(0).Image = that.chArray[value];
         that.btn6V.GetState(0).Image = that.chArray[value]; 
      }
      if (name == that.btn7fb) {
         that.btn7H.GetState(0).Image = that.chArray[value];
         that.btn7V.GetState(0).Image = that.chArray[value]; 
      }
      if (name == that.btn8fb) {
         that.btn8H.GetState(0).Image = that.chArray[value];
         that.btn8V.GetState(0).Image = that.chArray[value]; 
      }
      if (name == that.btn9fb) {
         that.btn9H.GetState(0).Image = that.chArray[value];
         that.btn9V.GetState(0).Image = that.chArray[value]; 
      }
      }
   });
}

this.setItems = function(popupSAT, popupSATC, popupFlat, btnBack, btnClose, btnControl) {
   this.popupSAT = popupSAT;
   this.popupSATC = popupSATC;
   this.popupFlat = popupFlat;
   this.btnBackH = this.popupSAT.itemH.GetItem(btnBack);
   this.btnBackV = this.popupSAT.itemV.GetItem(btnBack);
   this.btnCloseH = this.popupSAT.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupSAT.itemV.GetItem(btnClose);
   this.btnBack2H = this.popupSATC.itemH.GetItem(btnBack);
   this.btnBack2V = this.popupSATC.itemV.GetItem(btnBack);
   this.btnClose2H = this.popupSATC.itemH.GetItem(btnClose);
   this.btnClose2V = this.popupSATC.itemV.GetItem(btnClose);
   this.btnControlH = this.popupSAT.itemH.GetItem(btnControl);
   this.btnControlV = this.popupSAT.itemV.GetItem(btnControl);
   this.btnControl2H = this.popupSATC.itemH.GetItem(btnControl);
   this.btnControl2V = this.popupSATC.itemV.GetItem(btnControl);
}

this.setItems2 = function(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9) {
   this.btn1H = this.popupSAT.itemH.GetItem(btn1);
   this.btn1V = this.popupSAT.itemV.GetItem(btn1);
   this.btn2H = this.popupSAT.itemH.GetItem(btn2);
   this.btn2V = this.popupSAT.itemV.GetItem(btn2);
   this.btn3H = this.popupSAT.itemH.GetItem(btn3);
   this.btn3V = this.popupSAT.itemV.GetItem(btn3);
   this.btn4H = this.popupSAT.itemH.GetItem(btn4);
   this.btn4V = this.popupSAT.itemV.GetItem(btn4);
   this.btn5H = this.popupSAT.itemH.GetItem(btn5);
   this.btn5V = this.popupSAT.itemV.GetItem(btn5);
   this.btn6H = this.popupSAT.itemH.GetItem(btn6);
   this.btn6V = this.popupSAT.itemV.GetItem(btn6);
   this.btn7H = this.popupSAT.itemH.GetItem(btn7);
   this.btn7V = this.popupSAT.itemV.GetItem(btn7);
   this.btn8H = this.popupSAT.itemH.GetItem(btn8);
   this.btn8V = this.popupSAT.itemV.GetItem(btn8);
   this.btn9H = this.popupSAT.itemH.GetItem(btn9);
   this.btn9V = this.popupSAT.itemV.GetItem(btn9);
}

this.setSignals = function(btn1fb, btn2fb, btn3fb, btn4fb, btn5fb, btn6fb, btn7fb, btn8fb, btn9fb) {
   this.btn1fb = btn1fb;
   this.btn2fb = btn2fb;
   this.btn3fb = btn3fb;
   this.btn4fb = btn4fb;
   this.btn5fb = btn5fb;
   this.btn6fb = btn6fb;
   this.btn7fb = btn7fb;
   this.btn8fb = btn8fb;
   this.btn9fb = btn9fb;
}

this.addCh = function(imgFile) {
   this.chArray.push(imgFile);
}
   
}