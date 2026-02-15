# BEM-маппинг классов проекта walletone

Справочник: текущий класс → BEM-класс → назначение. Используй для ручного рефакторинга.

---

## 1. App / Layout (App.js, App.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `app` | `app` | Корневой контейнер приложения |
| `content` | `app__content` | Основная область контента |
| `content.screen-history` | `app__content--screen-history` | Контент экрана «История» |
| `content.screen-trade` | `app__content--screen-trade` | Контент экрана «Торговля» |
| `content.screen-bonus` | `app__content--screen-bonus` | Контент экрана «Бонусы» |
| `content.screen-asset` | `app__content--screen-asset` | Контент экрана актива |
| `content.screen-home` | `app__content--screen-home` | Контент главного экрана |

---

## 2. Header (Header.js, App.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `topbar` | `header` | Шапка экрана |
| `topbar-left` | `header__left` | Левая часть шапки (аватар + заголовок) |
| `topbar-title` | `header__title` | Заголовок шапки |
| `topbar-actions` | `header__actions` | Кнопки справа |
| `avatar` | `header__avatar` | Аватар пользователя |
| `verified-dot` | `header__verified-dot` | Индикатор верификации |
| `icon-button` | `header__icon-btn` | Иконка-кнопка в шапке |
| `back-button` | `header__back-btn` | Кнопка «Назад» |

---

## 3. Home / Wallet (HomeScreen, WalletHero, WalletActions)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `wallet-hero` | `wallet-hero` | Блок баланса на главной |
| `wallet-tabs` | `wallet-hero__tabs` | Табы «Крипто» / «TON» |
| `tab-chip` | `wallet-hero__tab` | Одна вкладка таба |
| `tab-chip.active` | `wallet-hero__tab--active` | Активная вкладка |
| `wallet-balance` | `wallet-hero__balance` | Контейнер баланса |
| `balance-label` | `wallet-hero__balance-label` | Подпись «Баланс» |
| `balance-amount` | `wallet-hero__balance-amount` | Сумма баланса |
| `balance-amount.large` | `wallet-hero__balance-amount--large` | Крупный шрифт суммы |
| `balance-int` | `wallet-hero__balance-int` | Целая часть суммы |
| `balance-sep` | `wallet-hero__balance-sep` | Разделитель (запятая) |
| `balance-dec` | `wallet-hero__balance-dec` | Дробная часть |
| `balance-currency` | `wallet-hero__balance-currency` | Валюта (₽) |
| `balance-change` | `wallet-hero__balance-change` | Строка изменения |
| `balance-delta` | `wallet-hero__balance-delta` | Изменение (например −0,01 ₽) |
| `balance-delta.negative` | `wallet-hero__balance-delta--negative` | Отрицательное изменение |
| `balance-pill` | `wallet-hero__balance-pill` | Пилл с процентом |
| `balance-pill.negative` | `wallet-hero__balance-pill--negative` | Пилл для отрицательного % |
| `balance-pill-icon` | `wallet-hero__balance-pill-icon` | Иконка в пилле |
| `balance-period` | `wallet-hero__balance-period` | Период (24 ч) |
| `wallet-actions` | `wallet-actions` | Блок действий (Перевести, Пополнить и т.д.) |
| `actions-section` | `wallet-actions` (дубль) | То же |
| `action-item` | `wallet-actions__item` | Одна кнопка действия |
| `action-icon` | `wallet-actions__icon` | Иконка действия |
| `action-label` | `wallet-actions__label` | Подпись действия |

---

## 4. Promo (PromoSlider, App.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `promo-slider` | `promo-slider` | Контейнер слайдера промо |
| `promo-wrapper` | `promo-slider__wrapper` | Обёртка слайда |
| `promo-slide` | `promo-slider__slide` | Один слайд |
| `promo-slide.promo-orange` | `promo-slider__slide--orange` | Оранжевая тема слайда |
| `promo-slide.promo-purple` | `promo-slider__slide--purple` | Фиолетовая тема |
| `promo-copy` | `promo-slider__copy` | Текстовый блок |
| `promo-title` | `promo-slider__title` | Заголовок слайда |
| `promo-link` | `promo-slider__link` | Кнопка-ссылка |
| `promo-art` | `promo-slider__art` | Декоративная картинка справа |
| `promo-close` | `promo-slider__close` | Кнопка закрытия |
| `promo-dots` | `promo-slider__dots` | Точки индикатора |
| `promo-dot` | `promo-slider__dot` | Одна точка |
| `promo-dot.active` | `promo-slider__dot--active` | Активная точка |

---

## 5. Sections / Cards (HomeScreen, App.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `section-gap` | `section-gap` | Разделитель между секциями (12px) |
| `list-card` | `list-card` | Карточка-список (например, Major) |
| `section` | `section` | Базовая секция с фоном |
| `section.crypto-section` | `section--crypto` | Секция крипто |
| `section-header` | `section__header` | Заголовок секции |
| `section-note` | `section__note` | Подпись справа (например, «6,96 ₽») |
| `section-button` | `section-button` | Кнопка секции («Акции и фонды») |
| `section-button-left` | `section-button__left` | Левая часть кнопки |
| `section-button-icon` | `section-button__icon` | Иконка кнопки |
| `section-button-chevron` | `section-button__chevron` | Шеврон › |

---

## 6. List / Assets (ListRow, AssetsSection, App.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `list-row` | `list-row` | Строка списка |
| `list-left` | `list-row__left` | Левая часть строки |
| `list-icon` | `list-row__icon` | Иконка строки |
| `list-icon.dollar` | `list-row__icon--dollar` | Иконка доллара |
| `list-title` | `list-row__title` | Заголовок строки |
| `list-subtitle` | `list-row__subtitle` | Подзаголовок |
| `list-value` | `list-row__value` | Значение справа |
| `asset-list` | `asset-list` | Список активов |
| `asset-row` | `asset-list__row` | Строка актива |
| `asset-row.clickable` | `asset-list__row--clickable` | Кликабельная строка |
| `asset-left` | `asset-list__left` | Левая часть строки |
| `asset-icon` | `asset-list__icon` | Иконка актива |
| `asset-icon.bitcoin` | `asset-list__icon--bitcoin` | Иконка BTC |
| `asset-icon.usdt` | `asset-list__icon--usdt` | Иконка USDT |
| `asset-icon.ton` | `asset-list__icon--ton` | Иконка TON |
| `asset-icon.major` | `asset-list__icon--major` | Иконка Major |
| `asset-icon.large` | `asset-list__icon--large` | Крупная иконка |
| `asset-icon.eth` | `asset-list__icon--eth` | Иконка ETH |
| `asset-name` | `asset-list__name` | Название актива |
| `asset-code` | `asset-list__code` | Код (MAJOR · 6,96 ₽) |
| `asset-right` | `asset-list__right` | Правая часть |
| `asset-amount` | `asset-list__amount` | Сумма |
| `asset-value` | `asset-list__value` | Значение в валюте |
| `asset-value.negative` | `asset-list__value--negative` | Отрицательное значение |

---

## 7. Market / Trade (MarketScreen.js, MarketScreen.css)

### 7.1 Общие контейнеры

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `FhO5I` | `market-screen` | Корневой контейнер экрана торговли |
| `FhO5I.search-overlay-open` | `market-screen--search-open` | Состояние: открыт поиск |
| `oJKLh` | `market-section` | Секция экрана (общий layout) |
| `oJKLh.LySHd.iXSn4` | `market-section--layout` | Layout-модификаторы секции |
| `oJKLh.LySHd.iXSn4.KIbKh` | `market-section--search` | Секция поиска |
| `oJKLh.LySHd.iXSn4.CgUOn` | `market-section--content` | Секция с контентом |
| `oJKLh.CgUOn.lKYcT` | `market-section--all-assets` | Секция «Все активы» |
| `oJKLh.CgUOn.pmioA` | `market-section--top-day` | Секция «Топ дня» / «Активы TON» |
| `market-us-row` | `market-us-row` | Блок «Рынок США» (заголовок + карточка) |
| `market-section` | `market-section` | Секция (Продукты, Рынок США и т.д.) |
| `market-section-card` | `market-section--card` | Секция в виде карточки (Рынок США) |
| `market-section-header` | `market-section__header` | Заголовок секции |

### 7.2 Поиск

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `JNQMw` | `market-search` | Контейнер поиска/секции |
| `ydmxJ` | `market-search__body` | Тело секции (список, поле ввода) |
| `tf4r_` | `market-search__content` | Контент внутри body |
| `ydmxJ.tf4r_.search-input-wrap` | `market-search__input-wrap` | Обёртка поля поиска |
| `pPd9Y.nsMB8` | `market-search__form` | Форма поиска |
| `cpHhd.IqPae.PmUAN.Ka5fP.YrFt1.DIb0V.XTiUr.l_jV4` | `market-search__label` | Label поля |
| `KKBuo` | `market-search__input-inner` | Внутренняя обёртка input |
| `cqybA` | `market-search__icon` | Иконка поиска |
| `Kndc7` | `market-search__input` | Input поиска |
| `TlsKl` | `market-search__placeholder` | Плейсхолдер «Поиск» |
| `V2GJs` | `market-search__clear` | Кнопка очистки |
| `BSzXJ` | `market-search__clear-icon` | Иконка очистки |

### 7.3 Фильтры поиска (Все / Крипто / Акции / Фонды)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `wtAUk` | `search-overlay` | Оверлей поиска |
| `wtAUk.Rmex8` | `search-overlay--visible` | Видимый оверлей |
| `qMqm9` | `search-filters` | Контейнер фильтров |
| `yPhAq.xjd0r.cJa9x.AY7Xx.hHy4V.M3D51` | `search-filters__row` | Ряд кнопок |
| `r2DGg.BDWMw.hHy4V` | `search-filters__btn` | Кнопка фильтра |
| `P13QV.DLQxA` | `search-filters__btn-inner` | Внутренняя обёртка |
| `yaBp6` | `search-filters__pill` | Пилл кнопки |
| `yaBp6.ecfXP` | `search-filters__pill--active` | Активный пилл |
| `cpHhd.UBSxc.CF5m5` | `search-filters__label` | Текст кнопки |
| `gtBIz` | `search-filters__spacer` | Разделитель |
| `DTT0W.yPGCL` | `search-overlay__results` | Контейнер результатов |
| `yq9lM` | `search-filters__indicator` | Индикатор под активной кнопкой |

### 7.4 Заголовки секций

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `Rfm73` | `market-section__title-block` | Блок заголовка секции |
| `Rfm73.Jn71M.hCZ1A` | `market-section__title-row` | Ряд заголовка |
| `Rfm73.ZR_ns.umRMK.kJf7o` | `market-section__title-row--search` | Заголовок «Все активы» в поиске |
| `cpHhd.KbDJo.eqZCR` | `market-section__title` | Текст заголовка |
| `section-title-subtitle` | `market-section__title-text` | Подзаголовок секции |
| `cpHhd.UBSxc.t6rva` | `market-section__action` | Контейнер кнопки «Посмотреть всё» |
| `cpHhd.uzQIE.SqDwU.hQlED` | `market-section__link` | Кнопка «Посмотреть всё» |
| `z5Bkg` | `market-section__title-right` | Правая часть заголовка |

### 7.5 Сегментированный контроль (Акции/Фонды, Топ роста/Топ падения)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `Zwf9p` | `segmented-control` | Контейнер сегментированного контроля |
| `mFYy9` | `segmented-control__track` | Трек (фон) |
| `mFYy9.IPADx` | `segmented-control__track--dark` | Тёмный трек |
| `TsSEl` | `segmented-control__pill` | Скользящая таблетка |
| `TsSEl.TRjCi.uuakV` | `segmented-control__option` | Одна опция (кнопка) |
| `cpHhd.YLSRc.CF5m5.p_KOn` | `segmented-control__label` | Текст опции |
| `cpHhd.YLSRc.CF5m5.p_KOn.r3qNc` | `segmented-control__label--active` | Активная опция |
| `SNkiP` | `segmented-control__text` | Видимый текст |
| `_BP0C` | `segmented-control__spacer` | Скрытый спейсер |
| `Ofdvj.PReSx` | `segmented-control__wrapper` | Обёртка опций |

### 7.6 Сетки и карточки тикеров

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `nR3tb` | `ticker-grid` | Сетка тикеров |
| `LxOPn.okTpb` | `ticker-grid__row` | Ряд тикеров |
| `aVY7i` | `ticker-grid__cell` | Ячейка сетки |
| `r2DGg.Z3c2A.Syue2` | `ticker-card` | Карточка тикера |
| `P13QV.DV0WS._0g3V` | `ticker-card__inner` | Внутренняя обёртка |
| `ticker-svg` | `ticker-card__icon` | Иконка тикера |
| `mUVUv` | `ticker-card__info` | Инфо-блок |
| `cpHhd.caBg6.CF5m5` | `ticker-card__code` | Код (TSLA, AAPL) |
| `cpHhd.YLSRc.PmUAN` | `ticker-card__change` | Изменение % |
| `cpHhd.YLSRc.PmUAN.ku6Sb.G5Dxc` | `ticker-card__change-value` | Значение изменения |
| `G4GF9` | `ticker-card__change-icon` | Иконка стрелки |

### 7.7 Продукты (Крипто, Акции, Фонды)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `vilvX` | `product-card` | Карточка продукта |
| `vilvX.product-icon-crypto` | `product-card--crypto` | Карточка «Крипто» |
| `vilvX.product-icon-stocks` | `product-card--stocks` | Карточка «Акции» |
| `vilvX.product-icon-funds` | `product-card--funds` | Карточка «Фонды» |
| `product-icon-svg` | `product-card__icon` | SVG иконка продукта |
| `LxOPn.aJFEC` | `product-grid` | Сетка продуктов |

### 7.8 Список «Все активы» / результаты поиска

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `mjigr.ODmGt.LQUdc` | `asset-search-list` | Список результатов поиска |
| `mjigr.ODmGt.LQUdc.lIhZN` | `asset-search-list--compact` | Компактный список |
| `mjigr.ODmGt.LQUdc.vubxg` | `asset-search-list--history` | Список в стиле истории |
| `tSWgK` | `asset-search-list__item` | Элемент списка |
| `r2DGg.tizzh` | `asset-search-row` | Строка актива в поиске |
| `P13QV.dAgC8` | `asset-search-row__inner` | Внутренняя обёртка |
| `t1CPG.Bcb3I` | `asset-search-row__left` | Левая часть |
| `RkvKd` | `asset-search-row__icon-wrap` | Обёртка иконки |
| `asset-icon` | `asset-search-row__icon` | Иконка актива |
| `f5GTj.Wv9yg` | `asset-search-row__main` | Основной блок |
| `jOCse.TYgZR.NXXwZ` | `asset-search-row__info` | Инфо слева |
| `jOCse.TYgZR.Gihoq` | `asset-search-row__value` | Значение справа |
| `eslGw.CFakS` | `asset-search-row__right` | Правая колонка |
| `cpHhd.IqPae.CF5m5.Ka5fP.kzP3J` | `asset-search-row__title` | Название операции/актива |
| `cpHhd.IqPae.CF5m5.Ka5fP.kzP3J.VyspS` | `asset-search-row__title--primary` | Основной заголовок |
| `cpHhd.YLSRc.PmUAN.Fx5Cf.Bgj6A` | `asset-search-row__subtitle` | Подзаголовок (дата, статус) |
| `cpHhd.YLSRc.PmUAN.Fx5Cf.Bgj6A.mdnGg` | `asset-search-row__subtitle--ellipsis` | С обрезкой |
| `cpHhd.LMb8t.CF5m5.jJi8N.VbUp4.tej97` | `asset-search-row__code` | Код актива |
| `cpHhd.IqPae.PmUAN.ku6Sb.G5Dxc` | `asset-search-row__change` | Изменение % |
| `WXss8` | `asset-search-row--incoming` | Входящая операция (зелёный) |
| `gtBIz` | `asset-search-row__separator` | Разделитель снизу |
| `GEGJU` | `asset-search-list__row-wrap` | Обёртка строки |

### 7.9 Текстовые модификаторы (типографика)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `cpHhd` | `text` | Базовый текст (Roboto) |
| `IqPae` | `text--size-13` | 13px |
| `PmUAN` | `text--weight-400` | font-weight 400 |
| `Ka5fP` | `text--color-primary` | Основной цвет |
| `YLSRc` | `text--size-14` | 14px |
| `Fx5Cf` | `text--color-subtitle` | Цвет подзаголовка |
| `Bgj6A` | `text--ellipsis` | Обрезка с ellipsis |
| `CF5m5` | `text--weight-500` | font-weight 500 |
| `LMb8t` | `text--weight-600` | font-weight 600 |
| `UBSxc` | `text--size-15` | 15px |
| `eqZCR` | `text--section-header` | Стиль заголовка секции |
| `KbDJo` | `text--variant-button1` | Вариант кнопки |

---

## 8. History (HistoryScreen.js, App.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `PKleQ` | `history-screen` | Корень экрана истории |
| `wtAUk.gEZt4` | `history-screen__content` | Контент экрана |
| `PsHqe` | `history-screen__scroll` | Скролл-контейнер |
| `rDiIn` | `history-screen__list-wrap` | Обёртка списка |
| `vilvX.PuF7l` | `history-item__icon` | Иконка операции |
| `vilvX.PuF7l.is-in` | `history-item__icon--in` | Входящая (стрелка вниз) |
| `vilvX.PuF7l.is-out` | `history-item__icon--out` | Исходящая (стрелка вверх) |
| `history-arrow` | `history-item__arrow` | SVG стрелки |
| `XeMWN` | `history-item__icon-wrap` | Обёртка иконки |

---

## 9. Bonus (BonusScreen.js, App.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `bonus-screen-wrap` | `bonus-screen` | Корень экрана бонусов |
| `bonus-hero` | `bonus-hero` | Верхний блок с мешком |
| `bonus-hero.nluVg.qf2Gj` | `bonus-hero` (дубль) | То же |
| `bonus-hero-icon` | `bonus-hero__icon` | Иконка мешка |
| `bonus-hero-icon-frame` | `bonus-hero__icon-frame` | Рамка иконки |
| `bonus-hero-icon-media` | `bonus-hero__icon-media` | Медиа (Lottie/img) |
| `bonus-hero-link` | `bonus-hero__link` | Ссылка «Как это работает» |
| `yq6BH` | `bonus-hero__title` | Заголовок «Бонусы» |
| `cpHhd.IqPae.PmUAN.oqrc8` | `bonus-hero__subtitle` | Подзаголовок |
| `cpHhd.IqPae.PmUAN.SqDwU.wHOsr` | `bonus-hero__link-text` | Текст ссылки |
| `bonus-tabs` | `bonus-tabs` | Табы «Активные» / «Завершённые» |
| `bonus-tabs.rquXm` | `bonus-tabs` (дубль) | То же |
| `pill-tab` | `bonus-tabs__tab` | Одна вкладка |
| `pill-tab.active` | `bonus-tabs__tab--active` | Активная вкладка |
| `bonus-grid` | `bonus-grid` | Сетка карточек (LGGuk) |
| `LGGuk` | `bonus-grid` | То же |
| `r2DGg.pK3y3.bdh8O` | `bonus-card` | Карточка бонуса |
| `r2DGg.pK3y3.bdh8O.completed` | `bonus-card--completed` | Завершённая карточка |
| `P13QV` | `bonus-card__inner` | Внутренняя обёртка |
| `JCPzJ` | `bonus-card__icons` | Контейнер иконок |
| `JCPzJ.OxyIx` | `bonus-card__icons--centered` | Центрированные иконки |
| `gFO3r._uXb7` | `bonus-card__icon-pair` | Пара иконок (×) |
| `bonus-icon-wrap` | `bonus-card__icon` | Обёртка иконки |
| `iYgED.gfXvW` | `bonus-card__text` | Текстовый блок |
| `iYgED.gfXvW.Fx5Cf` | `bonus-card__text--muted` | Приглушённый текст |
| `Wb1nA` | `bonus-card__ribbon` | Лента «bonus» |
| `cpHhd.LMb8t.CF5m5.Se5d5.wMBS1` | `bonus-card__ribbon-text` | Текст «bonus» |
| `bonus-fallback-icon` | `bonus-card__fallback-icon` | Fallback иконка |

---

## 10. TabBar (TabBar.js, TabBar.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `Zr9ao` | `tab-bar` | Корень нижнего бара |
| `tab-bar-root` | `tab-bar` | То же |
| `QgRSk` | `tab-bar__inner` | Внутренняя обёртка |
| `TeTDS` | `tab-bar__container` | Контейнер |
| `Lcb0i` | `tab-bar__wrapper` | Обёртка |
| `KaTw3` | `tab-bar__bar` | Сам бар (liquid glass) |
| `nK_WK.tab-bar-pill` | `tab-bar__pill` | Скользящий индикатор |
| `tab-bar-pill--shine` | `tab-bar__pill--shine` | Shine-анимация |
| `yEKB7` | `tab-bar__tabs` | Ряд табов |
| `o7k40` | `tab-bar__tab` | Одна вкладка |
| `o7k40.active` | `tab-bar__tab--active` | Активная вкладка |
| `LcPDp` | `tab-bar__tab-inner` | Внутренняя обёртка таба |
| `FJOWj` | `tab-bar__tab-icon` | Иконка таба |
| `cpHhd.FoW5G.CF5m5.v1P4d` | `tab-bar__tab-label` | Подпись таба |

---

## 11. Asset Screen (AssetScreen.js, AssetScreen.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `asset-hero` | `asset-hero` | Блок актива на экране |
| `asset-hero-left` | `asset-hero__left` | Левая часть |
| `asset-hero-name` | `asset-hero__name` | Название |
| `asset-hero-code` | `asset-hero__code` | Код |
| `asset-hero-right` | `asset-hero__right` | Правая часть |
| `asset-hero-price` | `asset-hero__price` | Цена |
| `asset-hero-change` | `asset-hero__change` | Изменение |
| `detail-balance` | `asset-detail__balance` | Блок баланса |
| `detail-amount` | `asset-detail__amount` | Сумма |
| `detail-value` | `asset-detail__value` | Значение |
| `detail-actions` | `asset-detail__actions` | Кнопки действий |
| `chart-placeholder` | `asset-detail__chart` | Плейсхолдер графика |
| `chart-line` | `asset-detail__chart-line` | Линия графика |
| `chart-caption` | `asset-detail__chart-caption` | Подпись графика |

---

## 12. Trending (TrendingSection)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `trend-grid` | `trend-grid` | Сетка трендов |
| `trend-card` | `trend-grid__card` | Карточка тренда |
| `trend-top` | `trend-grid__top` | Верх карточки |
| `trend-icon` | `trend-grid__icon` | Иконка |
| `trend-change` | `trend-grid__change` | Изменение % |
| `trend-change.negative` | `trend-grid__change--negative` | Отрицательное |
| `trend-name` | `trend-grid__name` | Название |
| `trend-price` | `trend-grid__price` | Цена |
| `trend-line` | `trend-grid__line` | Линия графика |

---

## 13. Прочее (App.css)

| Текущий класс | BEM | Назначение |
|--------------|-----|------------|
| `link-button` | `link-button` | Текстовая кнопка-ссылка |
| `balance-card` | `balance-card` | Карточка баланса (legacy) |
| `quick-actions` | `quick-actions` | Быстрые действия |
| `quick-card` | `quick-actions__card` | Карточка действия |
| `quick-icon` | `quick-actions__icon` | Иконка |
| `quick-text` | `quick-actions__text` | Текст |
| `primary-button` | `btn--primary` | Основная кнопка |
| `ghost-button` | `btn--ghost` | Призрачная кнопка |
| `history-header` | `history-header` | Заголовок истории |
| `history-list` | `history-list` | Список истории |
| `history-row` | `history-row` | Строка истории |
| `history-icon` | `history-row__icon` | Иконка |
| `history-main` | `history-row__main` | Основной блок |
| `history-title` | `history-row__title` | Заголовок |
| `history-time` | `history-row__time` | Время |
| `history-right` | `history-row__right` | Правая часть |
| `history-amount` | `history-row__amount` | Сумма |
| `history-status` | `history-row__status` | Статус |

---

## Порядок рефакторинга

1. **Создать новый CSS** с BEM-классами (или заменить по файлам).
2. **В JSX** заменить `className` на новые BEM-имена.
3. **В CSS** обновить селекторы.
4. **В ios-overrides.css** обновить все селекторы с криптичными именами на BEM.
5. **Проверить** на всех экранах (Home, Trade, Bonus, History, Asset).

---

## Примечания

- Классы вида `cpHhd`, `IqPae`, `Rfm73` и т.п. — это legacy/minified имена, скорее всего из референсного приложения. Их лучше заменить на BEM.
- Модификаторы состояний (`active`, `negative`, `completed`) в BEM: `block__element--modifier`.
- Несколько модификаторов у одного элемента: `block__element--mod1--mod2` или отдельные классы `block__element block__element--mod1 block__element--mod2`.
