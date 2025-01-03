import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
import Login from "./components/Auth/Auth";
import AdminDashboard from "./components/AdminDashboard";
import DeliveryDashboard from "./components/DeliveryDashboard";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [role , setRole] = useState(null);
    const [register,setRegister] = useState(false)
    const showCardHandle = () => {
        setCartIsShown(true);
    };
    const hideCardHandle = () => {
        setCartIsShown(false);
    };
    const handleUpdateToken=(token ,data)=>{
        setLogin(token);
        localStorage.setItem('userData',JSON.stringify(data))
        setRole(data.role); 
    }
    const fetchToken = async() =>{
        const token = await localStorage.getItem("authToken")
        const userData = await localStorage.getItem("userData");

        if (token && userData) {
            setLogin(true);
            setRole(JSON.parse(userData).role);
        }
    }
    async function logout(){
        await localStorage.clear()
        setLogin(false)
        setRole(null)
    }
    useEffect(()=>{
        fetchToken()
    },[register,isLogin])
    console.log(role,"role")
    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCardHandle} />}
            <Header role={role} showLogout={isLogin} handleLogout={()=>logout()} onShowCart={showCardHandle} />
            <main>
                {!isLogin && (
                    <Login
                        updateToken={(token, data) => handleUpdateToken(token, data)}
                        isRegister={register}
                        toggleForm={() => setRegister(!register)}
                    />
                )}

                {isLogin && role === "user" && <Meals />}
                {isLogin && role === "admin" && <AdminDashboard />}
                {isLogin && role === "delivery_boy" && <DeliveryDashboard />}
            </main>
        </CartProvider>
    );
}

export default App;
