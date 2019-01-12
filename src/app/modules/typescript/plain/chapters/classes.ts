interface SizeModel {
    availableSizes: string[];
}

interface Size2Model {
    bestSize2?: string;
}

interface Size1Model extends Size2Model {
    bestSize: string;
}


// абстрактный класс нельзя создать через new, нужен только для наследования
abstract class Size implements SizeModel, Size1Model {
    public bestSize: string = '';

    get availableSizes(): string[] {
        return this.sizes;
    }

    set availableSizes(sizes: string[]) {
        this.sizes = sizes;
    }

    constructor(public sizes: string[]) {}
}

class Pizza extends Size {
    public readonly name: string = '';
    static readonly call: string = '';

    constructor(sizes: string[]) {
        super(sizes);
    }
}

console.log(new Pizza(['small', 'medium']));
