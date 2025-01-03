import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

import MealItem from "./MealItem/MealItem";
import { BASE_URL } from "../../Configs/config";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpErrror, setHttpError] = useState();


  useEffect(() => {
    const fetchMeals = async () => {
      const responce = await fetch(`${BASE_URL}/menu`
      );

      const data = await responce.json();
      console.log(data?.menu, "POP");
      setMeals(data?.menu);
      setLoading(false);
    };

    fetchMeals().catch((err) => {
      setLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsloading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpErrror) {
    return (
      <section className={classes.mealserror}>
        <p>{httpErrror}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal?.id}
      id={meal?.id}
      name={meal?.name}
      description={meal?.description}
      price={meal?.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <h1>Menu</h1>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
