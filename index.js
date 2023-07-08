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

const library = {
  storage: [],
  bookCount: 0,

  add: function(title, author, pages, read) {
    const book = new Book(title, author, pages, read, (this.bookCount));

    this.storage.push(book);
    this.bookCount++;
    this.display();
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
    const isChecked = book.read ? 'checked' : '';
    let pages = book.pages ? `${book.pages} pages` : 'pages not specified';
    let author = book.author ? `${book.author}` : 'author not specified';
    
    bookNode.setAttribute('data-book-id', `${book.id}`)
    bookNode.insertAdjacentHTML('beforeend', `
      <h2>${book.title}</h2>
      <p>${author}</p>
      <p>${pages}</p>
      <button class="readButton" type="button">Read</button>
      <button class="removeButton" type="button">Remove</button>`
    );
    
    mainNode.appendChild(bookNode);

    const removeButton = bookNode.querySelector('button.removeButton')
    const readButton = bookNode.querySelector('button.readButton')

    if(book.read) {
      readButton.classList.toggle('read')
    }

    removeButton.addEventListener('click', (e) => {
      id = e.currentTarget.parentElement.getAttribute('data-book-id');
      library.remove(id);
    })

    readButton.addEventListener('click', (e) => {
      const id = e.currentTarget.parentElement.getAttribute('data-book-id');
      const storageId = this.findStorageId(id);

      this.storage[storageId].read = !this.storage[storageId].read;

      readButton.classList.toggle('read')
    })
  },

  detachAll: function() {
    while(mainNode.childElementCount > 1) {
      mainNode.removeChild(mainNode.lastChild);
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
  inputs: document.querySelectorAll('#form input'),
  boxNode: document.getElementById('form-box'),
  formNode: document.getElementById('form'),

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
    this.boxNode.style.display =
    (this.boxNode.style.display == 'none') ? 'block' : 'none';
  },

  checkValidity: function() {
    let valid = true;
    this.inputs.forEach(element => {
      if (!element.checkValidity()) {
        valid = false;
      }
    })
    return valid
  }
}

submitButton.addEventListener('click', (event) => {
  if(form.checkValidity()) {
    library.add(...form.getValues());
    form.toggle();
    event.preventDefault();
  }

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

