import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './Orders.css';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(url + `/api/order/delete/${orderId}`);
      if (response.data.success) {
        toast.success("Order deleted");
        fetchAllOrders(); // Refresh orders
      } else {
        toast.error("Failed to delete order");
      }
    } catch (error) {
      toast.error("Error deleting order");
      console.error(error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus
      });
      if (response.data.success) {
        toast.success("Status updated");
        fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='orders-page'>
      <h2>All Orders</h2>
      <div className='order-list'>
        {orders.map((order, index) => {
          const items = order.items || [];
          const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
          const fullAddress = order.address
            ? `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}, ${order.address.country}`
            : 'N/A';

          return (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel Icon" className="order-icon" />
              <div className="order-details">
                <p className='order-food'>
                  {items.map((item, i) => {
                    const text = `${item.name} x ${item.quantity}`;
                    return i === items.length - 1 ? text : text + ', ';
                  })}
                </p>

                {/* Customer Info */}
                <p><strong>Customer:</strong> {order.userId?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {order.userId?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {order.address?.phone || 'N/A'}</p>
                <p><strong>Address:</strong> {fullAddress}</p>
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Total Price:</strong> ₹{order.amount}</p>

                {/* Status Dropdown */}
                <p><strong>Status:</strong></p>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="status-select"
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <button className="delete-button" onClick={() => deleteOrder(order._id)}>Delete Order</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
