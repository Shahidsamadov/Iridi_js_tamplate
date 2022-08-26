// Unit: Gestures

var rectx1 = 0, rectx2 = 640;
var recty1 = 0, recty2 = 1000;

function EnableGestures()
{
    IR.AddRecognizer(IR.GESTURE_SWIPE_LEFT);  // Подключен жест влево
    IR.AddRecognizer(IR.GESTURE_SWIPE_RIGHT); // Подключен жест вправо
//    IR.AddRecognizer(IR.GESTURE_SWIPE_UP);    // Подключен жест вверх
//    IR.AddRecognizer(IR.GESTURE_SWIPE_DOWN);  // Подключен жест вниз
    IR.AddListener(IR.EVENT_GESTURE_BEGIN, IR.CurrentPage, function(gesture, x, y)
    {
        if (x > rectx1 && x < rectx2 && y > recty1 && y < recty2)
        // Конструкция выбора
        switch(gesture)
        {
        case IR.GESTURE_SWIPE_LEFT:  // 1
            SwipeLeft();
            break;
        case IR.GESTURE_SWIPE_RIGHT: // 2
            SwipeRight();
            break;
        case IR.GESTURE_SWIPE_UP: // 3
            //Pulse("Apple_TV_Up");
            break;
        case IR.GESTURE_SWIPE_DOWN: // 4
            //Pulse("Apple_TV_Down");
            break;
        }
    });
}

function DisableGestures()
{
    IR.RemoveRecognizer(IR.GESTURE_SWIPE_LEFT);  // (1) Отключен жест влево
    IR.RemoveRecognizer(IR.GESTURE_SWIPE_RIGHT); // (2) Отключен жест вправо
//    IR.RemoveRecognizer(IR.GESTURE_SWIPE_UP);    // (3) Отключен жест вверх
//    IR.RemoveRecognizer(IR.GESTURE_SWIPE_DOWN);  // (4) Отключен жест вниз
}
