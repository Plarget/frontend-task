import * as THREE from "three";
import Viewer from "../../../../viewer/viewer.ts";

export type TTreeChild = {
  child: THREE.Object3D<THREE.Object3DEventMap>
  viewer: Viewer
  iteration: number
}