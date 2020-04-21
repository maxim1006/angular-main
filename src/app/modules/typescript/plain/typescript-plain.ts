// tsc -p ./ - из командой строки данной командой могу указат откуда брать tsconfig
// tsc -p ./ -w - помимо вышеизложенной команды еще и вотчер запускает

document.body.addEventListener("click", async () => {
    console.log(123);
    const {default: export1} = await import("./chapters/imports/export1.js") as any;
    const {default: export2} = await import("./chapters/imports/export2.js") as any;

    console.log(export1, export2);
});
