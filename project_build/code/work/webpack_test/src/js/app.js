import {add, mul} from './module1';
import sum from './module2';
import data from '../json/data';
import '../less/test.less';
import '../less/test2.less';


console.log(add(3, 3));

console.log(add(10, 10));
console.log(mul(2, 4));
console.log(sum(3, 4, 5, 5, 6, 7));
console.log(data.name, data.age);
