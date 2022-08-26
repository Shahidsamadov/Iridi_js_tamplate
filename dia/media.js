
function MediaPress()
{
   if (Cinema_Wait)
   {
      ShowMediaWait();
   }
   else
   {
      if (Cinema_AppleTV)
      {
         ShowMediaAppleTV();
      }
      else if (Cinema_BR)
      {
         ShowMediaBR();
      }
      else if (Cinema_Kodi)
      {
         ShowMediaXBMC();
      }
      else if (Cinema_Satellite)
      {
         ShowMediaSatellite();
      }
      else
      {
         ShowMediaSelect();
      }
   }
}

function MediaOffPress()
{
   if (Cinema_AppleTV||Cinema_BR||Cinema_Kodi||Cinema_Satellite)
   {
      if (!Cinema_Wait)
      {
         ShowMediaOff();
      }
   }
}

function OnVolumeControl()
{
      IR.GetItem("MainPageH").GetItem("btReboot").Enable = true;
      IR.GetItem("MainPageH").GetItem("btReboot").GetState(0).Image = "reset_64x64.png";

      IR.GetItem("MainPageH").GetItem("btVolumeUp").Enable = true;
      IR.GetItem("MainPageH").GetItem("btVolumeUp").GetState(0).Image = "VolUp_64x64.png";

      IR.GetItem("MainPageH").GetItem("btVolumeDown").Enable = true;
      IR.GetItem("MainPageH").GetItem("btVolumeDown").GetState(0).Image = "VolDown_64x64.png";

      IR.GetItem("MainPageH").GetItem("btVolumeMute").Enable = true;
      IR.GetItem("MainPageH").GetItem("btVolumeMute").GetState(0).Image = "VolMute_64x64.png";
      
      IR.GetItem("MainPageH").GetItem("btCinemaOff").Enable = true;


      IR.GetItem("MainPageV").GetItem("btReboot").Enable = true;
      IR.GetItem("MainPageV").GetItem("btReboot").GetState(0).Image = "reset_64x64.png";

      IR.GetItem("MainPageV").GetItem("btVolumeUp").Enable = true;
      IR.GetItem("MainPageV").GetItem("btVolumeUp").GetState(0).Image = "VolUp_64x64.png";

      IR.GetItem("MainPageV").GetItem("btVolumeDown").Enable = true;
      IR.GetItem("MainPageV").GetItem("btVolumeDown").GetState(0).Image = "VolDown_64x64.png";

      IR.GetItem("MainPageV").GetItem("btVolumeMute").Enable = true;
      IR.GetItem("MainPageV").GetItem("btVolumeMute").GetState(0).Image = "VolMute_64x64.png";
      
      IR.GetItem("MainPageV").GetItem("btCinemaOff").Enable = true;
}

function OffVolumeControl()
{
      IR.GetItem("MainPageH").GetItem("btReboot").Enable = false;
      IR.GetItem("MainPageH").GetItem("btReboot").GetState(0).Image = "reset_64x64_g.png";

      IR.GetItem("MainPageH").GetItem("btVolumeUp").Enable = false;
      IR.GetItem("MainPageH").GetItem("btVolumeUp").GetState(0).Image = "VolUp_64x64_g.png";

      IR.GetItem("MainPageH").GetItem("btVolumeDown").Enable = false;
      IR.GetItem("MainPageH").GetItem("btVolumeDown").GetState(0).Image = "VolDown_64x64_g.png";

      IR.GetItem("MainPageH").GetItem("btVolumeMute").Enable = false;
      IR.GetItem("MainPageH").GetItem("btVolumeMute").GetState(0).Image = "VolMute_64x64_g.png";
      
      IR.GetItem("MainPageH").GetItem("btCinemaOff").Enable = false;


      IR.GetItem("MainPageV").GetItem("btReboot").Enable = false;
      IR.GetItem("MainPageV").GetItem("btReboot").GetState(0).Image = "reset_64x64_g.png";

      IR.GetItem("MainPageV").GetItem("btVolumeUp").Enable = false;
      IR.GetItem("MainPageV").GetItem("btVolumeUp").GetState(0).Image = "VolUp_64x64_g.png";

      IR.GetItem("MainPageV").GetItem("btVolumeDown").Enable = false;
      IR.GetItem("MainPageV").GetItem("btVolumeDown").GetState(0).Image = "VolDown_64x64_g.png";

      IR.GetItem("MainPageV").GetItem("btVolumeMute").Enable = false;
      IR.GetItem("MainPageV").GetItem("btVolumeMute").GetState(0).Image = "VolMute_64x64_g.png";
      
      IR.GetItem("MainPageV").GetItem("btCinemaOff").Enable = false;
}


///*********************************************************************************************

function OnBack()
{
}

function OffBack()
{
}

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("BluRayH"),function()
{
   OnBack();
});

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("XBMCNavH"),function()
{
   OnBack();
});

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("AppleTVNavH"),function()
{
   OnBack();
});

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("SatelliteH"),function()
{
   OnBack();
});

IR.AddListener(IR.EVENT_ITEM_HIDE,IR.GetItem("BluRayH"),function()
{
   OffBack();
});

IR.AddListener(IR.EVENT_ITEM_HIDE,IR.GetItem("XBMCNavH"),function()
{
   OffBack();
});

IR.AddListener(IR.EVENT_ITEM_HIDE,IR.GetItem("AppleTVNavH"),function()
{
   OffBack();
});

IR.AddListener(IR.EVENT_ITEM_HIDE,IR.GetItem("SatelliteH"),function()
{
   OffBack();
});

/// ***************

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("BluRayV"),function()
{
   OnBack();
});

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("XBMCNavV"),function()
{
   OnBack();
});

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("AppleTVNavV"),function()
{
   OnBack();
});

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("SatelliteV"),function()
{
   OnBack();
});

IR.AddListener(IR.EVENT_ITEM_HIDE,IR.GetItem("BluRayV"),function()
{
   OffBack();
});

IR.AddListener(IR.EVENT_ITEM_HIDE,IR.GetItem("XBMCNavH"),function()
{
   OffBack();
});

IR.AddListener(IR.EVENT_ITEM_HIDE,IR.GetItem("AppleTVNavV"),function()
{
   OffBack();
});

IR.AddListener(IR.EVENT_ITEM_HIDE,IR.GetItem("SatelliteV"),function()
{
   OffBack();
});



//***************************************
function MediaReboot()
{
   if (Cinema_AppleTV||Cinema_Kodi||Cinema_Satellite)
   {
      if (Cinema_AppleTV)
      {
         IR.GetItem("MediaRebootMsgV").GetItem("txtMessage").Text =  "Вы действительно желаете перезагрузить AppleTV?";
         IR.GetItem("MediaRebootMsgH").GetItem("txtMessage").Text =  "Вы действительно желаете перезагрузить AppleTV?";
      }
      else if (Cinema_Kodi)
      {
         IR.GetItem("MediaRebootMsgV").GetItem("txtMessage").Text =  "Вы действительно желаете перезагрузить медиа плеер?";
         IR.GetItem("MediaRebootMsgH").GetItem("txtMessage").Text =  "Вы действительно желаете перезагрузить медиа плеер?";
      } 
      else if (Cinema_Satellite)
      {
         IR.GetItem("MediaRebootMsgV").GetItem("txtMessage").Text =  "Вы действительно желаете перезагрузить спутниковое ТВ?";
         IR.GetItem("MediaRebootMsgH").GetItem("txtMessage").Text =  "Вы действительно желаете перезагрузить спутниковое ТВ?";
      } 
      else
      {
         IR.GetItem("MediaRebootMsgV").GetItem("txtMessage").Text =  "Вы действительно желаете перезагрузить устройство?";
         IR.GetItem("MediaRebootMsgH").GetItem("txtMessage").Text =  "Вы действительно желаете перезагрузить устройство?";
      } 
      ShowMediaRebootMsg();
   }
}