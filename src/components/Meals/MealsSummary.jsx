import React from "react";
import styles from "./MealsSummary.module.css";

function MealsSummary(props) {
  return (
    <section className={styles.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our selection of available meals and
        enjoy a delicious lunch or diner at home.
      </p>
      <p>
        All our meal are cooked with high-quality ingredients, just-in-time and
        of course by exoerienced chefs!
      </p>
    </section>
  );
}

export default MealsSummary;
