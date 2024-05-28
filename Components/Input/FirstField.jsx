import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadCost from './FirstField/LeadCost';
import WebCost from './FirstField/WebCost';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FirstField = (
  {fields,setFields,handleAddField,handleAddTotal,total,handleFieldChange,handleLabelChange,
    handleDeleteField,setTotal,totalWebCost,selectedContent,addWebCost,webCostValues,onClickTotal,clearValues,
    calculateTotalValue,handleItemClick,addLeadCost,leadCostValues,expenses,handleExpensesChange,
    totalCost,handleCostChange,lead,handleLeadChange,calculateLeadCost,leadCost,setTotalAverageSale,setTotalConversionRate,totalConversionRate,totalAverageSale,handleReset}) => {

      const handleConversionRateChange = (event) => {
        setTotalConversionRate(parseFloat(event.target.value));
      };
    
      const handleAverageSalePriceChange = (event) => {
        setTotalAverageSale(parseFloat(event.target.value));
      };
  return (
    <main className='z-10'
    >
      <section className='relative h-[85vh] w-[500px] mt-[50%] justify-center bg-[#fff] overflow-x-hidden border border-white'>
        <div 
        className='flex gap-2 absolute justify-center items-center text-white ml-[10%] bg-[#fdfdfd] h-[8vh] rounded-lg mt-4 cursor-pointer  w-[80%]'
        style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.3)' }}
        >
          <button 
            onClick={() => handleItemClick('webcost')} 
            className={selectedContent === 'webcost' ? 'active' : ''}
            title='Select webcost'
            style={{
              backgroundColor: selectedContent === 'webcost' ? '#fed000' : '', 
              color: selectedContent === 'webcost' ? 'white' : '#fdfdfd',
              borderRadius:'10px 0px 0 10px',
              height:'100%',
              width:'50%',
              marginLeft:'-9px',
              color:'black'
            }}
          >
            WEBCOST
          </button>
          <button 
            onClick={() => handleItemClick('leadcost')} 
            className={selectedContent === 'leadcost' ? 'active' : ''} 
            title='Select leadcost'
            style={{ 
              backgroundColor: selectedContent === 'leadcost' ? '#fed000' : '',
              borderRadius:'0px 10px 10px 0 ',
              height:'100%',
              width:'50%',
              marginRight:'-8px',
              color:'black'
            }}>
            LEADCOST
          </button>
        </div>
        <section className='h-[20vh]'>
            {selectedContent === 'webcost' && (
              <div>
                <WebCost 
                fields={fields}
                setFields={setFields}
                handleAddField={handleAddField}
                handleAddTotal={handleAddTotal}
                handleFieldChange={handleFieldChange}
                total={total}
                handleLabelChange={handleLabelChange}
                handleDeleteField={handleDeleteField}
                setValue={addWebCost}
                setTotal={setTotal}
                totalWebCost={totalWebCost}
                onClickTotal = {onClickTotal}
                />
                <ul>
                  {webCostValues.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedContent === 'leadcost' && (
              <div>
                <LeadCost 
                setValue={addLeadCost}
                expenses = {expenses}
                handleExpensesChange = {handleExpensesChange}
                totalCost = {totalCost}
                handleCostChange = {handleCostChange }
                lead = {lead}
                handleLeadChange = {handleLeadChange}
                calculateLeadCost = {calculateLeadCost}
                leadCost = {leadCost}
                />
                <ul>
                  {leadCostValues.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
        </section>
        <section className='h-[22vh] ml-[10%] bg-[#efeded] mt-[15%] w-[80%] grid grid-cols-2 gap-4 border border-black border-dashed border-spacing-10 rounded'>
          <div className="flex flex-col justify-center ml-[20%]">
              <label htmlFor="" className="mb-1">Conversion Rate</label>
              <input 
                type="number" min={0} 
                className='p-2 w-[100%]'
                value={totalConversionRate}
                onChange={handleConversionRateChange}
                required
                placeholder='500'

              />
          </div>
          <div className="flex flex-col justify-center ">
              <label htmlFor="" className="mb-1">Average Sale Price</label>
              <input 
                type="number" 
                min={0} 
                className='p-2 w-[80%]'
                value={totalAverageSale}
                required
                onChange={handleAverageSalePriceChange}
                placeholder='100'
              />
          </div>
      </section>
        <div className='flex gap-6 bottom-3 ml-[13%] absolute'>
        <button 
          onClick={onClickTotal} 
          className='bg-[#fed000] hover:bg-green-600 text-black font-bold py-2 px-[20%] rounded  focus:outline-none focus:shadow-outline'
        >
          Calculate
        </button>
        <button 
          onClick={handleReset}
          className='bg-[#fe5b00] hover:bg-red-700 text-white font-bold py-2 px-16 rounded mr-4 focus:outline-none focus:shadow-outline'
        title = "Reset all values"
        >
          Reset
        </button>
        </div>
      </section>
    </main>
  );
};

export default FirstField;
