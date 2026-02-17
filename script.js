var popupoverlay = document.querySelector(".popup-overlay")
var popupbox = document.querySelector(".popup-box")
var addpopupbutton = document.getElementById("add-popup-button")
var cancelpopup = document.getElementById("cancel-popup")

var container = document.querySelector(".container")
var addbook = document.getElementById("add-book")
var booktitleinput = document.getElementById("book-title-input")
var bookauthorinput = document.getElementById("book-author-input")
var bookdescriptioninput = document.getElementById("book-description-input")

var searchInput = document.getElementById("searchInput")

let editBookDiv = null   // track which book is being edited

// Show popup
addpopupbutton.addEventListener("click", function () {
    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
})

// Cancel popup
cancelpopup.addEventListener("click", function (event) {
    event.preventDefault()
    closePopup()
})

// Add / Update book
addbook.addEventListener("click", function(event){
    event.preventDefault()

    // VALIDATION
    if(booktitleinput.value.trim() === "")
    {
        alert("Book title is required!")
        return
    }

    var div = document.createElement("div")
    div.setAttribute("class","book-container")
    div.innerHTML = `
        <h2>${booktitleinput.value}</h2>
        <h5>${bookauthorinput.value}</h5>
        <p>${bookdescriptioninput.value}</p>
        <button onclick="deletebook(event)">Delete</button>
        <button onclick="editbook(event)">Edit</button>
    `
    container.append(div)

    popupoverlay.style.display="none"
    popupbox.style.display="none"

    // Clear inputs
    booktitleinput.value = ""
    bookauthorinput.value = ""
    bookdescriptioninput.value = ""
})

// Delete book
function deletebook(event) {
    event.target.parentElement.remove()
}

// Edit book
function editbook(event) {
    editBookDiv = event.target.parentElement

    booktitleinput.value = editBookDiv.querySelector("h2").innerText
    bookauthorinput.value = editBookDiv.querySelector("h5").innerText
    bookdescriptioninput.value = editBookDiv.querySelector("p").innerText

    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
}

// Search feature
searchInput.addEventListener("keyup", function () {
    var value = searchInput.value.toLowerCase()
    var books = document.querySelectorAll(".book-container")

    books.forEach(function (book) {
        var title = book.querySelector("h2").innerText.toLowerCase()
        var author = book.querySelector("h5").innerText.toLowerCase()

        if (title.includes(value) || author.includes(value)) {
            book.style.display = "inline-block"
        } else {
            book.style.display = "none"
        }
    })
})

// Close popup and reset
function closePopup() {
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"
    booktitleinput.value = ""
    bookauthorinput.value = ""
    bookdescriptioninput.value = ""
}
