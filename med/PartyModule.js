var PartyModule = function(crestron, popupParty) {
var that = this;
this.crestron = crestron;
this.popupParty = popupParty;
this.enableLineArray = [];
this.setFinished = false;

this.addLine = function(canUseSignal, itemMinus, itemLevel, itemPlus, itemMute) {
   var itemMinusH = this.popupParty.itemH.GetItem(itemMinus);
   var itemMinusV = this.popupParty.itemV.GetItem(itemMinus);
   var itemLevelH = this.popupParty.itemH.GetItem(itemLevel);
   var itemLevelV = this.popupParty.itemV.GetItem(itemLevel);
   var itemPlusH = this.popupParty.itemH.GetItem(itemPlus);
   var itemPlusV = this.popupParty.itemV.GetItem(itemPlus);
   var itemMuteH = this.popupParty.itemH.GetItem(itemMute);
   var itemMuteV = this.popupParty.itemV.GetItem(itemMute);
   this.enableLineArray.push([canUseSignal, itemMinusH, itemMinusV, itemLevelH, itemLevelV, itemPlusH, itemPlusV, itemMuteH, itemMuteV]);
}

this.finishSet = function() {
   this.setFinished = true;
}

this.setStartValue = function() {
   for (var i=0; i<this.enableLineArray.length; i++) {
      var value;
      value = this.crestron.getValue(this.enableLineArray[i][0]);
      this.setLineState(i, value);   
   }
}

this.setLineState = function(id, enable) {
   if (enable == true) {
      this.enableLineArray[id][1].Enable = true;
      this.enableLineArray[id][1].GetState(0).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][2].Enable = true;
      this.enableLineArray[id][2].GetState(0).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][3].Enable = true;
      this.enableLineArray[id][3].GetState(0).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][3].GetState(1).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][4].Enable = true;
      this.enableLineArray[id][4].GetState(0).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][4].GetState(1).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][5].Enable = true;
      this.enableLineArray[id][5].GetState(0).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][6].Enable = true;
      this.enableLineArray[id][6].GetState(0).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][7].Enable = true;
      this.enableLineArray[id][7].GetState(0).TextColor = 0xFFFFFFFF;
      this.enableLineArray[id][7].GetState(0).Image = "mute.png";
      this.enableLineArray[id][8].Enable = true;
      this.enableLineArray[id][8].GetState(0).TextColor = 0xFFFFFFFF; 
      this.enableLineArray[id][8].GetState(0).Image = "mute.png";
   } else {
      this.enableLineArray[id][1].Enable = false;
      this.enableLineArray[id][1].GetState(0).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][2].Enable = false;
      this.enableLineArray[id][2].GetState(0).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][3].Enable = false;
      this.enableLineArray[id][3].GetState(0).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][3].GetState(1).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][4].Enable = false;
      this.enableLineArray[id][4].GetState(0).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][4].GetState(1).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][5].Enable = false;
      this.enableLineArray[id][5].GetState(0).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][6].Enable = false;
      this.enableLineArray[id][6].GetState(0).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][7].Enable = false;
      this.enableLineArray[id][7].GetState(0).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][7].GetState(0).Image = "mute_inactive.png";
      this.enableLineArray[id][8].Enable = false;
      this.enableLineArray[id][8].GetState(0).TextColor = 0x2E2E2EFF;
      this.enableLineArray[id][8].GetState(0).Image = "mute_inactive.png";
   }
}

IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name, value) {
   if (that.setFinished == true) {
   for (var i=0; i<that.enableLineArray.length; i++) {
      if (name == that.enableLineArray[i][0]) {
         IR.Log("setLineState" + i + " " + value);
         that.setLineState(i, value);
      }
   }
   }
});

}