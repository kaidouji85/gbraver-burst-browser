import { StoryFn } from "@storybook/react";
import { Observable, Subject } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../src/js/game-object/action/game-object-action";
import type { ResourcesContainer } from "../../src/js/resource";
import { loadFullResources } from "../../src/js/resource/loading/load-full-resources";
import { StorybookResourceRoot } from "../storybook-resource-root";

/** レンダラ設定 */
type Renderer = {
  /** 幅 */
  width: number;

  /** 高さ */
  height: number;

  /** ピクセルレート */
  pixelRatio: number;
};

/** カメラ設定 */
type Camera = {
  /** カメラ位置 */
  position: {
    /** x座標 */
    x: number;

    /** y座標 */
    y: number;

    /** z座標 */
    z: number;
  };

  /** 注視点 */
  target: {
    /** x座標 */
    x: number;

    /** y座標 */
    y: number;

    /** z座標 */
    z: number;
  };
};

/** スタブに追加するthree.jsオブジェクト */
type Object3Ds = {
  /** スタブに追加するオブジェクト */
  objects: THREE.Object3D[];

  /** スタブのスカイボックス */
  skyBox?: THREE.CubeTexture;
};

/** three.jsオブジェクトジェネレータのパラメータ */
export type Object3DsGeneratorParams = ResourcesContainer & {
  /** 空のゲームオブジェクトアクション */
  emptyGameObjectAction: Observable<GameObjectAction>;
};

/**
 * three.jsオブジェクトジェネレータ
 *
 * @param params パラメータ
 * @returns スタブに追加するオブジェクト群
 */
export type Object3DsGenerator = (
  params: Object3DsGeneratorParams,
) => Object3Ds;

/** スタブのパラメータ */
type StubParams = {
  /** レンダラ設定 */
  renderer: Renderer;

  /** カメラ設定 */
  camera: Camera;

  /** three.jsオブジェクトジェネレータ */
  creator: Object3DsGenerator;
};

/**
 * 静止画スタブ
 *
 * @param params パラメータ
 * @returns storybookが利用するHTMLElement
 */

import React from "react";

/**
 * 静止画スタブ（Reactコンポーネント版）
 * @param params パラメータ
 * @returns Reactコンポーネント
 */
export const stillImageStub =
  (params: StubParams): StoryFn =>
  () => {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      const renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
      });
      const { pixelRatio, width, height } = params.renderer;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height);

      (async () => {
        const aspect = width / height;
        const camera = new THREE.PerspectiveCamera(75, aspect, 1, 10000);
        const { position, target } = params.camera;
        camera.position.x = position.x;
        camera.position.y = position.y;
        camera.position.z = position.z;
        camera.lookAt(target.x, target.y, target.z);
        const resourceRoot = new StorybookResourceRoot();
        const resourceLoading = loadFullResources(resourceRoot);
        const resources = await resourceLoading.resources;
        const emptyGameObjectAction: Subject<GameObjectAction> = new Subject();
        const { objects, skyBox } = params.creator({
          resources,
          emptyGameObjectAction,
        });
        const scene = new THREE.Scene();
        objects.forEach((v) => {
          scene.add(v);
        });
        scene.background = skyBox ?? null;
        renderer.render(scene, camera);
        if (ref.current) {
          ref.current.appendChild(renderer.domElement);
        }
      })();
      return () => {
        if (ref.current) {
          ref.current.innerHTML = "";
        }
      };
    }, []);
    return React.createElement("div", { ref });
  };
