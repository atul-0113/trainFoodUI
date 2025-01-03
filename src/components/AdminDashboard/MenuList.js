import React, { useEffect, useState } from "react";
import classes from "./deliveryBoy.module.css";
import { BASE_URL } from "../../Configs/config";

const MenuList = () => {
  const [users, setUsers] = useState([ ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async() => {
    const response = await fetch(`${BASE_URL}/addmenu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            price: formData.price
        }),
      });

      const data = await response.json();
      console.log(data,"Data")
      if(data){
        setFormData({
            id: null,
            name: "",
            description: "",
            price: "",
          })
          fetchMenu()
      }
  };

  async function fetchMenu(){
    await fetch(`${BASE_URL}/menu`)
       .then((response)=> response.json())
       .then((data)=>{
         console.log(data, "My Data")
         setUsers(data?.menu)
       })
       .catch((error)=> console.log(error , "Error fetching delivery boy"))
  }
  useEffect(()=>{
    fetchMenu()
  },[])
  return (
    <div className={classes.container}>
      {/* Left Panel */}
      <div className={classes.leftPanel}>
        <h2>{"Add Menu"}</h2>
        <div className={classes.formGroup}>
          <label>Name of food item</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label>Description</label>
          <input
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
            <label>Price</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price (e.g., 99.99)"
            />
        </div>
        <button onClick={handleSubmit} className={classes.submitButton}>
          {"Add Menu"}
        </button>
      </div>

      {/* Right Panel */}
      <div className={classes.rightPanel}>
        <h2>Menu</h2>
        <ul className={classes.userList}>
          {users?.map((user,index) => (
            <li
              key={user._id}
              className={classes.userItem}
            >
              <strong>{index+1}- {user?.name?.toUpperCase()}</strong> - {user?.price}
              <p><strong>Description</strong>{user?.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuList;
