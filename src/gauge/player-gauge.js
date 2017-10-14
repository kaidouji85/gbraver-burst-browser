// @flow
import type {Resources,} from '../resource/resource-manager';
import {PlayerHpGauge} from '../canvas/draw/hp-gauge';
import {PlayerBatteryGauge} from '../canvas/draw/battery-gauge';

type Props = {
  /** 描画対象のキャンバス */
  context: CanvasRenderingContext2D,
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 現在のHP */
  hp: number,
  /** 最大HP */
  maxHp: number,
  /** バッテリー */
  battery: number,
}

/**
 * プレイヤーのゲージを描画する
 *
 * @param props 本関数のパラメータ
 */
export function drawPlayerGuge(props: Props) {
  PlayerHpGauge(props.context, props.resources, props.context.canvas.width/2, 32, props.hp, props.maxHp);
  PlayerBatteryGauge(props.context, props.resources, props.context.canvas.width/2, 80, props.battery);
}