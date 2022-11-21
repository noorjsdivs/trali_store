import React from "react";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TopHeader from "./components/TopHeader";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Vendor from "./pages/Vendor";
import VendorDashboard from "./pages/VendorDashboard";
import ProductUpload from "./pages/ProductUpload";
import Storename from "./pages/Storename";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/CompareProducts";
import WishList from "./pages/WishList";

function App() {
  return (
    <BrowserRouter>
      <TopHeader />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/vendor" element={<Vendor />}></Route>
        <Route path="/vendordashboard" element={<VendorDashboard />}></Route>
        <Route path="/productupload" element={<ProductUpload />}></Route>
        <Route path="/storename" element={<Storename />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/productdetails/:id" element={<ProductDetails />}></Route>
        <Route path="/compareproducts" element={<CompareProducts />}></Route>
        <Route path="/wishlist" element={<WishList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
