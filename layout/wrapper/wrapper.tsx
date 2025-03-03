import React, { ReactNode, useEffect } from "react";
import Header from "../header/header";
import { useDispatch } from "react-redux";
import { Check_token } from "@/redux/slice/authSlice";

interface props {
  children: ReactNode;
}
const Wrapper: React.FC<props> = ({ children }) => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(Check_token());
  }, []);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Wrapper;
