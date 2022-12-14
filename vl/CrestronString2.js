var CrestronString2 = function(device, channel, popup, itemName) {
   var that = this;
   this.popup = popup;
   this.item = itemName;
   var fromArray = new Array("&#1040;", "&#1041;", "&#1042;", "&#1043;", "&#1044;", "&#1045;", "&#x0401;", "&#1046;", "&#1047;", "&#1048;", "&#1049;", "&#1050;", "&#1051;", "&#1052;", "&#1053;", "&#1054;", "&#1055;", "&#1056;", "&#1057;", "&#1058;", "&#1059;", "&#1060;", "&#1061;", "&#1062;", "&#1063;", "&#1064;", "&#1065;", "&#1066;", "&#1067;", "&#1068;", "&#1069;", "&#1070;", "&#1071;", "&#1072;",  "&#1073;", "&#1074;", "&#1075;", "&#1076;", "&#1077;", "&#x0451;", "&#1078;", "&#1079;", "&#1080;", "&#1081;", "&#1082;", "&#1083;", "&#1084;", "&#1085;", "&#1086;", "&#1087;", "&#1088;", "&#1089;", "&#1090;", "&#1091;", "&#1092;", "&#1093;", "&#1094;", "&#1095;", "&#1096;", "&#1097;", "&#1098;", "&#1099;", "&#1100;", "&#1101;", "&#1102;", "&#1103;", "&#039;");
   var toArray = new Array("А",       "Б",       "В",       "Г",       "Д",       "Е",       "Ё",        "Ж",       "З",       "И",       "Й",       "К",       "Л",       "М",      "Н",        "О",       "П",       "Р",       "С",       "Т",       "У",       "Ф",       "Х",       "Ц",       "Ч",       "Ш",       "Щ",       "Ъ",       "Ы",       "Ь",       "Э",       "Ю",       "Я",       "а",        "б",       "в",       "г",       "д",       "е",       "ё",        "ж",       "з",       "и",       "й",       "к",       "л",       "м",       "н",       "о",       "п",       "р",       "с",       "т",       "у",       "ф",       "х",       "ц",       "ч",       "ш",       "щ",       "ъ",       "ы",       "ь",      "э",        "ю",       "я", "'");
   IR.AddListener(IR.EVENT_TAG_CHANGE, device, function(name, value) {
      if (name == channel) {
         var result = value;
         for (var i=0; i<fromArray.length; i++) {
            result = result.replace(new RegExp(fromArray[i], 'g'), toArray[i]);        
         }
         IR.GetPopup(that.popup).GetItem(that.item).Text = result;
      }
   });
}