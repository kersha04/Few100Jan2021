export class Person {
    constructor(public firstName: string, public lastName: string) { }

    get fullName(): string {
        return `${this.lastName}, ${this.firstName}`;
    }
}