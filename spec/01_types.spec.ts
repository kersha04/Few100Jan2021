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