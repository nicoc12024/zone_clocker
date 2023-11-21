import React from "react";
import { FaRegCalendarAlt, FaMap } from "react-icons/fa";
import { BsCheckCircle, BsFillPersonPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="m-2 p-4 bg-white">
      <h1 className="font-medium">Steps to add new employee</h1>
      <hr className="h-px my-2 bg-gray-200 border-0" />
      <div>
        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-start gap-8 p-4">
            <h2 className="font-medium text-2xl">Step 1</h2>
            <BsFillPersonPlusFill size={66} />
            <p className="text-sm text-center">
              Add the ID number and name of the employee so they start to use the app.
            </p>
            <Link
              to="/add-employee"
              className="text-center py-[0.5rem] px-[1rem] bg-orange-600 text-white text-sm font-normal rounded"
            >
              Add new employee
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start gap-8 p-4">
            <h2 className="font-medium text-2xl">Step 2</h2>
            <FaMap size={66} />
            <p className="text-sm text-center">
              Specify the work location to ensure smooth check-ins and check-outs.
            </p>
            <Link
              to="/add-new-zone"
              className="text-center py-[0.5rem] px-[1rem] bg-orange-600 text-white text-sm font-normal rounded"
            >
              Add new zone
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start gap-8 p-4">
            <h2 className="font-medium text-2xl">Step 3</h2>
            <FaRegCalendarAlt size={66} />
            <p className="text-sm text-center">
              Assign shifts to your new employee to define their work hours.
            </p>
            <Link
              to="/add-shift"
              className="text-center py-[0.5rem] px-[1rem] bg-orange-600 text-white text-sm font-normal rounded"
            >
              Add shift
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start gap-8 p-4">
            <h2 className="font-medium text-2xl">All done</h2>
            <BsCheckCircle size={66} />
            <p className="text-sm text-center">
              Great! Your new employee is now set up and ready to work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
