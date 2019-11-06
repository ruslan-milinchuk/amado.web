import React from "react";

import styles from "./loading.module.css";
import cx from "classnames";

const Loading = () => (
  <div className={styles.skFadingCircle}>
    <div className={cx(styles.skCircle1, styles.skCircle)} />
    <div className={cx(styles.skCircle2, styles.skCircle)} />
    <div className={cx(styles.skCircle3, styles.skCircle)} />
    <div className={cx(styles.skCircle4, styles.skCircle)} />
    <div className={cx(styles.skCircle5, styles.skCircle)} />
    <div className={cx(styles.skCircle6, styles.skCircle)} />
    <div className={cx(styles.skCircle7, styles.skCircle)} />
    <div className={cx(styles.skCircle8, styles.skCircle)} />
    <div className={cx(styles.skCircle9, styles.skCircle)} />
    <div className={cx(styles.skCircle10, styles.skCircle)} />
    <div className={cx(styles.skCircle11, styles.skCircle)} />
    <div className={cx(styles.skCircle12, styles.skCircle)} />
  </div>
);

export default Loading;
