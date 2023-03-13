const modal = document.querySelector(".modal");
const openModalButton = document.querySelector(".open-modal");
const content = document.querySelector(".content");
const addBookButton = document.querySelector(".add-book");
const closeModalButton = document.querySelector(".close-modal");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const book1 = new Book("Hobbit", "J.R.R. Tolkien", 256, false);
const book2 = new Book("Silmarillion", "J.R.R. Tolkien", 800, true);
let myLibrary = [book1, book2];

Book.prototype.getInfo = function () {
  const info = `${title} by ${author}, ${pages} pages, ${read}`;
  return info;
};

openModalButton.onclick = () => {
  modal.style.display = "block";
};

closeModalButton.onclick = () => {
  modal.style.display = "none";
};

window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

myLibrary.map(book => {
  const newBookCard = document.createElement("div");
  newBookCard.classList.add("book-card");
  content.appendChild(newBookCard);
  const newBookTitle = document.createElement("div");
  newBookTitle.classList.add("title");
  newBookTitle.textContent = book.title;
  newBookCard.appendChild(newBookTitle);
  const newBookAuthor = document.createElement("div");
  newBookAuthor.classList.add("author");
  newBookAuthor.textContent = `by ${book.author}`;
  newBookCard.appendChild(newBookAuthor);
  const newBookPages = document.createElement("div");
  newBookPages.classList.add("pages");
  newBookPages.textContent = `Pages: ${book.pages}`;
  newBookCard.appendChild(newBookPages);
  const newReadButton = document.createElement("button");
  newReadButton.classList.add("read-button");
  newReadButton.textContent = "READ";
  newBookCard.appendChild(newReadButton);
  const newDeleteButton = document.createElement("button");
  newDeleteButton.classList.add("delete-button");
  newDeleteButton.textContent = "X"; //Change this
  newBookCard.appendChild(newDeleteButton);
});

addBookButton.onclick = e => {
  e.preventDefault();
  const newUserBookTitle = e.target.form[0].value;
  const newUserAuthor = e.target.form[1].value;
  const newUserPages = e.target.form[2].value;
  const newUserRead = e.target.form[3].checked;
  const newUserBook = new Book(
    newUserBookTitle,
    newUserAuthor,
    newUserPages,
    newUserRead
  );
  myLibrary.push(newUserBook);
};
