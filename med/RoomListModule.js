var RoomListModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;

this.popupRoomList;
this.listH;
this.listV;

this.array = [];

this.onImage;
this.offImage;
        
this.askModule;

this.busySignal;


this.setImages = function(onImage, offImage) {
   this.onImage = onImage;
   this.offImage = offImage;
}

this.setItems = function(popupRoomList, list, busySignal) {
   this.popupRoomList = popupRoomList;
   this.listH = this.popupRoomList.itemH.GetItem(list);
   this.listV = this.popupRoomList.itemV.GetItem(list);
   this.busySignal = busySignal;
}

this.setAskModule = function(askModule) {
   this.askModule = askModule;
}

this.setInfoModule = function(infoModule) {
   this.infoModule = infoModule;
}

this.addRoom = function(name, popup, fbSignal, offSignal, question, listItem, isAction) {
   this.array.push([name, popup, fbSignal, offSignal, question, listItem, isAction]);
}

this.buildList = function() {
   this.listH.Clear();
   this.listV.Clear();
   for (var i=0; i<this.array.length; i++) {
      this.listH.Template = this.array[i][5];
      this.listH.CreateItem(i, 1, {Text: this.array[i][0]});
      this.listV.Template = this.array[i][5];
      this.listV.CreateItem(i, 1, {Text: this.array[i][0]});
   }
   
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listH, function(item, subitem, type, object) {
      if (type == 12) {
         if (subitem == 1) {
            if (that.array[item][6] == false) {
               if (that.array[item][1] != 0) {
                  that.sm.closeAllPopups();
                  that.array[item][1].backPopup = that.popupRoomList;
                  that.sm.openPopup(that.array[item][1]);
               }
            } else {
               if (that.array[item][2] != 0 && that.array[item][3] != 0 && that.crestron.getValue(that.array[item][2]) == true) {
                  if (that.crestron.getValue(that.busySignal) == 1) {
                     that.infoModule.setState("Подождите, в данный момент уже идёт работа с оборудованием", "ОК", function() {that.infoModule.hide();});
                     that.infoModule.show();
                  } else {
                     that.askModule.setState(that.array[item][4], "Да", "Отмена", function() {that.askModule.hide();that.crestron.pulse(that.array[item][3]);}, function() {that.askModule.hide();});
                     that.askModule.show();
                  }
               } else if (that.array[item][2] == 0 && that.array[item][3] != 0) {
                  if (that.crestron.getValue(that.busySignal) == 1) {
                     that.infoModule.setState("Подождите, в данный момент уже идёт работа с оборудованием", "ОК", function() {that.infoModule.hide();});
                     that.infoModule.show();
                  } else {
                     that.askModule.setState(that.array[item][4], "Да", "Отмена", function() {that.askModule.hide();that.crestron.pulse(that.array[item][3]);}, function() {that.askModule.hide();});
                     that.askModule.show();
                  }
               }   
            }
         } else if (subitem == 2) {
            if (that.array[item][2] != 0 && that.array[item][3] != 0) {
               if (that.crestron.getValue(that.array[item][2]) == true) {
                  if (that.crestron.getValue(that.busySignal) == 1) {
                     that.infoModule.setState("Подождите, в данный момент уже идёт работа с оборудованием", "ОК", function() {that.infoModule.hide();});
                     that.infoModule.show();
                  } else {
                     that.askModule.setState(that.array[item][4], "Да", "Отмена", function() {that.askModule.hide();that.crestron.pulse(that.array[item][3]);}, function() {that.askModule.hide();});
                     that.askModule.show();
                  }
               } else {
                  if (that.array[item][1] != 0) {
                     that.sm.closeAllPopups();
                     that.array[item][1].backPopup = that.popupRoomList;
                     that.sm.openPopup(that.array[item][1]);
                  }
               }
            }
         }
      }      
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listV, function(item, subitem, type, object) {
      if (type == 12) {
         if (subitem == 1) {
            if (that.array[item][6] == false) {
               if (that.array[item][1] != 0) {
                  that.sm.closeAllPopups();
                  that.array[item][1].backPopup = that.popupRoomList;
                  that.sm.openPopup(that.array[item][1]);
               }
            } else {
               if (that.array[item][2] != 0 && that.array[item][3] != 0 && that.crestron.getValue(that.array[item][2]) == true) {
                  if (that.crestron.getValue(that.busySignal) == 1) {
                     that.infoModule.setState("Подождите, в данный момент уже идёт работа с оборудованием", "ОК", function() {that.infoModule.hide();});
                     that.infoModule.show();
                  } else {
                     that.askModule.setState(that.array[item][4], "Да", "Отмена", function() {that.askModule.hide();that.crestron.pulse(that.array[item][3]);}, function() {that.askModule.hide();});
                     that.askModule.show();
                  }
               } else if (that.array[item][2] == 0 && that.array[item][3] != 0) {
                  if (that.crestron.getValue(that.busySignal) == 1) {
                     that.infoModule.setState("Подождите, в данный момент уже идёт работа с оборудованием", "ОК", function() {that.infoModule.hide();});
                     that.infoModule.show();
                  } else {
                     that.askModule.setState(that.array[item][4], "Да", "Отмена", function() {that.askModule.hide();that.crestron.pulse(that.array[item][3]);}, function() {that.askModule.hide();});
                     that.askModule.show();
                  }
               }   
            }
         } else if (subitem == 2) {
            if (that.array[item][2] != 0 && that.array[item][3] != 0) {
               if (that.crestron.getValue(that.array[item][2]) == true) {
                  if (that.crestron.getValue(that.busySignal) == 1) {
                     that.infoModule.setState("Подождите, в данный момент уже идёт работа с оборудованием", "ОК", function() {that.infoModule.hide();});
                     that.infoModule.show();
                  } else {
                     that.askModule.setState(that.array[item][4], "Да", "Отмена", function() {that.askModule.hide();that.crestron.pulse(that.array[item][3]);}, function() {that.askModule.hide();});
                     that.askModule.show();
                  }
               } else {
                  if (that.array[item][1] != 0) {
                     that.sm.closeAllPopups();
                     that.array[item][1].backPopup = that.popupRoomList;
                     that.sm.openPopup(that.array[item][1]);
                  }
               }
            }
         }
      }      
   });
}

this.listenFb = function() {
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name, value) {
      for (var i=0; i<that.array.length; i++) {
         if (that.array[i][2] == name) {
            that.setRoomState(i, value);   
         }
      }   
   });
}

this.setRoomState = function(num, state) {
   if (that.onImage != 0) {
      if (state == true) {
         this.listH.CreateItem(num, 2, {Image:that.onImage});
         this.listV.CreateItem(num, 2, {Image:that.onImage});
      } else {
         this.listH.CreateItem(num, 2, {Image:that.offImage});
         this.listV.CreateItem(num, 2, {Image:that.offImage});
      }
   }
}

this.setAllRoomsState = function(state) {
   for (var i=0; i<this.array.length; i++) {
      that.setRoomState(i, state);   
   }
}

}