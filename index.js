const mainNode = document.querySelector('main');
const addButton = document.getElementById('add-button');
const addForm = document.getElementById('form-add');
const page = document.getElementById('page');

addForm.style.display = "none";

addButton.addEventListener('click', (e) => {
  addForm.style.display = "block";
  page.disabled = true;
})

const library = {
  storage: [],

  bookCount: 0,

  add: function(title, author, pages, read) {
    this.bookCount++;
    const book = new Book(title, author, pages, read, this.bookCount)
    this.storage.push(book);
  },

  display: function() {
    for (const book of this.storage) {
      const bookNode = document.createElement('div');
      bookNode.setAttribute('data-book-id', `${book.id}`)
      bookNode.insertAdjacentHTML('beforeend', `
       <h2>${book.title}</h2>
       <p>By: ${book.author}</p>
       <p>Pages: ${book.pages}</p>
       <label for="read${book.id}">Read:</label>
       <input type="checkbox" name="read${book.id}" id="read${book.id}">`
      );

      mainNode.insertBefore(bookNode, addButton)
    }
  }
}

function Book(title, author, pages, read, id) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.id = id
}

Book.prototype.info = function() {
  isRead = Boolean(this.read) ? 'read' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead}` 
}


library.add('A Tale of Two Cities', 'Charles Dickens', '448', false)
library.add('1984', 'George Orwell', '352', true)
library.add('Fahrenheit 451', 'Ray Bradbury', '227', false)

library.display();
