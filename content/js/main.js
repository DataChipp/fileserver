const userAction = async () => {
	/*
	const response = await fetch('http://localhost:7071/api/items/dev/part1', {
		method: 'POST',
		body: JSON.stringify({ 'num1': parseInt(num1.value), 'num2': parseInt(num2.value) }),
		headers: { 'Content-Type': 'application/json' }
	});
	*/
	const response = await fetch('http://penguin.linux.test:7071/api/chipps/dev/part1', {
		method: 'GET'
	});
	
	const data = await response.json(); //extract JSON from the http response

	console.log("data: " + JSON.stringify(data));

	document.getElementById("result").innerHTML = JSON.stringify(data);
}

document.getElementById("myBtn").onclick = function () { 
	userAction();    
};







