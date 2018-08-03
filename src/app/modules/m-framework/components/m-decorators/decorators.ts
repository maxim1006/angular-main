export function decorator(...args) {
    console.log(args, ' decorator args');
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target, ' target');
        console.log(propertyKey, ' propertyKey');
        console.log(descriptor, ' descriptor');
    }
}

export function decorator1(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, ' target1');
    console.log(propertyKey, ' propertyKey1');
    console.log(descriptor, ' descriptor1');
    target.a = 1;
}

export function logProperty(target: any, propertyKey: string):any {
    let _val = target[propertyKey];
    // console.log(target); //Account {} //прототип объекта Account
    // console.log(propertyKey); //firstName - декорируемое свойство
    let getter = (): typeof _val => {
        console.log(`Get ${propertyKey} => ${_val}`);
        return _val;
    };
    let setter = (newValue):void => {
        console.log(`Before set ${propertyKey} => ${_val} to ${newValue}`);
        _val = newValue;
        console.log(`After set ${propertyKey} => ${_val} to ${newValue}`);
        return newValue;
    };
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true
    });
}

export function logProperty1(...args): any {
    console.log("logProperty1");
    return function(target: any, propertyKey: string) {

        console.log(target, propertyKey, "logProperty1 inner");

        ++target;

    }
}


