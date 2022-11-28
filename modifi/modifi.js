var operationModeTable = {
    //"Feedback name with source":"Name where to send"
    "":"",

}

function operationModeModifier(inType, inName, inValue){
    inName = inName.split(".")[1];
    inValue = parseInt(inValue,10);
    if(operationModeTable[inName]!=undefined){
        switch(inValue){
            case 1:
            case 21:
            case 33:
            case 61:
            case 97:                
                IR.SetVariable("Drivers"+operationModeTable[inName],1);                    
            break;

            case 2: 
            case 22:
            case 34:
            case 62:
            case 98:
                IR.SetVariable("Drivers"+operationModeTable[inName],2);  
            break;

            case 4:
            case 24:
            case 36:
            case 64:
            case 100:             
                IR.SetVariable("Drivers"+operationModeTable[inName],3);                       
            break; 
            
            case 8:
            case 28:
            case 40:
            case 68:
            case 104:              
                IR.SetVariable("Drivers"+operationModeTable[inName],4);                       
            break;            

            default: break;
        }
    }
    return inValue;
}