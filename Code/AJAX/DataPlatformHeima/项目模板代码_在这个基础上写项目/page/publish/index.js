/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */
async function setChannelList() {
  const res = await axios({
    url: "/v1_0/channels",
  });
  const channelStr =
    `<option value="" selected>请选择文章频道</option>` +
    res.data.channels.map(
      (item) => `<option value="${item.id}">${item.name}</option>`
    );
  document.querySelector(".form-select").innerHTML = channelStr;
}
setChannelList();
/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */
document.querySelector(".img-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  console.log(file);
  const fd = new FormData();
  fd.append("image", file);
  const res = await axios({
    url: "/v1_0/upload",
    method: "post",
    data: fd,
  });
  // console.log(res);
  const imgUrl = res.data.url;

  document.querySelector(".rounded").src = imgUrl;
  document.querySelector(".rounded").classList.add("show");
  document.querySelector(".place").classList.add("hide");
});

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
document.querySelector(".send").addEventListener("click", async (e) => {
  if (e.target.innerHTML !== "发布") return;
  const form = document.querySelector(".art-form");
  const data = serialize(form, { hash: true, empty: true });
  delete data.id;
  data.cover = {
    type: 1,
    images: [document.querySelector(".rounded").url],
  };
  try {
    const res = await axios({
      url: "/v1_0/mp/articles",
      method: "post",
      data,
    });
    myAlert(true, "Success");
    form.reset();
    document.querySelector(".rounded").url = "";
    document.querySelector(".rounded").classList.remove("show");
    document.querySelector(".place").classList.remove("hide");
    // Reset RTF
    editor.setHtml("");

    setTimeout(() => {
      location.href = "../content/index.html";
    }, 1000);
  } catch (error) {
    myAlert(false, error.response.data.message);
  }
});

/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）// on the content page
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */
// 4.2 change the title of the page
(function () {
  const paramsStr = location.search;
  const params = new URLSearchParams(paramsStr);
  params.forEach(async (value, key) => {
    // there is an id of editing article passing in
    if (key === "id") {
      document.querySelector(".title span").innerHTML = "修改文章";
      document.querySelector(".send").innerHTML = "修改";
    }
    // 4.4 get the article data and render it into the page
    const res = await axios({
      url: `/v1_0/mp/articles/${value}`,
    });
    const dataObj = {
      channel_id: res.data.channel_id,
      title: res.data.title,
      rounded: res.data.cover.images[0],
      content: res.data.content,
      id: res.data.id,
    };
    // map the obj assets
    Object.keys(dataObj).forEach((key) => {
      if (key === "rounded") {
        // setting the cover
        if (dataObj[key]) {
          //with cover image
          document.querySelector(".rounded").src = dataObj[key];
          document.querySelector(".rounded").classList.add("show");
          document.querySelector(".place").classList.add("hide");
        }
      } else if (key === "content") {
        // setting RTF content
        editor.setHtml(dataObj[key]);
      } else {
        // find the match tag via name asset
        document.querySelector(`[name=${key}]`).value = dataObj[key];
      }
    });
  });
})();

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */
document.querySelector(".send").addEventListener("click", async (e) => {
  if (e.target.innerHTML !== "修改") return;
  // edit article process
  const form = document.querySelector(".art-form");
  const formData = serialize(form, { hash: true, empty: true });
  // console.log(formData); // get the data after edit
  try {
    const res = await axios({
      url: `/v1_0/mp/articles/${formData.id}`,
      method: "put",
      data: {
        ...formData,
        cover: {
          type: document.querySelector(".rounded").src ? 1 : 0,
          images: [document.querySelector(".rounded").src],
        },
      },
    });
    console.log(res);
    myAlert(true, "Edit success");
  } catch (error) {
    myAlert(false, error.response.data.message);
  }
});
