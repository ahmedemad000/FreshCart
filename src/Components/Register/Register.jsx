import { useFormik } from "formik";
import Style from "./Register.module.css";
import { useContext, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  // Register
  //handling error in case account already exists
  const [errMsg, setErrMsg] = useState("");
  // handling loading once you click on submit
  const [isLoading, setIsLoading] = useState(false);
  //we will use Yup to validate our form
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Please Enter Your Name")
      .min(3, "At least 3 Characters")
      .max(10, "Maximum 10 Characters"), //you discribes the input shape what u want to do
    email: Yup.string()
      .required("You Must Enter Your Email")
      .email("Email is Not Valid"), //if you want a specific regex use .matches(regex) but there is already .eamil() from yup that checks the form of input
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z].{5,}/,
        "Password must be started with uppercase then at least 3 characters"
      ),
    rePassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "password doesnt match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone must be valid in Egypt"),
  });

  //set token
  const { setToken } = useContext(UserContext);
  // to navigate user to specific page we use hook : useNavigate
  const navigate = useNavigate();
  const formik = useFormik({
    //initial Values
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    //submit  onSubmit doesnt work untill formik.errors object is empty {}
    onSubmit: handleSubmit,
    //we need to make the object of formik.errors work on mounting
    validateOnMount: true, // once we refresh it will check inputs if there is an error it will display it

    //validation

    //now we will use Yup Package and connect schema with input
    validationSchema: schema,
    //it takes function in function returns all errors of each input
    //this called custome validation there is package called yup can hold my validation
    // validate: function(values){
    //   let error = {};
    //   if (values.name == '') {
    //   error.name = "name is required"
    //   }else if(!/^[A-Z][a-z]{3,8}$/.test(values.name)){ //we can make custom validation but theres package called yup can make my validation
    //     error.name = "name must be start with uppercase ......"
    //   }

    //   if (values.email == '') {
    //     error.email = "email is required"
    //     }
    //   return error;
    // }
  });
  //there is object called formik.errors that takes the return of validate function
  //formik.errors is object that contains all errors of each input
  console.log(formik.errors);

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message == "success") {
        //navigate user to home page
        navigate("/");
        setToken(data.token)
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("Mounting Register");
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-bold md:text-3xl  text-green-600 ">
        Register
      </h2>

      {errMsg ? (
        <>
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        </>
      ) : null}

      <form onSubmit={formik.handleSubmit} className="mt-5 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            //  connect input with formik
            //first way
            //if used the first way dont forget to put name and id as attribute
            // value={formik.value.name}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            //second way
            {...formik.getFieldProps("name")}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            UserName :
          </label>
          {formik.errors.name && formik.touched.name ? ( //.touched that specifies the input who clicked on to show it own error
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            //  value={formik.value.email}
            //  onChange={formik.handleChange}
            //  onBlur={formik.handleBlur}
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email Address :
          </label>
          {formik.errors.email && formik.touched.email ? ( //.touched that specifies the input who clicked on to show it own error
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            //  value={formik.value.password}
            //  onChange={formik.handleChange}
            //  onBlur={formik.handleBlur}
            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password :
          </label>
          {formik.errors.password && formik.touched.password ? ( //.touched that specifies the input who clicked on to show it own error
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            //  value={formik.value.rePassword}
            //  onChange={formik.handleChange}
            //  onBlur={formik.handleBlur}
            {...formik.getFieldProps("rePassword")}
            type="Password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Re-Password :
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? ( //.touched that specifies the input who clicked on to show it own error
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            //  value={formik.value.phone}
            //  onChange={formik.handleChange}
            //  onBlur={formik.handleBlur}
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
            phone :
          </label>
          {formik.errors.phone && formik.touched.phone ? ( //.touched that specifies the input who clicked on to show it own error
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin " /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
