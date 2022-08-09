let booksArray = [];
const bookForm = document.getElementById('book-form');
const bookTitle = document.getElementById('title-input');
const bookAuthor = document.getElementById('author-input');
const booksList = document.getElementById('books-list');

//Add new book
function addBook(title, author) {
  let book = {
    "title": title,
    "author": author,
  };
  console.log(booksArray);
  booksArray.push(book);
  clearList();
  booksArray.forEach(displayBooks);
}
//Remove book
function removeBook(title){
  booksArray = booksArray.filter((book) => {
    return book.title !== title;
  })  
  clearList();
  //Update localstorage
  localStorage.setItem('booksData', JSON.stringify(booksArray));
  booksArray.forEach(displayBooks);
}
//Clear the 
function clearList(){
  booksList.innerHTML = ""
}

//Show list of books in collection
function displayBooks(book){
  booksList.innerHTML += `
  <div> 
    <p>${book.title}</p>
    <p>${book.author}</p>    
    <button id="${book.title}" type='button' onclick={removeBook(this.id)}>Remove</button>
  </div>
  <hr>
  `
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = bookTitle.value;
  let author = bookAuthor.value;
  if(title!=="" && author!==""){    
    addBook(title, author); 
    //Add book to local storage
    localStorage.setItem('booksData', JSON.stringify(booksArray));
  }   
});

//Retrieve data from local storage and populate page
window.addEventListener('load', ()=> {
  let booksData = JSON.parse(localStorage.getItem('booksData'));  
  if(booksData) {
    booksArray = booksData;    
    booksArray.forEach(displayBooks); 
  }  
})

