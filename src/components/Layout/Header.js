import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Eat Me</h1>
                {props.role && props.role === "user"  && <HeaderCartButton onClick={props.onShowCart} />}
                {props.showLogout && <button style={{position:"absolute", right:20, padding:10, borderRadius:10, borderWidth:0,fontSize:18, color:'white', backgroundColor:'transparent'}} onClick={()=>props.handleLogout()}>Logout</button>}
            </header>
            { <div className={classes["main-image"]}>
                <img src={mealsImg} alt="A table full of delicious food!" />
            </div>}
        </Fragment>
    );
};

export default Header;
