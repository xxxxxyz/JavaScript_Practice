import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkCode, checkPhone } from "../utils/check.js";

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
