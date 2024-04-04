import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import CreateProducts from "./pages/createProducts";
import Auth from "./pages/Auth";
import Checkouts from "./pages/Checkout";

function App() {
  return (
    <div className="App bg-white">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/createProducts" element={<CreateProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkouts" element={<Checkouts />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
