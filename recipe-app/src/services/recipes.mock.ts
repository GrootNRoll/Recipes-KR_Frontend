interface Recipe {
  id: string;
  title: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'other';
  image: string;
  description: string;
  totalTime: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
  steps: Array<{
    number: number;
    text: string;
    note?: string;
    duration?: number;
  }>;
  author: string;
  savedBy?: string[];
}

export let mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Омлет с овощами и сыром',
    type: 'breakfast',
    image: '/images/recipes/omelet.jpg',
    description: 'Воздушный омлет с сочными овощами, ароматными травами и тающим сыром. Идеальное начало дня с правильным сочетанием белков и витаминов. Блюдо получается не только вкусным и питательным, но и очень красивым благодаря разноцветным овощам.',
    totalTime: 20,
    difficulty: 2,
    ingredients: [
      { name: 'яйца', amount: 3, unit: 'шт.' },
      { name: 'молоко', amount: 50, unit: 'мл' },
      { name: 'помидоры черри', amount: 100, unit: 'гр.' },
      { name: 'перец болгарский', amount: 100, unit: 'гр.' },
      { name: 'лук красный', amount: 50, unit: 'гр.' },
      { name: 'сыр чеддер', amount: 50, unit: 'гр.' },
      { name: 'масло оливковое', amount: 20, unit: 'мл' },
      { name: 'базилик свежий', amount: 5, unit: 'гр.' },
      { name: 'соль', amount: 1, unit: 'щепотка' },
      { name: 'перец черный', amount: 1, unit: 'щепотка' }
    ],
    steps: [
      { 
        number: 1, 
        text: 'Взбить яйца с молоком, солью и перцем до однородной массы', 
        note: 'Взбивать венчиком 1-2 минуты до появления легкой пены', 
        duration: 2
      },
      { 
        number: 2, 
        text: 'Нарезать помидоры черри половинками, болгарский перец соломкой, красный лук тонкими полукольцами', 
        note: 'Размер нарезки важен для равномерного приготовления', 
        duration: 5
      },
      { 
        number: 3, 
        text: 'Натереть сыр на крупной терке', 
        note: 'Можно использовать готовый тертый сыр', 
        duration: 2
      },
      { 
        number: 4, 
        text: 'Разогреть сковороду с оливковым маслом на среднем огне', 
        note: 'Сковорода должна быть хорошо прогрета', 
        duration: 2
      },
      { 
        number: 5, 
        text: 'Обжарить лук до прозрачности', 
        note: 'Помешивать, чтобы не пригорел', 
        duration: 3
      },
      { 
        number: 6, 
        text: 'Добавить болгарский перец, обжарить 2 минуты', 
        note: 'Перец должен остаться хрустящим', 
        duration: 2
      },
      { 
        number: 7, 
        text: 'Добавить помидоры черри, готовить 1 минуту', 
        note: 'Помидоры не должны полностью развариться', 
        duration: 1
      },
      { 
        number: 8, 
        text: 'Залить овощи яичной смесью, убавить огонь до минимального', 
        note: 'Равномерно распределить смесь по сковороде', 
        duration: 1
      },
      { 
        number: 9, 
        text: 'Посыпать тертым сыром, накрыть крышкой', 
        note: 'Сыр должен расплавиться', 
        duration: 3
      },
      { 
        number: 10, 
        text: 'Украсить свежим базиликом перед подачей', 
        note: 'Базилик добавит аромат и свежесть', 
        duration: 1
      }
    ],
    author: 'user1@example.com',
    savedBy: [],
  },
  {
    id: '2',
    title: 'Куриный суп с домашней лапшой',
    type: 'lunch',
    image: '/images/recipes/chicken-soup.jpg',
    description: 'Наваристый домашний суп с нежным куриным мясом, ароматными овощами и домашней лапшой. Идеальное согревающее блюдо, приготовленное по традиционному рецепту с добавлением свежей зелени и специй. Насыщенный бульон и правильно приготовленные овощи делают этот суп по-настоящему полезным и вкусным.',
    totalTime: 90,
    difficulty: 3,
    ingredients: [
      { name: 'курица (целая)', amount: 1000, unit: 'гр.' },
      { name: 'морковь', amount: 200, unit: 'гр.' },
      { name: 'лук репчатый', amount: 150, unit: 'гр.' },
      { name: 'сельдерей (стебель)', amount: 100, unit: 'гр.' },
      { name: 'чеснок', amount: 3, unit: 'зубчика' },
      { name: 'мука пшеничная', amount: 200, unit: 'гр.' },
      { name: 'яйца', amount: 2, unit: 'шт.' },
      { name: 'соль', amount: 2, unit: 'ч.л.' },
      { name: 'перец черный горошком', amount: 5, unit: 'шт.' },
      { name: 'лавровый лист', amount: 2, unit: 'шт.' },
      { name: 'зелень петрушки', amount: 30, unit: 'гр.' },
      { name: 'зелень укропа', amount: 30, unit: 'гр.' },
      { name: 'масло растительное', amount: 20, unit: 'мл' },
      { name: 'вода', amount: 3000, unit: 'мл' }
    ],
    steps: [
      { 
        number: 1, 
        text: 'Подготовить курицу: помыть, удалить лишний жир, разрезать на части', 
        note: 'Оставить кожу для более наваристого бульона', 
        duration: 10 
      },
      { 
        number: 2, 
        text: 'Залить курицу холодной водой, довести до кипения на сильном огне', 
        note: 'Снять пену шумовкой для прозрачности бульона', 
        duration: 15 
      },
      { 
        number: 3, 
        text: 'Уменьшить огонь, добавить очищенную морковь и лук целиком, перец горошком, лавровый лист', 
        note: 'Цельные овощи потом можно будет легко достать', 
        duration: 5 
      },
      { 
        number: 4, 
        text: 'Варить бульон на медленном огне', 
        note: 'Бульон должен едва кипеть', 
        duration: 60 
      },
      { 
        number: 5, 
        text: 'Приготовить тесто для лапши: смешать муку с яйцами и щепоткой соли, замесить крутое тесто', 
        note: 'Тесто должно быть эластичным', 
        duration: 15 
      },
      { 
        number: 6, 
        text: 'Раскатать тесто тонким слоем, подсушить 15 минут', 
        note: 'Чем тоньше тесто, тем нежнее будет лапша', 
        duration: 20 
      },
      { 
        number: 7, 
        text: 'Нарезать тесто тонкой соломкой', 
        note: 'Присыпать мукой, чтобы не слиплась', 
        duration: 10 
      },
      { 
        number: 8, 
        text: 'Достать из бульона курицу и целые овощи', 
        note: 'Бульон процедить при необходимости', 
        duration: 5 
      },
      { 
        number: 9, 
        text: 'Нарезать свежую морковь и сельдерей соломкой, лук кубиками', 
        note: 'Нарезка должна быть равномерной', 
        duration: 10 
      },
      { 
        number: 10, 
        text: 'Обжарить нарезанные овощи с измельченным чесноком на растительном масле', 
        note: 'Овощи должны стать мягкими', 
        duration: 8 
      },
      { 
        number: 11, 
        text: 'Отделить мясо курицы от костей, нарезать средними кусочками', 
        note: 'Кожу можно удалить', 
        duration: 10 
      },
      { 
        number: 12, 
        text: 'Добавить в кипящий бульон обжаренные овощи и куриное мясо', 
        note: 'Довести до кипения', 
        duration: 5 
      },
      { 
        number: 13, 
        text: 'Всыпать домашнюю лапшу, варить до готовности', 
        note: 'Лапша готовится 5-7 минут', 
        duration: 7 
      },
      { 
        number: 14, 
        text: 'Добавить мелко нарезанную зелень, посолить по вкусу', 
        note: 'Дать настояться 5 минут', 
        duration: 5 
      }
    ],
    author: 'user2@example.com',
    savedBy: [],
  },
  {
    id: '3',
    title: 'Паста Карбонара',
    type: 'dinner',
    image: '/images/recipes/carbonara.jpg',
    description: 'Классическая итальянская паста с соусом на основе яиц, сыра пекорино романо и гуанчиале. Блюдо получается невероятно сливочным без использования сливок, а хрустящие кусочки гуанчиале добавляют особый вкус и текстуру.',
    totalTime: 30,
    difficulty: 3,
    ingredients: [
      { name: 'спагетти', amount: 350, unit: 'гр.' },
      { name: 'гуанчиале или панчетта', amount: 150, unit: 'гр.' },
      { name: 'яичные желтки', amount: 4, unit: 'шт.' },
      { name: 'яйцо целое', amount: 1, unit: 'шт.' },
      { name: 'сыр пекорино романо', amount: 100, unit: 'гр.' },
      { name: 'сыр пармезан', amount: 50, unit: 'гр.' },
      { name: 'черный перец', amount: 2, unit: 'ч.л.' },
      { name: 'соль', amount: 1, unit: 'по вкусу' }
    ],
    steps: [
      {
        number: 1,
        text: 'Нарезать гуанчиале кубиками размером примерно 1х1 см',
        note: 'Можно использовать панчетту или бекон, но вкус будет немного отличаться',
        duration: 5
      },
      {
        number: 2,
        text: 'Поставить большую кастрюлю с водой на огонь для пасты',
        note: 'Вода должна быть хорошо подсолена, как море',
        duration: 2
      },
      {
        number: 3,
        text: 'Обжарить гуанчиале на сухой сковороде до золотистой корочки',
        note: 'Жир должен вытопиться, а мясо стать хрустящим',
        duration: 7
      },
      {
        number: 4,
        text: 'Смешать в миске желтки, целое яйцо, тертый пекорино и пармезан',
        note: 'Оставить немного сыра для подачи',
        duration: 5
      },
      {
        number: 5,
        text: 'Сварить пасту в кипящей воде до состояния аль денте',
        note: 'Сохранить полстакана воды от пасты',
        duration: 8
      },
      {
        number: 6,
        text: 'Добавить горячую пасту к гуанчиале, перемешать',
        note: 'Сковорода должна быть снята с огня',
        duration: 1
      },
      {
        number: 7,
        text: 'Влить яичную смесь, быстро перемешать с пастой',
        note: 'Соус должен быть кремообразным, при необходимости добавить воду от пасты',
        duration: 2
      },
      {
        number: 8,
        text: 'Подавать сразу же, посыпав оставшимся сыром и свежемолотым перцем',
        note: 'Блюдо должно быть горячим',
        duration: 1
      }
    ],
    author: 'user1@example.com',
    savedBy: []
  },
  {
    id: '4',
    title: 'Том Ям с креветками',
    type: 'lunch',
    image: '/images/recipes/tom-yum.jpg',
    description: 'Острый и ароматный тайский суп с креветками, грибами и пикантным кокосовым молоком. Идеальный баланс кислого, острого, соленого и сладкого вкусов. Богатый бульон с характерным запахом лемонграсса и галангала согреет в любую погоду.',
    totalTime: 45,
    difficulty: 4,
    ingredients: [
      { name: 'креветки тигровые', amount: 400, unit: 'гр.' },
      { name: 'грибы шампиньоны', amount: 200, unit: 'гр.' },
      { name: 'помидоры черри', amount: 150, unit: 'гр.' },
      { name: 'лемонграсс', amount: 2, unit: 'стебля' },
      { name: 'галангал', amount: 30, unit: 'гр.' },
      { name: 'листья каффир-лайма', amount: 4, unit: 'шт.' },
      { name: 'перец чили', amount: 3, unit: 'шт.' },
      { name: 'кокосовое молоко', amount: 400, unit: 'мл' },
      { name: 'рыбный соус', amount: 3, unit: 'ст.л.' },
      { name: 'сок лайма', amount: 2, unit: 'шт.' },
      { name: 'паста том ям', amount: 2, unit: 'ст.л.' },
      { name: 'кинза', amount: 30, unit: 'гр.' },
      { name: 'зеленый лук', amount: 30, unit: 'гр.' }
    ],
    steps: [
      {
        number: 1,
        text: 'Очистить креветки, сохранив головы и панцири для бульона',
        note: 'Хвосты можно оставить для красивой подачи',
        duration: 10
      },
      {
        number: 2,
        text: 'Приготовить бульон из голов и панцирей креветок',
        note: 'Варить 15-20 минут, процедить',
        duration: 20
      },
      {
        number: 3,
        text: 'Нарезать лемонграсс, галангал, добавить листья лайма в бульон',
        note: 'Травы лучше поместить в мешочек для специй',
        duration: 5
      },
      {
        number: 4,
        text: 'Добавить пасту том ям и нарезанный чили',
        note: 'Количество чили регулируйте по вкусу',
        duration: 2
      },
      {
        number: 5,
        text: 'Добавить нарезанные грибы и помидоры',
        note: 'Помидоры можно разрезать пополам',
        duration: 5
      },
      {
        number: 6,
        text: 'Влить кокосовое молоко, довести до кипения',
        note: 'Не кипятить долго, чтобы молоко не свернулось',
        duration: 3
      },
      {
        number: 7,
        text: 'Добавить креветки, варить до готовности',
        note: 'Обычно достаточно 2-3 минут',
        duration: 3
      },
      {
        number: 8,
        text: 'Добавить рыбный соус, сок лайма, украсить зеленью',
        note: 'Подавать горячим',
        duration: 2
      }
    ],
    author: 'user2@example.com',
    savedBy: []
  },
  {
    id: '5',
    title: 'Тирамису',
    type: 'other',
    image: '/images/recipes/tiramisu.jpg',
    description: 'Классический итальянский десерт с нежным кремом из маскарпоне, пропитанными кофе печеньями савоярди и легким какао. Идеальное сочетание кофейного и сливочного вкусов создает неповторимый десерт, любимый во всем мире.',
    totalTime: 40,
    difficulty: 3,
    ingredients: [
      { name: 'сыр маскарпоне', amount: 500, unit: 'гр.' },
      { name: 'печенье савоярди', amount: 300, unit: 'гр.' },
      { name: 'яйца', amount: 4, unit: 'шт.' },
      { name: 'сахар', amount: 100, unit: 'гр.' },
      { name: 'крепкий кофе', amount: 250, unit: 'мл' },
      { name: 'какао-порошок', amount: 30, unit: 'гр.' },
      { name: 'амаретто', amount: 50, unit: 'мл' },
      { name: 'ванильный экстракт', amount: 1, unit: 'ч.л.' }
    ],
    steps: [
      {
        number: 1,
        text: 'Приготовить крепкий кофе, остудить и добавить амаретто',
        note: 'Можно использовать эспрессо или растворимый кофе',
        duration: 5
      },
      {
        number: 2,
        text: 'Отделить желтки от белков',
        note: 'Белки должны быть комнатной температуры для лучшего взбивания',
        duration: 3
      },
      {
        number: 3,
        text: 'Взбить желтки с половиной сахара до светлой пышной массы',
        note: 'Масса должна увеличиться в объеме в 2-3 раза',
        duration: 5
      },
      {
        number: 4,
        text: 'Добавить маскарпоне к желткам, аккуратно перемешать',
        note: 'Сыр должен быть комнатной температуры',
        duration: 3
      },
      {
        number: 5,
        text: 'Взбить белки с оставшимся сахаром до устойчивых пиков',
        note: 'Миска и венчики должны быть абсолютно чистыми',
        duration: 5
      },
      {
        number: 6,
        text: 'Аккуратно вмешать белки в крем из маскарпоне',
        note: 'Вмешивать частями, сохраняя воздушность',
        duration: 5
      },
      {
        number: 7,
        text: 'Окунать савоярди в кофе и выкладывать слоями с кремом',
        note: 'Печенье окунать быстро, чтобы не размокло',
        duration: 10
      },
      {
        number: 8,
        text: 'Посыпать верхний слой какао через сито',
        note: 'Охладить минимум 4 часа, лучше оставить на ночь',
        duration: 4
      }
    ],
    author: 'user1@example.com',
    savedBy: []
  },
  {
    id: '6',
    title: 'Борщ',
    type: 'lunch',
    image: '/images/recipes/borsch.jpg',
    description: 'Традиционный борщ с насыщенным вкусом, приготовленный на наваристом мясном бульоне с добавлением свеклы, капусты и других овощей. Подается со сметаной и свежей зеленью. Идеальное первое блюдо для холодного дня.',
    totalTime: 180,
    difficulty: 4,
    ingredients: [
      { name: 'говядина на кости', amount: 800, unit: 'гр.' },
      { name: 'свекла', amount: 400, unit: 'гр.' },
      { name: 'капуста', amount: 300, unit: 'гр.' },
      { name: 'картофель', amount: 400, unit: 'гр.' },
      { name: 'морковь', amount: 200, unit: 'гр.' },
      { name: 'лук репчатый', amount: 200, unit: 'гр.' },
      { name: 'томатная паста', amount: 2, unit: 'ст.л.' },
      { name: 'чеснок', amount: 4, unit: 'зубчика' },
      { name: 'уксус', amount: 1, unit: 'ст.л.' },
      { name: 'лавровый лист', amount: 2, unit: 'шт.' },
      { name: 'перец черный горошком', amount: 5, unit: 'шт.' },
      { name: 'сало', amount: 50, unit: 'гр.' },
      { name: 'зелень (укроп, петрушка)', amount: 30, unit: 'гр.' },
      { name: 'сметана', amount: 100, unit: 'гр.' }
    ],
    steps: [
      {
        number: 1,
        text: 'Сварить крепкий мясной бульон',
        note: 'Мясо должно быть на кости для наваристости',
        duration: 90
      },
      {
        number: 2,
        text: 'Натереть свеклу на крупной терке, добавить уксус и томатную пасту',
        note: 'Уксус поможет сохранить цвет свеклы',
        duration: 10
      },
      {
        number: 3,
        text: 'Нашинковать капусту, нарезать картофель брусочками',
        note: 'Картофель должен быть одинакового размера',
        duration: 15
      },
      {
        number: 4,
        text: 'Обжарить на сале морковь и лук',
        note: 'Сало придаст традиционный вкус',
        duration: 10
      },
      {
        number: 5,
        text: 'Добавить в бульон картофель, довести до кипения',
        note: 'Варить до полуготовности',
        duration: 15
      },
      {
        number: 6,
        text: 'Добавить капусту и зажарку из овощей',
        note: 'Варить на медленном огне',
        duration: 10
      },
      {
        number: 7,
        text: 'Добавить свеклу, специи и лавровый лист',
        note: 'Варить до готовности всех овощей',
        duration: 20
      },
      {
        number: 8,
        text: 'В конце добавить измельченный чеснок и зелень',
        note: 'Дать настояться 10-15 минут',
        duration: 10
      }
    ],
    author: 'user2@example.com',
    savedBy: []
  },
  {
    id: '7',
    title: 'Суши-роллы "Филадельфия"',
    type: 'dinner',
    image: '/images/recipes/philadelphia.jpg',
    description: 'Популярные суши-роллы с нежным сливочным сыром, свежим лососем и авокадо. Идеальное сочетание текстур и вкусов в каждом кусочке. Подаются с соевым соусом, васаби и маринованным имбирем.',
    totalTime: 60,
    difficulty: 4,
    ingredients: [
      { name: 'рис для суши', amount: 400, unit: 'гр.' },
      { name: 'лосось свежий', amount: 300, unit: 'гр.' },
      { name: 'сыр сливочный', amount: 200, unit: 'гр.' },
      { name: 'авокадо', amount: 1, unit: 'шт.' },
      { name: 'нори', amount: 4, unit: 'листа' },
      { name: 'рисовый уксус', amount: 50, unit: 'мл' },
      { name: 'сахар', amount: 1, unit: 'ст.л.' },
      { name: 'соль', amount: 1, unit: 'ч.л.' },
      { name: 'васаби', amount: 10, unit: 'гр.' },
      { name: 'имбирь маринованный', amount: 30, unit: 'гр.' },
      { name: 'соевый соус', amount: 100, unit: 'мл' }
    ],
    steps: [
      {
        number: 1,
        text: 'Промыть рис до прозрачной воды, замочить на 30 минут',
        note: 'Рис должен быть специальным для суши',
        duration: 30
      },
      {
        number: 2,
        text: 'Сварить рис, заправить смесью уксуса, сахара и соли',
        note: 'Рис должен остыть до комнатной температуры',
        duration: 20
      },
      {
        number: 3,
        text: 'Нарезать лосося и авокадо тонкими полосками',
        note: 'Лосось должен быть охлажденным для удобной нарезки',
        duration: 10
      },
      {
        number: 4,
        text: 'Положить нори на коврик для роллов блестящей стороной вниз',
        note: 'Бамбуковый коврик нужно обернуть пищевой пленкой',
        duration: 2
      },
      {
        number: 5,
        text: 'Равномерно распределить рис по нори, оставив полоску свободной',
        note: 'Рис слегка прижать, но не утрамбовывать',
        duration: 5
      },
      {
        number: 6,
        text: 'Перевернуть нори рисом вниз, выложить начинку',
        note: 'Сливочный сыр должен быть комнатной температуры',
        duration: 5
      },
      {
        number: 7,
        text: 'Свернуть ролл с помощью коврика, слегка прижимая',
        note: 'Край нори смочить водой для склеивания',
        duration: 3
      },
      {
        number: 8,
        text: 'Нарезать ролл на 8 равных частей острым ножом',
        note: 'Нож периодически смачивать водой',
        duration: 5
      }
    ],
    author: 'user1@example.com',
    savedBy: []
  },
  {
    id: '8',
    title: 'Шоколадный фондан',
    type: 'other',
    image: '/images/recipes/fondant.jpg',
    description: 'Изысканный французский десерт с хрустящей корочкой снаружи и жидкой шоколадной начинкой внутри. Подается горячим с шариком ванильного мороженого и свежими ягодами. Настоящее искушение для любителей шоколада.',
    totalTime: 25,
    difficulty: 4,
    ingredients: [
      { name: 'темный шоколад 70%', amount: 200, unit: 'гр.' },
      { name: 'сливочное масло', amount: 180, unit: 'гр.' },
      { name: 'яйца', amount: 4, unit: 'шт.' },
      { name: 'сахарная пудра', amount: 80, unit: 'гр.' },
      { name: 'мука пшеничная', amount: 60, unit: 'гр.' },
      { name: 'какао-порошок', amount: 20, unit: 'гр.' },
      { name: 'ванильный экстракт', amount: 1, unit: 'ч.л.' },
      { name: 'соль', amount: 1, unit: 'щепотка' }
    ],
    steps: [
      {
        number: 1,
        text: 'Растопить шоколад с маслом на водяной бане',
        note: 'Не перегревать, чтобы шоколад не стал густым',
        duration: 7
      },
      {
        number: 2,
        text: 'Взбить яйца с сахарной пудрой до пышной массы',
        note: 'Масса должна увеличиться в объеме в 2-3 раза',
        duration: 5
      },
      {
        number: 3,
        text: 'Смешать муку с какао и солью',
        note: 'Просеять для избежания комочков',
        duration: 2
      },
      {
        number: 4,
        text: 'Соединить шоколадную массу с яичной, добавить ванильный экстракт',
        note: 'Вмешивать аккуратно, сохраняя воздушность',
        duration: 3
      },
      {
        number: 5,
        text: 'Добавить мучную смесь, осторожно перемешать',
        note: 'Не перемешивать слишком долго',
        duration: 2
      },
      {
        number: 6,
        text: 'Разлить тесто по формочкам, смазанным маслом',
        note: 'Формочки предварительно охладить',
        duration: 3
      },
      {
        number: 7,
        text: 'Выпекать в разогретой до 200°C духовке',
        note: 'Точное время зависит от размера формочек',
        duration: 8
      },
      {
        number: 8,
        text: 'Подавать сразу же, перевернув на тарелку',
        note: 'Центр должен остаться жидким',
        duration: 1
      }
    ],
    author: 'user2@example.com',
    savedBy: []
  },
  {
    id: '9',
    title: 'Греческий салат',
    type: 'lunch',
    image: '/images/recipes/greek-salad.jpg',
    description: 'Классический средиземноморский салат с сочными овощами, оливками и сыром фета. Заправляется оливковым маслом и орегано. Легкое и освежающее блюдо, идеальное для жаркого дня или в качестве гарнира.',
    totalTime: 15,
    difficulty: 1,
    ingredients: [
      { name: 'помидоры', amount: 400, unit: 'гр.' },
      { name: 'огурцы', amount: 200, unit: 'гр.' },
      { name: 'перец болгарский', amount: 200, unit: 'гр.' },
      { name: 'красный лук', amount: 100, unit: 'гр.' },
      { name: 'сыр фета', amount: 200, unit: 'гр.' },
      { name: 'маслины', amount: 100, unit: 'гр.' },
      { name: 'масло оливковое', amount: 50, unit: 'мл' },
      { name: 'орегано сушеный', amount: 1, unit: 'ч.л.' },
      { name: 'соль', amount: 1, unit: 'по вкусу' },
      { name: 'перец черный', amount: 1, unit: 'по вкусу' }
    ],
    steps: [
      {
        number: 1,
        text: 'Нарезать помидоры крупными дольками',
        note: 'Помидоры должны быть плотными и спелыми',
        duration: 3
      },
      {
        number: 2,
        text: 'Нарезать огурцы крупными полукольцами',
        note: 'Если кожица горькая, огурцы можно очистить',
        duration: 2
      },
      {
        number: 3,
        text: 'Нарезать болгарский перец крупными кусочками',
        note: 'Лучше использовать разноцветные перцы',
        duration: 3
      },
      {
        number: 4,
        text: 'Нарезать красный лук тонкими полукольцами',
        note: 'Можно замариновать лук в уксусе для мягкости',
        duration: 2
      },
      {
        number: 5,
        text: 'Нарезать сыр фета крупными кубиками',
        note: 'Фету не измельчать слишком мелко',
        duration: 2
      },
      {
        number: 6,
        text: 'Соединить все ингредиенты в большой миске',
        note: 'Перемешивать аккуратно, чтобы не помять овощи',
        duration: 1
      },
      {
        number: 7,
        text: 'Заправить оливковым маслом, посыпать орегано',
        note: 'Масло должно быть качественным, extra virgin',
        duration: 1
      },
      {
        number: 8,
        text: 'Посолить, поперчить, аккуратно перемешать',
        note: 'Соль добавлять в конце из-за соленой феты',
        duration: 1
      }
    ],
    author: 'user1@example.com',
    savedBy: []
  }
];

export interface PaginatedRecipes {
  recipes: Recipe[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export const getRecipes = (type?: string, page: number = 1, perPage: number = 8): PaginatedRecipes => {
  let filteredRecipes = type 
    ? mockRecipes.filter(recipe => recipe.type === type)
    : mockRecipes;

  const total = filteredRecipes.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    recipes: filteredRecipes.slice(start, end),
    total,
    currentPage: page,
    totalPages
  };
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

export const createRecipe = (newRecipe: Omit<Recipe, 'id' | 'savedBy'>) => {
  const id = (mockRecipes.length + 1).toString();
  const recipeWithId = {
    ...newRecipe,
    id,
    savedBy: [],
  };
  mockRecipes.unshift(recipeWithId);
  console.log('Рецепт добавлен:', recipeWithId);
  return recipeWithId;
};

//  экспорт для проверки

export const getUserRecipes = (userId: string) => {
  return mockRecipes.filter(recipe => recipe.author === userId);
};

export const getUserSavedRecipes = (userId: string) => {
  return mockRecipes.filter(recipe => recipe.savedBy?.includes(userId));
};

export const toggleSavedRecipe = (userEmail: string, recipeId: string): boolean => {
  const recipe = mockRecipes.find(r => r.id === recipeId);
  if (!recipe) return false;

  if (!recipe.savedBy) {
    recipe.savedBy = [];
  }

  const savedIndex = recipe.savedBy.indexOf(userEmail);
  if (savedIndex === -1) {
    // Сохраняем рецепт
    recipe.savedBy.push(userEmail);
  } else {
    // Удаляем из сохраненных
    recipe.savedBy.splice(savedIndex, 1);
  }
  return true;
};