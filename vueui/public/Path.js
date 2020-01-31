let input = document.querySelector(".inputPath");
input.value = "C:/Users/krinjich/notes";
input.readOnly = true;

let btnPath = document.querySelector(".btnRe").addEventListener("click", sendPath);

const body = { path: input.value };
console.log(body);
function sendPath(){

  fetch('http://localhost:3000/dirpath',{
    method: 'POST',
    body: JSON.stringify(body),
    header: {
        'Content-Type': 'application/json;',
      },
  }).then(function(res){
    //받아온 목록 리스트로 추가
    res.text().then(text => console.log(text));

  });
};
/*sendPath().then(fetch('/dirpath').then(function(){
  //받아온 목록 리스트로 추가
});)*/
//path를 서버로 전달
