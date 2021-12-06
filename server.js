const http = require('http')
const fs = require('fs')
const qs = require('querystring')

const true_code = 7818
var code

const server = http.createServer((req, res) => {
    var url = req.url;

    console.log(url);

    if(url == '/' || url == '/login.html') {
        url = '/login.html';
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname + url));
    }
    else if(url == '/login_process') {
        if(req.method == 'POST') {
            var body = '';

            req.on('data', (data) => {
                body = body + data;
            });
            req.on('end', () => {
                var post = qs.parse(body);
                const obj = JSON.parse(JSON.stringify(post));
                var keys = Object.keys(obj);
                code = obj[keys[0]];
                console.log(code);

                if(code == true_code) {
                    res.write("<script>alert('PASS!')</script>");
                    console.log("pass");
                    res.write("<script>window.location=\"http://localhost:8080/Planner.html\"</script>");
                }
                else {
                    res.write("<script>alert('FAIL... Please Retry.')</script>");
                    console.log("fail");
                    res.write("<script>window.location=\"http://localhost:8080/login.html\"</script>");
                }
            });
        }
    }
    else if(url == '/login_style.css') {
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname + url));
    }
    else if(url == '/favicon.ico') {
        res.writeHead(404);
    }
    else if(url == '/Planner.html') {
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname + url));
    }
    else if(url == '/lib/main.css' || url == '/lib/main.js' || url == '/lib/locales/ko.js') {
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname + url));
    }
    else {
        console.log("worng url");
        response.writeHead(404);
        res.end();
    }
})

server.listen(8080)

server.on('listening', () => {
    console.log("server is running on 8080 port.")
})

server.on('error', (error) => {
    console.log(error)
  })