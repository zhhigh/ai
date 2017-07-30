
export class Util{

    public async getRandomFromArray(): Promise<number> {
        let randomList:number[] = [6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000];
        let length              = randomList.length;
        let random      = Math.random() *( length - 1 ) + 1;
        let temp        = Math.round(random);
        return randomList[temp];
    };

};

export default Util;