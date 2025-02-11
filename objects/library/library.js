const myLibrary = [];

function Book (title, author, n_pages, read) {
    this.title = title;
    this.author = author;
    this.pages = n_pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${n_pages} pages, ${read}`
    };
    this.toggleRead = function () {
        this.read === "read" ? this.read = "not_read" : this.read = "read";
    }
};

function addBookToLibrary (title, author, n_pages, read) {
    const newBook = new Book(title, author, n_pages, read);
    myLibrary.push(newBook);
    return newBook;
};

function createCard (book, bookIndex) {
    const display = document.querySelector(".books");

    const newBook = document.createElement("div");
    newBook.classList.add("book");
    newBook.classList.add(book["read"]);
    newBook.setAttribute("book_index", bookIndex);

    const deleteBtn = document.createElement("button");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readBtn = document.createElement("button");

    deleteBtn.classList.add("deleteBtn");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    readBtn.classList.add("readBtn");

    deleteBtn.textContent = "X";
    title.textContent = book["title"];
    author.textContent = book["author"];
    pages.textContent = book["pages"];
    readBtn.textContent = book["read"];

    addDeleteBook(deleteBtn);
    addToggleRead(readBtn);

    newBook.appendChild(deleteBtn);
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(readBtn);

    display.appendChild(newBook);

    return;
}

function displayBooks (library) {
    library.forEach((book, index) => { 
        createCard(book, index);
    })
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "198", "read");
addBookToLibrary("The Way of Kings", "Brandon Sanderson", "1177", "not_read");
displayBooks(myLibrary);

// Dialog and form 
const addBookDialog = document.querySelector("dialog");

const addBookButton = document.querySelector("#addBookDialogBtn");
addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
})

const closeBtn = document.querySelector(".closeBtn");
closeBtn.addEventListener("click", () => {
    addBookDialog.close();
})

// The submit button updates the library and the display, rests the form and closes the dialog
const addBookDataBtn = document.querySelector("#addBookDataBtn")
addBookDataBtn.addEventListener("click", (event) => {
    const title = document.querySelector(".formOption #title").value;
    const author = document.querySelector(".formOption #author").value;
    const pages = document.querySelector(".formOption #pages").value;
    const read = document.querySelector(".formOption select[name='read']").value;

    const newBook = addBookToLibrary(title, author, pages, read);
    const lastBookIndex = myLibrary.length -1;
    createCard(newBook, lastBookIndex);

    const addBookForm = document.querySelector("#addBookForm");
    addBookForm.reset();
    addBookDialog.close();
})


// Functions handling book deletion
function deleteBook(bookCard) {
    const bookToDeleteIndex= bookCard.getAttribute("book_index");
    myLibrary.splice(bookToDeleteIndex, 1);
    
    const cards = document.querySelector(".books");
    cards.removeChild(bookCard);

    return
}

function addDeleteBook (button) {
    button.addEventListener("click", function(event) {
        const bookCard = event.target.parentElement;
        deleteBook(bookCard);
    });
};

const deleteBtns = document.querySelectorAll(".deleteBtn");
deleteBtns.forEach(button => addDeleteBook(button));

// Functions handling the toggling of read/notread
function addToggleRead (button) {
    button.addEventListener("click", function(event) {
        const bookCard = event.target.parentElement;
        const bookIndex = bookCard.getAttribute("book_index");
        myLibrary[bookIndex].toggleRead();
    })
}
