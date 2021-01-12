import { Message } from '../src/message'

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

                //2) string concantenation/interpolation
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
                const stuff = []; //empty 'any' array. any - can take any type

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

                const luckyNumbers = [2, 9, 20, 108, 42];
                //luckyNumbers[7] = 'a number'; //nope

                const both: (string | number)[] = [1, 2, 3, 'birds'];

                const both2: Array<string | number> = [1, 2, 'cats']; // no one really does this

                expect(both[0]).toBe(both2[0]);
            });
            //aliases give an alternative name to a data type
            it('type aliases', () => {
                type ThingWithLettersAndStuff = string;
                const myName: ThingWithLettersAndStuff = 'NotJeff';

                type unionA = string | number;

                //kind of like an enum, which is also a ts thing (below), but more frequent because it will generate less js code
                type MorseCode = 'dot' | 'dash';

                //const someDot: MorseCode = 'do';, needs to be dot or dash only
                const someDot: MorseCode = 'dot';
                const message: MorseCode[] = ['dot', 'dot', 'dot', 'dash', 'dash', 'dash', 'dot', 'dot', 'dot']

                enum SeatType { Window, Aisle, Middle };
                const mySeat: SeatType = SeatType.Window;

                //aliased type still points back to type of string
                expect(typeof (someDot)).toBe('string');
            });

        });
        describe('tuple types', () => {
            it('basic syntax', () => {
                //tuple type states what type each index of the array like thing has to be
                type Musician = [string, string, number, string];

                const warren: Musician = ['Warren', 'Ellis', 58, 'Guitar']

                const firstName = warren[0];
                expect(typeof (firstName)).toBe('string');

                const lastName = warren[1];
                expect(typeof (lastName)).toBe('string');

                const age = warren[2];
                expect(typeof (age)).toBe('number');

                const instrument = warren[3];
                expect(typeof (instrument)).toBe('string');
            });
        });
        describe('an example', () => {



            it('first an OOP would do it this way', () => {



                // names are formatted as last, first
                // string FormatName(string first, string last) { .. }
                function formatName(first: string, last: string): { fullName: string, numberOfLetters: number } {
                    const name = `${last}, ${first}`;
                    return {
                        fullName: name,
                        numberOfLetters: name.length
                    }
                }

                // expect(formatName('Han', 'Solo')).toBe('Solo, Han');
                const result = formatName('Han', 'Solo');
                expect(result.fullName).toBe('Solo, Han');
                expect(result.numberOfLetters).toBe(9);
            });
            it('Here is how you might do it with a tuple type', () => {



                function formatName(first: string, last: string): [string, number] {
                    const name = `${last}, ${first}`;
                    return [name, name.length];
                }

                const result = formatName('Han', 'Solo');
                expect(result[0]).toBe('Solo, Han');
                expect(result[1]).toBe(9);
            });
        });
        describe('destructuring', () => {
            it('has object destructuring', () => {
                const dataFromApi = { name: 'Bob Smith', phone: '555-1212', age: 52, eyeColor: 'blue' };

                const fullname = dataFromApi.name;
                const phoneNumber = dataFromApi.phone;

                expect(fullname).toBe('Bob Smith');
                expect(phoneNumber).toBe('555-1212');

                //can do this same thing shorthand
                const { name, phone } = dataFromApi;
                expect(name).toBe('Bob Smith');
                expect(phone).toBe('555-1212');

                //can redeclare the variable name as well
                const { name: fname, phone: phoneNum } = dataFromApi;
                expect(fname).toBe('Bob Smith');
                expect(phoneNum).toBe('555-1212');
            });
            it('has array destructuring', () => {
                type Musician = [string, string, number, string];

                const warren: Musician = ['Warren', 'Ellis', 58, 'Guitar']
                const nick: Musician = ['Nick', 'Cage', 63, 'Singer']

                const firstName = warren[0];
                //this is a tuple destructured
                //slap a comma if you don't want that data, in this case, we don't want the first name data
                //just stop if you don't want anything after, for example, don't want instrument or anything after -> const [, lastName, age] = warren;
                const [, lastName, age, instrument] = warren;
                //is basically the same as
                //const lastName = warren[1];
                //const age = warrent[2];

                expect(typeof (firstName)).toBe('string');

                //const lastName = warren[1];
                expect(typeof (lastName)).toBe('string');

                //const age = warren[2];
                expect(typeof (age)).toBe('number');

                //const instrument = warren[3];
                expect(typeof (instrument)).toBe('string');

                function tupleMusician(who: Musician): [string, string] {
                    //a destructured array
                    const [firstName, , , instrument] = who;

                    return [firstName, instrument];
                }

                let tupleResult = tupleMusician(warren);
                expect(tupleResult[0]).toBe('Warren');
                expect(tupleResult[1]).toBe('Guitar');

                tupleResult = tupleMusician(nick);
                expect(tupleResult[0]).toBe('Nick');
                expect(tupleResult[1]).toBe('Singer');

                function objectMusician(who: Musician): { firstName: string, instrument: string } {
                    //a destructured array
                    const [fName, , , musicalTalent] = who;

                    //return { fName, musicalTalent }; //works just as well
                    return { firstName: fName, instrument: musicalTalent };
                }

                let objectResult = objectMusician(warren);
                expect(objectResult.firstName).toBe('Warren');
                expect(objectResult.instrument).toBe('Guitar');

                objectResult = objectMusician(nick);
                expect(objectResult.firstName).toBe('Nick');
                expect(objectResult.instrument).toBe('Singer');
            });
        });
        describe('object literals', () => {
            it('a few details', () => {

                //this is an object. we can create an interface off this by hovering over the variable name, and copying the types
                const aSong = {
                    title: 'Renegades of Funk',
                    artist: 'Rage Against the Machine',
                    lastPlayed: 'This morning',
                    numberOfSecondsLong: 333
                }

                //describes the shape of an object. if you say you're a song, you must have these things
                //these are not used by the javascript, just by the compiler to make sure we aren't doing dumb things.
                //this isn't generated to the js
                //this can also be used like c# where a class will implement it rather than just to keep objects in line
                interface Song {
                    title: string;
                    artist: string;
                    lastPlayed: string;
                    numberOfSecondsLong: number;
                    yearReleased?: number; //optional
                }

                //this is an object created without a class.
                const song: Song = {
                    title: 'Renegades of Funk',
                    artist: 'Rage Against the Machine',
                    lastPlayed: 'This morning',
                    numberOfSecondsLong: 333
                }

                const song2: Song = {
                    title: 'This Magic Moment',
                    artist: 'Lou Reed',
                    lastPlayed: 'This morning',
                    numberOfSecondsLong: 128,
                    yearReleased: 1998
                }

                expect(song.lastPlayed).toBe('This morning');//dot notation (most common)
                expect(song['lastPlayed']).toBe('This morning');//indexer notation, lesser used of the two

                doSomethingWithASong(song);
                doSomethingWithASong(song2);
                function doSomethingWithASong(s: Song): void {
                    //but do I actually do something with a song? nope
                };
            });
            //anon interface {from: string, message: string}, can always just define it
            it('duck typing - aka structural typing', () => {
                // this is the anon version of the function. 
                // function logInfo(message: { from: string, message: string }) {
                //     console.log(`Logging: ${message.from}: message: ${message.message}`)
                // }
                //using Message from message.ts, which we had to import. can ctrl+., or click lightbulb, or intellisense
                function logInfo(message: Message) {
                    console.log(`Logging: ${message.from}: message: ${message.message}`)
                }
                //const phoneCall = { from: 'Mom', message: 'Call me back!' }
                const phoneCall: Message = { from: 'Mom', message: 'Call me back!' }
                logInfo(phoneCall);

                const email = { from: 'Joe', subject: 'Lunch', msg: 'Cancelled' };
                //logInfo(email); nope, not gonna work because different properties

                interface TimeOffRequest { employeeId: Number, startDate: string, endDate: string };
                function assignTimeOff(who: TimeOffRequest) {
                    //who.employeeId
                    //who.startDate
                    //who.endDate
                }
                assignTimeOff({ employeeId: 99, startDate: 'tomorrow', endDate: 'next thursday' })
            });
        });
    });
    describe('function literals', () => {
        it('has three ways to create them', () => {
            expect(add(10, 2)).toBe(12);

            //named function. This is hoisted to the top, so can be used prior to being declared
            function add(a: number, b: number): number {
                return a + b;
            }

            //anonymous functions, old school way, sorry, skool*, must be declared prior to being used
            const subtract = function (a: number, b: number): number {
                return a - b;
            }

            //new kid way of doing the anonymous
            const multiply = (a: number, b: number): number => a * b;
            const divide = (a: number, b: number): number => {
                if (b === 0) {
                    throw 'Are you trying to open a black hole?!?!?! - you divided by zero, sir/ma\'am';
                } else {
                    return a / b;
                }

            }
            expect(add(10, 2)).toBe(12);
            expect(subtract(10, 2)).toBe(8);
            expect(multiply(10, 2)).toBe(20);
            expect(divide(10, 2)).toBe(5);
        });


    });
});
