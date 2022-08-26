// пользовательский слайдер для уровня
function iTunes_UserSlider(Level, Slider){   

   // получение изначальной позицию X слайдера
   var firstSliderX = Slider.X;   
   
   // Функция вычисления позиции слайдера относительно уровня
   function Move(){
      Slider.X = firstSliderX + Level.Value * (Level.Width) / 100;
   }                
   IR.SetInterval(0, Move)
};
iTunes_UserSlider(IR.GetItem("XBMC_Audio").GetItem("TimeLine"), IR.GetItem("XBMC_Audio").GetItem("slider_timeLine"));
iTunes_UserSlider(IR.GetItem("XBMC_Video").GetItem("TimeLine"), IR.GetItem("XBMC_Video").GetItem("slider_timeLine"));
iTunes_UserSlider(IR.GetItem("XBMC_TVShows").GetItem("TimeLine"), IR.GetItem("XBMC_TVShows").GetItem("slider_timeLine"));