# Как выложить приложение в веб

Папка `build` уже собирается командой `npm run build`. Ниже — самые простые варианты размещения в интернете.

## 1. Vercel (удобно и бесплатно)

1. Зарегистрируйтесь на [vercel.com](https://vercel.com) (можно через GitHub).
2. Установите Vercel CLI: `npm i -g vercel`
3. В папке проекта выполните:
   ```bash
   cd c:\projects\1testreact\secondapp\walletone
   vercel
   ```
4. Следуйте подсказкам (логин, проект). После деплоя получите ссылку вида `https://ваш-проект.vercel.app`.

**Через GitHub:** загрузите код в репозиторий, зайдите на vercel.com → New Project → импортируйте репозиторий. Деплой будет автоматически при каждом пуше.

В проекте уже есть `vercel.json` с настройками сборки и SPA.

---

## 2. Netlify (тоже бесплатно)

1. Зарегистрируйтесь на [netlify.com](https://netlify.com).
2. Вариант А — перетащите папку **build** в [app.netlify.com/drop](https://app.netlify.com/drop).
3. Вариант Б — подключите GitHub: Site settings → Build & deploy → подключите репозиторий. В настройках сборки укажите:
   - Build command: `npm run build`
   - Publish directory: `build`

В проекте уже есть `netlify.toml` и `public/_redirects` для SPA.

---

## 3. GitHub Pages

1. В `package.json` добавьте (замените на свой логин и репозиторий):
   ```json
   "homepage": "https://ВАШ_ЛОГИН.github.io/ИМЯ_РЕПО"
   ```
2. Установите: `npm i -D gh-pages`
3. В `package.json` в `scripts` добавьте:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Выполните: `npm run deploy`

Сайт будет по адресу `https://ВАШ_ЛОГИН.github.io/ИМЯ_РЕПО`.

---

## 4. Локальная проверка перед загрузкой

Проверить, как будет выглядеть собранное приложение:

```bash
npm run build
npx serve -s build
```

Откройте в браузере адрес, который выведет `serve` (обычно http://localhost:3000).
