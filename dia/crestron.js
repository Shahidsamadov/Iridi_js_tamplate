var hCrestronDrv = IR.GetDevice("Crestron");

// установка канала
function SetChan(name, value)
{
   hCrestronDrv.Set(name,value);
}

// отправка импульса
function SendPulse(name)
{
   SetChan(name,true);
   IR.SetTimeout(10,SetChan(name,false));
}

IR.AddListener(IR.EVENT_ONLINE , IR.GetDevice("Crestron"), function()
//Событие срабатывающее при принятии событий от устройства
{ 
   HideGlobalWait(); 
   IR.Log("Crestron: Device is online") //В лог выводим текст
});


IR.AddListener(IR.EVENT_OFFLINE , IR.GetDevice("Crestron"), function()
//Событие срабатывающее при принятии событий от устройства
{
   ShowGlobalWait(); 
   IR.Log("Crestron: Device is offline") //В лог выводим текст
});

IR.AddListener(IR.EVENT_TAG_CHANGE, hCrestronDrv, function(name, value)
//Событие срабатывающее при принятии событий от устройства
{
   IR.Log("Crestron: " + name + " (" + value + ")");
   switch (name)
   {   
      case "[Cinema]AppleTV_InUse":
         Cinema_AppleTV = value;
         if (value) OnVolumeControl();
      break
      case "[Cinema]BR_InUse":
         Cinema_BR = value;
         if (value) OnVolumeControl();
      break
      case "[Cinema]Kodi_InUse":
         Cinema_Kodi = value;
         if (value) OnVolumeControl();
      break
      case "[Cinema]Satellite_InUse":
         Cinema_Satellite = value;
         if (value) OnVolumeControl();
      break
      
      case "[Cinema]Start_AppleTV_Busy":
         Cinema_Wait = value;
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (Cinema_Wait) ShowMediaWait();
         }
      break
      case "[Cinema]Start_BR_Busy":
         Cinema_Wait = value;
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (Cinema_Wait) ShowMediaWait();
         }
      break
      case "[Cinema]Start_Kodi_Busy":
         Cinema_Wait = value;
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (Cinema_Wait) ShowMediaWait();
         }
      break
      case "[Cinema]Start_Satellite_Busy":
         Cinema_Wait = value;
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (Cinema_Wait) ShowMediaWait();
         }
      break
      case "[Cinema]Media_Off_Busy":
         Cinema_Wait = value;
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (Cinema_Wait) { ShowMediaWait(); }
            else { HideAll(); }
         }
         if (Cinema_Wait) OffVolumeControl();
      break

      case "[Reboot]Reboot_Busy":
         Cinema_Wait = value;
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (Cinema_Wait) { ShowMediaWait(); }
            else { HideAll(); }
         }
      break
      
      case "[Cinema]Start_AppleTV_Finished":
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (value) ShowMediaAppleTV();
         }
      break
      case "[Cinema]Start_BR_Finished":
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (value) ShowMediaBR();
         }
      break
      case "[Cinema]Start_Kodi_Finished":
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (value) ShowMediaXBMC();
         }
      break
      case "[Cinema]Start_Satellite_Finished":
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (value) ShowMediaSatellite();
         }
      break
      case "[Cinema]Media_Off_Finished":
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (Cinema_Wait) HideAll();
         }
         if (value)
         {
            OffVolumeControl();
            Cinema_AppleTV       = false;
            Cinema_BR            = false;
            Cinema_Kodi          = false;
            Cinema_Satellite     = false;
         }
      break
      case "[Reboot]Reboot_Finished":
         if (PopUp_MediaRebootMsg||PopUp_MediaSelect || PopUp_MediaMessage || PopUp_MediaOff || PopUp_MediaWait || PopUp_MediaBR || PopUp_MediaXBMC || PopUp_MediaAppleTV || PopUp_MediaSatellite)
         {
            if (Cinema_Wait)
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
      break

      case "[Scenario]AnyScenario_Busy":
         fBusyByScenario = value;
      break
      
      case "[Cinema]Room_Device#":
      break

      case "[ADA]Volume_Fb[0-65535]":
         TryShowVolume();
      break
      
   }
});