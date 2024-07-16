import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import AdminLayout from "./pages/AdminLayout";
import { AuthContextProvider } from "./authContext";
import ProtectedRoute from "./protectedRoute";
import Products from "./pages/Products";
import Users from "./pages/Users";
import UserLoginPage from "./userpages/UserLoginPage";
import UserHomePage from "./userpages/UserHomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import UserRegisterPage from "./userpages/UserRegisterPage";
import { CartContextProvider } from "./userComponents/cartContext";
import CartPage from "./userComponents/cartPage";
import OrderProduct from "./userComponents/OrderProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, path: "/home", element: <HomePage /> },
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
    ],
  },
  {
    path: "user",
    children: [
      { path: "home", element: <UserHomePage /> },
    ],
  },
  {
    path: "/",
    children: [
      { path: "cart", element: <CartPage /> },
    ],
  },
  {
    path: "/",
    children: [
      { path: "orderProduct", element: <OrderProduct/> },
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
