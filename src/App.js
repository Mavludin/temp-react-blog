import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Routes } from "./components/Routes/Routes";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogIn = () => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />

        <main>
          <Routes
            isLoggedIn={isLoggedIn}
            handleLogIn={handleLogIn}
          />
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}
