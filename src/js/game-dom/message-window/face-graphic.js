// @flow
import type {Resources} from "../../resource";
import {PathIds} from "../../resource/path";

const ROOT_CLASS = 'face-graphic';

/** 顔画像タイプ */
export type FaceType = 'Shinya' | 'None';

export class FaceGraphic {
  #root: HTMLElement;
  #shinya: HTMLImageElement;

  constructor(resources: Resources) {
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS;

    this.#shinya = document.createElement('img');
    this.#shinya.src = resources.paths.find(v => v.id === PathIds.SHINYA_SKILL_CUTIN)?.path ?? '';
    this.#shinya.className = `${ROOT_CLASS}__shinya`;

    this.#getFaceGraphics().forEach(img => {
      this.#root.appendChild(img);
    });
  }

  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  #getFaceGraphics(): HTMLImageElement[] {
    return [this.#shinya];
  }
}