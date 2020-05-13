// @flow

/**
 * 代替要素付き画像
 */
export class ImageWithAlternative {
  _root: HTMLElement;
  _alternative: HTMLElement;
  _image: HTMLImageElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');

    this._alternative = document.createElement('div');
    this._root.appendChild(this._alternative);

    this._image = document.createElement('img');
    this._image.addEventListener('load', () => {
      this._alternative.style.display = 'none';
    });
    this._root.appendChild(this._image);
  }

  /**
   * ルートのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * 画像を取得する
   *
   * @return 取得結果
   */
  getImage(): HTMLImageElement {
    return this._image;
  }

  /**
   * 代替要素を取得する
   *
   * @return 取得結果
   */
  getAlternative(): HTMLElement {
    return this._alternative;
  }
}