
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "../../config/axiosConfig";
import BreadCrumb from "../../components/common/BreadCrumb";

const CategoryCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/categories", formData);

      console.log(response);

      if (response.status === 201) {
        toast.success("Category created successfully");
        navigate("/admin/categories");
      }
    } catch (error) {
      console.log(error);
      alert("Category creation failed");
    }
  };

  const breadCrumbItems = [
    { title: "Categories", link: "/admin/categories" },
    { title: "Create", link: null },
  ];

  return (
    <div>
      <div>
        <BreadCrumb items={breadCrumbItems} />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Create Category
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-1"
              >
                Category Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-1"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formData.description}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;