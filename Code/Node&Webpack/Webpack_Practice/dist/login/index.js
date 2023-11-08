/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/check.js
const checkPhone = (phone) => phone.length === 11;
const checkCode = (code) => code.length === 6;

;// CONCATENATED MODULE: ./src/login/index.js




document.querySelector(".btn").addEventListener("click", () => {
  const phone = document.querySelector(".login-form [name=mobile]").value;
  const code = document.querySelector(".login-form [name=code]").value;

  if (!checkPhone(phone)) {
    console.log("Please enter the correct phone number.");
    return;
  }

  if (!checkCode(code)) {
    console.log("Please enter the correct code.");
    return;
  }

  console.log("Upload the info to login...");
});

/******/ })()
;