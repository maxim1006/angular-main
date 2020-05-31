import { Input } from "@angular/core";

type Constructor<T> = new (...args: any[]) => T;

// пример миксина с декоратором, ошибка ts, типо только именованные классы могут быть с декоратором
export function inputMixin<T extends Constructor<{}>>(Base: T = <any>class {}) {
    class Temporary extends Base {
        @Input() inputMixin;
    }

    return Temporary;
}
