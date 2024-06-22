import { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar.jsx";

const Dashboard = ({ activeTab, children }) => {
  const [onMobile, setOnMobile] = useState(window.innerWidth < 768);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setOnMobile(isMobile);
      if (!isMobile) {
        setToggleSidebar(false); // Close sidebar if switching to larger screen
      }
    };

    // Set initial value based on current window size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  

  return (
    <>
      <main className="flex min-h-screen">
        {/* Sidebar for larger screens */}
        {!onMobile && (
          <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar} />
        )}

        {/* Sidebar for mobile view */}
        {onMobile && toggleSidebar && (
          <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar} />
        )}

        <div
          className={`flex-1 min-h-screen transition-all duration-300 ${onMobile ? "ml-0" : "ml-64"
            }`}
        >
          <div className="p-4 sm:p-8">
            {onMobile && (
              <button
                onClick={() => setToggleSidebar(!toggleSidebar)}
                className="sm:hidden bg-gray-700 w-10 h-10 rounded-full shadow text-white flex items-center justify-center mb-4"
              >
                {"menu"}
              </button>
            )}
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
