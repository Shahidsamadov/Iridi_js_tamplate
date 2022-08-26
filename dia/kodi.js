
// joystickNavigation

// константы
var iXBMCDragNav_PressDelta    = 10;
var iXBMCDragNav_MoveDelta     = 42;
var iXBMCDragNav_MoveNegDelta  = -42;
// переменные начала, текущего положения и окончания движения
var iXBMCDragStartPressX, iXBMCDragStartPressY, iXBMCDragCurPressX, iXBMCDragCurPressY, iXBMCDragReleaseX, iXBMCDragReleaseY;

// Поле джойстика
var XBMCDragPoleH = IR.GetItem("XBMCNavH").GetItem("joystickNavigation");
var XBMCDragPoleV = IR.GetItem("XBMCNavV").GetItem("joystickNavigation");

// Горизонтальная ориентация
// Нажали на поле
IR.AddListener(IR.EVENT_TOUCH_DOWN, XBMCDragPoleH, function()
{
   XBMCNav_DragOrPressStart(XBMCDragPoleH);
});

// Отпустили поле
IR.AddListener(IR.EVENT_TOUCH_UP, XBMCDragPoleH, function()
{
   XBMCNav_DragOrPressFinish(XBMCDragPoleH);
});

// Событие срабатывает движении пальца на элементе
IR.AddListener(IR.EVENT_TOUCH_MOVE, XBMCDragPoleH, function()
{
   XBMCNav_Drag(XBMCDragPoleH);
});

// Вертикальная ориентация
// Нажали на поле
IR.AddListener(IR.EVENT_TOUCH_DOWN, XBMCDragPoleV, function()
{
   XBMCNav_DragOrPressStart(XBMCDragPoleV);
});

// Отпустили поле
IR.AddListener(IR.EVENT_TOUCH_UP, XBMCDragPoleV, function()
{
   XBMCNav_DragOrPressFinish(XBMCDragPoleV);
});

// Событие срабатывает движении пальца на элементе
IR.AddListener(IR.EVENT_TOUCH_MOVE, XBMCDragPoleV, function()
{
   XBMCNav_Drag(XBMCDragPoleV);
});


// *******************************************
function XBMCNav_DragOrPressStart(dragPole)
{
//   IR.Log("Nav_DragOrPressStart(" + dragPole + ")");
   iXBMCDragStartPressX  = dragPole.ValueX;
   iXBMCDragStartPressY  = dragPole.ValueY;
   iXBMCDragCurPressX    = iXBMCDragStartPressX;
   iXBMCDragCurPressY    = iXBMCDragStartPressY;
}

function XBMCNav_DragOrPressFinish(dragPole)
{
//   IR.Log("Nav_DragOrPressFinish(" + dragPole + ")");
   iXBMCDragReleaseX = dragPole.ValueX;
   iXBMCDragReleaseY = dragPole.ValueY;
   if ((Math.abs(iXBMCDragReleaseX - iXBMCDragStartPressX) < iXBMCDragNav_PressDelta) && (Math.abs(iXBMCDragReleaseY - iXBMCDragStartPressY) < iXBMCDragNav_PressDelta))
   {
      SendPulse("[iRidium]Cinema_Kodi_Select");  /// Enter
   }
}

function XBMCNav_Drag(dragPole)
{
//   IR.Log("Nav_Drag(" + dragPole + ")");
   var iTempX = dragPole.ValueX;
   var iTempY = dragPole.ValueY;
   if ((iTempX - iXBMCDragCurPressX) > iXBMCDragNav_MoveDelta)
   {
      SendPulse("[iRidium]Cinema_Kodi_Right"); // Right
      iXBMCDragCurPressX = iTempX;      
   }
   else if ((iTempX - iXBMCDragCurPressX) < iXBMCDragNav_MoveNegDelta)
   {
      SendPulse("[iRidium]Cinema_Kodi_Left"); // Left      
      iXBMCDragCurPressX = iTempX;      
   }

   if ((iTempY - iXBMCDragCurPressY) > iXBMCDragNav_MoveDelta)
   {
      SendPulse("[iRidium]Cinema_Kodi_Down"); // Down
      iXBMCDragCurPressY = iTempY;      
   }
   else if ((iTempY - iXBMCDragCurPressY) < iXBMCDragNav_MoveNegDelta)
   {
      SendPulse("[iRidium]Cinema_Kodi_Up"); //Up      
      iXBMCDragCurPressY = iTempY;      
   }
}
