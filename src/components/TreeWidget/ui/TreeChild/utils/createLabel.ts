import * as THREE from "three";

const createLabel = (text: string, position: THREE.Vector3) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;

  context.font = "bold 30px Arial";
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.shadowColor = "rgba(0, 0, 0, 0.5)";
  context.shadowBlur = 4;
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;

  context.fillText(text, 0, 30);
  context.strokeText(text, 0, 30);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({ map: texture, color: 0xffffff });

  const label = new THREE.Sprite(material);
  label.userData.text = text;
  label.position.set(position.x, position.y, position.z);

  return label;
};
export default createLabel;
