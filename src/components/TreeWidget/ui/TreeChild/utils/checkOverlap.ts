import * as THREE from "three";

type TCheckOverlap = (
  labels: THREE.Sprite<THREE.Object3DEventMap>[],
  hiddenLabels: THREE.Sprite<THREE.Object3DEventMap>[],
  onOverlap: (group: THREE.Sprite<THREE.Object3DEventMap>[]) => void
) => void

const checkOverlap: TCheckOverlap = (labels, hiddenLabels, onOverlap) => {
  const threshold = 0.1;

  for (let i = 0; i < labels.length; i++) {
    const label1 = labels[i];
    if (hiddenLabels.includes(label1)) continue;

    const group = [label1];

    for (let j = i + 1; j < labels.length; j++) {
      const label2 = labels[j];
      if (hiddenLabels.includes(label2)) continue;
      const distance = label1.position.distanceTo(label2.position);

      if (distance < threshold) {
        group.push(label2);
      }
    }

    if (group.length > 1) onOverlap(group)
  }
};


export default checkOverlap;