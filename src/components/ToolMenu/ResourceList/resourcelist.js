import React, {useState} from "react";


const ResourceNode = ( {node} ) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // 切换展开/收缩状态
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div onClick={toggleExpand}>
                {/* 根据展开状态显示不同的图标 */}
                {isExpanded ? '-' : '+'}
                {node.name}
            </div>
            {/* 递归渲染子节点 */}
            {isExpanded && node.children && (
                <div style={{ marginLeft: '20px' }}>
                    {node.children.map(child => (
                        <ResourceNode key={child.id} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ResourceList({data}){
    return (
        <div>
            {data.map(node => (
                <ResourceNode key={node.id} node={node} />
            ))}
        </div>
    );

}

