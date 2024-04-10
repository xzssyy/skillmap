import React, {useEffect, useRef} from "react";
import "./fileviewcss.css"
export default function FileViewer({isOpen, onClose, filename, type}) {



    const modelRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            modelRef.current.focus();
        }
    }, [isOpen]);




    if (!isOpen) return null;


    let viewBox = null;

    switch (type){
        case "image":
            viewBox = readImage(filename);
            break;
        case "text":
            viewBox = readText(filename);
            break;
        case "video":
            viewBox = readVideo(filename);
            break;
    }

    return (
        <div className="modal" tabIndex="-1" ref={modelRef}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1>学习资源查看</h1>
                {viewBox}
            </div>
        </div>
    );
}


function readImage(filename) {
    const filepath = '/' + filename;
}


function readText(filename) {
    const filepath = '/' + filename;
}

function readVideo(filename) {
    const filepath = '/' + filename;

    return (
        <video controls>
            <source src={filepath} type="video/mp4"/>
            Your browser does not support the video tag.
        </video>
    )
}