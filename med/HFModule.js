var HFModule = function(crestron, sm) {
   var that = this;
   this.crestron = crestron;
   this.sm = sm;
   
   this.isFinished = false;
   
   this.popupHF;
   this.popupHFS;
   this.btnModeContH;
   this.btnModeContV;
   this.btnModeEveryH;
   this.btnModeEveryV;
   this.btnModeWeekH;
   this.btnModeWeekV;
   
   this.signalIsOn;
   this.signalSave;
   this.valueIsOn;
   
   this.settingsPopupIsOn;
   //gr1
   this.gr1titleH;
   this.gr1titleV;
   this.gr1ponH;
   this.gr1ponV;
   this.gr1vtoH;
   this.gr1vtoV;
   this.gr1sreH;
   this.gr1sreV;
   this.gr1cheH;
   this.gr1cheV;
   this.gr1pyaH;
   this.gr1pyaV;
   this.gr1subH;
   this.gr1subV;
   this.gr1vosH;
   this.gr1vosV;
   //gr2
   this.gr2titleH;
   this.gr2titleV;
   this.gr2_0H;
   this.gr2_0V;
   this.gr2_1H;
   this.gr2_1V;
   this.gr2_2H;
   this.gr2_2V;
   this.gr2_3H;
   this.gr2_3V;
   this.gr2_4H;
   this.gr2_4V;
   this.gr2_5H;
   this.gr2_5V;
   this.gr2_6H;
   this.gr2_6V;
   this.gr2_7H;
   this.gr2_7V;
   this.gr2_8H;
   this.gr2_8V;
   this.gr2_9H;
   this.gr2_9V;
   this.gr2_10H;
   this.gr2_10V;
   this.gr2_11H;
   this.gr2_11V;
   this.gr2_12H;
   this.gr2_12V;
   this.gr2_13H;
   this.gr2_13V;
   this.gr2_14H;
   this.gr2_14V;
   this.gr2_15H;
   this.gr2_15V;
   this.gr2_16H;
   this.gr2_16V;
   this.gr2_17H;
   this.gr2_17V;
   this.gr2_18H;
   this.gr2_18V;
   this.gr2_19H;
   this.gr2_19V;
   this.gr2_20H;
   this.gr2_20V;
   this.gr2_21H;
   this.gr2_21V;
   this.gr2_22H;
   this.gr2_22V;
   this.gr2_23H;
   this.gr2_23V;
   
   this.btnSetEveryH;
   this.btnSetEveryV;
   this.btnSetWeekH;
   this.btnSetWeekV;
   
   this.settingsMode = 0; //0 -none, 1 -every, 2 -week
   
   this.signal1day;
   this.signal7day;
   
   this.setModeChooseButtons = function(popupHF, popupHFS, btnModeCont, btnModeEvery, btnModeWeek) {
      this.popupHF = popupHF;
      this.popupHFS = popupHFS;
      this.btnModeContH = this.popupHF.itemH.GetItem(btnModeCont);
      this.btnModeContV = this.popupHF.itemV.GetItem(btnModeCont);
      this.btnModeEveryH = this.popupHF.itemH.GetItem(btnModeEvery);
      this.btnModeEveryV = this.popupHF.itemV.GetItem(btnModeEvery);
      this.btnModeWeekH = this.popupHF.itemH.GetItem(btnModeWeek);
      this.btnModeWeekV = this.popupHF.itemV.GetItem(btnModeWeek);     
   }
   
   this.setSignals = function(signalIsOn, signalSave, signal1day, signal7day) {
      this.signalIsOn = signalIsOn;
      this.signalSave = signalSave;
      this.signal1day = signal1day;
      this.signal7day = signal7day;
   }
   
   this.getIsOnValue = function() {
      this.valueIsOn = this.crestron.getValue(this.signalIsOn);
   }
   
   this.updateState1 = function() {
      if (this.valueIsOn == true) {
         this.setColorState1(0xFF0000FF);
      } else {
         this.setColorState1(0xC0C0C0FF);
      }
   }
   
   this.setColorState1 = function(color) {
      this.btnModeContH.GetState(1).FillColor = color;
      this.btnModeContV.GetState(1).FillColor = color;
      this.btnModeEveryH.GetState(1).FillColor = color;
      this.btnModeEveryV.GetState(1).FillColor = color;
      this.btnModeWeekH.GetState(1).FillColor = color;
      this.btnModeWeekV.GetState(1).FillColor = color;
   }
   
   this.settingsSet2 = function() {
      this.settingsPopupIsOn = this.sm.isPopupOpen(this.popupHFS.name);
      this.sm.addUpdateListener2(function() {
         var currentState = that.sm.isPopupOpen(that.popupHFS.name);
         if (currentState != that.settingsPopupIsOn) {
            that.settingsPopupIsOn = currentState;
            if (that.settingsPopupIsOn == true)
               that.crestron.press(that.signalSave);
            else
               that.crestron.release(that.signalSave);
         }
      });
   }
   this.settingsSet3 = function() {
      this.settingsPopupIsOn = this.sm.isPopupOpen(this.popupHFS.name);
      this.sm.addUpdateListener3(function() {
         var currentState = that.sm.isPopupOpen(that.popupHFS.name);
         if (currentState != that.settingsPopupIsOn) {
            that.settingsPopupIsOn = currentState;
            if (that.settingsPopupIsOn == true)
               that.crestron.press(that.signalSave);
            else
               that.crestron.release(that.signalSave);
         }
      });
   }
   this.settingsSet4 = function() {
      this.settingsPopupIsOn = this.sm.isPopupOpen(this.popupHFS.name);
      this.sm.addUpdateListener4(function() {
         var currentState = that.sm.isPopupOpen(that.popupHFS.name);
         if (currentState != that.settingsPopupIsOn) {
            that.settingsPopupIsOn = currentState;
            if (that.settingsPopupIsOn == true)
               that.crestron.press(that.signalSave);
            else
               that.crestron.release(that.signalSave);
         }
      });
   }
   this.settingsSet5 = function() {
      this.settingsPopupIsOn = this.sm.isPopupOpen(this.popupHFS.name);
      this.sm.addUpdateListener5(function() {
         var currentState = that.sm.isPopupOpen(that.popupHFS.name);
         if (currentState != that.settingsPopupIsOn) {
            that.settingsPopupIsOn = currentState;
            if (that.settingsPopupIsOn == true)
               that.crestron.press(that.signalSave);
            else
               that.crestron.release(that.signalSave);
         }
      });
   }
   this.settingsSet6 = function() {
      this.settingsPopupIsOn = this.sm.isPopupOpen(this.popupHFS.name);
      this.sm.addUpdateListener6(function() {
         var currentState = that.sm.isPopupOpen(that.popupHFS.name);
         if (currentState != that.settingsPopupIsOn) {
            that.settingsPopupIsOn = currentState;
            if (that.settingsPopupIsOn == true)
               that.crestron.press(that.signalSave);
            else
               that.crestron.release(that.signalSave);
         }
      });
   }
   
   //SETTINGS
   this.setGroup1Items = function(gr1title, gr1pon, gr1vto, gr1sre, gr1che, gr1pya, gr1sub, gr1vos) {
      this.gr1titleH = this.popupHFS.itemH.GetItem(gr1title);
      this.gr1titleV = this.popupHFS.itemH.GetItem(gr1title);  
      this.gr1ponH = this.popupHFS.itemH.GetItem(gr1pon);
      this.gr1ponV = this.popupHFS.itemH.GetItem(gr1pon);
      this.gr1vtoH = this.popupHFS.itemH.GetItem(gr1vto);
      this.gr1vtoV = this.popupHFS.itemH.GetItem(gr1vto);
      this.gr1sreH = this.popupHFS.itemH.GetItem(gr1sre);
      this.gr1sreV = this.popupHFS.itemH.GetItem(gr1sre);
      this.gr1cheH = this.popupHFS.itemH.GetItem(gr1che);
      this.gr1cheV = this.popupHFS.itemH.GetItem(gr1che);
      this.gr1pyaH = this.popupHFS.itemH.GetItem(gr1pya);
      this.gr1pyaV = this.popupHFS.itemH.GetItem(gr1pya);
      this.gr1subH = this.popupHFS.itemH.GetItem(gr1sub);
      this.gr1subV = this.popupHFS.itemH.GetItem(gr1sub);
      this.gr1vosH = this.popupHFS.itemH.GetItem(gr1vos);
      this.gr1vosV = this.popupHFS.itemH.GetItem(gr1vos); 
   }
   
   this.setGroup2Items = function(gr2title, gr2_0, gr2_1, gr2_2, gr2_3, gr2_4, gr2_5, gr2_6, gr2_7, gr2_8, gr2_9, gr2_10, gr2_11, gr2_12, gr2_13, gr2_14, gr2_15, gr2_16, gr2_17, gr2_18, gr2_19, gr2_20, gr2_21, gr2_22, gr2_23) {
      this.gr2titleH = this.popupHFS.itemH.GetItem(gr2title);
      this.gr2titleV = this.popupHFS.itemV.GetItem(gr2title);
      this.gr2_0H = this.popupHFS.itemH.GetItem(gr2_0);
      this.gr2_0V = this.popupHFS.itemV.GetItem(gr2_0);
      this.gr2_1H = this.popupHFS.itemH.GetItem(gr2_1);
      this.gr2_1V = this.popupHFS.itemV.GetItem(gr2_1);
      this.gr2_2H = this.popupHFS.itemH.GetItem(gr2_2);
      this.gr2_2V = this.popupHFS.itemV.GetItem(gr2_2);
      this.gr2_3H = this.popupHFS.itemH.GetItem(gr2_3);
      this.gr2_3V = this.popupHFS.itemV.GetItem(gr2_3);
      this.gr2_4H = this.popupHFS.itemH.GetItem(gr2_4);
      this.gr2_4V = this.popupHFS.itemV.GetItem(gr2_4);
      this.gr2_5H = this.popupHFS.itemH.GetItem(gr2_5);
      this.gr2_5V = this.popupHFS.itemV.GetItem(gr2_5);
      this.gr2_6H = this.popupHFS.itemH.GetItem(gr2_6);
      this.gr2_6V = this.popupHFS.itemV.GetItem(gr2_6);
      this.gr2_7H = this.popupHFS.itemH.GetItem(gr2_7);
      this.gr2_7V = this.popupHFS.itemV.GetItem(gr2_7);
      this.gr2_8H = this.popupHFS.itemH.GetItem(gr2_8);
      this.gr2_8V = this.popupHFS.itemV.GetItem(gr2_8);
      this.gr2_9H = this.popupHFS.itemH.GetItem(gr2_9);
      this.gr2_9V = this.popupHFS.itemV.GetItem(gr2_9);
      this.gr2_10H = this.popupHFS.itemH.GetItem(gr2_10);
      this.gr2_10V = this.popupHFS.itemV.GetItem(gr2_10);
      this.gr2_11H = this.popupHFS.itemH.GetItem(gr2_11);
      this.gr2_11V = this.popupHFS.itemV.GetItem(gr2_11);
      this.gr2_12H = this.popupHFS.itemH.GetItem(gr2_12);
      this.gr2_12V = this.popupHFS.itemV.GetItem(gr2_12);
      this.gr2_13H = this.popupHFS.itemH.GetItem(gr2_13);
      this.gr2_13V = this.popupHFS.itemV.GetItem(gr2_13);
      this.gr2_14H = this.popupHFS.itemH.GetItem(gr2_14);
      this.gr2_14V = this.popupHFS.itemV.GetItem(gr2_14);
      this.gr2_15H = this.popupHFS.itemH.GetItem(gr2_15);
      this.gr2_15V = this.popupHFS.itemV.GetItem(gr2_15);
      this.gr2_16H = this.popupHFS.itemH.GetItem(gr2_16);
      this.gr2_16V = this.popupHFS.itemV.GetItem(gr2_16);
      this.gr2_17H = this.popupHFS.itemH.GetItem(gr2_17);
      this.gr2_17V = this.popupHFS.itemV.GetItem(gr2_17);
      this.gr2_18H = this.popupHFS.itemH.GetItem(gr2_18);
      this.gr2_18V = this.popupHFS.itemV.GetItem(gr2_18);
      this.gr2_19H = this.popupHFS.itemH.GetItem(gr2_19);
      this.gr2_19V = this.popupHFS.itemV.GetItem(gr2_19);
      this.gr2_20H = this.popupHFS.itemH.GetItem(gr2_20);
      this.gr2_20V = this.popupHFS.itemV.GetItem(gr2_20);
      this.gr2_21H = this.popupHFS.itemH.GetItem(gr2_21);
      this.gr2_21V = this.popupHFS.itemV.GetItem(gr2_21);
      this.gr2_22H = this.popupHFS.itemH.GetItem(gr2_22);
      this.gr2_22V = this.popupHFS.itemV.GetItem(gr2_22);
      this.gr2_23H = this.popupHFS.itemH.GetItem(gr2_23);
      this.gr2_23V = this.popupHFS.itemV.GetItem(gr2_23);
   }
   
   this.setGroup1Visible = function(visible) {
      this.gr1titleH.Visible = visible;
      this.gr1titleV.Visible = visible;
      this.gr1ponH.Visible = visible;
      this.gr1ponV.Visible = visible;
      this.gr1vtoH.Visible = visible;
      this.gr1vtoV.Visible = visible;
      this.gr1sreH.Visible = visible;
      this.gr1sreV.Visible = visible;
      this.gr1cheH.Visible = visible;
      this.gr1cheV.Visible = visible;
      this.gr1pyaH.Visible = visible;
      this.gr1pyaV.Visible = visible;
      this.gr1subH.Visible = visible;
      this.gr1subV.Visible = visible;
      this.gr1vosH.Visible = visible;
      this.gr1vosV.Visible = visible;
   }
   
   this.setGroup2Visible = function(visible) {
      this.gr2titleH.Visible = visible;
      this.gr2titleV.Visible = visible;
      this.gr2_0H.Visible = visible;
      this.gr2_0V.Visible = visible;
      this.gr2_1H.Visible = visible;
      this.gr2_1V.Visible = visible;
      this.gr2_2H.Visible = visible;
      this.gr2_2V.Visible = visible;
      this.gr2_3H.Visible = visible;
      this.gr2_3V.Visible = visible;
      this.gr2_4H.Visible = visible;
      this.gr2_4V.Visible = visible;
      this.gr2_5H.Visible = visible;
      this.gr2_5V.Visible = visible;
      this.gr2_6H.Visible = visible;
      this.gr2_6V.Visible = visible;
      this.gr2_7H.Visible = visible;
      this.gr2_7V.Visible = visible;
      this.gr2_8H.Visible = visible;
      this.gr2_8V.Visible = visible;
      this.gr2_9H.Visible = visible;
      this.gr2_9V.Visible = visible;
      this.gr2_10H.Visible = visible;
      this.gr2_10V.Visible = visible;
      this.gr2_11H.Visible = visible;
      this.gr2_11V.Visible = visible;
      this.gr2_12H.Visible = visible;
      this.gr2_12V.Visible = visible;
      this.gr2_13H.Visible = visible;
      this.gr2_13V.Visible = visible;
      this.gr2_14H.Visible = visible;
      this.gr2_14V.Visible = visible;
      this.gr2_15H.Visible = visible;
      this.gr2_15V.Visible = visible;
      this.gr2_16H.Visible = visible;
      this.gr2_16V.Visible = visible;
      this.gr2_17H.Visible = visible;
      this.gr2_17V.Visible = visible;
      this.gr2_18H.Visible = visible;
      this.gr2_18V.Visible = visible;
      this.gr2_19H.Visible = visible;
      this.gr2_19V.Visible = visible;
      this.gr2_20H.Visible = visible;
      this.gr2_20V.Visible = visible;
      this.gr2_21H.Visible = visible;
      this.gr2_21V.Visible = visible;
      this.gr2_22H.Visible = visible;
      this.gr2_22V.Visible = visible;
      this.gr2_23H.Visible = visible;
      this.gr2_23V.Visible = visible;
   }
   
   this.setSettingsModeItems = function(btnSetEvery, btnSetWeek) {
      this.btnSetEveryH = this.popupHFS.itemH.GetItem(btnSetEvery);
      this.btnSetEveryV = this.popupHFS.itemV.GetItem(btnSetEvery);
      this.btnSetWeekH = this.popupHFS.itemH.GetItem(btnSetWeek);
      this.btnSetWeekV = this.popupHFS.itemV.GetItem(btnSetWeek);
      
      /*IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnSetEveryH, function() {
         if (that.settingsMode == 0 || that.settingsMode == 2) {
            that.setGroup1Visible(false);
            that.setGroup2Visible(true);
            that.settingsMode = 1;
         } else if (that.settingsMode == 1) {
            that.setGroup2Visible(false);
            that.settingsMode = 0;
         }   
      });
      IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnSetEveryV, function() {
         if (that.settingsMode == 0 || that.settingsMode == 2) {
            that.setGroup1Visible(false);
            that.setGroup2Visible(true);
            that.settingsMode = 1;
         } else if (that.settingsMode == 1) {
            that.setGroup2Visible(false);
            that.settingsMode = 0;
         }   
      });
      IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnSetWeekH, function() {
         if (that.settingsMode == 0 || that.settingsMode == 1) {
            that.setGroup1Visible(true);
            that.setGroup2Visible(true);
            that.settingsMode = 2;
         } else if (that.settingsMode == 2) {
            that.setGroup1Visible(false);
            that.setGroup2Visible(false);
            that.settingsMode = 0;
         }   
      });
      IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnSetWeekV, function() {
         if (that.settingsMode == 0 || that.settingsMode == 1) {
            that.setGroup1Visible(true);
            that.setGroup2Visible(true);
            that.settingsMode = 2;
         } else if (that.settingsMode == 2) {
            that.setGroup1Visible(false);
            that.setGroup2Visible(false);
            that.settingsMode = 0;
         }   
      });*/
   }
   
   this.setFinish = function() {
      this.isFinished = true;
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function (name, value) {
      if (name == that.signalIsOn && that.isFinished == true) {
         that.valueIsOn = value;
         that.updateState1();
      }
      if (name == that.signal1day) {
         if (value == true) {
            that.setGroup1Visible(false);
            that.setGroup2Visible(true);
         }
      }
      if (name == that.signal7day) {
         if (value == true) {
            that.setGroup1Visible(true);
            that.setGroup2Visible(true);
         }
      
      }
   });
   
   //new
   this.roomSelectIDListenerFunc = function() {}
   this.addRoomSelectIDListener = function(func) {
      this.roomSelectIDListenerFunc = func;
   }
}