import React, { useState } from 'react';
import { RECIPE_TYPES } from '../../utils/constants';
import './RecipeForm.scss';
import { Recipe } from '../../types';

interface RecipeStep {
  text: string;
  note?: string;
  duration?: number;
}

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}


interface RecipeFormProps {
  onSubmit: (
    type: Recipe['type'],
    title: string,
    description: string,
    totalTime: number,
    difficulty: Recipe['difficulty'],
    ingredients: Recipe['ingredients'],
    steps: RecipeStep[],
    image: string
  ) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [type, setType] = useState<Recipe['type']>('breakfast');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [totalTime, setTotalTime] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>(3);
  const [steps, setSteps] = useState<RecipeStep[]>([
    { text: '', note: '', duration: undefined }
  ]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', amount: 0, unit: '' }
  ]);
  const [customImageUrl, setCustomImageUrl] = useState<string>(
    '/images/recipes/default.jpg'
  );

  const addStep = () => {
    setSteps([...steps, { text: '', note: '', duration: undefined }]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);
    }
  };

  const updateStep = (
    index: number,
    field: keyof RecipeStep,
    value: string | number
  ) => {
    const newSteps = [...steps];

    if (field === 'text' || field === 'note') {
      newSteps[index][field] = value as string;
    } else if (field === 'duration') {
      newSteps[index].duration = Math.max(0, Number(value));
    }

    setSteps(newSteps);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 0, unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const updated = [...ingredients];

    if (field === 'name' || field === 'unit') {
      updated[index][field] = value as string;
    } else if (field === 'amount') {
      updated[index].amount = Math.max(0, Number(value));
    }

    setIngredients(updated);
  };

  const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setCustomImageUrl(url);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log('1. Начало отправки формы');
    e.preventDefault();
    console.log('2. preventDefault выполнен');
    console.log('3. Текущие значения формы:', {
      title: title.trim(),
      totalTime,
      stepsValid: steps.every(step => step.text.trim() !== '' && step.duration !== undefined && step.duration > 0),
      steps: steps.map(step => ({
        text: step.text,
        duration: step.duration,
        isValid: step.text.trim() !== '' && step.duration !== undefined && step.duration > 0
      }))
    });

    if (title.trim() === '' || !totalTime || steps.some(step => step.text.trim() === '' || step.duration === undefined || step.duration <= 0)) {
      console.log('4. Валидация не пройдена');
      return alert('Заполните все обязательные поля');
    }

    console.log('5. Валидация пройдена, вызываем onSubmit');
    try {
      onSubmit(
        type,
        title,
        description,
        totalTime,
        difficulty,
        ingredients.filter(i => i.name.trim() !== ''),
        steps.map((step, index) => ({
          ...step,
          number: index + 1,
        })),
        customImageUrl || '/images/recipes/default.jpg'
      );
      console.log('6. onSubmit выполнен успешно');
    } catch (error) {
      console.error('7. Ошибка при выполнении onSubmit:', error);
    }
  };

  const canSubmit =
    title.trim() !== '' &&
    totalTime > 0 &&
    steps.every(step => step.text.trim() !== '' && step.duration !== undefined && step.duration > 0);
  console.log('canSubmit:', canSubmit, {
    titleValid: title.trim() !== '',
    timeValid: totalTime > 0,
    stepsValid: steps.every(step => step.text.trim() !== '' && step.duration !== undefined && step.duration > 0),
    steps: steps.map(step => ({
      text: step.text,
      duration: step.duration,
      isValid: step.text.trim() !== '' && step.duration !== undefined && step.duration > 0
    }))
  });


  return (
    <form 
      className="recipe-form" 
      onSubmit={(e) => {
        console.log('Form submit event');
        handleFormSubmit(e);
      }}
      onMouseDown={(e) => {
        console.log('Form mousedown event');
      }}
      onClick={(e) => {
        console.log('Form click event');
      }}
    >
      {/* Тип рецепта */}
      <div className="form-group">
        <label>Тип рецепта</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value as Recipe['type'])}
          required
          style={{
            color: '#ccc', 
            backgroundColor: '#1e1e1e', 
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid var(--primary-color)',
            borderRadius: '4px',
          }}
        >
          {RECIPE_TYPES.map((recipeType) => (
            <option key={recipeType.value} value={recipeType.value}>
              {recipeType.label}
            </option>
          ))}
        </select>
      </div>

      {/* Название */}
      <div className="form-group">
        <label>Название</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={127}
          placeholder="Например: Омлет с овощами"
          required
        />
      </div>

      {/* Описание */}
      <div className="form-group">
        <label>Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Краткое описание рецепта"
        />
      </div>

      {/* Общее время приготовления */}
      <div className="form-group">
        <label>Общее время приготовления (мин)</label>
        <input
          type="number"
          value={totalTime}
          onChange={(e) => setTotalTime(Math.max(0, Number(e.target.value)))}
          min="1"
          required
        />
      </div>

      {/* Сложность */}
      <div className="form-group">
        <label>Сложность</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value) as Recipe['difficulty'])}
          required
          style={{
            color: '#ccc', 
            backgroundColor: '#1e1e1e', 
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid var(--primary-color)',
            borderRadius: '4px',
          }}
        >
          <option value={1}>1 — Очень легко</option>
          <option value={2}>2 — Легко</option>
          <option value={3}>3 — Среднее</option>
          <option value={4}>4 — Сложно</option>
          <option value={5}>5 — Очень сложно</option>
        </select>
      </div>

      {/* Поле для URL изображения */}
      <div className="form-group">
        <label>Фото блюда (URL)</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg" 
          value={customImageUrl}
          onChange={handleCustomUrlChange}
        />
      </div>

      {/* Предпросмотр изображения */}
      {customImageUrl && (
        <div className="form-group image-preview-wrapper">
          <img src={customImageUrl} alt="Предпросмотр" className="image-preview" />
          <button
            type="button"
            className="remove-image"
            onClick={() => setCustomImageUrl('')}
          >
            &times;
          </button>
        </div>
      )}

      {/* Ингредиенты */}
      <div className="form-group">
        <label>Ингредиенты на одну порцию</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="text"
              placeholder="Название"
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Количество"
              value={ingredient.amount}
              onChange={(e) => updateIngredient(index, 'amount', Number(e.target.value))}
              min="0"
            />
            <input
              type="text"
              placeholder="Единицы измерения"
              value={ingredient.unit}
              onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
            />
            {ingredients.length > 1 && (
              <button 
                type="button" 
                className="remove-ingredient"
                onClick={() => removeIngredient(index)}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="add-ingredient">
          + Добавить ингредиент
        </button>
      </div>

      {/* Шаги */}
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="step-header">
              <h4>Шаг {index + 1}</h4>
              {steps.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeStep(index)}
                  className="remove-step"
                >
                  Удалить
                </button>
              )}
            </div>
            <textarea
              value={step.text}
              onChange={(e) => updateStep(index, 'text', e.target.value)}
              placeholder="Описание шага"
              required
            />
            <input
              type="number"
              value={step.duration ?? ''}
              onChange={(e) => updateStep(index, 'duration', Math.max(0, Number(e.target.value)))}
              placeholder="Время (мин)"
              min="0"
              required
            />
            <input
              type="text"
              value={step.note || ''}
              onChange={(e) => updateStep(index, 'note', e.target.value)}
              placeholder="Примечание (необязательно)"
            />
          </div>
        ))}
      </div>

      <button 
        type="button" 
        onClick={addStep}
        className="add-step"
      >
        Добавить шаг
      </button>

      <button 
        type="button" 
        disabled={!canSubmit}
        className="submit-button"
        onClick={(e) => {
          console.log('Клик по кнопке отправки');
          console.log('Состояние canSubmit:', canSubmit);
          console.log('Состояние кнопки disabled:', !canSubmit);
          if (canSubmit) {
            handleFormSubmit(new Event('submit') as unknown as React.FormEvent);
          }
        }}
      >
        Сохранить рецепт
      </button>
    </form>
  );
};

export default RecipeForm;