import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

// Main Form Component
const BudgetRequestForm = ({ onClose, submitButtonText, fetchBudgets }) => {
  const initialValues = {
    category: "",
    fiscalYear: "", // Optional
    month: "",
    amount: "",
    date: "",
    description: "",
    files: [],
  };

  // Validation schema
  const validationSchema = Yup.object({
    category: Yup.string().required("Required"),
    fiscalYear: Yup.string().required("Required"),
    month: Yup.string().required("Required"),
    amount: Yup.number().required("Required")
      .min(0, "Must be a positive number")
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .positive("Must be a positive number")
      .typeError("Must be a number"),
    date: Yup.date().required("Required"),
    description: Yup.string().required("Required"),
    files: Yup.array(), // Optional, no validation
  });

  // Toast notification handler
  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // File input change handler
  const handleFileChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      notify("You can upload a maximum of 5 files", "error");
      return;
    }
    setFieldValue("files", files);
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      const user = JSON.parse(localStorage.getItem("user"));
      
      // Required fields
      formData.append("requestedBy", user._id);
      formData.append("category", values.category);
      formData.append("month", values.month);
      formData.append("description", values.description);
      formData.append("amount", values.amount);
      formData.append("status", "Pending"); // Add status
      
      // Optional fields
      if (values.fiscalYear) formData.append("fiscalYear", values.fiscalYear);
      if (values.date) formData.append("date", values.date);
      
      // File upload
      if (values.files?.[0]) {
        formData.append("file", values.files[0]);
      }
  
      const res = await axios.post(
        "http://localhost:5000/api/budget-requests/send",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        resetForm();
        onClose();
        fetchBudgets?.();
      }
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || 
        `Submission failed: ${err.message}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="bg-gray-200 p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block font-semibold mb-1">Request Type / Category</label>
              <Field type="text" name="category" className="w-full p-2 rounded" />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Fiscal Year */}
            <div>
              <label className="block font-semibold mb-1">Fiscal Year</label>
              <Field as="select" name="fiscalYear" className="w-full p-2 rounded">
                <option value="">Select Fiscal Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </Field>
            </div>

            {/* Month */}
            <div>
              <label className="block font-semibold mb-1">Month</label>
              <Field as="select" name="month" className="w-full p-2 rounded">
                <option value="">Select Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </Field>
              <ErrorMessage name="month" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Date */}
            <div>
              <label className="block font-semibold mb-1">Set Date</label>
              <Field type="date" name="date" className="w-full p-2 rounded" />
              <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Amount */}
            <div>
              <label className="block font-semibold mb-1">Amount </label>
              <Field type="number" name="amount" className="w-full p-2 rounded" />
              <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* File Upload */}
            <div>
              <label className="block font-semibold mb-1">Supporting Files</label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, setFieldValue)}
                className="w-full p-2 rounded"
              />
              <ErrorMessage name="files" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block font-semibold mb-1">Detailed Description</label>
            <Field as="textarea" name="description" rows={4} className="w-full p-2 rounded" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity shadow-lg"
            >
              {submitButtonText || "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BudgetRequestForm;
