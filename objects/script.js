function Book (title, author, n_pages, read) {
    this.title = title;
    this.author = author;
    this.pages = n_pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${n_pages} pages, ${read}`
    };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yeat");
console.log(theHobbit.info());