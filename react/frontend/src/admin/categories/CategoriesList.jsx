
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../../config/axiosConfig";
import { Pen, Trash } from "lucide-react";
import BreadCrumb from "../../components/common/BreadCrumb";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handleFetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/categories/${id}`);

      if (response.status === 200) {
        toast.error("Category deleted successfully");

        handleFetchCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    navigate(id);
  };

  const breadCrumbItems = [{ title: "Categories", link: null }];

  return (
    <div className="">
      <div className="flex justify-between mb-4 ">
        <BreadCrumb items={breadCrumbItems} />
        <Link
          className="bg-green-300 shadow-sm px-4 py-1  rounded-xl"
          to={"create"}
        >
          Create
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{category.title}</td>
                <td className="p-2 border-b">{category.description}</td>
                <td className="flex justify-center border-b  p-3 gap-2 font-semibold   ">
                  <button
                    onClick={() => handleEdit(category._id)}
                    className="text-blue-500  "
                  >
                    <Pen size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="p-3 text-center text-gray-500 border-b"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesList;