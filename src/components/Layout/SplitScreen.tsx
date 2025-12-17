import React from 'react';
import './SplitScreen.css';

interface SplitScreenProps {
  topSection: React.ReactNode;
  bottomSection: React.ReactNode;
  topHeight?: string; // default: 40%
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  topSection,
  bottomSection,
  topHeight = '40%',
}) => {
  return (
    <div className="split-screen">
      <div className="split-screen__top" style={{ height: topHeight }}>
        {topSection}
      </div>
      <div className="split-screen__bottom">
        {bottomSection}
      </div>
    </div>
  );
};
