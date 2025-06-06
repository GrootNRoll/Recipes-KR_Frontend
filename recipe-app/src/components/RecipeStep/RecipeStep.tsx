import React, { useState } from 'react';
import './RecipeStep.scss';

interface RecipeStepProps {
  number: number;
  text: string;
  note?: string;
  timeLabel: string;
  isActive?: boolean; //  пропс для подсветки
  isOpen?: boolean;   
  isRunning?: boolean;
  onToggle?: () => void; // обработчик клика
}

const RecipeStep: React.FC<RecipeStepProps> = ({
  number,
  text,
  note,
  timeLabel,
  isActive = false,
  isRunning = false,
  isOpen = false,
  onToggle = () => {}, 
}) => {
  const [expanded, setExpanded] = useState(isOpen);

  const handleToggle = () => {
    if (!note) return;
    setExpanded(prev => !prev);
    onToggle();
  };

  return (
    <div className={`recipe-step ${isActive ? 'active' : ''} ${expanded ? 'expanded' : ''} ${isRunning ? 'running' : ''}`}>
      <div className="step-header" onClick={handleToggle}>
        <div className="step-number">{number}.</div>
        <div className="step-text">{text}</div>
        <div className="step-time">{timeLabel}</div>
        {note && <div className="step-arrow">{expanded ? '▼' : '▶'}</div>}
      </div>

      {/* Описание шага */}
      {note && expanded && (
        <div className="step-description">
          <p>{note}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeStep;