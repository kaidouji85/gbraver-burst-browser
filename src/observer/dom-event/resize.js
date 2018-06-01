// @flow

/**
 * ウインドウサイズ変更を監視する
 * デバイス、ブラウザ毎のリサイズイベン挙動の違いを吸収するため、
 * ゲームループ毎にウインドウサイズを検知することにした
 */
export class WindowResize {
  _width: number;
  _height: number;
  _onResize: () => void;

  constructor(param: {onResize: () => void}) {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._onResize = param.onResize;
    requestAnimationFrame(() => this._gameLoop());
  }

  _gameLoop() {
    requestAnimationFrame(() => this._gameLoop());
    if (this._width !== window.innerWidth || this._height !== window.innerHeight) {
      this._onResize();
    }

    this._width = window.innerWidth;
    this._height = window.innerHeight;
  }
}