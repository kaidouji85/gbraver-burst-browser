// @flow
import type {Resources,} from '../resource/resource-manager';
import {EnemyHpGauge} from '../canvas/draw/hp-gauge';
import {EnemyBatteryGauge} from '../canvas/draw/battery-gauge';

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
 * 敵のゲージを描画する
 *
 * @param props 本関数のパラメータ
 */
export function drawEnemyGuge(props: Props) {
  EnemyHpGauge(props.context, props.resources, props.context.canvas.width/2, 32, props.hp, props.maxHp);
  EnemyBatteryGauge(props.context, props.resources, props.context.canvas.width/2, 80, props.battery);
}