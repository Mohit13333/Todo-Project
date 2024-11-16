import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Todos from "./pages/Todos";
import Contact from "./pages/Contact";
import Admin from "./components/layouts/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/pageNotFound";
import UpdateDetails from "./pages/UpdateDetails";

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Todos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/admin" element={<Admin/>}>
          <Route path="users/:id/edit" element={<UpdateDetails/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
