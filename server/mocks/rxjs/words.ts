import * as faker from 'faker';
import * as _ from 'lodash';

const words = _.times(1000, n => faker.random.word());

export { words };
