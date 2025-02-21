import {FC, useEffect, useState} from "react";
import {useBehaviorSubject, useViewer} from "../../hooks";
import TreeChild from "./ui/TreeChild";
import * as THREE from "three";
import "./TreeWidget.css";

const TreeWidget: FC = () => {
  const viewer = useViewer();
  const status = useBehaviorSubject(viewer.status);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    labels: THREE.Sprite[];
  } | null>(null);

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const handleClick = (event: MouseEvent) => {
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, viewer.camera);

      const intersects = raycaster.intersectObjects(viewer.bubbles);

      if (intersects.length > 0) {
        const bubble = intersects[0].object;

        setTooltip({
          x: event.clientX,
          y: event.clientY,
          labels: bubble.userData.labels,
        });
      } else {
        setTooltip(null);
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (!viewer.model || status !== "idle") return null;

  return (
    <>
      <div className="tree-widget">
        <TreeChild child={viewer.model} viewer={viewer} iteration={0} key={viewer.model.id}/>
      </div>
      {tooltip && (
        <div
          className="tree-widget__tooltip" style={{
            left: tooltip.x + 10,
            top: tooltip.y + 10,
          }}
        >
          {tooltip.labels.map((label) => (
            <div className="tree-widget__tooltip-item" key={label.id}>
              {label.userData.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TreeWidget;
