import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css"; // AntD v5 推荐的样式引入
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
