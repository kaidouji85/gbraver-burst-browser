import { DAMAGE, DAMAGE_IS_DEATH } from "./class-name";
import { PlayerElements } from "./player-elements";

/** 更新パラメータ */
type DamageUpdaterParams = {
  /** 更新対象の要素 */
  elements: PlayerElements;
  /** ダメージ値 */
  value: number;
  /** 死亡するか否か、trueで死亡 */
  isDeath: boolean;
};

/**
 * ダメージを更新する
 * @param params パラメータ
 */
export const updateDamage = (params: DamageUpdaterParams) => {
  const { elements, value, isDeath } = params;
  const { damage } = elements;
  damage.innerText = 0 < value ? `-${value}` : "0";
  damage.className = isDeath ? DAMAGE_IS_DEATH : DAMAGE;
};
