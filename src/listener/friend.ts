

//import {greetingsMsg} from "./config";
import {Contact} from "wechaty";


exports = module.exports = async function onFriend(contact:Contact, request) {
  console.log('auto accepted for ' + contact + ' with message: ');
  if (request) {  // 1. request to be friend from new contact
    request.accept();
    contact.say('hello!');
    console.log('auto accepted for ' + contact + ' with message: ' + request.hello);

  };
};
