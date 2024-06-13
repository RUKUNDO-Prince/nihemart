import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoginForm from "./LoginForm";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);

  const { register, isLoading } = useAuthStore();

  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  // Validation schemas
  const registrationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter your Email Address"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
  });

  const handleRegisterFormsubmit = async (values) => {
    const { name, email, password, phone } = values;
    await register(name, email, password, phone);
  };
  
  return (
    <div className="p-5 border rounded-lg shadow-lg bg-white xs:w-[80%] md:w-[60%]">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 w-1/2 rounded-md ${
            isRegister ? "bg-blue3 text-white" : ""
          }`}
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
        <button
          className={`px-4 py-2 w-1/2 rounded-md ${
            !isRegister ? "bg-blue3 text-white" : ""
          }`}
          onClick={() => setIsRegister(false)}
        >
          Login
        </button>
      </div>

      {isRegister ? (
        <div>
          <Formik
            initialValues={{ name: "", email: "", password: "", phone: "" }}
            validationSchema={registrationSchema}
            onSubmit={(values) => handleRegisterFormsubmit(values)}
          >
            {({ handleChange, handleSubmit }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    name="name"
                    className="w-full p-2 border rounded focus:outline-blueGradient"
                    placeholder="Enter your name"
                    onChange={handleChange("name")}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
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
                    placeholder="Enter your Password"
                    onChange={handleChange("password")}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-2 border rounded focus:outline-blueGradient"
                    placeholder="Enter your phone number"
                    onChange={handleChange("phone")}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="w-full bg-blue-500 bg-blue3 text-white p-2 rounded"
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default AuthForm;
