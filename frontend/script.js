//1.select DOM ELEMENTS
//2.Event Listeners or Onclick
//3.functions


const title = document.getElementById("title");
const content = document.getElementById("content");


//creating notes (POST)
function add() {
  fetch('http://localhost:8008/notes/create', {
  method: 'POST',
  body: JSON.stringify({
    title: title.value,
    description: content.value,
  
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    document.getElementById("mainDiv").innerHTML += `
    <div class="card">
        <h1>
        ${title.value}
        </h1>

        <p> ${content.value}
        </p> 
            <button>DELETE</button>
            <button>EDIT</button>
    </div>
    `;

  title.value = "";
  content.value = "";
  read();
  })


  //console.log(inputTitle,inputContent);
}


//read notes(GET)
function read() {
  fetch('http://localhost:8008/notes/get')
  .then((response) => response.json())
  .then((json) => 
  {
    console.log(json.notes);
    document.getElementById('mainDiv').innerHTML= "";
    for(let i = 0;i<json.notes.length;i++ )
  {
    document.getElementById("mainDiv").innerHTML += `
    <div class="card">
      <h1>
      ${json.notes[i].title}
      </h1>

        <p> ${json.notes[i].description}
        </p>  
        <button onclick="deleteNote('${json.notes[i]._id}')">DELETE</button>
        <button onclick="getNote('${json.notes[i]._id}')">EDIT</button>
          
     </div>
    `;

  }


  
  
  }
  
  );
}
read();

//delete (DELETE)
function deleteNote (id) {
  //console.log(id);
  fetch(`http://localhost:8008/notes/delete/${id}`, {
    method: 'DELETE',
  });
  read();
}

function getNote(id) {
  fetch(`http://localhost:8008/notes/get/${id}`)
  .then((response) => response.json())
  .then((json) => {
   console.log(json.notes);
   title.value = json.notes.title;
   content.value = json.notes.description;
  }
  )
  document.getElementById('editButton').setAttribute('onclick',`updateNote('${id}');`)

  

}
function updateNote(id){
  // console.log(id);
  

  fetch(`http://localhost:8008/notes/update/${id}`,{
  method: 'PUT',
  body: JSON.stringify({
  title:title.value,
  description:content.value
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    title.value = "";
  content.value = "";
read();
  }
  )

}

