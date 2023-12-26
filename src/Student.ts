import Entity, { monitored } from "./Models/Entity";

export default class Student extends Entity {
    @monitored
    public name!:string;
    public age!:number;
}
