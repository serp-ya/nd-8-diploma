Дипломная работа на курсе "Node, AngularJS и MongoDB: разработка полноценных веб-приложений"
===

Демонстрационная версия проекта находится по ссылке:
+ https://nd-8-diploma.herokuapp.com/

Проект состоит из 3 частей:
+ Front-end часть
+ Back-end часть
+ Тестирование

## Стуктура
Вся front-end часть проекта находится в директории `public`, тесты в `test`, а back-end распределяется по остальным директориям и проект имеет следующую структуру

```
nd-8-diploma
├── README.md
├── index.js
├── karma.conf.js
├── protractor.conf.js
├── package.json
├── Procfile
├── node_modules
├── .gitignore
├── public
│   └── index.html
│   └── css
│   │   └── main.css
│   │   └── materialize.min.css
│   └── fonts
│   └── js
│   │   └── jquery-3.2.1.min.js
│   │   └── materialize.min.js
│   │   └── lodash.js
│   │   └── socket.io.min.js
│   │   └── angular-modules
│   │       └── angular.min.js
│   │       └── angular-ui-router.min.js
│   │       └── angular-socket.min.js
│   │       └── angular-messages.min.js
│   │       └── restangular.min.js
│   └── app
│       └── App.module.js
│       └── AuthUser
│       │   └── AuthUser.module.js
│       │   └── AuthUser.service.js
│       │   └── AuthUser.component.js
│       │   └── AuthUser.html
│       │   └── AuthUserForm.component.js
│       │   └── AuthUserForm.html
│       └── Router
│       │   └── Router.module.js
│       │   └── Router.config.js
│       └── RestQueries
│       │   └── RestQueries.module.js
│       │   └── RestQueries.config.js
│       │   └── RestQueries.service.js
│       └── RealTime
│       │   └── RealTime.module.js
│       │   └── RealTime.service.js
│       └── RestaurantMenu
│       │   └── RestaurantMenu.module.js
│       │   └── RestaurantMenu.service.js
│       └── UserPage
│       │   └── UserPage.component.js
│       │   └── UserPage.html
│       │   └── UserPageNavBar.component.js
│       │   └── UserPageNavBar.html
│       │   └── UserPageModalMenu.component.js
│       │   └── UserPageModalMenu.html
│       └── OrderComponents
│       │   └── OrderCard.component.js
│       │   └── OrderCard.html
│       │   └── OrderCardBtn.component.js
│       │   └── OrderCardBtn.html
│       └── KitchenPage
│           └── KitchenPage.component.js
│           └── KitchenPage.html
└── api-routes
│    └── index.js
│    └── menu-rest-routes.js
│    └── users-rest-routes.js
└── websocket
│    └── socketController.js
│    └── socketModel.js
└── config
│    └── db.js
│    └── server.js
└── test
     └── mocha.opts
     └── angular-unit
     │   └── App.module.spec.js
     │   └── AuthUser.module.spec.js
     │   └── RealTime.module.spec.js
     │   └── RestaurantMenu.spec.js
     │   └── RestQueries.module.spec.js
     └── e2e
     │   └── kitchenPage.spec.js
     │   └── modalRestaurantMenu.spec.js
     │   └── userAuthorization.spec.js
     │   └── userNavBar.spec.js
     │   └── page-objects
     │       └── index.js
     │       └── AuthUser.page-object.js
     │       └── AuthUserForm.page-object.js
     │       └── KitchenPage.page-object.js
     │       └── UserPage.page-object.js
     │       └── UserPageModalMenu.page-object.js
     │       └── UserPageNavBar.page-object.js
     └── rest-tests
         └── v1
             └── apiMenu.spec.js
             └── apiUsers.spec.js
```

### `Front-end`
Вся фронтенд-часть проекта разделена на модули, отвечающие за какую-то определенную задачу. Модуль может производить сервис, в котором хранятся данные и бизнес-логика приложения, так же, модули могут содержать файлы-конфигураций. В приложении используются `AngularJS 1.5 компоненты`, поэтому нет отдельных файлов, где содержатся только контроллеры. Все контроллеры определены в файлах `*.component.js`.


### `Модули`
#### `Модуль App`
Является коневым модулем, в основном отвечает за связку компонентов и распределение на них различных сервисов из других модулей, таких как: `AuthUser`, `Router`, `RestQueries`, `RestaurantMenu`, `RealTime`.


#### `Модуль AuthUser`
Отвечает за авторизацию пользователя на сайте, в методе `run` отвечает за редирект при отсутствии авторизации, при старте выполняет проверку на содержание данных пользователя в сервисе `AuthUserService`, если данные отсутствуют, выполняет редирект на страницу `/authorization (state - authorization)`. Внедряет зависимость от модулей: `Router`, `ngMessages`, `RestQueries`, `RealTime`.

##### `Сервис AuthUserService`
Хранит в себе данные пользователя в поле `user` и один метод - `loginUser`, который наследуется от сервиса, отвечающего за связь с API - `RestQueriesService`.


#### `Модуль Router`
Отвечает за обработку адресной строки, построен на основе модуля `ui.router` и внедряет в себя зависимость от модуля `AuthUser`. Все настройки модуля содержатся в файле `Router.config.js`, который содержит настройки для следующих состояний:
+ `authorization`, компонент `authUser`. Срабатывает, когда пользователь не авторизован.
+ `kitchen`, компонент `kitchenPage`. Показывает страницу повара.
+ `authorized`, компонент `userPage`. Показывает главную страницу, где содержан функционал заказа, пополнения баланса и отслеживания состояния заказов


#### `Модуль RestQueries`
Модуль отвечает за связь с API сервера, построен на основе модуля `restangular`. В файле конфигураций `RestQueries.config.js` определён корневой URL для API приложения - `api/v1/`.

#### `Сервис RestQueriesService`
Содержит в себе 2 метода:
+ `loginUser`, отвечающий за отправку данных пользователя на сервер.
+ `getMenuItems`, отвечающий за получение меню возможных заказов.


#### `Модуль RealTime`
Этот модуль отвечает за коммуникацию с WebSocket сервером, внедряет в себя зависимость от модуля `btford.socket-io`.

#### `Сервис RealTimeService`
В данный сервис внедрена зависимость от сервиса `socketFactory` и он возвращает объект, отвечающий за поддержание WebSocket-соединения. Так как модуль `btford.socket-io` основан на популярной библиотеке `Socket.io`, связка Клиент-ВебСокет сервер построена на Событийно-Ориентированном подходе и для обеспечения логики приложения используются следующие события:

##### `Имитируемые сервером`:
+ `pullUserData` - запрос на получение поля `user` из сервиса `AuthUserService`.

##### `Имитируемые клиентом`:
+ `pushUserData` - событие имитируемое вслед за серверным событием `pullUserData`, отправляет актуальные данные пользователя на сервер.
+ `connection` - вызывается при подключении пользователя к серверу, вслед за ним выбрасывается событие `pullUserData`.
+ `makeNewOrder` - событие наступающие при совершении нового заказа, собирает объект из полученных данных о заказе и устанавливающий первоначальное состояние "Заказано". После создания объекта - записывает его в базу данных. Каждый заказ имеет уникальный `_id`, который назначается от количества заказов у конкретного пользователя.
+ `creditsAdded` - событие пополнения счёта пользователя. Увеличивает счёт пользователя на переданную сумму.
+ `orderUpdate` - событие обновления состояния заказа.
+ `orderUpdate` - событие обновления состояния заказа.


#### `Модуль RestaurantMenu`
Модуль отвечающий за получение и хранение данных ресторанного меню. Включает в себя 1 сервис и наследует зависимость от сервиса `RestQueries`.

#### `Сервис RestaurantMenuService`
Сервис наследует один метод у другого сервиса - `RestQueriesService` и возвращает массив данных с возможными заказами.


### `Компоненты`
##### `authUser`
Отвечает за отрисовку страницы авторизации, не содержит контроллера, включает в себя шаблон `AuthUser.html`, в котором рендерится другой компонент - `authUserForm`.

##### `authUserForm`
Отвечает за отрисовку и работу формы авторизации, в него внедрена зависимость от сервиса `AuthUserService` и модуля `ngMessages`, отвечающего за валидацию данных, вводимых в поля. Контроллер компонента передаёт данные, введённые в форму методу `loginUser` сервиса `AuthUserService`. Шаблон компонента - `AuthUserForm.html`

#### `userPage`
Отвечает за рендеринг главной страницы, внедряет в себя зависимости от сервисов: `AuthUserService`, `RestaurantMenuService`, `RealTimeService`, `$rootScope`, `$timeout`. Шаблон компонента - `UserPage.html`.
Контроллер получает и хранит в себе данные пользователя в поле `user`, данные о возможных заказах в поле `menu`, отслеживает событие ВебСокета `userUpdated` и имитирует событие `creditsChanged`, обновляя кредиты пользователя.

Шаблон компонента включает в себя такие компоненты, как:
+ `userPageNavBar`, передавая ему данные пользователя.
+ `userPageModalMenu`, передаёт в него данные меню.
+ `orderCard`, итерируется по полю контроллера `user.orders` и отвечает за вывод совершённых заказов, передаёт в него сам объект заказа `order` и отдельно состояние `order.state`

#### `userPageNavBar`
Компонент отвечает за навигационную панельку, где содержатся данные пользователя, его имя, баланс, кнопка "пополнить баланс" и ссылка на страницу Кухни. Шаблон компонента - `UserPageNavBar.html`. Компонент получает от родителя данные пользователя. Контроллер компонента внедряет зависимости от сервисов `RealTimeService`, `$timeout`, `$rootScope`. 

Если первый сервис нужен для имитации событий через ВебСокет соединение, то остальные два - для асинхронной имитации внутреннего синтетического события `creditsChanged`, передающего в другие компоненты информацию о том, что баланс пользователя был изменен. В основном, им (событием) пользуется компонент - кнопки, которые меняют свой вид и функционал, когда у пользователя не хватает средств на счету для совершения какого-то определенного заказа.

Кнопка `+100 кредитов` использует метод контроллера `addCredits()`

#### `userPageModalMenu`
Компонент отвечающий за вывод ресторанного меню в модальном окне, получает данные от родительского компонента и работает целиком с ними. Шаблон компонента - `UserPageModalMenu.html`. В шаблон компонента включён jQuery-скрипт, поставляемый с css-библиотекой `Materialize`.

#### `orderCard`
Компонент отвечающий за вывод карточки заказа. Отображает внешний вид заказов всех состояний, получает данные от родительского компонента. Шаблон компонента - `OrderCard.html`. Внутри шаблона вызывается другой компонент - `orderCardBtn`, отвечающий за вывод кнопки заказа.

#### `orderCardBtn`
Самый сложный компонент приложения, отвечает за вывод кнопок всех состояний в карточке заказа. Шаблон компонента - `OrderCardBtn.html`. 

Контроллер получает данные от родительского компонента, принимает объект заказа в поле `order` и состояние заказа в поле `state (не обязательное)`. Контроллер содержит следующие методы:
+ `$ctrl.calculateIsEnoughCredits()` - рассчитывает, хватает ли кредитов пользователю, чтобы совершить заказ, описанный в родительском компоненте. Высчитывает переменные `$ctrl.isEnoughCredits` - булевое значение, `true` - если хватает кредитов, `false` - если не хватает. Если переменная равна `false`, то происходит расчёт недостающих средств и сохраняется в переменную `$ctrl.creditsDifference`.
+ `$ctrl.addCredits()` - функция отвечающая за добавление недостающего количества кредитов, рассчитанных в переменной `$ctrl.creditsDifference` и имитирующее событие ВебСокет-соединения `creditsAdded`.
+ `$ctrl.makeOrder` - функция, добавляющая новый заказ, работает на основе ВебСокет-события `makeNewOrder`.
+ `$ctrl.startCook` - функция меняющая состояние родительского компонента на "Готовится", пользуется событием ВебСокета - `orderUpdate`.
+ `$ctrl.doneCook` - завершение приготовления заказа.
+ Синтетическое событие `creditsChanged` - построено на основе встроенного в Ангулар метода `$rootScope.$on()`, оно всего лишь вызывает метод `$ctrl.calculateIsEnoughCredits()` для каждого компонента кнопки, чтобы произвести перерасчёт средств пользователя в отношении стоимости заказа.

Шаблон компонента выполняет следующие проверки:
+ Если состояние не передано снаружи - значит, что компонент отрисовывается в модальном окне, выводит кнопки с надписями: "Заказать" или "Добавить N кредитов"
+ Если состояние не передано снаружи, но есть внутренне состояние - даёт возможность изменить состояние заказа на "Готовится" и "Доставляется". Отображает соответствующие надписи.
+ Если состояние передаётся снаружи - означает, что кнопка рендерится на странице пользователя в совершённых заказах. Блокирует взаимодействие с кнопкой и всего лишь отображает состояние заказа.

#### `kitchenPage`
Компонент, отвечающий за работу страницы повара. Шаблон компонента - `KitchenPage.html`. В компонент внедрены зависимости от сервисов `AuthUserService`, `RealTimeService`, определено всего 1 поле - `user`, где содержатся все данные о заказах данного пользователя. Компонент использует всего лишь одно событие ВебСокет-соединения - `userUpdated` для обновления статуса заказов.

Шаблон компонента использует два раза компонент `orderCard` и использует встроенный фильтр для разделения передаваемого ему контента. Таким образом, за отображение всех видов карточек заказа отвечает 1 не сложный компонент, но, в то же время, не пропадает разнообразное его отображение.


### `Back-end`
Серверная часть состоит из трёх основных составляющих:
+ HTTP-сервер на основе Express.js.
+ WebSocket-сервер, который запускается поверх HTTP-сервера по соответствующему WS/WSS протоколу.
+ Связь с Базой Данных MongoDB

#### `HTTP-сервер`
В своей работе использует библиотеку Express.js и встроенный в Node.js модуль `http`. На основе Middleware для Express.js я выстроил роутинг с API приложения, все роуты находятся в директории `/api-routes/` и в работе приложения используются два пути:
+ `/api/v1/menu` - для получения из Базы Данных списка возможных заказов.
+ `/api/v1/users` - для совершения CRUD-операций с данными пользователей.

API построено по принципу REST.

#### `WebSocket-сервер`
Полностью вся логика ВебСокет-сервера сосредоточена в 2 файлах: `/websocket/socketModel.js`, `/websocket/socketController.js`. Файл контроллера экспортирует функцию, принимающую объект http-сервера и объект базы данных. Логика работы с базой данных и всех операций изменения в Модели нашего приложения через WS-сервер сосредоточена в файле `socketModel.js`, который экспортирует класс `SocketModel`. Класс принимает в конструкторе объект базы данных, текущего сокет-соединения и уже поверх них реализовывает все свои методы.

#### `Связь с Базой Данных`
Работа с БД осуществляется с помощью API-роутов и WebSocket сервера, реализована с помощью СУБД MongoDB без ORM, в виду отсутствия необходимости работы с сложными объектами в приложении.

Для упрощённой интеграции между различными серверами я использую дополнительные конфигурации в директории `/config/`, где определены файлы для настройки порта сервера `/config/server.js` и для подключения к БД `/config/db.js`, где настроены переменные окружения.


### `Тестирование`
Тестирование приложения разбито на 3 автономные составляющие:
+ Unit-тесты фронтенда на основе Karma
+ End-to-end тестирование фронтенда на основе Protractor.js
+ Unit-тестирование REST-сервера при помощи Mocha+Chai

#### `Karma`
Использует файл-конфигураций в корне проекта `karma.conf.js`, для запуска тестов определены следующие команды в файле package.json:
+ `npm run angular-unit` в корне проекта. При этом, сервер должен освободить порт 3000

Файлы тестов находятся в папке `/test/angular-unit`. Здесь, в основном, я тестирую подключение необходимых зависимостей, регистрацию модулей, наличие жизненно-важных функций для приложения

#### `End-to-end`
Более сложные и полноценные тесты, позволяющие оценить работу UI-элементов приложения и корректную `two-way Data Binding` связь данных, их отображение, валидация формы и работу методов. Для e2e тестирования я обширно использую Паттерн `PageObject`, все такие объекты находятся в папке `/test/e2e/page-object/`, подключаются через файл index.js, где подключаются необходимые паттерны и возвращаются в виде единого объекта.

Сами тесты находятся в папке выше, а именно в `/test/e2e/`, для запуска тестов необходимо выполнить следующие команды:
+ `node index.js`
+ `npm run webdriver-update`
+ `npm run webdriver-start`
+ `npm run e2e`

Сервер должен быть запущен на порту 3000

#### `Тестирование REST-сервера`
Самые быстрые тесты, затрагивающие работу REST API нашего сервера. В основном тестируется корректность ответов сервера на различные методы HTTP-запросов и обновление данных в БД.

Запускается командой `npm run testing-server`
Сервер должен освобождать порт 3000