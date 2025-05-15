import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { set } from "mongoose";
import { useContext } from "react";
import axios from "axios"
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://full-stack-food-del.onrender.com"
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([])
  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
    }

  }
 const removeFromCart = async (itemId) => {
    console.log("Removing item with ID:", itemId);  // Log to check if it's being called

    if (token) {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }

    setCartItems((prev) => {
        const updatedCart = { ...prev };

        if (updatedCart[itemId] > 1) {
            updatedCart[itemId] -= 1;
        } else {
            delete updatedCart[itemId];
        }

        return updatedCart;
    });
};


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }

    }
    return totalAmount;
  }
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data)
  }
const loadCarData = async (token) => {
  const response = await axios.post(url + "/api/cart/get", {}, {
    headers: { token }
  });
  setCartItems(response.data.cartData)
};

  useEffect(() => {

    async function loadData() {
      await fetchFoodList()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCarData(localStorage.getItem("token"))
      }
    }
    loadData();

  }, [])
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider;
