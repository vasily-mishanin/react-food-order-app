import React, { useState, useEffect } from "react";
import styles from "./AvailableMeals.module.css";
//import MEALS from "../../data/dummy-meals.js";
import MealItem from "./MealItem";
import Card from "../UI/Card/Card";

function AvailableMeals(props) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  //callback of useEffect shoud be syncronous
  useEffect(() => {
    console.log("EFFECT");

    const fetchMeals = async () => {
      // setIsLoading(true);
      const response = await fetch(
        "https://react-food-order-app-6b5dd-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
        {
          /* method, headers, body e.c. */
        }
      );

      if (!response.ok) {
        console.log("response.status ", response.status, response.statusText);
        throw new Error("Failed to download meals data");
      }

      const mealsData = await response.json();
      console.log(mealsData);

      const loadedMeals = [];
      for (let key in mealsData) {
        loadedMeals.push({
          id: key,
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // inside useEffect callback you allowed use async function CALL
    // fetchMeals => Promise
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setLoadingError(error.message);
    });

    //useEffect cleanup
    return () => {
      console.log("Clean Up");
    };
  }, []);

  // HANDLING JSX
  if (isLoading) {
    return <h4 className={styles["meals-loading"]}>Loading ...</h4>;
  }

  if (loadingError) {
    return <h4 className={styles["meals-loading-error"]}>{loadingError}</h4>;
  }

  const mealsList = meals.map((meal) => {
    return <MealItem meal={meal} key={meal.id} />;
  });

  return (
    <section className={styles.meals}>
      <Card>
        {isLoading && <p>Loading ...</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
