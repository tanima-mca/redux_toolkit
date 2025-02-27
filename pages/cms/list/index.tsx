import { list } from "@/redux/slice/cmsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function List() {
  const dispatch = useDispatch();
  const { listState } = useSelector((state) => state.cms);
  useEffect(() => {
    dispatch(list());
  }, []);

  console.log(listState, "h");

  return (
    <>
      {listState?.product?.map((item) => {
        return (
          <>
            <h2>{item.name}</h2>
          </>
        );
      })}
    </>
  );
}
