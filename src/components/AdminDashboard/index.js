import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import DeliveryBoy from "./DeliveryBoy";
import MenuList from "./MenuList";
import { BASE_URL } from "../../Configs/config";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("totalOrders"); // Default to "Total Orders"
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [modal,setModal] = useState(false)
  const [selectedOrder , setSelectedOrder] = useState(null)
  const [deliveryBoy,setDeliveryboy ] = useState(null)
  const [selectedBoy, setSelectedBoy] = useState(null)
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if(token){
    // Fetch total orders
    if(activeTab === "totalOrders"){
      //Api call for get orders which are pending
    fetch(`${BASE_URL}/orders?status=Pending&train_number=${""}&?delivery_address=${""}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) =>{ 
        console.log(data, "POP")
        setOrders(data)})
      .catch((error) => console.error("Error fetching orders:", error));
      //Api call to get delivery boys
      fetch(`${BASE_URL}/delivery-boys`)
      .then((response)=> response.json())
      .then((data)=>{
        console.log(data, "Datafor Deliver Boy")
        setDeliveryboy(data.map((item)=> {
          return {_id: item._id, name:item.username}}))
      })
      .catch((error)=> console.log(error , "Error fetching delivery boy"))
      }
   
    // Fetch delivered orders
    else {
      fetch(`${BASE_URL}/orders?status=notPending&train_number=${""}&?delivery_address=${""}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) =>{ 
        console.log(data, "POP")
        setDeliveredOrders(data)})
      .catch((error) => console.error("Error fetching orders:", error));
    }
    }
  }, [token,activeTab]);

  const renderOrders = (orders) => {
    const tableStyle = {
      width: "100%",
      borderCollapse: "collapse",
      margin: "20px 0",
      fontSize: "16px",
      textAlign: "left",
    };
  
    const headerStyle = {
      backgroundColor: "#8a2b06",
      color: "white",
      textAlign: "center",
      padding: "12px 15px",
    };
  
    const rowStyle = {
      borderBottom: "1px solid #dddddd",
      textAlign: "center",
      padding: "12px 15px",
    };
  
    const rowHoverStyle = {
      backgroundColor: "#f1f1f1",
    };
  
    const buttonStyle = {
      backgroundColor: "#8a2b06",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    };
  
    const dispatchedButtonStyle = {
      ...buttonStyle,
      backgroundColor: "gray",
      cursor: "not-allowed",
    };
    return (
      <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerStyle}>Order ID</th>
          <th style={headerStyle}>Name</th>
          <th style={headerStyle}>Train No.</th>
          <th style={headerStyle}>Coach</th>
          <th style={headerStyle}>Total Items</th>
          <th style={headerStyle}>Items</th>
          <th style={headerStyle}>Status</th>
          <th style={headerStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders?.length > 0 ? (
          orders.map((order, index) => (
            <tr
              key={order._id}
              style={{
                ...rowStyle,
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                ":hover": rowHoverStyle,
              }}
            >
              <td style={rowStyle}>{order._id}</td>
              <td style={rowStyle}>{order.user_data?.username}</td>
              <td style={rowStyle}>{order.train_number}</td>
              <td style={rowStyle}>{order.coach_number}</td>
              <td style={rowStyle}>{order.food_items.length}</td>
              <td style={rowStyle}>
                {order.food_items?.map((obj) => obj.name).join(", ")}
              </td>
              <td style={rowStyle}>{order.status}</td>
              <td style={rowStyle}>
                {order.status == "Pending" && (
                  <button
                    style={buttonStyle}
                    onClick={() => toggleModal(order)}
                  >
                    Dispatch
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>
              No orders found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
    );
  };
  async function toggleModal(order){
    setSelectedOrder(order) // Set Order 
    setModal(true) // Show Modal
  }
  async function dispatchOrder(id){
    try{
      // Update status of order 
    const resp = await fetch(`${BASE_URL}/updateOrderStatus`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_id: id,
        status: "Dispatched",
        delivery_boy: selectedBoy?._id
      }),
    })
    const data =  await resp.json();
    if(data){
      setSelectedOrder(null);
      setModal(false)
    }
  }
    catch(e){
      console.log(e, "Error")
    }
  }

  const handleChange = (event) => {
    // Select delivery boy and store
    const boy = deliveryBoy.filter((item)=> item.name === event.target.value)?.[0]
    setSelectedBoy(boy); // Save details of selected delivery boy
  };

  const Tabs = () =>{
    return(
      <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => setActiveTab("totalOrders")}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          backgroundColor: activeTab === "totalOrders" ? "#8a2b06" : "#f8f9fa",
          color: activeTab === "totalOrders" ? "#fff" : "#000",
          border: "1px solid #ddd",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Total Orders
      </button>
      <button
        onClick={() => setActiveTab("deliveredOrders")}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          backgroundColor:
            activeTab === "deliveredOrders" ? "#8a2b06" : "#f8f9fa",
          color: activeTab === "deliveredOrders" ? "#fff" : "#000",
          border: "1px solid #ddd",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Delivered Orders
      </button>
      <button
        onClick={() => setActiveTab("DeliveryBoy")}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          backgroundColor:
            activeTab === "DeliveryBoy" ? "#8a2b06" : "#f8f9fa",
          color: activeTab === "DeliveryBoy" ? "#fff" : "#000",
          border: "1px solid #ddd",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Manage Delivery Boy
      </button>
      <button
        onClick={() => setActiveTab("addMenu")}
        style={{
          padding: "10px 20px",
          backgroundColor:
            activeTab === "addMenu" ? "#8a2b06" : "#f8f9fa",
          color: activeTab === "addMenu" ? "#fff" : "#000",
          border: "1px solid #ddd",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Menu
      </button>
    </div>
    )
  }
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", marginTop:50 }}>
      <h1 style={{color:'white'}}>Admin Dashboard</h1>
      {modal &&
        <Modal onClose={()=>setModal(false)}>
          <h3>Update Order Status </h3>
          <div>
            <p>Order ID : {selectedOrder?._id}</p>
            <p>Train Number: {selectedOrder?.train_number}</p>
            <p>Coach : {selectedOrder?.coach_number}</p>
            <div style={{marginBottom:10}}>
            <label htmlFor="order-status">Select Delivery Boy:</label>
            <select
              id="order-status"
              value={selectedBoy?.username}
              onChange={handleChange}
            >
              <option value="">Select Delivery Boy</option>
              {deliveryBoy?.length > 0 && deliveryBoy.map((status, index) => (
                <option key={index} value={status?.name}>
                  {status?.name}
                </option>
              ))}
            </select>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
            <button 
            style={{padding:10, backgroundColor:'black', color:'white', borderRadius:8}}
            onClick={()=>dispatchOrder(selectedOrder?._id)}
            > Dispatch Order </button>
            <button style={{padding:10, backgroundColor:'white', color:'black', borderRadius:8,borderColor:'black', borderWidth:2, width:"6rem"}}> Cancel </button>
          </div>
        </Modal>
      }
      <Card>
     <Tabs/>
      <div>
        {activeTab === "totalOrders" && (
          <div>
            <h2>Total Orders</h2>
            {renderOrders(orders)}
          </div>
        )}
        {activeTab === "deliveredOrders" && (
          <div>
            <h2>Delivered Orders</h2>
            {renderOrders(deliveredOrders)}
          </div>
        )}
         {activeTab === "addMenu" && (
          <div>
            <MenuList/>
          </div>
        )}
        {activeTab === "DeliveryBoy" && (
          <div>
            <DeliveryBoy/>
          </div>
        )}
      </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
