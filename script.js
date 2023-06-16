
console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    if (titles == null) {
        titlesObj = [];
    } else {
        titlesObj = JSON.parse(titles);
    }

    notesObj.push(addTxt.value);
    titlesObj.push(addTitle.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titlesObj));

    addTxt.value = "";
    addTitle.value = "";
    //   console.log(notesObj);
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    if (titles == null) {
        titlesObj = [];
    } else {
        titlesObj = JSON.parse(titles);
    }

    // for notes
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${titlesObj[index]}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="N${index}" onclick="deleteNote(this.id)" class="btn btn-dark">Delete Note</button>
                        <button id="I${index}" onclick="markImpt(this.id)" class="btn btn-primary">Mark Impt</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }



}

// Function to delete a note
function deleteNote(index) {

    // for notes
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    if (titles == null) {
        titlesObj = [];
    } else {
        titlesObj = JSON.parse(titles);
    }
    let ind = Number(index.slice(1,));

    notesObj.splice(ind, 1);
    titlesObj.splice(ind, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titlesObj));

    showNotes();
}

function markImpt(index) {

    let ind = Number(index.slice(1,));

    let noteCards = document.getElementsByClassName('noteCard');

    if (noteCards[ind].style.color != "red") {

        noteCards[ind].style.color = "red";
        noteCards[ind].style.backgroundColor = "yellow";
        document.getElementById(index).innerHTML = 'Remove Impt';
    }
    else {
        noteCards[ind].style.color = "black";
        noteCards[ind].style.backgroundColor = "white";
        document.getElementById(index).innerHTML = 'Mark Impt';
    }





}


let searchBtn = document.getElementById('searchBtn')

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener("input", function () {

    let inputVal = searchTxt.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    console.log('Input event fired!', inputVal);
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0];
        
        if (cardTxt.innerText.toLowerCase().includes(inputVal) ) {
            console.log(cardTxt);
            element.style.display = "block";
            if(inputVal.trim()!=""){
            element.style.backgroundColor = "yellow"
            element.style.color = "red"
            }
            else{
                element.style.backgroundColor = "white"
            element.style.color = "black"
            }
        }
        else {
            if(inputVal.trim()!="")
            element.style.display = "none";
        }
    })
})