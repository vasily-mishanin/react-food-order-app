import React from "react";
import styles from "./AvailableMeals.module.css";
import MEALS from "../../data/dummy-meals.js";
import MealItem from "./MealItem";
import Card from "../UI/Card/Card";

function AvailableMeals(props) {
  const mealsList = MEALS.map((meal) => {
    return <MealItem meal={meal} key={meal.id} />;
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
