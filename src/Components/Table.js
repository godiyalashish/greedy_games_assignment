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

    const handelSortAccToRevenue = (metric) =>{
        const filtered = filterData.sort((a, b) => { 
            if(a[metric] < b[metric]){
                return -1
            }
            if(a[metric] > b[metric]){
                return 1;
            }
            return 0;
        });
        console.log(filtered);
        setFilterData(filtered);
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
                <tr className='border' key={index}>
                    {colName.map((col, index)=>(
                        <RenderRow key={index} data={rowData} col={col}/>
                    ))}
                </tr>
            )
        })
    }
    if(!tableData) return <div>Loading.........</div>;
  return (
    
    <div>
    <button onClick={() =>handelSortAccToRevenue("clicks")}>Sort</button>
        <table>
            <thead>
                <tr className='border-2 bg-slate-400'>
                    {colName.map(col => col.isVisible && <td className='font-bold p-2 border-r-2' key={col.order}>{col.Displayname}</td>)}
                </tr>
            </thead>
            <tbody>
                <RenderTableRows/>
            </tbody>
        </table>
    </div>
  )
}

export default Table