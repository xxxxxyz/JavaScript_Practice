/**
 * 目标：基于 http 模块创建 Web 服务程序
 *  1.1 加载 http 模块，创建 Web 服务对象
 *  1.2 监听 request 请求事件，设置响应头和响应体
 *  1.3 配置端口号并启动 Web 服务
 *  1.4 浏览器请求（http://localhost:3000）测试
 */
const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  res.setHeader("Content-Type", "text/plain;charset=uft-8");
  res.end("Welcome using this Web Service build with Node.js and http model");
});

server.listen("3000", () => {
  console.log("Success");
});
