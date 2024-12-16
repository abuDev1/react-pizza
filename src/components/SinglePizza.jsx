import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const SinglePizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();

  useEffect(() => {
    const axiosPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://6741e1e7e4647499008f1ddf.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log(error, "Ошибка, братан");
      }
    };

    axiosPizza();
  }, []);

  if (!pizza) {
    return <h2>Loading, please wait...</h2>;
  }


  return (
    <div className="container">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt="" />
      <p>{pizza.price} рублей</p>
    </div>
  );
};
