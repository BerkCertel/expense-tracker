import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
// import { useDispatch, useSelector } from "react-redux";
// import { decrement, increment } from "../../redux/counterSlice";

function Home() {
  // const { value } = useSelector((state) => state.counter);
  // const dispatch = useDispatch();

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto"></div>{" "}
    </DashboardLayout>
  );
}

export default Home;
