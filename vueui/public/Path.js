let input = document.querySelector(".inputPath");
input.value = "C:/Users/krinjich/notes";
input.readOnly = true;

let fileList = document.querySelector(".fileListUl");
//let fileListLl = document.querySelector(".fileListLi").addEventListener("click", childDir);

let btnPath = document.querySelector(".btnRe").addEventListener("click", sendPath);

let header = new Headers();
header.append('Content-Type', 'application/json');


function sendPath(){
  let body = { path: input.value };
  fetch('http://localhost:3000/dirpath',{
    method: 'POST',
    headers: header,
    body: JSON.stringify(body)
  }).then(function(res){
    res.json().then(function(text){
      addDirs(fileList, text);
    });
  });
};

let btnParent = document.querySelector(".btnParent").addEventListener("click", parentDir);

function parentDir(){
  //console.log("lastIndexOf '/' is " + input.value.lastIndexOf("/"));
  input.value = input.value.substring(0,input.value.lastIndexOf("/"));

  if(input.value.lastIndexOf("/") < 2){
    input.value = input.value + "//";
  }

  let body = { path: input.value };
  console.log(body);

  fetch('http://localhost:3000/dirpath',{
    method: 'POST',
    headers: header,
    body: JSON.stringify(body)
  }).then(function(res){
    res.json().then(function(text){
      addDirs(fileList, text);
    });
  });
}

function childDir(){
 input.value = input.value.concat(span.innerText);

 fetch('http://localhost:3000/dirpath',{
   method: 'POST',
   headers: header,
   body: JSON.stringify(body)
 }).then(function(res){
   res.json().then(function(text){
     addDirs(fileList, text);
   });
 });
}

function addDirs(fileList, text){
  let newId = 0;

  if(fileList!==null){
    while(fileList.firstChild){
      fileList.removeChild(fileList.firstChild);
    }
  }
  for (var count in text){

    const li = document.createElement("li");
    const span = document.createElement("span");

    span.innerText = text[count];
    li.appendChild(span);
    li.id = newId;
    li.class = "fileListLi";

    newId++;

    fileList.appendChild(li);

    //console.log(span.innerText + "/ " +li.id +li.class);
  }

};
