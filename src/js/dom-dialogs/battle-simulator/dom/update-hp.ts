import { PlayerElements } from "./player-elements";

/**
 * HPを更新する
 * @param elements プレイヤー関連のHTML要素
 * @param value HPの値
 */
export const updateHP = (elements: PlayerElements, value: number) => {
  const { hp } = elements;
  hp.innerText = `HP ${value}`;
};
