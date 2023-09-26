// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#task' ),
  json = { yourname: input.value },
  body = JSON.stringify( json )

  const todo_task = {
    task: document.querySelector( '#task' ).value,
    due: document.querySelector( '#due' ).value
  }    
 
 const response = await fetch( '/submit', { //wait for server to send response to /submit
    method:'POST',
    body: JSON.stringify(todo_task) //stringify to send to server
  })

  const data = await response.json() //convert response from server to json object
  console.log(data) //see what server is sending back to you

  const list = document.createElement('ul')

  const li = document.createElement('li')
      li.innerText = body
      list.appendChild( li )

//next thing to do: 
  //look at const models = data struct thing and retrieve data from server to print
  
  //make a list <ul>
  //loop through the array
  //for each item in array, add an li
  //fill li with data from item
  //append list to page

  //once thats done, add button that says delete for each item 

  //meet at 3 on mondays
  //move to glitch


  

document.body.appendChild( list )

}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}