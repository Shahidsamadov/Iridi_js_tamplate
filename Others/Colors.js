if (IR.GetVariable("Tokens.Darkmode"))
{
    IR.Log("Theme is dark = " + IR.GetVariable("Tokens.Darkmode"));
    //dark
    backgroundColor = 0x292929FF;
    textColor = 0xD5D5D5FF;
    highlightColor = 0x2F2F2FFF;
    transparentColor = 0xFFFFFF00;
    glyphColor = 0xD5D5D5FF;
    buttonColor = 0x29ABE2FF;
    arrowColor = 0xFFFFFF00;
    borderColor = 0x6f6f74ff;
    blueColor = 0x29abe2ff;
    IR.GetItem("Page 1").GetState(0).Color = 0x292929FF;
    
    on_image = "black_on.png"
    off_image = "black_off.png"
    
    smart_popup = "AV_template_4";
    kodi_dpad_popup = "AV_template_6";
    kodi_swipe_popup = "AV_template_8";
    appleTV_template = "AV_template_5";
}
else
{
    IR.Log("Theme is light = " + IR.GetVariable("Tokens.Darkmode"));
    backgroundColor = 0xF4F4F4FF;
    textColor = 0x323333FF;
    highlightColor = 0xdfe3e6FF;
    transparentColor = 0xFFFFFF00;
    glyphColor = 0xF4F4F4FF;
    buttonColor = 0x29ABE2FF;
    arrowColor = 0xFFFFFF00;
    borderColor = 0x6f6f74ff;
    blueColor = 0x29abe2ff;
    modalColor = 0xe0e3e6FF;
    inputColor = 0xeceef0FF;
    IR.GetItem("Page 1").GetState(0).Color = 0xFFFFFFFF;
    
    on_image = "white_on.png"
    off_image = "white_off.png"

    smart_popup = "AV_template_4_white";
    kodi_dpad_popup = "AV_template_6_white";
    kodi_swipe_popup = "AV_template_8_white";
    appleTV_template = "AV_template_5_white";
}
