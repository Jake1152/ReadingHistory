// const dotenv = require("dotenv");
// dotenv.config();

function searchBooks() {
  const inputElement = document.getElementById("search-input");
  const inputValue = inputElement.value;
  if (!inputValue.trim()) return;
  console.log("input value : ", inputValue);
  // console.log("process.env.PORT : ", process.env.PORT);
  //   alert("Clicked search button");
  inputElement.value = "";
  const bookListArea = document.getElementById("book-list");
  const liElement = document.createElement("li");
  liElement.textContent = inputValue;
  liElement.classList.add("book-item");
  bookListArea.appendChild(liElement);
}
