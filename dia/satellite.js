
// joystickNavigation

// константы
var iSATDragNav_PressDelta    = 10;
var iSATDragNav_MoveDelta     = 42;
var iSATDragNav_MoveNegDelta  = -42;
// переменные начала, текущего положения и окончания движения
var iSATDragStartPressX, iSATDragStartPressY, iSATDragCurPressX, iSATDragCurPressY, iSATDragReleaseX, iSATDragReleaseY;

// Поле джойстика
var SATDragPoleH = IR.GetItem("SatelliteH").GetItem("joystickNavigation");
var SATDragPoleV = IR.GetItem("SatelliteV").GetItem("joystickNavigation");

// Горизонтальная ориентация
// Нажали на поле
IR.AddListener(IR.EVENT_TOUCH_DOWN, SATDragPoleH, function()
{
   SATNav_DragOrPressStart(SATDragPoleH);
});

// Отпустили поле
IR.AddListener(IR.EVENT_TOUCH_UP, SATDragPoleH, function()
{
   SATNav_DragOrPressFinish(SATDragPoleH);
});

// Событие срабатывает движении пальца на элементе
IR.AddListener(IR.EVENT_TOUCH_MOVE, SATDragPoleH, function()
{
   SATNav_Drag(SATDragPoleH);
});

// Вертикальная ориентация
// Нажали на поле
IR.AddListener(IR.EVENT_TOUCH_DOWN, SATDragPoleV, function()
{
   SATNav_DragOrPressStart(SATDragPoleV);
});

// Отпустили поле
IR.AddListener(IR.EVENT_TOUCH_UP, SATDragPoleV, function()
{
   SATNav_DragOrPressFinish(SATDragPoleV);
});

// Событие срабатывает движении пальца на элементе
IR.AddListener(IR.EVENT_TOUCH_MOVE, SATDragPoleV, function()
{
   SATNav_Drag(SATDragPoleV);
});


// *******************************************
function SATNav_DragOrPressStart(dragPole)
{
//   IR.Log("Nav_DragOrPressStart(" + dragPole + ")");
   iSATDragStartPressX  = dragPole.ValueX;
   iSATDragStartPressY  = dragPole.ValueY;
   iSATDragCurPressX    = iSATDragStartPressX;
   iSATDragCurPressY    = iSATDragStartPressY;
}

function SATNav_DragOrPressFinish(dragPole)
{
//   IR.Log("Nav_DragOrPressFinish(" + dragPole + ")");
   iSATDragReleaseX = dragPole.ValueX;
   iSATDragReleaseY = dragPole.ValueY;
   if ((Math.abs(iSATDragReleaseX - iSATDragStartPressX) < iSATDragNav_PressDelta) && (Math.abs(iSATDragReleaseY - iSATDragStartPressY) < iSATDragNav_PressDelta))
   {
      SendPulse("[iRidium]Cinema_Satellite_Enter");  /// Enter
   }
}

function SATNav_Drag(dragPole)
{
//   IR.Log("Nav_Drag(" + dragPole + ")");
   var iTempX = dragPole.ValueX;
   var iTempY = dragPole.ValueY;
   if ((iTempX - iSATDragCurPressX) > iSATDragNav_MoveDelta)
   {
      SendPulse("[iRidium]Cinema_Satellite_Right"); // Right
      iSATDragCurPressX = iTempX;      
   }
   else if ((iTempX - iSATDragCurPressX) < iSATDragNav_MoveNegDelta)
   {
      SendPulse("[iRidium]Cinema_Satellite_Left"); // Left      
      iSATDragCurPressX = iTempX;      
   }

   if ((iTempY - iSATDragCurPressY) > iSATDragNav_MoveDelta)
   {
      SendPulse("[iRidium]Cinema_Satellite_Down"); // Down
      iSATDragCurPressY = iTempY;      
   }
   else if ((iTempY - iSATDragCurPressY) < iSATDragNav_MoveNegDelta)
   {
      SendPulse("[iRidium]Cinema_Satellite_Up"); //Up      
      iSATDragCurPressY = iTempY;      
   }
}
