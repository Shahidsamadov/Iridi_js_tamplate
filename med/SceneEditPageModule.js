var SceneEditPageModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;

this.popupSceneEdit;
this.popupSceneMain;
this.popupFlat;
this.btnCloseH;
this.btnCloseV;
this.btnSaveH;
this.btnSaveV;
this.btnLoadH;
this.btnLoadV;

this.exitFromEditSignal;
this.watchSignal;

this.popupEditLastState = false;

this.setItems = function(popupSceneEdit, popupSceneMain, popupFlat, btnClose, btnSave, btnLoad) {
   this.popupSceneEdit = popupSceneEdit;
   this.popupSceneMain = popupSceneMain;
   this.popupFlat = popupFlat;
   this.btnCloseH = this.popupSceneEdit.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupSceneEdit.itemV.GetItem(btnClose);
   this.btnSaveH = this.popupSceneEdit.itemH.GetItem(btnSave);
   this.btnSaveV = this.popupSceneEdit.itemV.GetItem(btnSave);
   this.btnLoadH = this.popupSceneEdit.itemH.GetItem(btnLoad);
   this.btnLoadV = this.popupSceneEdit.itemV.GetItem(btnLoad);
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnSaveH, function() {
      //that.sm.closeAllPopups();
      //that.sm.openPopup(that.popupSceneMain);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnSaveV, function() {
      //that.sm.closeAllPopups();
      //that.sm.openPopup(that.popupSceneMain);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnLoadH, function() {
      //that.sm.closeAllPopups();
      //that.sm.openPopup(that.popupSceneMain);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnLoadV, function() {
      //that.sm.closeAllPopups();
      //that.sm.openPopup(that.popupSceneMain);
   });
}

this.setSignals = function(exitFromEditSignal) {
   this.exitFromEditSignal = exitFromEditSignal;
}


this.listenSMUpdate = function() {
   this.sm.addUpdateListener10(function() {
      var popupSceneEditCurrentState = that.sm.isPopupOpen(that.popupSceneEdit.name);
      if (popupSceneEditCurrentState != that.popupEditLastState && that.sm.isPopupOpen(that.popupSceneEdit.name) == false) {
         that.crestron.pulse(that.exitFromEditSignal);
         IR.SetTimeout(1000, function() {
            that.crestron.pulse(that.exitFromEditSignal);
         });
      }
      that.popupEditLastState = popupSceneEditCurrentState;
   });
}

this.watchPage = function(watchSignal) {
   this.watchSignal = watchSignal;
   IR.SetInterval(10000, function() {
      if (that.sm.isPopupOpen(that.popupSceneEdit.name == true)) {
         that.crestron.pulse(that.watchSignal);
      }
   });
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name,value) {
      if (name == "Scene_ExitFromEdit") {
         IR.Log("EXIT FROM EDIT");
         if (that.sm.isPopupOpen(that.popupSceneEdit.name)) {
            if (value == true) {
               that.sm.closeAllPopups();
               that.sm.openPopup(that.popupSceneMain);
            }
         }
      }
   });
}

}