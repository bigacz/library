const mainNode = document.querySelector('main')
const addButton = document.getElementById('addButton')

const library = {
  storage: [],

  add: function(book) {
    this.storage.push(book);
  },

  display: function() {
    for (const book of this.storage) {
      const bookNode = document.createElement('div');
      bookNode.textContent = book.info();
      mainNode.insertBefore(bookNode, addButton)
    }
  }
}

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

Book.prototype.info = function() {
  isRead = Boolean(this.read) ? 'read' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead}` 
}

const hbc = new Book('Hbc', 'Wojciech Drewniak', '457', false)
const tale = new Book('A Tale of Two Cities', 'Charles Dickens', '448', false)
const One = new Book('1984', 'George Orwell', '352', true)
const Fahrenheit = new Book('Fahrenheit 451', 'Ray Bradbury', '227', false)


library.add(hbc);
library.add(tale);
library.add(One);
library.add(Fahrenheit);
library.display();