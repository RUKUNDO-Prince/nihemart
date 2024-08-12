import React from "react";
import { figure, logo } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Form, Formik } from "formik";
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


const Login = () => {
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();
  
  const handleLoginFormSubmit = async (values) => {
    const { email, password } = values;
    const status =  await login(email, password);
    if(status === 201){
      navigate("/")
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2 m-auto p-6">
        <div className="flex flex-col shadow-lg p-6 w-full md:w-3/4 lg:w-1/2">
          <div className="flex items-center mb-6">
            <img src={logo} alt="logo" className="mr-2" />
            <p className="text-primary font-poppins font-semibold text-2xl md:text-3xl">
              Nihe <span className="text-blue2">Mart</span>
            </p>
          </div>

          <h1 className="font-lato text-2xl md:text-3xl mb-2">Sign In</h1>
          <p className="font-lato text-base text-[#224957] mb-4">
            Welcome back!
          </p>
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
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 bg-blue3 text-white p-2 rounded"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
            <p className="text-[#224957] mt-4">
              I don't have an account?{" "}
              <Link to="/signup" className="text-blue2 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex bg-primary w-full md:w-1/2 justify-center items-center">
        <img src={figure} className="w-3/4 h-[100vh]" alt="figure" />
      </div>
    </div>
  );
};

export default Login;
