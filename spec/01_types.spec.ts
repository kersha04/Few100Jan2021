//no browser supports typescript. The typescript compiles out to javascript for the browser to run on
//describe is context for a group of tests (its)
//it is a test
//behavior driven development, 'describe' this thing. 'it' can blah blah blah

//xdescribe - skips the describe from running
//xit skips the single test
//fit runs only that test

//semi-colons are optional, but omitting them can cause problems. TS lint will add them to your source code

describe('variables and types in TypeScript', () => {
    it('untyped variables', () => {
        //var is considered deprecated, but still supported. Use let instead
        let x;

        x = 12;
        expect(x).toBe(12);
        expect(typeof (x)).toBe('number');

        x = 'tacos';
        expect(x).toBe('tacos');
        expect(typeof (x)).toBe('string');
    });

    it('typed variables', () => {
        //this can be any type. If we want to enforce type, like typescript
        let x: number;

        x = 12;
        /*incorrect type, will not compile
        typescriptVar = 'oops'; */
        expect(x).toBe(12);
        expect(typeof (x)).toBe('number');

        //union type, can be either of these thingies - 
        let y: number | string; // union type

        y = 'number';
        expect(y).toBe('number');
        expect(typeof (y)).toBe('string');

        y = 12;
        expect(y).toBe(12);
        expect(typeof (y)).toBe('number');

        //y = { name: 'bob' } object is not a number or string

    });

    it('initializing with let', () => {
        let x = 12; //initialized

        expect(x).toBe(12);
        expect(typeof (x)).toBe('number');

        //let x = 'bird'; //this isn't going to work. Initializing with let is the equivalent of let x:number = 12, but that will make you look like a dork, so drop number
        //let x:number | string = 12; //this can be done as union 
    });

    describe('constants', () => {
        it('has a const keyword', () => {
            const PI = 3.1415;

            //PI = 3.14 // nope, not gonna work because it's a const. Stop being silly. use const if you declare, and never change it 
            expect(PI.toPrecision(3)).toBe('3.14');
        });
        it('does not change underlying type', () => {
            const friends = ['Sean', 'Amy', 'David', 'Sarah'];
            //friends = [] // not gonna work, arr is a const
            //can change out members, though
            friends[0] = 'Josh';

            const ep4 = { title: 'A New Hope', yearReleased: 1978 }
            //ep4 = {}; // nope
            ep4.yearReleased = 1977;
            expect(ep4).toEqual({ title: 'A New Hope', yearReleased: 1977 });
        });
    });

    //Don't use var. Use let instead. var's scope is jacked up
    it('what is so wrong with the var keyword anyhow', () => {
        //var doesn't have block scope. notice message is being used outside of the if/else scope. 
        const age = 22;

        if (age > 21) {
            var message = 'Old Enough';
        } else {
            var message = "Too Young";
        }

        expect(message).toBe('Old Enough');
    });

    it('the right way to do this by not using var', () => {
        const age = 22;

        let message: string;
        if (age > 21) {
            message = 'Old Enough';
        } else {
            message = "Too Young";
        }

        expect(message).toBe('Old Enough');
    });

    it('the Jeff way from the last 2', () => {
        const age = 22;

        const message = age >= 21 ? 'Old Enough' : 'Too Young'; //ternary operator

        expect(message).toBe('Old Enough');
    });

    describe('literals in typescript', () => {
        describe('it has numbers', () => {
            it('some examples', () => {
                let sample: number; //this is typescript, if we don't have number here, it's javascript
                sample = 12;
                sample = 10.1;
                sample = 0xff; //base 16 - Hexadecimal
                sample = 0o22; //base 8 - Octal, don't use this a bunch
                sample = 0b10101010; //base 2, binary
                sample = 123_456_789_012; //can use underscores! gd weird

                expect(sample).toBe(123456789012);

                sample = parseFloat('133.23');
                expect(sample).toBe(133.23);

                sample = parseInt('133.23'); //truncates value
                expect(sample).toBe(133);
            });
            describe('string literals', () => {
                //js doesn't care if they are single or double quotes for strings. prog angular folks just decided we should use single
                it('delimiting strings', () => {
                    const myName = "NotJeff";
                    expect(myName).toBe('NotJeff');

                    //escape char is \
                    const name = 'Flannery O\'Conner';
                    const dialog = "He said \"How's it going?\" to a stunned audience";

                });

                it('template strings', () => {
                    const s1 = `This is a String`; // backtick. These have superpowers

                    //could just backtick around everything, but prog prefers single quotes
                    //1) line breaks
                    const story = `Chapter 1. 
                        It was a dark and stormy night. 
                        THE END`;

                    //2) string concantenation
                    const name = 'Bob';
                    const job = 'DEV';

                    const info1 = 'The name is ' + name + ' and the job is ' + job;
                    const info2 = `The name is ${name} and the job is ${job}`;

                    expect(info1).toBe(info2);
                });

            });
            //arrays are more flexible in js than c#. Automatically grows. Can index out of order. any index not defined will come back as undefined
            describe('array literals', () => {
                it('has them', () => {
                    const stuff = [];

                    stuff[0] = 'Birds';
                    expect(stuff[0]).toBe('Birds');
                    expect(stuff).toEqual(['Birds']);

                    stuff[1] = 3.1415;
                    stuff[2] = stuff; // that index is the array. wtf?
                });
                it('declaring typed arrays', () => {
                    const stuff: string[] = [];
                    stuff[0] = 'Birds';
                    //stuff[1] = 2; //nope

                    //unlike the explicit typing above, number[] is required here 
                    const luckyNumbers = [2, 9, 20, 108, 42];
                    //luckyNumbers[7] = 'a number'; //nope

                    const both: (string | number)[] = [1, 2, 3, 'birds'];

                    const both2: Array<string | number> = [1, 2, 'cats']; // no one really does this

                    expect(both[0]).toBe(both2[0]);
                });


            });

        });
    });

});