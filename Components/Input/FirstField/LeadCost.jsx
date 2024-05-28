import React from 'react';

const LeadCost = ({
  expenses, handleExpensesChange, totalCost,
  handleCostChange, lead, handleLeadChange, calculateLeadCost, leadCost
}) => {
  return (
    <section className='h-[30vh] overflow-y-auto mt-[15%]'>
      <form className="max-w-lg  ml-[8%] mr-[5%]">
        <div className="grid grid-cols-2 gap-4 p-3">
          <div className="flex flex-col mb-4 mr-2">
            <label htmlFor="expenses" className="text-lg m-2">
              Add Expenses
            </label>
            <input
              type="text"
              id="expenses"
              autoFocus
              placeholder="Enter expenses"
              value={expenses}
              onChange={handleExpensesChange}
              required
              className="px-3 py-2 border focus:outline-none border-black border-x-0 border-t-0"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="totalCost" className="text-lg m-2">
              Add Cost
            </label>
            <input
              type="number"
              id="totalCost"
              min={0}
              placeholder="Enter cost"
              value={totalCost}
              onChange={handleCostChange}
              required
              className="px-3 py-2 border focus:outline-none border-black border-x-0 border-t-0"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="lead" className="text-lg m-2">
              Add Lead
            </label>
            <input
              type="number"
              id="lead"
              min={0}
              placeholder="Enter lead"
              value={lead}
              onChange={handleLeadChange}
              required
              className="px-3 py-2 border focus:outline-none border-black border-x-0 border-t-0"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default LeadCost;
