import  Context  from "./Models/Context";
import Student from "./Student";
import DBSet from "./Models/DBSetT";
export default class DbEntities extends Context {
    public students: DBSet<Student> = new DBSet(Student);
    constructor(connectionString:string) {
        super(connectionString);
    }
}    