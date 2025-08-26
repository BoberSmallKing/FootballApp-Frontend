import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./components/pages/Home";
import CreateClub from "./components/pages/CreateClub";
import CreateArticle from "./components/pages/CreateArticle";
import Edit from "./components/pages/Edit";
import Delete from "./components/pages/Delete";
import Navbar from "./components/navbar/Navbar";
import Article from "./components/pages/Article";
import ArticleDetail from "./components/pages/ArticleDetail";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import Register from "./components/pages/Register";
import FootballclubDetail from "./components/pages/FootballclubDetail";
import NotLogin from "./components/pages/NotLogin";

function App() {
  return (
    <>
      <Navbar
        content={
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notlogin" element={<NotLogin />} />
            <Route path="/articles" element={<Article />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/league/:id" element={<Home />} />
            <Route path="/create_club" element={<CreateClub />} />
            <Route path="/create_article" element={<CreateArticle />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/delete/:id" element={<Delete />} />
            <Route path="/footballclub/:id" element={<FootballclubDetail />} />
          </Routes>
        }
      />
    </>
  );
}

export default App;
