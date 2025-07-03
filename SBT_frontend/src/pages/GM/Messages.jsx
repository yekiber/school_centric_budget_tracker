import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Messages = () => {
  // State for all User Messages
  const [messages, setMessages] = useState([]);

  // State for
  const [recipientType, setRecipientType] = useState("actors");
  const [recipientDetail, setRecipientDetail] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Fetch User Messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/contact-messages"
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to fetch messages.");
      }
    };

    fetchMessages();
  }, []);
  // Handlers
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/contact-messages/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
      toast.success("Deleted successfully.");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message.");
    }
  };

  const handleSendNotification = async () => {
    if (!message.trim()) {
      return toast.error("Cannot be empty!");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin-messages/send",
        {
          recipientType,
          recipientDetail,
          message,
        }
      );

      toast.success(response.data.message);
      setMessage(""); // Clear input after sending
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message.");
    }
  };

  // Fetch notifications (useEffect hook to load on mount)
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin-messages/all"
      );
      setNotifications(response.data);
    } catch (error) {
      toast.error("Failed to load messages.");
    }
  };

  const handleDeleteNotification = async (messageId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin-messages/${messageId}`
      );
      toast.success("Message deleted!");
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      toast.error("Failed to delete message.");
    }
  };

  return (
    <div className="bg-white mt-8 p-8 rounded-2xl shadow-xl max-w-5xl mx-auto space-y-12">
      {/* USER MESSAGES SECTION */}
      <section>
        <h2 className="text-2xl font-light text-gray-800 mb-6 border-b pb-2">
          📥 User Messages
        </h2>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-2">
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Name:</strong>{" "}
                    {msg.userName}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Email:</strong>{" "}
                    {msg.userEmail}
                  </p>
                </div>
                <p className="text-gray-600 mb-3 whitespace-pre-line break-words">
                  <strong className="text-gray-900">Message:</strong>{" "}
                  {msg.userMessage}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Sent on: {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No messages received yet.
            </p>
          )}
        </div>
      </section>

      {/* SEND messsage SECTION */}
      <section>
        <h2 className="text-2xl font-light text-gray-800 mb-6 border-b pb-2">
          📤 Send Messages
        </h2>

        {/* Recipient Type */}
        <div className="mb-5">
          <label className="block font-medium mb-2">Recipient Type</label>
          <select
            value={recipientType}
            onChange={(e) => setRecipientType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="actors">All Staff</option>
            <option value="student_parents">All Parents</option>
            <option value="specific_actor">Specific Staff</option>
            <option value="specific_student">Specific Parent</option>
          </select>
        </div>

        {/* Conditional Recipient Detail */}
        {(recipientType === "specific_actor" ||
          recipientType === "specific_student") && (
          <div className="mb-5">
            <label className="block font-medium mb-2">
              {recipientType === "specific_actor"
                ? "Staff Email"
                : "Student ID"}
            </label>
            <input
              type="text"
              value={recipientDetail}
              onChange={(e) => setRecipientDetail(e.target.value)}
              placeholder={
                recipientType === "specific_actor"
                  ? "Enter staff email"
                  : "Enter student ID"
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Message Input */}
        <div className="mb-5">
          <label className="block font-medium mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message..."
            className="w-full border border-gray-300 rounded-lg p-3 h-28 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendNotification}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          Send Message
        </button>
      </section>

      {/* NOTIFICATION HISTORY */}
      <section>
        <h2 className="text-2xl font-mono text-gray-800 mb-6 border-b pb-2">
          📚 Message History
        </h2>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-gray-700 space-y-1">
                  <p>
                    <strong>Type:</strong> {notification.recipientType}
                  </p>
                  {notification.recipientDetail && (
                    <p>
                      <strong>Recipient:</strong> {notification.recipientDetail}
                    </p>
                  )}
                  <p className="break-words">
                    <strong>Message:</strong> {notification.message}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Sent by {notification.sentBy?.email || "Unknown"} -{" "}
                    {notification.createdAt
                      ? new Date(notification.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                  <button
                    onClick={() => handleDeleteNotification(notification._id)}
                    className="mt-3 text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No message found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Messages;
