export function Column(entity: Entity, propertyKey: string) {
    let value: any;
    let updates:any={};
    const getter = () =>{
        return value;
    };
    Object.defineProperty(entity, "updates", {
        enumerable: true,
        configurable: true,
        get: function () {
            return updates;
        },
        set: function (newValue) {
            updates = newValue;
        }
    });
    const setter =(newValue: any) =>{
        value = newValue;
        entity.print(propertyKey,value)
        
    };

    Object.defineProperty(entity, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
    
    console.log(entity)
}

export default class Entity {
    updates:any;
    print (propertyName: string, propertyValue: any) {
        this.updates[propertyName]= `'${propertyName}' = '${propertyValue}'`;
        console.log(this.updates)
    };
}