const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./index.html', 'UTF-8').pipe(res);
    } else if (req.url === '/message') {
        let body =" ";
        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            res.writeHead(200, {'Content-Type': 'text/html'});

            fs.writeFile('message.txt', body, function (err) {
                if (err) throw err;
                console.log('It\'s saved! in same location.');
            });
            res.end(body);
        });
    }
});
server.listen(3000, () => console.log('server running on port 3000...'));
