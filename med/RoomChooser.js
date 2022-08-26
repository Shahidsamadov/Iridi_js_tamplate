var RoomChooser = function(device, screenManager, flatPopup, popupVolume, mainPage, backA, selectA, tokenA, btnA, devA, mediaPopupA, sliderVol, txtVol, asker, resetMultimedia) {
   var that = this;
   this.device = device;
   this.screenManager = screenManager;
   this.flatPopup = flatPopup;
   this.popupVolume = popupVolume;
   this.mainPage = mainPage;
   this.backA = backA;
   this.selectA = selectA;
   this.tokenA = tokenA;
   this.btnA = btnA;
   this.devA = devA;
   this.mediaPopupA = mediaPopupA;
   this.asker = asker;
   this.resetMultimedia = resetMultimedia;
   this.waitSwitch;
     
   this.volumePopupTimeoutID;
   this.selected = -1;
   
   this.volumeUpFuncPress;
   this.volumeUpFuncRelease;
   this.volumeDownFuncPress;
   this.volumeDownFuncRelease;
   this.volumeMuteFuncPress;
   this.volumeMuteFuncRelease;
   this.mediaFunc;
   this.powerFunc;
   this.settingsFunc;
   
   this.updateListenerFunc = function() {
   };
   //methods
   this.addUpdateListener = function(func) {
      this.updateListenerFunc = func;   
   }
   
   //vol
   this.sliderVolH = this.popupVolume.itemH.GetItem(sliderVol);
   this.txtVolH = this.popupVolume.itemH.GetItem(txtVol);
   this.sliderVolV = this.popupVolume.itemV.GetItem(sliderVol);
   this.txtVolV = this.popupVolume.itemV.GetItem(txtVol);
   this.balkonVol;
   this.kuhnyaVol;
   this.spalnyaVol;
   this.vannayaVol;
   this.sanuzelVol;
   this.gostinayaVol;
   
   this.select = function(selected) {
      IR.Log("SELECT:" + selected);
      this.unselect();
      this.selected = selected;
      this.updateListenerFunc();
      IR.SetVariable(this.tokenA[selected], true);
      this.updateVolumeLevel();
      switch(selected) {
      case 0://gostinaya
         this.setButtonsEnable(true, true, true, true, true, true);
         this.setVolumeUpFunc(volumeUpGostinayaPress, volumeUpGostinayaRelease);
         this.setVolumeDownFunc(volumeDownGostinayaPress, volumeDownGostinayaRelease);
         this.setVolumeMuteFunc(volumeMuteGostinayaPress, volumeMuteGostinayaRelease);
         this.setMediaFunc(openGostinayaMediaSelect);
         this.setPowerFunc(gostinayaAllOff);
         this.setSettingsFunc(gostinayaSettings);
      break;
      case 1://balkon
         this.setButtonsEnable(true, true, true, true, true, false);
         this.setVolumeUpFunc(volumeUpBalkonPress, volumeUpBalkonRelease);
         this.setVolumeDownFunc(volumeDownBalkonPress, volumeDownBalkonRelease);
         this.setVolumeMuteFunc(volumeMuteBalkonPress, volumeMuteBalkonRelease);
         this.setMediaFunc(openBalkonMediaSelect);
         this.setPowerFunc(balkonAllOff);
      break;
      case 2://kuhnya
         this.setButtonsEnable(true, true, true, true, true, true);
         this.setVolumeUpFunc(volumeUpKuhnyaPress, volumeUpKuhnyaRelease);
         this.setVolumeDownFunc(volumeDownKuhnyaPress, volumeDownKuhnyaRelease);
         this.setVolumeMuteFunc(volumeMuteKuhnyaPress, volumeMuteKuhnyaRelease);
         this.setMediaFunc(openKuhnyaMediaSelect);
         this.setPowerFunc(kuhnyaAllOff);
         this.setSettingsFunc(kuhnyaSettings);
      break;
      case 3://spalnya
         this.setButtonsEnable(true, true, true, true, true, true);
         this.setVolumeUpFunc(volumeUpSpalnyaPress, volumeUpSpalnyaRelease);
         this.setVolumeDownFunc(volumeDownSpalnyaPress, volumeDownSpalnyaRelease);
         this.setVolumeMuteFunc(volumeMuteSpalnyaPress, volumeMuteSpalnyaRelease);
         this.setMediaFunc(openSpalnyaMediaSelect);
         this.setPowerFunc(spalnyaAllOff);
         this.setSettingsFunc(spalnyaSettings);
      break;
      case 4://vannaya
         this.setButtonsEnable(true, true, true, true, true, false);
         this.setVolumeUpFunc(volumeUpVannayaPress, volumeUpVannayaRelease);
         this.setVolumeDownFunc(volumeDownVannayaPress, volumeDownVannayaRelease);
         this.setVolumeMuteFunc(volumeMuteVannayaPress, volumeMuteVannayaRelease);
         this.setMediaFunc(openVannayaMediaSelect);
         this.setPowerFunc(vannayaAllOff);
      break;
      case 5://sanuzel
         this.setButtonsEnable(true, true, true, true, true, false);
         this.setVolumeUpFunc(volumeUpSanuzelPress, volumeUpSanuzelRelease);
         this.setVolumeDownFunc(volumeDownSanuzelPress, volumeDownSanuzelRelease);
         this.setVolumeMuteFunc(volumeMuteSanuzelPress, volumeMuteSanuzelRelease);
         this.setMediaFunc(openSanuzelMediaSelect);
         this.setPowerFunc(sanuzelAllOff);
      break;
      case 6://prihojaya
         this.setButtonsDisable();
      break
      case 7://garderob
         this.setButtonsDisable();
      break;
      }   
   }
   
   this.updateVolumeLevel = function() {
      switch (this.selected) {
      case 0:
         this.sliderVolH.Value = this.gostinayaVol;
         this.txtVolH.Value = this.gostinayaVol;
         this.sliderVolV.Value = this.gostinayaVol;
         this.txtVolV.Value = this.gostinayaVol;
      break;
      case 1:
         this.sliderVolH.Value = this.balkonVol; 
         this.txtVolH.Value = this.balkonVol; 
         this.sliderVolV.Value = this.balkonVol; 
         this.txtVolV.Value = this.balkonVol; 
      break;
      case 2:
         this.sliderVolH.Value = this.kuhnyaVol;
         this.txtVolH.Value = this.kuhnyaVol;
         this.sliderVolV.Value = this.kuhnyaVol;
         this.txtVolV.Value = this.kuhnyaVol;
      break;
      case 3:
         this.sliderVolH.Value = this.spalnyaVol;
         this.txtVolH.Value = this.spalnyaVol;
         this.sliderVolV.Value = this.spalnyaVol;
         this.txtVolV.Value = this.spalnyaVol;
      break;
      case 4:
         this.sliderVolH.Value = this.vannayaVol; 
         this.txtVolH.Value = this.vannayaVol; 
         this.sliderVolV.Value = this.vannayaVol; 
         this.txtVolV.Value = this.vannayaVol; 
      break;
      case 5:
         this.sliderVolH.Value = this.sanuzelVol; 
         this.txtVolH.Value = this.sanuzelVol; 
         this.sliderVolV.Value = this.sanuzelVol; 
         this.txtVolV.Value = this.sanuzelVol;
      break;
      } 
   }
   
   function closeVolumePopup() {
      that.screenManager.closePopup(that.popupVolume);
   }
   
   /**SPALNYA BTNS FUNCS**/
   function volumeUpSpalnyaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[3].cmdA[0], true);   
   }
   function volumeUpSpalnyaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[3].cmdA[0], false);   
   }
   function volumeDownSpalnyaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[3].cmdA[1], true);   
   }
   function volumeDownSpalnyaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[3].cmdA[1], false);   
   }
   function volumeMuteSpalnyaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[3].cmdA[2], true);   
   }
   function volumeMuteSpalnyaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[3].cmdA[2], false);   
   }
   function openSpalnyaMediaSelect() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.mediaPopupA[3]);
   }
   function spalnyaAllOff() {
      if (!this.flatPopup.isOpened && !this.mediaPopupA[3].isOpened) {
         this.screenManager.closeAllPopups();
         this.screenManager.openPopup(this.mediaPopupA[3]);
      }
      this.device.Set(this.devA[3].cmdA[10], true);
      IR.SetTimeout(10, spalnyaAllOffEnd);
   }
   function spalnyaAllOffEnd() {
      that.device.Set(that.devA[3].cmdA[10], false);
   }
   
   function spalnyaSettings() {
      that.screenManager.openPopup(this.mediaPopupA[8]);  
   }
   
   /**KUHNYA BTNS FUNCS**/
   function volumeUpKuhnyaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[2].cmdA[0], true);   
   }
   function volumeUpKuhnyaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[2].cmdA[0], false);   
   }
   function volumeDownKuhnyaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[2].cmdA[1], true);   
   }
   function volumeDownKuhnyaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[2].cmdA[1], false);   
   }
   function volumeMuteKuhnyaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[2].cmdA[2], true);   
   }
   function volumeMuteKuhnyaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[2].cmdA[2], false);   
   }
   function openKuhnyaMediaSelect() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.mediaPopupA[2]);
   }
   function kuhnyaAllOff() {
      if (!this.flatPopup.isOpened && !this.mediaPopupA[2].isOpened) {
         this.screenManager.closeAllPopups();
         this.screenManager.openPopup(this.mediaPopupA[2]);
      }
      this.device.Set(this.devA[2].cmdA[10], true);
      IR.SetTimeout(10, kuhnyaAllOffEnd);
   }
   function kuhnyaAllOffEnd() {
      that.device.Set(that.devA[2].cmdA[10], false);
   }
   function kuhnyaSettings() {
      that.screenManager.openPopup(this.mediaPopupA[7]);
   }
   
   /**GOSTINAYA BTNS FUNCS**/
   function volumeUpGostinayaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[0].cmdA[0], true);   
   }
   function volumeUpGostinayaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[0].cmdA[0], false);   
   }
   function volumeDownGostinayaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[0].cmdA[1], true);   
   }
   function volumeDownGostinayaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[0].cmdA[1], false);   
   }
   function volumeMuteGostinayaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[0].cmdA[2], true);   
   }
   function volumeMuteGostinayaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[0].cmdA[2], false);   
   }
   function openGostinayaMediaSelect() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.mediaPopupA[0]);
   }
   function gostinayaAllOff() {
      if (!this.flatPopup.isOpened && !this.mediaPopupA[0].isOpened) {
         this.screenManager.closeAllPopups();
         this.screenManager.openPopup(this.mediaPopupA[0]);
      }
      this.device.Set(this.devA[0].cmdA[10], true);
      IR.SetTimeout(10, gostinayaAllOffEnd);
   }
   function gostinayaAllOffEnd() {
      that.device.Set(that.devA[0].cmdA[10], false);
   }
   function gostinayaSettings() {
      that.screenManager.openPopup(this.mediaPopupA[6]);
   }
   /**BALKON BTNS FUNCS**/
   function volumeUpBalkonPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[1].cmdA[0], true);   
   }
   function volumeUpBalkonRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[1].cmdA[0], false);   
   }
   function volumeDownBalkonPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[1].cmdA[1], true);   
   }
   function volumeDownBalkonRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[1].cmdA[1], false);   
   }
   function volumeMuteBalkonPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[1].cmdA[2], true);   
   }
   function volumeMuteBalkonRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[1].cmdA[2], false);   
   }
   function openBalkonMediaSelect() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.mediaPopupA[1]);
   }
   function balkonAllOff() {
      if (!this.flatPopup.isOpened && !this.mediaPopupA[1].isOpened) {
         this.screenManager.closeAllPopups();
         this.screenManager.openPopup(this.mediaPopupA[1]);
      }
      this.device.Set(this.devA[1].cmdA[7], true);
      IR.SetTimeout(10, balkonAllOffEnd);
   }
   function balkonAllOffEnd() {
      that.device.Set(that.devA[1].cmdA[7], false);
   }
   /**VANNAYA BTNS FUNCS**/
   function volumeUpVannayaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[4].cmdA[0], true);   
   }
   function volumeUpVannayaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[4].cmdA[0], false);   
   }
   function volumeDownVannayaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[4].cmdA[1], true);   
   }
   function volumeDownVannayaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[4].cmdA[1], false);   
   }
   function volumeMuteVannayaPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[4].cmdA[2], true);   
   }
   function volumeMuteVannayaRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[4].cmdA[2], false);   
   }
   function openVannayaMediaSelect() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.mediaPopupA[4]);
   }
   function vannayaAllOff() {
      if (!this.flatPopup.isOpened && !this.mediaPopupA[4].isOpened) {
         this.screenManager.closeAllPopups();
         this.screenManager.openPopup(this.mediaPopupA[4]);
      }
      this.device.Set(this.devA[4].cmdA[7], true);
      IR.SetTimeout(10, vannayaAllOffEnd);
   }
   function vannayaAllOffEnd() {
      that.device.Set(that.devA[4].cmdA[7], false);
   }
   /**SANZUEL BTNS FUNCS**/
   function volumeUpSanuzelPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[5].cmdA[0], true);   
   }
   function volumeUpSanuzelRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[5].cmdA[0], false);   
   }
   function volumeDownSanuzelPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[5].cmdA[1], true);   
   }
   function volumeDownSanuzelRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[5].cmdA[1], false);   
   }
   function volumeMuteSanuzelPress() {
      IR.ClearInterval(this.volumePopupTimeoutID);
      this.screenManager.openPopup(this.popupVolume);
      this.device.Set(this.devA[5].cmdA[2], true);   
   }
   function volumeMuteSanuzelRelease() {
      this.volumePopupTimeoutID = IR.SetTimeout(1000, closeVolumePopup);
      this.device.Set(this.devA[5].cmdA[2], false);   
   }
   function openSanuzelMediaSelect() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.mediaPopupA[5]);
   }
   function sanuzelAllOff() {
      if (!this.flatPopup.isOpened && !this.mediaPopupA[5].isOpened) {
         this.screenManager.closeAllPopups();
         this.screenManager.openPopup(this.mediaPopupA[5]);
      }
      this.device.Set(this.devA[5].cmdA[7], true);
      IR.SetTimeout(10, sanuzelAllOffEnd);
   }
   function sanuzelAllOffEnd() {
      that.device.Set(that.devA[5].cmdA[7], false);
   }
   
   this.setVolumeUpFunc = function(funcPress, funcRelease) {
      this.volumeUpFuncPress = funcPress;
      this.volumeUpFuncRelease = funcRelease;   
   }
   this.setVolumeDownFunc = function(funcPress, funcRelease) {
      this.volumeDownFuncPress = funcPress;
      this.volumeDownFuncRelease = funcRelease;
   }
   this.setVolumeMuteFunc = function(funcPress, funcRelease) {
      this.volumeMuteFuncPress = funcPress;
      this.volumeMuteFuncRelease = funcRelease;
   }
   this.setMediaFunc = function(func) {
      this.mediaFunc = func;
   }
   this.setPowerFunc = function(func) {
      this.powerFunc = func;
   }
   this.setSettingsFunc = function(func) {
      this.settingsFunc = func;
   }
   
   this.unselect = function(i) {
      IR.Log("UNSELECT");
      this.selected = -1;
      for (var i=0; i<tokenA.length; i++) {
         IR.SetVariable(this.tokenA[i], false);
      }
      this.setButtonsDisable();    
   }
   
   this.setButtonsDisable = function() {
      IR.Log("disable btns");
      this.mainPage.itemH.GetItem(this.btnA[0]).GetState(0).Image = "volume_up_inactive.png";
      this.mainPage.itemH.GetItem(this.btnA[0]).Enable = false;
      this.mainPage.itemH.GetItem(this.btnA[1]).GetState(0).Image = "volume_down_inactive.png";
      this.mainPage.itemH.GetItem(this.btnA[1]).Enable = false;
      this.mainPage.itemH.GetItem(this.btnA[2]).GetState(0).Image = "volume_mute_inactive.png";
      this.mainPage.itemH.GetItem(this.btnA[2]).Enable = false;
      this.mainPage.itemH.GetItem(this.btnA[3]).GetState(0).Image = "media_inactive.png";
      this.mainPage.itemH.GetItem(this.btnA[3]).Enable = false;
      this.mainPage.itemH.GetItem(this.btnA[4]).GetState(0).Image = "power_off_inactive.png";
      this.mainPage.itemH.GetItem(this.btnA[4]).Enable = false; 
      this.mainPage.itemH.GetItem(this.btnA[5]).GetState(0).Image = "settings_inactive.png";
      this.mainPage.itemH.GetItem(this.btnA[5]).Enable = false;
      //
      this.mainPage.itemV.GetItem(this.btnA[0]).GetState(0).Image = "volume_up_inactive.png";
      this.mainPage.itemV.GetItem(this.btnA[0]).Enable = false;
      this.mainPage.itemV.GetItem(this.btnA[1]).GetState(0).Image = "volume_down_inactive.png";
      this.mainPage.itemV.GetItem(this.btnA[1]).Enable = false;
      this.mainPage.itemV.GetItem(this.btnA[2]).GetState(0).Image = "volume_mute_inactive.png";
      this.mainPage.itemV.GetItem(this.btnA[2]).Enable = false;
      this.mainPage.itemV.GetItem(this.btnA[3]).GetState(0).Image = "media_inactive.png";
      this.mainPage.itemV.GetItem(this.btnA[3]).Enable = false;
      this.mainPage.itemV.GetItem(this.btnA[4]).GetState(0).Image = "power_off_inactive.png";
      this.mainPage.itemV.GetItem(this.btnA[4]).Enable = false; 
      this.mainPage.itemV.GetItem(this.btnA[5]).GetState(0).Image = "settings_inactive.png";
      this.mainPage.itemV.GetItem(this.btnA[5]).Enable = false;  
   }
   
   this.setButtonsEnable = function(btn1enable, btn2enable, btn3enable, btn4enable, btn5enable, btn6enable) {
      IR.Log("enable btns");
      if (btn1enable) {
         this.mainPage.itemH.GetItem(this.btnA[0]).GetState(0).Image = "volume_up.png";
         this.mainPage.itemH.GetItem(this.btnA[0]).Enable = true;
         this.mainPage.itemV.GetItem(this.btnA[0]).GetState(0).Image = "volume_up.png";
         this.mainPage.itemV.GetItem(this.btnA[0]).Enable = true;
      } else {
         this.mainPage.itemH.GetItem(this.btnA[0]).GetState(0).Image = "volume_up_inactive.png";
         this.mainPage.itemH.GetItem(this.btnA[0]).Enable = false;
         this.mainPage.itemV.GetItem(this.btnA[0]).GetState(0).Image = "volume_up_inactive.png";
         this.mainPage.itemV.GetItem(this.btnA[0]).Enable = false;
      }
      if (btn2enable) {
         this.mainPage.itemH.GetItem(this.btnA[1]).GetState(0).Image = "volume_down.png";
         this.mainPage.itemH.GetItem(this.btnA[1]).Enable = true;
         this.mainPage.itemV.GetItem(this.btnA[1]).GetState(0).Image = "volume_down.png";
         this.mainPage.itemV.GetItem(this.btnA[1]).Enable = true;
      } else {
         this.mainPage.itemH.GetItem(this.btnA[1]).GetState(0).Image = "volume_down_inactive.png";
         this.mainPage.itemH.GetItem(this.btnA[1]).Enable = false;
         this.mainPage.itemV.GetItem(this.btnA[1]).GetState(0).Image = "volume_down_inactive.png";
         this.mainPage.itemV.GetItem(this.btnA[1]).Enable = false;
      }
      if (btn3enable) {
         this.mainPage.itemH.GetItem(this.btnA[2]).GetState(0).Image = "volume_mute.png";
         this.mainPage.itemH.GetItem(this.btnA[2]).Enable = true;
         this.mainPage.itemV.GetItem(this.btnA[2]).GetState(0).Image = "volume_mute.png";
         this.mainPage.itemV.GetItem(this.btnA[2]).Enable = true;
      } else {
         this.mainPage.itemH.GetItem(this.btnA[2]).GetState(0).Image = "volume_mute_inactive.png";
         this.mainPage.itemH.GetItem(this.btnA[2]).Enable = false;
         this.mainPage.itemV.GetItem(this.btnA[2]).GetState(0).Image = "volume_mute_inactive.png";
         this.mainPage.itemV.GetItem(this.btnA[2]).Enable = false;
      }
      if (btn4enable) {
         this.mainPage.itemH.GetItem(this.btnA[3]).GetState(0).Image = "media.png";
         this.mainPage.itemH.GetItem(this.btnA[3]).Enable = true;
         this.mainPage.itemV.GetItem(this.btnA[3]).GetState(0).Image = "media.png";
         this.mainPage.itemV.GetItem(this.btnA[3]).Enable = true;
      } else {
         this.mainPage.itemH.GetItem(this.btnA[3]).GetState(0).Image = "media_inactive.png";
         this.mainPage.itemH.GetItem(this.btnA[3]).Enable = false;
         this.mainPage.itemV.GetItem(this.btnA[3]).GetState(0).Image = "media_inactive.png";
         this.mainPage.itemV.GetItem(this.btnA[3]).Enable = false;
      }
      if (btn5enable) {
         this.mainPage.itemH.GetItem(this.btnA[4]).GetState(0).Image = "power_off.png";
         this.mainPage.itemH.GetItem(this.btnA[4]).Enable = true;
         this.mainPage.itemV.GetItem(this.btnA[4]).GetState(0).Image = "power_off.png";
         this.mainPage.itemV.GetItem(this.btnA[4]).Enable = true;
      } else {
         this.mainPage.itemH.GetItem(this.btnA[4]).GetState(0).Image = "power_off_inactive.png";
         this.mainPage.itemH.GetItem(this.btnA[4]).Enable = false;
         this.mainPage.itemV.GetItem(this.btnA[4]).GetState(0).Image = "power_off_inactive.png";
         this.mainPage.itemV.GetItem(this.btnA[4]).Enable = false;
      }
      if (btn6enable) { 
         this.mainPage.itemH.GetItem(this.btnA[5]).GetState(0).Image = "settings.png";
         this.mainPage.itemH.GetItem(this.btnA[5]).Enable = true;
         this.mainPage.itemV.GetItem(this.btnA[5]).GetState(0).Image = "settings.png";
         this.mainPage.itemV.GetItem(this.btnA[5]).Enable = true;
      } else {
         this.mainPage.itemH.GetItem(this.btnA[5]).GetState(0).Image = "settings_inactive.png";
         this.mainPage.itemH.GetItem(this.btnA[5]).Enable = false;
         this.mainPage.itemV.GetItem(this.btnA[5]).GetState(0).Image = "settings_inactive.png";
         this.mainPage.itemV.GetItem(this.btnA[5]).Enable = false;
      }
   }
   
   //VOLUME LISTENER
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function(name, value) {
      if (name == that.devA[0].fbA[6])
         that.gostinayaVol = value;
      if (name == that.devA[1].fbA[3])
         that.balkonVol = value;
      if (name == that.devA[2].fbA[6])
         that.kuhnyaVol = value;
      if (name == that.devA[3].fbA[6])
         that.spalnyaVol = value;
      if (name == that.devA[4].fbA[3])
         that.vannayaVol = value;
      if (name == that.devA[5].fbA[3])
         that.sanuzelVol = value;
      that.updateVolumeLevel();
   });
   
   //UNSELECT
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.backA[0]), function() {
      that.unselect();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.backA[1]), function() {
      that.unselect();         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemH, function() {
      that.unselect();         
   });
   //V
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.backA[0]), function() {
      that.unselect();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.backA[1]), function() {
      that.unselect();         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemV, function() {
      that.unselect();         
   }); 
   //SELECT   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.selectA[0]), function() {
      that.select(0);         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.selectA[1]), function() {
      that.select(1);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.selectA[2]), function() {
      that.select(2);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.selectA[3]), function() {
      that.select(3);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.selectA[4]), function() {
      that.select(4);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.selectA[5]), function() {
      that.select(5);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.selectA[6]), function() {
      that.select(6);         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemH.GetItem(this.selectA[7]), function() {
      that.select(7);         
   });
   //V
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.selectA[0]), function() {
      that.select(0);         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.selectA[1]), function() {
      that.select(1);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.selectA[2]), function() {
      that.select(2);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.selectA[3]), function() {
      that.select(3);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.selectA[4]), function() {
      that.select(4);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.selectA[5]), function() {
      that.select(5);         
   }); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.selectA[6]), function() {
      that.select(6);         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.flatPopup.itemV.GetItem(this.selectA[7]), function() {
      that.select(7);         
   });
   
   //btns
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.mainPage.itemH.GetItem(this.btnA[0]), function() {
      that.volumeUpFuncPress();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemH.GetItem(this.btnA[0]), function() {
      that.volumeUpFuncRelease();         
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.mainPage.itemH.GetItem(this.btnA[1]), function() {
      that.volumeDownFuncPress();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemH.GetItem(this.btnA[1]), function() {
      that.volumeDownFuncRelease();         
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.mainPage.itemH.GetItem(this.btnA[2]), function() {
      that.volumeMuteFuncPress();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemH.GetItem(this.btnA[2]), function() {
      that.volumeMuteFuncRelease();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemH.GetItem(this.btnA[3]), function() {
      that.mediaFunc();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemH.GetItem(this.btnA[4]), function() {
      that.powerFunc();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemH.GetItem(this.btnA[5]), function() {
      that.settingsFunc();         
   });
   //
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.mainPage.itemV.GetItem(this.btnA[0]), function() {
      that.volumeUpFuncPress();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemV.GetItem(this.btnA[0]), function() {
      that.volumeUpFuncRelease();         
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.mainPage.itemV.GetItem(this.btnA[1]), function() {
      that.volumeDownFuncPress();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemV.GetItem(this.btnA[1]), function() {
      that.volumeDownFuncRelease();         
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.mainPage.itemV.GetItem(this.btnA[2]), function() {
      that.volumeMuteFuncPress();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemV.GetItem(this.btnA[2]), function() {
      that.volumeMuteFuncRelease();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemV.GetItem(this.btnA[3]), function() {
      that.mediaFunc();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemV.GetItem(this.btnA[4]), function() {
      that.powerFunc();         
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.mainPage.itemV.GetItem(this.btnA[5]), function() {
      that.settingsFunc();         
   });
   
   this.unselect();   
}