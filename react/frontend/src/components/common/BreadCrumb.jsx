import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ items }) => {
  // Automatically add Dashboard as the first item
  const finalItems = [{ title: "Dashboard", link: "/admin" }, ...items];

  return (
    <div className="flex items-center text-sm">
      {finalItems.map((item, index) => {
        const isLast = index === finalItems.length - 1;
        const isActive = item.link === null;

        return (
          <div key={index} className="flex items-center">
            {isActive ? (
              <span className="text-gray-500 font-medium">{item.title}</span>
            ) : (
              <Link
                to={item.link}
                className="text-blue-600 hover:underline font-medium"
              >
                {item.title}
              </Link>
            )}

            {!isLast && (
              <ChevronRight size={16} className="mx-2 text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;