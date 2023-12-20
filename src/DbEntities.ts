import  Context  from "./interface/Context";
import Student from "./Student";
import DBSet from "./Models/DBSetT";
export default class myContext extends Context {
    public students: DBSet<Student> = new DBSet(Student);
}