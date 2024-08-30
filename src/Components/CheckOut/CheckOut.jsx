import { useFormik } from "formik";
import Style from "./CheckOut.module.css";
import { useContext, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  const { cartId } = useParams();
  const { checkOutSession } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    //initial Values
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleSubmit,
  });
  //there is object called formik.errors that takes the return of validate function
  //formik.errors is object that contains all errors of each input
  console.log(formik.errors);

  async function handleSubmit(values) {
    const response = await checkOutSession(cartId, values);
    console.log(response.data.session.url);
    window.location.href = response.data.session.url;
  }

  useEffect(() => {
    console.log("Mounting Login");
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-bold md:text-3xl  text-green-600 ">
        CheckOut
      </h2>

      <form onSubmit={formik.handleSubmit} className="mt-5 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("phone")}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Phone :
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("city")}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User City :
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("details")}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Details :
          </label>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin " /> : "Pay"}
        </button>
      </form>
    </div>
  );
}
