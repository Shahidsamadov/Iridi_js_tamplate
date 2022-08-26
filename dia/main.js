/* On Start */
IR.AddListener(IR.EVENT_START, 0, function()
{
   ShowPopup(1);
   ShowGlobalWait();
   
   IR.SetInterval(5000, Every5sCheck);
});

/* On Work */
IR.AddListener(IR.EVENT_WORK, 0, function(time)
{

});

/* On Exit */
IR.AddListener(IR.EVENT_EXIT, 0, function()
{

});

function Every5sCheck()
{
   if (IR.GetVariable("System.Net.WiFi"))
   {
      IR.Log("WiFi is ON");
      if (IR.GetVariable("Drivers.Crestron.Online"))
      { // есть WiFi и подключение к контроллеру
         if (PopUp_GlobalWait) HideGlobalWait();
      }
      else
      { // есть WiFi и нет подключения к контроллеру
         ShowGlobalWait();
      }
   }
   else
   { // нет WiFi
      ShowGlobalWait();
      IR.Log("WiFi is OFF");
   }
}

var   g_iVolumeInterval;

var   fBusyByScenario      = false;

var   Cinema_AppleTV       = false;
var   Cinema_BR            = false;
var   Cinema_Kodi          = false;
var   Cinema_Satellite     = false;

var   Cinema_Wait          =  false;

var   g_iOrientation = 1;

var   PopUp_Volume         =  false;

var   PopUp_LightInput     =  false;
var   PopUp_LightLiving    =  false;
var   PopUp_LightCorridor  =  false;
var   PopUp_LightKitchen   =  false;
var   PopUp_LightDining    =  false;
var   PopUp_LightCabinet   =  false;
var   PopUp_LightWC        =  false;
var   PopUp_LightWashroom  =  false;
var   PopUp_LightWardrobe  =  false;
var   PopUp_LightBedroom   =  false;
var   PopUp_LightBath      =  false;

var   PopUp_ShadeLiving    =  false;
var   PopUp_ShadeKitchen   =  false;
var   PopUp_ShadeDining    =  false;
var   PopUp_ShadeCabinet   =  false;
var   PopUp_ShadeBedroom   =  false;
var   PopUp_FullShadeLiving    =  false;
var   PopUp_FullShadeKitchen   =  false;
var   PopUp_FullShadeDining    =  false;

var   PopUp_FireplaceMain  =  false;
var   PopUp_FireplaceAsk   =  false;

var   PopUp_Camera         =  false;

var   PopUp_Scenario       =  false;
var   PopUp_ScenarioStart  =  false;
var   PopUp_ScenarioInProgress =  false;

var   PopUp_Power          =  false;

var   PopUp_MediaSelect    =  false;
var   PopUp_MediaMessage   =  false;
var   PopUp_MediaOff       =  false;
var   PopUp_MediaWait      =  false;
var   PopUp_MediaBR        =  false;
var   PopUp_MediaXBMC      =  false;
var   PopUp_MediaAppleTV   =  false;
var   PopUp_MediaSatellite =  false;
var   PopUp_MediaRebootMsg =  false;

var   PopUp_GlobalWait     = false;

var   PopUp_LightsByRoom   = false;
var   PopUp_ShadesByRoom   = false;

var   g_fReturnToScenarios =  false;

function ShowPopup(orientation)
{
   IR.Log("Show PopUp " + orientation);
   if (orientation)
   {// landscape
      IR.ShowPopup("FlatH");
      
      if (PopUp_LightInput) IR.ShowPopup("LightInputH");
      if (PopUp_LightLiving) IR.ShowPopup("LightLivingH");
      if (PopUp_LightCorridor) IR.ShowPopup("LightCorridorH");
      if (PopUp_LightKitchen) IR.ShowPopup("LightKitchenH");
      if (PopUp_LightDining) IR.ShowPopup("LightDiningH");
      if (PopUp_LightCabinet) IR.ShowPopup("LightCabinetH");
      if (PopUp_LightWC) IR.ShowPopup("LightWCH");
      if (PopUp_LightWashroom) IR.ShowPopup("LightWashroomH");
      if (PopUp_LightWardrobe) IR.ShowPopup("LightWardrobeH");
      if (PopUp_LightBedroom) IR.ShowPopup("LightBedroomH");
      if (PopUp_LightBath) IR.ShowPopup("LightBathH");

      if (PopUp_ShadeLiving) IR.ShowPopup("ShadeSimpleLivingH");
      if (PopUp_ShadeKitchen) IR.ShowPopup("ShadeSimpleKitchenH");
      if (PopUp_ShadeDining) IR.ShowPopup("ShadeSimpleDiningH");
      if (PopUp_ShadeCabinet) IR.ShowPopup("ShadeCabinetH");
      if (PopUp_ShadeBedroom) IR.ShowPopup("ShadeBedroomH");
      if (PopUp_FullShadeLiving) IR.ShowPopup("ShadeLivingH");
      if (PopUp_FullShadeKitchen) IR.ShowPopup("ShadeKitchenH");
      if (PopUp_FullShadeDining) IR.ShowPopup("ShadeDiningH");

      if (PopUp_FireplaceMain) IR.ShowPopup("FireplaceH");
      if (PopUp_FireplaceAsk) IR.ShowPopup("FireplaceStartH");

      if (PopUp_Camera) IR.ShowPopup("CameraH");

      if (PopUp_Scenario) IR.ShowPopup("ScenariosH");
      if (PopUp_ScenarioStart) IR.ShowPopup("ScenarioStartH");
      if (PopUp_ScenarioInProgress) IR.ShowPopup("ScenarioInProgressH");

      if (PopUp_Power) IR.ShowPopup("PowerH");

      if (PopUp_MediaSelect) IR.ShowPopup("MediaSelectH");
      if (PopUp_MediaMessage) IR.ShowPopup("MediaMessageH");
      if (PopUp_MediaOff) IR.ShowPopup("MediaOffH");
      if (PopUp_MediaWait) IR.ShowPopup("MediaWaitH");
      if (PopUp_MediaBR) IR.ShowPopup("BluRayH");
      if (PopUp_MediaXBMC) IR.ShowPopup("XBMCNavH");
      if (PopUp_MediaAppleTV) IR.ShowPopup("AppleTVNavH");
      if (PopUp_MediaSatellite) IR.ShowPopup("SatelliteH");
      if (PopUp_MediaRebootMsg) IR.ShowPopup("MediaRebootMsgH");

      if (PopUp_Volume) IR.ShowPopup("VolumeH");

      if (PopUp_LightsByRoom) IR.ShowPopup("LightsByRoomH");
      if (PopUp_ShadesByRoom) IR.ShowPopup("ShadesByRoomH");

      if (PopUp_GlobalWait) IR.ShowPopup("GlobalWaitH");
   }
   else
   {// portrait
      IR.ShowPopup("FlatV");
      
      if (PopUp_LightInput) IR.ShowPopup("LightInputV");
      if (PopUp_LightLiving) IR.ShowPopup("LightLivingV");
      if (PopUp_LightCorridor) IR.ShowPopup("LightCorridorV");
      if (PopUp_LightKitchen) IR.ShowPopup("LightKitchenV");
      if (PopUp_LightDining) IR.ShowPopup("LightDiningV");
      if (PopUp_LightCabinet) IR.ShowPopup("LightCabinetV");
      if (PopUp_LightWC) IR.ShowPopup("LightWCV");
      if (PopUp_LightWashroom) IR.ShowPopup("LightWashroomV");
      if (PopUp_LightWardrobe) IR.ShowPopup("LightWardrobeV");
      if (PopUp_LightBedroom) IR.ShowPopup("LightBedroomV");
      if (PopUp_LightBath) IR.ShowPopup("LightBathV");

      if (PopUp_ShadeLiving) IR.ShowPopup("ShadeSimpleLivingV");
      if (PopUp_ShadeKitchen) IR.ShowPopup("ShadeSimpleKitchenV");
      if (PopUp_ShadeDining) IR.ShowPopup("ShadeSimpleDiningV");
      if (PopUp_ShadeCabinet) IR.ShowPopup("ShadeCabinetV");
      if (PopUp_ShadeBedroom) IR.ShowPopup("ShadeBedroomV");
      if (PopUp_FullShadeLiving) IR.ShowPopup("ShadeLivingV");
      if (PopUp_FullShadeKitchen) IR.ShowPopup("ShadeKitchenV");
      if (PopUp_FullShadeDining) IR.ShowPopup("ShadeDiningV");

      if (PopUp_FireplaceMain) IR.ShowPopup("FireplaceV");
      if (PopUp_FireplaceAsk) IR.ShowPopup("FireplaceStartV");

      if (PopUp_Camera) IR.ShowPopup("CameraV");

      if (PopUp_Scenario) IR.ShowPopup("ScenariosV");
      if (PopUp_ScenarioStart) IR.ShowPopup("ScenarioStartV");
      if (PopUp_ScenarioInProgress) IR.ShowPopup("ScenarioInProgressV");

      if (PopUp_Power) IR.ShowPopup("PowerV");

      if (PopUp_MediaSelect) IR.ShowPopup("MediaSelectV");
      if (PopUp_MediaMessage) IR.ShowPopup("MediaMessageV");
      if (PopUp_MediaOff) IR.ShowPopup("MediaOffV");
      if (PopUp_MediaWait) IR.ShowPopup("MediaWaitV");
      if (PopUp_MediaBR) IR.ShowPopup("BluRayV");
      if (PopUp_MediaXBMC) IR.ShowPopup("XBMCNavV");
      if (PopUp_MediaAppleTV) IR.ShowPopup("AppleTVNavV");
      if (PopUp_MediaSatellite) IR.ShowPopup("SatelliteV");
      if (PopUp_MediaRebootMsg) IR.ShowPopup("MediaRebootMsgV");

      if (PopUp_Volume) IR.ShowPopup("VolumeV");

      if (PopUp_LightsByRoom) IR.ShowPopup("LightsByRoomV");
      if (PopUp_ShadesByRoom) IR.ShowPopup("ShadesByRoomV");

      if (PopUp_GlobalWait) IR.ShowPopup("GlobalWaitV");
   }
   HidePopup(orientation);
//   UpdateMenu(orientation);
}

function HidePopup(orientation)
{
   if (orientation)
   {
      //RoomList = RoomListH;
     
      if (!PopUp_LightInput) IR.HidePopup("LightInputH");
      if (!PopUp_LightLiving) IR.HidePopup("LightLivingH");
      if (!PopUp_LightCorridor) IR.HidePopup("LightCorridorH");
      if (!PopUp_LightKitchen) IR.HidePopup("LightKitchenH");
      if (!PopUp_LightDining) IR.HidePopup("LightDiningH");
      if (!PopUp_LightCabinet) IR.HidePopup("LightCabinetH");
      if (!PopUp_LightWC) IR.HidePopup("LightWCH");
      if (!PopUp_LightWashroom) IR.HidePopup("LightWashroomH");
      if (!PopUp_LightWardrobe) IR.HidePopup("LightWardrobeH");
      if (!PopUp_LightBedroom) IR.HidePopup("LightBedroomH");
      if (!PopUp_LightBath) IR.HidePopup("LightBathH");
          
      if (!PopUp_ShadeLiving) IR.HidePopup("ShadeSimpleLivingH");
      if (!PopUp_ShadeKitchen) IR.HidePopup("ShadeSimpleKitchenH");
      if (!PopUp_ShadeDining) IR.HidePopup("ShadeSimpleDiningH");
      if (!PopUp_ShadeCabinet) IR.HidePopup("ShadeCabinetH");
      if (!PopUp_ShadeBedroom) IR.HidePopup("ShadeBedroomH");
      if (!PopUp_FullShadeLiving) IR.HidePopup("ShadeLivingH");
      if (!PopUp_FullShadeKitchen) IR.HidePopup("ShadeKitchenH");
      if (!PopUp_FullShadeDining) IR.HidePopup("ShadeDiningH");

      if (!PopUp_FireplaceMain) IR.HidePopup("FireplaceH");
      if (!PopUp_FireplaceAsk) IR.HidePopup("FireplaceStartH");

      if (!PopUp_Camera) IR.HidePopup("CameraH");

      if (!PopUp_Scenario) IR.HidePopup("ScenariosH");
      if (!PopUp_ScenarioStart) IR.HidePopup("ScenarioStartH");
      if (!PopUp_ScenarioInProgress) IR.HidePopup("ScenarioInProgressH");

      if (!PopUp_Power) IR.HidePopup("PowerH");

      if (!PopUp_MediaSelect) IR.HidePopup("MediaSelectH");
      if (!PopUp_MediaMessage) IR.HidePopup("MediaMessageH");
      if (!PopUp_MediaOff) IR.HidePopup("MediaOffH");
      if (!PopUp_MediaWait) IR.HidePopup("MediaWaitH");
      if (!PopUp_MediaBR) IR.HidePopup("BluRayH");
      if (!PopUp_MediaXBMC) IR.HidePopup("XBMCNavH");
      if (!PopUp_MediaAppleTV) IR.HidePopup("AppleTVNavH");
      if (!PopUp_MediaSatellite) IR.HidePopup("SatelliteH");
      if (!PopUp_MediaRebootMsg) IR.HidePopup("MediaRebootMsgH");

      if (!PopUp_Volume) IR.HidePopup("VolumeH");

      if (!PopUp_LightsByRoom) IR.HidePopup("LightsByRoomH");
      if (!PopUp_ShadesByRoom) IR.HidePopup("ShadesByRoomH");

      if (!PopUp_GlobalWait) IR.HidePopup("GlobalWaitH");
   }
   else
   {
      //RoomList = RoomListV;
      if (!PopUp_LightInput) IR.HidePopup("LightInputV");
      if (!PopUp_LightLiving) IR.HidePopup("LightLivingV");
      if (!PopUp_LightCorridor) IR.HidePopup("LightCorridorV");
      if (!PopUp_LightKitchen) IR.HidePopup("LightKitchenV");
      if (!PopUp_LightDining) IR.HidePopup("LightDiningV");
      if (!PopUp_LightCabinet) IR.HidePopup("LightCabinetV");
      if (!PopUp_LightWC) IR.HidePopup("LightWCV");
      if (!PopUp_LightWashroom) IR.HidePopup("LightWashroomV");
      if (!PopUp_LightWardrobe) IR.HidePopup("LightWardrobeV");
      if (!PopUp_LightBedroom) IR.HidePopup("LightBedroomV");
      if (!PopUp_LightBath) IR.HidePopup("LightBathV");
          
      if (!PopUp_ShadeLiving) IR.HidePopup("ShadeSimpleLivingV");
      if (!PopUp_ShadeKitchen) IR.HidePopup("ShadeSimpleKitchenV");
      if (!PopUp_ShadeDining) IR.HidePopup("ShadeSimpleDiningV");
      if (!PopUp_ShadeCabinet) IR.HidePopup("ShadeCabinetV");
      if (!PopUp_ShadeBedroom) IR.HidePopup("ShadeBedroomV");
      if (!PopUp_FullShadeLiving) IR.HidePopup("ShadeLivingV");
      if (!PopUp_FullShadeKitchen) IR.HidePopup("ShadeKitchenV");
      if (!PopUp_FullShadeDining) IR.HidePopup("ShadeDiningV");

      if (!PopUp_FireplaceMain) IR.HidePopup("FireplaceV");
      if (!PopUp_FireplaceAsk) IR.HidePopup("FireplaceStartV");

      if (!PopUp_Camera) IR.HidePopup("CameraV");

      if (!PopUp_Scenario) IR.HidePopup("ScenariosV");
      if (!PopUp_ScenarioStart) IR.HidePopup("ScenarioStartV");
      if (!PopUp_ScenarioInProgress) IR.HidePopup("ScenarioInProgressV");

      if (!PopUp_Power) IR.HidePopup("PowerV");

      if (!PopUp_MediaSelect) IR.HidePopup("MediaSelectV");
      if (!PopUp_MediaMessage) IR.HidePopup("MediaMessageV");
      if (!PopUp_MediaOff) IR.HidePopup("MediaOffV");
      if (!PopUp_MediaWait) IR.HidePopup("MediaWaitV");
      if (!PopUp_MediaBR) IR.HidePopup("BluRayV");
      if (!PopUp_MediaXBMC) IR.HidePopup("XBMCNavV");
      if (!PopUp_MediaAppleTV) IR.HidePopup("AppleTVNavV");
      if (!PopUp_MediaSatellite) IR.HidePopup("SatelliteV");
      if (!PopUp_MediaRebootMsg) IR.HidePopup("MediaRebootMsgV");

      if (!PopUp_Volume) IR.HidePopup("VolumeV");

      if (!PopUp_LightsByRoom) IR.HidePopup("LightsByRoomV");
      if (!PopUp_ShadesByRoom) IR.HidePopup("ShadesByRoomV");

      if (!PopUp_GlobalWait) IR.HidePopup("GlobalWaitV");
   }
}

function HideAll()
{

   PopUp_LightInput     =  false;
   PopUp_LightLiving    =  false;
   PopUp_LightCorridor  =  false;
   PopUp_LightKitchen   =  false;
   PopUp_LightDining    =  false;
   PopUp_LightCabinet   =  false;
   PopUp_LightWC        =  false;
   PopUp_LightWashroom  =  false;
   PopUp_LightWardrobe  =  false;
   PopUp_LightBedroom   =  false;
   PopUp_LightBath      =  false;

   PopUp_ShadeLiving    =  false;
   PopUp_ShadeKitchen   =  false;
   PopUp_ShadeDining    =  false;
   PopUp_ShadeCabinet   =  false;
   PopUp_ShadeBedroom   =  false;
   PopUp_FullShadeLiving    =  false;
   PopUp_FullShadeKitchen   =  false;
   PopUp_FullShadeDining    =  false;

   PopUp_FireplaceMain  =  false;
   PopUp_FireplaceAsk   =  false;

   PopUp_Camera         =  false;

   PopUp_Scenario       =  false;
   PopUp_ScenarioStart  =  false;
   PopUp_ScenarioInProgress =  false;

   PopUp_Power          =  false;

   PopUp_MediaSelect    =  false;
   PopUp_MediaMessage   =  false;
   PopUp_MediaOff       =  false;
   PopUp_MediaWait      =  false;
   PopUp_MediaBR        =  false;
   PopUp_MediaXBMC      =  false;
   PopUp_MediaAppleTV   =  false;
   PopUp_MediaSatellite =  false;
   PopUp_MediaRebootMsg =  false;
   
//   PopUp_Volume         =  false;

   PopUp_LightsByRoom   =  false;
   PopUp_ShadesByRoom   =  false;

   HidePopup(0);   
   HidePopup(1);   

}

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("MainPageH"),function()
//Событие срабатывает при появлении страницы или попапа.
{
   g_iOrientation = 1;         
   ShowPopup(1);
});

IR.AddListener(IR.EVENT_ITEM_SHOW,IR.GetItem("MainPageV"),function()
//Событие срабатывает при появлении страницы или попапа.
{
   g_iOrientation = 0;         
   ShowPopup(0);
});

// ********************************************************************

function ShowLightInput()
{
   HideAll();
   PopUp_LightInput = true;
   ShowPopup(g_iOrientation);
}

function HideLightInput()
{
   PopUp_LightInput = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightLiving()
{
   HideAll();
   PopUp_LightLiving = true;
   ShowPopup(g_iOrientation);
}

function HideLightLiving()
{
   PopUp_LightLiving = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightCorridor()
{
   HideAll();
   PopUp_LightCorridor = true;
   ShowPopup(g_iOrientation);
}

function HideLightCorridor()
{
   PopUp_LightCorridor = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightKitchen()
{
   HideAll();
   PopUp_LightKitchen = true;
   ShowPopup(g_iOrientation);
}

function HideLightKitchen()
{
   PopUp_LightKitchen = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightDining()
{
   HideAll();
   PopUp_LightDining = true;
   ShowPopup(g_iOrientation);
}

function HideLightDining()
{
   PopUp_LightDining = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightCabinet()
{
   HideAll();
   PopUp_LightCabinet = true;
   ShowPopup(g_iOrientation);
}

function HideLightCabinet()
{
   PopUp_LightCabinet = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightWC()
{
   HideAll();
   PopUp_LightWC = true;
   ShowPopup(g_iOrientation);
}

function HideLightWC()
{
   PopUp_LightWC = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightWashroom()
{
   HideAll();
   PopUp_LightWashroom = true;
   ShowPopup(g_iOrientation);
}

function HideLightWashroom()
{
   PopUp_LightWashroom = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightWardrobe()
{
   HideAll();
   PopUp_LightWardrobe = true;
   ShowPopup(g_iOrientation);
}

function HideLightWardrobe()
{
   PopUp_LightWardrobe = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightBedroom()
{
   HideAll();
   PopUp_LightBedroom = true;
   ShowPopup(g_iOrientation);
}

function HideLightBedroom()
{
   PopUp_LightBedroom = false;
   HideAll();
   ShowPopup(g_iOrientation);
}



function ShowLightBath()
{
   HideAll();
   PopUp_LightBath = true;
   ShowPopup(g_iOrientation);
}

function HideLightBath()
{
   PopUp_LightBath = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

/// *************************************************************************

function ShowShadeLiving()
{
   HideAll();
   PopUp_ShadeLiving = true;
   ShowPopup(g_iOrientation);
}

function HideShadeLiving()
{
   PopUp_ShadeLiving = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowShadeKitchen()
{
   HideAll();
   PopUp_ShadeKitchen = true;
   ShowPopup(g_iOrientation);
}

function HideShadeKitchen()
{
   PopUp_ShadeKitchen = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowShadeDining()
{
   HideAll();
   PopUp_ShadeDining = true;
   ShowPopup(g_iOrientation);
}

function HideShadeDining()
{
   PopUp_ShadeDining = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowShadeCabinet()
{
   HideAll();
   PopUp_ShadeCabinet = true;
   ShowPopup(g_iOrientation);
}

function HideShadeCabinet()
{
   PopUp_ShadeCabinet = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowShadeBedroom()
{
   HideAll();
   PopUp_ShadeBedroom = true;
   ShowPopup(g_iOrientation);
}

function HideShadeBedroom()
{
   PopUp_ShadeBedroom = false;
   HideAll();
   ShowPopup(g_iOrientation);
}
//


function ShowFullShadeLiving()
{
   HideAll();
   PopUp_FullShadeLiving = true;
   ShowPopup(g_iOrientation);
}

function HideFullShadeLiving()
{
   PopUp_FullShadeLiving = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowFullShadeKitchen()
{
   HideAll();
   PopUp_FullShadeKitchen = true;
   ShowPopup(g_iOrientation);
}

function HideFullShadeKitchen()
{
   PopUp_FullShadeKitchen = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowFullShadeDining()
{
   HideAll();
   PopUp_FullShadeDining = true;
   ShowPopup(g_iOrientation);
}

function HideFullShadeDining()
{
   PopUp_FullShadeDining = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

/// **************************************************************************

function ShowFireplaceMain()
{
   HideAll();
   PopUp_FireplaceMain = true;
   ShowPopup(g_iOrientation);
}

function HideFireplaceMain()
{
   PopUp_FireplaceMain = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowFireplaceAsk()
{
   HideAll();
   PopUp_FireplaceAsk = true;
   ShowPopup(g_iOrientation);
}

function HideFireplaceAsk()
{
   PopUp_FireplaceAsk = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

/// **************************************************************************

function ShowCamera()
{
   HideAll();
   PopUp_Camera = true;
   ShowPopup(g_iOrientation);
}

function HideCamera()
{
   PopUp_Camera = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

/// **************************************************************************

function ShowScenario()
{
   HideAll();
   PopUp_Scenario = true;
   ShowPopup(g_iOrientation);
}

function HideScenario()
{
   PopUp_Scenario = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowScenarioStart()
{
   HideAll();
   PopUp_ScenarioStart = true;
   ShowPopup(g_iOrientation);
}

function HideScenarioStart()
{
   PopUp_ScenarioStart = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowScenarioInProgress()
{
   HideAll();
   PopUp_ScenarioInProgress = true;
   ShowPopup(g_iOrientation);
}

function HideScenarioInProgress()
{
   PopUp_ScenarioInProgress = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

/// **************************************************************************

function ShowPower()
{
   HideAll();
   PopUp_Power = true;
   ShowPopup(g_iOrientation);
}

function HidePower()
{
   PopUp_Power = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

/// **************************************************************************


function ShowMediaSelect()
{
   HideAll();
   PopUp_MediaSelect = true;
   ShowPopup(g_iOrientation);
}

function HideMediaSelect()
{
   PopUp_MediaSelect = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowMediaMessage()
{
   HideAll();
   PopUp_MediaMessage = true;
   ShowPopup(g_iOrientation);
}

function HideMediaMessage()
{
   PopUp_MediaMessage = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowMediaOff()
{
   HideAll();
   PopUp_MediaOff = true;
   ShowPopup(g_iOrientation);
}

function HideMediaOff()
{
   PopUp_MediaOff = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowMediaWait()
{
   HideAll();
   PopUp_MediaWait = true;
   ShowPopup(g_iOrientation);
}

function HideMediaWait()
{
   PopUp_MediaWait = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowMediaBR()
{
   HideAll();
   PopUp_MediaBR = true;
   ShowPopup(g_iOrientation);
}

function HideMediaBR()
{
   PopUp_MediaBR = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowMediaXBMC()
{
   HideAll();
   PopUp_MediaXBMC = true;
   ShowPopup(g_iOrientation);
}

function HideMediaXBMC()
{
   PopUp_MediaXBMC = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowMediaAppleTV()
{
   HideAll();
   PopUp_MediaAppleTV = true;
   ShowPopup(g_iOrientation);
}

function HideMediaAppleTV()
{
   PopUp_MediaAppleTV = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowMediaSatellite()
{
   HideAll();
   PopUp_MediaSatellite = true;
   ShowPopup(g_iOrientation);
}

function HideMediaSatellite()
{
   PopUp_MediaSatellite = false;
   HideAll();
   ShowPopup(g_iOrientation);
}


/// **************************************************************************

function ShowGlobalWait()
{
   HideAll();
   PopUp_GlobalWait = true;
   ShowPopup(g_iOrientation);
}

function HideGlobalWait()
{
   PopUp_GlobalWait = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

/// **************************************************************************

 
function ShowLightsByRoom()
{
   HideAll();
   PopUp_LightsByRoom = true;
   ShowPopup(g_iOrientation);
}

function HideLightsByRoom()
{
   PopUp_LightsByRoom = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

function ShowShadesByRoom()
{
   HideAll();
   PopUp_ShadesByRoom = true;
   ShowPopup(g_iOrientation);
}

function HideShadesByRoom()
{
   PopUp_ShadesByRoom = false;
   HideAll();
   ShowPopup(g_iOrientation);
}


// ***************************************************************************
function ShowMediaRebootMsg()
{
   HideAll();
   PopUp_MediaRebootMsg = true;
   ShowPopup(g_iOrientation);
}

function HideMediaRebootMsg()
{
   PopUp_MediaRebootMsg = false;
   HideAll();
   ShowPopup(g_iOrientation);
}

// ****************************************************************************
function TryShowVolume()
{
   if (g_iVolumeInterval)
   {
      IR.ClearInterval(g_iVolumeInterval);
   }

   g_iVolumeInterval = IR.SetTimeout(3000,VolumeTimeout);
   
   ShowVolume();
   
}

function VolumeTimeout()
{
   HideVolume();
}

function ShowVolume()
{
//   HideAll();
   PopUp_Volume = true;
   ShowPopup(g_iOrientation);
}

function HideVolume()
{
   PopUp_Volume = false;
//   HideAll();
   ShowPopup(g_iOrientation);
}

