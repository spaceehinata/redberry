"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import NameInput from "./NameInput";

const NameInputFormik: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "მინიმუმ 2 სიმბოლო")
        .max(255, "მაქსიმუმ 255 სიმბოლო")
        .required("ველი სავალდებულოა"),
    }),
    onSubmit: (values) => {
      console.log("ფორმის მონაცემები:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <NameInput
        label="სახელი"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.touched.name && formik.errors.name && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {formik.errors.name}
        </div>
      )}
      <button type="submit" style={{ marginTop: "10px" }}>
        გაგზავნა
      </button>
    </form>
  );
};

export default NameInputFormik;
