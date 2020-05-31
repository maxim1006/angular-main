(() => {
    // сработает еще перед console.log в апп модуле, в angular.json при этом не делаю lazy: true
    console.log("global");
    window["globalVar"] = "globalVar";
})();
