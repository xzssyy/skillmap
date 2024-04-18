import React, {useState} from "react";


const ResourceNode = ({node, itemClick, selectedItem}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // 切换展开/收缩状态
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const selectedStyles = {
        color : "red",
        fontWeight:700
    }

    const textStyle = selectedItem && selectedItem.id == node.id ?{color : "red", ...selectedStyles } : {color: "black"};


    return (
        <div>
            <div>
                {/* 根据展开状态显示不同的图标 */}
                {node.children &&

                    <button onClick={toggleExpand}>
                        {isExpanded ? '-' : '+'}
                    </button>}

                <div style={{display: 'inline-block', marginLeft: '20px', ...textStyle}} onClick={()=>itemClick(node)}>
                    {node.name}
                </div>

            </div>
            {/* 递归渲染子节点 */
            }
            {
                isExpanded && node.children && (
                    <div style={{marginLeft: '20px'}}>
                        {node.children.map(child => (
                            <ResourceNode key={child.id} node={child} itemClick={itemClick} selectedItem={selectedItem}/>
                        ))}
                    </div>
                )
            }
        </div>
    )
        ;
}

export default function ResourceList({data, itemClick, selectedItem}) {

    const styles = {
        position:"absolute",
        left:20,
        border:"solid",
        height:"100%",
        width:"25%",
        padding:20
    }
    return (
        <div style={styles}>
            {data.map(node => (
                <ResourceNode key={node.id} node={node} itemClick={itemClick} selectedItem={selectedItem}/>
            ))}
        </div>
    );

}

