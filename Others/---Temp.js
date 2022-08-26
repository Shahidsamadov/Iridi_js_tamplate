   /*** BUTTON
   var settings_btn = {
      popup: "Test",
      bg: "btnBG",
      indicator: "btnLED",
      signalFb: "Button_fb"
   }
   var btn = new Button(ap2, settings_btn);
   btn.setFunc(function() {ap2.pulse("Button_action");});
   */
   
   /*** SWITCH
   var settings = {
      popup: "Test",
      bg: "itemBG",
      indicator: "itemLED",
      slider: "itemSLIDER",
      xy: "itemXY",
      sliderYOffset: 2,
      sliderXOffsetOff: 38,
      sliderXOffsetOn: 182,
      signalFb: "Slider_fb"
   }
   var slider = new Switch(ap2, settings);
   slider.setFunc(function() {ap2.pulse("Slider_Reset");}, function() {ap2.pulse("Slider_Set");});
   */