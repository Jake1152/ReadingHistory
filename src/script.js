// const dotenv = require("dotenv");
// dotenv.config();

// ------ handler event -----------

/**
 * Enter 입력시 적용되도록 keypress 이벤트를 사용하였었지만
 * keypree가 deprecated인 관계로 keydown으로 변경하였다
 * @param {} event
 *
 */
function handleKeyDown(event) {
  if (event.keyCode === 13) {
    searchBooks();
  }
}

// ---------------------------------

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
function getBookInfoDivElement(item) {
  const bookInfoDivElement = document.createElement("div");
  // bookInfoDivElement.classList.add("book-info-area");
  bookInfoDivElement.textContent = item.title;

  return bookInfoDivElement;
}

/**
 * div를 구성할 수 있는 요소들을 넘겨받아서 list를 구성할 div tag에 값들을 구성하여 return 한다
 * li tag에 추가하는 것은 밖에서 처리한다.
 * FP스타일로 처리한다.
 */
function getBookInfoArea(item) {
  // "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162542125.jpg"
  const bookInfoArea = document.createElement("div");
  // bookInfoArea.classList.add("prod_area");
  // bookInfoArea.classList.add("horizontal");
  const bookImageElement = getDivElementForImage(item["image"]);
  const bookInfoDivElement = getBookInfoDivElement(item);
  // book info
  bookInfoArea.appendChild(bookImageElement);
  bookInfoArea.classList.add("book-img-area");
  bookInfoArea.appendChild(bookInfoDivElement);
  bookInfoArea.classList.add("book-info-area");
  return bookInfoArea;
}

/**
 * fetch를 async, await 형태로 변경한 뒤 정상적으로 받은 response를 return한다.
 * 수신하는 쪽에서도 async / await형태이어야 한다.
 * @returns book list
 */
async function getSearchedBookList(searchKeyword) {
  // http://localhost:4242/search?keyword=python&page=43
  // fetch("https://localhost:4242/search")
  // 현재 페이지의 전체 URL 가져오기
  // const currentURL = window.location.href;
  // console.log(`currentURL: ${currentURL}`);
  const URL = "http://localhost:4242";
  const searchURL = URL + "/search?keyword=" + searchKeyword;
  console.log(`##searchURL : ${searchURL}`);
  const response = await fetch(searchURL);
  const data = await response.json();
  return data;
  // OLD version
  /**
  fetch()
    .then((response) => {
      // console.log("#  response.json()");
      response.json();
    })
    .then((data) => {
      console.log("#data", data);
      return data;
    });
  */
}
/**
 * -주석 규칙 파악
 * -
 * @param {*} item book item fo Naver book api's response
 */
function renderBookElement(item) {
  const bookListArea = document.getElementById("book-list");
  const liElement = document.createElement("li");
  const bookInfoArea = getBookInfoArea(item);
  // liElement.textContent = inputValue
  liElement.appendChild(bookInfoArea);
  liElement.classList.add("book-item");
  bookListArea.appendChild(liElement);
}

/**
 * total에 이를 때까지 api 호출, 현재 값 기억 필요
 * item마다 한개씩 화면에 element를 찍어준다.
 */
async function searchBooks() {
  console.log("### searchBooks");
  const inputElement = document.getElementById("search-input");
  const searchKeyword = inputElement.value;
  if (!searchKeyword.trim()) return;
  console.log("input value : ", searchKeyword);
  const searchedBookList = await getSearchedBookList(searchKeyword);
  console.log(searchedBookList);

  // // console.log("process.env.PORT : ", process.env.PORT);
  // //   alert("Clicked search button");
  // inputElement.value = "";
  for (item of searchedBookList["items"]) {
    renderBookElement(item);
    // console.log("item : ", item);
  }
}

// function getBookList(searchKeyword) {
//   searchKeyword;
//   return;
// }
