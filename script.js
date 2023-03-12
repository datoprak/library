let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.getInfo = function () {
  const info = `${title} by ${author}, ${pages} pages, ${read}`;
  return info;
};

const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal");

openModal.onclick = () => {
  modal.style.display = "block";
};
