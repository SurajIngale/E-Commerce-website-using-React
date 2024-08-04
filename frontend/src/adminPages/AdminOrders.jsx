import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../authContext";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        console.log(token);
        const response = await axios.get("http://localhost:7000/orders/getAllOrders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchOrders();
    }

  }, [token, isAdmin]);

  if (!isAdmin) {
    return <div className="container mt-5">Access denied. Admins only.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Payment Method</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.mobile}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.product.productName}</td>
                <td>{order.product.price}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
