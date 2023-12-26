import myContext from "../DbEntities";
import Student from "../Student";
import DBSet from "./DBSetT";

export default class Context {
    connectionString:string;
    constructor(connectionString:string){
        this.connectionString=connectionString;
    }
    public  SaveChanges():void {
        console.log("Saving Changes");
        console.log((this as unknown as myContext).students .toString())
    }
}