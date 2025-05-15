import userModel from "../models/userModel.js"
//add items to user cart
import jwt from "jsonwebtoken"; // if not already imported

const addToCart = async (req, res) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        const userId = decoded.id;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        const { itemId } = req.body;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("Add to cart error:", error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

//remove items from the user cart
const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
                 cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    }

    catch(error){
       console.log(error)
       res.json({success:false,message:"Error"})
    }
}
//fetch user cart data
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId); // ✅ use req.userId, not req.body.userId
    const cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

export {addToCart,removeFromCart,getCart}