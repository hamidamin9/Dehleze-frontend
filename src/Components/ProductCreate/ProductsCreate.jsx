// Import required dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProductCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      // Convert images array into FormData for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      formData.append("price", data.price);

      if (data.images.length > 0) {
        Array.from(data.images).forEach((image) => {
          formData.append("image_files", image); // Use 'image_files' as the key
        });
      }

      const response = await axios.post(
        "http://39.61.51.195:8004/product-create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Product created successfully!");
        alert("Product created successfully!");
        
        console.log(data)
        reset();
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Product</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className={`form-control ${errors.stock ? "is-invalid" : ""}`}
            {...register("stock", { required: "Stock is required" })}
          />
          {errors.stock && <div className="invalid-feedback">{errors.stock.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Images (up to 5)</label>
          <input
            type="file"
            className={`form-control ${errors.images ? "is-invalid" : ""}`}
            {...register("images", {
              required: "Please upload at least one image",
              validate: (files) =>
                files.length <= 5 || "You can upload up to 5 images only",
            })}
            multiple
            accept="image/*"
          />
          {errors.images && <div className="invalid-feedback">{errors.images.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
