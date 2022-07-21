// @flow

import type {PilotId} from 'gbraver-burst-core';
import {PilotIds} from 'gbraver-burst-core';
import type {Resources} from '../../../../resource';
import {PathIds} from "../../../../resource/path";
import {PilotBustShot} from "./pilot-bust-shot";

/**
 * ルート要素のクラス名
 */
const ROOT_CLASS_NAME = 'pilot-bust-shot';

/**
 * パイロットIDに対応したバストショットを生成する
 * 
 * @param resources リソース管理オブジェクト 
 * @param pilotId パイロットID
 * @return 生成結果 
 */
export function createPilotBustShot(resources: Resources, pilotId: PilotId): PilotBustShot {
  switch (pilotId) {
    case PilotIds.SHINYA:
      return shinyaBustShot(resources);
    case PilotIds.GAI:
      return gaiBustShot(resources);
    case PilotIds.RAITO:
      return raitoBustShot(resources);
    case PilotIds.TSUBASA:
      return tsubasaBustShot(resources);
    default:
      return shinyaBustShot(resources);
  }
}

/**
 * シンヤのバストショットを生成する
 * 
 * @param resources リソース管理オブジェクト
 * @return 生成結果 
 */
function shinyaBustShot(resources: Resources): PilotBustShot {
  const path = resources.paths.find(v => v.id === PathIds.SHINYA_SKILL_CUTIN)
    ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__shinya`;  
  return new PilotBustShot(path, className);
}

/**
 * ガイのバストショットを生成する
 * 
 * @param resources リソース管理オブジェクト
 * @return 生成結果 
 */
function gaiBustShot(resources: Resources): PilotBustShot {
  const path = resources.paths.find(v => v.id === PathIds.GAI_SKILL_CUTIN)
  ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__gai`;  
  return new PilotBustShot(path, className);
}

/**
 * ライトのバストショットを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function raitoBustShot(resources: Resources): PilotBustShot {
  const path = resources.paths.find(v => v.id === PathIds.RAITO_SKILL_CUTIN)
    ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__raito`;
  return new PilotBustShot(path, className);
}
/**
 * ツバサのバストショットを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function tsubasaBustShot(resources: Resources): PilotBustShot {
  const path = resources.paths.find(v => v.id === PathIds.TSUBASA_SKILL_CUTIN)
    ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__tsubasa`;
  return new PilotBustShot(path, className);
}