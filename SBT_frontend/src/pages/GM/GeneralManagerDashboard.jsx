import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUsers,
  FaUserGraduate,
  FaUserCheck,
  FaChalkboardTeacher,
  FaBalanceScale,
} from "react-icons/fa";
import {
  MdAccountBalance,
  MdSchool,
  MdSavings,
  MdAssessment,
  MdReceiptLong,
} from "react-icons/md";
import SmallLoading from "../../components/loadings/SmallLoading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeneralManagerDashboard = () => {
  const {
    stats,
    isFetchingStats,
    financialData,
    totalEmployee,
    isFetchingTotalEmployee,
  } = useContext(StoreContext);
  
  const navigate = useNavigate();

  const statsData = [
    {
      title: "Total Staff",
      count: stats?.totalActors ?? 0,
      icon: <FaUsers className="text-3xl text-indigo-600" />,
      link: "/system-admin-page/manage-actors",
    },
    {
      title: "Total Students",
      count: stats?.totalStudents ?? 0,
      icon: <FaUserGraduate className="text-3xl text-green-600" />,
      link: "/system-admin-page/manage-students",
    },
    {
      title: "Total Registered",
      count: stats?.totalRegistered ?? 0,
      icon: <FaUserCheck className="text-3xl text-blue-600" />,
    },
    {
      title: "Total Employees",
      count: totalEmployee ?? 0,
      icon: <FaChalkboardTeacher className="text-3xl text-red-600" />,
      // link: "/human-resource-page/prepare-payroll",
    },
  ];

  const financialCard = [
    {
      title: "Annual Budget",
      value: financialData?.annualBudget ?? 0,
      icon: <MdAccountBalance className="text-3xl text-blue-600" />,
    },
    {
      title: "Student Fee",
      value: financialData?.studentFees ?? 0,
      icon: <MdSchool className="text-3xl text-green-600" />,
      link: "/general-manager-page/payment-requested",
    },
    {
      title: "Other Funds",
      value: financialData?.otherFundTotal ?? 0,
      icon: <MdSavings className="text-3xl text-yellow-600" />,
    },
    {
      title: "Total Revenue",
      value: financialData?.totalRevenue ?? 0,
      icon: <MdAssessment className="text-3xl text-purple-600" />,
    },
    {
      title: "Total Expenses",
      value: financialData?.totalExpenses ?? 0,
      icon: <MdReceiptLong className="text-3xl text-red-600" />,
    },
    {
      title: "Net Profit",
      value: financialData?.netProfit ?? 0,
      icon: <FaBalanceScale className="text-3xl text-blue-600" />,
    },
  ];

  const handleCardClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="max-w-7xl mx-auto space-y-10">
        <h2 className="text-3xl text-center font-light mb-8 text-gray-800">
          Financial & Users Overview
        </h2>

        {isFetchingStats || isFetchingTotalEmployee ? (
          <SmallLoading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Financial Cards */}
            {financialCard.map((item, index) => (
              <div
                key={`financial-${index}`}
                onClick={() => item.link && handleCardClick(item.link)}
                className={`bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-transform space-y-2 ${
                  item.link 
                    ? "cursor-pointer hover:scale-[1.02] transform" 
                    : ""
                }`}
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-medium text-gray-700 mt-2">
                  {item.title}
                </h3>
                <p className="text-xl font-bold text-indigo-700">
                  ETB {item.value.toLocaleString()}
                </p>
              </div>
            ))}

            {/* User Stats Cards */}
            {statsData.map((item, index) => (
              <div
                key={`stats-${index}`}
                onClick={() => item.link && handleCardClick(item.link)}
                className={`bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-transform space-y-2 ${
                  item.link 
                    ? "cursor-pointer hover:scale-[1.02] transform" 
                    : ""
                }`}
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-medium text-gray-700 mt-2">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-indigo-700">
                  {item.count}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralManagerDashboard;