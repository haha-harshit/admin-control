import React , {useEffect} from 'react';
import {Navbar, Footer, Sidebar, ThemeSettings} from './components';
import {Ecommerce,  Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Area, 
Bar, Pie, Financial, ColorMapping, ColorPicker, Editor, Line} from './pages';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {useStateContext} from './contexts/ContextProvider'
import Clubs from './pages/Clubs';
import ClubDetails from './pages/ClubDetails';
import DJ from './pages/DJ';
import User from './pages/User';
import Transactions from './pages/Transactions';
import DetailsTransaction from './pages/DetailsTransaction';
import RecentTransactions from './pages/UserRecent';
import Login from './pages/LoginPage';

const App = () => {

    const {activeMenu, themeSettings, setThemeSettings, currentColor, currentMode} = useStateContext();
    const isLoggedin =     !!localStorage.getItem('token');
  return (
    <div className={currentMode === 'Dark' ? 'dark': ''}>
        <BrowserRouter>

            <div className='flex relative dark:bg-main-dark-bg'>
            { isLoggedin === false ? '' :

                <div className='fixed right-4 bottom-4' style={{zIndex:'1000'}}>
                    <TooltipComponent content="Settings" position='Top'>
                        <button type='button' 
                        className='text-3xl p-3 hover:drop-shadow-xl
                         hover:bg-light-gray text-white' onClick={()=> setThemeSettings(true)}
                         style={{background: currentColor, borderRadius: '50%'}}>
                            <FiSettings/>
                        </button>
                    </TooltipComponent> 
                </div>
                 }


                {
                
               (isLoggedin === true) ? 
                activeMenu ? (
                    <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                        <Sidebar/>
                    </div>
                ) : (
                    <div className='w-0 dark:bg-secondary-dark-bg'>
                        <Sidebar/>
                    </div>
                )
                :""
                
                }
                <div className={ `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${ isLoggedin === true  && activeMenu ?
                     ' md:ml-72' 
                     :'flex-2'}`
                    }>


{ isLoggedin === false ? '' :

                <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                    <Navbar/>
                </div>
}

                { isLoggedin === true && themeSettings && <ThemeSettings/>}
      
                <div>
                    <Routes>
                        {/* Dashboard */}


                        <Route path="/" element={<Ecommerce/>}/>
                        <Route path="/login" element={<Login/>}/>

                        <Route path="/overview" element={<Ecommerce/>}/>

                        {/* Pages */}
                        <Route path="/clubs" element={<Clubs/>}/>
                        <Route path="/clubs/:id" element={<ClubDetails/>}/>

                        <Route path="/djs" element={<DJ/>}/>
                        <Route path="/customers" element={<User/>}/>
                        <Route path="/transactions" element={<Transactions/>}/>
                        <Route path="/transactions/:id" element={<DetailsTransaction/>}/>
                        <Route path="/user-transactions/:id" element={<RecentTransactions/>}/>

                        {/* Apps
                        <Route path="/kanban" element={<Kanban/>}/>
                        <Route path="/editor" element={<Editor/>}/>
                        <Route path="/calendar" element={<Calendar/>}/>
                        <Route path="/color-picker" element={<ColorPicker/>}/>

                        {/* Charts 
                        <Route path="/line" element={<Line/>}/>
                        <Route path="/area" element={<Area/>}/>
                        <Route path="/bar" element={<Bar/>}/>
                        <Route path="/pie" element={<Pie/>}/>
                        <Route path="/financial" element={<Financial/>}/>
                        <Route path="/color-mapping" element={<ColorMapping/>}/>
                        <Route path="/pyramid" element={<Pyramid/>}/>
                        <Route path="/stacked" element={<Stacked/>}/> */}
                    </Routes>
                </div>
            </div>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default App