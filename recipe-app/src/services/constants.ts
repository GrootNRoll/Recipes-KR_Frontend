interface Recipe {
  id: string;
  title: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'other';
  image: string;
  steps: {
    number: number;
    text: string;
    note?: string;
  }[];
  author: string;
  savedBy?: string[];
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Омлет с овощами',
    type: 'breakfast',
    image: '/images/recipes/omelet.jpg',
    author: 'user1@example.com',
    steps: [
      { number: 1, text: 'Взбить яйца с солью', note: '2 яйца на порцию' },
      { number: 2, text: 'Нарезать овощи', note: 'Помидоры, перец, лук' },
      { number: 3, text: 'Обжарить овощи 2 минуты' },
      { number: 4, text: 'Залить яйцами и жарить до готовности' },
    ],
  },
  // Добавьте больше рецептов по аналогии
];

export const getRecipes = (type?: string) => {
  if (type) {
    return mockRecipes.filter(recipe => recipe.type === type);
  }
  return mockRecipes.slice(0, 6);
};

export const getRecipeById = (id: string) => {
  return mockRecipes.find(recipe => recipe.id === id);
};

export const saveRecipe = (userId: string, recipeId: string) => {
  const recipe = mockRecipes.find(r => r.id === recipeId);
  if (recipe) {
    if (!recipe.savedBy) {
      recipe.savedBy = [];
    }
    if (!recipe.savedBy.includes(userId)) {
      recipe.savedBy.push(userId);
    }
    return true;
  }
  return false;
};

export const removeSavedRecipe = (userId: string, recipeId: string) => {
  const recipe = mockRecipes.find(r => r.id === recipeId);
  if (recipe && recipe.savedBy) {
    recipe.savedBy = recipe.savedBy.filter(id => id !== userId);
    return true;
  }
  return false;
};

export const createRecipe = (recipe: Omit<Recipe, 'id' | 'savedBy'>) => {
  const newRecipe = {
    ...recipe,
    id: (mockRecipes.length + 1).toString(),
    savedBy: [],
  };
  mockRecipes.unshift(newRecipe);
  return newRecipe;
};

export const getUserRecipes = (userId: string) => {
  return mockRecipes.filter(recipe => recipe.author === userId);
};

export const getUserSavedRecipes = (userId: string) => {
  return mockRecipes.filter(recipe => recipe.savedBy?.includes(userId));
};