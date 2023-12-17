// import express from express
const express = require("express");
const router = express.Router();
const axios = require("axios");
const xml2js = require("xml2js");

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
  const apiResponse = await axios
    .get(apiEndpoint, {
      params: { query: "rust", start: 142, display: 100 },
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_BOOK_API_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_BOOK_API_CLIENT_SECRET,
      },
    })
    .catch((error) => {
      console.error(error);
    });
  res.json(apiResponse.data);
});

module.exports = router;
