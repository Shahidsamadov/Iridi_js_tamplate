var InfoModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;

this.popupInfo;
this.titleH;
this.titleV;
this.btnOKH;
this.btnOKV;

this.btnOKFunc = function() {}

this.setItems = function(popupInfo, title, btnOK) {
   this.popupInfo = popupInfo;
   this.titleH = this.popupInfo.itemH.GetItem(title);
   this.titleV = this.popupInfo.itemV.GetItem(title);
   this.btnOKH = this.popupInfo.itemH.GetItem(btnOK);
   this.btnOKV = this.popupInfo.itemV.GetItem(btnOK);
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnOKH, function() {
      that.btnOKFunc();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnOKV, function() {
      that.btnOKFunc();
   });
}

this.setState = function(titleTxt, btnOKTxt, btnOKFunc) {
   this.titleH.Text = titleTxt;
   this.titleV.Text = titleTxt;
   this.btnOKH.Text = btnOKTxt;
   this.btnOKV.Text = btnOKTxt;
   this.btnOKFunc = btnOKFunc; 
}

this.show = function() {
   this.sm.openPopup(this.popupInfo);
}

this.hide = function() {
   this.sm.closePopup(this.popupInfo);
}

}