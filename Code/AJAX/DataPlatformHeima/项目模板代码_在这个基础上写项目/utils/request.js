// 基地址
// axios 公共配置
axios.defaults.baseURL = "http://geek.itheima.net";

// axios interceptors request
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// axios interceptors response
axios.interceptors.response.use(
  function (response) {
    const result = response.data;
    return result;
  },
  function (error) {
    // eg: give response to 401 error
    console.dir(error);
    if (error?.response?.status === 401) {
      alert("Incorrect authentication, please login again");
      localStorage.clear();
      location.href = "../login/index.html";
    }
    return Promise.reject(error);
  }
);
