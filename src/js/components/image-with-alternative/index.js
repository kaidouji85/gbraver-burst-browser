// @flow

type ImageConfigure = (image: HTMLImageElement) => void;

/**
 * 代替要素付き画像
 */
export class ImageWithAlternative {
  _root: HTMLElement;
  _alternative: HTMLElement;
  _image: HTMLImageElement;

  /**
   * コンストラクタ
   *
   * @param imageConfigure イメージに各種設定を追加するコールバック関数
   * @param alternative 画像が読み込まれるまで表示される代替要素
   */
  constructor(imageConfigure: ImageConfigure, alternative: HTMLElement ) {
    this._root = document.createElement('div');

    this._alternative = alternative;
    this._root.appendChild(this._alternative);

    this._image = document.createElement('img');
    this._image.addEventListener('load', () => {
      this._alternative.style.display = 'none';
    });
    imageConfigure(this._image);
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
}