//@flow

import type {Resources,} from '../common/resource-manager';
import {CANVAS_PICTURE_PATH} from '../common/resource-manager';

/** プロパティ */
type Props = {
  /** リソース管理オブジェクト */
  resources: Resources;

  /** 描画先のキャンバス */
  context: CanvasRenderingContext2D;

  /** 描画先X座標 */
  x: number;

  /** 描画先Y座標 */
  y: number;
}

/**
 * プレイヤーのゲージ
 *
 * @param props プロパティ
 */
export default function PlayerGauge(props: Props): void {
  const image = props.resources.canvasImages.find(item => item.path === CANVAS_PICTURE_PATH.PLAYER_GAUGE);
  if (!image) {
      return;
  }

  props.context.drawImage(image.image, props.x, props.y);
}