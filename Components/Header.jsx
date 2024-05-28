import React from 'react';
import Image from 'next/image';
import logo from '../public/icons/logo.png';
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import CurrencyPopUp from './CurrencyPopUp';
import { useState } from 'react';

const Header = ({title,width,itemList,currencyPopUpOpen,handleCurrencyChange,currencyId,currencySymbol,setCurrencySymbol,setCurrencyId,openCurrencyDialog,setOpenCurrencyDialog}) => {
  // const [openCurrencyDialog, setOpenCurrencyDialog] = useState(false);
 
  // const [currencySymbol, setCurrencySymbol] = useState("₹");
  // const [currencyId, setCurrencyId] = useState("INR");
  // const currencyPopUpOpen = () => {
  //   setOpenCurrencyDialog(true);
  // };
  // const handleCurrencyChange = (e) => {
  //   setCurrencyId(e.target.value);
  // }
  return (
    <header className="flex fixed top-0 items-center h-5vh mt-5% lg:mt-2% bg-[#f5f5f5] w-[100%] z-2" style={{ zIndex: 2 }}>
      <div className='w-[25%] md:w-[20%] lg:w-[10%] m-[1%]'>
        <Image 
          src={logo}
          alt="image"
          layout="responsive"
          width={1024}
          height={576}
        />
      </div>
      <p 
        className='text-bold ml-[5%] lg:text-lg md:text-lg text-sm border-l-2 pl-[3%] pb-[1%] md:pt-1 lg:pt-1 border-black'
      >
        {title}
      </p>
    
      <section className="justify-end ml-auto mr-[5%] flex">    
      <div className="curr">
        <label htmlFor="">Curr:</label>
        <select
                id="currencyPopUp"
                className={
                  "text-[18px] rounded-lg font-[Roboto-Regular] mt-1 ml-0 bg-transparent  cursor-pointer outline-none"
                }
                title='Select Currency'
                onClick={currencyPopUpOpen}
                onChange={handleCurrencyChange}
                value={currencyId}
              >
                <option value={currencyId}>
                  {(currencyId)}({currencySymbol})
                </option>
        </select>
        </div> 
      </section>
      <div className="">
        <CurrencyPopUp
          myCurrencySymbol={setCurrencySymbol}
          myCurrencyId={setCurrencyId}
          closeCurrencyPopUp={() => setOpenCurrencyDialog(false)}
          openCurrency={openCurrencyDialog}
        />
      </div>

    </header>
  );
};

Header.defaultProps = {
  title:"WEB ROI CALCULATOR"
}

export default Header;