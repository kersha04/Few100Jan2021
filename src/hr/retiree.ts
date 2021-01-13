import { Person } from "./person";

export class Retiree extends Person {
    private _pension = 100_000;

    constructor(public firstName: string, public lastName: string) { super(firstName, lastName) }

    get pension(): number {
        return this._pension;
    }
}