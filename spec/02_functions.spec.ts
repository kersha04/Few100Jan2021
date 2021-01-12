describe('functions', () => {
    describe('parameters and overloading, etc.', () => {
        it('you cannot overload', () => {
            function formatName(first: string, last: string, mi?: string): string {
                let fullName = `${last}, ${first}`;
                //if (mi !== undefined) {
                if (mi) { //same thing as mi !=== undefined
                    fullName += ` ${mi}.`;
                }
                return fullName;
            }

            expect(formatName('Han', 'Solo')).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });

        it('default values for parameters', () => {
            function add(a: number = 2, b: number = 10): number {
                return a + b;
            }

            expect(add()).toBe(12);
            expect(add(20)).toBe(30);
            expect(add(undefined, 3)).toBe(5);
        });

        it('side-hikes "spread" operator...', () => {
            const starter = [1, 2, 3, 4, 5]

            //... takes the values from the array and spreads them through the new array
            const result = [0, ...starter, 6];
            expect(result).toEqual([0, 1, 2, 3, 4, 5, 6])

            const movie = {
                title: 'Inland Empire',
                director: 'Lynch',
                yearReleased: 2008
            }

            //warning - mutation
            movie.yearReleased = 2007;
            //we prefer to create new things over modification
            const movie2 = { ...movie, yearReleased: 2009 };
            expect(movie2).toEqual({
                title: 'Inland Empire',
                director: 'Lynch',
                yearReleased: 2009
            });

        });
        it('has arbitrary number of parameters', () => {
            //rest operator. takes 2 formal arguments, and add in w/e else you want
            function add(a: number = 2, b: number = 10, ...rest: number[]): number {
                const firstTwo = a + b;
                return rest.reduce((state, next) => state + next, firstTwo);
            }

            expect(add()).toBe(12);
            expect(add(20)).toBe(30);
            expect(add(undefined, 3)).toBe(5);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(55);
        });

        it('side-hike - truthy and falsy', () => {
            expect(true).toBeTruthy();
            expect(false).toBeFalsy();
            expect('').toBeFalsy();
            expect('tacos').toBeTruthy();
            expect(0).toBeFalsy();
            expect(-1).toBeTruthy();
            expect(undefined).toBeFalsy();
            expect(null).toBeFalsy();
        });
    });

    //takes func as an arg, returns a func, or both
    //describe is a function that takes a string as an argument, and arg 2 is a function () => {}
    describe('higher order functions', () => {
        it('making tags with just a normal old function', () => {
            // <element>content</element>
            // <h1>Hello World!</h1>
            function tagMaker(tag: string, content: string): string {
                return `<${tag}>${content}</${tag}>`;
            }

            expect(tagMaker('h1', 'Hello')).toBe('<h1>Hello</h1>');
            expect(tagMaker('h1', 'goodbye')).toBe('<h1>goodbye</h1>');
            expect(tagMaker('p', 'the story')).toBe('<p>the story</p>');
        });
        it('using an oop approach', () => {
            class TagMaker {
                private tag: string;
                constructor(tag: string) {
                    this.tag = tag;
                }

                make(content: string): string {
                    return `<${this.tag}>${content}</${this.tag}>`;
                }
            }

            const h1Maker = new TagMaker('h1');
            const pMaker = new TagMaker('p');

            expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
            expect(h1Maker.make('goodbye')).toBe('<h1>goodbye</h1>');
            expect(pMaker.make('the story')).toBe('<p>the story</p>');
        });
        it('this is what a functional programmer might do', () => {
            function tagMaker(tag: string): (content: string) => string {
                // "closure" - the function returned "closes around" the data that was used to create it.
                return (c) => `<${tag}>${c}</${tag}>`;
            }

            const h1Maker = tagMaker('h1');
            const pMaker = tagMaker('p');

            expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
            expect(h1Maker('goodbye')).toBe('<h1>goodbye</h1>');
            expect(pMaker('the story')).toBe('<p>the story</p>')
            expect(tagMaker('h3')('tacos')).toBe('<h3>tacos</h3>');
        });
        it('a function that takes a function as an argument', () => {
            function printTotal(message: string = 'has been paid', ...amounts: number[]): string {
                const total = amounts.reduce((state, next) => state + next); // for now, just a clever way to sum up an array.
                return `$${total} ${message}`;
            }

            expect(printTotal(undefined, 1, 2, 3)).toBe('$6 has been paid');
            expect(printTotal('Got yer money', 1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe('$45 Got yer money');

            function printTotal2(fn: (x: number) => string, ...amounts: number[]): string {
                const total = amounts.reduce((state, next) => state + next); // for now, just a clever way to sum up an array.
                return fn(total);
            }

            expect(printTotal2((x) => x.toString(), 1, 2, 3)).toBe('6');
            expect(printTotal2((y) => '***' + y + '***', 1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe('***45***');

            function doubleIt(num: number): string {
                return (num * 2).toString();
            }
            expect(printTotal2(doubleIt, 1, 2)).toBe('6');
        });
    });

    describe('array methods', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        it('has a way to just visit each element of an array without an (obvious) loop', () => {
            let i = 0;
            numbers.forEach((e) => expect(e).toBe(numbers[i++]));
        });

        describe('array methods that return new arrays', () => {
            it('filtering an array', () => {
                //where in LINQ
                const evens = numbers.filter((n) => n % 2 === 0)

                expect(evens).toEqual([2, 4, 6, 8]);
                expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

                const friends = ['Sean', 'Tim', 'Billy', 'Sue']
                //where in LINQ
                const shortNamedFriends = ['Sean', 'Tim', 'Billy', 'Sue'].filter(f => f.length <= 3);
                expect(shortNamedFriends).toEqual(['Tim', 'Sue']);

                const newFriends = friends.filter(f => f !== 'Billy');
                expect(newFriends).toEqual(['Sean', 'Tim', 'Sue']);
            });

            it('transform each element into a new thing for a new array', () => {
                //select in LINQ
                // 6 => 12, get from 6 to 12. the map, gets you where you wanna go
                function doubleIt(n: number) {
                    return n + n;
                }
                const doubled = numbers.map(n => n * 2);
                const doubleItFunction = numbers.map(doubleIt);
                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
                expect(doubleItFunction).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

                //can fall back on a loop if you need to, but these methods are emphasized because many of these are done behind the scenes
                //the state is stored in a giant js in memory, the data is the difference between users
                const answer = numbers
                    .filter(f => f % 2 === 0)
                    .map(f => doubleIt(f).toString());

                expect(answer).toEqual(['4', '8', '12', '16']);
            });
        });

        describe('array methods that return a single (scalar) value back', () => {
            it('check the membership of an array', () => {
                //LINQ all
                const allEven = numbers.every(n => n % 2 === 0) //hits one odd, and quits looking because this is false
                expect(allEven).toBeFalse();

                //LINQ any
                const anyEven = numbers.some(n => n % 2 === 0) //hits one true value and quits
                expect(anyEven).toBeTrue();
            });
            it('boiling down an array of things to one thing using reduce', () => {
                //reduce adds all of the values together
                //state is the first in the array. Next is the aggregate
                const total = numbers.reduce((state, next) => state + next);
                expect(total).toBe(45);

                //optional 3rd param that sets init of state
                const total2 = numbers.reduce((state, next) => state + next, 100);
                expect(total2).toBe(145);
            });
        });
    });
    describe('a couple of practices', () => {
        it('try this one on', () => {
            interface Vehicle {
                vin: string;
                make: string;
                model: string;
                mileage: number;
            }

            const vehicles: Vehicle[] = [
                { vin: '89888', make: 'Chevy', model: 'Bolt', mileage: 18_230 },
                { vin: '8389h3i38', make: 'Honda', model: 'Pilot', mileage: 52_123 },
                { vin: '7390399333', make: 'Ram', model: '1500', mileage: 83_238 }
            ];

            // our rule is a high-mileage vehicle is any vehicle with 50,000 or over.
            const highMileageVehicles = vehicles //all vehicles
                .filter(n => n.mileage > 50000) //all vehicles over 50k
                .map(n => `${n.make} ${n.model}`); //make and model

            expect(highMileageVehicles).toEqual(['Honda Pilot', 'Ram 1500']);
        });
        it('another practice', () => {
            interface Game {
                name: string;
                score: number;
            }

            const bowlingNight: Game[] = [
                { name: 'Jeff', score: 120 },
                { name: 'Stacey', score: 260 },
                { name: 'Henry', score: 110 },
                { name: 'Violet', score: 135 },
            ]

            interface BowlingSummary {
                highScore: number;
                highScorer: string;
                lowScore: number;
                lowScorer: string;
                totalNumberOfBowlers: number;
            }

            const initialState: BowlingSummary = {
                highScore: -1,
                highScorer: null,
                lowScore: 301,
                lowScorer: null,
                totalNumberOfBowlers: 0
            }

            const result = bowlingNight.reduce((state: BowlingSummary, next: Game) => {
                if (next.score > state.highScore) {
                    state.highScore = next.score;
                    state.highScorer = next.name;
                }
                if (next.score < state.lowScore) {
                    state.lowScore = next.score;
                    state.lowScorer = next.name;
                }
                state.totalNumberOfBowlers++;
                return state;
            }, initialState);

            expect(result).toEqual({
                highScore: 260,
                highScorer: 'Stacey',
                lowScore: 110,
                lowScorer: 'Henry',
                totalNumberOfBowlers: 4
            });


        })
    });
});
