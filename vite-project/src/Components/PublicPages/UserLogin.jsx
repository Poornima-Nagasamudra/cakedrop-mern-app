import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startCreateLogin } from "../../Actions/UserAction";
import { useFormik } from "formik";
import * as Yup from "yup";
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{5,}$/; //min 5 characters, 1 upper case letter, 1 lower case letter, 1 digit
import "react-toastify/dist/ReactToastify.css";

const UserLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   //formik
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Please enter a valid email")
          .required("Required"),
        password: Yup.string()
          .min(5)
          .matches(passwordRules, {
            message: "Please create a stronger password",
          })
          .required("Required"),
      }),
      onSubmit: (values) => {
        dispatch(startCreateLogin(values, navigate))
        toast.sucess("User registered successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        resetForm();
      },
    });
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          {" "}
          User Login{" "}
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}{" "}
              </div>
            ) : null}
          </div>

          <input
            type="submit"
            value="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
          />
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
