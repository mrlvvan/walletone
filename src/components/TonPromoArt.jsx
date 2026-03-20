/* SVG-иллюстрация для промо-баннера «18% APY» — графики доходности.
 * Загружается как статический файл для корректного отображения. */

export default function TonPromoArt({ className, width = 200, height = 56 }) {
  const src = process.env.PUBLIC_URL + '/ton-promo-art.svg';
  return (
    <img
      src={src}
      width={width}
      height={height}
      className={className}
      alt=""
      aria-hidden
    />
  );
}
