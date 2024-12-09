import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./adminPages/HomePage";
import RootLayout from "./adminPages/RootLayout";
import AdminLayout from "./adminPages/AdminLayout";
import { AuthContextProvider } from "./authContext";
import ProtectedRoute from "./protectedRoute";
import Products from "./adminPages/Products";
import Users from "./adminPages/Users";
import UserLoginPage from "./userpages/UserLoginPage";
import UserHomePage from "./userpages/UserHomePage";
import AdminLoginPage from "./adminPages/AdminLoginPage";
import AdminRegisterPage from "./adminPages/AdminRegisterPage";
import UserRegisterPage from "./userpages/UserRegisterPage";
import { CartContextProvider } from "./userComponents/cartContext";
import CartPage from "./userComponents/cartPage";
import Order from "./userComponents/Order";
import AdminOrders from "./adminPages/AdminOrders";
import SmartPhonePage from "./userComponents/smartphonePage";
import TabPage from "./userComponents/tabPage";
import Header from "./userComponents/Header";
import LaptopPage from "./userComponents/LaptopPage";
import TvPage from "./userComponents/TvPage";
import HeadPhonePage from "./userComponents/HeadphonesPage";
import WatchesPage from "./userComponents/WatchesPage";
import UserProfile from "./userpages/UserProfile";
import ProductPage from "./userComponents/productPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to ="/home"/>},
      { path: "/home", element: <HomePage /> },
      { path: "/admin/login", element: <AdminLoginPage /> },
      { path: "/user/login", element: <UserLoginPage /> },
      { path: "/admin/register", element: <AdminRegisterPage /> },
      { path: "/user/register", element: <UserRegisterPage /> },
      // { path: "/cart", element: <CartPage /> },
      // { path: "user/home", element: <UserHomePage /> },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "products", element: <Products /> },
      { path: "users", element: <Users /> },
      { path: "orders", element: <AdminOrders /> },
    ],
  },
  {
    path: "user",
    children: [
      { path: "home", element: <UserHomePage /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "smartphone", element: <> <Header/> <SmartPhonePage/> </>  },
      { path: "tabs", element: <><Header/> <TabPage/></> },
      { path: "laptops", element: <> <Header/> <LaptopPage/></> },
      { path: "tv", element: <> <Header/> <TvPage/></> },
      { path: "headphones", element: <> <Header/> <HeadPhonePage/></> },
      { path: "watches", element: <> <Header/> <WatchesPage/></> },
    ],
  },
  {
    path: "/",
    children: [
      { path: "cart", element: <><Header/> <CartPage /> </> },
    ],
  },
  {
    path: "/",
    children: [
      { path: "product-page", element: <><Header/> <ProductPage /> </> },
    ],
  },
  {
    path: "/",
    children: [
      { path: "order", element: <Order/> },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
      <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
