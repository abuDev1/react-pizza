import React from "react";

export const Categories = ({ categoryId, onClickCategoryId }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегатарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategoryId(index)}
            className={categoryId === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
