let input = document.querySelector(".inputPath");
//input.value = "C:/Users/krinjich/notes";

let fileList = document.querySelector(".fileListUl");
//let fileListLl = document.querySelector(".fileListLi").addEventListener("click", childDir);
//let btnPath = document.querySelector(".btnRe").addEventListener("click", sendPath);

let header = new Headers();
header.append('Content-Type', 'application/json');


//input.value =
input.readOnly = true;

window.onload = function(){
  sendPath();
};

//console.log(input.value + " " + typeof(input.value));

function sendPath(event){

  fetch('http://localhost:3000/homeDir')
    .then(function(res){
      return res.text(); /**/
    })
    .then(function(text){
      console.log(text + " " + typeof(text));
      input.value = text;
      let body = { path: input.value };
      console.log(input.value);

      return fetch('http://localhost:3000/dirpath',{
              method: 'POST',
              headers: header,
              body: JSON.stringify(body)
            });
    })
    .then(function(res){
        return res.json();
    })
    .then(function(text){
        addDirs(fileList, text);
    });
};

let btnParent = document.querySelector(".btnParent").addEventListener("click", parentDir);

function parentDir(event){
  console.log("lastIndexOf '/' is " + input.value.lastIndexOf("/"));

  if(input.value.lastIndexOf("/") > 2){
    //input.value = input.value + "/";
    input.value = input.value.substring(0,input.value.lastIndexOf("/"));
  }else{
    input.value = input.value.substring(0,input.value.lastIndexOf("/")+1);
  }

  let body = { path: input.value };
  console.log('parentDir body =>', body);

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

function childDir(event){
  //console.log(event.target);
  console.log("lastIndexOf '/' is " + input.value.lastIndexOf("/"));
  const li = event.target;
  /*if(input.value.lastIndexOf("/") > 3){
    input.value = input.value.concat("/" + li.innerText);
  }else{
    input.value = input.value.concat(li.innerText);
  }*/
  input.value = input.value.concat("/" + li.innerText);
  let body = { path: input.value };

  //console.log(body);
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
    li.addEventListener("click", childDir);

    span.innerText = text[count];
    li.appendChild(span);
    li.id = newId;

    li.classList.add("fileListLi");

    newId++;

    fileList.appendChild(li);
    //console.log(span.innerText + "/push  " + li.id + "/ " + li.classList);
  }

};
