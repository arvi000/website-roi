import React, { useEffect, useState } from "react";
import getDetailPouchDb from "../utils/getDetailPouchDb";
import { FaTrashAlt } from "react-icons/fa";

function History({ data, onClose }) {
  const [history, setHistory] = useState(undefined);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getDetailPouchDb("roi", "roi");
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      setHistory((prevHistory) => {
        const updatedHistory = { ...prevHistory };
        delete updatedHistory[id];
        return updatedHistory;
      });
    } catch (error) {
      console.error("Error deleting history entry:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg text-left  shadow-xl transform transition-all w-[70%] h-[70%] border-2 border-black">
        <div className="px-6 py-4 flex h-[15%] bg-gray-300 itmes-center w-[100%]">
          <h1 className="text-2xl font-medium leading-6">History</h1>
          <div className="w-[100%] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 bg-[#4eb31b] text-white font-medium rounded-md shadow-sm hover:bg-[#169c21] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34b31b]"
            >
              Close
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex flex-col justify-center">
          <div className="w-auto flex bg-gray-200 h-[20%] justify-center ">
            <input
              className="w-[10%] border-2 border-black"
              type="text"
              value="S.No"
              onChange={() => {}}
            />
            <input
              className="w-[30%] border-2 border-black"
              type="text"
              value="TotalWebcost"
              onChange={() => {}}
            />
            <input
              className="w-[30%] border-2 border-black"
              type="text"
              value="LeadCost"
              onChange={() => {}}
            />
            <input
              className="w-[30%] border-2 border-black"
              type="text"
              value="ROI Calculate %"
              onChange={() => {}}
            />
          </div>
          {history &&
            typeof history === "object" &&
            Object.keys(history).map((elm, index) => (
              <div key={index} className="flex bg-gray-200 h-[20%] justify-center">
                <div className="w-[10%] ml-10">{index + 1}</div>
                <div className="w-[30%] ml-10">{history[elm][0]}</div>
                <div className="w-[30%] ml-10">{history[elm][1]}</div>
                <div className="w-[30%] ml-10">{history[elm][2]}%</div>
                <button
                  onClick={() => handleDelete(elm)} // Assuming elm is the unique identifier for each history entry
                  className="ml-10 text-white font-medium rounded-md px-3 py-1"
                >
                <i className="text-red-500"><FaTrashAlt /></i>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default History;