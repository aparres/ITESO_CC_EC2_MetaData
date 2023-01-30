const http = require('http');
const request = require('request');

const url_localIP = "http://169.254.169.254/latest/meta-data/local-ipv4"
var localIP = ""
request(url_localIP, function (error, response, body) {
	localIP = body
	console.log('LocalIP:', body);
});

const url_ami = "http://169.254.169.254/latest/meta-data/ami-id"
var amiID = ""
request(url_ami, function (error, response, body) {
        amiID = body
        console.log('amiID:', body);
});

const url_instanceType = "http://169.254.169.254/latest/meta-data/instance-type"
var instanceType = ""
request(url_instanceType, function (error, response, body) {
        instanceType = body
        console.log('Instance Type:', body);
});

const server = http.createServer((req,res) => {
	console.log('url:',req.url)
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	let html = "<html><header><title>Instance Info</title><header>"
	html = html + "<body><p> This script is running in a <b>"+instanceType+"</b> with AMI ID: <b>"+amiID+"</b> and the local IP Address is: <b>"+localIP+"</b>";
	res.end(html);
});

server.listen(80, (error)=>{
	console.log("server start")
});

