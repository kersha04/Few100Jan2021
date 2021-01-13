//this is referred to as a barrel. This will help clean up import statments by using the magic file index.ts
// create an index.ts, and export anything a user might want from that directory, in this case hr folder

//export other files stuff
export * from './retiree';
export * from './employee';

//export it's own stuff
export const isEven = (num: number) => num % 2 === 0;
