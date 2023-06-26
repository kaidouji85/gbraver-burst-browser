import * as THREE from "three";

import { Leadline } from "../src/js/game-object/lead-line/lead-line";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "lead-line",
};

/**
 * 座標確認用の円を生成する
 * @param radius 円の半径
 * @param color 円の色
 * @return 生成した円
 */
const cirlce = (radius: number, color = 0xffff00) => {
  const geometry = new THREE.CircleGeometry(radius, 32);
  const material = new THREE.MeshBasicMaterial({ color });
  return new THREE.Mesh(geometry, material);
};

/**
 * 引き出し線生成関数
 * @return 引き出し線、点A、点B
 */
type Generator = () => [Leadline, THREE.Mesh, THREE.Mesh];

/**
 * 引き出し線操作関数
 * @param leadLine 引き出し線
 * @param a 点A
 * @param b 点B
 */
type Fn = (leadLine: Leadline, a: THREE.Mesh, b: THREE.Mesh) => void;

/**
 * 引き出し線ストーリー
 * @param generator 引き出し線生成関数
 * @param fn 引き出し線操作関数
 */
const leadLineStory = (generator: Generator, fn: Fn) => () => {
  const stub = new HUDGameObjectStub(() => {
    const [leadLine, a, b] = generator();
    fn(leadLine, a, b);
    return [leadLine.getObject3D(), a, b];
  });
  stub.start();
  return stub.domElement();
};

/** 青線 */
const blueLine: Generator = () => {
  const color = 0x0000ff;
  return [new Leadline(color, 3), cirlce(5, color), cirlce(5, color)];
};

/** 右上 */
export const rightUpper = leadLineStory(blueLine, (leadLine, a, b) => {
  a.position.x = 30;
  a.position.y = 40;
  b.position.x = a.position.x + 100;
  b.position.y = a.position.y + 120;
  leadLine.set(a.position, b.position);
});

/** 左上 */
export const leftUpper = leadLineStory(blueLine, (leadLine, a, b) => {
  a.position.x = -30;
  a.position.y = 40;
  b.position.x = a.position.x - 100;
  b.position.y = a.position.y + 120;
  leadLine.set(a.position, b.position);
});

/** 右下 */
export const rightLover = leadLineStory(blueLine, (leadLine, a, b) => {
  a.position.x = 30;
  a.position.y = -40;
  b.position.x = a.position.x + 100;
  b.position.y = a.position.y - 120;
  leadLine.set(a.position, b.position);
});

/** 左下 */
export const leftLover = leadLineStory(blueLine, (leadLine, a, b) => {
  a.position.x = -30;
  a.position.y = -40;
  b.position.x = a.position.x - 100;
  b.position.y = a.position.y - 120;
  leadLine.set(a.position, b.position);
});
