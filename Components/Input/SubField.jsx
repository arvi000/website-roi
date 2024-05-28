import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import History from '../History';
import { useState } from 'react';

const SubField = ({ totalWebCost, leadCost, totalRoiValue, setTotalAverageSale, setTotalConversionRate, totalConversionRate, totalAverageSale, currencyId, currencySymbol, fields, expenses, totalCost, lead, totalProfitWeb, data }) => {
    function downloadPdf() {
        const doc = new jsPDF();
        doc.setFont('times');
        doc.setFontSize(18);
        doc.setTextColor(254, 208, 0); // #fed000
        doc.text(75, 10, 'WEB ROI Calculator');
        const tableData = [];
        const formattedTotalWebCost = `${currencySymbol} ${totalWebCost}`;
        const formattedLeadCost = `${currencySymbol} ${leadCost}`;
        const formattedTotalRoiValue = `${totalRoiValue} % `;
        tableData.push([formattedTotalWebCost, formattedLeadCost, formattedTotalRoiValue]);
        doc.setDrawColor(0);
        doc.setTextColor(0);
        doc.setFontSize(16); // Increased font size for table header
        doc.autoTable({
            startY: 20,
            headStyles: { fillColor: [180, 200, 200] },
            bodyStyles: { fillColor: [255, 255, 255] }, // Set background color for table data
            columnStyles: { 0: { cellWidth: 80 } },
            head: [['Total Web Cost', 'Lead Cost', 'ROI Calculate']], // Table header
            body: tableData,
        });

        // Get final Y position after drawing the table
        const finalY = doc.autoTable.previous.finalY;

        // Place "Lead Cost Details" section below the table
        const leadCostDetailsY = finalY + 20;
        doc.setFontSize(12);
        doc.setTextColor(7);
        doc.text(20, leadCostDetailsY, 'Lead Cost Details');

        // Displaying Expenses
        doc.text(20, leadCostDetailsY + 10, `Expenses: ${expenses}`);

        // Displaying Total Cost
        if (!isNaN(totalCost)) {
            doc.text(20, leadCostDetailsY + 20, `Total Cost: ${currencySymbol} ${totalCost}`);
        } else {
            doc.text(20, leadCostDetailsY + 20, `Total Cost: ${currencySymbol} ${totalCost}`);
        }

        // Displaying Lead
        doc.text(20, leadCostDetailsY + 30, `Lead: ${currencySymbol} ${lead}`);

        // Displaying Time Period
        const timePeriodY = leadCostDetailsY + 50;
        const timePeriodX = 14;
        const rectWidth = 182;
        const rectHeight = 120;

        // Background rectangle
        doc.setFillColor(255, 87, 34); // Change background color for time period section
        doc.rect(timePeriodX, timePeriodY, rectWidth, rectHeight, 'F');

        // Text
        doc.setFontSize(14);
        doc.setTextColor(255);
        doc.text(timePeriodX + 30, timePeriodY + 20, 'Time Period:');

        // Monthly
        doc.setFillColor(255, 193, 7); // Change background color for monthly section
        doc.rect(timePeriodX + 20, timePeriodY + 30, 50, 20, 'F');
        doc.setTextColor(0);
        doc.text(timePeriodX + 25, timePeriodY + 40, 'Monthly');
        doc.setTextColor(255);
        doc.text(timePeriodX + 80, timePeriodY + 40, `${currencySymbol} ${totalWebCost}`);

        // Quarterly
        doc.setFillColor(76, 175, 80); // Change background color for quarterly section
        doc.rect(timePeriodX + 20, timePeriodY + 55, 60, 20, 'F');
        doc.setTextColor(0);
        doc.text(timePeriodX + 25, timePeriodY + 65, 'Quarterly');
        doc.setTextColor(255);
        doc.text(timePeriodX + 90, timePeriodY + 65, `${currencySymbol} ${totalWebCost * 3}`);

        // Half-yearly
        doc.setFillColor(33, 150, 243); // Change background color for half-yearly section
        doc.rect(timePeriodX + 20, timePeriodY + 80, 80, 20, 'F');
        doc.setTextColor(0);
        doc.text(timePeriodX + 25, timePeriodY + 90, 'Half-yearly');
        doc.setTextColor(255);
        doc.text(timePeriodX + 110, timePeriodY + 90, `${currencySymbol} ${totalWebCost * 6}`);
        doc.save('WebROI_report.pdf');
    }
    const [isHistory, setIsHistory] = useState(false)


    const historyPopup = () => {
        setIsHistory(true)
    }
    const closeHistoryDialog = () => {
        setIsHistory(false);
      };
  return (
    <>
      <section className='h-[75vh] flex-row w-[500px] mt-[16%] justify-center gap-y-[12%]'>
        <section className='bg-[#fff]  h-[22vh] flex '>
          <div className="border-r-2 border-gray-400 w-[50%] h-[100%]">
            <p className='p-4'>Total WebCost</p>
            <span className='flex pl-10 mt-auto text-[2em]'><b>{currencySymbol}  {(totalWebCost ? totalWebCost : '0')}</b></span>
          </div> 
          <div className="w-[50%] h-[100%]">
            <p className='p-4'>Total LeadCost</p>
            <span className='flex pl-10 mt-auto text-[2em]'><b>{currencySymbol} {leadCost ? leadCost:0}</b></span>
          </div> 
        </section>
        <section className='bg-[#fff]  h-[52vh] mt-[1%]'>
          <div className="roi pt-2 pl-2 mt-2">
            <p>ROI CALCULATE</p>
            <span className='h-10 w-[60%] ml-6 mt-4 bg-gray-300 flex border ' title='Total ROI in percentage'><b className='mt-[-1.5%] ml-12 text-[2em]'>{totalRoiValue ? totalRoiValue:0}%</b></span>
          </div>
          <div className="time mt-[5%] pl-2">
            <p>TIME PERIOD</p>
            <div className='flex gap-1 justify-between border-r-2  h-[20vh] mt-2'>
              <section className='flex flex-col justify-center bg-gray-400 items-center w-[30%] h-full ml-3' title='Mothly profit'>
                <span className='text-white mt-[-20%]'><b>Monthly</b></span>
                <span className='text-white mt-[20%]'>{totalProfitWeb ? totalProfitWeb:0}</span>
              </section>
              <section className='flex flex-col justify-center bg-gray-400 items-center w-[30%] h-full' title='Quarterly profit'>
                <span className='text-white mt-[-20%]'><b>Quarterly</b></span>
                <span className='text-white mt-[20%]'>{(totalProfitWeb * 3)}</span>
              </section>
              <section className='flex flex-col justify-center bg-gray-400 items-center w-[30%] h-full mr-4' title='Half-yearly profit'>
                <span className='text-white mt-[-20%]'><b>Half-yearly</b></span>
                <span className='text-white mt-[20%]'>{totalProfitWeb * 6}</span>
              </section>
            </div>
          </div>
          {totalWebCost && totalRoiValue ?(
            <div className="btn">
              <div className="flex p-4 justify-center">
              <button
                  type='button'
                  className='bg-green-500 h-10 w-[40%] items-center rounded-lg text-white transition-colors hover:bg-red-500'
                  onClick={historyPopup}
                  title='View history'
                >
                  History
                </button>
                <button
                  type='button'
                  className='bg-green-500 ml-[40%] h-10 w-[40%] items-center rounded-lg text-white transition-colors hover:bg-red-500'
                  onClick={downloadPdf}
                  title='Download total report'
                >
                  Download report
                </button>
                
              </div>
            </div>
           ) : null} 
        </section>
      </section>


            {isHistory ? <History data={data}
                onClose={closeHistoryDialog} /> : null}
        </>
    );
}

export default SubField;
