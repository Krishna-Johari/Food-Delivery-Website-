// Displaying orders in admin panel in ascending order i.e new orders on top
import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      console.log("Order API Response:", response.data); // Debugging API response

      if (response.data.success) {
        // Sort orders by newest first using MongoDB _id
        const sortedOrders = response.data.data.sort(
          (a, b) => parseInt(b._id.substring(0, 8), 16) - parseInt(a._id.substring(0, 8), 16)
        );
        setOrders(sortedOrders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(", ")}
                </p>
                <p className="order-item-name">
                  <strong>Customer:</strong> {order.address.firstName}{" "}
                  {order.address.lastName}
                </p>
                <p>
                  <strong>Address:</strong> {order.address.street},{" "}
                  {order.address.city}, {order.address.state}, {order.address.country},{" "}
                  {order.address.zipcode}
                </p>
                <p className='order-itemiphone'><strong>Contact no.:</strong>{order.address.phone}</p>
              </div>
              <p><strong>Items:</strong> {order.items.length}</p>
              <p><strong>Total Amount:</strong> ${order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} name="" id="">
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;





// Displaying orders in admin panel in descending order i.e new orders on bottom
// import React, { useState, useEffect } from "react";
// import "./Orders.css";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { assets } from "../../assets/assets";

// const Orders = ({ url }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(url + "/api/order/list");
//       console.log("Order API Response:", response.data); // Debugging API response

//       if (response.data.success) {
//         setOrders(response.data.data);
//       } else {
//         toast.error("Error fetching orders");
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       toast.error("Failed to fetch orders");
//     }
//   };

//   const statusHandler = async (event,orderId) => {
//    const response = await axios.post(url+"/api/order/status",{
//     orderId,
//     status:event.target.value
//    })
//     if(response.data.success){
//       await fetchAllOrders();
//     }
//   }

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   return (
//     <div className="order add">
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.length > 0 ? (
//           orders.map((order, index) => (
//             <div key={index} className="order-item">
//               <img src={assets.parcel_icon} alt="Parcel Icon" />
//               <div>
//                 <p className="order-item-food">
//                   {order.items
//                     .map((item) => `${item.name} x ${item.quantity}`)
//                     .join(", ")}
//                 </p>
//                 <p className="order-item-name">
//                   <strong>Customer:</strong> {order.address.firstName}{" "}
//                   {order.address.lastName}
//                 </p>
//                 <p><strong>Address:</strong> {order.address.street},{" "}
//                   {order.address.city}, {order.address.state}, {order.address.country},{" "}
//                   {order.address.zipcode}
//                 </p> 
//                 <p className='order-itemiphone'><strong>Contact no.:</strong>{order.address.phone}</p>
//               </div>
//               <p><strong>Items:</strong> {order.items.length}</p>
//               <p><strong>Total Amount:</strong> ${order.amount}</p>
//               <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} name="" id="">
//                 <option value="Food Processing">Food Processing</option>
//                 <option value="Out for Delivery">Out for Delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//           ))
//         ) : (
//           <p>No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;




