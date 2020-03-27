const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {
  it('should throw exception if input is not a number', () => {
    expect(() => exercise1.fizzBuzz('1')).toThrow();
  });

  it('should return FizzBuzz if input is divisible by 3 and 5', () => {
    const result = exercise1.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });

  it('should return Fizz if input is divisible by 3', () => {
    const result = exercise1.fizzBuzz(6);
    expect(result).toBe('Fizz');
  });
  
  it('should return Fizz if input is divisible by 5', () => {
    const result = exercise1.fizzBuzz(10);
    expect(result).toBe('Buzz');
  });
  
  it('should return input if input is not divisible by 3 and 5', () => {
    const result = exercise1.fizzBuzz(7);
    expect(result).toBe(7);
  });
});
