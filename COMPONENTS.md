# Структура компонентов

## Экраны (используются в App.js)

| Компонент | Путь | Экран |
|-----------|------|-------|
| **HomeScreen** | `src/components/HomeScreen.js` | Кошелёк |
| **MarketScreen** | `src/components/MarketScreen.js` | Торговля |
| **AssetScreen** | `src/components/AssetScreen.js` | Карточка монеты |
| **BonusScreen** | `src/components/BonusScreen.js` | Бонусы |
| **HistoryScreen** | `src/components/HistoryScreen.js` | История |

## Общие компоненты

| Компонент | Путь | Где используется |
|-----------|------|------------------|
| **TabBar** | `src/components/TabBar.js` | Нижняя навигация (App.js) |
| **Header** | `src/components/Header.js` | Хедер (если используется) |

## Кошелёк (HomeScreen)

| Компонент | Путь | Описание |
|-----------|------|----------|
| **WalletHero** | `src/components/WalletHero.js` | Баланс, табы Крипто/TON |
| **WalletActions** | `src/components/WalletActions.js` | Кнопки: Перевести, Пополнить, Вывести, Обменять |
| **PromoSlider** | `src/components/PromoSlider.js` | Промо-баннеры |
| **ListRow** | `src/components/ListRow.js` | Строка списка (Доллары, USDT) |
| **AssetsSection** | `src/components/AssetsSection.js` | Секция «Крипто» с Major |
| **TrendingSection** | `src/components/TrendingSection.js` | Секция «В тренде» |

## Торговля (MarketScreen)

Всё в одном файле: `src/components/MarketScreen.js` — поиск, Рынок США, Продукты, Топ дня, Все активы, Активы TON.

## Иконки (`src/components/Icons/`)

| Файл | Экспорт |
|------|---------|
| **IconBitcoin.js** | IconBitcoin |
| **IconTon.js** | IconTon |
| **IconUsdt.js** | IconUsdt |
| **IconDollar.js** | IconDollar |
| **SearchAssetIcon.js** | SearchAssetIcon |
| **MarketIcons.js** | IconBtc, IconEth, IconXrp, IconSol, IconTrx, IconDoge, IconBch |
| **IconProductCrypto.jsx** | IconProductCrypto |
| **IconProductStocks.jsx** | IconProductStocks |
| **IconProductFunds.jsx** | IconProductFunds |
| **IconChangeUp.jsx** | IconChangeUp |
| **IconChangeDown.jsx** | IconChangeDown |
| **IconSparkline.jsx** | IconSparkline |
| **IconArrowUp.jsx** | IconArrowUp |
| **IconArrowDown.jsx** | IconArrowDown |

## Дополнительные

| Компонент | Путь | Описание |
|-----------|------|----------|
| **PromoBanner** | `src/components/PromoBanner.js` | Один баннер (если используется) |
| **SectionCard** | `src/components/SectionCard.js` | Карточка секции |
| **ActivityList** | `src/components/ActivityList.js` | Список активности |

## Стили

| Файл | Область |
|------|---------|
| `src/App.css` | Глобальные стили, секции, карточки |
| `src/index.css` | Переменные темы, базовые стили |
| `src/ios-overrides.css` | Стили только для iOS |
| `src/components/MarketScreen.css` | Торговля |
| `src/components/AssetScreen.css` | Карточка монеты |
| `src/components/WalletActions.css` | Кнопки кошелька |
| `src/components/TabBar.css` | Нижней таббар |
