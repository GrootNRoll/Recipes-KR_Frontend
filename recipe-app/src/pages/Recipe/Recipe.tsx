import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/recipes.mock';
import RecipeStep from '../../components/RecipeStep/RecipeStep';
import './Recipe.scss';

interface StepWithDuration {
  number: number;
  text: string;
  note?: string;
  duration?: number;
  timeLabel: string;
  startTime: number; // в минутах
  endTime: number;  // в минутах
}

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = getRecipeById(id || '');

  if (!recipe) {
    return <div>Рецепт не найден</div>;
  }

  // Добавляем финальный шаг "Готово"
  const stepsWithFinalStep = [...recipe.steps];
  if (stepsWithFinalStep.length > 0) {
    stepsWithFinalStep.push({
      number: stepsWithFinalStep.length + 1,
      text: 'Блюдо готово!',
      duration: 0,
    });
  }

  let cumulativeTimeMin = 0;

  // Добавляем временные метки в **минутах**
  const stepsWithTime = stepsWithFinalStep.map((step, index) => {
    const startTimeMin = cumulativeTimeMin;
    const formattedTime = `${String(Math.floor(startTimeMin / 60)).padStart(2, '0')}:${String(startTimeMin % 60).padStart(2, '0')}`;
    const stepDurationMin = step.duration || 5;
    const endTimeMin = startTimeMin + stepDurationMin;

    if (index < recipe.steps.length) {
      cumulativeTimeMin += stepDurationMin;
    }

    return {
      ...step,
      timeLabel: formattedTime,
      startTime: startTimeMin,
      endTime: endTimeMin,
    };
  });

  const totalStepsSec = cumulativeTimeMin * 60;

  // Состояния
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [expandedStepIndex, setExpandedStepIndex] = useState<number | null>(null);

  useEffect(() => {
    setExpandedStepIndex(currentStepIndex); // Автоматически открывает описание текущего шага
  }, [currentStepIndex]);

  // Обновление таймера
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          // Останавливаем, если всё закончилось
          if (prev >= totalStepsSec) {
            setIsRunning(false);
            return prev;
          }

          const nextStep = stepsWithTime.find(step => step.startTime * 60 > prev);

          // Если следующий шаг найден — переходим к нему
          if (nextStep) {
            const nextStepStartTimeSec = nextStep.startTime * 60;

            // Проверяем точное условие: прошло ли время текущего шага
            if (prev >= nextStepStartTimeSec - 1) {
              setCurrentStepIndex(stepsWithTime.indexOf(nextStep));
            }
          }

          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, totalStepsSec, stepsWithTime]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  const handleNext = () => {
    if (currentStepIndex < stepsWithTime.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setSecondsElapsed(stepsWithTime[nextIndex].startTime * 60); 
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setSecondsElapsed(stepsWithTime[prevIndex].startTime * 60);
    }
  };

  const currentStep = stepsWithTime[currentStepIndex];

  // Вычисления прогресса и времени
  const currentStepDurationSec = stepsWithTime[currentStepIndex + 1]
    ? (stepsWithTime[currentStepIndex + 1].startTime - currentStep.startTime) * 60
    : 0;

  const secondsInStep = secondsElapsed - currentStep.startTime * 60;
  const progressPercent = currentStepDurationSec
    ? Math.min((secondsInStep / currentStepDurationSec) * 100, 100)
    : 0;

  const remainingTimeInStep = Math.max(0, currentStepDurationSec - secondsInStep);
  const minutesRemaining = Math.floor(remainingTimeInStep / 60);
  const secondsRemaining = remainingTimeInStep % 60;

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <span>🕒 Время приготовления: ~{recipe.totalTime} мин</span>
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-left-column">
          <div className="recipe-image-wrapper">
            <img src={recipe.image} alt={recipe.title} />
          </div>

          <div className="recipe-details">
            <div className="recipe-difficulty">
              <span>Сложность:</span>
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < recipe.difficulty ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="ingredients">
              <h4>Ингредиенты на одну порцию:</h4>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <span>{item.amount} {item.unit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="recipe-info">
          {/* Описание рецепта */}
          <p className="recipe-description">{recipe.description}</p>

          {/* Таймер */}
          <div className="timer-controls">
            <h3>Таймер</h3>
            <div className="timer-buttons">
              <button onClick={handlePrev} disabled={currentStepIndex === 0}>⬅️ Назад</button>
              {!isRunning ? (
                <button onClick={handleStart}>▶️ Старт</button>
              ) : (
                <button onClick={handleStop}>⏸ Стоп</button>
              )}
              <button onClick={handleNext} disabled={currentStepIndex === stepsWithTime.length - 1}>
                Вперёд ➡️
              </button>
            </div>

            {/* Прогресс-бар */}
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>

            {/* Оставшееся время */}
            <div className="time-remaining">
              Осталось: {minutesRemaining}:{String(secondsRemaining).padStart(2, '0')}
            </div>
          </div>

          {/* Шаги рецепта */}
          <div className="steps-container">
            {stepsWithTime.map((step, index) => (
              <RecipeStep 
                key={step.number}
                number={step.number}
                text={step.text}
                note={step.note}
                timeLabel={step.timeLabel}
                isActive={index === currentStepIndex}
                isRunning={isRunning}
                isOpen={expandedStepIndex === index}
                onToggle={() => setExpandedStepIndex(expandedStepIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;