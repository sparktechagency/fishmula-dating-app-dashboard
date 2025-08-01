/* eslint-disable react/prop-types */

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { GrNotification } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
  useGetUnviewNotificationsQuery,
  useViewAllNotificationMutation,
} from "../../../redux/features/notification/notificationApi";

// Initialize Socket.IO client
const socket = io("http://10.0.80.220:8082", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: responseData } = useGetUnviewNotificationsQuery();
  const [viewAllNotifications] = useViewAllNotificationMutation();

  // State to manage the unread notification count
  const [unreadCount, setUnreadCount] = useState(responseData?.count || 0);

  // Update unreadCount when responseData changes
  useEffect(() => {
    if (responseData?.count !== undefined) {
      setUnreadCount(responseData.count);
    }
  }, [responseData]);

  // Set up Socket.IO listener for admin-notification
  useEffect(() => {
    socket.on("admin-notification", (data) => {
      if (data?.data?.role === "admin" && data?.data?.viewStatus === false) {
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      socket.off("admin-notification");
    };
  }, []);

  // Handler for marking all notifications as viewed and navigating
  const handleViewAllNotificationsAndNavigate = async () => {
    try {
      // Call the mutation with user._id
      await viewAllNotifications(user?._id).unwrap();
      setUnreadCount(0);
      // Navigate to /notification after mutation completes
      navigate("/notification");
    } catch (error) {
      console.error("Failed to mark all notifications as viewed:", error);
      // Navigate even if the mutation fails (optional: adjust based on requirements)
      navigate("/notification");
    }
  };

  return (
    <div
      className={`w-full h-24 px-5 bg-black flex justify-end items-center  text-white left-0  z-10 `}
    >
      <div className="flex items-center gap-3">
        {/* Notification Icon */}
        <div
          onClick={handleViewAllNotificationsAndNavigate}
          className="cursor-pointer"
        >
          <div className="p-2 relative rounded-lg border border-gray-600">
            <GrNotification className="text-white" size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
        <Link to="/settings/general-settings">
        <div className="px-3 py-1.5 flex items-center gap-2 rounded-full border border-gray-600 cursor-pointer">
          <img
            onClick={() => navigate("/settings/general-settings")}
            src={`${imageBaseUrl}${user?.profileImage?.imageUrl}`}
            className="size-8 rounded-full cursor-pointer object-cover"
            alt="User Profile"
          />
           <h1>{user?.fullName}</h1>
           <ChevronDown className="size-6 text-white cursor-pointer" />
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
