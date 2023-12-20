import myContext  from "./DbEntities";
import  Student from "./Student";
let Ctx:myContext= new myContext("");
import applyObjectExtensions from "./Object.extensions";
applyObjectExtensions();
let stu = new Student();
stu.name="Faizan";
stu.age=123;
stu.item={name:"123"};
Ctx.students.Add(stu);
Ctx.students.Where(item=>item.item?.name=='123')
.Where(y=>y.age==76)
.Select(y=>y.name)
.Where(y=>y=="awef")
.ToArray();
