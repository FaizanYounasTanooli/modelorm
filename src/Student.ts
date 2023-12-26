import Entity, { Column } from "./Models/Entity";

export default class Student extends Entity {
    constructor() {
        super();
        console.log("This is a test")
    }
    @Column
    public name!:string;
    @Column
    public age!:number;
}
