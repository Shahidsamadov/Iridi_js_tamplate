var EditScene = function(screenManager, popupSceneEdit, popupSceneList, btnClose, editTitle, btnSave, btnCancel, listSources, listActions, itemRoom, itemSource, itemAction, defaultName, editSource, rooms) {
   var that = this;
                                             
   this.screenManager = screenManager;
   this.sceneList;
   this.tempSceneListArray;
   this.id;
   this.popupSceneEdit = popupSceneEdit;
   this.popupSceneList = popupSceneList;
   this.editSource = editSource;
   
   this.btnCloseH = this.popupSceneEdit.itemH.GetItem(btnClose);
   this.btnSaveH = this.popupSceneEdit.itemH.GetItem(btnSave);
   this.btnCancelH = this.popupSceneEdit.itemH.GetItem(btnCancel);
   this.editTitleH = this.popupSceneEdit.itemH.GetItem(editTitle);
   this.listSourcesH = this.popupSceneEdit.itemH.GetItem(listSources);
   this.listActionsH = this.popupSceneEdit.itemH.GetItem(listActions);
   this.btnCloseV = this.popupSceneEdit.itemV.GetItem(btnClose);
   this.btnSaveV = this.popupSceneEdit.itemV.GetItem(btnSave);
   this.btnCancelV = this.popupSceneEdit.itemV.GetItem(btnCancel);
   this.editTitleV = this.popupSceneEdit.itemV.GetItem(editTitle);
   this.listSourcesV = this.popupSceneEdit.itemV.GetItem(listSources);
   this.listActionsV = this.popupSceneEdit.itemV.GetItem(listActions);

   this.defaultName = defaultName;
   this.rooms = rooms;
   this.itemRoom = itemRoom;
   this.itemSource = itemSource;
   this.itemAction = itemAction;
   
   this.open = function(id, sceneListArray, sceneList) {
      this.tempSceneListArray = [];
      this.copy3Array(sceneListArray, this.tempSceneListArray);
      
      this.id = id;
      this.sceneList = sceneList;
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(popupSceneEdit);
      this.editTitleH.Text = this.tempSceneListArray[id][0][0];
      this.editTitleV.Text = this.tempSceneListArray[id][0][0];
      this.buildListOfActions(id);   
   }
   
   this.copy3Array = function(from) {
      this.tempSceneListArray = [];
      for (var i=0; i<from.length; i++) {
         this.tempSceneListArray[i] = new Array();
         for (var j=0; j<from[i].length; j++) {
            this.tempSceneListArray[i][j] = new Array();
            for (var k=0; k<from[i][j].length; k++) {
               this.tempSceneListArray[i][j][k] = from[i][j][k];   
            }
         }
      }   
   }
   
   this.buildListOfSources = function() {
      this.listSourcesH.Clear();
      this.listSourcesV.Clear();
      var count = 0;
      for (var i=0; i<this.rooms.length; i++) {
         this.listSourcesH.Template = this.itemRoom;
         this.listSourcesV.Template = this.itemRoom;
         this.listSourcesH.CreateItem(count, 1, {Text: this.rooms[i].name});
         this.listSourcesV.CreateItem(count, 1, {Text: this.rooms[i].name});
         count++;
         for (var j=0; j<this.rooms[i].deviceA.length; j++) {
            this.listSourcesH.Template = this.itemSource;
            this.listSourcesV.Template = this.itemSource;
            var inUse = false;
            for (var k=0; k<this.tempSceneListArray[this.id].length; k++) {
               if (this.tempSceneListArray[this.id][k][0] == this.rooms[i].deviceA[j].name && this.tempSceneListArray[this.id][k][1] == this.rooms[i].deviceA[j].room.name)
                  inUse = true;
            }
            if (!inUse) {
               this.listSourcesH.CreateItem(count, 1, {Text: this.rooms[i].deviceA[j].name});
               this.listSourcesV.CreateItem(count, 1, {Text: this.rooms[i].deviceA[j].name});
            }
            count++;    
         }
      }      
   }
   
   this.buildListOfActions = function(id) {
      this.listActionsH.Clear();
      this.listActionsV.Clear();
      var count = 0;
      for (var i=0; i<this.rooms.length; i++) {
         this.listActionsH.Template = this.itemRoom;
         this.listActionsV.Template = this.itemRoom;
         var haveActions = false;
         for (var j=0; j<this.tempSceneListArray[id].length; j++) {
            if (this.tempSceneListArray[id][j][1] == this.rooms[i].name)
               haveActions = true;      
         }
         if (haveActions) {
            this.listActionsH.CreateItem(count, 1, {Text: this.rooms[i].name});
            this.listActionsV.CreateItem(count, 1, {Text: this.rooms[i].name});
            count++;
         }
         for (var j=0; j<this.tempSceneListArray[id].length; j++) {
            this.listActionsH.Template = this.itemAction;
            this.listActionsV.Template = this.itemAction;
            if (this.tempSceneListArray[id][j][1] == this.rooms[i].name) {
               this.listActionsH.CreateItem(count, 1, {Text: this.tempSceneListArray[id][j][0]});
               this.listActionsV.CreateItem(count, 1, {Text: this.tempSceneListArray[id][j][0]});
               count++;
            }      
         }
         this.buildListOfSources();
      }      
   }
   
   this.btnCloseFunc = function() {
      that.screenManager.closeAllPopups();
      that.screenManager.openPopup(that.popupSceneList);   
   }
   
   this.btnSaveFunc = function() {
      if (that.tempSceneListArray[that.id][0][0] == "")
         that.tempSceneListArray[that.id][0][0] = that.defaultName;
      that.sceneList.setList(that.tempSceneListArray);
      that.screenManager.closeAllPopups();
      that.screenManager.openPopup(that.popupSceneList);   
   }
   
   this.btnCancelFunc = function() {
      that.screenManager.closeAllPopups();
      that.screenManager.openPopup(that.popupSceneList);   
   }
   
   this.editTitleChangeFunc = function(item) {
      if (item.Text.length > 24)
         item.Text = item.Text.substring(0,24);
      that.tempSceneListArray[that.id][0][0] = item.Text;   
   }
   
   this.listSourceChangeFunc = function(item, subitem, typeevent) {
      if (typeevent == 12 && subitem == 2) {
         IR.Log("TAPPPP");
         var count = 0;
         var isRoom = false;
         var pressID;
         var roomID;
         var devID;
         stop:
         for (var i=0; i<that.rooms.length; i++) {
            if (count == item) {
               isRoom = true;
               break stop;
            }
            count++;
            for (var j=0; j<that.rooms[i].deviceA.length; j++) {
               if (count == item) {
                  roomID = i;
                  pressID = count;
                  devID = j;
                  break stop;
               } 
               count++;    
            }
         }
         if (!isRoom) {
            IR.Log("SET SCENE");
            that.editSource.setScene(that.tempSceneListArray, that.id, that.rooms[roomID].deviceA[devID], that, -1, false);
            IR.Log("OPEN");
            that.editSource.open();
         }
      }   
   }
   
   this.listActionsChangeFunc = function(item, subitem, typeevent) {
      if (typeevent == 12) {
         var count = 0;
         var isRoom = false;
         var pressID;
         var actionID;
         var roomName;
         var sourceName;
         stop2:
         for (var i=0; i<that.rooms.length; i++) {
            var haveActions = false;
            for (var j=0; j<that.tempSceneListArray[that.id].length; j++) {
               if (that.tempSceneListArray[that.id][j][1] == that.rooms[i].name)
                  haveActions = true;      
            }
            if (haveActions) {
               if (count == item) {
                  isRoom = true;
                  pressID = count;
                  break stop2;   
               }
               count++;
            }
            for (var j=0; j<that.tempSceneListArray[that.id].length; j++) {
               if (that.tempSceneListArray[that.id][j][1] == that.rooms[i].name) {
                  if (count == item) {
                     pressID = count;
                     actionID = j;
                     roomName = that.rooms[i].name;
                     sourceName = that.tempSceneListArray[that.id][j][0];
                     break stop2;   
                  }
                  count++;
               }      
            }
         }
         var device;
         for (var i=0; i<that.rooms.length; i++) {
            for (var j=0; j<that.rooms[i].deviceA.length; j++) {
               if (that.rooms[i].deviceA[j].room.name == roomName && that.rooms[i].deviceA[j].name == sourceName)
                  device = that.rooms[i].deviceA[j];     
            }
         }
         if (!isRoom && subitem == 1) {
            that.editSource.setScene(that.tempSceneListArray, that.id, device, that, actionID, true);
            that.editSource.open();   
         } else if (!isRoom && subitem == 2) {
            that.tempSceneListArray[that.id].splice(actionID, 1);
            that.buildListOfActions(that.id);
         }
      }   
   }
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnCloseH, function() { 
      that.btnCloseFunc();  
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnCloseV, function() { 
      that.btnCloseFunc();  
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnCancelH, function() { 
      that.btnCancelFunc();   
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnCancelV, function() { 
      that.btnCancelFunc();   
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.editTitleH, function() { 
      IR.ShowKeyboard(1); 
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.editTitleV, function() { 
      IR.ShowKeyboard(1); 
   });
   IR.AddListener(IR.EVENT_ITEM_CHANGE, this.editTitleH, function() {
      that.editTitleChangeFunc(that.editTitleH);
   });
   IR.AddListener(IR.EVENT_ITEM_CHANGE, this.editTitleV, function() {
      that.editTitleChangeFunc(that.editTitleV);
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnSaveH, function() { 
      that.btnSaveFunc();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnSaveV, function() { 
      that.btnSaveFunc();
   });
   //source press   
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listSourcesH, function(item, subitem, typeevent, object)
   {
      that.listSourceChangeFunc(item, subitem, typeevent);
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listSourcesV, function(item, subitem, typeevent, object)
   {
      that.listSourceChangeFunc(item, subitem, typeevent);
   });
   //actions list
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listActionsH, function(item, subitem, typeevent, object)
   {
      that.listActionsChangeFunc(item, subitem, typeevent);        
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listActionsV, function(item, subitem, typeevent, object)
   {
      that.listActionsChangeFunc(item, subitem, typeevent);        
   });
}