import React ,{useState,useEffect} from 'react';
import {GoPrimitiveDot} from 'react-icons/go';

import {Stacked, Pie, Button, SparkLine} from '../components';
import {SparklineAreaData,ecomPieChartData} from '../data/dummy';
import { ContextProvider, useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { MdSpeaker } from "react-icons/md";
import { MdAddHomeWork } from "react-icons/md";

import { GrTransaction } from "react-icons/gr";

import { GrOverview } from "react-icons/gr";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
const ECommerce = () => {
 const navigate = useNavigate()
   useEffect(() => {
    const isLoggedin =     !!localStorage.getItem('token');
       if(isLoggedin === false){
        navigate('/login')
       }
   }, []);
const [homeData, sethomeData] = useState(null);
  const getHomeData = async()=>{
   await axios.get('https://club-be.onrender.com/clubpay/gethomescreendata')
  .then(response => {
    // Handle the response data here
    sethomeData(response.data);
  })
  .catch(error => {
    // Handle errors here
    console.error('Error making GET request:', error);
  });
  }
  const {currentColor} = useStateContext();
  useEffect(() => {
    getHomeData()
  }, []);
  
  // console.log(homeData);
  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount:  (homeData ? homeData.totalUsers : "loading..."),
      percentage: '-4%',
      title: 'Customers',
      iconColor: '#ff82bf',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <MdSpeaker />,
      amount: (homeData ? homeData.totalDJs : "loading..."),
      percentage: '+23%',
      title: `Dj's`,
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <MdAddHomeWork />,
      amount: (homeData ? homeData.totalClubs : "loading..."),
      percentage: '+38%',
      title: 'Clubs',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
  
      pcColor: 'green-600',
    },
    // {
    //   icon: <HiOutlineRefresh />,
    //   amount: '39',
    //   percentage: '-12%',
    //   title: 'Refunds',
    //   iconColor: 'rgb(0, 194, 146)',
    //   iconBg: 'rgb(235, 250, 242)',
    //   pcColor: 'red-600',
    // },
  ];
  return (
    <div className='mt-12'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44
         rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
              <div>
                <p className='font-bold text-gray-400'>Earnings</p>
                <p className='text-2xl'>₹{homeData ? homeData.totalPayment : "loading..."}</p>
              </div>
          </div>
          <div className='mt-6'>
            <Button color="white" bgColor={currentColor} text="Download" borderRadius="10px"/>
          </div>
        </div>
        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
          {earningData.map((item)=>(
            <div key={item.title} className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg
             md:w-56 p-4 pt-9 rounded-2xl'>
              <button type='button' style={{color:item.iconColor, backgroundColor:item.iconBg}}
               className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'>
                {item.icon}
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>
                  {item.amount}
                </span>
                <span className={`text-sm text-₹{item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-10 flex-wrap justify-center'>
            <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780'>
              <div className='flex justify-between'>
                <p className='font-semibold text-xl'>Revenue Updates</p>
                <div className='flex items-center gap-4'>
                  <p className='flex items-center gap-2 text-gray-600 hover:drop-shadow-xl'>
                    <span> <GoPrimitiveDot/> </span>
                    <span>Expense</span>
                  </p>
                  <p className='flex items-center gap-2 text-green-400 hover:drop-shadow-xl'>
                    <span> <GoPrimitiveDot/> </span>
                    <span>Budget</span>
                  </p>
                </div>
              </div>
              <div className='mt-10 flex gap-1 flex-wrap justify-center'>
                <div className='border-r-1 border-color m-4 pr-10'>
                  <div>
                    <p>
                      <span className='text-3xl font-semibold'>₹{homeData ? homeData.totalPayment * 10 : "loading..."}</span>
                      <span className='p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs'>
                        23%
                      </span>
                    </p>
                    <p className='text-gray-500 mt-1'>Budget</p>
                  </div>
                   <div className='mt-8'>
                    <p>
                      <span className='text-3xl font-semibold'>₹13,438</span>
                    </p>
                    <p className='text-gray-500 mt-1'>Expense</p>
                  </div>

                  {/* <div className='mt-5'>
                  <SparkLine 
                  currentColor={currentColor} 
                  id="line-sparkline" 
                  type="Line" 
                  height="80px"
                  width="250px" data={SparklineAreaData} color={currentColor}/>
                  </div>

                  <div className='mt-10'>
                    <Button color="white" bgColor={currentColor} text="Download Report" borderRadius="10px"/>
                  </div> */}


                
                </div>

                {/* <div>
                  <Stacked width="320px" height="360px"/>
                </div> */}
                <div style={{width:"260px",height:"260px",borderRadius:"50%",background:"linear-gradient(180deg,rgb(0, 194, 146),#000)", border:"1px solid #cccc"}}>
                        <img src={require('../data/cn.png')} style={{width:"100%",height:"100%"}} />
                </div>

              </div>
            </div>
      </div>
    </div>
  )
}

export default ECommerce