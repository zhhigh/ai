var d = new Date();
//var gmtHours = d.getTimezoneOffset()/60;
//console.log(gmtHours);


let hour = d.getHours();

switch (hour){
    case 8,9,12,13:
        console.log(hour);
        break;
    case 0,1,2:
        break;
    default:
        break;

};
//console.log(hour);