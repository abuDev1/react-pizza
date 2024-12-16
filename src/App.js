import "./scss/app.scss";
import React, { createContext } from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Basket } from "./pages/Basket";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import { SinglePizza } from "./components/SinglePizza";

export const SearchContext = createContext();

export const App = () => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/singlePizza:id" element={<SinglePizza />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
};
