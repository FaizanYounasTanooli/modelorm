export default class Context {
    connectionString:string;
    constructor(connectionString:string){
        this.connectionString=connectionString;
    }
    public  SaveChanges():void {
        console.log("Saving Changes");
    }
}