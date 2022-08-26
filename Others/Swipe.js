// Unit: Swipe

var enableswipe = 0;

function SwipeLeft()
{
    broker = 0;
    if (CurrentSource == "Радио"&&enableswipe==1)
    {
        IR.HidePopup('RADIO_Left');
        IR.ShowPopup('RADIO_Right');
        IR.GetItem("RADIO_AV Reciever (5)").GetItem("State").Value = 1;
    }
}

function SwipeRight()
{
    broker = 0;
    if (CurrentSource == "Радио"&&enableswipe==1)
    {
        IR.HidePopup('RADIO_Right');
        IR.ShowPopup('RADIO_Left');
        IR.GetItem("RADIO_AV Reciever (5)").GetItem("State").Value = 0;
    }
}

function enableswipe_fn()
{
    enableswipe = 1;
}


function disableswipe()
{
    enableswipe = 0;
}