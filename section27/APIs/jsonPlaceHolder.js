
// var request = require('request');

// request("https://jsonplaceholder.typicode.com/users/1", function(error, response, body) {
// 	if(!error && response.statusCode == 200) {
// 		var parsedData = JSON.parse(body);
// 		// Through `${}`, we can call the variable. 
// 		console.log(`${parsedData.name} live in ${parsedData.address.city}`);
// 		// console.log(parsedData["username"]); or you can use the below
// 		console.log(parsedData.username);

// 	} else {
// 		console.log(error);
// 	}
// })

const request = require('request');

request("https://jsonplaceholder.typicode.com/users/1", (error, response, body) => {
	if(!error && response.statusCode == 200) {
		const parsedData = JSON.parse(body);
		// Through `${}`, we can call the variable. 
		console.log(`${parsedData.name} live in ${parsedData.address.city}`);
		// console.log(parsedData["username"]); or you can use the below
		console.log(parsedData.username);

	} else {
		console.log(error);
	}
})