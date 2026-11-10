/**
 * ============================================================================
 * СЛОВАРИ ПЕРЕВОДОВ
 * ============================================================================
 * Структура объекта RU полностью отражает структуру EN — типобезопасность
 * обеспечивается через `satisfies Dict` для en.
 * Файл большой по объёму контента (полноценный сайт), разбит на секции
 * комментариями для навигации.
 */

const ru = {
  meta: {
    siteName: "Hero Service",
    tagline: "Профессиональный сервис прокачки для Task Bar Hero",
  },

  nav: {
    home: "Главная",
    services: "Услуги",
    packs: "Паки",
    characters: "Прокачка персонажей",
    gold: "Золото",
    cube: "Прокачка Куба",
    boost: "Буст",
    reviews: "Отзывы",
    faq: "FAQ",
    terms: "Соглашение",
    contacts: "Контакты",
    cart: "Корзина",
  },

  hero: {
    eyebrow: "Независимый сервис прокачки",
    title: "Прокачка для Task Bar Hero",
    titleAccent: "без потери времени",
    subtitle:
      "Прокачиваем персонажей, Куб и золото в Task Bar Hero. Прозрачные цены, контроль на каждом этапе и аккуратная работа с аккаунтом.",
    ctaPrimary: "Выбрать услуги",
    ctaDiscord: "Discord",
    ctaFunpay: "FunPay",
    scrollHint: "Прокрутите вниз",
  },

  home: {
    servicesTitle: "Что мы делаем",
    servicesSubtitle:
      "Каждая услуга настраивается отдельно — вы платите только за то, что нужно",
    packsTitle: "Популярные паки",
    packsSubtitle: "Готовые комплекты прокачки с заметной выгодой",
    statsTitle: "Сервис в цифрах",
    ctaSectionTitle: "Готовы начать?",
    ctaSectionSubtitle:
      "Соберите услугу в конфигураторе или выберите готовый пак",
    ctaSectionButton: "Перейти к услугам",
    viewAllPacks: "Все паки",
    learnMore: "Подробнее",
  },

  services: {
    packs: {
      title: "Паки услуг",
      description: "Комплексная прокачка с максимальной выгодой",
    },
    gold: {
      title: "Золото",
      description: "Любая сумма золота на ваш аккаунт",
    },
    characters: {
      title: "Прокачка персонажей",
      description: "Уровень от 1 до 101 для любого класса",
    },
    cube: {
      title: "Прокачка Куба",
      description: "Уровень Куба от 1 до 100",
    },
    boost: {
      title: "Буст по этажам",
      description: "Прохождение от Normal до Torment",
    },
    pets: {
      title: "DLC питомцы",
      description: "Разблокировка всех питомцев из дополнений",
    },
    talentTree: {
      title: "Дерево талантов",
      description: "Прокачаем дерево талантов за ваше золото",
    },
    charTree: {
      title: "Дерево персонажей",
      description: "Прокачаем дерево персонажей за ваш опыт",
    },
  },

  common: {
    from: "от",
    level: "Уровень",
    selectAction: "Выбрать",
    addToCart: "Добавить в корзину",
    added: "Добавлено",
    price: "Цена",
    total: "Итого",
    next: "Далее",
    back: "Назад",
    close: "Закрыть",
    loading: "Загрузка",
    optional: "опционально",
    characters: "персонажей",
    minutes: "мин",
    hours: "ч",
    days: "дн",
    readMore: "Подробнее",
    readLess: "Свернуть",
  },

  charactersPage: {
    title: "Прокачка персонажей",
    subtitle: "Выберите от 1 до 5 персонажей и уровень для каждого",
    selectClass: "Выберите класс",
    dlcBadge: "DLC",
    dlcNotice: "Требуется DLC в Steam",
    levelLabel: "Уровень",
    skillPointsLabel: "Разблокировать дополнительные очки навыков",
    skillPointsShort: "очки навыков",
    maxSelected: "Выбрано максимум персонажей (5)",
    selectedCount: "Выбрано",
    pricePerCharacter: "Стоимость",
    addAllToCart: "Добавить выбранных в корзину",
    classNames: {
      knight: "Knight",
      priest: "Priest",
      sorcerer: "Sorcerer",
      ranger: "Ranger",
      hunter: "Hunter",
      slayer: "Slayer",
    },
    classRoles: {
      tank: "Танк",
      support: "Поддержка",
      mage: "Маг",
      archer: "Стрелок",
      berserker: "Берсерк",
      assassin: "Ассасин",
    },
  },

  cubePage: {
    title: "Прокачка Куба",
    subtitle: "Выберите целевой уровень синтеза Куба от 1 до 100",
    currentLevel: "Целевой уровень",
    maxLevel: "Максимум",
  },

  boostPage: {
    title: "Буст по этажам",
    subtitle: "Выберите сложность и этаж, до которого нужно пройти",
    difficulty: "Сложность",
    act: "Акт",
    stage: "Этаж",
    boss: "Босс",
    normal: "Normal",
    nightmare: "Nightmare",
    hell: "Hell",
    torment: "Torment",
    progressLabel: "Прогресс прохождения",
    hasProgressTitle: "У меня уже есть прогресс",
    hasProgressHint:
      "Укажите текущую точку — оплатите только оставшийся путь, а не прохождение с нуля",
    currentProgressLabel: "Текущий прогресс",
    targetProgressLabel: "Куда нужно дойти",
    invalidRangeError:
      "Целевая точка должна быть дальше текущего прогресса по игре",
  },

  petsPage: {
    title: "DLC питомцы",
    subtitle: "Разблокировка всех питомцев из дополнений одним заказом",
    included: "Что входит",
    feature1: "Все питомцы из всех вышедших DLC",
    feature2: "Аккуратная активация без затрагивания других данных",
    feature3: "Подтверждение скриншотом после выполнения",
  },

  packsPage: {
    title: "Паки услуг",
    subtitle: "Главное преимущество — выгода по сравнению с покупкой отдельно",
    includesTitle: "Что входит",
    optionalTitle: "Дополнительно (опционально)",
    compareTitle: "Сравнение стоимости",
    compareIndividual: "По отдельности",
    comparePack: "В паке",
    youSave: "Вы экономите",
    selectPack: "Выбрать пак",
    mostPopular: "Популярный выбор",
    bestValue: "Максимум выгоды",
    names: {
      "pack-1": "Старт пак",
      "pack-2": "Плюс пак",
      "pack-3": "Про пак",
    },
  },

  goldPage: {
    title: "Золото",
    subtitle: "Выберите сумму или укажите своё значение",
    customAmount: "Своя сумма",
    perUnit: "за единицу",
    customAmountLimits: "От {min} до {max} за один заказ",
    minAmountError: "Минимальная сумма заказа — {min}",
    maxAmountError: "Максимальная сумма заказа — {max}",
  },

  extraServicesPage: {
    title: "Дополнительные услуги",
    subtitle: "Для тех, кто не хочет тратить время на ручную прокачку",
    talentTreeTitle: "Дерево талантов",
    talentTreeDescription:
      "Прокачаем дерево талантов, используя золото на вашем аккаунте. Без накрутки золота — расходуется только то, что у вас есть.",
    talentTreeGoldLabel: "Сколько золота использовать",
    charTreeTitle: "Дерево персонажей",
    charTreeDescription:
      "Прокачаем дерево персонажей, используя накопленный опыт. Без накрутки опыта.",
    charTreeCountLabel: "Количество персонажей",
  },

  configurator: {
    summaryTitle: "Ваш заказ",
    emptyCart: "Корзина пуста",
    emptyCartHint: "Добавьте услугу, чтобы увидеть итог здесь",
    removeItem: "Удалить",
    proceedToCheckout: "Оформить заказ",
    itemsCount: "позиций",
  },

  cartItems: {
    pack: "Пак",
    gold: "Золото",
    characters: "Прокачка персонажей",
    cube: "Прокачка Куба",
    boost: "Буст",
    pets: "DLC питомцы",
    talentTree: "Дерево талантов",
    charTree: "Дерево персонажей",
  },

  checkout: {
    title: "Оформление заказа",
    subtitle: "Проверьте состав заказа и выберите способ связи",
    orderNumber: "Номер заказа",
    yourOrder: "Состав заказа",
    totalLabel: "Итоговая стоимость",
    downloadImage: "Скачать заказ",
    downloadImageHint: "PNG-картинка заказа для отправки в Discord",
    openDiscord: "Оформить через Discord",
    openFunpay: "Оформить через FunPay",
    openDonationAlerts: "Оформить через DonationAlerts",
    altPaymentNotice:
      "Также возможна оплата через Steam Пополнение, Steam предметы, СБП или другими удобными способами по предварительной договорённости в Discord.",
    copiedToClipboard: "Текст заказа скопирован в буфер обмена",
    contactNoteLabel: "Комментарий к заказу (необязательно)",
    contactNotePlaceholder: "Например: удобное время для связи",
    submitting: "Оформляем заказ…",
    emptyCartRedirect: "Корзина пуста — добавьте услуги перед оформлением",
    backToServices: "Вернуться к услугам",
    orderCreated: "Заказ оформлен",
    orderCreatedHint: "Перейдите в Discord или FunPay, чтобы завершить оплату",
  },

  reviews: {
    title: "Отзывы",
    subtitle: "Что говорят клиенты о работе сервиса",
    ratingLabel: "Оценка",
    leaveReview: "Оставить отзыв",
    formName: "Ваше имя",
    formService: "Какая услуга",
    formText: "Текст отзыва",
    formSubmit: "Отправить отзыв",
    formSubmitted: "Спасибо! Отзыв отправлен на модерацию",
    noReviewsYet: "Пока нет отзывов — будьте первым",
  },

  faqPage: {
    title: "Частые вопросы",
    subtitle: "Если не нашли ответ — напишите нам в Discord",
  },

  termsPage: {
    title: "Пользовательское соглашение",
    lastUpdated: "Последнее обновление",
  },

  contactsPage: {
    title: "Контакты",
    subtitle: "Свяжитесь с нами любым удобным способом",
    discordLabel: "Discord-сервер",
    discordHint: "Основной канал связи и оформления заказов",
    funpayLabel: "FunPay",
    funpayHint: "Альтернативный способ оформления и оплаты",
    donationalertsLabel: "DonationAlerts",
    donationalertsHint: "Быстрая оплата картой без посредников",
    responseTime: "Среднее время ответа",
    responseTimeValue: "до 15 минут",
  },

  footer: {
    description:
      "Независимый сервис прокачки для Task Bar Hero. Не является официальным продуктом разработчиков игры.",
    navTitle: "Навигация",
    legalTitle: "Информация",
    socialTitle: "Связь",
    rights: "Все права защищены",
    disclaimer:
      "Task Bar Hero является торговой маркой соответствующих правообладателей. Сервис не аффилирован с разработчиком или издателем игры.",
  },
} as const;

type DeepString<T> = T extends string
  ? string
  : { [K in keyof T]: DeepString<T[K]> };

export type Dict = DeepString<typeof ru>;

const en = {
  meta: {
    siteName: "Hero Service",
    tagline: "Professional power-leveling service for Task Bar Hero",
  },

  nav: {
    home: "Home",
    services: "Services",
    packs: "Packs",
    characters: "Character Leveling",
    gold: "Gold",
    cube: "Cube Leveling",
    boost: "Boost",
    reviews: "Reviews",
    faq: "FAQ",
    terms: "Terms",
    contacts: "Contacts",
    cart: "Cart",
  },

  hero: {
    eyebrow: "Independent power-leveling service",
    title: "Task Bar Hero leveling",
    titleAccent: "without wasting your time",
    subtitle:
      "We level up characters, the Cube and gold in Task Bar Hero. Transparent pricing, full visibility at every stage, and careful account handling.",
    ctaPrimary: "Choose services",
    ctaDiscord: "Discord",
    ctaFunpay: "FunPay",
    scrollHint: "Scroll down",
  },

  home: {
    servicesTitle: "What we do",
    servicesSubtitle: "Every service is configured individually — pay only for what you need",
    packsTitle: "Popular packs",
    packsSubtitle: "Ready-made leveling bundles with significant savings",
    statsTitle: "Service in numbers",
    ctaSectionTitle: "Ready to start?",
    ctaSectionSubtitle: "Build your service in the configurator or pick a ready-made pack",
    ctaSectionButton: "Browse services",
    viewAllPacks: "All packs",
    learnMore: "Learn more",
  },

  services: {
    packs: {
      title: "Service packs",
      description: "Complete leveling bundles at maximum value",
    },
    gold: {
      title: "Gold",
      description: "Any amount of gold delivered to your account",
    },
    characters: {
      title: "Character leveling",
      description: "Level 1 to 101 for any class",
    },
    cube: {
      title: "Cube leveling",
      description: "Cube level 1 to 100",
    },
    boost: {
      title: "Floor boost",
      description: "Clear progress from Normal to Torment",
    },
    pets: {
      title: "DLC pets",
      description: "Unlock all pets from the DLC packs",
    },
    talentTree: {
      title: "Talent tree",
      description: "We level your talent tree using your own gold",
    },
    charTree: {
      title: "Character tree",
      description: "We level your character tree using your own XP",
    },
  },

  common: {
    from: "from",
    level: "Level",
    selectAction: "Select",
    addToCart: "Add to cart",
    added: "Added",
    price: "Price",
    total: "Total",
    next: "Next",
    back: "Back",
    close: "Close",
    loading: "Loading",
    optional: "optional",
    characters: "characters",
    minutes: "min",
    hours: "h",
    days: "d",
    readMore: "Read more",
    readLess: "Show less",
  },

  charactersPage: {
    title: "Character leveling",
    subtitle: "Choose 1 to 5 characters and a level for each",
    selectClass: "Choose a class",
    dlcBadge: "DLC",
    dlcNotice: "Requires DLC on Steam",
    levelLabel: "Level",
    skillPointsLabel: "Unlock bonus skill points",
    skillPointsShort: "skill points",
    maxSelected: "Maximum characters selected (5)",
    selectedCount: "Selected",
    pricePerCharacter: "Price",
    addAllToCart: "Add selected to cart",
    classNames: {
      knight: "Knight",
      priest: "Priest",
      sorcerer: "Sorcerer",
      ranger: "Ranger",
      hunter: "Hunter",
      slayer: "Slayer",
    },
    classRoles: {
      tank: "Tank",
      support: "Support",
      mage: "Mage",
      archer: "Archer",
      berserker: "Berserker",
      assassin: "Assassin",
    },
  },

  cubePage: {
    title: "Cube leveling",
    subtitle: "Choose a target Cube synthesis level from 1 to 100",
    currentLevel: "Target level",
    maxLevel: "Maximum",
  },

  boostPage: {
    title: "Floor boost",
    subtitle: "Choose the difficulty and the floor to clear up to",
    difficulty: "Difficulty",
    act: "Act",
    stage: "Stage",
    boss: "Boss",
    normal: "Normal",
    nightmare: "Nightmare",
    hell: "Hell",
    torment: "Torment",
    progressLabel: "Clear progress",
    hasProgressTitle: "I already have progress",
    hasProgressHint:
      "Set your current point — pay only for the remaining path, not a full clear from scratch",
    currentProgressLabel: "Current progress",
    targetProgressLabel: "Where you need to reach",
    invalidRangeError:
      "The target point must be further than your current in-game progress",
  },

  petsPage: {
    title: "DLC pets",
    subtitle: "Unlock every pet from the DLC packs in a single order",
    included: "What's included",
    feature1: "All pets from every released DLC",
    feature2: "Careful activation without touching other account data",
    feature3: "Screenshot confirmation once completed",
  },

  packsPage: {
    title: "Service packs",
    subtitle: "The main advantage is the savings versus buying separately",
    includesTitle: "What's included",
    optionalTitle: "Add-on (optional)",
    compareTitle: "Price comparison",
    compareIndividual: "Bought separately",
    comparePack: "In the pack",
    youSave: "You save",
    selectPack: "Choose this pack",
    mostPopular: "Most popular",
    bestValue: "Best value",
    names: {
      "pack-1": "Starter pack",
      "pack-2": "Plus pack",
      "pack-3": "Pro pack",
    },
  },

  goldPage: {
    title: "Gold",
    subtitle: "Pick an amount or enter a custom value",
    customAmount: "Custom amount",
    perUnit: "per unit",
    customAmountLimits: "From {min} to {max} per order",
    minAmountError: "Minimum order amount is {min}",
    maxAmountError: "Maximum order amount is {max}",
  },

  extraServicesPage: {
    title: "Additional services",
    subtitle: "For players who don't want to spend time on manual grinding",
    talentTreeTitle: "Talent tree",
    talentTreeDescription:
      "We level your talent tree using the gold already on your account. No gold top-ups — only what you already have is spent.",
    talentTreeGoldLabel: "How much gold to use",
    charTreeTitle: "Character tree",
    charTreeDescription:
      "We level your character tree using your accumulated XP. No XP top-ups.",
    charTreeCountLabel: "Number of characters",
  },

  configurator: {
    summaryTitle: "Your order",
    emptyCart: "Your cart is empty",
    emptyCartHint: "Add a service to see the summary here",
    removeItem: "Remove",
    proceedToCheckout: "Proceed to checkout",
    itemsCount: "items",
  },

  cartItems: {
    pack: "Pack",
    gold: "Gold",
    characters: "Character leveling",
    cube: "Cube leveling",
    boost: "Boost",
    pets: "DLC pets",
    talentTree: "Talent tree",
    charTree: "Character tree",
  },

  checkout: {
    title: "Checkout",
    subtitle: "Review your order and choose a contact method",
    orderNumber: "Order number",
    yourOrder: "Order summary",
    totalLabel: "Total price",
    downloadImage: "Download order",
    downloadImageHint: "A PNG image of your order to send on Discord",
    openDiscord: "Checkout via Discord",
    openFunpay: "Checkout via FunPay",
    openDonationAlerts: "Checkout via DonationAlerts",
    altPaymentNotice:
      "Payment via Steam top-up, Steam items, SBP, or other convenient methods can also be arranged in advance on Discord.",
    copiedToClipboard: "Order text copied to clipboard",
    contactNoteLabel: "Order note (optional)",
    contactNotePlaceholder: "E.g. a convenient time to reach you",
    submitting: "Placing your order…",
    emptyCartRedirect: "Your cart is empty — add services before checking out",
    backToServices: "Back to services",
    orderCreated: "Order placed",
    orderCreatedHint: "Head to Discord or FunPay to complete the payment",
  },

  reviews: {
    title: "Reviews",
    subtitle: "What clients say about the service",
    ratingLabel: "Rating",
    leaveReview: "Leave a review",
    formName: "Your name",
    formService: "Which service",
    formText: "Review text",
    formSubmit: "Submit review",
    formSubmitted: "Thank you! Your review is pending moderation",
    noReviewsYet: "No reviews yet — be the first",
  },

  faqPage: {
    title: "Frequently asked questions",
    subtitle: "Can't find an answer? Message us on Discord",
  },

  termsPage: {
    title: "Terms of Service",
    lastUpdated: "Last updated",
  },

  contactsPage: {
    title: "Contacts",
    subtitle: "Reach us through whichever channel is convenient",
    discordLabel: "Discord server",
    discordHint: "Main channel for support and orders",
    funpayLabel: "FunPay",
    funpayHint: "Alternative way to order and pay",
    donationalertsLabel: "DonationAlerts",
    donationalertsHint: "Fast card payment with no middleman",
    responseTime: "Average response time",
    responseTimeValue: "under 15 minutes",
  },

  footer: {
    description:
      "An independent power-leveling service for Task Bar Hero. Not an official product of the game's developers.",
    navTitle: "Navigation",
    legalTitle: "Information",
    socialTitle: "Contact",
    rights: "All rights reserved",
    disclaimer:
      "Task Bar Hero is a trademark of its respective owners. This service is not affiliated with the game's developer or publisher.",
  },
} satisfies Dict;

export const dictionaries = { ru, en };
