import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/shared/ErrorPage";
import Root from "../Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Events from "../pages/AllEvents/Events";
import PrivateRoutes from "./PrivateRoutes";
import AddEvent from "../pages/AddEvent/AddEvent";
import MyEvent from "../pages/MyEvents/MyEvent";
import UpdateEvent from "../pages/UpdateEvents/UpdateEvent";


 export const router = createBrowserRouter([
  {
     path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/events',
          element:<PrivateRoutes><Events></Events></PrivateRoutes>
        },
        {
          path:'/add-event',
          element:<PrivateRoutes><AddEvent></AddEvent></PrivateRoutes>
        },
        {
         path:'/my-event/:id',
         element:<PrivateRoutes><MyEvent></MyEvent></PrivateRoutes>
        },
        {
         path:'/update-event/:id',
         element:<PrivateRoutes><UpdateEvent></UpdateEvent></PrivateRoutes>
        },
        {
          path: '/login',
          element:<Login></Login>
        },
        {
          path:"/register",
          element:<Register></Register>
        }
      ]
  },
]);