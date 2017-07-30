let randomList:number[] = [6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000];
let length              = randomList.length;
console.log(length);

randomList.forEach(function(name){
    //name就是arr数组中对应的元素
    console.log(name);
});

let random = Math.random() *( length - 1 ) + 1;
let re     = Math.round(random);
console.log(re);