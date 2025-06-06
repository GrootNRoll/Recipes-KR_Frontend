import React from 'react';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import { useNavigate } from 'react-router-dom';
import { createRecipe, mockRecipes } from '../../services/recipes.mock';
import { useAuth } from '../../services/auth.mock';
import './NewRecipe.scss';

const NewRecipePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (
    type: 'breakfast' | 'lunch' | 'dinner' | 'other',
    title: string,
    description: string,
    totalTime: number,
    difficulty: 1 | 2 | 3 | 4 | 5,
    ingredients: Array<{ name: string; amount: number; unit: string }>,
    steps: Array<{ text: string; note?: string; duration?: number }>,
    image: string
  ) => {
    console.log('NewRecipe: handleSubmit начало выполнения');
    
    if (!user) {
      console.error('NewRecipe: Пользователь не авторизован');
      alert('Необходимо авторизоваться для создания рецепта');
      return;
    }

    try {
      const newRecipe = {
        title,
        type,
        description,
        totalTime,
        difficulty,
        ingredients,
        steps: steps.map((step, index) => ({ ...step, number: index + 1 })),
        image,
        author: user.email,
        savedBy: [],
      };
      
      console.log('NewRecipe: Подготовленные данные рецепта:', newRecipe);
      
      const createdRecipe = createRecipe(newRecipe);
      console.log('NewRecipe: Рецепт успешно создан:', createdRecipe);
      
      console.log('NewRecipe: Текущее состояние mockRecipes:', mockRecipes);
      
      // Добавляем небольшую задержку перед перенаправлением
      setTimeout(() => {
        console.log('NewRecipe: Попытка перехода на главную');
        navigate('/', { replace: true });
        console.log('NewRecipe: Команда перехода выполнена');
      }, 100);

    } catch (error) {
      console.error('NewRecipe: Ошибка при создании рецепта:', error);
      alert('Произошла ошибка при создании рецепта. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className="new-recipe-page">
      <h2>Создание нового рецепта</h2>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewRecipePage;