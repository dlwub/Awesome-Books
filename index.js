let booksArray = [];
const bookForm = document.getElementById('book-form');
const bookTitle = document.getElementById('title-input');
const bookAuthor = document.getElementById('author-input');
const booksList = document.getElementById('books-list');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = bookTitle.getValue();
  let author = bookAuthor.getValue();
  let book = {
    "Title": title,
    "Author": author,
  };
  booksArray.push(book);
});

for(let book in booksArray){
  booksList.innerHTML += book.title + <br />;
}

