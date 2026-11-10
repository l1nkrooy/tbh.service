import type { Locale } from "@/types";

export interface FAQItem {
  question: string;
  answer: string;
}

const ru: FAQItem[] = [
  {
    question: "Сколько времени занимает прокачка?",
    answer:
      "Зависит от объёма заказа. Прокачка одного персонажа до 30 уровня занимает 1–3 часа, паки с несколькими персонажами и максимальным уровнем — от 8 до 24 часов. Точный срок сообщаем после оформления заказа в Discord.",
  },
  {
    question: "Безопасно ли это для моего аккаунта?",
    answer:
      "Мы работаем аккуратно: входим только под вашим контролем, не меняем пароль, email или платёжные данные, не трогаем другие игры в библиотеке. Рекомендуем включить Steam Guard через мобильное приложение и предоставить резервный код для ускорения процесса.",
  },
  {
    question: "Можно ли играть во время выполнения заказа?",
    answer:
      "Нет, на время выполнения заказа аккаунт должен быть свободен — это особенность многих онлайн-сервисов с входом в учётную запись. Среднее время блокировки аккаунта мы сообщаем заранее, исходя из объёма заказа.",
  },
  {
    question: "Есть ли риск получить бан?",
    answer:
      "Мы используем только методы, доступные обычному игроку внутри игровых механик — без читов и стороннего ПО, влияющего на честность игры на сервере. За всю практику работы случаев блокировки аккаунтов клиентов не было.",
  },
  {
    question: "Можно ли заказать несколько услуг одновременно?",
    answer:
      "Да, в конфигураторе можно добавить любое количество услуг — золото, прокачку персонажей, Куб, буст по этажам — в одну корзину, итоговая стоимость пересчитывается автоматически.",
  },
  {
    question: "Что нужно для начала прокачки?",
    answer:
      "Логин и пароль от Steam-аккаунта (не email), а также код Steam Guard или резервный 7-значный код, сгенерированный в приложении Steam Guard заранее. Это позволяет войти в аккаунт без ожидания подтверждения с вашей стороны.",
  },
  {
    question: "Как получить резервный код Steam Guard?",
    answer:
      "Резервные коды генерируются в мобильном приложении Steam в разделе Steam Guard. Подробная инструкция доступна по ссылке, которую мы присылаем при оформлении заказа в Discord.",
  },
  {
    question: "Что если у меня нет Steam Guard на телефоне?",
    answer:
      "Без Steam Guard или резервного кода вход в аккаунт будет занимать больше времени, так как потребуется ваше подтверждение на каждом шаге. Рекомендуем подключить мобильную аутентификацию заранее.",
  },
  {
    question: "Можно ли изменить состав заказа после оформления?",
    answer:
      "Да, до начала выполнения заказа состав можно изменить — напишите об этом в Discord. После начала выполнения изменения обсуждаются индивидуально.",
  },
  {
    question: "Как происходит оплата?",
    answer:
      "Оплата не принимается напрямую на сайте. После сборки заказа в конфигураторе вы переходите в Discord или на FunPay, где обсуждаются удобные способы: банковский перевод, СБП, Steam-пополнение, скины или другие варианты.",
  },
  {
    question: "Можно ли оплатить через Steam?",
    answer:
      "Да, доступна оплата через пополнение Steam-кошелька или передачу игровых предметов. Детали обсуждаются индивидуально в Discord после оформления заказа.",
  },
  {
    question: "Что делать, если что-то пошло не так во время выполнения?",
    answer:
      "Мы поддерживаем связь на каждом этапе выполнения заказа. Если возникает нештатная ситуация, мы немедленно сообщаем об этом и предлагаем решение — паузу, корректировку или возврат части оплаты согласно пользовательскому соглашению.",
  },
  {
    question: "Сколько стоит прокачка персонажа до максимального уровня?",
    answer:
      "Стоимость рассчитывается индивидуально в конфигураторе и зависит от текущего и целевого уровня, класса персонажа и количества выбранных персонажей. Чем больше персонажей прокачивается одновременно, тем выгоднее цена за каждого.",
  },
  {
    question: "В чём разница между паками и услугами по отдельности?",
    answer:
      "Готовые паки рассчитаны так, чтобы быть выгоднее покупки тех же компонентов отдельно. Если ваш набор потребностей не совпадает с готовым паком, выгоднее собрать заказ в конфигураторе вручную.",
  },
  {
    question: "Можно ли прокачать только DLC-персонажей?",
    answer:
      "Да, Hunter и Slayer доступны для прокачки на странице услуги «Прокачка персонажей», если у вас уже куплены соответствующие DLC в Steam. Без DLC эти классы недоступны.",
  },
  {
    question: "Что входит в прокачку Куба?",
    answer:
      "Услуга поднимает уровень синтеза Куба до выбранного значения от 1 до 100, что открывает доступ к более высоким грейдам предметов через синтез.",
  },
  {
    question: "Как работает буст по этажам?",
    answer:
      "Вы выбираем сложность (Normal, Nightmare, Hell, Torment) и конечный этаж, до которого нужно дойти. Стоимость зависит от количества этажей и множителя выбранной сложности — чем выше сложность, тем дороже этаж.",
  },
  {
    question: "Что такое «Прокачка дерева за моё золото/опыт»?",
    answer:
      "Это услуга для тех, кто уже купил пак или золото, но не хочет тратить время на ручную прокачку дерева талантов или персонажей. Мы используем исключительно то золото и опыт, что уже есть на аккаунте — без искусственной накрутки.",
  },
  {
    question: "Гарантируете ли вы результат?",
    answer:
      "Да, мы гарантируем выполнение заказа в заявленном объёме. Если по объективным причинам услуга не может быть выполнена полностью, мы возвращаем разницу или предлагаем альтернативу, как указано в пользовательском соглашении.",
  },
  {
    question: "Можно ли заказать прокачку для нескольких аккаунтов?",
    answer:
      "Да, для этого оформляются отдельные заказы на каждый аккаунт — напишите об этом в Discord, мы поможем рассчитать совокупную стоимость и порядок выполнения.",
  },
  {
    question: "Как быстро вы отвечаете в Discord?",
    answer:
      "Среднее время ответа — до 15 минут в активные часы. В случае повышенной нагрузки мы предупреждаем об ожидаемой задержке.",
  },
  {
    question: "Что делать, если у меня нет Discord или FunPay?",
    answer:
      "Discord можно создать бесплатно за пару минут на discord.com. FunPay требует регистрации через email или соцсети. Мы рекомендуем Discord как основной и самый быстрый способ связи.",
  },
];

const en: FAQItem[] = [
  {
    question: "How long does leveling take?",
    answer:
      "It depends on the order size. Leveling a single character to level 30 takes 1–3 hours; packs with multiple characters at maximum level take 8 to 24 hours. We confirm the exact timeframe after the order is placed on Discord.",
  },
  {
    question: "Is this safe for my account?",
    answer:
      "We work carefully: we never change your password, email, or payment details, and we don't touch other games in your library. We recommend enabling Steam Guard Mobile Authenticator and providing a backup code to speed things up.",
  },
  {
    question: "Can I play while my order is being completed?",
    answer:
      "No, the account needs to be free for the duration of the order — this is standard for any account-access service. We let you know the expected account downtime in advance, based on order size.",
  },
  {
    question: "Is there a risk of getting banned?",
    answer:
      "We only use methods available to a regular player within the game's normal mechanics — no cheats or third-party software that affects server-side fairness. We have had no account bans across our entire client history.",
  },
  {
    question: "Can I order several services at once?",
    answer:
      "Yes, the configurator lets you add any number of services — gold, character leveling, the Cube, floor boosts — to a single cart, and the total is recalculated automatically.",
  },
  {
    question: "What do you need to start leveling?",
    answer:
      "Your Steam login and password (not an email), plus a Steam Guard code or a backup 7-character code generated in advance through the Steam Guard mobile app. This lets us log in without waiting for your confirmation each time.",
  },
  {
    question: "How do I get a Steam Guard backup code?",
    answer:
      "Backup codes are generated in the Steam mobile app under Steam Guard. A detailed guide is sent to you on Discord once your order is placed.",
  },
  {
    question: "What if I don't have Steam Guard on my phone?",
    answer:
      "Without Steam Guard or a backup code, logging in takes longer, since each step needs your confirmation. We recommend setting up mobile authentication in advance.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "Yes, before work begins you can adjust the order — just message us on Discord. Once work has started, changes are discussed case by case.",
  },
  {
    question: "How does payment work?",
    answer:
      "Payment isn't taken directly on the site. After building your order in the configurator, you move to Discord or FunPay, where convenient methods are discussed: bank transfer, SBP, Steam top-up, in-game items, or other options.",
  },
  {
    question: "Can I pay through Steam?",
    answer:
      "Yes, paying through a Steam Wallet top-up or trading items is supported. Details are arranged individually on Discord after the order is placed.",
  },
  {
    question: "What happens if something goes wrong during the order?",
    answer:
      "We stay in touch throughout every stage of the order. If something unexpected happens, we let you know immediately and offer a solution — a pause, an adjustment, or a partial refund per the Terms of Service.",
  },
  {
    question: "How much does maxing out a character cost?",
    answer:
      "The price is calculated individually in the configurator based on the current and target level, the character's class, and how many characters are leveled together. Leveling more characters at once lowers the price per character.",
  },
  {
    question: "What's the difference between packs and individual services?",
    answer:
      "Ready-made packs are priced to be cheaper than buying the same components separately. If your needs don't match a pack exactly, building a custom order in the configurator is usually the better value.",
  },
  {
    question: "Can I level only DLC characters?",
    answer:
      "Yes, Hunter and Slayer can be leveled on the Character Leveling page if you already own the corresponding DLC on Steam. Without the DLC, these classes aren't available.",
  },
  {
    question: "What does Cube leveling include?",
    answer:
      "This service raises your Cube's synthesis level to a chosen value from 1 to 100, unlocking access to higher item grades through synthesis.",
  },
  {
    question: "How does the floor boost work?",
    answer:
      "You pick a difficulty (Normal, Nightmare, Hell, Torment) and the final floor to reach. The price depends on the number of floors and the chosen difficulty's multiplier — higher difficulties cost more per floor.",
  },
  {
    question: "What is the \"Level my tree with my own gold/XP\" service?",
    answer:
      "This is for players who already bought a pack or gold but don't want to spend time manually leveling the talent or character tree. We only use the gold and XP already on your account — no artificial top-ups.",
  },
  {
    question: "Do you guarantee the result?",
    answer:
      "Yes, we guarantee the order is completed as described. If for objective reasons a service can't be fully delivered, we refund the difference or offer an alternative, as outlined in the Terms of Service.",
  },
  {
    question: "Can I order leveling for multiple accounts?",
    answer:
      "Yes, a separate order is placed for each account — let us know on Discord and we'll help calculate the combined cost and schedule.",
  },
  {
    question: "How fast do you respond on Discord?",
    answer:
      "Average response time is under 15 minutes during active hours. During high load, we let you know about any expected delay.",
  },
  {
    question: "What if I don't have Discord or FunPay?",
    answer:
      "Discord can be created for free in a couple of minutes at discord.com. FunPay requires registration via email or social login. We recommend Discord as the primary and fastest way to reach us.",
  },
];

export function getFAQ(locale: Locale): FAQItem[] {
  return locale === "ru" ? ru : en;
}
