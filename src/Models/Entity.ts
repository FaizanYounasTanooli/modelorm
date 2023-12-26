export function monitored(target: any, propertyKey: string) {
    let value: any;
    const getter = function () {
        return value;
    };

    const setter = function (newValue: any) {
        value = newValue;
        console.log(`Property '${propertyKey}' was set to '${value}'.`);
    };

    Object.defineProperty(target, propertyKey, {
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