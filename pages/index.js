import React from 'react'
import Head from 'next/head';
import Header from '../Components/Header';
import Content from '../Components/Content';
import Footer from '../Components/Footer';
import useWindowSize from '../public/hooks/useWindowSize';
import FirstField from '../Components/Input/FirstField';
import SubField from '../Components/Input/SubField';
import LeadCost from '../Components/Input/FirstField/LeadCost';
import WebCost from '../Components/Input/FirstField/WebCost';
import { useState } from 'react';


export default function Home() {
  const {width} = useWindowSize();
  const [openCurrencyDialog, setOpenCurrencyDialog] = useState(false);
 
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [currencyId, setCurrencyId] = useState("INR");
  const currencyPopUpOpen = () => {
    setOpenCurrencyDialog(true);
  };
  const handleCurrencyChange = (e) => {
    setCurrencyId(e.target.value);
  }
  return (
    <div>
      <main className='relative flex justify-center items-center w-screen h-screen overflow-y-scroll mt-[-3%]' style={{ zIndex: 0 }}>
      <div className='absolute lg:flex h-[50%] bg-[#FFCA64] gap-[1%] w-full top-[10%] justify-center items-center'>
          {/* <FirstField /> */}
          {/* <SubField /> */}
          <Header 
            title = "WEB ROI CALCULATOR"
            width = {width}
            currencyPopUpOpen = {currencyPopUpOpen}
            handleCurrencyChange = {handleCurrencyChange}
            currencyId = {currencyId} 
            currencySymbol = {currencySymbol}
            setCurrencySymbol = {setCurrencySymbol}
            setCurrencyId = {setCurrencyId}
            openCurrencyDialog = {openCurrencyDialog}
            setOpenCurrencyDialog = {setOpenCurrencyDialog}
            
          />
          <Content 
              currencyPopUpOpen = {currencyPopUpOpen}
              handleCurrencyChange = {handleCurrencyChange}
              currencyId = {currencyId} 
              currencySymbol = {currencySymbol}
              setCurrencySymbol = {setCurrencySymbol}
              setCurrencyId = {setCurrencyId}
              openCurrencyDialog = {openCurrencyDialog}
              setOpenCurrencyDialog = {setOpenCurrencyDialog}
          />
          <Footer />
      </div>
    </main>
    </div>
  );
}
