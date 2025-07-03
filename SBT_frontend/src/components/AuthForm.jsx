import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import RoleRoute from "../config/RoleRoute";
import ChangePasswordForm from "./ChangePasswordForm";
import schoolImage from "../assets/school-budget-tracker.png";

const AuthForm = () => {
  const { login, resetPassword } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setFieldError }) => {
    const result = await login(values.email, values.password);

    if (result.requiresPasswordChange) {
      setUserEmail(values.email);
      setUserRole(result.role);
      setIsChangingPassword(true);
      return;
    }

    if (result.success) {
      navigate(RoleRoute[result.role] || "/");
    } else {
      setFieldError("email", result.message);
      toast.error(result.message);
    }
  };

  const handlePasswordChange = async (values) => {
    const result = await resetPassword(
      userEmail,
      values.newPassword,
      values.confirmPassword,
      userRole
    );

    if (result.success) {
      setIsChangingPassword(false);
      setUserEmail("");
      setUserRole("");
      navigate("/login");
    }
  };

return (
  <div className="w-full max-w-xl bg-white rounded-lg shadow-xl overflow-hidden mx-auto my-20">
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {isChangingPassword ? "Change Password" : "Sign In"}
      </h1>
        
      {isChangingPassword ? (
        <ChangePasswordForm
          onSubmit={handlePasswordChange}
          onCancel={() => {
            setIsChangingPassword(false);
            setUserEmail("");
            setUserRole("");
          }}
        />
      ) : (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              <div>
                <label htmlFor="email" className="block text-blue-600 text-xl font-medium">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border-2 border-blue-200 rounded-lg p-4 mt-2 text-xl focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-lg mt-2" />
              </div>

              <div>
                <label htmlFor="password" className="block text-blue-600 text-xl font-medium">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full border-2 border-blue-200 rounded-lg p-4 mt-2 text-xl focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-lg mt-2" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-4 rounded-lg font-semibold text-xl transition duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  </div>
);
}
export default AuthForm;