//匯入Person,{a}
// import Person,{a,f} from './Person.mjs'
const {Person ,a,f} = require('./Person.js');

const p2 = new Person("mao",25)

console.log(p2.toJSON())
console.log({a})
console.log(f(80))