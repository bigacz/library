const mainNode = document.querySelector('main');
const addButton = document.getElementById('add-button');
const addForm = document.getElementById('form-add');
const page = document.getElementById('page');
const submitButton = document.getElementById('submit');


const form = {
  getValues: function(inputs) {
    let values = [];
    inputs.forEach(element => {
      if(element.getAttribute('type') === 'checkbox') {
        values.push(element.checked);
      } else {
        values.push(element.value);
      }
    })
    return values
  },

  toggle: function() {
    const form = document.getElementById('form-add');
    form.style.display = (form.style.display == 'none') ? 'block' : 'none';
  }
}

form.toggle();

submitButton.addEventListener('click', (event) => {
  const inputs = document.querySelectorAll('#form-add input');
  library.add(...form.getValues(inputs));
  form.toggle();
  event.preventDefault();
})

addButton.addEventListener('click', (e) => {
  form.toggle();
  page.disabled = true;
})

const library = {
  storage: [],

  bookCount: 0,

  add: function(title, author, pages, read) {
    this.display();
    this.bookCount++;
    const book = new Book(title, author, pages, read, this.bookCount)
    this.storage.push(book);
    this.display();
  },

  detachAll: function() {
    while(mainNode.childElementCount > 1) {
      mainNode.removeChild(mainNode.firstChild);
    }
  },

  display: function() {
    this.detachAll();
    for (const book of this.storage) {
      const bookNode = document.createElement('div');

      isChecked = book.read ? 'checked' : '';

      bookNode.setAttribute('data-book-id', `${book.id}`)
      bookNode.insertAdjacentHTML('beforeend', `
       <h2>${book.title}</h2>
       <p>By: ${book.author}</p>
       <p>Pages: ${book.pages}</p>
       <label for="read${book.id}">Read:</label>
       <input type="checkbox" name="read${book.id}" id="read${book.id}"  ${isChecked}>`
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


