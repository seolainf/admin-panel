import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { getAllProducts } from "./firebase/firebaseFunc";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Products from "./pages/Products/Products";
import Users from "./pages/User/Users";

function App() {
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const productsData = await getAllProducts("products");
      setProducts(productsData);
      const accessoriesData = await getAllProducts("accessories");
      setAccessories(accessoriesData);
    };
    fetchAllProducts();
  }, []);
  return (
    <div className="app">
      <div className="app__sidebar">
        <Sidebar />
      </div>
      <main>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path="news" element={<News type={"User"} />} />
            </Route>
            <Route path="products">
              <Route
                index
                element={<Products data={products} type={"products"} />}
              />
              <Route path="news" element={<News type={"products"} />} />
              <Route path="edit/:id" element={<Edit table={"products"} />} />
            </Route>
            <Route path="accessories">
              <Route
                index
                element={<Products data={accessories} type={"accessories"} />}
              />
              <Route path="news" element={<News type={"accessories"} />} />
              <Route path="edit/:id" element={<Edit table={"accessories"} />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
