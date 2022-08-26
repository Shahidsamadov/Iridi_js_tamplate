var Fade = IR.CreateEffect(IR.EFFECT_FADE); // создаем группу, сохраняем в переменную
       Fade.Group = 1000; // присваиваем номер группы
       Fade.Delay = 0; // задержка выполнения эффектов
       Fade.Duration = 400; // продолжительность эффекта
       Fade.Tween = 0; // формула вычисления эффекта (твинер)

var SlideLeft = IR.CreateEffect(IR.EFFECT_SLIDE ); // создаем группу, сохраняем в переменную
       SlideLeft.Group = 2000; // присваиваем номер группы
       SlideLeft.Delay = 0; // задержка выполнения эффектов
       SlideLeft.Duration = 400; // продолжительность эффекта
       SlideLeft.Tween = 0; // формула вычисления эффекта (твинер)
       SlideLeft.SlideType = 0;
       
var SlideRight = IR.CreateEffect(IR.EFFECT_SLIDE ); // создаем группу, сохраняем в переменную
       SlideRight.Group = 2001; // присваиваем номер группы
       SlideRight.Delay = 0; // задержка выполнения эффектов
       SlideRight.Duration = 1000; // продолжительность эффекта
       SlideRight.Tween = IR.TWEEN_BACK_IN_OUT; // формула вычисления эффекта (твинер)
       SlideRight.SlideType = 1;
       
var SlideUp = IR.CreateEffect(IR.EFFECT_SLIDE ); // создаем группу, сохраняем в переменную
       SlideUp.Group = 2002; // присваиваем номер группы
       SlideUp.Delay = 0; // задержка выполнения эффектов
       SlideUp.Duration = 1000; // продолжительность эффекта
       SlideUp.Tween = IR.TWEEN_BACK_IN_OUT; // формула вычисления эффекта (твинер)
       SlideUp.SlideType = 3;

var DefaultLight18 = IR.FreeFontID; //Get free font ID
IR.CreateFont(DefaultLight18, "iR_Default_Light.ttf", 18);//Create new font with new size and id

var DefaultLight20 = IR.FreeFontID; //Get free font ID
IR.CreateFont(DefaultLight20, "iR_Default_Light.ttf", 20);//Create new font with new size and id
       
var DefaultLight27 = IR.FreeFontID; //Get free font ID
IR.CreateFont(DefaultLight27, "iR_Default_Light.ttf", 27);//Create new font with new size and id

var DefaultLight30=IR.FreeFontID; //Get free font ID
IR.CreateFont(DefaultLight30, "iR_Default_Light.ttf", 30);//Create new font with new size and id

var iOSOther27 = IR.FreeFontID; //Get free font ID
IR.CreateFont(iOSOther27, "iridium_ios7_other_font_169_char_4.ttf", 27);//Create new font with new size and id

var iOSGeneral27=IR.FreeFontID; //Get free font ID
IR.CreateFont(iOSGeneral27, "iridium_ios7_general_font_169_char_7.ttf", 27);//Create new font with new size and id

var iOSGeneral30=IR.FreeFontID; //Get free font ID
IR.CreateFont(iOSGeneral30, "iridium_ios7_general_font_169_char_7.ttf", 30);//Create new font with new size and id

var irArrow33 = IR.FreeFontID; //Get free font ID
IR.CreateFont(irArrow33, "iR_Arrow.ttf", 33);//Create new font with new size and id

var irMediaPlay33 = IR.FreeFontID; //Get free font ID
IR.CreateFont(irMediaPlay33, "iR_Media_Play.ttf", 33);//Create new font with new size and id

var irButtons33 = IR.FreeFontID; //Get free font ID
IR.CreateFont(irButtons33, "iR_Buttons.ttf", 33);//Create new font with new size and id

var videoiOS836 = IR.FreeFontID; //Get free font ID
IR.CreateFont(videoiOS836, "video ios8.ttf", 36);//Create new font with new size and id

var arrowsiOS836 = IR.FreeFontID; //Get free font ID
IR.CreateFont(arrowsiOS836, "arrows ios8.ttf", 36);//Create new font with new size and id

var irMediaSound33 = IR.FreeFontID; //Get free font ID
IR.CreateFont(irMediaSound33, "iR_Media_Sound.ttf", 33);//Create new font with new size and id
