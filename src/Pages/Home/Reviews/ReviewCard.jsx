import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, ratings, user_photoURL } = review;
  return (
    <div className="max-w-sm bg-base-100 p-6 rounded-2xl shadow-md border">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-3xl text-teal-300 mb-4" />

      {/* Text */}
      <p className="text-gray-600 leading-relaxed">{testimonial}.</p>

      {/* Divider */}
      <div className="border-t border-dashed mt-5 mb-5"></div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        {/* Avatar Circle */}
        <div className="w-12 h-12 rounded-full bg-teal-900">
          <img src={user_photoURL} alt="" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-teal-900">{userName}</h3>
          <p className="text-gray-500 text-sm">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
