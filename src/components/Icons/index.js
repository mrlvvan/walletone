/**
 * Компоненты иконок — из svg-icons.jsx (стабильные) и MarketIcons (fallback).
 * Удобно вызывать везде: <IconBtc size={42} />, <SearchAssetIcon letter="A" bg="#0033ad" />
 */

export { IconBitcoin } from './IconBitcoin';
export { IconTon } from './IconTon';
export { IconUsdt } from './IconUsdt';
export { SearchAssetIcon } from './SearchAssetIcon';

/* Из svg-icons.jsx — стабильные иконки */
export { IconBitcoin as IconBtc } from '../../svg-icons';
export { IconEthereum as IconEth } from '../../svg-icons';
export { IconXRP as IconXrp } from '../../svg-icons';
export { IconSolana as IconSol } from '../../svg-icons';
export { IconTron as IconTrx } from '../../svg-icons';
export { IconBitcoinCash as IconBch } from '../../svg-icons';
export { IconChainlink as IconLink } from '../../svg-icons';
export { IconAptos as IconApt } from '../../svg-icons';
export { IconUsdt as IconDollar } from '../../svg-icons';
export { IconSwap } from '../../svg-icons';

/* Doge и Cati — только в MarketIcons */
export { IconDoge, IconCati } from './MarketIcons';

/* Доп. иконки из svg-icons для списка активов */
export {
  IconCardano,
  IconStellar,
  IconLitecoin,
  IconSui,
  IconAvalanche,
  IconShibaInu,
  IconHedera,
  IconWorldLibertyFinancial,
  IconToncoin,
  IconPolkadot,
  IconUniswap,
  IconGold,
  IconMantle,
  IconAave,
  IconPepe,
  IconNearProtocol,
  IconAster,
  IconEtheriumClassic,
  IconInternetComputer,
  IconSky,
  IconPi,
  IconOnd,
  IconPol,
  IconWorldCoin,
  IconEthena,
} from '../../svg-icons';

/* Иконки акций (токенизированные) из svg-icons */
export {
  IconTslax,
  IconNvdaX,
  IconGooglX,
  IconAaplX,
  IconCoinX,
  IconHoodX,
  IconMcdX,
  IconCscoX,
} from '../../svg-icons';
export { default as IconProductCrypto } from './IconProductCrypto';
export { default as IconProductStocks } from './IconProductStocks';
export { default as IconProductFunds } from './IconProductFunds';
export { default as IconChangeUp } from './IconChangeUp';
export { default as IconChangeDown } from './IconChangeDown';
export { default as IconSparkline } from './IconSparkline';