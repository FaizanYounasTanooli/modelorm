export function Column(entity: Entity, propertyKey: string) {
    let value: any;

    const getter = function () {
        return value;
    };

    const setter = function (newValue: any) {
        value = newValue;
        entity.print(propertyKey,value)
    };

    Object.defineProperty(entity, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}

export default class Entity {
    print(propertyName: string, propertyValue: any) {
        console.log(`Property '${propertyName}' was set to '${propertyValue}'.`);
    }
}