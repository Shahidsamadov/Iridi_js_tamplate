var SceneMainPageModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;

this.array = [];

this.popupSceneMain;
this.popupSceneEdit;
this.pageMain;
this.popupFlat;
this.listH;
this.listV;
this.listItem;
this.sceneBtnH;
this.sceneBtnV;
this.btnCloseH;
this.btnCloseV;

this.openEditSignal;

this.setItems = function(popupSceneMain, popupSceneEdit, pageMain, popupFlat, sceneBtn, list, listItem, btnClose) {
   this.popupSceneMain = popupSceneMain;
   this.popupSceneEdit = popupSceneEdit;
   this.pageMain = pageMain;
   this.popupFlat = popupFlat;
   this.sceneBtnH = this.pageMain.itemH.GetItem(sceneBtn);
   this.sceneBtnV = this.pageMain.itemV.GetItem(sceneBtn);
   this.listH = this.popupSceneMain.itemH.GetItem(list);
   this.listV = this.popupSceneMain.itemV.GetItem(list);
   this.listItem = listItem;
   this.btnCloseH = this.popupSceneMain.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupSceneMain.itemV.GetItem(btnClose);
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.sceneBtnH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSceneMain);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.sceneBtnV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSceneMain);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
}

this.setSignals = function(openEditSignal) {
   this.openEditSignal = openEditSignal;
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name,value) {
      if (name == that.openEditSignal && that.sm.isPopupOpen(that.popupSceneMain.name)) {
         that.sm.closeAllPopups();
         that.sm.openPopup(that.popupSceneEdit);
      }
   });
}

this.addScene = function(name, doSceneSignal, editSceneSignal) {
   this.array.push([name, doSceneSignal, editSceneSignal]);
}

this.buildList = function() {
   this.listH.Clear();
   this.listV.Clear();
   for (var i=0; i<this.array.length; i++) {
      this.listH.Template = this.listItem;
      this.listH.CreateItem(i, 1, {Text: this.array[i][0]});
      this.listV.Template = this.listItem;
      this.listV.CreateItem(i, 1, {Text: this.array[i][0]});
   }
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listH, function(item, subitem, type, object) {
      if (type == 12) {
         if (subitem == 1)
            that.crestron.pulse(that.array[item][1]);
         else
            that.crestron.pulse(that.array[item][2]);
      }      
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listV, function(item, subitem, type, object) {
      if (type == 12) {
         if (subitem == 1)
            that.crestron.pulse(that.array[item][1]);
         else
            that.crestron.pulse(that.array[item][2]);  
      }
   });
}

}