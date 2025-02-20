class Book {
    constructor(title, author, n_pages, read) {
        this.title = title;
        this.author = author;
        this.pages = n_pages;
        this.read = read;    
    }

    info() { 
        return `${title} by ${author}, ${n_pages} pages, ${read}`
    }

    toggleRead() {
        this.read === "read" ? this.read = "not_read" : this.read = "read";
    }
}

class Library {
    constructor(books) {
        this.books = books;
    }

    addBookToLibrary(newBook) {
        this.books.push(newBook);
        return newBook;
    }

    displayBooks() {
        this.books.forEach((book, index) => {
            this.createCard(book, index);
        })
    }

    #deleteBook(bookCard) {
        const bookToDeleteIndex= bookCard.getAttribute("book_index");
        this.books.splice(bookToDeleteIndex, 1);
        
        const cards = document.querySelector(".books");
        cards.removeChild(bookCard);

        return
    }
    
    createCard(book, bookIndex) {
        const display = document.querySelector(".books");

        const newBookCard = document.createElement("div");
        newBookCard.classList.add("book");
        newBookCard.classList.add(book["read"]);
        newBookCard.setAttribute("book_index", bookIndex);
        
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
        pages.textContent = `${book["pages"]} pages`;
        readBtn.textContent = book["read"];
        
        deleteBtn.addEventListener("click", () => {
            this.#deleteBook(newBookCard);
        })

        readBtn.addEventListener("click", () => {
            this.books[bookIndex].toggleRead();
            readBtn.textContent = this.books[bookIndex].read;
            newBookCard.classList.toggle("read");
            newBookCard.classList.toggle("not_read");    
        })

        const bookInfo = [deleteBtn, title, author, pages, readBtn];
        bookInfo.forEach((info) => {
            newBookCard.appendChild(info);
        })
    
        display.appendChild(newBookCard);
    
        return;
    
    }
}

class Dialog {
    // Adds event listeners to the dialog buttons and to add new book
    constructor() {
        const addBookDialog = document.querySelector("dialog");

        const addBookButton = document.querySelector("#addBookDialogBtn");
        addBookButton.addEventListener("click", () => {
            addBookDialog.showModal();
        });

        const closeBtn = document.querySelector(".closeBtn");
        closeBtn.addEventListener("click", () => {
            addBookDialog.close();
        });
        
        // The submit button updates the library and the display, resets the form and closes the dialog
        const addBookDataBtn = document.querySelector("#addBookDataBtn");
        addBookDataBtn.addEventListener("click", (event) => {
            const title = document.querySelector(".formOption #title").value;
            const author = document.querySelector(".formOption #author").value;
            const pages = document.querySelector(".formOption #pages").value;
            const read = document.querySelector(".formOption select[name='read']").value;
        
            const newBook = new Book(title,author,pages,read);
            myLibrary.addBookToLibrary(newBook);
            const lastBookIndex = myLibrary.books.length -1;
            myLibrary.createCard(newBook, lastBookIndex);

            const addBookForm = document.querySelector("#addBookForm");
            addBookForm.reset();
            addBookDialog.close();        
        });

    }
}

// Initialize library
const myDialog = new Dialog();
const myLibrary = new Library([]);

// Fill with 1 book
myLibrary.addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", "198", "read")); 
myLibrary.displayBooks();