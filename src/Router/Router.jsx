import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import SendParcel from "../Pages/SendParcel/SendParcel";
import MyParcel from "../Pages/MyParcel/MyParcel";
import Dashboard from "../Layouts/Dashboard";
import PaymentCancel from "../payment/PaymentCancel";
import PaymentSuucess from "../payment/PaymentSuucess";
import PaymentHistory from "../Pages/Payment History/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts></RootLayouts>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        element: <Coverage></Coverage>,
      },
      {
        path: "/SendParcel",
        element: <SendParcel></SendParcel>,
        loader: () => fetch("./serviceCenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "myParcel",
        element: <MyParcel></MyParcel>,
      },
      {
        path: "payment-success",
        element: <PaymentSuucess></PaymentSuucess>,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancel></PaymentCancel>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
