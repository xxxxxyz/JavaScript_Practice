// 1.1 get the data of province
axios({
  url: "http://hmajax.itheima.net/api/province",
}).then((result) => {
  //   console.log(result);
  const pnameStr = result.data.list
    .map((pname) => {
      return `<option value="${pname}">${pname}</option>`;
    })
    .join("");
  document.querySelector(".province").innerHTML =
    `<option value="">省份</option>` + pnameStr;
});

// 1.2 select a province and show the city of the selected province
document.querySelector(".province").addEventListener("change", async (e) => {
  const pname = e.target.value;
  // 1.3 get the relative data of city
  const result = await axios({
    url: "http://hmajax.itheima.net/api/city",
    params: {
      pname,
    },
  });
  const cnameStr = result.data.list
    .map((cname) => {
      return `<option value="${cname}">${cname}</option>`;
    })
    .join("");

  document.querySelector(".city").innerHTML =
    `<option value="">城市</option>` + cnameStr;

  // empty the area data
  document.querySelector(".area").innerHTML = `<option value="">地区</option>`;
});

// 1.3 listen the city change & get the area data
document.querySelector(".city").addEventListener("change", async (e) => {
  const result = await axios({
    url: "http://hmajax.itheima.net/api/area",
    params: {
      pname: document.querySelector(".province").value,
      cname: e.target.value,
    },
  });
  //   console.log(result);
  const areaStr = result.data.list
    .map((area) => {
      return `<option value="${area}">${area}</option>`;
    })
    .join("");
  //   console.log(areaStr);
  document.querySelector(".area").innerHTML =
    `<option value="">地区</option>` + areaStr;
});

// 2. collect data post and save
document.querySelector(".submit").addEventListener("click", async () => {
  //2.1 By using form-serialize collect the data from the form
  const form = document.querySelector(".info-form");
  const data = serialize(form, { hash: true, empty: true });
  try {
    // 2.2 post data
    const result = await axios({
      url: "http://hmajax.itheima.net/api/feedback",
      method: "post",
      data,
    });
    alert(result.data.message);
  } catch (error) {
    // console.dir(error);
    alert(error.response.data.message);
  }
});
