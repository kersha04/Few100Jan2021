import { Person } from "./person";

export class Employee extends Person {
    // public firstName: string;
    // public lastName: string;
    // public department: string;

    // constructor(firstName: string, lastName: string, department: string){
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.department = department;
    // }

    //most private fields prefixed with an underscore
    private _salary: number = 100_000;
    //this is the same thing as declaring a bunch of properties, and then assigning to them in the constructor (as above)
    constructor(public firstName: string, public lastName: string, public department: string) { super(firstName, lastName) }

    get salary(): number {
        return this._salary;
    }

    giveRaise(amount: number): void {
        this._salary += amount;
    }
}