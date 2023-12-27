import React, { useEffect, useState } from "react";
import "./style.scss";
const SwitchTab = ({ tabArr, handleswitch }) => {
  const [activeTab, setactiveTab] = useState(0);
  useEffect(() => {
    handleswitch(tabArr[activeTab]);
  }, [activeTab]);
  return (
    <div className="switchtab">
      {tabArr.map((val, index) => {
        if (index === activeTab) {
          return <span className="tab active">{val}</span>;
        } else {
          return (
            <span className="tab" onClick={(e) => setactiveTab(index)}>
              {val}
            </span>
          );
        }
      })}
    </div>
  );
};

export default SwitchTab;
