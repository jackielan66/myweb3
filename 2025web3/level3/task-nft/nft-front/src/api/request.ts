import axios from "axios";

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: "http://localhost/api/v1", // 默认 API 根地址，可以根据实际需求修改
  timeout: 10000, // 请求超时设置
  headers: {
    "Content-Type": "application/json", // 默认请求头
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求之前可以进行处理，比如添加认证 token
    // 如果你使用了用户身份验证，可以在这里动态设置 token
    // const token = localStorage.getItem("token"); // 从本地存储获取 token
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    console.log("请求拦截器", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 响应成功的处理
    return response.data;
  },
  (error) => {
    // 响应错误的处理
    if (error.response) {
      // 服务器返回了响应
      console.error("API Error:", error.response.data);
    } else {
      // 请求未响应
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// 封装的请求方法
const request = {
  get: (url:string, params = {}) => instance.get(url, { params }),
  post: (url:string, data = {}) => instance.post(url, data),
  put: (url:string, data = {}) => instance.put(url, data),
  delete: (url:string,) => instance.delete(url),
};

export default request;
