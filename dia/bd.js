
// joystickNavigation

// константы
var iBDPDragNav_PressDelta    = 10;
var iBDPDragNav_MoveDelta     = 42;
var iBDPDragNav_MoveNegDelta  = -42;
// переменные начала, текущего положения и окончания движения
var iBDPDragStartPressX, iBDPDragStartPressY, iBDPDragCurPressX, iBDPDragCurPressY, iBDPDragReleaseX, iBDPDragReleaseY;

// Поле джойстика
var BDPDragPoleH = IR.GetItem("BluRayH").GetItem("joystickNavigation");
var BDPDragPoleV = IR.GetItem("BluRayV").GetItem("joystickNavigation");

// Горизонтальная ориентация
// Нажали на поле
IR.AddListener(IR.EVENT_TOUCH_DOWN, BDPDragPoleH, function()
{
   BDPNav_DragOrPressStart(BDPDragPoleH);
});

// Отпустили поле
IR.AddListener(IR.EVENT_TOUCH_UP, BDPDragPoleH, function()
{
   BDPNav_DragOrPressFinish(BDPDragPoleH);
});

// Событие срабатывает движении пальца на элементе
IR.AddListener(IR.EVENT_TOUCH_MOVE, BDPDragPoleH, function()
{
   BDPNav_Drag(BDPDragPoleH);
});

// Вертикальная ориентация
// Нажали на поле
IR.AddListener(IR.EVENT_TOUCH_DOWN, BDPDragPoleV, function()
{
   BDPNav_DragOrPressStart(BDPDragPoleV);
});

// Отпустили поле
IR.AddListener(IR.EVENT_TOUCH_UP, BDPDragPoleV, function()
{
   BDPNav_DragOrPressFinish(BDPDragPoleV);
});

// Событие срабатывает движении пальца на элементе
IR.AddListener(IR.EVENT_TOUCH_MOVE, BDPDragPoleV, function()
{
   BDPNav_Drag(BDPDragPoleV);
});


// *******************************************
function BDPNav_DragOrPressStart(dragPole)
{
//   IR.Log("Nav_DragOrPressStart(" + dragPole + ")");
   iBDPDragStartPressX  = dragPole.ValueX;
   iBDPDragStartPressY  = dragPole.ValueY;
   iBDPDragCurPressX    = iBDPDragStartPressX;
   iBDPDragCurPressY    = iBDPDragStartPressY;
}

function BDPNav_DragOrPressFinish(dragPole)
{
//   IR.Log("Nav_DragOrPressFinish(" + dragPole + ")");
   iBDPDragReleaseX = dragPole.ValueX;
   iBDPDragReleaseY = dragPole.ValueY;
   if ((Math.abs(iBDPDragReleaseX - iBDPDragStartPressX) < iBDPDragNav_PressDelta) && (Math.abs(iBDPDragReleaseY - iBDPDragStartPressY) < iBDPDragNav_PressDelta))
   {
      SendPulse("[iRidium]Cinema_BR_Key_Ok");  /// Enter
   }
}

function BDPNav_Drag(dragPole)
{
//   IR.Log("Nav_Drag(" + dragPole + ")");
   var iTempX = dragPole.ValueX;
   var iTempY = dragPole.ValueY;
   if ((iTempX - iBDPDragCurPressX) > iBDPDragNav_MoveDelta)
   {
      SendPulse("[iRidium]Cinema_BR_Key_NavRight"); // Right
      iBDPDragCurPressX = iTempX;      
   }
   else if ((iTempX - iBDPDragCurPressX) < iBDPDragNav_MoveNegDelta)
   {
      SendPulse("[iRidium]Cinema_BR_Key_NavLeft"); // Left      
      iBDPDragCurPressX = iTempX;      
   }

   if ((iTempY - iBDPDragCurPressY) > iBDPDragNav_MoveDelta)
   {
      SendPulse("[iRidium]Cinema_BR_Key_NavDown"); // Down
      iBDPDragCurPressY = iTempY;      
   }
   else if ((iTempY - iBDPDragCurPressY) < iBDPDragNav_MoveNegDelta)
   {
      SendPulse("[iRidium]Cinema_BR_Key_NavUp"); //Up      
      iBDPDragCurPressY = iTempY;      
   }
}
