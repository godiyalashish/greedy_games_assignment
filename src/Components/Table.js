import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import store from '../utilities/store'

const Table = () => {
    const colName = useSelector(store=>store.columns.columns);
    const apps = useSelector(store=>store.data.apps);
    const [tableData, setTableData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const startDate = useSelector(store=>store.data.startDate);
    const endDate = useSelector(store => store.data.endDate);

    const handelSort = (metric) =>{
        console.log(metric);
        setFilterData([...tableData].sort((a, b) => a[metric] > b[metric] ? 1 : -1));
    }

    useEffect(()=>{
        getData();
    },[startDate, endDate])

    const getData = async() =>{
        const data = await fetch(`https://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`);
        const json = await data.json();
        setTableData(json.data);
        setFilterData(json.data)
      }
    
    const RenderRow = ({col,data}) =>{
        if(col.name === "revenue") return col.isVisible &&<td className='p-2 border-r-2'>{(data[col.name])?.toFixed(3)}</td>
        if(col.name === "app_id"){
            const appName = apps.find((app) => app.app_id === data.app_id).app_name;
            return col.isVisible &&<td className='p-2 border-r-2'>{appName}</td>}
        if(col.name === "date") {
            const date = new Date(data.date);
            const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

            return col.isVisible &&<td className='p-2 border-r-2'>{formattedDate}</td>
        }
        if(col.name === "fill_rate") return col.isVisible &&<td className='p-2 border-r-2'>{((data.requests/data.responses)*100)?.toFixed(3)+"%"}</td>
        if(col.name === "CTR") return col.isVisible &&<td className='p-2 border-r-2'>{((data.clicks/data.impressions)*100)?.toFixed(3)+"%"}</td>
        return col.isVisible &&<td className='p-2 border-r-2'>{data[col.name]}</td> 
    }
    const RenderTableRows = () =>{
        if(tableData.lenght === 0) return<div>Loading..........</div>
        return filterData.map((rowData, index) => {
            return(
                <tr className='border hover:bg-slate-200' key={index}>
                    {colName.map((col, index)=>(
                        <RenderRow key={index} data={rowData} col={col}/>
                    ))}
                </tr>
            )
        })
    }
    const filterTable = (e) => {
        if(e.target.value === "all"){ setFilterData(tableData)}
        else{
        const newData =  tableData.filter(ele => ele.app_id === e.target.value);
        setFilterData(newData);
        }}

    if(!tableData) return <div>Loading.........</div>;
  return (
    <div>
    <div className='flex items-center p-2 justify-center'>
    <span>Filter by app name</span>
    <select onChange={(e)=>filterTable(e)} className='p-2 border ml-2 rounded'>
        <option value="all">All</option>
        {
            apps.map(app => <option value={app.app_id}>{app.app_name}</option>)
        }
    </select>
    </div>
        { (filterData.length === 0) ? <div>No results found...</div> :

            <table className="shadow-lg">
            <thead>
                <tr className='border-2 bg-slate-400'>
                    {colName.map(col => col.isVisible && <td className='font-bold p-2 border-r-2' key={col.order}>{col.Displayname}<button onClick={()=>handelSort(col.name)}>🔽</button></td>)}
                </tr>
            </thead>
            <tbody className='bg-slate-100'>
                <RenderTableRows/>
            </tbody>
        </table>}
    </div>
  )
}

export default Table