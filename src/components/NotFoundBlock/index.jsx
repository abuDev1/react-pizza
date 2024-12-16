import React from "react";

import styles from './NotFoundBlock.module.scss'

export const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено :(</h1>
    </div>
  );
};
