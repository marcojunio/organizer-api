import React, { useState } from "react";

export function ProcessTree({ item, expanded, onExpandChange }) {
    const [expandedChild, setExpandedChild] = useState();
    return (
        <div className="node">
            {item.name && (
                <div className="card">
                    <img src={item.image} />
                    <div className="name">{item.name}</div>
                    <div className="designation">{item.designation}</div>
                    {onExpandChange && item.child?.length && (
                        <button onClick={onExpandChange}>
                            {expanded ? "hide" : "show"}
                        </button>
                    )}
                </div>
            )}
            {expanded && (
                <div className="children">
                    {item.child?.map((item, idx) => (
                        <ProcessTree
                            key={idx}
                            item={item}
                            onExpandChange={() => {
                                setExpandedChild(expandedChild === idx ? null : idx);
                            }}
                            expanded={expandedChild === idx}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
