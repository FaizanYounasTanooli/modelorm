import DbEntities from "./DbEntities";
import Student from "./Student";
let Ctx: DbEntities = new DbEntities("");
import applyObjectExtensions from "./Object.extensions";
import Teacher from "./Teacher";
applyObjectExtensions();
let stu = new Student();
stu.name = "Faizan";
stu.age=13;
let Teac= new Teacher();
Teac.TeachName="awfe";
Ctx.SaveChanges();

// stu.age = 123;
// Ctx.students.Add(stu);
// const a = 123;
// Ctx.students.Where(stu=>stu.age==10).First().age;


// Ctx.SaveChanges()
// Ctx.students.Where((item => item.age == a),{a:a})
//     .Where(y => y.age == 76)
//     .Select(item=>item.age)
//     .ToList();
    