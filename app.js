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

const http = require('http') // imports http core module

const server = http.createServer((req, res) => { // this method spins up a nodeJS server. Its argument is a callback function w/ 2 args, the user request and server response
    console.log(req) // logs all client request info
    const url = req.url // stores request url inside url const
    const method = req.method // stores request method inside method const

    if (url === '/') {
        res.write('<html>') // write method outputs a reponse, in this case a html doc
        res.write('<head><title>Ola</title></head>')
        res.write('<body>Hello, add your username</body>')
        res.write('<form action="/create-user" method="POST"><input name="username">Submit</input></form>') // notice the action= inside form html tag, that redirects to the indicated url w/ a POST method
        res.write('</html>')
        return res.end() // return keyword so it doesn't execute the rest of the code
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
    if (url === '/create-user' && method === 'POST') { // logic after submitting the form
        const data = [] // empty array to populate data from the form w/
        req.on('data', (data_stream) => { // .on() method is an event listener, its first arg is what type of event to listen to
            console.log(data_stream) // the second arg is a callback function, in this case the arg is the data stream from the submitted form
            data.push(data_stream) // push() method populates the empty array w/ data stream from the submitted form
        }) // Remember you can't interact w/ the data until you buffer it
        return req.on('end', () => { // calls a listener for the end of the data stream
            const parsedData = Buffer.concat(data).toString() // buffer constructor parses the data, making it interactable, the concat method populates the array w/ human readable data
            console.log(parsedData)
            res.write('<html>')
            res.write('<head><title>DATA</title></head>')
            res.write(`<body>${parsedData}</body>`) // just for fun added the input to the screen
            res.write('<ul>')
            res.write('</html>')
            return res.end()
        })
    }
})

server.listen(3000) // localhost:PORT in this case 3000, so the server is live on port 3000