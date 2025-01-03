import { useState,Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import classes from "./AvailableMeals.module.css";
import DeliveredOrders from "./DeliveredOrders";
const Meals = () => {
    const [activeTab, setActiveTab] = useState("menu");
    const TabsContent = ()=>{
        return(
            <div>
            <div className={classes.tabs}>
        <div
          onClick={() => setActiveTab("menu")}
          style={{
            ...styles.tab,
            backgroundColor: activeTab === "menu" ? "#8a2b06" : "#f1f1f1",
            color: activeTab === "menu" ? "#fff" : "#000",
          }}
        >
          Menu
        </div>
        <div
          onClick={() => setActiveTab("myOrders")}
          style={{
            ...styles.tab,
            backgroundColor: activeTab === "myOrders" ? "#8a2b06" : "#f1f1f1",
            color: activeTab === "myOrders" ? "#fff" : "#000",
          }}
        >
          My Orders
        </div>
      </div>
      </div>
        )
    }
    return (
        <Fragment>
            <MealsSummary />
            <TabsContent/>
            {activeTab === "menu" && <AvailableMeals />}
            {activeTab === "myOrders" && <DeliveredOrders />}
        </Fragment>
    );
};

export default Meals;

const styles = {
    tabHeader: {
      display: "flex",
      justifyContent: "space-evenly",
      borderBottom: "2px solid #ddd",
      width:'10rem'
    },
    tab: {
      flex: 1,
      padding: "10px 20px",
      textAlign: "center",
      cursor: "pointer",
      fontSize: "16px",
      borderBottom: "2px solid transparent",
    }
  };