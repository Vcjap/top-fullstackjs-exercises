const myLibrary = [];

function Book (title, author, n_pages, read) {
    this.title = title;
    this.author = author;
    this.pages = n_pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${n_pages} pages, ${read}`
    };
};

function addBookToLibrary (title, author, n_pages, read) {
    const newBook = new Book(title, author, n_pages, read);
    myLibrary.push(newBook);
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "198", "read");
addBookToLibrary("The Way of Kings", "Brandon Sanderson", "1177", "not_read");



function createCard (book) {
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");

    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");

    title.textContent = book["title"];
    author.textContent = book["author"];
    pages.textContent = book["pages"];

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);

    return newBook;
}

function displayBooks (library) {
    const display = document.querySelector(".books");
    library.forEach(book => {
        const newBook = createCard(book);
        display.appendChild(newBook);
    })
}


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

    addBookToLibrary(title, author, pages, read);
    displayBooks([myLibrary[myLibrary.length -1]]);

    const addBookForm = document.querySelector("#addBookForm");
    addBookForm.reset();
    addBookDialog.close();
})
