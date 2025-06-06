import React from 'react';
import { RECIPE_TYPES } from '../../utils/constants';
import './TypeFilter.scss';

interface TypeFilterProps {
  currentFilter?: string;
  onFilterChange: (filter?: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="type-filter">
      <button
        className={!currentFilter ? 'active' : ''}
        onClick={() => onFilterChange()}
      >
        Все
      </button>
      
      {RECIPE_TYPES.map(type => (
        <button
          key={type.value}
          className={currentFilter === type.value ? 'active' : ''}
          onClick={() => onFilterChange(type.value)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;