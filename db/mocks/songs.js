const faker = require('faker'),
    _ = require("lodash");

const songs = _.times(10, (n) => {
    return {
        "id": n,
        "name": faker.random.word(),
        "author": faker.name.findName(),
        "listened": [true, false][_.random(1)],
        "favourite": [true, false][_.random(1)]
    }
});

module.exports = songs;
