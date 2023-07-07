const mainNode = document.querySelector('main');
const addButton = document.getElementById('add-button');
const page = document.getElementById('page');
const submitButton = document.getElementById('submit');
const cancelButton = document.getElementById('cancel');

function Book(title, author, pages, read, id) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.id = id
}


Book.prototype.displayNode = function() {

}

const library = {
  storage: [],
  bookCount: 0,

  add: function(title, author, pages, read) {
    const book = new Book(title, author, pages, read, (this.bookCount));

    this.storage.push(book);
    this.display();
    this.bookCount++;
  },

  remove: function(id) {
    const bookNode = mainNode.querySelector(`div[data-book-id="${id}"]`)
    const index = this.findStorageId(id);

    bookNode.remove();
    this.storage.splice(index, 1);
  },

  findStorageId: function(id) {
    return this.storage.findIndex((e) => e.id == id);
  },

  createNode: function(book) {
    const bookNode = document.createElement('div');
    let isChecked = book.read ? 'checked' : '';

    bookNode.setAttribute('data-book-id', `${book.id}`)
    bookNode.insertAdjacentHTML('beforeend', `
      <h2>${book.title}</h2>
      <p>By: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <label for="read${book.id}">Read:</label>
      <input type="checkbox" name="read${book.id}" id="read${book.id}"  ${isChecked}>
      <button class="removeButton" type="button">Remove</button>`
    );
    
    mainNode.insertBefore(bookNode, addButton)

    const removeButton = bookNode.querySelector('button.removeButton')
    removeButton.addEventListener('click', (e) => {
      id = e.currentTarget.parentElement.getAttribute('data-book-id');
      library.remove(id);
    })

    const checkbox = bookNode.querySelector('[id^="read"]');
    checkbox.addEventListener('change', (e) => {
      const id =  e.currentTarget.parentElement.getAttribute('data-book-id');
      const storageId = this.findStorageId(id);
      this.storage[storageId].read = !this.storage[storageId].read;

      
    })
  },

  detachAll: function() {
    while(mainNode.childElementCount > 1) {
      mainNode.removeChild(mainNode.firstChild);
    }
  },

  display: function() {
    this.detachAll();
    for (const book of this.storage) {
      this.createNode(book);
    }
  }
}

const form = {
  inputs: document.querySelectorAll('#form-add input'),
  node: document.getElementById('form-add'),

  getValues: function() {
    let values = [];
    this.inputs.forEach(element => {
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

submitButton.addEventListener('click', (event) => {
  library.add(...form.getValues());
  form.toggle();
  event.preventDefault();
})

addButton.addEventListener('click', () => {
  form.toggle();
  page.disabled = true;
})

cancelButton.addEventListener('click', (e) => {
  form.toggle();
})


form.toggle();

library.add('A Tale of Two Cities', 'Charles Dickens', '448', false)
library.add('1984', 'George Orwell', '352', true)
library.add('Fahrenheit 451', 'Ray Bradbury', '227', false)

