// @flow

import type {Resources} from "../../../../resource";
import {PathIds} from "../../../../resource/path";

export const ROOT_CLASS_NAME = 'player-select__armdozer-bust-shot';

export class ArmdozerBustShot {
  _image: HTMLImageElement;

  constructor(path: string, className: string) {
    this._image = document.createElement('img');
    this._image.src = path;
    this._image.className = className;
  }

  getRootHTMLElement(): HTMLElement {
    return this._image;
  }

  hidden(): void {
    this._image.hidden = true;
  }

  show(): void {
    this._image.hidden = false;
  }
}

export function shinBraverBustShot(resources: Resources): ArmdozerBustShot {
  const path = resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)
    ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__shin-braver`;
  return new ArmdozerBustShot(path, className);
}

export function neoLandozerBustShot(resources: Resources): ArmdozerBustShot {
  const path = resources.paths.find(v => v.id === PathIds.NEO_LANDOZER_BUST_SHOT)
    ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__neo-landozer`;
  return new ArmdozerBustShot(path, className);
}

export function lightningDozerBustShot(resources: Resources): ArmdozerBustShot {
  const path = resources.paths.find(v => v.id === PathIds.LIGHTNING_DOZER_BUST_SHOT)
    ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__lightning-dozer`;
  return new ArmdozerBustShot(path, className);
}

export function wingDozerBustShot(resources: Resources): ArmdozerBustShot {
  const path = resources.paths.find(v => v.id === PathIds.WING_DOZER_BUST_SHOT)
    ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__wing-dozer`;
  return new ArmdozerBustShot(path, className);
}
