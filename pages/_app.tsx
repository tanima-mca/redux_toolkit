import Wrapper from "@/layout/wrapper/wrapper";
import { store } from "@/redux/api/store";
import { Check_token } from "@/redux/slice/authSlice";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch } from "react-redux";
export default function App({ Component, pageProps }: AppProps) {


  return (
    <Provider store={store}>
      <Wrapper>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
