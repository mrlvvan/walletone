# Wallet One

Учебный фронтенд: копия интерфейса **Telegram Wallet**, без продуктовой привязки к Telegram.

## Стек

- **React** 19, **Create React App** (`react-scripts`)
- **Lottie** (`lottie-react`) — анимации
- **QR** (`qrcode.react`, `qr-code-styling`)
- **Тесты** — React Testing Library, Jest (через CRA)

## Внешние API (курсы и графики)

- **Криптовалюты** — [CoinMarketCap](https://coinmarketcap.com/api/) (`/v1/cryptocurrency/quotes/latest`, котировки в RUB) при наличии ключа; иначе fallback на публичный [CoinGecko](https://www.coingecko.com/en/api) (`/api/v3/simple/price` и данные для графиков).
- **Курс USD → RUB** — [ExchangeRate-API](https://www.exchangerate-api.com/) (`/v4/latest/USD`) для пересчёта цен.
- **Акции (акции/ETF в интерфейсе)** — [Finnhub](https://finnhub.io/) (котировки в USD, пересчёт в ₽ по курсу выше) — по желанию, ключ `REACT_APP_FINNHUB_KEY`.
- **Графики** — те же CMC / CoinGecko, что и для цен 

