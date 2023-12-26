import Entity, { Column } from "./Models/Entity";

export default class Student extends Entity {
    @Column
    public name!:string;
    public age!:number;
}
