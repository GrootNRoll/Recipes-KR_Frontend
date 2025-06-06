import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/auth.mock';
import { toggleSavedRecipe } from '../../services/recipes.mock';
import { Recipe } from '../../types';
import { RECIPE_TYPES } from '../../utils/constants';
import './RecipeCard.scss';

interface RecipeCardProps {
  recipe: Recipe;
  inMyRecipes?: boolean;
  onRemove?: (id: string) => void;
  showSaveButton?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  inMyRecipes = false,
  onRemove,
  showSaveButton = true,
}) => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(recipe.savedBy?.includes(user?.email || '') || false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    const success = toggleSavedRecipe(user.email, recipe.id);
    if (success) {
      setSaved(!saved);
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRemove) {
      onRemove(recipe.id);
    }
    setShowConfirmModal(false);
  };

  // Находим соответствующий тип рецепта для перевода
  const recipeType = RECIPE_TYPES.find(type => type.value === recipe.type)?.label || recipe.type;

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-link">
        <div className="recipe-image-container">
          <img src={recipe.image} alt={recipe.title} />
          
          {/* Кнопка сохранения */}
          {showSaveButton && user && (
            <button
              className={`save-button ${saved ? 'saved' : ''}`}
              onClick={handleSaveToggle}
              aria-label={saved ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              {saved ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        <h3>{recipe.title}</h3>

        <div className="recipe-meta">
          <p>🕒 ~{recipe.totalTime} мин</p>
          <p>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < recipe.difficulty ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
          </p>
        </div>
        
        <div className="recipe-bottom">
          <p className="recipe-type">{recipeType}</p>
          <p className="recipe-ingredients">
            {recipe.ingredients?.length > 0 ? `Ингредиенты: ${recipe.ingredients.length}` : 'Нет ингредиентов'}
          </p>
        </div>
      </Link>

      {/* Модальное окно подтверждения удаления */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="delete-confirm-modal">
            <p>Вы уверены, что хотите удалить рецепт из избранного?</p>
            <div className="modal-buttons">
              <button onClick={confirmRemove} className="confirm-btn">Да</button>
              <button onClick={() => setShowConfirmModal(false)} className="cancel-btn">Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;