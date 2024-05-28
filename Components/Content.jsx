import SubField from "./Input/SubField";
import FirstField from "./Input/FirstField";
import { useState, useEffect } from "react";
import PouchDB from "pouchdb";
import getDetailPouchDb from "../utils/getDetailPouchDb";
import updateDetailsPouchDb from "../utils/updateDetailsPouchDb";
import updatePouchDb from "../utils/updatePouchDb";
const Content = ({ currencyId, currencySymbol}) => {
  const [selectedContent, setSelectedContent] = useState("webcost");
  const [webCostValues, setWebCostValues] = useState([]);
  const [leadCostValues, setLeadCostValues] = useState([]);
  const [totalWebCost, setTotalWebCost] = useState(0);
  const [totalLeadCost, setTotalLeadCost] = useState(0);
  const [totalConversionRate, setTotalConversionRate] = useState();
  const [totalAverageSale, setTotalAverageSale] = useState();
  const [data,setData] = useState([]);
  const [fields, setFields] = useState([
    { id: 1, label: "Development cost", value: "" },
  ]);
  const [total, setTotal] = useState(0);
  const [totalRoiValue, setTotalRoiValue] = useState(0);

  const [expenses, setExpenses] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [lead, setLead] = useState("");
  const [leadCost, setLeadCost] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [fields]);

  const handleFieldChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const handleLabelChange = (id, label) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, label } : field
    );
    setFields(updatedFields);
  };

  const handleAddField = () => {
    const newId = fields.length + 1;
    setFields([...fields, { id: newId, label: "", value: "" }]);
  };

  const handleDeleteField = (id) => {
    const filteredFields = fields.filter((field) => field.id !== id);
    setFields(filteredFields);
  };

  const calculateTotalValue = () => {
    const totalValue = fields.reduce(
      (total, field) => total + parseInt(field.value || 0),
      0
    );
    setTotal(totalValue);
  };
  // ... (rest of the code for webcost) ...
  const handleItemClick = (content) => {
    setSelectedContent(content);
  };

  const addWebCost = (cost) => {
    setWebCostValues([...webCostValues, cost]);
  };

  const addLeadCost = (cost) => {
    setLeadCostValues([...leadCostValues, cost]);
  };

  const handleExpensesChange = (event) => {
    setExpenses(event.target.value);
  };

  const handleCostChange = (event) => {
    setTotalCost(event.target.value);
  };

  const handleLeadChange = (event) => {
    setLead(event.target.value);
  };

  const calculateLeadCost = () => {
    if (lead !== 0) {
      console.log("lead --->", lead);
      const calculatedLeadCost = parseFloat(totalCost) / parseFloat(lead);
      console.log(
        "calculatedLeadCost --->",
        calculatedLeadCost,
        calculatedLeadCost.toFixed(2)
      );
      setLeadCost(calculatedLeadCost.toFixed(2));
    } else {
      setLeadCost(0);
    }
  };

  const calculateTotal = () => {
    const webCostSum = webCostValues.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    setTotalWebCost(webCostSum);
  };

  const clearValues = () => {
    if (selectedContent === "webcost") {
      setWebCostValues([]);
      setTotalWebCost(0);
    } else if (selectedContent === "leadcost") {
      setLeadCostValues([]);
      setTotalLeadCost(0);
    }
  };
  const handleAddTotal = (e) => {
    e.preventDefault();
    const webTotal = fields.reduce(
      (total, field) => total + Number(field.value || 0),
      0
    );
    setTotalWebCost(webTotal);
  };
  // ----------------------------
  // const totalProfitWeb = () => {
  //   console.log(
  //     `leadcost --->${leadCost}; totalConversarionRate--->${totalConversionRate}; averageSale--->${totalAverageSale}`
  //   );
  //   return leadCost * totalConversionRate * totalAverageSale;
  // };
  const totalProfitWeb = leadCost * totalConversionRate * totalAverageSale;

  const calculateTotalRoiValue = () => {
    const totalWeb = parseFloat(totalWebCost);
    // const profitWeb = totalProfitWeb();
    const profitWeb = totalProfitWeb;
    /* Website ROI (%) = [(Profit from Website - Cost of Website) / Cost of Website] * 100
              Where Profit from Website = (Leads Generated * Conversion Rate * Average Sale Value */

    console.log(`total webcost ram--->${totalWeb}; profit --->${profitWeb};`);
    const subRoi = (profitWeb - totalWeb);
    const totalRoi =(subRoi/totalWeb)/100;
    setTotalRoiValue(Math.abs(totalRoi.toFixed(2)));
  };
  const handleReset = () => {
    // Reset all the values here
    setTotal('');
    setTotalWebCost('');
    setTotalConversionRate('');
    setTotalAverageSale('');
    setTotalRoiValue('');
    setTotalLeadCost('');
    setLeadCost('');
    setExpenses('');
    setTotalCost('');
    setLead('');
    clearValues(); // Assuming clearValues is a function you have defined
  };
  const onClickTotal = async (e) => {
    handleAddTotal(e);
    calculateLeadCost(e);
    calculateTotalRoiValue(e);

    const hisData =[
      totalWebCost,
      leadCost,
      totalRoiValue
    ];
    setData(hisData);

    const pouchDb = await getDetailPouchDb("roi", "roi");
    if (pouchDb === "no record found ") {
      const response = {
        _id: "roi",
        data: { [data[2]]: data }
      };
      console.log("here")
      const res = await updateDetailsPouchDb("roi", response);
      console.log("res-->", res)
    }
    else {
      console.log("typeof -->", typeof pouchDb.data)
      const response = {
        _id: pouchDb._id,
        // data: data,
        data: { ...pouchDb.data, [data[2]]: data },
        _rev: pouchDb._rev,
      };
      const res = await updateDetailsPouchDb("roi", response)
      // const res = await updatePouchDb(pouchDb, data);
    }
    console.log("pouchDb --->", pouchDb);
  };

  return (
    <main
      className="relative mt-[15%] flex justify-center items-center w-screen h-100vh"
      style={{ zIndex: 0 }}
    >
      <div className="absolute flex h-[50%] bg-[#FFCA64] gap-[1%] w-full top-[10%] justify-center items-center">
        <FirstField
          selectedContent={selectedContent}
          addWebCost={addWebCost}
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
          webCostValues={webCostValues}
          clearValues={clearValues}
          calculateTotalValue={calculateTotalValue}
          handleItemClick={handleItemClick}
          addLeadCost={addLeadCost}
          leadCostValues={leadCostValues}
          onClickTotal={onClickTotal}
          expenses={expenses}
          handleExpensesChange={handleExpensesChange}
          totalCost={totalCost}
          handleCostChange={handleCostChange}
          lead={lead}
          handleLeadChange={handleLeadChange}
          calculateLeadCost={calculateLeadCost}
          leadCost={leadCost}
          setTotalConversionRate={setTotalConversionRate}
          setTotalAverageSale={setTotalAverageSale}
          totalConversionRate={totalConversionRate}
          totalAverageSale={totalAverageSale}
          handleReset = {handleReset}
        />
        <SubField
          totalWebCost={totalWebCost}
          leadCost={leadCost}
          totalRoiValue={totalRoiValue}
          totalConversionRate={totalConversionRate}
          totalAverageSale={totalAverageSale}
          currencyId={currencyId}
          currencySymbol={currencySymbol}
          fields = {fields}
          expenses = {expenses}
          totalCost = {totalCost}
          lead = {lead}
          totalProfitWeb = {totalProfitWeb}
          data = {data}
        />
      </div>
    </main>
  );
};

export default Content;
