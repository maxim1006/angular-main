// Functions

let o = {
    m: function() {
        console.log(this) // m
    }
};

// o.m();

let o1 = {
    m: () => {
        console.log(this) // window
    }
};

// o1.m();
