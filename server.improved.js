const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const todos = [
  { 'task': 'toyota', 'due': '09/14/2023' },
]

const server = http.createServer( function( request,response ) { //what function do you wanna call whenever the client makes a request to the server
  if( request.method === 'GET' ) { //4 built in methods to http servers -= POST, GET, DELETE, PUT
    handleGet( request, response )     //fetch looks at currently loadaed page, sends input as client request (only runs on client)
  }else if( request.method === 'POST' ){ //GET is the default when trying to load a page
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) { //nothing extra in the url
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  }) //this part mashes received data together (handles if it gets split into different packages)

  request.on( 'end', function() {
    //get data that's been sent up to server
    //parse (convert stringified data back to js object)
    //push back to appdata array
    todos.push(JSON.parse(dataString))
    

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' }) //changed from response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify( todos )) //changed from response.end('test')
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
