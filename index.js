let booksArray = [];

const bookForm = document.getElementById('book-form');
const bookTitle = document.getElementById('title-input');
const bookAuthor = document.getElementById('author-input');
const booksList = document.getElementById('books-list');

function inArray(title){
  for(let i=0; i < booksArray.length; i+=1 ){
    if(booksArray[i]['title']  === title){
      // return and the index it was found
      // console.log("found title")
      return [true, 1]
    }
  }
  return [false, -1]
}

//Add new book
function addBook(title, author) {

  if(title && author) {
    let testResult = inArray(title)
    if ( testResult[0]){
      // title in we can update author
      booksArray[testResult[1]]["author"] = author
      
    }else{
      let book = {
        "title": title,
        "author": author,
      };
      // not in
      booksArray.push(book);
      clearList();
      booksArray.forEach(displayBooks);
      
    }
  }

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
}); 
