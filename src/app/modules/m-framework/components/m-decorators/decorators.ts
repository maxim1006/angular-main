export function decorator(...args) {
    console.log(args, " decorator args");
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log(target, " target");
        console.log(propertyKey, " propertyKey");
        console.log(descriptor, " descriptor");
    };
}

export function decorator1(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    console.log(target, " target1");
    console.log(propertyKey, " propertyKey1");
    console.log(descriptor, " descriptor1");
    target.a = 1;
}

export function logProperty(target: any, propertyKey: string): any {
    let _val = target[propertyKey];
    // console.log(target); //Account {} //прототип объекта Account
    // console.log(propertyKey); //firstName - декорируемое свойство
    const getter = (): typeof _val => {
        console.log(`Get ${propertyKey} => ${_val}`);
        return _val;
    };
    const setter = (newValue): void => {
        console.log(`Before set ${propertyKey} => ${_val} to ${newValue}`);
        _val = newValue;
        console.log(`After set ${propertyKey} => ${_val} to ${newValue}`);
        return newValue;
    };
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
    });
}

export function logProperty1(...args): any {
    // console.log("logProperty1");
    return function (target: any, propertyKey: string) {
        // console.log(target, propertyKey, "logProperty1 inner");

        ++target;
    };
}

interface PropertyHandlers<T> {
    beforeChange?: (newValue: T, oldValue: T) => boolean | void;
    afterChange?: (newValue: T, oldValue: T) => void;
}

export function PropertyHandler<T>(
    handlers: PropertyHandlers<T>
): PropertyDecorator {
    return (target: any, propertyKey: string): void => {
        const shadowPropertyKey = `__PropertyHandler_${propertyKey}_value`;

        const propertyDescriptor = {
            configurable: true,
            enumerable: false,
            get: function () {
                return this[shadowPropertyKey];
            },
            set: function (newValue: T) {
                const oldValue = this[shadowPropertyKey];
                if (newValue === oldValue) {
                    return;
                }
                if (
                    handlers.beforeChange &&
                    handlers.beforeChange.call(this, newValue, oldValue) ===
                        false
                ) {
                    return;
                }
                this[shadowPropertyKey] = newValue;
                if (handlers.afterChange) {
                    handlers.afterChange.call(this, newValue, oldValue);
                }
            },
        };

        // TODO update when https://github.com/angular/angular/issues/31495 is closed
        try {
            Object.defineProperty(target, propertyKey, propertyDescriptor);
        } catch (e) {
            console.log("can't set decorator in m-decorators.component.ts");
        }
    };
}
