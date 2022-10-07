class Person{
    constructor(name=null,age=null){
        this.name = name;
        this.age = age;
    }
    toJSON(){
        const {name,age}=this
        return {name,age}
    }
    toString(){
        return JSON.stringify(this)
    }
}
const p1 = new Person('eliot',25)
console.log(p1.toJSON())
//匯出Person
export default Person;
export const a =10;
const f = a=>a*a ;
export {f}
