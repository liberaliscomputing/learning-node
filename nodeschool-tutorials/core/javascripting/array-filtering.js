// Define an array of numbers
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter if even
var filtered = numbers.filter(function evenNumbers (number) {
	return number % 2 === 0;
});

// Print the filtered array
console.log(filtered);
