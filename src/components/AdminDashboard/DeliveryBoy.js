import React, { useEffect, useState } from "react";
import classes from "./deliveryBoy.module.css";
import { BASE_URL } from "../../Configs/config";
const DeliveryBoy = () => {
  const [users, setUsers] = useState([ ]);

  const [formData, setFormData] = useState({
    id: null,
    username: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async() => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            role: formData.role
        }),
      });

      const data = await response.json();
      console.log(data,"Data")
      if(data){
        setFormData({
            id: null,
            username: "",
            password: "",
            role: "",
          })
        fetchDeliveryBoy()
      }
  };

  async function fetchDeliveryBoy(){
    await fetch(`${BASE_URL}/delivery-boys`)
       .then((response)=> response.json())
       .then((data)=>{
         console.log(data, "My Data")
         setUsers(data)
       })
       .catch((error)=> console.log(error , "Error fetching delivery boy"))
  }
  useEffect(()=>{
    fetchDeliveryBoy()
  },[])
  return (
    <div className={classes.container}>
      {/* Left Panel */}
      <div className={classes.leftPanel}>
        <h2>{formData.id ? "Edit User" : "Add User"}</h2>
        <div className={classes.formGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="delivery_boy">Delivery</option>
          </select>
        </div>
        <button onClick={handleSubmit} className={classes.submitButton}>
          {formData.id ? "Update User" : "Add User"}
        </button>
      </div>

      {/* Right Panel */}
      <div className={classes.rightPanel}>
        <h2>Delivery Partners</h2>
        <ul className={classes.userList}>
          {users.map((user) => (
            <li
              key={user._id}
              className={classes.userItem}
            >
              <strong>{user.username.toUpperCase()}</strong> - {"Delivery Boy"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeliveryBoy;
