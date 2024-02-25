// const dotenv = require("dotenv");
// dotenv.config();

const bookItemInfoOfList = {
  src: "",
  title: "",
  publisher: "",
  author: "",
  link: "",
};

function getBookInfo(src, title, publisher, author) {
  return {
    src: src,
    title: title,
    publisher: publisher,
    author: author,
    // link: "",
  };
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
  imageElement.src = href;
  // imageElement.classList.add("img_box");
  // imageElement.classList.add("ui-tabs-anchor")
  // newAnchor.textContent = "Click me!";
  return imageElement;
}

function getDivElementForImage(href) {
  const divElement = document.createElement("div");
  // const spanElement = document.createElement("span");
  // divElement.appendChild(spanElement);
  // spanElement.classList.add("prod_thumb_box");
  // spanElement.classList.add("img_box");
  const imageElement = getBookImageElement(href);
  divElement.appendChild(imageElement);
  divElement.classList.add("book-img-area");
  return divElement;
}

// function getBookInfoDivElement(bookInfo) { // bookInfo 객체
function getBookInfoDivElement() {
  const bookInfoDivElement = document.createElement("div");
  // bookInfoDivElement.classList.add("book-info-area");

  return bookInfoDivElement;
}

/**
 * div를 구성할 수 있는 요소들을 넘겨받아서 list를 구성할 div tag에 값들을 구성하여 return 한다
 * li tag에 추가하는 것은 밖에서 처리한다.
 * FP스타일로 처리한다.
 */
function getBookInfoArea(href) {
  // "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162542125.jpg"
  const bookInfoArea = document.createElement("div");
  // bookInfoArea.classList.add("prod_area");
  // bookInfoArea.classList.add("horizontal");
  const bookImageElement = getDivElementForImage(href);
  const bookInfoDivElement = getBookInfoDivElement();
  // book info
  bookInfoArea.appendChild(bookImageElement);
  bookInfoArea.classList.add("book-img-area");
  bookInfoArea.appendChild(bookInfoDivElement);
  bookInfoArea.classList.add("book-info-area");
  return bookInfoArea;
}

/**
 * backend에 만들어둔 search api 호출하여 값을 가져온다
 * search 창에 입력 받은 값을 넘겨받아서 화면에 출력한다
 * fetch로 호출해서 받은값은 return 시킬 수 없는가?
 * @returns book list
 */
function getSearchedBookList() {
  // http://localhost:4242/search?keyword=python&page=43
  // fetch("https://localhost:4242/search")
  // 현재 페이지의 전체 URL 가져오기
  // const currentURL = window.location.href;
  // console.log(`currentURL: ${currentURL}`);
  fetch("http://localhost:4242/search?keyword=python")
    .then((response) => {
      // console.log("#  response.json()");
      response.json();
    })
    .then((data) => {
      console.log("#data", data);
    });
}

function searchBooks() {
  // console.log("### searchBooks");
  getSearchedBookList();
  // const inputElement = document.getElementById("search-input");
  // const inputValue = inputElement.value;
  // if (!inputValue.trim()) return;
  // console.log("input value : ", inputValue);
  // // console.log("process.env.PORT : ", process.env.PORT);
  // //   alert("Clicked search button");
  // inputElement.value = "";
  // const bookListArea = document.getElementById("book-list");
  // const liElement = document.createElement("li");
  // // liElement.textContent = inputValue
  // // "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162542125.jpg"
  // // const href =
  // //   "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162542125.jpg";
  // const href = "";
  // const bookInfoArea = getBookInfoArea(href);
  // // // bookInfoArea
  // liElement.appendChild(bookInfoArea);
  // liElement.classList.add("book-item");
  // bookListArea.appendChild(liElement);
}

// function getBookList(searchKeyword) {
//   searchKeyword;
//   return;
// }
