import {Room, Contact, Message, MsgType,FriendRequest,MediaMessage} from "wechaty";
import {WelComeMsg,addFansWord} from "./config";
var memberList:string[] = [];
const fs = require('fs');
//const g_Path = require('path');
const IMAGE_PATH   = '/bot/meizitu/';
const IMAGE_QRCODE = '/bot/qr/';
const HOUR_OFFSET = 8 ;
var   SEND_NUMBER = 0 ;
exports = module.exports = async function onMessage (message) {

    let isWorkTime:string = getWorkTime();
    switch (isWorkTime){
        case 'Y'://work time
            //await replyMsg(message);
            //await addFansFromGroupV2(message);
            setTimeout(() => {
                console.log('delay-----');
                replyMsg(message);
                addFansFromGroupV2(message);
            }, 9000);



            console.log('it is work time');
            break;
        case 'N':
            setTimeout(() => {
                console.log('delay-----');
                replyMsgNoneWorkTime(message);
            }, 9000);
            console.log('current time is not work time!');
            break;
        default:
            break;
    };
    //await replyMsg(message);
    //await addFansFromGroupV2(message);
    //await getGirlPicPath(`/bot/meizitu`);
};


let getWorkTime   = function():string{
    let dateObj = new Date();
    let hour = dateObj.getHours() +  HOUR_OFFSET ;
    //console.log(hour);
    //var isWorkTime = '';
    // 0-7 none work time
    if (hour >= 7){
        //console.log('>=7');
        //isWorkTime = 'Y';
        return 'Y';
    }else{
        //console.log('<7');
        return 'N';
    };

};

let getTimeLimit = function():number{
    let dateObj = new Date();
    //dateObj.getTimezoneOffset()/60;
    let hour = dateObj.getHours() +  HOUR_OFFSET ;
    //let hour = new Date().toLocaleString();
    console.log(hour);
    return hour;
};

let addFansFromGroupV2 = async function(message:Message):Promise<any>{
    const length = memberList.length;
    console.log(`"数组长度是："${length}`);
    console.log(memberList);
    const from:Contact = message.from();
    const name = from.name();
    console.log(`"now was sended:"${SEND_NUMBER}`);
    if (SEND_NUMBER >= 80){
        console.log('the send number was finished today');
        return;
    };

    if (from && from.stranger()){//没有加过好友
        if(memberList.indexOf(name) === -1){//未执行过发送加好友请求的操作
            const request = new FriendRequest();
            let result = await request.send(from,addFansWord);
            console.log(`"result is :"${result}`);
            if (result){
                SEND_NUMBER = SEND_NUMBER + 1;
                console.log(`Request from ${name} is send succesfully!`)
            }else{
                SEND_NUMBER = SEND_NUMBER + 1;
                console.log(`Request from ${name} failed to send!`)
            };
            console.log("---------request--------");
            //console.log(request);
            memberList.push(name);
        }else{
            console.log(`${name}"-----已经发送过请求了"`);
        };
    };
    return;
};


let addFansFromGroupV1 = async function(message:Message):Promise<any>{
    let from:Contact = message.from();
    if (from && from.stranger()){
        //console.log(from);
        let request = new FriendRequest();
        //setTimeout(request.send(from,addFansWord),delayTime());
        let time = setTimeout(() => {
            //let q =request.send(from,addFansWord);
            console.log(request.send(from,addFansWord));
            //console.log(q);
            console.log(addFansWord);
        }, delayTime());
        //console.log(time);

    };
    return;
};


let addFansFromGroup = async function(message:Message):Promise<any>{
    const room      = message.room();
    //let member[] = Contact[];
    if (room){
        if ( !/免费发放微信群二维码/.test(message.room().topic())&& message.self()) {
            return;
        }
    }
    let member:Contact[] = room.memberList();
    let length           = member.length;
    var i = 1;
    var j = 1;
    var from=null;
    //console.log(length);
    for (let entry of member) {
        //console.log(entry.stranger()); // 1, "string", false
        i = i+1;
        if (entry.stranger()){
            j = j+1;
            //console.log("---------------------");
            let name = entry.name();
            from = message.from();
            console.log(`"who was talked :"${from}`);
            let request = new FriendRequest();
            //await setTimeout(request.send(from,addFansWord),3000);

            setTimeout(() => {
                request.send(from,addFansWord)
            }, delayTime());
            //console.log(`${i}"---"${name}`);
            //console.log("---------------------");
        };
        from = null;
    }
    console.log(from);
    return;
};

let replyMsgNoneWorkTime = async function(message:Message):Promise<any>{
    const room      = message.room();
    const sender    = message.from();
    const content   = message.content();
    const topic = room ? '[' + room.topic() + ']' : '';
    const name      = sender.name();
    console.log(`${topic} <${sender.name()}> : ${message.toStringDigest()}`);

    if (room){
        if ( /免费发放微信群二维码/.test(message.room().topic())&& !message.self()) {

            await message.say(`@${name}  "累了！"`);
            return;
        }
        return;
    }

    if (message.self() || room) {
        console.log('message is sent from myself, or inside a room.');
        return;
    }else{
        await message.say(`@${name}  "累了！"`);
        return;
    };
};


let replyMsg = async function(message:Message):Promise<any>{
    const room      = message.room();
    const sender    = message.from();
    const content   = message.content();
    const topic = room ? '[' + room.topic() + ']' : '';
    //console.log(`${topic} <${sender.name()}> : ${message.toStringDigest()}`);

    if (room){
        if ( /免费发放微信群二维码/.test(message.room().topic())&& !message.self()) {
            switch(content){
                case '1':
                    //await message.say('公众号取，微信个人号、微信群正在开发中......');
                    await getGirlPicPath(message,IMAGE_QRCODE);
                    break;
                case '二维码':
                    await getGirlPicPath(message,IMAGE_QRCODE);
                    break;
                case '2':
                    await message.say('私信沟通！');
                    break;
                case '3':
                    await message.say('功能开发中......');
                    break;
                case '4':
                    await message.say('私信沟通！');
                    break;
                case 'girl':
                    //let tempPath1 = getPicPathV1(IMAGE_PATH);
                    //console.log('=====================');
                    //console.log(tempPath1);
                    //replyPic(message,tempPath1);
                    await getGirlPicPath(message,IMAGE_PATH);
                    break;
                case '美女':
                    //let tempPath2 = getPicPathV1(IMAGE_PATH);
                    //replyPic(message,tempPath2);
                    await getGirlPicPath(message,IMAGE_PATH);
                    break;
                case '妹子':
                    await getGirlPicPath(message,IMAGE_PATH);
                    break;
                default:
                    await message.say(WelComeMsg);
            };
        }
        return;
    }
    if (message.self() || room) {
        console.log('message is sent from myself, or inside a room.');
        return;
    };

    switch(content){
        case '1':
            await getGirlPicPath(message,IMAGE_QRCODE);
            break;
        case '二维码':
            await getGirlPicPath(message,IMAGE_QRCODE);
            break;
        case '2':
            await message.say('私信沟通！');
            break;
        case '3':
            await message.say('功能开发中......');
            break;
        case '4':
            await message.say('私信沟通！');
            break;
        case 'girl':
            //let tempPath1 = getPicPathV1(IMAGE_PATH);
            //console.log('=====================');
            //console.log(tempPath1);
            //replyPic(message,tempPath1);
            await getGirlPicPath(message,IMAGE_PATH);
            break;
        case '美女':
            //let tempPath2 = getPicPathV1(IMAGE_PATH);
            //replyPic(message,tempPath2);
            await getGirlPicPath(message,IMAGE_PATH);
            break;
        case '妹子':
            await getGirlPicPath(message,IMAGE_PATH);
            break;
        default:
            await message.say(WelComeMsg);
    };

    return;
};


let delayTime = async function():Promise<any>{
    const minDelayTime = 9000;
    const maxDelayTime = 15000;
    const delayTime = Math.floor(Math.random() * (maxDelayTime - minDelayTime)) + minDelayTime;
    const result    = Math.floor(delayTime/1000);
    const re        = result * 1000;
    console.log(`"delaytime is :"${re}`);
    return re;
};


let replyPicV1 = async function(message:Message,path:string):Promise<void>{
    let filePath = getPicPathV1(path);
    console.log(`"sended---"${filePath}`);
    message.say(new MediaMessage(filePath));
    console.log(`"pic was sended---"${filePath}`);
    return;

};


let replyPic = async function(message:Message,path:string):Promise<void>{
    console.log(`"sended---"${path}`);
    message.say(new MediaMessage(path));
    console.log(`"pic was sended---"${path}`);
    return;

};

let getPicPathV1 = function(filePath:string):string{

    let fileName = '';
    fs.readdir(filePath,function(err,files){
        if(err){
            return console.error(err);
        };

        const length = files.length;
        console.log(`"meizitu files count:  "${length}`);
        var random:number = getRandomNumberV1(1,length);
        console.log(`"random is : "${random}`);

        if (random > length){
            random = random - length;
        };

        fileName = filePath + files[random];
        console.log(`"filename is : "${fileName}`);
        return fileName;
        /*files.forEach(function(file){
         const length = files.length;
         console.log(`"meizitu files count:  "${length}`);
         //console.info(file);
         });*/
    });
    return fileName;
};




let getPicPath = async function(filePath:string):Promise<string>{

    let fileName = '';
    fs.readdir(filePath,function(err,files){
        if(err){
            return console.error(err);
        };

        const length = files.length;
        console.log(`"meizitu files count:  "${length}`);
        var random:number = getRandomNumberV1(1,length);
        console.log(`"random is : "${random}`);

        if (random > length){
            random = random - length;
        };

        fileName = filePath + files[random];
        console.log(`"filename is : "${fileName}`);
        return fileName;
        /*files.forEach(function(file){
         const length = files.length;
         console.log(`"meizitu files count:  "${length}`);
         //console.info(file);
         });*/
    });
    return fileName;
};

let getGirlPicPath = async function(message:Message,filePath:string):Promise<string>{
    /*console.log(__dirname);  用这个指令看看目录，很容易被容器搞昏*/

    var fileName = "";
    fs.readdir(filePath,function(err,files){
        if(err){
            return console.error(err);
        }

        const length = files.length;
        console.log(`"meizitu files count:  "${length}`);
        var random:number = getRandomNumberV1(1,length);
        console.log(`"random is : "${random}`);

        if (random > length){
            random = random - length;
        };

        fileName = files[random];
        fileName = filePath + fileName;
        console.log(`"filename is : "${fileName}`);
        replyPic(message,fileName);
        return fileName;
        /*files.forEach(function(file){
         const length = files.length;
         console.log(`"meizitu files count:  "${length}`);
         //console.info(file);
         });*/
    });

    console.log(`"filename is : "${fileName}`);
    return fileName;

};


let getRandomNumber = async function(min:number ,max:number ):Promise<number>{
    //const random = Math.floor(Math.random() * (max - min)) + Math.round(min/2) ;
    //const num    = parseInt(random, 10);
    const random = Math.random() *( max - min ) + min;
    return Math.round(random);
};

let getRandomNumberV1 =  function(min:number ,max:number ):number{
    //const random = Math.floor(Math.random() * (max - min)) + Math.round(min/2) ;
    //const num    = parseInt(random, 10);
    const random = Math.random() *( max - min ) + min;
    return Math.round(random);
};