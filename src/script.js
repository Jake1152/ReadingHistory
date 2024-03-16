"use strict";

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search-input");
// const dotenv = require("dotenv");
// dotenv.config();

// ------ handler event -----------

/**
 * Enter 입력시 적용되도록 keypress 이벤트를 사용하였었지만
 * keypree가 deprecated인 관계로 keydown으로 변경하였다
 * @param {} event
 *
 */
const handleKeyDown = (event) => {
  if (event.keyCode === 13) {
    searchBooks();
  }
};

// ---------------------------------

const bookItemInfoOfList = {
  src: "",
  title: "",
  publisher: "",
  author: "",
  link: "",
};

const getBookInfo = (src, title, publisher, author) => {
  return {
    src: src,
    title: title,
    publisher: publisher,
    author: author,
    // link: "",
  };
};

const getBookImageElement = (href) => {
  const imageElement = document.createElement("img");
  imageElement.src = href;
  // imageElement.classList.add("img_box");
  // imageElement.classList.add("ui-tabs-anchor")
  // newAnchor.textContent = "Click me!";
  return imageElement;
};

const getDivElementForImage = (href) => {
  const divElement = document.createElement("div");
  // const spanElement = document.createElement("span");
  // divElement.appendChild(spanElement);
  // spanElement.classList.add("prod_thumb_box");
  // spanElement.classList.add("img_box");
  const imageElement = getBookImageElement(href);
  divElement.appendChild(imageElement);
  divElement.classList.add("book-img-area");
  return divElement;
};

// function getBookInfoDivElement(bookInfo) { // bookInfo 객체
const getBookInfoDivElement = (item) => {
  const bookInfoDivElement = document.createElement("div");
  // bookInfoDivElement.classList.add("book-info-area");
  bookInfoDivElement.textContent = item.title;

  return bookInfoDivElement;
};

/**
 * div를 구성할 수 있는 요소들을 넘겨받아서 list를 구성할 div tag에 값들을 구성하여 return 한다
 * li tag에 추가하는 것은 밖에서 처리한다.
 * FP스타일로 처리한다.
 */
const getBookInfoArea = (item) => {
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
};

/**
 * fetch를 async, await 형태로 변경한 뒤 정상적으로 받은 response를 return한다.
 * 수신하는 쪽에서도 async / await형태이어야 한다.
 * @returns book list
 */
/**
 * TODO display개수를 서버로 넘겨주어서 처리할 것!!
 */
const getSearchedBookList = async (searchKeyword) => {
  // http://localhost:4242/search?keyword=python&page=43
  // fetch("https://localhost:4242/search")
  // 현재 페이지의 전체 URL 가져오기
  // const currentURL = window.location.href;
  // console.log(`currentURL: ${currentURL}`);
  // const apiEndpoint = `https://openapi.naver.com/v1/search/book.json?
  // query=${req.query}&start=1&sort=sim&display=42`;
  const start = 1;
  const display = 51;
  const URL = "http://localhost:4242";
  // let으로하면 쪼개서 각 쿼리 파라미터 추가 가능할테지만 const인게 나을것인가?
  const searchURL =
    URL +
    "/search?keyword=" +
    searchKeyword +
    "&start=" +
    start +
    "&display=" +
    display;
  // const searchURL = URL + "/search?keyword=" + searchKeyword;
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
};
/**
 * -주석 규칙 파악
 * -
 * @param {*} item book item fo Naver book api's response
 */
const renderBookElement = (item) => {
  const bookListArea = document.getElementById("book-list");
  const liElement = document.createElement("li");
  const bookInfoArea = getBookInfoArea(item);

  // liElement.textContent = inputValue
  liElement.appendChild(bookInfoArea);
  liElement.classList.add("book-item");
  bookListArea.appendChild(liElement);
};

/**
 * total에 이를 때까지 api 호출, 현재 값 기억 필요
 * item마다 한개씩 화면에 element를 찍어준다.
 * 
 * # 검색할때 book list area의 innerHTML 요소 초기화
 *이 방식으로 지우는 게 괜찮은 방식인가?
  다른 방식은 없는가?
  효율성의 문제나 예상치 못한 버그가 있을 가능성은 없는가?
  const bookListArea = document.getElementById("book-list");
  bookListArea.innerHTML = ""; // 이전에 그렸던 내용 제거
  
 * GPT answer 29FEB24
   이 방식은 일반적으로 간단하고 효율적입니다. 그러나 대규모의 요소를 다루거나 특정한 상황에서는 성능 문제가 발생할 수 있습니다. 이 방법의 장단점은 다음과 같습니다.
장점:

간단하고 직관적입니다. 코드가 명확하며, 다른 개발자가 이해하기 쉽습니다.
브라우저가 자동으로 메모리를 관리하므로 일반적으로 이 정도의 요소를 제거하는 것은 성능에 큰 영향을 미치지 않습니다.
단점:

대량의 요소가 있을 경우, innerHTML을 사용하여 모든 자식 요소를 지우는 것은 성능 저하를 일으킬 수 있습니다. 이 경우, 요소를 하나씩 제거하는 것이 더 효율적일 수 있습니다.
innerHTML을 사용하면 이벤트 핸들러와 같은 추가적인 데이터와 상태도 함께 제거됩니다. 때로는 이러한 데이터를 보존하고자 할 수도 있습니다.
스크립트에서 직접 HTML 코드를 조작하는 것은 보안 측면에서 취약할 수 있습니다. 특히 동적으로 생성된 콘텐츠의 경우, 사용자 입력을 신뢰하고 직접 HTML에 추가하는 것은 XSS(Cross-Site Scripting) 취약점을 초래할 수 있습니다.
대규모의 요소를 처리하거나 추가적인 상태를 유지하고자 할 때는 이러한 단점을 고려하여 다른 접근 방식을 사용할 수 있습니다. 예를 들어, 더 효율적인 요소 제거를 위해 DOM을 직접 조작하는 방법을 사용하거나, 프레임워크나 라이브러리를 사용하여 상태를 관리할 수 있습니다. 또한, 보안 측면에서는 사용자 입력을 신뢰하고 직접 HTML 코드에 추가하는 대신, 안전한 방법으로 콘텐츠를 추가하는 것이 좋습니다.
 */

/**
 * 이전에 있던 요소들을 지우는 것에서 어떤 방식이 효율적이고 프론트엔드 구현방식에서 일반적인가?
 * 그리고 왜 그 방식을 쓰는가?
 * 프레임워크들에서 컴포넌트를 지우고 추가하는 방식은 어떠한가?
 * @returns
 */
const searchBooks = async () => {
  console.log("### searchBooks");

  // 이 방식으로 지우는 게 괜찮은 방식인가?
  // 다른 방식은 없는가?
  // 효율성의 문제나 예상치 못한 버그가 있을 가능성은 없는가?
  const bookListArea = document.getElementById("book-list");
  // bookListArea.textContent = ""; // 이전에 그렸던 내용 제거
  while (bookListArea.firstChild) {
    bookListArea.removeChild(bookListArea.firstChild);
  }

  const inputElement = document.getElementById("search-input");
  const searchKeyword = inputElement.value;
  if (!searchKeyword.trim()) return;
  console.log("input value : ", searchKeyword);
  const searchedBookList = await getSearchedBookList(searchKeyword);
  console.log(searchedBookList);

  // inputElement.value = "";
  for (const item of searchedBookList["items"]) {
    renderBookElement(item);
  }
};

/**
 * 다른 파일에서 참고한 함수 배치 방식인데 이대로 하여도 되는가?
 * 추가 자료조사하여 코드 배치 스타일 파악 필요
 *
 * 현재 방식
 * 상단 tag element 담아두는 변수
 * 하단 event 등록
 */
window.addEventListener("load", () => {
  searchButton.addEventListener("click", searchBooks);
  searchInput.addEventListener("keydown", handleKeyDown);
});
