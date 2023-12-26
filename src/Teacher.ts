import Entity, { Column } from "./Models/Entity";

export default class Teacher extends Entity {
    constructor() {
        super();
        
    }
    
    @Column
    TeachName!:string;
}