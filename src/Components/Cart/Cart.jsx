import Style from "./Cart.module.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { FaTrash } from "react-icons/fa";
import CartItem from "../cartItem/cartItem";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const { getUserCart, updateCountItem, deleteItem } = useContext(CartContext);

  async function getLoggedUserCart() {
    const response = await getUserCart();
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
    }
  }
  async function updateQun(id, count) {
    const response = await updateCountItem(id, count);
    console.log(response);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success('Product Updated',{
        icon: '👍',
        duration:5000,
        style: {backgroundColor: "green", color:"white"},
        position:"top-right"
      })
    }
  }
  async function deleteItemFromCart(id) {
    const response = await deleteItem(id);
    console.log(response);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success('Product Deleted',{
        icon: '👍',
        duration:5000,
        style: {backgroundColor: "red", color:"white"},
        position:"top-right"
      })
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);
  return (
   
<div className="relative overflow-x-auto  sm:rounded-lg">
  <h2 className="text-green-600 my-3">Cart Details</h2>
  <div className="flex items-center mb-3 justify-between">
    <p className="h3 text-green-500">Total Price {cartDetails?.totalCartPrice}</p>
    <button className="bg-green-600 rounded-lg py-2 px-2 text-white">Clear Cart <FaTrash className="inline-block"/></button>
  </div>
  <table className="w-full shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {
        cartDetails?.products.map(p => <CartItem deleteItemFromCart={deleteItemFromCart} updateQun={updateQun} count={p.count} price={p.price} product={p.product}/>)
      }

    </tbody>
  </table>
  <Link to={'/checkout/' + cartDetails?._id} className="bg-green-600 text-white block text-2xl p-2 ">CheckOut Session</Link>
</div>


  );
}
