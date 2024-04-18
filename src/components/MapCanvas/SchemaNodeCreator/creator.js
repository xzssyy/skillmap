import {useState} from "react";


export default function NodeCreator({selectedNode}) {


    const [inputText, setInputText] = useState("")

    const styles = {
        height: "auto",
       Width: "100%",
        border: "solid",
    }

    const node1 = selectedNode[0]
    const node2 = selectedNode[1]

    const wrapperStyles = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridGap: 20,
        height: "100%",
        width: "90%",
        padding: 10,
        paddingLeft: 55
    }


    return <div style={styles}>
        <h2 style={{margin: "0", textAlign: "center"}}> 控件栏</h2>
        <div style={wrapperStyles}>
            {inputTool1({})}
            {inputTool2({node1,node2})}
            {inputTool3(node1)}
            {inputTool4({node1,node2})}
        </div>
    </div>;
}


// 创建schema节点
function inputTool1({addNode}) {



    const inputStyles = {
        border: "solid",
        height: "100%",
        textAlign: "center",
    }

    return (
        <div style={inputStyles}>
            <h3 style={{"margin": 0, "textAlign": "center"}}>创建节点</h3>

            <input style={{"margin": 22}} prefix={"ds"}></input>
            <div>
                <button style={{"margin": 4}}>创建</button>
            </div>
        </div>);
}


//创建连接
function inputTool2({node1, node2}) {
    const nodeL = node1 === null ?"未选中" : node1;
    const nodeR = node2=== null ?"未选中" : node2;
    const inputStyles = {
        border: "solid",
        height: "100%",
        textAlign: "center",
    }

    const textStyle1 = {
        display: "inline",
        color:"red"
    }

    const textStyle2 = {
        display: "inline",
        color:"green"
    }


    return (
        <div style={inputStyles}>
            <h3 style={{"margin": 0, "textAlign": "center"}}>创建连接</h3>

            <div style={{"margin": 5}}>节点1：<p style={textStyle1}>{nodeL}</p></div>
            <div style={{"margin": 5}}>节点2：<p style={textStyle2}>{nodeR}</p> </div>

            <button style={{"margin": 5}}>创建</button>
        </div>);
}

//删除节点
function inputTool3(node2) {


    const node = node2 === null ?"未选中" : node2;

    const inputStyles = {
        border: "solid",
        height: "100%",
        textAlign: "center",
    }

    const textStyle = {
        display: "inline",
        color:"red"
    }


    return (
        <div style={inputStyles}>
            <h3 style={{"margin": 0, "textAlign": "center"}}> 删除节点</h3>

            <div style={{"margin": 20}}>节点：<p style={textStyle}> {node}</p></div>

            <button style={{"margin": 3}}>删除</button>
        </div>);
}

//删除连接
function inputTool4({node1, node2}) {


    const nodeL = node1 === null ?"未选中" : node1;
    const nodeR = node2=== null ?"未选中" : node2;

    const inputStyles = {
        border: "solid",
        height: "100%",
        textAlign: "center",
    }

    const textStyle = {
        display: "inline",
        color:"orange"
    }


    return (
        <div style={inputStyles}>
            <h3 style={{"margin": 0, "textAlign": "center"}}> 删除连接</h3>

            <div style={{"margin": 5}}>节点1：<p style={textStyle}>{nodeL}</p></div>
            <div style={{"margin": 5}}>节点2：<p style={textStyle}>{nodeR}</p></div>

            <button style={{"margin": 5}}>删除</button>
        </div>);
}




