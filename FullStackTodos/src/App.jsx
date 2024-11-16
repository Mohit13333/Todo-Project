import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos";
import Contact from "./pages/Contact";
import User from "./components/layouts/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/pageNotFound";
import UpdateDetails from "./pages/UpdateDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<User />}>
            <Route path="users/:id/edit" element={<UpdateDetails />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
