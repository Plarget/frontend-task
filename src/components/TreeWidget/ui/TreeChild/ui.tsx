import {FC, useState} from "react";
import type {TTreeChild} from "./type.ts";
import type {TLastMeshed} from "../../../../viewer/viewer.ts";
import * as THREE from "three";
import getMeshesFromGroup from "../../../../utils/getMeshesFromGroup.ts";
import createLabel from "./utils/createLabel.ts";
import classNames from "classnames";
import createBubble from "./utils/createBubble.ts";
import checkOverlap from "./utils/checkOverlap.ts";
import "./TreeChild.css";

const TreeChild: FC<TTreeChild> = (props) => {
  const {
    child, viewer,
    iteration
  } = props;

  const [showChildren, setShowChildren] = useState(false);

  const handleClick = (child: THREE.Object3D<THREE.Object3DEventMap>) => {
    const meshes = getMeshesFromGroup(child);
    viewer.lastMeshed.forEach(({mesh, material, label}) => {
      mesh.material = material;
      viewer.scene.remove(label);
    });

    viewer.bubbles.forEach((element) => {
      viewer.scene.remove(element);
    });

    const meshesColor: TLastMeshed = [];

    meshes.forEach((mesh) => {
      const position = new THREE.Vector3();
      mesh.getWorldPosition(position);
      const label = createLabel(mesh.userData.propertyValue.statusText, position);

      viewer.scene.add(label);

      meshesColor.push({mesh, material: mesh.material as THREE.Material, label});
      mesh.material = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        side: THREE.BackSide,
      });
    });

    const bubbles: THREE.Sprite<THREE.Object3DEventMap>[] = [];
    const hiddenLabels: THREE.Sprite<THREE.Object3DEventMap>[] = [];

    const labels = meshesColor.map(({label}) => label);

    checkOverlap(labels, hiddenLabels, (group) => {
      group.forEach((label) => {
        viewer.scene.remove(label);
        hiddenLabels.push(label);
      });

      const avgPosition = group.reduce((acc, label) => acc.add(label.position), new THREE.Vector3())
        .divideScalar(group.length);
      const bubble = createBubble(avgPosition, group.length, group);
      bubbles.push(bubble);
      viewer.scene.add(bubble);
    })

    viewer.lastMeshed = meshesColor;
    viewer.bubbles = bubbles;

    viewer.updateViewer();
  };

  const newIteration = iteration + 1;
  const canShowChildren = child.children.length > 0 && showChildren;

  return (
    <div className="tree-child">
      <div className="tree-child__actions">
        {child.children.length > 0 && (
          <button
            className={classNames("tree-child__accordion", {
              "is-active": showChildren,
            })}
            type="button"
            onClick={() => setShowChildren((state) => !state)}
            style={{marginLeft: iteration * 25}}
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9L5 5L1 1" stroke="#999999"/>
            </svg>
          </button>
        )}
        <button className="tree-child__button" type="button" onClick={() => handleClick(child)}>
          <span className="tree-child__button-label" style={{marginLeft: iteration * 25}}>
            {child.name}
          </span>
        </button>
      </div>
      {canShowChildren && (
        <div className="tree-child__child-body">
          {child.children.map((child) => (
            <TreeChild child={child} viewer={viewer} iteration={newIteration} key={child.id}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeChild;
