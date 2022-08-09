let booksArray = [];


const bookForm = document.getElementById('book-form');
const titleForm = bookForm.elements["title-input"]
const authorForm = bookForm.elements["author-input"]
const bookList = document.getElementById('books-list');


function inArray(title){
  for(let i=0; i < booksArray.length; i+=1 ){
    if(booksArray[i]['Title']  === title){
      // return and the index it was found
      console.log("found title")
      return [true, i]
    }
  }
  console.log("found not title")
  return [false, -1]
}

function addBookToArray(title, author){
  // add book with title list of array
  //check for empty book
  if(title && author) {

    let testResult = inArray(title) 
   
    if (testResult[0]){
      // title in we can update author
      booksArray[testResult[1]]["Author"] = author
      console.log("updating title")
    }else{
      let book = {
        "Title": title,
        "Author": author,
      };
      // not in
      booksArray.push(book);
      console.log("inserting title")
    }
    console.log(localStorage.getItem("data"))
  }
 
}

function addToPage(title, author) {
  if(title && author) {
    let str =  `
        <h2>${title}</h2>
        <h3>${author}</h3>
        <button id="${title}" type="submit" onclick= removeBook(this.id) id="remove-book">Remove</button>
        <hr>
        `;

      let obj = document.createElement('div')
      obj.className = "booklist"
      obj.innerHTML = str
      bookList.appendChild(obj)
  }
}

function pageLoadChecks() {
  if (localStorage.getItem("bookList")) {
    // data in storage
    // convert to js object
    booksArray = JSON.parse(localStorage.getItem("bookList"));
    for(let i = 0; i < booksArray.length; i += 1){
      addToPage(booksArray[i]['Title'], booksArray[i]['Author'])
    }
  }
}

function populateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeBook(title){ 

  // booksArray = booksArray.filter((book) => book.title !== title);
  let loc = inArray(title)
  if(loc[0]) {
    bookList.innerHTML = '';
    booksArray.splice(loc, 1);
    console.log(booksArray)
    populateLocalStorage("bookList" , booksArray)
    pageLoadChecks()
   
  }
  
} 

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = titleForm.value;
  let author = authorForm.value
  
  addBookToArray(title, author)
  console.log(booksArray)
  
  // store data to localStorage to retain data on pageload
  populateLocalStorage("bookList" , booksArray)
  console.log(localStorage.getItem("bookList") , '----local ')
  
  // new book  to page 
  // addToPage(title, author)
  bookList.innerHTML = '';
  pageLoadChecks()

});


document.body.onload = pageLoadChecks();


let btnRemove=document.getElementById('books-list');

btnRemove.addEventListener('click', () => {
  // console.log(btnRemove.Element.nodeName)
})

// titleForm.addEventListener('focusout', () => {
//   populateObject('title', titleForm.value);
//   // populateLocalStorage();
// });

// authorForm.addEventListener('focusout', () => {
//   populateObject('author', bookForm.value);
//   // populateLocalStorage();
// });

