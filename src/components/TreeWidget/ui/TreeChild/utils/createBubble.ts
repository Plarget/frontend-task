import * as THREE from "three";

const createBubble = (position: THREE.Vector3, count: number, group: THREE.Sprite<THREE.Object3DEventMap>[]) => {
  const texture = new THREE.CanvasTexture(
    (() => {
      const canvas = document.createElement("canvas");

      const ctx = canvas.getContext("2d")!;
      const text = `${count}`;

      ctx.font = `bold 150px Arial`;

      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      return canvas;
    })()
  );

  const bubble = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
  bubble.scale.set(0.3, 0.3, 1);

  bubble.position.set(position.x + 0.1, position.y + 0.1, position.z);

  bubble.userData = { count, labels: group };
  return bubble;
};

export default createBubble;
