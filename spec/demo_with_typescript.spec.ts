

describe('writing specs in typescript', () => {
    it('is easy', () => {
        expect(true).toBe(true);
    });

    it('can add two numbers', () => {
        const a = 10;
        const b = 20;

        const answer = a + b;

        expect(answer).toBe(30);
    })
});

describe('give it a name', () => {

    it('this is a spec', () => {
        const donovan = 'The Peoples Jones';

        expect(donovan).toBe('The Peoples Jones');
    });
});
