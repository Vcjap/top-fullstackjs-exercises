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
addBookToLibrary("The Way of Kings", "Brandon Sanderson", "1177", "read");



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

