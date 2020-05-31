// tsc -p ./ - из командой строки данной командой могу указат откуда брать tsconfig
// tsc -p ./ -w - помимо вышеизложенной команды еще и вотчер запускает

document.body.addEventListener("click", async (): any => {
    console.log(123);
    const { default: export1 } = <any>(
        await import("./chapters/imports/export1.js")
    );
    const { default: export2 } = <any>(
        await import("./chapters/imports/export2.js")
    );

    console.log(export1, export2);
});
