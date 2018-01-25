// @flow
import type {Resources} from '../../../resource/index';
import {drawImage} from '../image-drawer';
import {PlayerHpBar} from './bar';
import {drawNumberRight} from '../number';
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

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
export function drawPlayerHpGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, hp: number, maxHp: number) {
  const value = hp / maxHp;
  const hpNumberResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.HP_NUMBER);
  const hpNumber: Image = hpNumberResource ? hpNumberResource.image : new Image();
  const gaugeBaseResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.GAUGE_BASE);
  const gaugeBase: Image = gaugeBaseResource ? gaugeBaseResource.image : new Image();
  const hpGaugeLabelResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.HP_GAUGE_LABEL);
  const hpGaugeLabel: Image = hpGaugeLabelResource ? hpGaugeLabelResource.image : new Image();

  drawImage(context, gaugeBase, dx, dy);
  PlayerHpBar(context, resources, dx-8, dy+8, value);

  drawImage(context, hpGaugeLabel, dx + 70, dy - 6);
  drawNumberRight(context, hpNumber, dx - 32, dy - 24, Math.floor(hp));

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
export function drawEnemyHpGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, hp: number, maxHp: number) {
  const value = hp / maxHp;
  const hpNumberResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.HP_NUMBER);
  const hpNumber: Image = hpNumberResource ? hpNumberResource.image : new Image();
  const gaugeBaseResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.GAUGE_BASE);
  const gaugeBase: Image = gaugeBaseResource ? gaugeBaseResource.image : new Image();
  const hpGaugeLabelResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.HP_GAUGE_LABEL);
  const hpGaugeLabel: Image = hpGaugeLabelResource ? hpGaugeLabelResource.image : new Image();

  context.save();
  context.setTransform(-1, 0, 0, 1, 0, 0);

  drawImage(context, gaugeBase, -dx, dy);
  PlayerHpBar(context, resources, -dx-8, dy+8, value);

  context.restore();

  drawImage(context, hpGaugeLabel, dx - 64, dy - 6);
  drawNumberRight(context, hpNumber, dx + 100, dy - 24, Math.floor(hp));
}