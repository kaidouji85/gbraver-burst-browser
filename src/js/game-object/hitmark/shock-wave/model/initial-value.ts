import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_SPRITE_STANDARD_Z,
} from "../../../armdozer/position";
import type { ShockWaveModel } from "./shock-wave-model";

/**
 * 軌跡のランダムシード
 * 以下コードの行結果をコピーしている
 * 現在の分散が気に入らない場合、以下コードを再実行して調整を行う
 *
 * // ランダムシード生成コード
 * // nには軌跡の個数をセットする
 * let n = 32;
 * Array(n).fill(0).map(() => Math.random());
 */
export const LINE_RANDOM_SEEDS = [
  0.3534207201091213, 0.542433695544668, 0.9459070127990592,
  0.030192553648871856, 0.9081967016166621, 0.3954330137899549,
  0.3411397757302277, 0.3887976789407128, 0.7651082235441502,
  0.005365685112181939, 0.7310892910050988, 0.2768714412056379,
  0.4747671504802109, 0.47882166784130087, 0.1868529528360361,
  0.03627566808586913, 0.7856516762342411, 0.39140875840182443,
  0.7194080451597256, 0.39154705039344284, 0.7084903015215616,
  0.7432997744390368, 0.6719642471419043, 0.16229291567597803,
  0.5130957396825326, 0.329792022114503, 0.30064601998362606,
  0.6486136608611723, 0.16601523780835659, 0.3632244842746346,
  0.5721936100030882, 0.14522921092221597,
];

/**
 * 衝撃波モデルの初期値を生成する
 *
 * @returns 生成した初期値
 */
export function initialValue(): ShockWaveModel {
  const maxLine = LINE_RANDOM_SEEDS.length;
  return {
    position: {
      x: ARMDOZER_EFFECT_STANDARD_X,
      y: ARMDOZER_EFFECT_STANDARD_Y,
      z: ARMDOZER_SPRITE_STANDARD_Z,
    },
    ring: {
      scale: 1,
      opacity: 0,
    },
    lines: LINE_RANDOM_SEEDS.map((value: number, index: number) => ({
      distance: 0,
      opacity: 0,
      rotate: (2 * index * Math.PI) / maxLine,
      scale: 1,
      toScale: 1 + value * 3,
    })),
  };
}
