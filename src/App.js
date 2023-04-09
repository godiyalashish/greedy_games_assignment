import './App.css';
import DatePicker from './Components/DatePicker';
import {useEffect} from 'react';
import DragArea from './Components/DragArea';
import { Provider } from 'react-redux';
import store from './utilities/store';
import Table from './Components/Table';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleSetingVisible } from './utilities/settingsSlice';
import { updateAppData } from './utilities/appDataSlice';

const App = () =>{
  useEffect(()=>{
    getApps()
  },[])
  const dispatch = useDispatch();
  const toggleShowSettings = () =>{
    dispatch(toggleSetingVisible());
  }
  const showSettings = useSelector(store=>store.settings.isSettingVisible)
  const getApps = async() =>{
    const data = await fetch('https://go-dev.greedygame.com/v3/dummy/apps');
    const json = await data.json();
    dispatch(updateAppData(json.data));
  }
  return (
    <div className='flex flex-col p-2 gap-y-4'>
    <div className='flex justify-between'>
      <DatePicker/>
      <button className='text-white rounded-lg bg-slate-400 py-1 px-4' onClick={toggleShowSettings}>Settings</button>
    </div>
      {showSettings && <DragArea/>}  
    
    <div className='flex justify-center'>
      <Table/>
      </div>    
    </div>
  );
}

export default App;
