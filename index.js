let booksArray = [];

const bookForm = document.getElementById('book-form');
const bookTitle = document.getElementById('title-input');
const bookAuthor = document.getElementById('author-input');
const booksList = document.getElementById('books-list');

function inArray(title) {
  for (let i = 0; i < booksArray.length; i += 1) {
    if (booksArray[i].title === title) {
      // return and the index it was found
      // console.log("found title")
      return [true, 1];
    }
  }
  return [false, -1];
}

// Clear the
function clearList() {
  booksList.innerHTML = '';
}


function updateBooks(book) {
  booksList.innerHTML += `
  <div> 
    <p>${book.title}</p>
    <p>${book.author}</p>    
    <button id="${book.title}" type='button' onclick= "${a}(this.id)" >Remove</button>
  </div>
  <hr>
  `;
}

// Remove book
function removeBook(title) {
  booksArray = booksArray.filter((book) => book.title !== title);
  clearList();
  // Update localstorage
  localStorage.setItem('booksData', JSON.stringify(booksArray));
  booksArray.forEach(updateBooks);  
}

// Show list of books in collection
function displayBooks(book) {
  booksList.innerHTML += `
  <div> 
    <p>${book.title}</p>
    <p>${book.author}</p>    
    <button id="${book.title}" type='button'>Remove</button>
  </div>
  <hr>
  document.getElementById("${book.title}").onclick = function() {
    removeBook(${this.id});
  }
  `;
}

// Add new book
function addBook(title, author) {
  if (title && author) {
    const testResult = inArray(title);
    if (testResult[0]) {
      // title in we can update author
      booksArray[testResult[1]].author = author;
    } else {
      const book = {
        title,
        author,
      };
      // not in
      booksArray.push(book);
      clearList();
      booksArray.forEach(displayBooks);
    }
  }
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  if (title !== '' && author !== '') {
    addBook(title, author);
    // Add book to local storage
    localStorage.setItem('booksData', JSON.stringify(booksArray));
  }
});

// Retrieve data from local storage and populate page
window.addEventListener('load', () => {
  const booksData = JSON.parse(localStorage.getItem('booksData'));
  if (booksData) {
    booksArray = booksData;
    booksArray.forEach(displayBooks);
  }
});

// document.getElementByIdonclick=
