const modal = document.querySelector(".modal");
const error = document.querySelector(".error");
const openModalButton = document.querySelector(".open-modal");
const content = document.querySelector(".content");
const addBookButton = document.querySelector(".add-book");
const closeModalButton = document.querySelector(".close-modal");
const searchBar = document.querySelector("#search");

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

const updateData = () => {
  content.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    newBookCard.dataset.index = index;
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
    if (book.read === true) {
      newReadButton.classList.add("green-read-button");
    }
    newReadButton.textContent = "READ";
    newBookCard.appendChild(newReadButton);
    const newDeleteButton = document.createElement("button");
    newDeleteButton.classList.add("delete-button");
    newDeleteButton.textContent = "×";
    newDeleteButton.dataset.index = index;
    newBookCard.appendChild(newDeleteButton);
  });
};

updateData();

addBookButton.onclick = e => {
  e.preventDefault();
  if (
    e.target.form[0].value &&
    e.target.form[1].value &&
    e.target.form[2].value
  ) {
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
    e.target.form[0].value = "";
    e.target.form[1].value = "";
    e.target.form[2].value = "";
    e.target.form[3].checked = false;
    modal.style.display = "none";
    error.style.display = "none";
    updateData();
  } else {
    error.style.display = "block";
  }
};

const bookCards = document.querySelectorAll(".book-card");
const deleteBookButtons = document.querySelectorAll(".delete-button");

content.addEventListener("click", e => {
  if (e.target.classList.value === "delete-button") {
    myLibrary.forEach((book, index) => {
      if (e.target.dataset.index === index.toString()) {
        myLibrary.splice(index, 1);
      }
    });
    updateData();
  }

  e.target.classList.forEach(className => {
    if (className === "read-button") {
      e.target.classList.toggle("green-read-button");
    }
  });
});

searchBar.addEventListener("input", e => {
  const searchValue = e.target.value.toLowerCase();
  myLibrary.forEach((book, index) => {
    const isVisible =
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue);
    const newBookCards = document.querySelectorAll(".book-card");
    newBookCards.forEach(card => {
      console.log(card);
      if (card.dataset.index === index.toString()) {
        console.log(card);
        card.classList.toggle("hide", !isVisible);
      }
    });
  });
});
