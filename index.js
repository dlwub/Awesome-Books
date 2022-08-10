let booksArray = [];

const bookForm = document.getElementById('book-form');
const titleForm = bookForm.elements['title-input'];
const authorForm = bookForm.elements['author-input'];
const bookList = document.getElementById('books-list');

function inArray(title) {
  for (let i = 0; i < booksArray.length; i += 1) {
    if (booksArray[i].Title === title) {
      // return and the index it was found

      return [true, i];
    }
  }

  return [false, -1];
}

function addBookToArray(title, author) {
  if (title && author) {
    const testResult = inArray(title);

    if (testResult[0]) {
      booksArray[testResult[1]].Author = author;
    } else {
      const book = {
        id: title,
        Title: title,
        Author: author,
      };
      booksArray = booksArray.concat(book);
    }
  }
}

function addToPage(title, author) {
  if (title && author) {
    const str = `
        <p>${title}</p>
        <p>${author}</p>
        <button id="${title}" type="submit" onclick= removeBook(this.id)>Remove</button>
        <hr>
        `;

    const obj = document.createElement('div');
    obj.className = 'booklist';
    obj.innerHTML = str;
    bookList.appendChild(obj);
  }
}

function pageLoadChecks() {
  if (localStorage.getItem('bookList')) {
    // data in storage
    // convert to js object
    booksArray = JSON.parse(localStorage.getItem('bookList'));
    for (let i = 0; i < booksArray.length; i += 1) {
      addToPage(booksArray[i].Title, booksArray[i].Author);
    }
  }
}

function populateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeBook(title) {
  booksArray = booksArray.filter((book) => book.Title !== title);
  bookList.innerHTML = '';
  populateLocalStorage('bookList', booksArray);
  pageLoadChecks();
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleForm.value;
  const author = authorForm.value;
  addBookToArray(title, author);

  // store data to localStorage to retain data on pageload
  populateLocalStorage('bookList', booksArray);

  // new book  to page
  bookList.innerHTML = '';
  pageLoadChecks();

  titleForm.value = '';
  authorForm.value = '';
});

document.body.onload = pageLoadChecks();

const btnRemove = document.getElementById('books-list');

btnRemove.addEventListener('click', () => {
  removeBook();
});
