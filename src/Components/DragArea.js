import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import store from "../utilities/store";
import { useDispatch } from "react-redux";
import { changeVisible, updateColList } from "../utilities/columnSlice";

const DragArea = () => {
  const dragItem = useRef(null);
  const dispatch = useDispatch();
  const dragOverItem = useRef(null);
  const colList = useSelector((store) => store.columns.columns);
  const handelSort = () => {
    let newCols = [...colList];
    const draggedItemContent = newCols.splice(dragItem.current, 1)[0];
    newCols.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    dispatch(updateColList(newCols));
  };
  const handelToggleVisible =(id) =>{
    dispatch(changeVisible(id));
  }
  return (
    <div className="flex gap-x-2 flex-wrap justify-center p-4 border shadow-lg mt-2">
      {colList.map((col, index) => (
        <div
          draggable
          key={col.name}
          className={col.isVisible?"p-4 border-2 cursor-move border-gray-600 bg-red-200":"p-4 border-2 border-gray-300"} 
          onDragStart={(e) => {dragItem.current = index}}
          onDragEnter={(e) => {dragOverItem.current = index}}
          onDragEnd={handelSort}
          onClick={()=>handelToggleVisible(col.order)}
        >
           {!col.isVisible ? <del>{col.Displayname}</del> : <span>{col.Displayname}</span>}
        </div>
      ))}
    </div>
  );
};

export default DragArea;
