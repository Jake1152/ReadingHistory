// import express from express
const express = require("express");
const router = express.Router();
const axios = require("axios");
const xml2js = require("xml2js");

// search?keyword=rust
/**
 * @see https://openapi.naver.com
 */
router.get("/", async (req, res) => {
  //   const apiEndpoint = `https://www.nl.go.kr/NL/search/openApi/search.do?key=${process.env.OPENAPI_KEY}&kwd=%ED%86%A0%EC%A7%80`;
  // const apiEndpoint = `http://data4library.kr/api/libSrch?authKey=${process.env.OPENAPI_KEY}&pageNo=1&pageSize=10`;
  // const apiEndpoint = `https://openapi.naver.com/v1/search/book.json?query=${req.query}&start=1&sort=sim&display=42`;
  const apiEndpoint = "https://openapi.naver.com/v1/search/book.json";
  //  \
  //   -H "X-Naver-Client-Id: blashblash" \
  //   -H "X-Naver-Client-Secret: blashblash" -v
  // const apiResponse = await axios.get("/v1/search/book.json", {
  //   baseURL: "https://openapi.naver.com",

  const { keyword, start, display } = req.query || "";
  // const keyword = req.query.keyword || "";

  // if (!keyword || !start || !display) {
  if (!keyword) {
    console.error(`keyword : ${keyword}`);
    // console.error(
    //   `keyword : ${keyword}\nstart : ${start}\ndisplay : ${display}`
    // );
    res
      .status(404)
      .send(
        "Could not found query parameter such as keyword, display count, start item number"
      );
  }
  // const page = req.query.page || 1;
  // const display = 10;
  // const start = 1 + display * (page - 1);
  console.log(`keyword : ${keyword}\nstart : ${start}\ndisplay : ${display}`);
  const apiResponse = await axios
    .get(apiEndpoint, {
      params: { query: keyword, start: start, display: display },
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_BOOK_API_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_BOOK_API_CLIENT_SECRET,
      },
    })
    .catch((error) => {
      console.error(error);
    });
  res.json(apiResponse?.data);
});

module.exports = router;
