import myContext  from "./DbEntities";
import  Student from "./Student";
let Ctx:myContext= new myContext("");
import applyObjectExtensions from "./Object.extensions";
applyObjectExtensions();
let stu = new Student();
stu.name="Faizan";
stu.age=123;
Ctx.students.Add(stu);
const a = "awef";
Ctx.students.Where(item=>item.name==a ||  item.age==123)
.Where(y=>y.age==76)
.Select(y=>y.name)
.Where(y=>y=="awef")
.ToList();
