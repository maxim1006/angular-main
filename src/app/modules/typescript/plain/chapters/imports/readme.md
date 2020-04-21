### В случае commonjs

document.body.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var export1, export2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(123);
                return [4, Promise.resolve().then(function () { return __importStar(require("./chapters/imports/export1.js")); })];
            case 1:
                export1 = (_a.sent()).default;
                return [4, Promise.resolve().then(function () { return __importStar(require("./chapters/imports/export2.js")); })];
            case 2:
                export2 = (_a.sent()).default;
                console.log(export1, export2);
                return [2];
        }
    });
}); });

и каждый модуль

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "export1";

в браузере ReferenceError: require is not defined

### В случае esnext

document.body.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var export1, export2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(123);
                return [4, import("./chapters/imports/export1.js")];
            case 1:
                export1 = (_a.sent()).default;
                return [4, import("./chapters/imports/export2.js")];
            case 2:
                export2 = (_a.sent()).default;
                console.log(export1, export2);
                return [2];
        }
    });
}); });

export default "export1"; 
