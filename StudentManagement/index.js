let books = JSON.parse(localStorage.getItem("books")) || [];

displayBooks();

function saveData(){

localStorage.setItem("books",JSON.stringify(books));

}

function addBook(){

let title=document.getElementById("title").value;
let author=document.getElementById("author").value;
let year=document.getElementById("year").value;

if(title=="" || author=="" || year==""){
alert("Fill all fields");
return;
}

let book={

id:Date.now(),

title,

author,

year,

issued:false

};

books.push(book);

saveData();

displayBooks();

document.getElementById("title").value="";
document.getElementById("author").value="";
document.getElementById("year").value="";

}

function displayBooks(){

let table=document.getElementById("bookTable");

table.innerHTML="";

books.forEach(book=>{

table.innerHTML+=`

<tr>

<td>${book.id}</td>

<td>${book.title}</td>

<td>${book.author}</td>

<td>${book.year}</td>

<td>${book.issued?"Issued":"Available"}</td>

<td>

<button class="issue"

onclick="toggleIssue(${book.id})">

${book.issued?"Return":"Issue"}

</button>

<button

onclick="editBook(${book.id})">

Edit

</button>

<button class="delete"

onclick="deleteBook(${book.id})">

Delete

</button>

</td>

</tr>

`;

});

updateDashboard();

}

function deleteBook(id){

books=books.filter(book=>book.id!==id);

saveData();

displayBooks();

}

function toggleIssue(id){

books=books.map(book=>{

if(book.id===id){

book.issued=!book.issued;

}

return book;

});

saveData();

displayBooks();

}

function editBook(id){

let book=books.find(book=>book.id===id);

let title=prompt("Title",book.title);

let author=prompt("Author",book.author);

let year=prompt("Year",book.year);

book.title=title;
book.author=author;
book.year=year;

saveData();

displayBooks();

}

function searchBook(){

let value=document.getElementById("search").value.toLowerCase();

let rows=document.querySelectorAll("#bookTable tr");

rows.forEach(row=>{

let title=row.children[1].innerText.toLowerCase();

row.style.display=title.includes(value)?"":"none";

});

}

function updateDashboard(){

document.getElementById("totalBooks").innerText=books.length;

let issued=books.filter(book=>book.issued).length;

document.getElementById("issuedBooks").innerText=issued;

document.getElementById("availableBooks").innerText=books.length-issued;

}