
// joystickNavigation

// константы
var iATVDragNav_PressDelta    = 10;
var iATVDragNav_MoveDelta     = 42;
var iATVDragNav_MoveNegDelta  = -42;
// переменные начала, текущего положения и окончания движения
var iATVDragStartPressX, iATVDragStartPressY, iATVDragCurPressX, iATVDragCurPressY, iATVDragReleaseX, iATVDragReleaseY;

// Поле джойстика
var ATVDragPoleH = IR.GetItem("AppleTVNavH").GetItem("joystickNavigation");
var ATVDragPoleV = IR.GetItem("AppleTVNavV").GetItem("joystickNavigation");

// Горизонтальная ориентация
// Нажали на поле
IR.AddListener(IR.EVENT_TOUCH_DOWN, ATVDragPoleH, function()
{
   ATVNav_DragOrPressStart(ATVDragPoleH);
});

// Отпустили поле
IR.AddListener(IR.EVENT_TOUCH_UP, ATVDragPoleH, function()
{
   ATVNav_DragOrPressFinish(ATVDragPoleH);
});

// Событие срабатывает движении пальца на элементе
IR.AddListener(IR.EVENT_TOUCH_MOVE, ATVDragPoleH, function()
{
   ATVNav_Drag(ATVDragPoleH);
});

// Вертикальная ориентация
// Нажали на поле
IR.AddListener(IR.EVENT_TOUCH_DOWN, ATVDragPoleV, function()
{
   ATVNav_DragOrPressStart(ATVDragPoleV);
});

// Отпустили поле
IR.AddListener(IR.EVENT_TOUCH_UP, ATVDragPoleV, function()
{
   ATVNav_DragOrPressFinish(ATVDragPoleV);
});

// Событие срабатывает движении пальца на элементе
IR.AddListener(IR.EVENT_TOUCH_MOVE, ATVDragPoleV, function()
{
   ATVNav_Drag(ATVDragPoleV);
});


// *******************************************
function ATVNav_DragOrPressStart(dragPole)
{
//   IR.Log("Nav_DragOrPressStart(" + dragPole + ")");
   iATVDragStartPressX  = dragPole.ValueX;
   iATVDragStartPressY  = dragPole.ValueY;
   iATVDragCurPressX    = iATVDragStartPressX;
   iATVDragCurPressY    = iATVDragStartPressY;
}

function ATVNav_DragOrPressFinish(dragPole)
{
//   IR.Log("Nav_DragOrPressFinish(" + dragPole + ")");
   iATVDragReleaseX = dragPole.ValueX;
   iATVDragReleaseY = dragPole.ValueY;
   if ((Math.abs(iATVDragReleaseX - iATVDragStartPressX) < iATVDragNav_PressDelta) && (Math.abs(iATVDragReleaseY - iATVDragStartPressY) < iATVDragNav_PressDelta))
   {
      SendPulse("[iRidium]Cinema_AppleTV_Enter");  /// Enter
   }
}

function ATVNav_Drag(dragPole)
{
//   IR.Log("Nav_Drag(" + dragPole + ")");
   var iTempX = dragPole.ValueX;
   var iTempY = dragPole.ValueY;
   if ((iTempX - iATVDragCurPressX) > iATVDragNav_MoveDelta)
   {
      SendPulse("[iRidium]Cinema_AppleTV_Right"); // Right
      iATVDragCurPressX = iTempX;      
   }
   else if ((iTempX - iATVDragCurPressX) < iATVDragNav_MoveNegDelta)
   {
      SendPulse("[iRidium]Cinema_AppleTV_Left"); // Left      
      iATVDragCurPressX = iTempX;      
   }

   if ((iTempY - iATVDragCurPressY) > iATVDragNav_MoveDelta)
   {
      SendPulse("[iRidium]Cinema_AppleTV_Down"); // Down
      iATVDragCurPressY = iTempY;      
   }
   else if ((iTempY - iATVDragCurPressY) < iATVDragNav_MoveNegDelta)
   {
      SendPulse("[iRidium]Cinema_AppleTV_Up"); //Up      
      iATVDragCurPressY = iTempY;      
   }
}
