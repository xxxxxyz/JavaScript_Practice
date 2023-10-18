/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

// 1. 默认展示北京市的天气
// 1.1 封装函数 -- 获取天气并展示
function getWeather(cityCode) {
  myAxios({
    url: "http://hmajax.itheima.net/api/weather",
    params: {
      city: cityCode,
    },
  })
    .then((result) => {
      const wObj = result.data;
      console.log(wObj);
      // 1.2 展示数据
      const dataStr = `<span class="dateShort">${wObj.date}</span>
      <span class="calendar">农历&nbsp;
        <span class="dateLunar">${wObj.dateLunar}</span>
      </span>`;
      document.querySelector(".title").innerHTML = dataStr;
      document.querySelector(".area").innerHTML = wObj.area;
      // weather box
      const weatherStr = `<div class="tem-box">
        <span class="temp">
          <span class="temperature">${wObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${wObj.psPm25}</span>
          <span class="psPm25Level">${wObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src=${wObj.weatherImg} class="weatherImg" alt="">
            <span class="weather">${wObj.weather}</span>
          </li>
          <li class="windDirection">${wObj.windDirection}</li>
          <li class="windPower">${wObj.windPower}</li>
        </ul>`;
      document.querySelector(".weather-box").innerHTML = weatherStr;

      // today's weather
      const twObj = wObj.todayWeather;
      const twStr = `<div class="range-box">
      <span>今天：</span>
      <span class="range">
        <span class="weather">${twObj.weather}</span>
        <span class="temNight">${twObj.temNight}</span>
        <span>-</span>
        <span class="temDay">${twObj.temDay}</span>
        <span>℃</span>
      </span>
    </div>
    <ul class="sun-list">
      <li>
        <span>紫外线</span>
        <span class="ultraviolet">${twObj.ultraviolet}</span>
      </li>
      <li>
        <span>湿度</span>
        <span class="humidity">${parseInt(twObj.humidity)}</span>%
      </li>
      <li>
        <span>日出</span>
        <span class="sunriseTime">${twObj.sunriseTime}</span>
      </li>
      <li>
        <span>日落</span>
        <span class="sunsetTime">${twObj.sunsetTime}</span>
      </li>
    </ul>`;
      document.querySelector(".today-weather").innerHTML = twStr;

      // 7 days forecast
      const fArr = wObj.dayForecast;
      const wfStr = fArr
        .map((item) => {
          // console.log(item);
          return `<li class="item"><div class="date-box">
        <span class="dateFormat">今天</span>
        <span class="date">${item.date}</span>
      </div>
      <img src=${item.weatherImg} alt="" class="weatherImg">
      <span class="weather">${item.weather}</span>
      <div class="temp">
        <span class="temNight">${item.temNight}</span>-
        <span class="temDay">${item.temDay}</span>
        <span>℃</span>
      </div>
      <div class="wind">
        <span class="windDirection">${item.windDirection}</span>
        <span class="windPower">&lt;${item.windPower}</span>
      </div></li>`;
        })
        .join("");
      // console.log(wfStr);
      // insert the wfStr
      document.querySelector(".week-wrap").innerHTML = wfStr;
    })
    .catch((error) => {
      console.dir(error);
    });
}

getWeather("110100"); // 获取默认北京市天气信息

/*
 * 2. 搜索城市列表
 * 2.1 绑定Input事件，获取关键字
 * 2.2 获取并展示城市列表
 */

document.querySelector(".search-city").addEventListener("input", (e) => {
  console.log(e.target.value);
  myAxios({
    url: "http://hmajax.itheima.net/api/weather/city",
    params: {
      city: e.target.value,
    },
  }).then((result) => {
    const cityArr = result.data;
    const cityArrStr = cityArr
      .map((item) => {
        return `<li class="city-item" data-code=${item.code}>${item.name}</li>`;
      })
      .join("");
    document.querySelector(".search-list").innerHTML = cityArrStr;
  });
});

/*
 * 3. 展示搜索城市天气
 * 3.1 检测点击事件，获取城市code 值
 * 3.2 传入数据
 */
// event delegation
document.querySelector(".search-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("city-item")) {
    //点击城市
    const cityCode = e.target.dataset.code;
    // console.log(cityCode);
    getWeather(cityCode);
  }
});
