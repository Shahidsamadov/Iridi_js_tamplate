// имена динамический картинок для камер
var strCamInput = "Cam Input";
var strCamBedroomDoor = "Cam Balcon 2 Bedroom Door";
var strCamBedroom = "Cam Balcon 2 Bedroom";
var strCamDiningDoor = "Cam Balcon 1 Dining";
var strCamKitchenDoor = "Cam Balcon 1 Kitchen Door";
var strCamKitchen = "Cam Balcon 1 Kitchen";

// Переключение камер
function ShowCameraInput()
{
   IR.GetItem("CameraH").GetItem("imgCamera").GetState(0).Image = strCamInput;
   IR.GetItem("CameraV").GetItem("imgCamera").GetState(0).Image = strCamInput;
}

function ShowCameraBedroomDoor()
{
   IR.GetItem("CameraH").GetItem("imgCamera").GetState(0).Image = strCamBedroomDoor;
   IR.GetItem("CameraV").GetItem("imgCamera").GetState(0).Image = strCamBedroomDoor;
}

function ShowCameraBedroom()
{
   IR.GetItem("CameraH").GetItem("imgCamera").GetState(0).Image = strCamBedroom;
   IR.GetItem("CameraV").GetItem("imgCamera").GetState(0).Image = strCamBedroom;
}

function ShowCameraDiningDoor()
{
   IR.GetItem("CameraH").GetItem("imgCamera").GetState(0).Image = strCamDiningDoor;
   IR.GetItem("CameraV").GetItem("imgCamera").GetState(0).Image = strCamDiningDoor;
}

function ShowCameraKitchenDoor()
{
   IR.GetItem("CameraH").GetItem("imgCamera").GetState(0).Image = strCamKitchenDoor;
   IR.GetItem("CameraV").GetItem("imgCamera").GetState(0).Image = strCamKitchenDoor;
}

function ShowCameraKitchen()
{
   IR.GetItem("CameraH").GetItem("imgCamera").GetState(0).Image = strCamKitchen;
   IR.GetItem("CameraV").GetItem("imgCamera").GetState(0).Image = strCamKitchen;
}

IR.AddListener(IR.EVENT_ITEM_SHOW, IR.GetItem("CameraH"),function()
{
   IR.GetItem("CameraH").GetItem("imgCamera").GetState(0).Image = strCamInput;  
   IR.GetItem("CameraV").GetItem("imgCamera").GetState(0).Image = strCamInput;  
});

IR.AddListener(IR.EVENT_ITEM_SHOW, IR.GetItem("CameraМ"),function()
{
   IR.GetItem("CameraH").GetItem("imgCamera").GetState(0).Image = strCamInput;  
   IR.GetItem("CameraV").GetItem("imgCamera").GetState(0).Image = strCamInput;  
});