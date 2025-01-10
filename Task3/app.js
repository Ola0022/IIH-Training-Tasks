const http=require('http')
const fs=require("fs")
let data = "<h1><i>My name is Ola Bataineh</i></h1>";

const server=http.createServer((req,res)=>{
    fs.writeFile("myFile.txt", data, (err)=> {
        if (err) {
            res.writeHead(500,{"content-type":'text/plain'})
            res.end("sorry can not read from the server")
        } else {
            res.writeHead(200,{"content-type":'text/html'})
            res.end(data)
        }
    })    
})

const thePort=3000
theHost="127.0.0.1"
server.listen(thePort,theHost,()=>{
    console.log(`the server is running on the port ${thePort} and host ${theHost}`)
})
