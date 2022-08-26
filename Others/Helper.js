// Unit: Helper

var globalhelper;

function progresshelper()
{
    if (IR.GetDevice("Crestron").GetFeedback("Splash") == 0)
    {
        IR.HidePopup("BUSY_POPUP");
        IR.ClearInterval(globalhelper);
    }
}

function resethelper()
{
    if (CurrentLocation == "Кинотеатр")
        if (CurrentSource == "Спутниковое" || CurrentSource == "Kodi")
            Pulse("netping1_reset");
        else
            Pulse("netping1a_reset");
    else
        Pulse("netping2_reset");
}

function mytrig()
{
    if (this.Value == 0)
    {
        this.Value = 1;
        kodi.Request("Player.SetSubtitle", {playerid: 1, subtitle: "on" });
        IR.GetItem("KODI_Remote").GetItem("SubNext").Show();
    }
    else
    {
        this.Value = 0;
        kodi.Request("Player.SetSubtitle", {playerid: 1, subtitle: "off" });
        IR.GetItem("KODI_Remote").GetItem("SubNext").Hide();
    }
}