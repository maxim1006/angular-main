export interface State1MixinModel {
    state: {
        prop: string
    };
    getState(): {[key: string]: any};
}

type Constructor<T> = new(...args: any[]) => T;

export function state1Mixin<T extends Constructor<{}>>(Base: T = (class {} as any)) {
    return class extends Base implements State1MixinModel {
        state = {
            prop: 'prop'
        };

        getState() {
            return this.state;
        }

        constructor(...args: any[]) {
            super(...args);
        }
    };
}
