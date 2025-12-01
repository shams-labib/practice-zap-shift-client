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
import RiderPage from "../Pages/Rider/RiderPage";
import ApproveRiders from "../Pages/Dashboard/ApprovedRiders/ApprovedRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../PrivateRoute/AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "../PrivateRoute/RiderRoute";
import AssignedDeliveries from "../Pages/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";

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
        path: "/rider",
        Component: RiderPage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "/coverage",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        element: <Coverage></Coverage>,
      },
      {
        path: "/SendParcel",
        element: <SendParcel></SendParcel>,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "/parcel-track/:trackingId",
        element: <ParcelTrack></ParcelTrack>,
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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
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

      // Rider only routes
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },

      // Admin Only Routes
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: <AssignRiders></AssignRiders>,
      },
    ],
  },
]);
