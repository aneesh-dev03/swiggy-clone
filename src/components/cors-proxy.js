const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://www.swiggy.com",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader("User-Agent", "Mozilla/5.0");
      },
    },
  })
);

app.listen(5000, () => console.log("Proxy running on port 5000"));