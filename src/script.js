// const dotenv = require("dotenv");
// dotenv.config();

const bookItemInfoOfList = {
  src: "",
  title: "",
  publisher: "",
  author: "",
  link: "",
}

function getBookInfo(src, title, publisher, author) {
  return {
    src: src,
    title: title,
    publisher: publisher,
    author: author,
    // link: "",
  }
}

// function getBookImageAnchorElement(href) {
//   const anchorElement = document.createElement("a");
//   anchorElement.href = href
//   anchorElement.classList.add("ui-tabs-anchor")
//   // newAnchor.textContent = "Click me!";
//   return anchorElement
// }

function getBookImageElement(href) {
  const imageElement = document.createElement("img");
  imageElement.src = href
  // imageElement.classList.add("ui-tabs-anchor")
  // newAnchor.textContent = "Click me!";
  return imageElement
}

function getSpanElementForImage(href) {
  const spanElement = document.createElement("span");
  // spanElement.classList.add("img_box")
  const imageElement = getBookImageElement(href);
  spanElement.appendChild(imageElement);
  return spanElement
}

/**
 * div를 구성할 수 있는 요소들을 넘겨받아서 list를 구성할 div tag에 값들을 구성하여 return 한다
 * li tag에 추가하는 것은 밖에서 처리한다.
 * FP스타일로 처리한다.
 */
function getBookInfoDivElement(href) {
  // "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162542125.jpg"
  const divElement = document.createElement("div");
  const spanElement = getSpanElementForImage(href)
  divElement.appendChild(spanElement);
  return divElement
}

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
  // liElement.textContent = inputValue
  // "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162542125.jpg"
  const href = "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162542125.jpg"
  const bookInfoDivTag = getBookInfoDivElement(href)
  // // bookInfoDivTag
  // liElement.appendChild(bookInfoDivTag); 
  liElement.classList.add("book-item");
  liElement.appendChild(bookInfoDivTag);
  bookListArea.appendChild(liElement);
}

// function getBookList(searchKeyword) {
//   searchKeyword;
//   return;
// }
