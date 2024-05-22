var nameInput = document.querySelector("#nameInput");
var urlInput = document.querySelector("#urlInput");
var addBtn = document.querySelector("#addBtn");
var updateBtn = document.querySelector("#updateBtn");
var deletaBtn = document.querySelector("#deletaBtn");
var serch = document.querySelector("#serch");



if (localStorage.content != null) {
    content = JSON.parse(localStorage.content);

} else {
    content = [];

}

addBtn.addEventListener("click", function () {

    var links = {
        name: nameInput.value,
        url: urlInput.value
    }
    content.push(links);
    display();
    localStorage.setItem("content", JSON.stringify(content));
clear()
count()
})

var total;
function display() {
    cartona = "";

    for (var i = 0; i < content.length; i++) {
        cartona += `
        <tr>
        <th scope="row">${i}</th>
        <td>${content[i].name}</td>

        <td><a href="${content[i].url}" target="_blank"><button class="btn btn-info")">view</button></a></td>
        <td><button class="btn btn-danger" onclick="deletItem(${i})">Delete</button></td>
        <td><button class="btn btn-success" onclick="updateItem(${i})">Update</button></td>
        </tr>
        <tr>
        `
        total=i;
        document.querySelector("tbody").innerHTML = cartona;
    }
}
display();


function deletItem(i){
    content.splice(i,1);
    localStorage.content = JSON.stringify(content);
    display()
    location.reload();
}

function clear() {
    nameInput.value=null;
    urlInput.value=null;
}
var indexUpdate ;

function updateItem(i) {

    nameInput.value = content[i].name ;
    urlInput.value = content[i].url ;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
 indexUpdate = i;
    
}
updateBtn.addEventListener("click", function () {

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    content[indexUpdate].name = nameInput.value;
    content[indexUpdate].url = urlInput.value;
    display()
    clear()

});

deletaBtn.addEventListener("click",function () {
    content=[];
    // content.splice(0);
    localStorage.clear();
    display()
    location.reload();
})
function count() {
    if (content.length > 0) {
        deletaBtn.classList.remove("d-none");
        deletaBtn.innerHTML = `Delete All (${total})`;
    }
}
count()

serch.addEventListener("input", function() {
    var term = serch.value;
    cartona="";
    for(var i =0;i<content.length;i++){
        if (content[i].name.toLowerCase().includes(term.toLowerCase())) {
          cartona+=`
          <tr>
          <th scope="row">${i}</th>
          <td>${content[i].name}</td>
  
          <td><a href="${content[i].url}" target="_blank"><button class="btn btn-info")">view</button></a></td>
          <td><button class="btn btn-danger" onclick="deletItem(${i})">Delete</button></td>
          <td><button class="btn btn-success" onclick="updateItem(${i})">Update</button></td>
          </tr>
          <tr>
          `
        }
        
    }
    document.querySelector("tbody").innerHTML = cartona;
});
