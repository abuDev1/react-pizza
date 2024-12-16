import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { createContext } from "react";

export const SearchContext = createContext();


export const MainLayout = () => {
    const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
};
