import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuthStore from "../store/authStore";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter your Email Address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);

  const handleLoginFormSubmit = async (values) => {
    const { email, password } = values;
    await login(email, password);
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => handleLoginFormSubmit(values)}
      >
        {({ isSubmitting, handleSubmit, handleChange }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded focus:outline-blueGradient"
                placeholder="Enter your Email"
                onChange={handleChange("email")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border rounded focus:outline-blueGradient"
                placeholder="Enter your password"
                onChange={handleChange("password")}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 bg-blue3 text-white p-2 rounded"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
