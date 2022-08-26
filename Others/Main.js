IR.AddListener(IR.EVENT_START,0,function()
{                  
   
   
   var ap2 = new Crestron("Crestron");
   function pulse(channel) {
      var func = function() {
         ap2.pulse(channel);   
      }   
      return func;
   }
   var sm = new SM(ap2);
   var n1ptz_in = new AXIS("n1ptz_in", "root", "p555555", "192.168.1.108", "80", "inner");
   var n1ptz_out = new AXIS("n1ptz_out", "root", "p555555", "spb.sytes.net", "40004", "outer");
   
   //new ConnectionType(ap2.device, "HomeHP", "Main", "local", "global", "net");
   var CSSettings = {
      ssid: "HomeHP",
      funcLocal: function() {
         //bar 
         IR.GetPage("Main").GetItem("net").Text = IR.GetVariable("System.Net.SSID");
         IR.GetPage("Main").GetItem("global").Visible = false;  
         IR.GetPage("Main").GetItem("local").Visible = true;
         //crestron device
         IR.GetDevice("Crestron").SetParameters({Host: '192.168.1.73', Port: '41794', NetID: '8',  TelnetPort: '41795', TelnetLogin: '', TelnetPassword: '', TelnetSSL: 0});
         //camera N1 device
         //IR.GetDevice("CameraN1PTZ").SetParameters({Host: '192.168.1.108', Port: '80', SSL: false, SendMode: IR.ALWAYS_CONNECTED, ScriptMode: IR.DIRECT_AND_SCRIPT, SendCommandAttempts: 0, ConnectWaitTimeMax: 3000, ReceiveWaitTimeMax: 5000, Login: "root", Password: "p555555", DisableQueue: false});
         //cameras streams access
         IR.GetPopup("PopupAccessMainGate").GetItem("cam").GetState(0).Image = "Наружняя север1 PTZ";
         IR.GetPopup("PopupAccessGarageGate1").GetItem("cam").GetState(0).Image = "Внутренняя гараж въезд";
         IR.GetPopup("PopupAccessKalitka").GetItem("cam").GetState(0).Image = "Наружняя север1 PTZ";
         IR.GetPopup("PopupAccessInputLock").GetItem("cam").GetState(0).Image = "Внутренняя Входная дверь";
         //cameras streams light
         IR.GetPopup("PopupLightGarage").GetItem("cam1").GetState(0).Image = "Внутренняя гараж въезд";
         IR.GetPopup("PopupLightGarage").GetItem("cam2").GetState(0).Image = "Внутренняя выход из гаража";
         IR.GetPopup("PopupLightFl1Dinner").GetItem("camview").GetState(0).Image = "Внутренняя столовая";
         IR.GetPopup("PopupLightFl1Kitchen").GetItem("camview").GetState(0).Image = "Внутренняя кухня";
         IR.GetPopup("PopupLightFl1Hall").GetItem("cam1").GetState(0).Image = "Внутренняя холл 1 этаж";
         IR.GetPopup("PopupLightFl1Hall").GetItem("cam2").GetState(0).Image = "Внутренняя Входная дверь";
         IR.GetPopup("PopupLightFl1Living").GetItem("camview").GetState(0).Image = "Внутренняя гостиная";
         //cameras streams camera
         IR.GetPopup("PopupCameraInsideLiving").GetItem("cam").GetState(0).Image = "Внутренняя гостиная";
         IR.GetPopup("PopupCameraInsideKitchen").GetItem("cam").GetState(0).Image = "Внутренняя кухня";
         IR.GetPopup("PopupCameraInsideHall").GetItem("cam").GetState(0).Image = "Внутренняя холл 1 этаж";
         IR.GetPopup("PopupCameraInsideGarage").GetItem("cam").GetState(0).Image = "Внутренняя гараж въезд";
         IR.GetPopup("PopupCameraInsideExit").GetItem("cam").GetState(0).Image = "Внутренняя выход из гаража";
         IR.GetPopup("PopupCameraInsideDinning").GetItem("cam").GetState(0).Image = "Внутренняя столовая";
         IR.GetPopup("PopupCameraOutsideNE").GetItem("cam").GetState(0).Image = "Наружняя северовосток";
         IR.GetPopup("PopupCameraOutsideS1").GetItem("cam").GetState(0).Image = "Наружняя юг1";
         IR.GetPopup("PopupCameraOutsideW1").GetItem("cam").GetState(0).Image = "Наружняя запад1";
         IR.GetPopup("PopupCameraOutsideS2").GetItem("cam").GetState(0).Image = "Наружняя юг2";
         IR.GetPopup("PopupCameraOutsideN2").GetItem("cam").GetState(0).Image = "Наружняя север2";
         IR.GetPopup("PopupCameraOutsideS2PTZ").GetItem("cam").GetState(0).Image = "Наружняя юг2 PTZ";
         IR.GetPopup("PopupCameraOutsideS1PTZ").GetItem("cam").GetState(0).Image = "Наружняя юг1 PTZ";
         IR.GetPopup("PopupCameraOutsideN1").GetItem("cam").GetState(0).Image = "Наружняя север1";
         IR.GetPopup("PopupCameraOutsideN1PTZ").GetItem("cam").GetState(0).Image = "Наружняя север1 PTZ";
         IR.GetPopup("PopupCameraOutsideBack").GetItem("cam").GetState(0).Image = "Наружняя задний двор";
         IR.GetPopup("PopupCameraOutsideGarage").GetItem("cam").GetState(0).Image = "Наружняя гараж въезд";
         IR.GetPopup("PopupCameraOutsideStreetB").GetItem("cam").GetState(0).Image = "Наружняя улица норильская начало";
         IR.GetPopup("PopupCameraOutsideStreetE").GetItem("cam").GetState(0).Image = "Наружняя улица норильская конец";
         
      },
      funcGlobal: function() {
         //bar 
         IR.GetPage("Main").GetItem("net").Text = "Внешний доступ";
         IR.GetPage("Main").GetItem("global").Visible = true;  
         IR.GetPage("Main").GetItem("local").Visible = false;
         //crestron device
         IR.GetDevice("Crestron").SetParameters({Host: 'spb.sytes.net', Port: '40776', NetID: '8',  TelnetPort: '40777', TelnetLogin: '', TelnetPassword: '', TelnetSSL: 0});
         //IR.GetDevice("Crestron").SetParameters({Host: '192.168.11.6', Port: '41794', NetID: '8',  TelnetPort: '41795', TelnetLogin: '', TelnetPassword: '', TelnetSSL: 0});
         //camera N1 device
         //IR.GetDevice("CameraN1PTZ").SetParameters({Host: 'spb.sytes.net', Port: '40004', SSL: false, SendMode: IR.ALWAYS_CONNECTED, ScriptMode: IR.DIRECT_AND_SCRIPT, SendCommandAttempts: 0, ConnectWaitTimeMax: 3000, ReceiveWaitTimeMax: 5000, Login: "root", Password: "p555555", DisableQueue: false});
         //cameras streams access
         IR.GetPopup("PopupAccessMainGate").GetItem("cam").GetState(0).Image = "Наружняя север1 PTZ В";
         IR.GetPopup("PopupAccessGarageGate1").GetItem("cam").GetState(0).Image = "Внутренняя гараж въезд В";
         IR.GetPopup("PopupAccessKalitka").GetItem("cam").GetState(0).Image = "Наружняя север1 PTZ В";
         IR.GetPopup("PopupAccessInputLock").GetItem("cam").GetState(0).Image = "Внутренняя Входная дверь В";
         //cameras streams light
         IR.GetPopup("PopupLightGarage").GetItem("cam1").GetState(0).Image = "Внутренняя гараж въезд В";
         IR.GetPopup("PopupLightGarage").GetItem("cam2").GetState(0).Image = "Внутренняя выход из гаража В";
         IR.GetPopup("PopupLightFl1Dinner").GetItem("camview").GetState(0).Image = "Внутренняя столовая В";
         IR.GetPopup("PopupLightFl1Kitchen").GetItem("camview").GetState(0).Image = "Внутренняя кухня В";   
         IR.GetPopup("PopupLightFl1Hall").GetItem("cam1").GetState(0).Image = "Внутренняя холл 1 этаж В";
         IR.GetPopup("PopupLightFl1Hall").GetItem("cam2").GetState(0).Image = "Внутренняя Входная дверь В";
         IR.GetPopup("PopupLightFl1Living").GetItem("camview").GetState(0).Image = "Внутренняя гостиная В";
         //cameras streams camera
         IR.GetPopup("PopupCameraInsideLiving").GetItem("cam").GetState(0).Image = "Внутренняя гостиная В";
         IR.GetPopup("PopupCameraInsideKitchen").GetItem("cam").GetState(0).Image = "Внутренняя кухня В";
         IR.GetPopup("PopupCameraInsideHall").GetItem("cam").GetState(0).Image = "Внутренняя холл 1 этаж В";
         IR.GetPopup("PopupCameraInsideGarage").GetItem("cam").GetState(0).Image = "Внутренняя гараж въезд В";
         IR.GetPopup("PopupCameraInsideExit").GetItem("cam").GetState(0).Image = "Внутренняя выход из гаража В";
         IR.GetPopup("PopupCameraInsideDinning").GetItem("cam").GetState(0).Image = "Внутренняя столовая В";
         IR.GetPopup("PopupCameraOutsideNE").GetItem("cam").GetState(0).Image = "Наружняя северовосток В";
         IR.GetPopup("PopupCameraOutsideS1").GetItem("cam").GetState(0).Image = "Наружняя юг1 В";
         IR.GetPopup("PopupCameraOutsideW1").GetItem("cam").GetState(0).Image = "Наружняя запад1 В";
         IR.GetPopup("PopupCameraOutsideS2").GetItem("cam").GetState(0).Image = "Наружняя юг2 В";
         IR.GetPopup("PopupCameraOutsideN2").GetItem("cam").GetState(0).Image = "Наружняя север2 В";
         IR.GetPopup("PopupCameraOutsideS2PTZ").GetItem("cam").GetState(0).Image = "Наружняя юг2 PTZ В";
         IR.GetPopup("PopupCameraOutsideS1PTZ").GetItem("cam").GetState(0).Image = "Наружняя юг1 PTZ В";
         IR.GetPopup("PopupCameraOutsideN1").GetItem("cam").GetState(0).Image = "Наружняя север1 В";
         IR.GetPopup("PopupCameraOutsideN1PTZ").GetItem("cam").GetState(0).Image = "Наружняя север1 PTZ В";
         IR.GetPopup("PopupCameraOutsideBack").GetItem("cam").GetState(0).Image = "Наружняя задний двор В";
         IR.GetPopup("PopupCameraOutsideGarage").GetItem("cam").GetState(0).Image = "Наружняя гараж въезд В";
         IR.GetPopup("PopupCameraOutsideStreetB").GetItem("cam").GetState(0).Image = "Наружняя улица норильская начало В";
         IR.GetPopup("PopupCameraOutsideStreetE").GetItem("cam").GetState(0).Image = "Наружняя улица норильская конец В";
      }
   }
   var CS = new ConnectionSwitch(CSSettings);
   var csStartType = IR.GetVariable("Global.connectionType");
   if (csStartType == 0) {
      CS.setTypeAuto();
   } else if (csStartType == 1) {
      CS.setTypeOut();
   } else if (csStartType == 2) {
      CS.setTypeIn();   
   }
   
   sm.rotate(false);
   sm.addPage("Main");
   sm.addPopup("PopupHome");
   sm.addPopup("PopupLight");
   sm.addPopup("PopupLightFloor0");
   sm.addPopup("PopupLightFloor1");
   sm.addPopup("PopupLightFloor2");
   sm.addPopup("PopupLightFloor3");
   sm.addPopup("PopupLightStreet");
   sm.addPopup("PopupLightGarage");
   sm.addPopup("PopupLightPodvalZal");
   sm.addPopup("PopupLightPodvalCinema");
   sm.addPopup("PopupLightPodvalBath");
   sm.addPopup("PopupLightFl1Veranda");
   sm.addPopup("PopupLightFl1Dinner");
   sm.addPopup("PopupLightFl1Cabinet");
   sm.addPopup("PopupLightFl1Kitchen");
   sm.addPopup("PopupLightFl1Hall");
   sm.addPopup("PopupLightFl1Living");
   sm.addPopup("PopupLightFl2ChildJ");
   sm.addPopup("PopupLightFl2ChildM");
   sm.addPopup("PopupLightFl2BedZ");
   sm.addPopup("PopupLightFl2BedB");
   sm.addPopup("PopupLightFl3Lib");
   sm.addPopup("PopupLightFl3BedN");
   sm.addPopup("PopupLightFl3BedS");
   sm.addPopup("PopupSPA");
   sm.addPopup("PopupAccess");
   sm.addPopup("PopupCamera");
   sm.addPopup("PopupAccessMainGate");
   sm.addPopup("PopupAccessGarageGate1");
   sm.addPopup("PopupAccessKalitka");
   sm.addPopup("PopupAccessInputLock");
   sm.addPopup("PopupCameraInside");
   sm.addPopup("PopupCameraOutside");
   sm.addPopup("PopupCameraInsideLiving");
   sm.addPopup("PopupCameraInsideKitchen");
   sm.addPopup("PopupCameraInsideHall");
   sm.addPopup("PopupCameraInsideGarage");
   sm.addPopup("PopupCameraInsideExit");
   sm.addPopup("PopupCameraInsideDinning");
   sm.addPopup("PopupCameraOutsideNE");
   sm.addPopup("PopupCameraOutsideS1");
   sm.addPopup("PopupCameraOutsideW1");
   sm.addPopup("PopupCameraOutsideS2");
   sm.addPopup("PopupCameraOutsideN2");
   sm.addPopup("PopupCameraOutsideS2PTZ");
   sm.addPopup("PopupCameraOutsideS1PTZ");
   sm.addPopup("PopupCameraOutsideN1");
   sm.addPopup("PopupCameraOutsideN1PTZ");
   sm.addPopup("PopupCameraOutsideBack");
   sm.addPopup("PopupCameraOutsideGarage");
   sm.addPopup("PopupCameraOutsideStreetB");
   sm.addPopup("PopupCameraOutsideStreetE");
   sm.addPopup("PopupSync");
   sm.addPopup("PopupNotificationInfo");
   sm.addPopup("PopupNotificationControl");
   sm.addPopup("PopupNotificationCount");
   
   new WaitConnection(ap2, ap2.getConnectionStatus(), sm, "PopupWait");
   
   new SyncRotate(ap2, "PopupSync", "sync_rotate");
   
   if (sm.showSet)
      IR.ShowPopup("Set");
   else IR.HidePopup("Set");
   IR.ShowPopup("MenuButton");
   
   ///LIGHT list HOME
   var listHomeSettings = {
      popup: "PopupHome",
      item: "list",
      x: 0,
      y: 196,
      width: 1080,
      height: 1393,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwt",
      template_btn: "TemplateBtn",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExt"
   };
   var listHomeStructure = {
      0: {text: "Выключить свет", type: "swt", cmdOn: pulse("[Light]Off"), cmdOff: pulse(""), fb: ""},
      1: {text: "Свет гараж", type: "swt", cmdOn: pulse("PopupLightGarage"), cmdOff: pulse(""), fb: ""},
      2: {text: "Свет улица", type: "swt", cmdOn: pulse("PopupLightStreet"), cmdOff: pulse(""), fb: ""},
      3: {text: "Главные ворота", type: "swt", cmdOn: pulse("PopupAccessMainGate"), cmdOff: pulse(""), fb: ""},
      4: {text: "Калитка", type: "swt", cmdOn: pulse("PopupAccessKalitka"), cmdOff: pulse(""), fb: ""},
      5: {text: "Входная дверь", type: "swt", cmdOn: pulse("PopupAccessInputLock"), cmdOff: pulse(""), fb: ""},
      //6: {text: "Камера въезд", type: "swt", cmdOn: function() {ap2.pulse("PopupCamera");ap2.pulse("PopupCameraOutsideGarage");}, cmdOff: pulse(""), fb: ""}
      6: {text: "Камера въезд", type: "swt", cmdOn: pulse("PopupCameraOutsideGarage"), cmdOff: pulse(""), fb: ""}
   };
   var listHome = new PList2(ap2, listHomeSettings, listHomeStructure);
   
   ///LIGHT list floor0
   var listLightFloor0Settings = {
      popup: "PopupLightFloor0",
      item: "list",
      x: 0,
      y: 0,
      width: 1080,
      height: 1262,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwtL",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   };   
   var listLightFloor0Structure = {
      0: {text: "Подвал", type: "swt", cmdOn: pulse("[Light][Podval]On"), cmdOff: pulse("[Light][Podval]Off"), fb: "[Light][Podval]IsOn"},
      1: {text: "Зал", type: "btn_ext", cmd: pulse("[Light][Podval][Zal]Toggle"), cmd_ext: pulse("PopupLightPodvalZal"), fb: "[Light][Podval][Zal]IsOn"},
      2: {text: "Вход в подвал", type: "btn", cmd: pulse("[Light][Podval][Enter][Main]Toggle"), fb: "[Light][Podval][Enter][Main]IsOn"},
      3: {text: "Тех помещение", type: "btn", cmd: pulse("[Light][Podval][Tech][Main]Toggle"), fb: "[Light][Podval][Tech][Main]IsOn"},
      4: {text: "Прачечная", type: "btn", cmd: pulse("[Light][Podval][Wash][Main]Toggle"), fb: "[Light][Podval][Wash][Main]IsOn"},
      5: {text: "Кинотеатр", type: "btn_ext", cmd: pulse("[Light][Podval][Cinema]Toggle"), cmd_ext: pulse("PopupLightPodvalCinema"), fb: "[Light][Podval][Cinema]IsOn"},
      6: {text: "Сейф", type: "btn", cmd: pulse("[Light][Podval][Safe][Main]Toggle"), fb: "[Light][Podval][Safe][Main]IsOn"},
      7: {text: "Холл подвала", type: "btn", cmd: pulse("[Light][Podval][Hall][Main]Toggle"), fb: "[Light][Podval][Hall][Main]IsOn"},
      8: {text: "Баня", type: "btn_ext", cmd: pulse("[Light][Podval][Bath]Toggle"), cmd_ext: pulse("PopupLightPodvalBath"), fb: "[Light][Podval][Bath]IsOn"},
      9: {text: "Кладовка под лестницей", type: "btn", cmd: pulse("[Light][Podval][Storage][Main]Toggle"), fb: "[Light][Podval][Storage][Main]IsOn"}
   };
   var listLightFloor0 = new PList2(ap2, listLightFloor0Settings, listLightFloor0Structure);
   ///
   ///LIGHT list floor1
   var listLightFloor1Settings = {
      popup: "PopupLightFloor1",
      item: "list",
      x: 0,
      y: 0,
      width: 1080,
      height: 1262,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwtL",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   };   
   var listLightFloor1Structure = {
      0: {text: "1 этаж", type: "swt", cmdOn: pulse("[Light][fl1]On"), cmdOff: pulse("[Light][fl1]Off"), fb: "[Light][fl1]IsOn"},
      9: {text: "Веранда", type: "btn_ext", cmd: pulse("[Light][fl1][Veranda]Toggle"), cmd_ext: pulse("PopupLightFl1Veranda"), fb: "[Light][fl1][Veranda]IsOn"},  
      3: {text: "Столовая", type: "btn_ext", cmd: pulse("[Light][fl1][Dinner]Toggle"), cmd_ext: pulse("PopupLightFl1Dinner"), fb: "[Light][fl1][Dinner]IsOn"},
      6: {text: "Кабинет", type: "btn_ext", cmd: pulse("[Light][fl1][Cabinet]Toggle"), cmd_ext: pulse("PopupLightFl1Cabinet"), fb: "[Light][fl1][Cabinet]IsOn"},
      2: {text: "Кухня", type: "btn_ext", cmd: pulse("[Light][fl1][Kitchen]Toggle"), cmd_ext: pulse("PopupLightFl1Kitchen"), fb: "[Light][fl1][Kitchen]IsOn"},
      1: {text: "Холл 1 этаж", type: "btn_ext", cmd: pulse("[Light][fl1][Hall]Toggle"), cmd_ext: pulse("PopupLightFl1Hall"), fb: "[Light][fl1][Hall]IsOn"},
      4: {text: "Гостиная", type: "btn_ext", cmd: pulse("[Light][fl1][Living]Toggle"), cmd_ext: pulse("PopupLightFl1Living"), fb: "[Light][fl1][Living]IsOn"},
      5: {text: "Туалет", type: "btn", cmd: pulse("[Light][fl1][WC][Main]Toggle"), fb: "[Light][fl1][WC][Main]IsOn"},
      8: {text: "Лестница 0-1", type: "btn", cmd: pulse("[Light][fl1][Stair01][Main]Toggle"), fb: "[Light][fl1][Stair01][Main]IsOn"},
      7: {text: "Гардероб", type: "btn", cmd: pulse("[Light][fl1][Ward][Main]Toggle"), fb: "[Light][fl1][Ward][Main]IsOn"}
   };
   var listLightFloor1 = new PList2(ap2, listLightFloor1Settings, listLightFloor1Structure);
   ///  
   ///LIGHT list floor2
   var listLightFloor2Settings = {
      popup: "PopupLightFloor2",
      item: "list",
      x: 0,
      y: 0,
      width: 1080,
      height: 1262,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwtL",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   };   
   var listLightFloor2Structure = {
      0: {text: "2 этаж", type: "swt", cmdOn: pulse("[Light][fl2]On"), cmdOff: pulse("[Light][fl2]Off"), fb: "[Light][fl2]IsOn"},
      2: {text: "Детская Жанна", type: "btn_ext", cmd: pulse("[Light][fl2][ChildJ]Toggle"), cmd_ext: pulse("PopupLightFl2ChildJ"), fb: "[Light][fl2][ChildJ]IsOn"},
      3: {text: "Детская Максим", type: "btn_ext", cmd: pulse("[Light][fl2][ChildM]Toggle"), cmd_ext: pulse("PopupLightFl2ChildM"), fb: "[Light][fl2][ChildM]IsOn"},
      5: {text: "Ванная Детская", type: "btn", cmd: pulse("[Light][fl2][BathC][Main]Toggle"), fb: "[Light][fl2][BathC][Main]IsOn"},
      8: {text: "Коридор Детский", type: "btn", cmd: pulse("[Light][fl2][KoridorC][Main]Toggle"), fb: "[Light][fl2][KoridorC][Main]IsOn"},  
      4: {text: "Спальня Женя", type: "btn_ext", cmd: pulse("[Light][fl2][BedZ]Toggle"), cmd_ext: pulse("PopupLightFl2BedZ"), fb: "[Light][fl2][BedZ]IsOn"},
      1: {text: "Спальня Большая", type: "btn_ext", cmd: pulse("[Light][fl2][BedB]Toggle"), cmd_ext: pulse("PopupLightFl2BedB"), fb: "[Light][fl2][BedB]IsOn"},
      9: {text: "Коридор спальни", type: "btn", cmd: pulse("[Light][fl2][KoridorB][Main]Toggle"), fb: "[Light][fl2][KoridorB][Main]IsOn"},
      7: {text: "Холл 2 этаж", type: "btn", cmd: pulse("[Light][fl2][Hall][Main]Toggle"), fb: "[Light][fl2][Hall][Main]IsOn"},
      6: {text: "Лестница 1-2", type: "btn", cmd: pulse("[Light][fl2][Stair12][Main]Toggle"), fb: "[Light][fl2][Stair12][Main]IsOn"}
   };
   var listLightFloor2 = new PList2(ap2, listLightFloor2Settings, listLightFloor2Structure);
   ///
   ///LIGHT list floor3
   var listLightFloor3Settings = {
      popup: "PopupLightFloor3",
      item: "list",
      x: 0,
      y: 0,
      width: 1080,
      height: 1262,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwtL",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   };   
   var listLightFloor3Structure = {
      0: {text: "3 этаж", type: "swt", cmdOn: pulse("[Light][fl3]On"), cmdOff: pulse("[Light][fl3]Off"), fb: "[Light][fl3]IsOn"},
      1: {text: "Холл 3 этаж", type: "btn", cmd: pulse("[Light][fl3][Hall][Main]Toggle"), fb: "[Light][fl3][Hall][Main]IsOn"},
      2: {text: "Лестница 2-3", type: "btn", cmd: pulse("[Light][fl3][Stair23][Main]Toggle"), fb: "[Light][fl3][Stair23][Main]IsOn"},
      3: {text: "Игровая", type: "btn", cmd: pulse("[Light][fl3][Game][Main]Toggle"), fb: "[Light][fl3][Game][Main]IsOn"},
      4: {text: "Библиотека", type: "btn_ext", cmd: pulse("[Light][fl3][Lib]Toggle"), cmd_ext: pulse("PopupLightFl3Lib"), fb: "[Light][fl3][Lib]IsOn"},
      5: {text: "Ванная", type: "btn", cmd: pulse("[Light][fl3][Bath][Main]Toggle"), fb: "[Light][fl3][Bath][Main]IsOn"},
      6: {text: "Спальня Север", type: "btn_ext", cmd: pulse("[Light][fl3][BedN]Toggle"), cmd_ext: pulse("PopupLightFl3BedN"), fb: "[Light][fl3][BedN]IsOn"},
      7: {text: "Спальня Детская", type: "btn", cmd: pulse("[Light][fl3][BedC][Main]Toggle"), fb: "[Light][fl3][BedC][Main]IsOn"}, 
      8: {text: "Спальня Юг", type: "btn_ext", cmd: pulse("[Light][fl3][BedS]Toggle"), cmd_ext: pulse("PopupLightFl3BedS"), fb: "[Light][fl3][BedS]IsOn"},
      9: {text: "Кладовая", type: "btn", cmd: pulse("[Light][fl3][Storage][Main]Toggle"), fb: "[Light][fl3][Storage][Main]IsOn"},
      10: {text: "Чердак", type: "btn", cmd: pulse("[Light][Cherdak][Main]Toggle"), fb: "[Light][Cherdak][Main]IsOn"}
   };
   var listLightFloor3 = new PList2(ap2, listLightFloor3Settings, listLightFloor3Structure);
   /// 
   ///LIGHT list street
   var listLightStreetSettings = {
      popup: "PopupLightStreet",
      item: "list",
      x: 0,
      y: 0,
      width: 1080,
      height: 995,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwtL",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   };   
   var listLightStreetStructure = {
      0: {text: "Улица", type: "swt", cmdOn: pulse("[Light][Street]On"), cmdOff: pulse("[Light][Street]Off"), fb: "[Light][Street]IsOn"},
      1: {text: "Фонари вход", type: "btn", cmd: pulse("[Light][Street][Fonari][Enter]Toggle"), fb: "[Light][Street][Fonari][Enter]IsOn"},
      2: {text: "Фонари дорожки", type: "btn", cmd: pulse("[Light][Street][Fonari][Roads]Toggle"), fb: "[Light][Street][Fonari][Roads]IsOn"},
      3: {text: "Фонари гараж", type: "btn", cmd: pulse("[Light][Street][Fonari][Garage]Toggle"), fb: "[Light][Street][Fonari][Garage]IsOn"},
      4: {text: "Беседка", type: "btn", cmd: pulse("[Light][Street][Besedka][Main]Toggle"), fb: "[Light][Street][Besedka][Main]IsOn"}
   };
   var listLightStreet = new PList2(ap2, listLightStreetSettings, listLightStreetStructure);
   ///
   ///LIGHT list garage
   var listLightGarageSettings = {
      popup: "PopupLightGarage",
      item: "list",
      x: 0,
      y: 0,
      width: 1080,
      height: 995,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwtL",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   };   
   var listLightGarageStructure = {
      0: {text: "Гараж", type: "swt", cmdOn: pulse("[Light][Garage]On"), cmdOff: pulse("[Light][Garage]Off"), fb: "[Light][Garage]IsOn"},
      1: {text: "Чердак", type: "btn", cmd: pulse("[Light][Garage][Garage][Cherdak]Toggle"), fb: "[Light][Garage][Garage][Cherdak]IsOn"},
      2: {text: "Туалет", type: "btn", cmd: pulse("[Light][Garage][Garage][WC]Toggle"), fb: "[Light][Garage][Garage][WC]IsOn"},
      3: {text: "Основной", type: "btn", cmd: pulse("[Light][Garage][Garage][Main]Toggle"), fb: "[Light][Garage][Garage][Main]IsOn"},
      4: {text: "Котельная", type: "btn", cmd: pulse("[Light][Garage][Boiler][Main]Toggle"), fb: "[Light][Garage][Boiler][Main]IsOn"}
   };
   var listLightGarage = new PList2(ap2, listLightGarageSettings, listLightGarageStructure);
   ///
   ///LIGHT list garage
   var listLightGarageCamSettings = {
      popup: "PopupLightGarage",
      item: "listCam",
      x: 0,
      y: 0,
      width: 1080,
      height: 470,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwtL",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   };
   var listLightGarageCam = new PList2(ap2, listLightGarageCamSettings, listLightGarageStructure);
   ///
   ///LIGHT list podval zal
   var podvalZalLustraButtonSettings = {
      popup: "PopupLightPodvalZal",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][Podval][Zal][Lustra]IsOn"
   }
   var podvalZalLustraButton = new Button(ap2, podvalZalLustraButtonSettings);
   podvalZalLustraButton.setFunc(pulse("[Light][Podval][Zal][Lustra]Toggle"));
   podvalZalLustraButton.setListeners();
   var podvalZalSpotsButtonSettings = {
      popup: "PopupLightPodvalZal",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][Podval][Zal][Spots]IsOn"
   }
   var podvalZalSpotsButton = new Button(ap2, podvalZalSpotsButtonSettings);
   podvalZalSpotsButton.setFunc(pulse("[Light][Podval][Zal][Spots]Toggle"));
   podvalZalSpotsButton.setListeners();
   ///
   ///LIGHT list podval cinema
   var podvalCinemaBraButtonSettings = {
      popup: "PopupLightPodvalCinema",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][Podval][Cinema][Bra]IsOn"
   }
   var podvalCinemaBraButton = new Button(ap2, podvalCinemaBraButtonSettings);
   podvalCinemaBraButton.setFunc(pulse("[Light][Podval][Cinema][Bra]Toggle"));
   podvalCinemaBraButton.setListeners();
   var podvalCinemaBarButtonSettings = {
      popup: "PopupLightPodvalCinema",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][Podval][Cinema][Bar]IsOn"
   }
   var podvalCinemaBarButton = new Button(ap2, podvalCinemaBarButtonSettings);
   podvalCinemaBarButton.setFunc(pulse("[Light][Podval][Cinema][Bar]Toggle"));
   podvalCinemaBarButton.setListeners();
   var podvalCinemaPodsvetkaBarButtonSettings = {
      popup: "PopupLightPodvalCinema",
      bg: "btnBG 2",
      indicator: "btnLED 2",
      signalFb: "[Light][Podval][Cinema][PodsvetkaBar]IsOn"
   }
   var podvalCinemaPodsvetkaBarButton = new Button(ap2, podvalCinemaPodsvetkaBarButtonSettings);
   podvalCinemaPodsvetkaBarButton.setFunc(pulse("[Light][Podval][Cinema][PodsvetkaBar]Toggle"));
   podvalCinemaPodsvetkaBarButton.setListeners();
   /// 
   ///LIGHT list podval bath
   var listLightPodvalBathSettings = {
      popup: "PopupLightPodvalBath",
      item: "list",
      x: 0,
      y: 199,
      width: 1080,
      height: 1195,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwt",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   }
   var listLightPodvalBathStructure = {
      0: {text: "Прихожая", type: "btn", cmd: pulse("[Light][Podval][Bath][Enter]Toggle"), fb: "[Light][Podval][Bath][Enter]IsOn"},
      1: {text: "Джакузи", type: "btn", cmd: pulse("[Light][Podval][Bath][Jakuzzi]Toggle"), fb: "[Light][Podval][Bath][Jakuzzi]IsOn"},
      2: {text: "Бра", type: "btn", cmd: pulse("[Light][Podval][Bath][Bra]Toggle"), fb: "[Light][Podval][Bath][Bra]IsOn"},
      3: {text: "Душ", type: "btn", cmd: pulse("[Light][Podval][Bath][Wash]Toggle"), fb: "[Light][Podval][Bath][Wash]IsOn"},
      4: {text: "Сауна", type: "btn", cmd: pulse("[Light][Podval][Bath][Sauna]Toggle"), fb: "[Light][Podval][Bath][Sauna]IsOn"},
      5: {text: "Туалет", type: "btn", cmd: pulse("[Light][Podval][Bath][WC]Toggle"), fb: "[Light][Podval][Bath][WC]IsOn"},
      6: {text: "Бра в туалете", type: "btn", cmd: pulse("[Light][Podval][Bath][BraWC]Toggle"), fb: "[Light][Podval][Bath][BraWC]IsOn"},
      7: {text: "Хамам", type: "btn", cmd: pulse("[Light][Podval][Bath][Hamam]Toggle"), fb: "[Light][Podval][Bath][Hamam]IsOn"}
   }
   var listLightPodvalBath = new PList2(ap2, listLightPodvalBathSettings, listLightPodvalBathStructure);
   //
   ///LIGHT list fl1 veranda
   var fl1VerandaMainButtonSettings = {
      popup: "PopupLightFl1Veranda",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl1][Veranda][Main]IsOn"
   }
   var fl1VerandaMainButton = new Button(ap2, fl1VerandaMainButtonSettings);
   fl1VerandaMainButton.setFunc(pulse("[Light][fl1][Veranda][Main]Toggle"));
   fl1VerandaMainButton.setListeners();
   var fl1VerandaBraButtonSettings = {
      popup: "PopupLightFl1Veranda",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl1][Veranda][Bra]IsOn"
   }
   var fl1VerandaBraButton = new Button(ap2, fl1VerandaBraButtonSettings);
   fl1VerandaBraButton.setFunc(pulse("[Light][fl1][Veranda][Bra]Toggle"));
   fl1VerandaBraButton.setListeners();
   ///
   ///LIGHT list fl1 dinner
   var fl1DinnerLustraButtonSettings = {
      popup: "PopupLightFl1Dinner",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl1][Dinner][Lustra]IsOn"
   }
   var fl1DinnerLustraButton = new Button(ap2, fl1DinnerLustraButtonSettings);
   fl1DinnerLustraButton.setFunc(pulse("[Light][fl1][Dinner][Lustra]Toggle"));
   fl1DinnerLustraButton.setListeners();
   var fl1DinnerBufetButtonSettings = {
      popup: "PopupLightFl1Dinner",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl1][Dinner][Bufet]IsOn"
   }
   var fl1DinnerBufetButton = new Button(ap2, fl1DinnerBufetButtonSettings);
   fl1DinnerBufetButton.setFunc(pulse("[Light][fl1][Dinner][Bufet]Toggle"));
   fl1DinnerBufetButton.setListeners();
   ///
   ///LIGHT list fl1 cabinet
   var fl1CabinetLustraButtonSettings = {
      popup: "PopupLightFl1Cabinet",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl1][Cabinet][Lustra]IsOn"
   }
   var fl1CabinetLustraButton = new Button(ap2, fl1CabinetLustraButtonSettings);
   fl1CabinetLustraButton.setFunc(pulse("[Light][fl1][Cabinet][Lustra]Toggle"));
   fl1CabinetLustraButton.setListeners();
   var fl1CabinetPolkiButtonSettings = {
      popup: "PopupLightFl1Cabinet",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl1][Cabinet][Polki]IsOn"
   }
   var fl1CabinetPolkiButton = new Button(ap2, fl1CabinetPolkiButtonSettings);
   fl1CabinetPolkiButton.setFunc(pulse("[Light][fl1][Cabinet][Polki]Toggle"));
   fl1CabinetPolkiButton.setListeners();
   ///
   ///LIGHT list fl1 kitchen
   var fl1KitchenMainButtonSettings = {
      popup: "PopupLightFl1Kitchen",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl1][Kitchen][Main]IsOn"
   }
   var fl1KitchenMainButton = new Button(ap2, fl1KitchenMainButtonSettings);
   fl1KitchenMainButton.setFunc(pulse("[Light][fl1][Kitchen][Main]Toggle"));
   fl1KitchenMainButton.setListeners();
   var fl1KitchenPodsobkaButtonSettings = {
      popup: "PopupLightFl1Kitchen",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl1][Kitchen][Podsobka]IsOn"
   }
   var fl1KitchenPodsobkaButton = new Button(ap2, fl1KitchenPodsobkaButtonSettings);
   fl1KitchenPodsobkaButton.setFunc(pulse("[Light][fl1][Kitchen][Podsobka]Toggle"));
   fl1KitchenPodsobkaButton.setListeners();
   ///
   ///LIGHT list fl1 hall
   var listLightFl1HallSettings = {
      popup: "PopupLightFl1Hall",
      item: "list",
      x: 0,
      y: 199,
      width: 1080,
      height: 597,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwt",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   }
   var listLightFl1HallStructure = {
      0: {text: "Холл", type: "btn", cmd: pulse("[Light][fl1][Hall][Enter]Toggle"), fb: "[Light][fl1][Hall][Enter]IsOn"},
      1: {text: "Лестница", type: "btn", cmd: pulse("[Light][fl1][Hall][Stair]Toggle"), fb: "[Light][fl1][Hall][Stair]IsOn"},
      2: {text: "Тамбур", type: "btn", cmd: pulse("[Light][fl1][Tambur][Main]Toggle"), fb: "[Light][fl1][Tambur][Main]IsOn"}
   }
   var listLightFl1Hall = new PList2(ap2, listLightFl1HallSettings, listLightFl1HallStructure);
   ///
   ///LIGHT list fl1 living
   var fl1LivingLustriButtonSettings = {
      popup: "PopupLightFl1Living",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl1][Living][Lustri]IsOn"
   }
   var fl1LivingLustriButton = new Button(ap2, fl1LivingLustriButtonSettings);
   fl1LivingLustriButton.setFunc(pulse("[Light][fl1][Living][Lustri]Toggle"));
   fl1LivingLustriButton.setListeners();
   var fl1LivingVitriniButtonSettings = {
      popup: "PopupLightFl1Living",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl1][Living][Vitrini]IsOn"
   }
   var fl1LivingVitriniButton = new Button(ap2, fl1LivingVitriniButtonSettings);
   fl1LivingVitriniButton.setFunc(pulse("[Light][fl1][Living][Vitrini]Toggle"));
   fl1LivingVitriniButton.setListeners();
   ///
   ///LIGHT list fl2 childJ
   var fl2ChildJLustraButtonSettings = {
      popup: "PopupLightFl2ChildJ",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl2][ChildJ][Lustra]IsOn"
   }
   var fl2ChildJLustraButton = new Button(ap2, fl2ChildJLustraButtonSettings);
   fl2ChildJLustraButton.setFunc(pulse("[Light][fl2][ChildJ][Lustra]Toggle"));
   fl2ChildJLustraButton.setListeners();
   var fl2ChildJSpotsButtonSettings = {
      popup: "PopupLightFl2ChildJ",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl2][ChildJ][Spots]IsOn"
   }
   var fl2ChildJSpotsButton = new Button(ap2, fl2ChildJSpotsButtonSettings);
   fl2ChildJSpotsButton.setFunc(pulse("[Light][fl2][ChildJ][Spots]Toggle"));
   fl2ChildJSpotsButton.setListeners();
   var fl2ChildJBraButtonSettings = {
      popup: "PopupLightFl2ChildJ",
      bg: "btnBG 2",
      indicator: "btnLED 2",
      signalFb: "[Light][fl2][ChildJ][Bra]IsOn"
   }
   var fl2ChildJBraButton = new Button(ap2, fl2ChildJBraButtonSettings);
   fl2ChildJBraButton.setFunc(pulse("[Light][fl2][ChildJ][Bra]Toggle"));
   fl2ChildJBraButton.setListeners();
   ///
   ///LIGHT list fl2 ChildM
   var fl2ChildMLustraButtonSettings = {
      popup: "PopupLightFl2ChildM",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl2][ChildM][Lustra]IsOn"
   }
   var fl2ChildMLustraButton = new Button(ap2, fl2ChildMLustraButtonSettings);
   fl2ChildMLustraButton.setFunc(pulse("[Light][fl2][ChildM][Lustra]Toggle"));
   fl2ChildMLustraButton.setListeners();
   var fl2ChildMSpotsButtonSettings = {
      popup: "PopupLightFl2ChildM",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl2][ChildM][Spots]IsOn"
   }
   var fl2ChildMSpotsButton = new Button(ap2, fl2ChildMSpotsButtonSettings);
   fl2ChildMSpotsButton.setFunc(pulse("[Light][fl2][ChildM][Spots]Toggle"));
   fl2ChildMSpotsButton.setListeners();
   var fl2ChildMBraButtonSettings = {
      popup: "PopupLightFl2ChildM",
      bg: "btnBG 2",
      indicator: "btnLED 2",
      signalFb: "[Light][fl2][ChildM][Bra]IsOn"
   }
   var fl2ChildMBraButton = new Button(ap2, fl2ChildMBraButtonSettings);
   fl2ChildMBraButton.setFunc(pulse("[Light][fl2][ChildM][Bra]Toggle"));
   fl2ChildMBraButton.setListeners();
   /// 
   ///LIGHT list fl2 bedZ
   var fl2BedZLustraButtonSettings = {
      popup: "PopupLightFl2BedZ",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl2][BedZ][Lustra]IsOn"
   }
   var fl2BedZLustraButton = new Button(ap2, fl2BedZLustraButtonSettings);
   fl2BedZLustraButton.setFunc(pulse("[Light][fl2][BedZ][Lustra]Toggle"));
   fl2BedZLustraButton.setListeners();
   var fl2BedZBra1ButtonSettings = {
      popup: "PopupLightFl2BedZ",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl2][BedZ][Bra1]IsOn"
   }
   var fl2BedZBra1Button = new Button(ap2, fl2BedZBra1ButtonSettings);
   fl2BedZBra1Button.setFunc(pulse("[Light][fl2][BedZ][Bra1]Toggle"));
   fl2BedZBra1Button.setListeners();
   var fl2BedZBra2ButtonSettings = {
      popup: "PopupLightFl2BedZ",
      bg: "btnBG 2",
      indicator: "btnLED 2",
      signalFb: "[Light][fl2][BedZ][Bra2]IsOn"
   }
   var fl2BedZBra2Button = new Button(ap2, fl2BedZBra2ButtonSettings);
   fl2BedZBra2Button.setFunc(pulse("[Light][fl2][BedZ][Bra2]Toggle"));
   fl2BedZBra2Button.setListeners();
   ///
   ///LIGHT list fl2 bedB
   var listLightFl2BedBSettings = {
      popup: "PopupLightFl2BedB",
      item: "list",
      x: 0,
      y: 199,
      width: 1080,
      height: 1195,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwt",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   }
   var listLightFl2BedBStructure = {
      0: {text: "Люстра", type: "btn", cmd: pulse("[Light][fl2][BedB][Lustra]Toggle"), fb: "[Light][fl2][BedB][Lustra]IsOn"},
      1: {text: "Бра 1", type: "btn", cmd: pulse("[Light][fl2][BedB][Bra1]Toggle"), fb: "[Light][fl2][BedB][Bra1]IsOn"},
      2: {text: "Бра 2", type: "btn", cmd: pulse("[Light][fl2][BedB][Bra2]Toggle"), fb: "[Light][fl2][BedB][Bra2]IsOn"},
      3: {text: "Гардероб", type: "btn", cmd: pulse("[Light][fl2][BedB][Ward]Toggle"), fb: "[Light][fl2][BedB][Ward]IsOn"},
      4: {text: "Санузел", type: "btn", cmd: pulse("[Light][fl2][BedB][WC]Toggle"), fb: "[Light][fl2][BedB][WC]IsOn"},
      5: {text: "Душ", type: "btn", cmd: pulse("[Light][fl2][BedB][Wash]Toggle"), fb: "[Light][fl2][BedB][Wash]IsOn"},
      6: {text: "Бра санузел", type: "btn", cmd: pulse("[Light][fl2][BedB][BraWC]Toggle"), fb: "[Light][fl2][BedB][BraWC]IsOn"}
   }
   var listLightFl2BedB = new PList2(ap2, listLightFl2BedBSettings, listLightFl2BedBStructure);
   // 
   ///LIGHT list fl3 lib
   var fl3LibMainButtonSettings = {
      popup: "PopupLightFl3Lib",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl3][Lib][Main]IsOn"
   }
   var fl3LibMainButton = new Button(ap2, fl3LibMainButtonSettings);
   fl3LibMainButton.setFunc(pulse("[Light][fl3][Lib][Main]Toggle"));
   fl3LibMainButton.setListeners();
   var fl3LibBra1ButtonSettings = {
      popup: "PopupLightFl3Lib",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl3][Lib][Bra1]IsOn"
   }
   var fl3LibBra1Button = new Button(ap2, fl3LibBra1ButtonSettings);
   fl3LibBra1Button.setFunc(pulse("[Light][fl3][Lib][Bra1]Toggle"));
   fl3LibBra1Button.setListeners();
   var fl3LibBra2ButtonSettings = {
      popup: "PopupLightFl3Lib",
      bg: "btnBG 2",
      indicator: "btnLED 2",
      signalFb: "[Light][fl3][Lib][Bra2]IsOn"
   }
   var fl3LibBra2Button = new Button(ap2, fl3LibBra2ButtonSettings);
   fl3LibBra2Button.setFunc(pulse("[Light][fl3][Lib][Bra2]Toggle"));
   fl3LibBra2Button.setListeners();
   ///
   ///LIGHT list fl3 bedN
   var fl3BedNMainButtonSettings = {
      popup: "PopupLightFl3BedN",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl3][BedN][Main]IsOn"
   }
   var fl3BedNMainButton = new Button(ap2, fl3BedNMainButtonSettings);
   fl3BedNMainButton.setFunc(pulse("[Light][fl3][BedN][Main]Toggle"));
   fl3BedNMainButton.setListeners();
   var fl3BedNBra1ButtonSettings = {
      popup: "PopupLightFl3BedN",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl3][BedN][Bra1]IsOn"
   }
   var fl3BedNBra1Button = new Button(ap2, fl3BedNBra1ButtonSettings);
   fl3BedNBra1Button.setFunc(pulse("[Light][fl3][BedN][Bra1]Toggle"));
   fl3BedNBra1Button.setListeners();
   var fl3BedNBra2ButtonSettings = {
      popup: "PopupLightFl3BedN",
      bg: "btnBG 2",
      indicator: "btnLED 2",
      signalFb: "[Light][fl3][BedN][Bra2]IsOn"
   }
   var fl3BedNBra2Button = new Button(ap2, fl3BedNBra2ButtonSettings);
   fl3BedNBra2Button.setFunc(pulse("[Light][fl3][BedN][Bra2]Toggle"));
   fl3BedNBra2Button.setListeners();
   ///
   ///LIGHT list fl3 bedS
   var fl3BedSMainButtonSettings = {
      popup: "PopupLightFl3BedS",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "[Light][fl3][BedS][Main]IsOn"
   }
   var fl3BedSMainButton = new Button(ap2, fl3BedSMainButtonSettings);
   fl3BedSMainButton.setFunc(pulse("[Light][fl3][BedS][Main]Toggle"));
   fl3BedSMainButton.setListeners();
   var fl3BedSBra1ButtonSettings = {
      popup: "PopupLightFl3BedS",
      bg: "btnBG 1",
      indicator: "btnLED 1",
      signalFb: "[Light][fl3][BedS][Bra1]IsOn"
   }
   var fl3BedSBra1Button = new Button(ap2, fl3BedSBra1ButtonSettings);
   fl3BedSBra1Button.setFunc(pulse("[Light][fl3][BedS][Bra1]Toggle"));
   fl3BedSBra1Button.setListeners();
   var fl3BedSBra2ButtonSettings = {
      popup: "PopupLightFl3BedS",
      bg: "btnBG 2",
      indicator: "btnLED 2",
      signalFb: "[Light][fl3][BedS][Bra2]IsOn"
   }
   var fl3BedSBra2Button = new Button(ap2, fl3BedSBra2ButtonSettings);
   fl3BedSBra2Button.setFunc(pulse("[Light][fl3][BedS][Bra2]Toggle"));
   fl3BedSBra2Button.setListeners();
   ///
   
   ///INDICATORS
   //var settings_LightPodvalIndicator = {popup: "PopupLight", indicator: "light_podval", signalFb: "[Light][Podval]IsOn"};new Indicator(ap2, settings_LightPodvalIndicator);
   //var settings_LightFl1Indicator = {popup: "PopupLight", indicator: "light_fl1", signalFb: "[Light][fl1]IsOn"};new Indicator(ap2, settings_LightFl1Indicator);
   //var settings_LightFl2Indicator = {popup: "PopupLight", indicator: "light_fl2", signalFb: "[Light][fl2]IsOn"};new Indicator(ap2, settings_LightFl2Indicator);
   //var settings_LightFl3Indicator = {popup: "PopupLight", indicator: "light_fl3", signalFb: "[Light][fl3]IsOn"};new Indicator(ap2, settings_LightFl3Indicator);
   //var settings_LightStreetIndicator = {popup: "PopupLight", indicator: "light_street", signalFb: "[Light][Street]IsOn"};new Indicator(ap2, settings_LightStreetIndicator);
  // var settings_LightGarageIndicator = {popup: "PopupLight", indicator: "light_garage", signalFb: "[Light][Garage]IsOn"};new Indicator(ap2, settings_LightGarageIndicator);

   IR.GetPopup("PopupLightGarage").GetItem("list").Visible = true;
   IR.GetPopup("PopupLightGarage").GetItem("listCam").Visible = false;
   //GARAGE CAM
   IR.AddListener(IR.EVENT_TAG_CHANGE, ap2.device, function(name, value) {
      if (name == "[UI][IPH1][Light][Cam][Garage]Visible") {
         if (value == 1) {
            IR.GetPopup("PopupLightGarage").GetItem("list").Visible = false;
            IR.GetPopup("PopupLightGarage").GetItem("listCam").Visible = true;
            //IR.Log("visible: true");
         } else if (value == 0 && ap2.getValue("[UI][IPH1][Light][Cam][Exit]Visible") == 0) {
            IR.GetPopup("PopupLightGarage").GetItem("list").Visible = true;
            IR.GetPopup("PopupLightGarage").GetItem("listCam").Visible = false;
            //IR.Log("visible: false");
         }
      }
   });
   //EXIT CAM
   IR.AddListener(IR.EVENT_TAG_CHANGE, ap2.device, function(name, value) {
      if (name == "[UI][IPH1][Light][Cam][Exit]Visible") {
         if (value == 1) {
            IR.GetPopup("PopupLightGarage").GetItem("list").Visible = false;
            IR.GetPopup("PopupLightGarage").GetItem("listCam").Visible = true;
            //IR.Log("visible: true");
         } else if (value == 0 && ap2.getValue("[UI][IPH1][Light][Cam][Garage]Visible") == 0) {
            IR.GetPopup("PopupLightGarage").GetItem("list").Visible = true;
            IR.GetPopup("PopupLightGarage").GetItem("listCam").Visible = false;
            //IR.Log("visible: false");
         }
      }
   });
   
   //SPA
   var hamamSWTSettings = {
      popup: "PopupSPA",
      popupItem: null,
      bg: "itemBG",
      indicator: "itemLED",
      slider: "itemSLIDER",
      xy: "itemXY",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: "[SPA][Hamam]IsOn"
   } 
   var hamamSWT = new Switch(ap2, hamamSWTSettings);
   hamamSWT.setFunc(pulse("[SPA][Hamam]Off"), pulse("[SPA][Hamam]On"));
   hamamSWT.setListeners();
   
   var saunaSWTSettings = {
      popup: "PopupSPA",
      popupItem: null,
      bg: "itemBG 1",
      indicator: "itemLED 1",
      slider: "itemSLIDER 1",
      xy: "itemXY 1",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: "[SPA][Sauna]IsOn"
   }
   var saunaSWT = new Switch(ap2, saunaSWTSettings);
   saunaSWT.setFunc(pulse("[SPA][Sauna]Toggle"), pulse("[SPA][Sauna]Toggle"));
   saunaSWT.setListeners();
   saunaSWT.setTimeout(3000);
   
   new SaunaVoltage(ap2, "[SPA][Sauna]Status");
   
   //ACCESS
   var listAccessSettings = {
      popup: "PopupAccess",
      item: "list",
      x: 0,
      y: 196,
      width: 1080,
      height: 1194,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwt",
      template_btn: "TemplateBtnA",
      template_swt_ext: "TemplateSwtExtA",
      template_btn_ext: "TemplateBtnExt"
   }
   var listAccessStructure = {
      0: {text: "Главные ворота", type: "btn", cmd: function() {ap2.pulse("PopupAccessMainGate");
      if (!CS.type) {//local
         n1ptz_in.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Gate");
      } else {       //global
         n1ptz_out.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Gate");
      }
      }, fb: "[Access][MainGate]IsOpen"},
      1: {text: "Ворота гаража", type: "btn", cmd: pulse("PopupAccessGarageGate1"), fb: "[Access][GarageGate]IsOpen"},
      
      2: {text: "Калитка", type: "btn", cmd: function() {ap2.pulse("PopupAccessKalitka");
      if (!CS.type) {//local
         n1ptz_in.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Kalitka");
      } else {       //global
         n1ptz_out.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Kalitka");
      }      
      }, fb: "[Access][Kalitka]DoorIsOpen"},
      
      3: {text: "Замок калитки", type: "btn", cmd: function() {ap2.pulse("PopupAccessKalitka");
      if (!CS.type) {//local
         n1ptz_in.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Kalitka");
      } else {       //global
         n1ptz_out.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Kalitka");
      }      
      }, fb: "[Access][Kalitka]IsOpen"},
      
      4: {text: "Входная дверь", type: "btn", cmd: pulse("PopupAccessInputLock"), fb: "[Access][InputLock]DoorIsOpen"},
      5: {text: "Замок вх. двери", type: "btn", cmd: pulse("PopupAccessInputLock"), fb: "[Access][InputLock]IsOpen"}
   }
   //var listAccess = new PList2(ap2, listAccessSettings, listAccessStructure);
   
   ///
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup("PopupAccess").GetItem("ka1"), function() {
      if (!CS.type) {//local
         n1ptz_in.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Kalitka");
      } else {       //global
         n1ptz_out.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Kalitka");
      }  
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup("PopupAccess").GetItem("ka2"), function() {
      if (!CS.type) {//local
         n1ptz_in.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Kalitka");
      } else {       //global
         n1ptz_out.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Kalitka");
      }  
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup("PopupAccess").GetItem("ma"), function() {
      if (!CS.type) {//local
         n1ptz_in.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Gate");
      } else {       //global
         n1ptz_out.sendCMD("/axis-cgi/com/ptz.cgi?gotoserverpresetname=Gate");
      }
   });
   ///
   
   var accessMainGateSwitchsettings = {
      popup: "PopupAccessMainGate",
      bg: "itemBG",
      indicator: "itemLED",
      slider: "itemSLIDER",
      xy: "itemXY",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: ""
   }
   var accessMainGateSwitch = new Switch(ap2, accessMainGateSwitchsettings);
   accessMainGateSwitch.setFunc(function() {ap2.pulse("");}, function() {ap2.pulse("[Access][MainGate]Toggle");});
   accessMainGateSwitch.setListeners();
   
   ///
   var accessGarageGate1Switchsettings = {
      popup: "PopupAccessGarageGate1",
      bg: "itemBG",
      indicator: "itemLED",
      slider: "itemSLIDER",
      xy: "itemXY",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: ""
   }
   var accessGarageGate1Switch = new Switch(ap2, accessGarageGate1Switchsettings);
   accessGarageGate1Switch.setFunc(function() {ap2.pulse("");}, function() {ap2.pulse("[Access][GarageGate1]Toggle");});
   accessGarageGate1Switch.setListeners();
   ///
   var accessGarageGate2Switchsettings = {
      popup: "PopupAccessGarageGate1",
      bg: "itemBG 1",
      indicator: "itemLED 1",
      slider: "itemSLIDER 1",
      xy: "itemXY 1",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: ""
   }
   var accessGarageGate2Switch = new Switch(ap2, accessGarageGate2Switchsettings);
   accessGarageGate2Switch.setFunc(function() {ap2.pulse("");}, function() {ap2.pulse("[Access][GarageGate2]Toggle");});
   accessGarageGate2Switch.setListeners();
   ///
   var accessGarageGate3Switchsettings = {
      popup: "PopupAccessGarageGate1",
      bg: "itemBG 2",
      indicator: "itemLED 2",
      slider: "itemSLIDER 2",
      xy: "itemXY 2",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: ""
   }
   var accessGarageGate3Switch = new Switch(ap2, accessGarageGate3Switchsettings);
   accessGarageGate3Switch.setFunc(function() {ap2.pulse("");}, function() {ap2.pulse("[Access][MainGate]Toggle");});
   accessGarageGate3Switch.setListeners();
   /// 
   
   var accessKalitkaSwitchsettings = {
      popup: "PopupAccessKalitka",
      bg: "itemBG",
      indicator: "itemLED",
      slider: "itemSLIDER",
      xy: "itemXY",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: ""
   }
   var accessKalitkaSwitch = new Switch(ap2, accessKalitkaSwitchsettings);
   accessKalitkaSwitch.setFunc(function() {ap2.pulse("");}, function() {ap2.pulse("[Access][Kalitka]Open");});
   accessKalitkaSwitch.setListeners();
   ///
   var accessInputLockSwitchsettings = {
      popup: "PopupAccessInputLock",
      bg: "itemBG",
      indicator: "itemLED",
      slider: "itemSLIDER",
      xy: "itemXY",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: ""
   }
   var accessInputLockSwitch = new Switch(ap2, accessInputLockSwitchsettings);
   accessInputLockSwitch.setFunc(function() {ap2.pulse("");}, function() {ap2.pulse("[Access][InputLock]Toggle");});
   accessInputLockSwitch.setListeners();
   
   ///CAMERA
   var listCameraInsideSettings = {
      popup: "PopupCameraInside",
      item: "list",
      x: 0,
      y: 0,
      width: 1080,
      height: 1194,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwt",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   }
   var listCameraInsideStructure = {
      0: {text: "Гостиная", type: "btn", cmd: pulse("PopupCameraInsideLiving"), fb: ""},
      1: {text: "Кухня", type: "btn", cmd: pulse("PopupCameraInsideKitchen"), fb: ""},
      2: {text: "Холл 1 этаж", type: "btn", cmd: pulse("PopupCameraInsideHall"), fb: ""},
      3: {text: "Гараж въезд", type: "btn", cmd: pulse("PopupCameraInsideGarage"), fb: ""},
      4: {text: "Выход", type: "btn", cmd: pulse("PopupCameraInsideExit"), fb: ""},
      5: {text: "Столовая", type: "btn", cmd: pulse("PopupCameraInsideDinning"), fb: ""}
   }
   var listCameraInside = new PList2(ap2, listCameraInsideSettings, listCameraInsideStructure);
   ///
   var listCameraOutsideSettings = {
      popup: "PopupCameraOutside",
      item: "list",
      x: 0,
      y: 0,
      width: 1080,
      height: 1262,
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwt",
      template_btn: "TemplateBtnL",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExtL"
   }
   var listCameraOutsideStructure = {
      0: {text: "Северовосток", type: "btn", cmd: pulse("PopupCameraOutsideNE"), fb: ""},
      1: {text: "Юг 1", type: "btn", cmd: pulse("PopupCameraOutsideS1"), fb: ""},
      2: {text: "Запад 1", type: "btn", cmd: pulse("PopupCameraOutsideW1"), fb: ""},
      3: {text: "Юг 2", type: "btn", cmd: pulse("PopupCameraOutsideS2"), fb: ""},
      4: {text: "Север 2", type: "btn", cmd: pulse("PopupCameraOutsideN2"), fb: ""},
      5: {text: "Юг 2 PTZ", type: "btn", cmd: pulse("PopupCameraOutsideS2PTZ"), fb: ""},
      6: {text: "Юг 1 PTZ", type: "btn", cmd: pulse("PopupCameraOutsideS1PTZ"), fb: ""},
      7: {text: "Север 1", type: "btn", cmd: pulse("PopupCameraOutsideN1"), fb: ""},
      8: {text: "Север 1 PTZ", type: "btn", cmd: pulse("PopupCameraOutsideN1PTZ"), fb: ""},
      9: {text: "Задний двор", type: "btn", cmd: pulse("PopupCameraOutsideBack"), fb: ""},
      10: {text: "Гараж въезд", type: "btn", cmd: pulse("PopupCameraOutsideGarage"), fb: ""},
      11: {text: "Норильская начало", type: "btn", cmd: pulse("PopupCameraOutsideStreetB"), fb: ""},
      12: {text: "Норильская конец", type: "btn", cmd: pulse("PopupCameraOutsideStreetE"), fb: ""}
   }
   var listCameraOutside = new PList2(ap2, listCameraOutsideSettings, listCameraOutsideStructure);
   
   /////MD5
   /*var office = new AXIS("root", "Shalash331", "192.168.10.133", "80");
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPage("Main").GetItem("time"), function() {
      IR.Log("Press");
      office.sendCMD("/axis-cgi/param.cgi?action=list&group=Properties.PTZ.PTZ");
   });*/   
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup("MenuButton").GetItem("menu"), function() {
      sm.showSet = !sm.showSet;
      sm.draw();
      IR.GetDevice("Crestron").Connect();
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup("Set").GetItem("tAuto"), function() {
      //IR.Log("auto");
      IR.SetVariable("Global.connectionType", 0);
      IR.SetVariable("Global.connectionTypeAuto", 1);
      IR.SetVariable("Global.connectionTypeOut", 0);
      IR.SetVariable("Global.connectionTypeIn", 0);
      CS.setTypeAuto();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup("Set").GetItem("tOut"), function() {
      //IR.Log("tout");
      IR.SetVariable("Global.connectionType", 1);
      IR.SetVariable("Global.connectionTypeAuto", 0);
      IR.SetVariable("Global.connectionTypeOut", 1);
      IR.SetVariable("Global.connectionTypeIn", 0);
      CS.setTypeOut();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup("Set").GetItem("tIn"), function() {
      //IR.Log("tin");
      IR.SetVariable("Global.connectionType", 2);
      IR.SetVariable("Global.connectionTypeAuto", 0);
      IR.SetVariable("Global.connectionTypeOut", 0);
      IR.SetVariable("Global.connectionTypeIn", 1);
      CS.setTypeIn();
   });
   
});