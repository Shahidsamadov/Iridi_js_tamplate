/*var listSettings = {
      popup: "PopupHome",
      item: "list",
      template_grp: "TemplateGrp",
      template_swt: "TemplateSwt",
      template_btn: "TemplateBtn",
      template_swt_ext: "TemplateSwtExt",
      template_btn_ext: "TemplateBtnExt",
      canMove: true
   };
   var listStructure = {
      0: {text: "Группа", type: "grp"},
      1: {text: "Просто переключатель", type: "swt", cmdOn: pulse("[Light][Podval][Zal][Lustra]On"), cmdOff: pulse("[Light][Podval][Zal][Lustra]Off"), fb: "[Light][Podval][Zal][Lustra]IsOn"},
      2: {text: "Просто кнопка", type: "btn", cmd: pulse("[Light][Podval][Zal][Lustra]Toggle"), fb: "[Light][Podval][Zal][Lustra]IsOn"},
      3: {text: "Выключить всё", type: "swt_ext", cmdOn: pulse("PopupLight"), cmdOff: null, cmd_ext: function() {IR.Log("test_swt1")}, fb: "none1"},
      4: {text: "Люстра", type: "swt_ext", cmdOn: pulse("[Light][Podval][Zal][Lustra]On"), cmdOff: pulse("[Light][Podval][Zal][Lustra]Off"), cmd_ext: function() {IR.Log("test_swt2")}, fb: "[Light][Podval][Zal][Lustra]IsOn"},
      5: {text: "Кнопка_ext", type: "btn_ext", cmd: pulse("PopupLight"), cmd_ext: function() {IR.Log("test_btn1")}, fb: "[Light][Podval][Zal][Lustra]IsOn"},
      6: {text: "Кнопка2_ext", type: "btn_ext", cmd: pulse("PopupCamera"), cmd_ext: pulse("PopupSPA"), fb: "none"},
      
      ///for group
      7: {text: "Группа 2", type: "grp"},
      8: {text: "Просто переключатель", type: "swt", cmdOn: pulse("[Light][Podval][Zal][Lustra]On"), cmdOff: pulse("[Light][Podval][Zal][Lustra]Off"), fb: "[Light][Podval][Zal][Lustra]IsOn"},
      9: {text: "Просто кнопка", type: "btn", cmd: pulse("[Light][Podval][Zal][Lustra]Toggle"), fb: "[Light][Podval][Zal][Lustra]IsOn"},
      10: {text: "Выключить всё", type: "swt_ext", cmdOn: pulse("PopupLight"), cmdOff: null, cmd_ext: function() {IR.Log("test_swt1")}, fb: "none1"},
      11: {text: "Люстра", type: "swt_ext", cmdOn: pulse("[Light][Podval][Zal][Lustra]On"), cmdOff: pulse("[Light][Podval][Zal][Lustra]Off"), cmd_ext: function() {IR.Log("test_swt2")}, fb: "[Light][Podval][Zal][Lustra]IsOn"},
      12: {text: "Кнопка_ext", type: "btn_ext", cmd: pulse("PopupLight"), cmd_ext: function() {IR.Log("test_btn1")}, fb: "[Light][Podval][Zal][Lustra]IsOn"},
      13: {text: "Кнопка2_ext", type: "btn_ext", cmd: pulse("PopupCamera"), cmd_ext: pulse("PopupSPA"), fb: "none"}, 
      
      ///for group
      14: {text: "Группа 3", type: "grp"},
      15: {text: "Просто переключатель", type: "swt", cmdOn: pulse("[Light][Podval][Zal][Lustra]On"), cmdOff: pulse("[Light][Podval][Zal][Lustra]Off"), fb: "[Light][Podval][Zal][Lustra]IsOn"},
      16: {text: "Просто кнопка", type: "btn", cmd: pulse("[Light][Podval][Zal][Lustra]Toggle"), fb: "[Light][Podval][Zal][Lustra]IsOn"},
      17: {text: "Выключить всё", type: "swt_ext", cmdOn: pulse("PopupLight"), cmdOff: null, cmd_ext: function() {IR.Log("test_swt1")}, fb: "none1"},
      18: {text: "Люстра", type: "swt_ext", cmdOn: pulse("[Light][Podval][Zal][Lustra]On"), cmdOff: pulse("[Light][Podval][Zal][Lustra]Off"), cmd_ext: function() {IR.Log("test_swt2")}, fb: "[Light][Podval][Zal][Lustra]IsOn"},
      19: {text: "Кнопка_ext", type: "btn_ext", cmd: pulse("PopupLight"), cmd_ext: function() {IR.Log("test_btn1")}, fb: "[Light][Podval][Zal][Lustra]IsOn"},
      20: {text: "Кнопка2_ext", type: "btn_ext", cmd: pulse("PopupCamera"), cmd_ext: pulse("PopupSPA"), fb: "none"}       
   };
   var testList = new PList(ap2, listSettings, listStructure);
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup("PopupHome").GetItem("menu"), function() {
      testList.jump(6);
   });*/