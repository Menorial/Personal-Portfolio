import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

/*
 * basename 必须和 vite 的 base 一致，否则部署到 GitHub Pages 项目页
 * （/<仓库名>/）后路由全部匹配不上，只会在首页无限重定向。
 * BASE_URL 由 vite 注入（形如 '/ai-automation-hero/'），这里去掉末尾斜杠。
 */
const basename = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
