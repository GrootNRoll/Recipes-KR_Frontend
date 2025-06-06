import React, { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import TypeFilter from '../../components/TypeFilter/TypeFilter';
import { getRecipes, mockRecipes } from '../../services/recipes.mock';
import { RECIPE_TYPES } from '../../utils/constants';
import './Home.scss';

const HomePage: React.FC = () => {
  const [filter, setFilter] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(getRecipes(undefined, 1, 8));

  const handleFilterChange = (type?: string) => {
    setCurrentPage(1);
    const filtered = getRecipes(type, 1, 8);
    setPaginatedData(filtered);
  };

  useEffect(() => {
    setPaginatedData(getRecipes(filter, currentPage, 8));
  }, [currentPage, mockRecipes.length, filter]);

  const filteredRecipes = paginatedData.recipes.filter(recipe =>
    !searchQuery || recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="home-page">
      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию..."
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </div>
        <TypeFilter currentFilter={filter} onFilterChange={handleFilterChange} />
      </div>
      <div className="recipes-grid">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {paginatedData.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Предыдущая
          </button>
          <span className="page-info">
            Страница {currentPage} из {paginatedData.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === paginatedData.totalPages}
            className="pagination-button"
          >
            Следующая
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;