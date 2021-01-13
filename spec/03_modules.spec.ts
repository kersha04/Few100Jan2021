// importing these one by one can get long - 
// import { Employee } from "../src/hr/employee";
// import { Retiree } from "../src/hr/retiree";

// or can use a magic file name = index, and combine the exports from that file, and consume from the index.ts, or 'barrel' 
import { Employee, Retiree, isEven } from "../src/hr";

describe('modules and stuff', () => {
    it('using a module to hose a class', () => {
        const bob = new Employee('Bob', 'Smith', 'IT');

        expect(bob.firstName).toBe('Bob');
        expect(bob.lastName).toBe('Smith');
        expect(bob.fullName).toBe('Smith, Bob');

        bob.firstName = 'Robert';
        expect(bob.firstName).toBe('Robert');
        expect(bob.fullName).toBe('Smith, Robert');

        expect(bob.department).toBe('IT');
        expect(bob.salary).toBe(100_000);
        bob.giveRaise(1000);
        expect(bob.salary).toBe(101_000);

    });

    it('creating a retiree', () => {
        const bob = new Retiree('Bob', 'Smith');

        expect(bob.firstName).toBe('Bob');
        expect(bob.lastName).toBe('Smith');
        expect(bob.fullName).toBe('Smith, Bob');

        bob.firstName = 'Robert';
        expect(bob.firstName).toBe('Robert');
        expect(bob.fullName).toBe('Smith, Robert');

        expect(bob.pension).toBe(100000);
    });


});