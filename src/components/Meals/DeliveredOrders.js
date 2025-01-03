import { useState, useEffect } from "react";
import classes1 from "./AvailableMeals.module.css";
import classes from "./OrderList.module.css"; // Assuming CSS module for styling
import { BASE_URL } from "../../Configs/config";

const DeliveredOrders = () => {

const [ordersList, setList] = useState([])
const userData = JSON.parse(localStorage.getItem('userData'))

useEffect(()=>{
    
    fetch(`${BASE_URL}/orders?user_id=${userData._id}&status=${""}&train_number=${""}&?delivery_address=${""}`) // Replace with your API endpoint
    .then((response) => response.json())
    .then((data) =>{ 
      console.log(data, "data with Usr id")
      setList(data)
    })
    .catch((error) => console.error("Error fetching orders:", error));
},[])

const OrderCards = ({ ordersList }) => {
    return (
      <div className={classes.orderListContainer}>
        <div className={classes.cardGrid}>
          {ordersList?.length > 0 ? ordersList.map((item) => (
            <div key={item._id} className={classes.orderCard}>
              <div className={classes.cardHeader}>
                <h3>Order ID: {item._id}</h3>
                <span
                  className={
                    item.status === "Delivered"
                      ? classes.statusDelivered
                      : item.status === "Pending"? classes.statusPending : classes.statusDipatch
                  }
                >
                  {item.status}
                </span>
              </div>
              <div className={classes.cardBody}>
                <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                <p>
                  <strong>Train Number:</strong> {item.train_number}
                </p>
                <p>
                  <strong>Coach & Seat:</strong> {item.coach_number}, Seat{" "}
                  {item.seat_number}
                </p>
                <p>
                  <strong>Date:</strong>
                  {item?.date || new Date().toDateString()}
                </p>
                </div>
                <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                <p>
                  <strong>Delivery Address:</strong> {item.delivery_address}
                </p>
                <p>
                  <strong>Delivered By:</strong>{" "}
                  {item.status === "Delivered"
                    ? item.delivery_person_data?.username || "Delivery Boy"
                    : "N/A"}
                </p>
                <p>
                  <strong>Delivery Date:</strong>{" "}
                  {item.delivery_time
                    ? new Date(item.delivery_time).toLocaleString()
                    : "N/A"}
                </p>
                </div>
                <p>
                  <strong>Food Items:</strong>{" "}
                  {item.food_items
                    .map((food) =>
                      food.amount ? `${food.name} (${food.amount})` : food.name
                    )
                    .join(", ")}
                </p>
          
              </div>
            </div>
          )) :
          <div> 
            <h2 className={classes.header}>No Orders</h2>
            <p style={{justifyContent:'center', textAlign:'center'}}> You haven't placed any order yet</p>
          </div>
        }
        </div>
      </div>
    );
  };

return(
    <section className={classes1.meals}>
      <OrderCards ordersList={ordersList}/>
  </section>
)
}
export default DeliveredOrders;