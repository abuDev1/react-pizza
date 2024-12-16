import React, { useEffect } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlockSkeleton/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { axiosPizzas } from "../redux/slices/pizzasSlice";

export const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const navigation = useNavigate();
  const { items, status } = useSelector((state) => state.pizzas);
  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = React.useContext(SearchContext);
  const [curentPage, setCurentPage] = React.useState(1);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
    }
  }, []);

  const fetchPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";

    // axios
    //   .get(
    //     `https://6741e1e7e4647499008f1ddf.mockapi.io/items?&page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   }).catch(err => {
    //     setIsLoading(false)
    //   })

    dispatch(
      axiosPizzas({
        category,
        sortBy,
        order,
        search,
        curentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchPizzas();
  }, [categoryId, sort, searchValue, curentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      categoryId,
      sort: sort.sortProperty,
      curentPage,
    });

    navigation(`?${queryString}`);
  }, [categoryId, sort, curentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategoryId={onClickCategoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <div className="error_message">
            <h2>Произошла ошибка при загрузке 😕</h2>
            <p>
              К величайшему сожалению, не удалось загрузить пиццы. Повторите
              попытку позже.
            </p>
          </div>
        ) : status === "loading" ? (
          [...new Array(12)].map((_, i) => <Skeleton key={i} />)
        ) : (
          items.map((pizza) => (
            // <Link to={`/singlePizza/${pizza.id}`} key={pizza.id}>
              <PizzaBlock key={pizza.id} {...pizza} />
            // </Link>
          ))
        )}
      </div>
      <Pagination onChangePage={(e) => setCurentPage(e)} />
    </>
  );
};
