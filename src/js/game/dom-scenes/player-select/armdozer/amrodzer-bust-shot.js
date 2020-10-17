// @flow

import type {Resources} from "../../../../resource";
import {PathIds} from "../../../../resource/path";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";
import {waitFinishAnimation} from "../../../../wait/wait-finish-animation";

/**
 * cssクラス名のプレフィックス
 */
export const CLASS_NAME_PREFIX = 'player-select__armdozer-bust-shot';

/**
 * アームドーザバストショット
 */
export class ArmdozerBustShot {
  _image: HTMLImageElement;
  _isLoaded: Promise<void>;

  /**
   * コンストラクタ
   *
   * @param path 画像パス
   * @param className cssクラス名
   */
  constructor(path: string, className: string) {
    this._image = document.createElement('img');
    this._image.src = path;
    this._image.className = className;
    this._isLoaded = waitElementLoaded(this._image);
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._image;
  }

  /**
   * 読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this._isLoaded;
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this._image.hidden = true;
  }

  /**
   * 表示する
   */
  show(): Promise<void> {
    this._image.hidden = false;
    const animation = this._image.animate([
      {transform: 'translateX(5em)'},
      {transform: 'translateX(0)'},
    ], {
      duration: 200,
      fill: "forwards",
      easing: 'ease'
    });
    return waitFinishAnimation(animation);
  }
}

/**
 * シンブレイバー バストショット
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverBustShot(resources: Resources): ArmdozerBustShot {
  const path = resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)
    ?.path ?? '';
  const className = `${CLASS_NAME_PREFIX}__shin-braver`;
  return new ArmdozerBustShot(path, className);
}

/**
 * ネオランドーザ バストショット
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function neoLandozerBustShot(resources: Resources): ArmdozerBustShot {
  const path = resources.paths.find(v => v.id === PathIds.NEO_LANDOZER_BUST_SHOT)
    ?.path ?? '';
  const className = `${CLASS_NAME_PREFIX}__neo-landozer`;
  return new ArmdozerBustShot(path, className);
}

/**
 * ライトニングドーザ バストショット
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function lightningDozerBustShot(resources: Resources): ArmdozerBustShot {
  const path = resources.paths.find(v => v.id === PathIds.LIGHTNING_DOZER_BUST_SHOT)
    ?.path ?? '';
  const className = `${CLASS_NAME_PREFIX}__lightning-dozer`;
  return new ArmdozerBustShot(path, className);
}

/**
 * ウィングドーザ バストショット
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function wingDozerBustShot(resources: Resources): ArmdozerBustShot {
  const path = resources.paths.find(v => v.id === PathIds.WING_DOZER_BUST_SHOT)
    ?.path ?? '';
  const className = `${CLASS_NAME_PREFIX}__wing-dozer`;
  return new ArmdozerBustShot(path, className);
}
