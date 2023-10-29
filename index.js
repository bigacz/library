const mainNode = document.querySelector('main');
const addButton = document.getElementById('add-button');
const page = document.getElementById('page');
const submitForm = document.getElementById('submit');
const cancelForm = document.getElementById('cancel');
const readForm = document.getElementById('form-read');

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

const library = {
  storage: [],
  bookCount: 0,

  add(title, author, pages, read) {
    const book = new Book(title, author, pages, read, this.bookCount);

    this.storage.push(book);
    this.bookCount += 1;
    this.display();
  },

  remove(id) {
    const bookNode = mainNode.querySelector(`div[data-book-id="${id}"]`);
    const index = this.findstorageId(id);

    bookNode.remove();
    this.storage.splice(index, 1);
  },

  findstorageId(id) {
    return this.storage.findIndex((e) => +e.id === +id);
  },

  createNode(book) {
    const bookNode = document.createElement('div');
    const pages = book.pages ? `${book.pages} pages` : 'pages not specified';
    const author = book.author ? `${book.author}` : 'author not specified';

    bookNode.setAttribute('data-book-id', `${book.id}`);
    bookNode.classList.add('book-node');
    bookNode.insertAdjacentHTML(
      'beforeend',
      `
      <h2>${book.title}</h2>
      <p>${author}</p>
      <p>${pages}</p>
      <button class="read-false" type="button">Read</button>
      <button class="removeButton" type="button">Remove</button>`
    );

    mainNode.appendChild(bookNode);

    const removeButton = bookNode.querySelector('button.removeButton');
    const readButton = bookNode.querySelector('button.read-false');

    if (book.read) {
      readButton.classList.toggle('read-true');
    }

    removeButton.addEventListener('click', (e) => {
      const id = e.currentTarget.parentElement.getAttribute('data-book-id');
      library.remove(id);
    });

    readButton.addEventListener('click', (e) => {
      const id = e.currentTarget.parentElement.getAttribute('data-book-id');
      const storageId = this.findstorageId(id);

      this.storage[storageId].read = !this.storage[storageId].read;

      readButton.classList.toggle('read-true');
    });
  },

  detachAll() {
    while (mainNode.childElementCount > 1) {
      mainNode.removeChild(mainNode.lastChild);
    }
  },

  display() {
    this.detachAll();
    for (const book of this.storage) {
      this.createNode(book);
    }
  },
};

const backdrop = document.getElementById('backdrop');
backdrop.addEventListener('click', () => {
  form.toggle();
});

const form = {
  inputs: document.querySelectorAll('#form input, #form-read'),
  formNode: document.getElementById('form'),

  getValues() {
    const values = [];
    this.inputs.forEach((element) => {
      if (element.id === 'form-read') {
        const toPush = element.value !== 'false';
        values.push(toPush);
      } else {
        values.push(element.value);
      }
    });
    return values;
  },

  toggle() {
    const state = this.formNode.style.display === 'none' ? 'block' : 'none';
    this.clearInputs();
    this.formNode.style.display = state;
    backdrop.style.display = state;
  },

  checkValidity() {
    let valid = true;
    this.inputs.forEach((element) => {
      if (!element.checkValidity()) {
        valid = false;
      }
    });
    return valid;
  },

  clearInputs() {
    this.inputs.forEach((element) => {
      if (element.tagName === 'BUTTON') {
        element.value = 'false';
        element.classList.remove('read-true');
      } else {
        element.value = '';
      }
    });
  },
};

addButton.addEventListener('click', () => {
  form.toggle();
  page.disabled = true;
});

readForm.addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('read-true');
  event.currentTarget.value = event.currentTarget.value === 'false';
});

submitForm.addEventListener('click', (event) => {
  if (form.checkValidity()) {
    library.add(...form.getValues());
    form.toggle();
    event.preventDefault();
  }
});

cancelForm.addEventListener('click', () => {
  form.toggle();
});

form.toggle();

library.add('A Tale of Two Cities', 'Charles Dickens', '448', false);
library.add('1984', 'George Orwell', '352', true);
library.add('Fahrenheit 451', 'Ray Bradbury', '227', false);
library.add('Brave New World', 'Aldous Huxley', '231', false);
