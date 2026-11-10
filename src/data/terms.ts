import type { Locale } from "@/types";

export interface TermsSection {
  title: string;
  paragraphs: string[];
}

const ru: TermsSection[] = [
  {
    title: "1. Общие положения и описание услуги",
    paragraphs: [
      "Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между владельцем сервиса Hero Service (далее — «Исполнитель») и любым лицом, оформляющим заказ через сайт, Discord-сервер или платформу FunPay (далее — «Клиент»).",
      "Исполнитель предоставляет услуги по прокачке игровых персонажей, накоплению игровой валюты, повышению уровня внутриигровых предметов и прохождению уровней в видеоигре Task Bar Hero путём временного доступа к учётной записи Клиента в сервисе Steam, предоставляемого Клиентом добровольно.",
      "Услуги являются цифровыми и не предполагают передачи материальных товаров. Результатом оказания услуги является изменение состояния игрового аккаунта Клиента в соответствии с выбранной конфигурацией заказа.",
      "Оформление заказа любым способом (через конфигуратор на сайте, сообщение в Discord или сделку на FunPay) означает безусловное согласие Клиента с условиями настоящего Соглашения.",
    ],
  },
  {
    title: "2. Обязанности Клиента",
    paragraphs: [
      "Клиент обязан предоставить достоверные данные для входа в учётную запись Steam: логин и пароль. Использование адреса электронной почты вместо логина не допускается, поскольку это лишает Исполнителя возможности войти в аккаунт.",
      "Клиент обязан предоставить код двухфакторной аутентификации Steam Guard либо заранее сгенерированный резервный 7-значный код, чтобы обеспечить своевременный вход в аккаунт без задержек, связанных с ожиданием подтверждения.",
      "На время выполнения заказа Клиент обязуется не входить в свою учётную запись Steam и не изменять пароль, email, привязанный номер телефона или настройки Steam Guard, если иное не согласовано отдельно с Исполнителем.",
      "Клиент обязан сообщить Исполнителю о любых особенностях аккаунта, которые могут повлиять на выполнение заказа: ограничения семейного доступа, региональные блокировки, активные торговые ограничения (trade hold) и аналогичные факторы.",
      "Клиент несёт ответственность за достоверность предоставленных данных. Исполнитель не несёт ответственности за невозможность выполнения заказа из-за предоставления неверных данных для входа.",
    ],
  },
  {
    title: "3. Обязанности Исполнителя",
    paragraphs: [
      "Исполнитель обязуется выполнить заказ в объёме, согласованном при оформлении, и в указанные сроки, за исключением случаев форс-мажора или обстоятельств, не зависящих от Исполнителя.",
      "Исполнитель обязуется не изменять пароль учётной записи Клиента, привязанный email, платёжные данные, а также не совершать покупки, переводы средств или иные финансовые операции от имени Клиента без отдельного согласия.",
      "Исполнитель обязуется не использовать стороннее программное обеспечение, нарушающее правила использования сервиса Steam или издателя игры таким образом, который может привести к перманентной блокировке учётной записи Клиента.",
      "Исполнитель обязуется поддерживать связь с Клиентом на протяжении выполнения заказа и своевременно сообщать о любых изменениях статуса или возникших затруднениях.",
      "По завершении заказа Исполнитель предоставляет подтверждение выполнения в виде скриншотов или иного формата, согласованного с Клиентом.",
    ],
  },
  {
    title: "4. Доступ к учётной записи",
    paragraphs: [
      "Предоставление данных для входа в учётную запись Steam является добровольным действием Клиента, совершаемым исключительно в целях получения заказанной услуги.",
      "Исполнитель использует полученный доступ исключительно в рамках согласованной конфигурации заказа и обязуется не совершать каких-либо действий, выходящих за рамки оформленного заказа.",
      "После завершения выполнения заказа Исполнитель не сохраняет данные для входа в учётную запись Клиента и рекомендует Клиенту сменить пароль учётной записи после получения услуги в целях дополнительной безопасности.",
    ],
  },
  {
    title: "5. Стоимость и порядок оплаты",
    paragraphs: [
      "Стоимость услуг определяется при помощи калькулятора на сайте и фиксируется в момент формирования заказа. Сайт не осуществляет приём платежей напрямую — оплата производится через Discord или платформу FunPay по согласованию сторон.",
      "Способ оплаты (банковский перевод, система быстрых платежей, пополнение Steam-кошелька, передача внутриигровых предметов или иной способ) определяется по договорённости между Клиентом и Исполнителем после оформления заказа.",
      "Стоимость заказа может быть скорректирована, если после оформления заказа выясняются дополнительные обстоятельства, существенно влияющие на объём или сложность работы (например, несоответствие фактического состояния аккаунта заявленному).",
    ],
  },
  {
    title: "6. Политика возврата",
    paragraphs: [
      "Если заказ не может быть выполнен по вине Исполнителя (включая технические затруднения на стороне Исполнителя), Клиенту возвращается полная сумма оплаты за невыполненную часть заказа.",
      "Если заказ не может быть выполнен по причинам, связанным с предоставленными Клиентом данными (неверные данные для входа, активные ограничения аккаунта, скрытые от Исполнителя на момент оформления заказа), возврат рассматривается индивидуально.",
      "Возврат за частично выполненный заказ производится пропорционально невыполненному объёму работы, если иное не согласовано сторонами отдельно.",
      "Возврат не производится, если услуга была выполнена в полном согласованном объёме, но Клиент впоследствии передумал, при условии, что результат соответствует описанию заказа.",
    ],
  },
  {
    title: "7. Цифровой характер услуги",
    paragraphs: [
      "Услуга является нематериальной (цифровой) и не подразумевает создание физического товара. В соответствии с общими принципами законодательства о защите прав потребителей в отношении цифровых услуг, факт надлежащего оказания услуги фиксируется подтверждением результата (скриншот, видеозапись или иной согласованный формат).",
      "Поскольку результат услуги — это изменение состояния данных в игре третьей стороны (издателя игры), Исполнитель не несёт ответственности за последующие изменения баланса, механик или политик издателя, влияющие на результат оказанной услуги после её завершения.",
    ],
  },
  {
    title: "8. Ответственность сторон",
    paragraphs: [
      "Исполнитель не несёт ответственности за блокировку, ограничение или иные меры в отношении учётной записи Клиента, примененные издателем игры или платформой Steam по причинам, не связанным с действиями Исполнителя.",
      "Исполнитель не несёт ответственности за технические сбои на стороне Steam, издателя игры или интернет-провайдеров, повлиявшие на сроки или возможность выполнения заказа.",
      "Клиент несёт ответственность за последствия предоставления заведомо недостоверных данных или умышленного сокрытия информации, влияющей на выполнение заказа.",
      "Совокупная ответственность Исполнителя по любому заказу ограничена суммой, фактически оплаченной Клиентом за этот заказ.",
    ],
  },
  {
    title: "9. Конфиденциальность и обработка данных",
    paragraphs: [
      "Исполнитель обязуется не передавать третьим лицам данные для входа в учётную запись Клиента, контактные данные и иную информацию, полученную в рамках оформления и выполнения заказа, за исключением случаев, предусмотренных законодательством.",
      "Данные для входа в учётную запись Steam используются исключительно для выполнения заказа и не сохраняются после его завершения.",
      "Информация о заказе (состав услуг, стоимость, статус) может храниться в базе данных Исполнителя в целях ведения истории заказов, статистики и разрешения возможных спорных ситуаций.",
      "Клиент вправе запросить удаление своих данных из базы Исполнителя после завершения заказа, направив соответствующий запрос через Discord.",
    ],
  },
  {
    title: "10. Форс-мажор",
    paragraphs: [
      "Стороны освобождаются от ответственности за полное или частичное неисполнение обязательств, если это явилось следствием обстоятельств непреодолимой силы: технических сбоев на серверах Steam или издателя игры, действий органов государственной власти, аварийных ситуаций, существенно затрудняющих доступ к интернету, и иных обстоятельств, не зависящих от воли сторон.",
      "При возникновении обстоятельств форс-мажора срок выполнения заказа продлевается на время действия таких обстоятельств без начисления каких-либо санкций.",
    ],
  },
  {
    title: "11. Отказ от ответственности",
    paragraphs: [
      "Сервис не является официальным продуктом разработчика или издателя игры Task Bar Hero и не аффилирован с правообладателями игры. Все названия, персонажи и торговые марки, упомянутые на сайте, принадлежат соответствующим правообладателям и используются исключительно в описательных целях.",
      "Исполнитель не гарантирует, что использование услуги соответствует пользовательскому соглашению издателя игры в каждой конкретной юрисдикции, и рекомендует Клиенту самостоятельно ознакомиться с условиями использования игры перед оформлением заказа.",
    ],
  },
  {
    title: "12. Отмена заказа",
    paragraphs: [
      "Клиент вправе отменить заказ до начала его выполнения без штрафных санкций, уведомив Исполнителя через Discord или FunPay.",
      "Если выполнение заказа уже начато (Исполнитель получил доступ к учётной записи и приступил к работе), отмена заказа рассматривается индивидуально с учётом фактически выполненного объёма работы.",
      "Исполнитель вправе отказаться от выполнения заказа до его начала в случае выявления данных, нарушающих условия настоящего Соглашения, с полным возвратом уплаченной суммы.",
    ],
  },
  {
    title: "13. Изменение условий Соглашения",
    paragraphs: [
      "Исполнитель вправе вносить изменения в настоящее Соглашение в одностороннем порядке. Актуальная версия Соглашения всегда доступна на странице «Пользовательское соглашение» сайта.",
      "Изменения не применяются к заказам, оформленным до момента публикации новой версии Соглашения, если иное прямо не согласовано сторонами.",
    ],
  },
];

const en: TermsSection[] = [
  {
    title: "1. General provisions and service description",
    paragraphs: [
      "This Terms of Service (the \"Agreement\") governs the relationship between the owner of the Hero Service platform (the \"Provider\") and any person placing an order through the website, Discord server, or the FunPay platform (the \"Client\").",
      "The Provider offers leveling services for in-game characters, accumulation of in-game currency, leveling of in-game items, and progression through stages in the video game Task Bar Hero, through temporary access to the Client's Steam account, voluntarily provided by the Client.",
      "The services are digital in nature and do not involve the transfer of any physical goods. The result of the service is a change in the state of the Client's game account according to the chosen order configuration.",
      "Placing an order through any channel (the website configurator, a Discord message, or a FunPay deal) constitutes the Client's unconditional acceptance of this Agreement.",
    ],
  },
  {
    title: "2. Client obligations",
    paragraphs: [
      "The Client must provide accurate Steam account credentials: login and password. Using an email address instead of the account login is not acceptable, as it prevents the Provider from accessing the account.",
      "The Client must provide a Steam Guard two-factor code or a backup 7-character code generated in advance, to ensure timely account access without delays caused by waiting for confirmation.",
      "For the duration of the order, the Client agrees not to log into their Steam account or change the password, email, linked phone number, or Steam Guard settings, unless otherwise agreed with the Provider.",
      "The Client must inform the Provider of any account specifics that may affect order completion: family sharing restrictions, regional locks, active trade holds, and similar factors.",
      "The Client is responsible for the accuracy of the information provided. The Provider is not liable for failure to complete an order due to incorrect login credentials supplied by the Client.",
    ],
  },
  {
    title: "3. Provider obligations",
    paragraphs: [
      "The Provider agrees to complete the order to the extent agreed at the time of placement and within the stated timeframe, except in cases of force majeure or circumstances beyond the Provider's control.",
      "The Provider agrees not to change the Client's account password, linked email, payment details, or make any purchases, fund transfers, or other financial transactions on the Client's behalf without separate consent.",
      "The Provider agrees not to use third-party software that violates Steam's or the publisher's terms of use in a way that could result in a permanent ban of the Client's account.",
      "The Provider agrees to stay in contact with the Client throughout the order and to promptly report any status changes or difficulties encountered.",
      "Upon completion, the Provider supplies confirmation of the work performed in the form of screenshots or another format agreed with the Client.",
    ],
  },
  {
    title: "4. Account access",
    paragraphs: [
      "Providing Steam account credentials is a voluntary act by the Client, undertaken solely for the purpose of receiving the ordered service.",
      "The Provider uses the access granted solely within the scope of the agreed order configuration and agrees not to take any action beyond that scope.",
      "After the order is completed, the Provider does not retain the Client's login credentials, and recommends the Client change the account password after receiving the service as an additional security measure.",
    ],
  },
  {
    title: "5. Pricing and payment procedure",
    paragraphs: [
      "Service pricing is determined using the calculator on the website and is fixed at the time the order is created. The website does not accept payments directly — payment is arranged through Discord or FunPay by mutual agreement.",
      "The payment method (bank transfer, instant payment systems, Steam Wallet top-up, transfer of in-game items, or another method) is agreed between the Client and the Provider after the order is placed.",
      "The order price may be adjusted if, after placement, additional circumstances are discovered that materially affect the scope or complexity of the work (for example, the account's actual state differing from what was declared).",
    ],
  },
  {
    title: "6. Refund policy",
    paragraphs: [
      "If an order cannot be completed due to the Provider's fault (including technical issues on the Provider's side), the Client receives a full refund for the uncompleted portion of the order.",
      "If an order cannot be completed for reasons related to information supplied by the Client (incorrect login credentials, active account restrictions undisclosed at the time of order placement), the refund is reviewed on a case-by-case basis.",
      "Refunds for a partially completed order are issued proportionally to the uncompleted scope of work, unless otherwise agreed separately by the parties.",
      "No refund is issued if the service was delivered in full as agreed but the Client later changes their mind, provided the result matches the order description.",
    ],
  },
  {
    title: "7. Digital nature of the service",
    paragraphs: [
      "The service is intangible (digital) and does not involve the creation of a physical product. In line with general consumer-protection principles applicable to digital services, proper performance is documented through confirmation of the result (a screenshot, recording, or another agreed format).",
      "Because the result of the service is a change of state within a third party's (the game publisher's) data, the Provider is not responsible for subsequent balance changes, mechanics updates, or publisher policy changes that affect the delivered result after completion.",
    ],
  },
  {
    title: "8. Liability of the parties",
    paragraphs: [
      "The Provider is not liable for any suspension, restriction, or other action taken against the Client's account by the game's publisher or the Steam platform for reasons unrelated to the Provider's actions.",
      "The Provider is not liable for technical failures on the part of Steam, the game's publisher, or internet service providers that affect the timing or feasibility of completing an order.",
      "The Client is liable for the consequences of knowingly providing false information or deliberately withholding information relevant to order completion.",
      "The Provider's total liability for any order is limited to the amount actually paid by the Client for that order.",
    ],
  },
  {
    title: "9. Confidentiality and data handling",
    paragraphs: [
      "The Provider agrees not to disclose the Client's account credentials, contact details, or other information obtained while placing or completing an order to third parties, except as required by law.",
      "Steam account credentials are used solely to complete the order and are not retained afterward.",
      "Order information (services ordered, price, status) may be stored in the Provider's database for order history, statistics, and dispute-resolution purposes.",
      "The Client may request deletion of their data from the Provider's database after order completion by submitting a request via Discord.",
    ],
  },
  {
    title: "10. Force majeure",
    paragraphs: [
      "Neither party is liable for full or partial non-performance of obligations resulting from circumstances beyond reasonable control: technical failures on Steam's or the publisher's servers, actions by government authorities, emergencies that significantly disrupt internet access, and other circumstances beyond the parties' control.",
      "When force majeure occurs, the order completion timeframe is extended for the duration of such circumstances without any penalty.",
    ],
  },
  {
    title: "11. Disclaimer",
    paragraphs: [
      "This service is not an official product of, and is not affiliated with, the developer or publisher of Task Bar Hero. All names, characters, and trademarks mentioned on this website belong to their respective owners and are used solely for descriptive purposes.",
      "The Provider does not guarantee that use of this service complies with the game publisher's terms of service in every jurisdiction, and recommends the Client review the game's own terms of use before placing an order.",
    ],
  },
  {
    title: "12. Order cancellation",
    paragraphs: [
      "The Client may cancel an order before work begins without penalty, by notifying the Provider via Discord or FunPay.",
      "If work on the order has already begun (the Provider has accessed the account and started work), cancellation is reviewed individually based on the work already completed.",
      "The Provider may decline to begin an order if information is discovered that violates this Agreement, with a full refund of any amount paid.",
    ],
  },
  {
    title: "13. Changes to this Agreement",
    paragraphs: [
      "The Provider may amend this Agreement unilaterally. The current version is always available on the \"Terms\" page of the website.",
      "Changes do not apply to orders placed before the new version of the Agreement is published, unless the parties expressly agree otherwise.",
    ],
  },
];

export function getTerms(locale: Locale): TermsSection[] {
  return locale === "ru" ? ru : en;
}
