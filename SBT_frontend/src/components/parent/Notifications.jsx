import React, { useState } from 'react';

const Notifications = () => {
  // Sample notification data (replace with real data from props or API)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Emma's payment of ETB 50.00 is due on 2025-03-10",
      date: "2025-03-02 10:30 AM",
      read: false,
    },
    {
      id: 2,
      message: "Liam’s school event is scheduled for tomorrow",
      date: "2025-03-01 09:15 AM",
      read: false,
    },
    {
      id: 3,
      message: "Payment for Emma completed successfully",
      date: "2025-02-28 02:45 PM",
      read: true,
    },
  ]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
      </h1>

      {/* Notifications Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Your Notifications</h2>
          {notifications.length > 0 && (
            <div className="space-x-4">
              <button
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                disabled={unreadCount === 0}
              >
                Mark All as Read
              </button>
              <button
                onClick={clearAll}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No notifications available.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex justify-between items-center p-4 rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                } hover:bg-gray-100 transition-colors`}
              >
                <div className="flex-1">
                  <p
                    className={`${
                      notification.read ? 'text-gray-600' : 'text-gray-800 font-medium'
                    }`}
                  >
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;