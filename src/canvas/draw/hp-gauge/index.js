// @flow
import type {Resources} from '../../../resource/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../../resource/resource-manager';
import {drawImage} from '../image-drawer';
import {PlayerHpBar} from './bar';
import {drawNumberLeft, drawNumberRight} from '../number';

/**
 * プレイヤーのHPゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param hp 現在のHP
 * @param maxHP 最大HP
 */
export function PlayerHpGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, hp: number, maxHp: number) {
  const value = hp / maxHp;

  drawImage(context, resources, CANVAS_PICTURE_PATH.GAUGE_BASE, dx, dy);
  PlayerHpBar(context, resources, dx-8, dy+8, value);

  drawImage(context, resources, CANVAS_PICTURE_PATH.HP_GAUGE_LABEL, dx + 70, dy - 6);
  drawNumberLeft(context, resources, CANVAS_PICTURE_PATH.HP_NUMBER, dx - 100, dy - 24, hp);
}

/**
 * 敵のHPゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param hp 現在のHP
 * @param maxHP 最大HP
 */
export function EnemyHpGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, hp: number, maxHp: number) {
  const value = hp / maxHp;

  context.save();
  context.setTransform(-1, 0, 0, 1, 0, 0);

  drawImage(context, resources, CANVAS_PICTURE_PATH.GAUGE_BASE, -dx, dy);
  PlayerHpBar(context, resources, -dx-8, dy+8, value);

  context.restore();

  drawImage(context, resources, CANVAS_PICTURE_PATH.HP_GAUGE_LABEL, dx - 64, dy - 6);
  drawNumberRight(context, resources, CANVAS_PICTURE_PATH.HP_NUMBER, dx + 100, dy - 24, hp);
}