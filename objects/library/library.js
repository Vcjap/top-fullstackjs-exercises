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

