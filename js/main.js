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
//add function

addBtn.addEventListener("click", function () {
    if (nameInput.value === "" || urlInput.value === "" || nameInput.classList.contains("is-invalid") || urlInput.classList.contains("is-invalid")){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a name and a URL for the link.',
        });
        
        return;
    }else{
        let timerInterval;
        Swal.fire({
          title: "The link has been added successfully",
          html:`link Name <span class="bg-success text-white fw-bold p-2">${nameInput.value}</span>`,
          timer: 1200,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
    }
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
//*****************************************//

// show function
var total;
function display() {
    var index ;
    cartona = "";

    for (var i = 0; i < content.length; i++) {
        index = i+1;
        cartona += `
        <tr>
        <th scope="row">${index}</th>
        <td>${content[i].name}</td>

        <td><a href="${content[i].url}" target="_blank"><button class="btn bg-gradientt text-light"><i class="fa-solid fa-eye pe-2"></i> View</button></a></td>
        <td><button class="btn btn-danger" onclick="deletItem(${i})"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
        <td><a href="#up"><button class="btn btn-success" onclick="updateItem(${i})"><i class="fa-solid fa-pen pe-2"></i> Update</button></a></td>
        </tr>
        <tr>
        `
        total=i;
      }
      document.querySelector("tbody").innerHTML = cartona;
}
display();
//*****************************************//

//delete function
function deletItem(i){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          content.splice(i,1);
          localStorage.content = JSON.stringify(content);
          display();
          deletaBtn.innerHTML = `Delete All (${total-1})`;
if (content.length === 0) {
  deletaBtn.classList.add("d-none");
  
}
          // location.reload();

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
}
//*****************************************//

//clearData function
function clear() {
    nameInput.value=null;
    urlInput.value=null;


    nameInput.classList.remove("is-valid", "is-invalid"); 
    urlInput.classList.remove("is-valid", "is-invalid");

}

//update function

var indexUpdate ;
function updateItem(i) {

    nameInput.value = content[i].name ;
    urlInput.value = content[i].url ;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
 indexUpdate = i;
    
}
updateBtn.addEventListener("click", function () {
    if (nameInput.value === "" || urlInput.value === "" || nameInput.classList.contains("is-invalid") || urlInput.classList.contains("is-invalid")){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a name and a URL for the link.',
        });
        
        return;
    }else{
        let timerInterval;
        Swal.fire({
          title: "The link has been updated successfully",
          html:`link Name <span class="bg-success text-white fw-bold p-2">${nameInput.value}</span>`,
          timer: 1200,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
    }

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    content[indexUpdate].name = nameInput.value;
    content[indexUpdate].url = urlInput.value;
    display()
    clear()

});
//*****************************************//

//deleteAll function

deletaBtn.addEventListener("click",function () {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            content=[];
            // content.splice(0);
            localStorage.clear();
            display()
        deletaBtn.classList.add("d-none");
            // location.reload();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
   
})
//*****************************************//

function count() {
    if (content.length > 0) {
        deletaBtn.classList.remove("d-none");
        deletaBtn.innerHTML = `Delete All (${total+1})`;
    }
}
count()
//*****************************************//

//search function

serch.addEventListener("input", function() {
    var term = serch.value;
    var found = false;
    cartona = "";
    for(var i = 0; i < content.length; i++) {
        if (content[i].name.toLowerCase().includes(term.toLowerCase())) {
            found = true; 
            cartona += `
            <tr>
            <th scope="row">${i}</th>
            <td>${content[i].name}</td>
            <td><a href="${content[i].url}" target="_blank"><button class="btn btn-info">View</button></a></td>
            <td><button class="btn btn-danger" onclick="deletItem(${i})">Delete</button></td>
            <td><button class="btn btn-success" onclick="updateItem(${i})">Update</button></td>
            </tr>
            <tr>`;
        }
    }
   
    if (!found) {
        cartona = `<div class="alert bg-black position-relative start-100 text-light mt-4 mx-auto" role="alert">
        <i class="fa-solid fa-face-grin-tongue-squint bg-transparent fs-4"></i>   Not founded!
                   </div>`;
    }
    document.querySelector("tbody").innerHTML = cartona;
});

var searchIcon = document.querySelector("#searchIcon");

searchIcon.onclick = function () {
    serch.classList.toggle("w-100");
    searchIcon.classList.toggle("open");
}
serch.onclick = function () {
    serch.classList.add("w-100");
    searchIcon.classList.add("open");
}

function validateForm(e) {
    var regex = {
        nameInput : /^[a-zA-Z]{4,10}$/,
        urlInput : /^https:\/\/[a-zA-Z0-9\-]+\.com$/,
    };
    if (regex[e.id].test(e.value)) {
        e.classList.remove("is-invalid");
        e.classList.add("is-valid");
        e.nextElementSibling.classList.add("d-none");
                console.log("matcch");
    }else{
        e.classList.remove("is-valid");
        e.classList.add("is-invalid");
        e.nextElementSibling.classList.remove("d-none");
    }
};