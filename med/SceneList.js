// class SceneList
var SceneList = function(device, screenManager, waitSwitch, tokenSceneArray, itemSimple, itemDynamic, popupFlat, popup, editScene, list, btn, btnClose, edit, simpleScenes, simpleScenesCMD, defaultName, asker) {
   var that = this;
   this.device = device;
   this.screenManager = screenManager;
   this.waitSwitch = waitSwitch;
   this.tokenSceneArray = tokenSceneArray;
   this.itemSimple = itemSimple;
   this.itemDynamic = itemDynamic;
   this.popupFlat = popupFlat;
   this.popup = popup;
   this.editScene = editScene;
   this.listH = popup.itemH.GetItem(list);
   this.btnH = popup.itemH.GetItem(btn);
   this.editH = popup.itemH.GetItem(edit);
   this.btnCloseH = popup.itemH.GetItem(btnClose);
   this.listV = popup.itemV.GetItem(list);
   this.btnV = popup.itemV.GetItem(btn);
   this.editV = popup.itemV.GetItem(edit);
   this.btnCloseV = popup.itemV.GetItem(btnClose);
   this.simpleScenes = simpleScenes;
   this.simpleScenesCMD = simpleScenesCMD;
   this.sceneListArray = [];
   this.sceneArray = [];
   this.defaultName = defaultName;
   this.text = this.defaultName;
   this.asker = asker;
   this.deleteItemID;
   
   this.saveList = function() {
      this.saveSceneArray();
   }
   
   this.loadList = function() {
      this.listH.Clear();
      this.listV.Clear();
      this.loadSceneArray();
      for (var i=0; i<this.simpleScenes.length; i++) {
         this.listH.Template = this.itemSimple;
         this.listH.CreateItem(i, 1, {Text: this.simpleScenes[i]});
         this.listV.Template = this.itemSimple;
         this.listV.CreateItem(i, 1, {Text: this.simpleScenes[i]});
      }
      if (this.sceneArray)
         for (var i=0; i<this.sceneArray.length; i++) {
            this.listH.Template = this.itemDynamic;
            this.listH.CreateItem(i + simpleScenes.length, 1, {Text: this.sceneArray[i][0][0]});
            this.listV.Template = this.itemDynamic;
            this.listV.CreateItem(i + simpleScenes.length, 1, {Text: this.sceneArray[i][0][0]});
         }
   }
   
   this.loadSceneArray = function() {
      var data = IR.GetVariable(this.tokenSceneArray);
      if (typeof data === 'undefined') {
      } else {
         data = data.split(":");
         data.splice(data.length - 1, 1);
         for (var i=0; i<data.length; i++) {
            this.sceneArray[i] = new Array();
            data_2 = data[i].split(";");
            data_2.splice(data_2.length - 1, 1);
            for (var j=0; j<data_2.length; j++) {
               this.sceneArray[i][j] = new Array();
               data_3 = data_2[j].split(",");
               data_3.splice(data_3.length - 1, 1);
               for (var k=0; k<data_3.length; k++) {
                  this.sceneArray[i][j][k] = data_3[k];
               }            
            }
         }
      }
   }
   
   this.saveSceneArray = function() {
      var data = "";
      for (var i=0; i<this.sceneArray.length; i++) {
         
         for (var j=0; j<this.sceneArray[i].length; j++) {
            
            for (var k=0; k<this.sceneArray[i][j].length; k++)
               data += this.sceneArray[i][j][k] + ",";
            data += ";";
         }
         data += ":";
      }
      IR.SetVariable(this.tokenSceneArray, data);
   }
   
   this.setList = function(list) {
      this.sceneArray = list;
      this.saveList();
      this.loadList();
   }
   
   this.addItem = function(name) {
      var push = this.sceneArray.push(new Array()) - 1;
      this.sceneArray[push][0] = new Array();
      this.sceneArray[push][0][0] = name;
      
      this.saveList();
      this.listH.Template = this.itemDynamic;
      this.listH.CreateItem(this.listH.ItemsCount, 1, {Text: name});
      this.listV.Template = this.itemDynamic;
      this.listV.CreateItem(this.listV.ItemsCount, 1, {Text: name});
      this.editH.Text = "";
      this.editV.Text = "";
      this.text = this.defaultName;
      IR.SetTimeout(150, setLastPosition);  
   }
   
   function setLastPosition() {
      that.listH.SetPosition(that.listH.ItemsCount-8);
      that.listV.SetPosition(that.listV.ItemsCount-8);
   }
   
   function finishDeleteItem() {
      that.sceneArray.splice(that.deleteItemID - that.simpleScenes.length, 1);
      that.saveList();
      that.loadList();
   }
   
   this.deleteItem = function(item) {
      this.deleteItemID = item;
      this.asker.setQuestion("Удалить сценарий \"" + this.sceneArray[this.deleteItemID - that.simpleScenes.length][0][0] + "\"?");
      this.asker.setAnswer1("Да, удалить");
      this.asker.setAnswer2("Отмена");
      this.asker.open();
      this.asker.setFunction1(finishDeleteItem);
   }
   
   function sendAction(cmd, value, time, duration) {
      if (duration > 0)
         that.waitSwitch.showTopInfo("Идёт выполнение мультимедия сценария", duration);   
      if (value == true) {
         that.device.Set(cmd, value);
         IR.SetTimeout(time, that.device.Set(cmd, false));
      } else {
         that.device.Set(cmd, value);   
      }   
   }
   
   /*this.doScene = function(id) {
      IR.Log("DO SCENE:"+id);
      for (var i=1; i<this.sceneArray[id].length; i++) {
         IR.Log("i"+i);
         for (var j=2; j<this.sceneArray[id][i].length; j++) {
            var action = this.sceneArray[id][i][j].split(" ");
            var duration = this.sceneArray[id][i][j].split("time")[1];
            var value;
            if (action[1] == "true")
               value = true;
            else
               value = parseInt(action[1]);
            if (typeof duration == "undefined")
               duration = 0;
            IR.Log("Send  action: " + action[0] + " | " + value + " | " + duration);
            IR.SetTimeout(1000, sendNextAction);
            this.sendAction(action[0], value, 10, duration);
         }
      }   
   }*/
   this.doSceneI;
   this.actionI;
   this.doI;
   
   function nextAction() {
      if (that.actionI < that.sceneArray[that.doSceneI].length-1) {
         that.actionI++;
         that.doI = 1;
         nextDo(0);
      } else {
         IR.Log("SCENE DONE");
      } 
   }
   
   function nextDo(duration) {
      IR.Log("duration:" + duration);
      
         IR.SetTimeout(duration, function() {
            if (that.doI >= that.sceneArray[that.doSceneI][that.actionI].length-1) {
               nextAction();
               return;
            }
            that.doI++;
            //do here what you want
            var action = that.sceneArray[that.doSceneI][that.actionI][that.doI].split(" ");
            var delay = that.sceneArray[that.doSceneI][that.actionI][that.doI].split("time")[1];
            var value;
            if (action[1] == "true")
               value = true;
            else
               value = parseInt(action[1]);
            if (typeof delay == "undefined")
               delay = 0;
            IR.Log("Send  action: " + action[0] + " | " + value + " | " + delay);
            sendAction(action[0], value, 10, delay);
            //until here
            nextDo(delay);  
         }); 
   }
   
   this.doScene = function(id) {
      this.doSceneI = id;
      this.actionI = 0;
      nextAction();   
   }
   
   
   
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listH, function(item, subitem, typeevent, object)
   {
      //IR.Log("subitem"+subitem);
      if (subitem == 2 && item >= that.simpleScenes.length && typeevent == 12)
         that.deleteItem(item);
      else if (subitem == 3 && item >= that.simpleScenes.length && typeevent == 12)
         that.openEdit(item);
      if (subitem == 1 && typeevent == 12 && item < that.simpleScenes.length) {
         sendAction(that.simpleScenesCMD[item], true, 10, 0);   
      } else if (subitem == 1 && typeevent == 12 && item >= that.simpleScenes.length) {
         that.doScene((item - that.simpleScenes.length));      
      }
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listV, function(item, subitem, typeevent, object)
   {
      if (subitem == 2 && item >= that.simpleScenes.length && typeevent == 12)
         that.deleteItem(item);
      else if (subitem == 3 && item >= that.simpleScenes.length && typeevent == 12)
         that.openEdit(item);
      if (subitem == 1 && typeevent == 12 && item < that.simpleScenes.length) {
         sendAction(that.simpleScenesCMD[item], true, 10, 0);   
      } else if (subitem == 1 && typeevent == 12 && item >= that.simpleScenes.length) {
         that.doScene((item - that.simpleScenes.length));      
      }
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnH, function() {
      that.addItem(that.text);
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnV, function() {
      that.addItem(that.text);
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnCloseH, function() {
      screenManager.closeAllPopups();
      screenManager.openPopup(popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnCloseV, function() {
      screenManager.closeAllPopups();
      screenManager.openPopup(popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.editH, function() {
      IR.ShowKeyboard(1);
   });
   IR.AddListener(IR.EVENT_ITEM_CHANGE, this.editH, function() {
      if (that.editH.Text == "")
         that.text = that.defaultName;
      else if (that.editH.Text.length > 24){
         that.editH.Text = that.editH.Text.substring(0,24);
      }
      that.text = that.editH.Text;
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.editV, function() {
      IR.ShowKeyboard(1);
   });
   IR.AddListener(IR.EVENT_ITEM_CHANGE, this.editV, function() {
      if (that.editV.Text == "")
         that.text = that.defaultName;
      else if (that.editV.Text.length > 24){
         that.editV.Text = that.editV.Text.substring(0,24);
      }
      that.text = that.editV.Text;
   });
   
   //editScene
   this.openEdit = function(item) {
      this.editScene.open(item - that.simpleScenes.length, this.sceneArray, this);  
   }
   
   this.loadList();
}