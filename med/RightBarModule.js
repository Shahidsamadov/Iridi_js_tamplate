var RightBarModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;
this.setFinished = false;

this.popupArray = [];
this.roomItemsArray = [];
this.roomItemsPopupArray = [];
this.roomNameArray = [];
this.roomMuteArray = [];

this.pageMain;

this.btnVolUpH;
this.btnVolUpV;
this.btnVolDownH;
this.btnVolDownV;
this.btnVolMuteH;
this.btnVolMuteV;
this.btnMediaH;
this.btnMediaV;                                                                       
this.btnOffH;
this.btnOffV;
this.btnSettingsH;
this.btnSettingsV;
this.titleH;
this.titleV;
this.muteStateH;
this.muteStateV;

this.btn1funcPr = function() {};
this.btn2funcPr = function() {};
this.btn3funcPr = function() {};
this.btn4funcPr = function() {};
this.btn5funcPr = function() {};
this.btn6funcPr = function() {};
this.btn1funcRe = function() {};
this.btn2funcRe = function() {};
this.btn3funcRe = function() {};
this.btn4funcRe = function() {};
this.btn5funcRe = function() {};
this.btn6funcRe = function() {};

this.selectedID = -1; //-1 not selected

this.setItems = function(pageMain, btnVolUp, btnVolDown, btnVolMute, btnMedia, btnOff, btnSettings, unselectPopup, unselectItem, titleItem, muteStateItem) {
   this.pageMain = pageMain;
   this.btnVolUpH = this.pageMain.itemH.GetItem(btnVolUp);
   this.btnVolUpV = this.pageMain.itemV.GetItem(btnVolUp);
   this.btnVolDownH = this.pageMain.itemH.GetItem(btnVolDown);
   this.btnVolDownV = this.pageMain.itemV.GetItem(btnVolDown);
   this.btnVolMuteH = this.pageMain.itemH.GetItem(btnVolMute);
   this.btnVolMuteV = this.pageMain.itemV.GetItem(btnVolMute);
   this.btnMediaH = this.pageMain.itemH.GetItem(btnMedia);
   this.btnMediaV = this.pageMain.itemV.GetItem(btnMedia);
   this.btnOffH = this.pageMain.itemH.GetItem(btnOff);
   this.btnOffV = this.pageMain.itemV.GetItem(btnOff);
   this.btnSettingsH = this.pageMain.itemH.GetItem(btnSettings);
   this.btnSettingsV = this.pageMain.itemV.GetItem(btnSettings);
   this.titleH = this.pageMain.itemH.GetItem(titleItem);
   this.titleV = this.pageMain.itemV.GetItem(titleItem);
   this.muteStateH = this.pageMain.itemH.GetItem(muteStateItem);
   this.muteStateV = this.pageMain.itemV.GetItem(muteStateItem);
   //btn listeners
   //h
   pageMain.addListener(btnVolUp, IR.EVENT_ITEM_PRESS, function() {
      that.btn1funcPr();
   });
   pageMain.addListener(btnVolUp, IR.EVENT_ITEM_RELEASE, function() {
      that.btn1funcRe();
   });
   pageMain.addListener(btnVolDown, IR.EVENT_ITEM_PRESS, function() {
      that.btn2funcPr();
   });
   pageMain.addListener(btnVolDown, IR.EVENT_ITEM_RELEASE, function() {
      that.btn2funcRe();
   });
   pageMain.addListener(btnVolMute, IR.EVENT_ITEM_PRESS, function() {
      that.btn3funcPr();
   });
   pageMain.addListener(btnVolMute, IR.EVENT_ITEM_RELEASE, function() {
      that.btn3funcRe();
   });
   pageMain.addListener(btnMedia, IR.EVENT_ITEM_PRESS, function() {
      that.btn4funcPr();
   });
   pageMain.addListener(btnMedia, IR.EVENT_ITEM_RELEASE, function() {
      that.btn4funcRe();
   });
   pageMain.addListener(btnOff, IR.EVENT_ITEM_PRESS, function() {
      that.btn5funcPr();
   });
   pageMain.addListener(btnOff, IR.EVENT_ITEM_RELEASE, function() {
      that.btn5funcRe();
   });
   pageMain.addListener(btnSettings, IR.EVENT_ITEM_PRESS, function() {
      that.btn6funcPr();
   });
   pageMain.addListener(btnSettings, IR.EVENT_ITEM_RELEASE, function() {
      that.btn6funcRe();
   });
   //unselect listener
   unselectPopup.addListener(unselectItem, IR.EVENT_ITEM_RELEASE, function() {
      that.unselect();
   });
   pageMain.addListenerToPage(IR.EVENT_ITEM_RELEASE, function() {
      var atLeastOnePopupOpened = false;
      for (var i=0; i<this.sm.popupsArray.length; i++) {
         if (this.sm.isPopupOpen(this.sm.popupsArray[i].name) && this.sm.popupsArray[i].name != unselectPopup.name)
         atLeastOnePopupOpened = true;
      }
      IR.Log("atLeastOnePopupOpened:"+atLeastOnePopupOpened);
      if (!atLeastOnePopupOpened)
         that.unselect();
   });
   //add zero
   this.addPopup([],
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   false, false, false, false, false, false, 0, 0, 0, 0);
}

this.unselect = function() {
   this.selectedID = -1;
   this.setRoomSelected(this.selectedID);
   this.setButtonsState(false, false, false, false, false, false);
   this.muteStateH.Value = 0; 
   this.muteStateV.Value = 0;
}

this.setRoomSelected = function(selected) {
   this.selectIDUpdatedFunc();
   if (selected == -1) {
      this.titleH.Text = "";
      this.titleV.Text = "";
      for (var i=0; i<this.roomItemsArray.length; i++) {
         if (this.roomItemsPopupArray[i] != 0 && this.roomItemsArray[i] != 0) {
            var itemH = this.roomItemsPopupArray[i].itemH.GetItem(this.roomItemsArray[i]);
            var itemV = this.roomItemsPopupArray[i].itemV.GetItem(this.roomItemsArray[i]);  
            itemH.Visible = false;
            itemV.Visible = false;
         } 
      }
   } else {
      this.titleH.Text = this.roomNameArray[selected]; 
      this.titleV.Text = this.roomNameArray[selected];
      for (var i=0; i<this.roomItemsArray.length; i++) {
         if (this.roomItemsPopupArray[i] != 0 && this.roomItemsArray[i] != 0) {
            var itemH = this.roomItemsPopupArray[i].itemH.GetItem(this.roomItemsArray[i]);
            var itemV = this.roomItemsPopupArray[i].itemV.GetItem(this.roomItemsArray[i]);
            if (i==selected) {
               itemH.Visible = true;
               itemV.Visible = true;
            } else {
               itemH.Visible = false;
               itemV.Visible = false;
            }
         }
      }
   }
}

this.setBtn1State = function(enable) {
   if (enable) {
      this.btnVolUpH.GetState(0).Image = "volume_up.png";
      this.btnVolUpH.Enable = true;
      this.btnVolUpV.GetState(0).Image = "volume_up.png";
      this.btnVolUpV.Enable = true;
   } else {
      this.btnVolUpH.GetState(0).Image = "volume_up_inactive.png";
      this.btnVolUpH.Enable = false;
      this.btnVolUpV.GetState(0).Image = "volume_up_inactive.png";
      this.btnVolUpV.Enable = false;
   }
}
this.setBtn2State = function(enable) {
   if (enable) {
      this.btnVolDownH.GetState(0).Image = "volume_down.png";
      this.btnVolDownH.Enable = true;
      this.btnVolDownV.GetState(0).Image = "volume_down.png";
      this.btnVolDownV.Enable = true;
   } else {
      this.btnVolDownH.GetState(0).Image = "volume_down_inactive.png";
      this.btnVolDownH.Enable = false;
      this.btnVolDownV.GetState(0).Image = "volume_down_inactive.png";
      this.btnVolDownV.Enable = false;
   }
}
this.setBtn3State = function(enable) {
   if (enable) {
      this.btnVolMuteH.GetState(0).Image = "volume_mute.png";
      this.btnVolMuteH.Enable = true;
      this.btnVolMuteV.GetState(0).Image = "volume_mute.png";
      this.btnVolMuteV.Enable = true;
   } else {
      this.btnVolMuteH.GetState(0).Image = "volume_mute_inactive.png";
      this.btnVolMuteH.Enable = false;
      this.btnVolMuteV.GetState(0).Image = "volume_mute_inactive.png";
      this.btnVolMuteV.Enable = false;
   }
}
this.setBtn4State = function(enable) {
   if (enable) {
      this.btnMediaH.GetState(0).Image = "media.png";
      this.btnMediaH.Enable = true;
      this.btnMediaV.GetState(0).Image = "media.png";
      this.btnMediaV.Enable = true;
   } else {
      this.btnMediaH.GetState(0).Image = "media_inactive.png";
      this.btnMediaH.Enable = false;
      this.btnMediaV.GetState(0).Image = "media_inactive.png";
      this.btnMediaV.Enable = false;
   }
}
this.setBtn5State = function(enable) {
   if (enable) {
      this.btnOffH.GetState(0).Image = "power_off.png";
      this.btnOffH.Enable = true;
      this.btnOffV.GetState(0).Image = "power_off.png";
      this.btnOffV.Enable = true;
   } else {
      this.btnOffH.GetState(0).Image = "power_off_inactive.png";
      this.btnOffH.Enable = false;
      this.btnOffV.GetState(0).Image = "power_off_inactive.png";
      this.btnOffV.Enable = false;
   }
}
this.setBtn6State = function(enable) {
   if (enable) { 
      this.btnSettingsH.GetState(0).Image = "settings.png";
      this.btnSettingsH.Enable = true;
      this.btnSettingsV.GetState(0).Image = "settings.png";
      this.btnSettingsV.Enable = true;
   } else {
      this.btnSettingsH.GetState(0).Image = "settings_inactive.png";
      this.btnSettingsH.Enable = false;
      this.btnSettingsV.GetState(0).Image = "settings_inactive.png";
      this.btnSettingsV.Enable = false;
   }
}
this.setButtonsState = function(btn1enable, btn2enable, btn3enable, btn4enable, btn5enable, btn6enable) {
   that.setBtn1State(btn1enable);
   that.setBtn2State(btn2enable);
   that.setBtn3State(btn3enable);
   that.setBtn4State(btn4enable);
   that.setBtn5State(btn5enable);
   that.setBtn6State(btn6enable);
}

this.addPopup = function(popupGroup, btn1funcPr, btn1funcRe, btn2funcPr, btn2funcRe, btn3funcPr, btn3funcRe, btn4funcPr, btn4funcRe, btn5funcPr, btn5funcRe, btn6funcPr, btn6funcRe, btn1en, btn2en, btn3en, btn4en, btn5en, btn6en, mediaEnableSignal, roomItem, roomItemPopup, roomName, muteStateSignal) {
   var media_is_on_value;
   this.popupArray.push([popupGroup, btn1funcPr, btn1funcRe, btn2funcPr, btn2funcRe, btn3funcPr, btn3funcRe, btn4funcPr, btn4funcRe, btn5funcPr, btn5funcRe, btn6funcPr, btn6funcRe, btn1en, btn2en, btn3en, btn4en, btn5en, btn6en, mediaEnableSignal, media_is_on_value]);
   this.roomItemsArray.push(roomItem);
   this.roomItemsPopupArray.push(roomItemPopup);
   this.roomNameArray.push(roomName);
   this.roomMuteArray.push(muteStateSignal);
}

this.followSMUpdates = function() {
   this.sm.addUpdateListener(function() {
      that.updateButtons();
   });
}

this.updateButtons = function() {
   for (var i=0; i<this.popupArray.length; i++) {
      for (var j=0; j<this.popupArray[i][0].length; j++) {
         if (this.sm.isPopupOpen(this.popupArray[i][0][j].name)) {
            this.selectedID = i;
            this.setRoomSelected(this.selectedID);
            this.updateI(this.selectedID);
         }
      }    
   }
}

//update buttons state by room_ison value
this.updateI = function(id) {
   if (this.popupArray[id][19] != 0) {
      if (this.popupArray[id][13] == true) {
         if (this.popupArray[id][20] == true)
            this.setBtn1State(this.popupArray[id][13]);
         else this.setBtn1State(false);   
      } else {
         this.setBtn1State(this.popupArray[id][13]);
      }
      if (this.popupArray[id][14] == true) {
         if (this.popupArray[id][20] == true)
            this.setBtn2State(this.popupArray[id][14]);
         else this.setBtn2State(false);   
      } else {
         this.setBtn2State(this.popupArray[id][14]);
      }
      if (this.popupArray[id][15] == true) {
         if (this.popupArray[id][20] == true)
            this.setBtn3State(this.popupArray[id][15]);
         else this.setBtn3State(false);   
      } else {
         this.setBtn3State(this.popupArray[id][15]);
      }
      if (this.popupArray[id][17] == true) {
         if (this.popupArray[id][20] == true)
            this.setBtn5State(this.popupArray[id][17]);
         else this.setBtn5State(false);   
      } else {
         this.setBtn5State(this.popupArray[id][17]);
      }
      if (this.popupArray[id][18] == true) {
         if (this.popupArray[id][20] == true)
            this.setBtn6State(this.popupArray[id][18]);
         else this.setBtn6State(false);   
      } else {
         this.setBtn6State(this.popupArray[id][18]);
      }
      if (this.popupArray[id][16] == true) {
         if (this.popupArray[id][20] == true)
            this.setBtn4State(this.popupArray[id][16]);
         else this.setBtn4State(false);   
      } else {
         this.setBtn4State(this.popupArray[id][16]);
      }
   } else {
      this.setBtn1State(this.popupArray[id][13]);
      this.setBtn2State(this.popupArray[id][14]);
      this.setBtn3State(this.popupArray[id][15]);
      this.setBtn4State(this.popupArray[id][16]);
      this.setBtn5State(this.popupArray[id][17]);
      this.setBtn6State(this.popupArray[id][18]);
   }
   this.btn1funcPr = this.popupArray[id][1];
   this.btn1funcRe = this.popupArray[id][2];
   this.btn2funcPr = this.popupArray[id][3];
   this.btn2funcRe = this.popupArray[id][4];
   this.btn3funcPr = this.popupArray[id][5];
   this.btn3funcRe = this.popupArray[id][6];
   this.btn4funcPr = this.popupArray[id][7];
   this.btn4funcRe = this.popupArray[id][8];
   this.btn5funcPr = this.popupArray[id][9];
   this.btn5funcRe = this.popupArray[id][10];
   this.btn6funcPr = this.popupArray[id][11];
   this.btn6funcRe = this.popupArray[id][12];
   //mute
   if (this.roomMuteArray[id] != 0) {
      if (this.popupArray[id][21] == undefined)
         this.popupArray[id][21] = this.crestron.getValue(this.roomMuteArray[id]);
      if (this.popupArray[id][20] == true) {
         this.muteStateH.Value = this.popupArray[id][21]; 
         this.muteStateV.Value = this.popupArray[id][21];
      } else {
         this.muteStateH.Value = 0; 
         this.muteStateV.Value = 0;
      }
   } else {
      this.muteStateH.Value = 0; 
      this.muteStateV.Value = 0;
   }
}

this.finishSet = function() {
   this.setFinished = true;
}

//receive room ison value
IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name,value) {
   for (var i=0; i<that.popupArray.length; i++) {
      if (name == that.popupArray[i][19]) {
         that.popupArray[i][20] = value;
         if (that.selectedID == i) {
            that.updateI(i);
         }
      }
   }   
});

//receive room mute value
IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name, value) {
   for (var i=0; i<that.roomMuteArray.length; i++) {
      if (name == that.roomMuteArray[i]) {
         that.popupArray[i][21] = value;
         if (that.selectedID == i) {
            that.updateI(i);
         }
      }
   }
});

//method and addlistener method for wait module
this.selectIDUpdatedFunc = function() {}
this.addSelectIDListener = function(func) {
   this.selectIDUpdatedFunc = func;
}

}