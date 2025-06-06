import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/auth.mock';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import TypeFilter from '../../components/TypeFilter/TypeFilter';
import { getUserSavedRecipes, getUserRecipes, removeSavedRecipe } from '../../services/recipes.mock';
import './MyRecipes.scss';
import { Recipe } from '../../types';

const MyRecipesPage: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeTab, setActiveTab] = useState<'created' | 'saved'>('created');

  const loadRecipes = () => {
    if (!user) return;
    
    if (activeTab === 'saved') {
      const savedRecipes = getUserSavedRecipes(user.email);
      setRecipes(savedRecipes);
    } else {
      const userRecipes = getUserRecipes(user.email);
      setRecipes(userRecipes);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [user, activeTab]);

  if (!user) return null;

  const filteredRecipes = recipes.filter(recipe =>
    (!filter || recipe.type === filter) &&
    (!searchQuery || recipe.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRemoveFromSaved = (recipeId: string) => {
    if (!user) return;
    
    const success = removeSavedRecipe(user.email, recipeId);
    if (success) {
      loadRecipes();
    }
  };

  return (
    <div className="my-recipes-page">
      <div className="recipes-tabs">
        <button 
          className={`tab-button ${activeTab === 'created' ? 'active' : ''}`}
          onClick={() => setActiveTab('created')}
        >
          Мои рецепты
        </button>
        <button 
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Сохранённые рецепты
        </button>
      </div>

      <div className="filters-container">
        <TypeFilter currentFilter={filter} onFilterChange={setFilter} />
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
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              inMyRecipes={false}
              onRemove={activeTab === 'saved' ? handleRemoveFromSaved : undefined}
              showSaveButton={activeTab !== 'created' || recipe.author !== user.email}
            />
          ))}
        </div>
      ) : (
        <p>
          {activeTab === 'saved' 
            ? 'У вас пока нет сохранённых рецептов' 
            : 'Вы пока не создали ни одного рецепта'}
        </p>
      )}
    </div>
  );
};

export default MyRecipesPage;