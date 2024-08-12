import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import './DynamicButton.css';

interface DynamicButtonProps {
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  name?: string;
  danger?: boolean;
  loading?: boolean;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({ danger, disabled, icon, onClick, title, name,loading }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <Tooltip
      title={title}
      visible={tooltipVisible}
      onVisibleChange={(visible) => setTooltipVisible(visible)}
    >
      <Button
        type="text"
        loading={loading}
        shape="default"
        icon={icon}
        style={{ display: 'none', minWidth: 'fit-content', marginRight: 8 }}
        className="button-icon"
        onClick={onClick}
        disabled={disabled}
        danger={danger}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        {name}
      </Button>
    </Tooltip>
  );
};

export default DynamicButton;
