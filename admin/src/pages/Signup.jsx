import React from "react";
import { figure, logo } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../store/authStore";

const Signup = () => {
  const { register, isLoading } = useAuthStore();

  const registrationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter your Email Address"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const handleRegisterFormsubmit = async (values) => {
    const { name, email, password } = values;
    const status = await register(name, email, password);
    if (status === 201) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex bg-primary w-full md:w-1/2 justify-center items-center">
        <img src={figure} className="w-3/4 h-[100vh]" alt="figure" />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 m-auto p-6">
        <div className="flex flex-col shadow-lg p-6 w-full md:w-3/4 lg:w-1/2">
          <div className="flex items-center mb-6">
            <img src={logo} alt="logo" className="mr-2" />
            <p className="text-primary font-poppins font-semibold text-2xl md:text-3xl">
              Nihe <span className="text-blue2">Mart</span>
            </p>
          </div>

          <h1 className="font-lato text-2xl md:text-3xl mb-2">Sign Up</h1>
          <p className="font-lato text-base text-[#224957] mb-4">
            Create your account!
          </p>
          <div>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
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
            <p className="text-[#224957] mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue2 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
