// Create Book Class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// Create UI Class
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book)
        );
    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const html = `
       <tr data-id=${book.isbn}>
           <td>${book.title}</td>
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td><a class="btn btn-sm btn-danger delete"><i class="fa fa-trash delete"/></a></td>
       </tr>
       `;
        list.insertAdjacentHTML("beforeend", html);
    }
    static clearFields() {
        document.querySelector("#book-form").reset();
    }
    static deleteBook(book) {
        document.querySelector("tbody").removeChild(book);
        Store.removeBook(book.dataset.id);
        UI.renderAlert("delete");
    }
    static renderAlert(status) {
        let message;
        switch(status){
            case "success":
                message = {
                    message: "Book Successfully Added!",
                    style: "alert-success"
                };
                break;
            case "error":
                message = {
                    message: "Please Fill Out All Fields.",
                    style: "alert-danger"
                };
                break;
            case "delete":
                message = {
                    message: "Book Successfully Removed!",
                    style: "alert-warning"
                };
                break;
            default:
                return null;
        }
        let form = document.querySelector("form");
        let messageContainer = `<div class="alert ${message.style}" role="alert">
        ${message.message}
       </div>`;
        form.insertAdjacentHTML("afterbegin", messageContainer);
        setTimeout(()=>{
            document.querySelector(".alert").remove();
        }, 3000);
    }
}
// Create Store Class for storage
class Store {
    static getBooks() {
        const starterBooks = [
            {
                title: "A Catcher in the Rye",
                author: "J.D. Salinger"
            }
        ];
        let books = window.localStorage.getItem("books") || starterBooks;
        if (window.localStorage.getItem("books") === null) books = [];
        else books = JSON.parse(window.localStorage.getItem("books"));
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        window.localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index)=>{
            if (book.isbn === isbn) books.splice(index, 1);
        });
        window.localStorage.setItem("books", JSON.stringify(books));
    }
}
// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
// Event Add a Book
document.querySelector("#book-form").addEventListener("submit", (e)=>{
    // prevent reload
    e.preventDefault();
    // get values from form inputs
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    // return if inputs missing
    if (!title || !author || !isbn) return UI.renderAlert("error");
    // create book object
    const book = new Book(title, author, isbn);
    //Add book to UI
    UI.addBookToList(book);
    // Add book to store
    Store.addBook(book);
    // Render success message
    UI.renderAlert("success");
    //clear fields
    UI.clearFields();
});
//Event Remove a Book
document.querySelector("#book-list").addEventListener("click", (e)=>{
    // select only the button with class "delete";
    if (e.target.classList.contains("delete")) {
        // target delete button's parent element and pass to UI to remove
        let elementToRemove = e.target.closest("tr");
        // remove book from UI
        UI.deleteBook(elementToRemove);
    }
});

//# sourceMappingURL=index.7c0ccee6.js.map
