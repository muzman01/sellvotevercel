import React from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LayersIcon from '@material-ui/icons/Layers';
import LockIcon from '@material-ui/icons/Lock';
import EcoIcon from '@material-ui/icons/Eco';
import Flag from '@material-ui/icons/Flag';
import Link from 'next/link';
import { withTranslation } from 'react-i18next';
import i18n from '../../../../i18n';

const Sidebar = () => {
    const onChangeLanguage =  language =>{
        
        i18n.changeLanguage(language);
    }
    return (
        <div className="md:w-3/12 w-6/12 h-screen shadow-2xl" style={{height:'730px'}}>
            <div className=" border-b py-3 mt-1 flex justify-around ">
                <p className="text-xl  font-semibold">Robinaswap</p>
                <p>|</p>
                <p className="text-gray-400 text-lg">wallet</p>

            </div>
            <div className="p-4 space-y-14">
                <div className="space-y-4" >
                    <h1 className="text-gray-400">Menu</h1>
                    <div className="">
                    <Link href="/" >
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <DonutLargeIcon className=" text-gray-300" />
                     
                             <a> <p className=" "  >{i18n.t('Home')}</p></a>
                      
                                        
                        </div>
                        </Link>
                    </div>
                    <div className="">
                    <Link href='/about' >
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <ClearAllIcon className="text-gray-300" />
                            
                             <a>  <p className="text-gray-600  " >{i18n.t('About Us')}</p></a>
                       
                           
                        </div>
                        </Link>
                    </div>
             
                    <div className="">
                    <Link href="/sellvote" >
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <SyncAltIcon className="text-gray-300" />
                          
                             <a> <p className="text-gray-600  " >Oy satın al</p></a>
                  
                            
                        </div>
                        </Link>
                    </div>
                    <div className="">
                    <Link href="/user" >
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <SyncAltIcon className="text-gray-300" />
                          
                             <a> <p className="text-gray-600  " >İşlemlerim</p></a>
                  
                            
                        </div>
                        </Link>
                    </div>

                </div>
                <div className="space-y-6" >
                 
                    <div className="">
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <Flag className="text-gray-300" />
                            {i18n.language == 'en' ? (   <p className="text-gray-600  " onClick={() => onChangeLanguage('tr')} >Türkçe</p>) : (   <p className="text-gray-600  " onClick={() => onChangeLanguage('en')} >English</p>)}
                         
                         
                        </div>
                    </div>

                </div>
      
            </div>

        </div>
    )
}

export default withTranslation()(Sidebar)
