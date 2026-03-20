# TON Promo SVG

## Структура

- **`ton-promo-original.svg`** — исходный SVG промо-баннера «18% APY»
- **`build-ton-promo-svg.js`** — скрипт сборки

## Как использовать

1. Редактируйте `ton-promo-original.svg` (или замените на свой оригинальный SVG).
2. Если в оригинале ID вида `:rfg:paint0_linear_7284_4512` — скрипт конвертирует их в `ton-promo-paint0`.
3. Запустите сборку:

   ```bash
   node scripts/build-ton-promo-svg.js
   ```

4. Результат записывается в `public/ton-promo-art.svg` и используется в приложении.
