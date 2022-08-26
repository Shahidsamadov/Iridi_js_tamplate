var CrestronString = function(device, channel, popup, itemName) {
   var that = this;
   this.popup = popup;
   this.item = itemName;
   var fromArray = new Array("&#x410;", "&#x411;", "&#x412;", "&#x413;", "&#x414;", "&#x415;", "&#x0401;", "&#x416;", "&#x417;", "&#x418;", "&#x419;", "&#x41A;", "&#x41B;", "&#x41C;", "&#x41D;", "&#x41E;", "&#x41F;", "&#x420;", "&#x421;", "&#x422;", "&#x423;", "&#x424;", "&#x425;", "&#x426;", "&#x427;", "&#x428;", "&#x429;", "&#x42A;", "&#x42B;", "&#x42C;", "&#x42D;", "&#x42E;", "&#x42F;", "&#x430;",  "&#x431;", "&#x432;", "&#x433;", "&#x434;", "&#x435;", "&#x451;", "&#x436;", "&#x437;", "&#x438;", "&#x439;", "&#x43A;", "&#x43B;", "&#x43C;", "&#x43D;", "&#x43E;", "&#x43F;", "&#x440;", "&#x441;", "&#x442;", "&#x443;", "&#x444;", "&#x445;", "&#x446;", "&#x447;", "&#x448;", "&#x449;", "&#x44A;", "&#x44B;", "&#x44C;", "&#x44D;", "&#x44E;", "&#x44F;", "&#039;");
   var toArray = new Array(   "А",       "Б",       "В",       "Г",       "Д",       "Е",       "Ё",        "Ж",       "З",       "И",       "Й",       "К",       "Л",       "М",      "Н",        "О",       "П",       "Р",       "С",       "Т",       "У",       "Ф",       "Х",       "Ц",       "Ч",       "Ш",       "Щ",       "Ъ",       "Ы",       "Ь",       "Э",       "Ю",       "Я",       "а",        "б",       "в",       "г",       "д",       "е",       "ё",        "ж",       "з",       "и",       "й",       "к",       "л",       "м",       "н",       "о",       "п",       "р",       "с",       "т",       "у",       "ф",       "х",       "ц",       "ч",       "ш",       "щ",       "ъ",       "ы",       "ь",      "э",        "ю",       "я", "'");
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