const FizzBuzz = (num) => {
  if (num === 0) return num;
  if (num % 3 === 0 && num % 5 === 0) return 'FizzBuzz';
  if (num % 3 === 0) return 'Fizz';
  if (num % 5 === 0) return 'Buzz';

  return num;
};

const bla = () => 'boo';

export default FizzBuzz;
