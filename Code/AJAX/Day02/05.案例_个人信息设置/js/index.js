/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */

const creator = "播仔";
axios({
  url: "http://hmajax.itheima.net/api/settings",
  params: {
    creator,
  },
}).then((result) => {
  const userObj = result.data.data;
  // console.log(Object.keys(userObj));
  Object.keys(userObj).map((key) => {
    if (key === "avatar") {
      document.querySelector(".prew").src = userObj[key];
    } else if (key === "gender") {
      const genderList = document.querySelectorAll(".gender");
      const genderNum = userObj[key];
      genderList[genderNum].checked = true;
    } else {
      document.querySelector(`.${key}`).value = userObj[key];
    }
  });
});

/**
 * 目标2：修改头像
 *  2.1 获取头像文件
 *  2.2 提交服务器并更新头像
 * */
document.querySelector(".upload").addEventListener("change", (e) => {
  // console.log(e.target.files);
  const fd = new FormData();
  fd.append("avatar", e.target.files[0]);
  fd.append("creator", creator);
  axios({
    url: "http://hmajax.itheima.net/api/avatar",
    method: "put",
    data: fd,
  }).then((result) => {
    // console.log(result);
    const imgUrl = result.data.data.avatar;
    document.querySelector(".prew").src = imgUrl;
  });
});

/**
 * 目标3：提交表单
 *  3.1 收集表单信息
 *  3.2 提交到服务器保存
 */
/**
 * 目标4：结果提示
 *  4.1 创建toast对象
 *  4.2 调用show方法->显示提示框
 */

document.querySelector(".submit").addEventListener("click", () => {
  // 收集表单信息
  const userForm = document.querySelector(".user-form");
  const formData = serialize(userForm, { hash: true, empty: true });

  formData.creator = creator;
  formData.gender = +formData.gender;
  axios({
    url: "http://hmajax.itheima.net/api/settings",
    method: "put",
    data: formData,
  }).then(() => {
    const toastDom = document.querySelector(".my-toast");
    const myToast = new bootstrap.Toast(toastDom);
    myToast.show();
  });
});
