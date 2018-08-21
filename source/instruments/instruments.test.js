import {sum, delay, getUniqueID, getFullApiUrl } from "./index";

describe('instruments:',() =>{
    test('sum function should add two numbers', () =>{
        expect(sum(2, 2)).toBe(4);
        expect(sum(1, 3)).toBe(4);
    });

    test('should throw when colled with NAN as first argument ', () =>{
        expect(() => sum ('hello')).toThrow();
    });

    test('should throw when colled with NAN as first argument and NAN at the second argument', () =>{
        expect(() => sum (2, 'hello')).toThrow();
    });

    test('delay function should return a resolved promise', async() =>{
        await expect(delay()).resolves.toBe('success')
    });

    test('shold be correct length', () =>{
        expect(getUniqueID(5)).toHaveLength(5);
    });
    test(' length shold be = 15 by default', () =>{
        expect(getUniqueID()).toHaveLength(15);
    });
    test('getUniqueID', () =>{
        expect(() => getUniqueID('666')).toThrow();
    });

    test('getFullApiUrl', () =>{
        expect(() => getFullApiUrl(6)).toThrow();
    });

    test('getFullApiUrl', () =>{
        expect(getFullApiUrl('www.example.com', 'test')).toBe('www.example.com/test');
    });
});



