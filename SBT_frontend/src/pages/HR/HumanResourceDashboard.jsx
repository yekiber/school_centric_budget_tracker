import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/PayrollManagement.css";

const HumanResourceDashboard = () => {
  const { 
    stats, 
    totalEmployee, 
    isFetchingStats, 
    isFetchingTotalEmployee,
    financialData,
    user 
  } = useContext(StoreContext);
  
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Prepare the stats data using context values
  const statsData = [
    { title: "Total Employees", count: totalEmployee || 0 },
    { title: "Total Payroll", count: financialData?.totalExpenses ? `ETB ${financialData.totalExpenses.toFixed(2)}` : "ETB 0.00" },
    { title: "Total Requests", count: stats?.totalRegistered || 0 },
  ];

  // Validate message data structure
  const isValidMessage = (message) => {
    return message && 
           typeof message === 'object' && 
           message._id && 
           message.message;
  };

  // Fetch HR-specific messages
  useEffect(() => {
    const fetchHrMessages = async () => {
      try {
        setIsLoadingMessages(true);
        setFetchError(null);
        
        const response = await axios.get("/api/admin-messages/my-messages", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log("API Response:", response.data); // Debug log
        
        if (response.data) {
          // Handle both array and single message responses
          const receivedMessages = Array.isArray(response.data) 
            ? response.data 
            : [response.data];
          
          // Filter valid messages
          const validMessages = receivedMessages.filter(isValidMessage);
          
          if (validMessages.length > 0) {
            setMessages(validMessages);
          } else {
            setMessages([]);
          }
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching:", error);
        setFetchError(error.response?.data?.message || "Failed to load messages.");
        setMessages([]);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    if (user?.email) {
      fetchHrMessages();
    } else {
      setFetchError("Please login before");
      setIsLoadingMessages(false);
    }
  }, [user]);

  // Loading state for the main stats
  if (isFetchingStats || isFetchingTotalEmployee) {
    return (
      <div className="mt-7 p-6 rounded-lg shadow-sm bg-gradient-to-r from-blue-100 to-indigo-200">
        <div className="text-center py-10">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-7 p-6 rounded-lg shadow-sm bg-gradient-to-r from-blue-100 to-indigo-200">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {statsData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center shadow-lg rounded-lg p-8
              ${index === 0
                ? " bg-blue-400 text-white"
                : index === 1
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                : "bg-purple-600 text-white"}
               hover:scale-10 ease-in-out`}
          >
            <h1 className="text-lg font-light">{item.title}</h1>
            <h2 className="text-3xl font-light mt-2">{item.count}</h2>
          </div>
        ))}
      </div>

      {/* Messages Section */}
      <div className="bg-gray-50 p-8 mt-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-light mb-6 text-gray-800">
          Messages...
        </h2>
        
        {isLoadingMessages ? (
          <div className="text-center py-5">
            <p>Loading messages...</p>
          </div>
        ) : fetchError ? (
          <div className="text-center py-5 text-red-500">
            <p>{fetchError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : messages.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map((message) => (
              <div
                key={message._id}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-gray-700 space-y-2">
                  <p className="font-medium">
                    {message.createdAt ? new Date(message.createdAt).toLocaleString() : "Date not available"}
                  </p>
                  <p className="break-words font-semibold">
                    {message.subject || "No subject"}
                  </p>
                  <p className="break-words">
                    {message.message}
                  </p>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  From: {message.sentBy?.email || "Administration"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 text-gray-500">
            <p>No messages received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HumanResourceDashboard;