var request = require('request');

request("https://www.naver.com/", function(error, response, body) {
	if(error) {
		console.log("Something went wrong!!!!!");
		console.log(error);
	} else {
		if(response.statusCode == 200) {
			console.log(body);
		} else {
			console.log("it's not 200");
			console.log(response.statusCode);
		}
	}
})


