import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { updateData, updateEndDate, updateStartDate } from '../utilities/appDataSlice';

const DatePicker = () => {
  const [startDate, setStartDate] = useState("2021-06-01");
  const [endDate, setEndDate] = useState("2021-06-30");
  const dispatch = useDispatch();

  const handelEndDateChange = (value) => {
    setEndDate(value);
    dispatch(updateEndDate(value));
  }

  const handelStartDateChange = (value) => {
    setStartDate(value);
    dispatch(updateStartDate(value));
  }
  

  return (
    <div className='flex gap-x-2 items-center'>
      <input className="p-2 border-2 border-gray-200 rounded bg-gray-50" type='date'  min="2021-06-01" max="2021-06-30" value={startDate} onChange={(e)=>handelStartDateChange(e.target.value)}/>
      <span className='tex-xl'>to</span>
      <input className="p-2 border-2 border-gray-200 rounded bg-gray-50"type='date' min="2021-06-01" max="2021-06-30" value={endDate} onChange={(e)=>handelEndDateChange(e.target.value)}/>
    </div>
  )
}

export default DatePicker