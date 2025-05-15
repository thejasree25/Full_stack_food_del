import express from"express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder,userOrders,listOrders,deleteOrder,updateStatus} from "../controllers/orderController.js"
const orderRouter=express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.delete("/delete/:id", deleteOrder);
orderRouter.post("/status",updateStatus)
export default orderRouter;