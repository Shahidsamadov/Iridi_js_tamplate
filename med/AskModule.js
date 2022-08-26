var AskModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;

this.popupAsk;
this.titleH;
this.titleV;
this.btnLeftH;
this.btnLeftV;
this.btnRightH;
this.btnRightV;

this.btnLeftFunc = function() {}
this.btnRightFunc = function() {}

this.setItems = function(popupAsk, title, btnLeft, btnRight) {
   this.popupAsk = popupAsk;
   this.titleH = this.popupAsk.itemH.GetItem(title);
   this.titleV = this.popupAsk.itemV.GetItem(title);
   this.btnLeftH = this.popupAsk.itemH.GetItem(btnLeft);
   this.btnLeftV = this.popupAsk.itemV.GetItem(btnLeft);
   this.btnRightH = this.popupAsk.itemH.GetItem(btnRight);
   this.btnRightV = this.popupAsk.itemV.GetItem(btnRight);
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnLeftH, function() {
      that.btnLeftFunc();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnLeftV, function() {
      that.btnLeftFunc();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnRightH, function() {
      that.btnRightFunc();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnRightV, function() {
      that.btnRightFunc();
   });
}

this.setState = function(titleTxt, btnLeftTxt, btnRightTxt, btnLeftFunc, btnRightFunc) {
   this.titleH.Text = titleTxt;
   this.titleV.Text = titleTxt;
   this.btnLeftH.Text = btnLeftTxt;
   this.btnLeftV.Text = btnLeftTxt;
   this.btnRightH.Text = btnRightTxt;
   this.btnRightV.Text = btnRightTxt;
   this.btnLeftFunc = btnLeftFunc; 
   this.btnRightFunc = btnRightFunc;
}

this.show = function() {
   this.sm.openPopup(this.popupAsk);
}

this.hide = function() {
   this.sm.closePopup(this.popupAsk);
}

}