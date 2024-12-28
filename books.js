const fetchBooks = async () => {
    const response = await fetch("https://spectacular-gilded-coal.glitch.me/books");
    const books = await response.json();
    renderBooks(books);
};

//Render books
const renderBooks = (books) => {
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHtml = "";

    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
        <h3>${book.title}</h3 >
          <p><strong>Author:</strong>${book.author}</p>
          <p><strong>Status:</strong>${book.isAvailable?"Available":"Borrowed"}</p>
        ${
        book.isAvailable
            ? `<button onclick="borrowBook(${book.id})">Borrow Book</button>`
            : `<p><strong>Borrowed Days:</strong>${book.borrowedDays}</p>
<button onclick="returnBook(${book.id})">Return Book</button>`
    }`
    ;
booksContainer.appendChild(bookCard);
    });
};
//borrow a book
const borrowBook = async(bookId) =>{
    const borrowDays = promt("Enter the number of Days to borrow(max 10):");
    if(borrowDays>0 && borrowDays<= 10){
        await fetch(`https://spectacular-gilded-coal.glitch.me/books${bookId}`,{
            method:"PATCH",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({isAvailable:false,borrowDays:borrowDays}),

        });
        alert("Books Borrowed Successfully.");
        fetchBooks();
    }else{
        alert("Please enter a valid number of days(1-10).");
    }
};

//Return  a book 
const returnBook = async(bookId)=>{
    const confirmReturn = confirm ("Are you sure you want  to return the book?");
    if(confirmReturn){
        await fetch(`https://spectacular-gilded-coal.glitch.me/books{bookId}`,{
            method:"PATCH",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({isAvailable:true,borrowedDays:null}),
        });
        alert("Book Returned Successfully.");
        fetchBooks();
    }
};

fetchBooks();