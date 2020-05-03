const TYPES = {
    'undefined': 'undefined',
    'number': 'number',
    'boolean': 'boolean',
    'string': 'string',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error'
};

function getType(o) {
    return TYPES[typeof o] || TYPES[Object.prototype.toString.call(o)] || (o ? 'object' : 'null');
}

export const isArray = (o) => Array.isArray(o) || function (o1) {
    return getType(o1) === 'array';
};

export const isBoolean = (o) => {
    return typeof o === 'boolean';
};

export const isDate = (o) => {
    return getType(o) === 'date' && o.toString() !== 'Invalid Date' && !isNaN(o);
};

export const isFunction = (o) => {
    return getType(o) === 'function';
};

export const isNumber = (o) => {
    return typeof o === 'number' && isFinite(o);
};

export const isObject = (o, failfn) => {
    const  t = typeof o;
    return (o && (t === 'object' ||
        (!failfn && (t === 'function' || isFunction(o))))) || false;
};

export const isRegExp = (value) => {
    return getType(value) === 'regexp';
};

export const isString = (o) => {
    return typeof o === 'string';
};

export const isUndefined = (o) => {
    return typeof o === 'undefined';
};

// Returns false for null/undefined/NaN, true for other values, including 0/false/''
export const isValue = (o) => {
    const t = getType(o);

    switch (t) {
        case 'number':
            return isFinite(o);

        case 'null':
        case 'undefined':
            return false;

        default:
            return !!t;
    }
};

export const getRandomInteger = (min: number = 0, max: number = 1000): number => {
    const randomNumber = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(randomNumber);
};

export function debounce(func: (e: Event) => any, time: number = 0) {
    let timeout;

    return function (...args) {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, time);
    };
}

export function deepFreeze<T>(inObj: T): T {
    Object.freeze(inObj);

    Object.getOwnPropertyNames(inObj).forEach(function (prop) {
        if (inObj.hasOwnProperty(prop)
            && inObj[prop] != null
            && typeof inObj[prop] === 'object'
            && !Object.isFrozen(inObj[prop])) {
            deepFreeze(inObj[prop]);
        }
    });
    return inObj;
}

export function naiveObjectComparison(objOne, objTwo): boolean {
    try {
        return JSON.stringify(objOne) === JSON.stringify(objTwo);
    } catch (e) {
        console.log("naiveObjectComparison error ", e);
    }
}
