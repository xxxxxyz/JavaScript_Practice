import "./index.css";
import "./index.less";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkCode, checkPhone } from "../utils/check.js";

// document.querySelector(".btn").addEventListener("click", () => {
//   const phone = document.querySelector(".login-form [name=mobile]").value;
//   const code = document.querySelector(".login-form [name=code]").value;

//   if (!checkPhone(phone)) {
//     console.log("Please enter the correct phone number.");
//     return;
//   }

//   if (!checkCode(code)) {
//     console.log("Please enter the correct code.");
//     return;
//   }

//   console.log("Upload the info to login...");
// });

// 本地图片资源要用import 方式 ; 如果是网络图片，可以直接使用
import imgObj from "./assets/logo.png";

const theImg = document.createElement("img");
theImg.src = imgObj;
document.querySelector(".login-wrap").appendChild(theImg);

// import axios
import myAxios from "../utils/request";
import { myAlert } from "../utils/alert";

document.querySelector(".btn").addEventListener("click", () => {
  const phone = document.querySelector(".login-form [name=mobile]").value;
  const code = document.querySelector(".login-form [name=code]").value;

  if (!checkPhone(phone)) {
    myAlert(false, "Please enter the correct mobile number.");
    return;
  }

  if (!checkCode(code)) {
    myAlert(false, "Please enter the correct code.");
    return;
  }

  myAxios({
    url: "/v1_0/authorizations",
    method: "post",
    data: {
      mobile: phone,
      code: code,
    },
  })
    .then(() => {
      myAlert(true, "Login success");
    })
    .catch((error) => {
      myAlert(false, error.response.data.message);
    });
});

if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}
console.log("Operating under the dev mode.");

console.warn("123");

import youAxios from "@/utils/request.js";
console.log(youAxios);

// * import relative CDN to html
// * check what kind of environment
