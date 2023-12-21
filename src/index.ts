import myContext from "./DbEntities";
import Student from "./Student";
let Ctx: myContext = new myContext("");
import applyObjectExtensions from "./Object.extensions";
applyObjectExtensions();
let stu = new Student();
stu.name = "Faizan";
stu.age = 123;
Ctx.students.Add(stu);
const a = 123;
Ctx.students.Where((item => item.age == a), { a: a })
    .Where(y => y.age == 76)
    .Select(y => { return { n: y.name +"awef", Age: y.age *10 } }).Select(item => item.Age)
    .ToList();
