import {
  BattleControllerType,
  BattleControllerTypes,
} from "../../../td-scenes/battle/controller-type";
import { ROOT_CLASS } from "./class-name";

/**
 * 戦闘画面コントローラーoptionのラベルを生成する
 * @param value 値
 * @return 生成結果
 */
const battleControllerTypeOptionLabel = (value: BattleControllerType) => {
  switch (value) {
    case "MiniController":
      return "ミニコントローラー";
    case "BigButton":
    default:
      return "おおきいボタン";
  }
};

/** おおきいボタン詳細 */
const bigButtonDetail = `
  <div class="${ROOT_CLASS}__big-button-detail">
    見栄え重視の、おおきいボタンのコントローラーです。
  </div>
`;

/** accesskey参考文献URL */
const accesskeyReference =
  "https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/accesskey";

/** ミニコントローラー詳細 */
const miniControllerDetail = `
  <div class="${ROOT_CLASS}__mini-controller-detail">
    <div class="${ROOT_CLASS}__mini-controller-overview">
      利便性重視の、ミニコントローラーです。
      キーボードショートカットに対応しているので、画面共有をしてもこちらのコマンドが漏れません。
    </div>
    <div class="${ROOT_CLASS}__mini-controller-keyboard-shortcuts">
      <div class="${ROOT_CLASS}__mini-controller-keyboard-shortcuts-title">
        キーボードショートカット（Windows版Chromeの場合）
      </div>
      <div class="${ROOT_CLASS}__mini-controller-keyboard-shortcuts-detail">
        <div class="${ROOT_CLASS}__mini-controller-command">バッテリー</div>
        <div class="${ROOT_CLASS}__mini-controller-keyboard-shortcut">
          <kbd class="${ROOT_CLASS}__keyboard-icon">alt</kbd>
          +
          <kbd class="${ROOT_CLASS}__number-key-icon">数字キー（0～8）</kbd>
        </div>
        <div class="${ROOT_CLASS}__mini-controller-command">バースト</div>
        <div class="${ROOT_CLASS}__mini-controller-keyboard-shortcut">
          <kbd class="${ROOT_CLASS}__keyboard-icon">alt</kbd> 
          +
          <kbd class="${ROOT_CLASS}__keyboard-icon">b</kbd>
        </div>
        <div class="${ROOT_CLASS}__mini-controller-command">パイロット</div>
        <div class="${ROOT_CLASS}__mini-controller-keyboard-shortcut">
          <kbd class="${ROOT_CLASS}__keyboard-icon">alt</kbd>
          +
          <kbd class="${ROOT_CLASS}__keyboard-icon">p</kbd>
        </div>
      </div>
    </div>
    <div class="${ROOT_CLASS}__accesskey-caption">
      accesskeyという仕組みでキーボードショートカットを実現しているので、
      Windows版Chrome以外では<kbd class="${ROOT_CLASS}__keyboard-icon">alt</kbd>が他のキーに変わることがあります。
      詳細は「<a href="${accesskeyReference}" target="_blank" rel="noopener">MDN公式サイト</a>」を参照してください。
    </div>
  </div>
`;

/**
 * 値に応じたコントローラー詳細を取得する
 * @param value 戦闘画面コントローラー
 * @return コントローラー詳細
 */
const getDetail = (value: BattleControllerType) => {
  switch (value) {
    case "MiniController":
      return miniControllerDetail;
    case "BigButton":
    default:
      return bigButtonDetail;
  }
};

/**
 * 戦闘画面コントローラーのラジオボタン要素HTMLを生成する
 * @param selected 選択中の戦闘画面コントローラー
 * @return 生成結果
 */
export const battleControllerTypeItems = (selected: BattleControllerType) =>
  BattleControllerTypes.map(
    (value) => `
    <div class="${ROOT_CLASS}__battle-controller-type-item">
      <label class="${ROOT_CLASS}__battle-controller-type-label">
        <input class="${ROOT_CLASS}__battle-controller-type-radio"
          name="battle-controller-type"
          type="radio"
          value="${value}"
          ${value === selected ? "checked" : ""}
        >
          ${battleControllerTypeOptionLabel(value)}
        </input>
      </label>  
      ${getDetail(value)}
    </div>
  `,
  ).reduce((a, b) => a + b);
