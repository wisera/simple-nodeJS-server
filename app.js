// Exercise //
// 1 //
// Spin up a Node.js-driven Server ( ON PORT 3000)
// 2 //
// Handle two routes: "/" and "/users"
// return some greeting text on "/"
// return a list of dummy users (e.g. <ul><li>User 1</li></ul>)
// 3 //
// add a form w/ a "username" <input> to the "/" page and submit a POST request to "/create-user" upon a button click
// add the "/create-user" route and parse the incoming data (i.e. the username) and simply log it to the console

const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req)
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Ola</title></head>')
        res.write('<body>Hello, add your username</body>')
        res.write('<form action="/create-user" method="POST"><input name="username">Submit</input></form>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/users') {
        res.write('<html>')
        res.write('<head><title>Users</title></head>')
        res.write('<body>Users</body>')
        res.write('<ul>')
        res.write('<li>User1</li>')
        res.write('<li>User2</li>')
        res.write('</ul>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/create-user' && method === 'POST') {
        const data = []
        req.on('data', (data_stream) => {
            console.log(data_stream)
            data.push(data_stream)
        })
        return req.on('end', () => {
            const parsedData = Buffer.concat(data).toString()
            console.log(parsedData)
            res.write('<html>')
            res.write('<head><title>DATA</title></head>')
            res.write(`<body>${parsedData}</body>`)
            res.write('<ul>')
            res.write('</html>')
            return res.end()
        })
    }
})

server.listen(3000)