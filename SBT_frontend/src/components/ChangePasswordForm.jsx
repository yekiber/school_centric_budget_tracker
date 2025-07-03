import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ChangePasswordForm = ({ onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3 flex flex-col justify-center mb-10">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-600 text-sm font-medium"
            >
              New Password
            </label>
            <Field
              type="password"
              name="newPassword"
              id="newPassword"
              className="w-full border rounded-md p-2 mt-1 text-sm"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 text-sm font-medium"
            >
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full border rounded-md p-2 mt-1 text-sm"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 transition"
          >
            {isSubmitting ? "Changing..." : "Change Password"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity shadow-lg"
          >
            Back
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
