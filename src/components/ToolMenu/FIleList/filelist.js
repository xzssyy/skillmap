import {useState} from "react";
import FileViewer from "./FileViewer/fileviewer";


export default function FileList({data,addNode}) {


    const [isModalOpen, setIsModalOpen] = useState(false);


    const [filename, setFilename] = useState(null);

    const [type, setType] = useState(null)
    const openModal = (item) =>{
        setIsModalOpen(true);
        setFilename(item.filename)
        setType(item.type)
    }

    const closeModal = () =>{
        setIsModalOpen(false)
    }

    const styles = {
        position: "absolute",
        right: 100,
        border: "solid",
        height: "100%",
        width: "40%",
        padding: 20
    }


    return <div style={styles}>
        <ul>
            { data && data.map((item, index) => (
                <li key={index}>
                    {item.filename}
                <button style={{margin :10}} onClick={()=>{
                    addNode(item.filename, 6, 3)
                }}> 加入地图 </button>
                    <button onClick={()=>openModal(item)}> 查看内容</button>
                </li>
            ))}
        </ul>
        <FileViewer isOpen={isModalOpen} onClose={closeModal} filename={filename} type={type}></FileViewer>
    </div>
}