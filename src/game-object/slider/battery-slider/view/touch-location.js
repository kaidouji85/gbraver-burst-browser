// @flow
import * as THREE from "three";
import * as R from 'ramda';

/**
 * メータの当たり判定
 * 本クラスは当たり判定用なので、画面上に表示されることはない
 */
type Meter = {
  /** 当たり判定用のメッシュ */
  mesh: THREE.Mesh,
  /** 当たり判定オブジェクトにタッチした際のスライダー値 */
  value: number
};

/** コンストラクタのパラメータ */
type Param = {
  /** メータ1目盛り分の幅 */
  width: number,
  /** メータ1目盛り分の高 */
  height: number,
  /** スライダー開始値 */
  start: number,
  /** スライダー終了値 */
  end: number,
};

/**
 * バッテリースライダーの当たり判定用オブジェクト
 * 本クラスは当たり判定用なので、画面上に表示されることはない
 */
export class TouchLocation {
  /** メータ当たり判定を集めたもの */
  _meterList: Meter[];
  /** 位置移動を簡単にするために、メータ当たり判定メッシュをグループにまとめる */
  _meshGroup: THREE.Group;

  constructor(param: Param) {
    const start = Math.floor(param.start);
    const end = Math.floor(param.end);
    const division = Math.abs(end - start);

    this._meterList = R.range(start, end + 1)
      .map((value, index) => {
        const dx = param.width * (index + 0.5);
        const color = new THREE.Color(`rgb(0, ${255 * index/division}, 0)`);
        return {
          mesh: createMeterMesh(param.width, param.height, dx, 0, color),
          value
        }
      });

    this._meshGroup = new THREE.Group();
    this._meterList.forEach((meter: Meter) => this._meshGroup.add(meter.mesh));
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return [this._meshGroup];
  }

  /**
   * 表示位置を変更する
   *
   * @param x x座標
   * @param y y座標
   */
  setPos(x: number, y: number) {
    this._meshGroup.position.x = x;
    this._meshGroup.position.y = y;
  }
}

/**
 * メータ当たり判定用のメッシュを生成する
 *
 * @param width メッシュ幅
 * @param height メッシュ高
 * @param dx 描画位置X
 * @param dy 描画位置Y
 * @param color メッシュ色（デバッグ用に使う）
 * @return メータ当たり判定用メッシュ
 */
function createMeterMesh(width: number, height: number, dx: number, dy: number, color: number): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const material = new THREE.MeshBasicMaterial({color});
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = dx;
  mesh.position.y = dy;
  return mesh;
}