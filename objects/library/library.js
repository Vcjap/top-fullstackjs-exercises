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
        this.books.forEach((book,index) => {
            this.createCard(book, index);
        })
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
        
        const bookInfo = [deleteBtn, title, author, pages, readBtn];
        bookInfo.forEach((info) => {
            newBookCard.appendChild(info);
        })

        // newBookCard.appendChild(deleteBtn);
        // newBookCard.appendChild(title);
        // newBookCard.appendChild(author);
        // newBookCard.appendChild(pages);
        // newBookCard.appendChild(readBtn);
    
        display.appendChild(newBookCard);
    
        return;
    
    }
}

const myLibrary = new Library([]);

myLibrary.addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", "198", "read"));
myLibrary.displayBooks();


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

// The submit button updates the library and the display, resets the form and closes the dialog
const addBookDataBtn = document.querySelector("#addBookDataBtn")
addBookDataBtn.addEventListener("click", (event) => {
    const title = document.querySelector(".formOption #title").value;
    const author = document.querySelector(".formOption #author").value;
    const pages = document.querySelector(".formOption #pages").value;
    const read = document.querySelector(".formOption select[name='read']").value;

    const newBook = new Book(title,author,pages,read);
    myLibrary.addBookToLibrary(newBook);
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

        event.target.textContent = myLibrary[bookIndex].read;
        bookCard.classList.toggle("read");
        bookCard.classList.toggle("not_read");
    })
}
