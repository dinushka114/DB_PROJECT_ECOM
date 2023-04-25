import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import AdminHome from "./pages/Admin/AdminHome";
import SellerHomePage from "./pages/Seller/SellerHomePage/SellerHomePage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegisterPage";
import UserLoginPage from "./pages/UserLoginPage/UserLoginPage";
import MyAccountPage from "./pages/MyAccount/MyAccountPage";
import SellerLogin from "./pages/Seller/SellerLogin/SellerLogin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />


        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/seller/*" element={<SellerHomePage />} />


        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/user-register" element={<UserRegisterPage />} />
        <Route path="/user-login" element={<UserLoginPage />} />

        <Route path="/my-account" element={<MyAccountPage />} />
        <Route path="/seller-login" element={<SellerLogin />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        

      </Routes>
    </BrowserRouter>

  );
}

export default App;
