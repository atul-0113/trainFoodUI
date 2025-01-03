import React, { useState, useEffect } from "react";
import classes from "../Meals/OrderList.module.css";
import { BASE_URL } from "../../Configs/config";
const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem('userData'))
  const token = localStorage.getItem('authToken')
  useEffect(() => {
    // Fetch orders for the delivery boy
    fetchOrders()
  }, []);

  async function fetchOrders(){
    await fetch(`${BASE_URL}/orders?delivery_boy=${userData?._id}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data,"data")
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching delivery orders:", error);
        setLoading(false);
      });
  }
 async function handleDeliver(id){
  const resp = await fetch(`${BASE_URL}/updateOrderStatus`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      order_id: id,
      status: "Delivered",
      delivery_boy: userData?._id
    }),
  })
  const data =  await resp.json();
  console.log(data, "data")
  if(data){
    fetchOrders()
  }
 }
      const OrderCards = ({ ordersList }) => {
        return (
          <div className={classes.orderListContainer}>
            <h2 className={classes.header}>Order List</h2>
            <div className={classes.cardGrid}>
              {ordersList?.map((item) => (
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
                      <strong>Customer:</strong>{" "}
                      {item?.user_data?.username}
                    </p>
                    <p>
                      <strong>Train Number:</strong> {item.train_number}
                    </p>
                    <p>
                      <strong>Coach & Seat:</strong> {item.coach_number}, Seat{" "}
                      {item.seat_number}
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
                      {item.status !== "Delivered" && <button onClick={()=> handleDeliver(item?._id)}>Mark Delivered</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

  return (
    <div style={styles.container}>
      <h1>Delivery Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        <OrderCards ordersList={orders}/>
      ) : (
        <div style={styles.noOrders}>
          <h2>No Orders</h2>
          <p>Currently, there are no orders assigned to you.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  tableHeader: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  noOrders: {
    textAlign: "center",
    color: "#555",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
};

export default DeliveryDashboard;
