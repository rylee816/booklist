class Book{constructor(e,t,o){this.title=e,this.author=t,this.isbn=o}}class UI{static displayBooks(){Store.getBooks().forEach((e=>UI.addBookToList(e)))}static addBookToList(e){const t=document.querySelector("#book-list"),o=`\n       <tr data-id=${e.isbn}>\n           <td>${e.title}</td>\n           <td>${e.author}</td>\n           <td>${e.isbn}</td>\n           <td><a class="btn btn-sm btn-danger delete"><i class="fa fa-trash delete"/></a></td>\n       </tr>\n       `;t.insertAdjacentHTML("beforeend",o)}static clearFields(){document.querySelector("#book-form").reset()}static deleteBook(e){document.querySelector("tbody").removeChild(e),Store.removeBook(e.dataset.id),UI.renderAlert("delete")}static renderAlert(e){let t;switch(e){case"success":t={message:"Book Successfully Added!",style:"alert-success"};break;case"error":t={message:"Please Fill Out All Fields.",style:"alert-danger"};break;case"delete":t={message:"Book Successfully Removed!",style:"alert-warning"};break;default:return null}let o=document.querySelector("form"),s=`<div class="alert ${t.style}" role="alert">\n        ${t.message}\n       </div>`;o.insertAdjacentHTML("afterbegin",s),setTimeout((()=>{document.querySelector(".alert").remove()}),3e3)}}class Store{static getBooks(){let e=window.localStorage.getItem("books");return e=null===window.localStorage.getItem("books")||window.localStorage.getItem("books")===[]?[{title:"The Catcher in the Rye",author:"J.D. Salinger",isbn:458963741}]:JSON.parse(window.localStorage.getItem("books")),e}static addBook(e){const t=Store.getBooks();t.push(e),window.localStorage.setItem("books",JSON.stringify(t))}static removeBook(e){const t=Store.getBooks();t.forEach(((o,s)=>{o.isbn===e&&t.splice(s,1)})),window.localStorage.setItem("books",JSON.stringify(t))}}document.addEventListener("DOMContentLoaded",UI.displayBooks),document.querySelector("#book-form").addEventListener("submit",(e=>{e.preventDefault();const t=document.querySelector("#title").value,o=document.querySelector("#author").value,s=document.querySelector("#isbn").value;if(!t||!o||!s)return UI.renderAlert("error");const r=new Book(t,o,s);UI.addBookToList(r),Store.addBook(r),UI.renderAlert("success"),UI.clearFields()})),document.querySelector("#book-list").addEventListener("click",(e=>{if(e.target.classList.contains("delete")){let t=e.target.closest("tr");UI.deleteBook(t)}}));
//# sourceMappingURL=index.16b953ee.js.map
