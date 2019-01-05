// tsc -p ./ - из командой строки данной командой могу указат откуда брать tsconfig
// tsc -p ./ -w - помимо вышеизложенной команды еще и вотчер запускает


let o = {
    m: function() {
        console.log(this) // m
    }
};

o.m();

let o1 = {
    m: () => {
        console.log(this) // window
    }
};

o1.m();


