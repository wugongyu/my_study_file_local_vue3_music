import axios, { type AxiosRequestConfig } from "axios";

// 请求默认配置
axios.defaults.baseURL = localStorage.getItem('BASE_URL')?.toString();
axios.defaults.timeout = 20 * 1000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.params = {
      ...config.params,
      t: Date.now(),
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

interface Http {
  get<T>(url: string, params?: unknown): Promise<T>;
  post<T>(url: string, params?: unknown): Promise<T>;
  put<T>(url: string, params?: unknown): Promise<T>;
  delete<T>(url: string, params?: unknown): Promise<T>;
  upload<T>(url: string, params?: unknown): Promise<T>;
  download<T>(url: string): void;
}

const http: Http = {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, { params })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.data));
    });
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(params))
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.data));
    });
  },
  put: (url, params) => {
    return new Promise((resolve, reject) => {
        axios.put(url, JSON.stringify(params))
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.data));
    });
  },
  delete: (url, params) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, { params })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.data));
    });
  },
  upload: (url, file) => {
    return new Promise((resolve, reject) => {
        axios.post(url, file, {
          headers: {'Content-Type': "multipart/form-data"}
         })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.data));
    });
  },
  download: (url) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = () => {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
}

export default http;