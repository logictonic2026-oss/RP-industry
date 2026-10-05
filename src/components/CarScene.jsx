/* oxlint-disable react/immutability -- The Three.js scene is intentionally updated in effects and useFrame. */
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Color, DoubleSide, Group, MathUtils, Mesh, MeshPhysicalMaterial, PMREMGenerator, Vector3 } from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { bisectGeometry } from './carGeometry';
import { LAST_STAGE, manufacturingStages, timelineAt } from './manufacturingStages';
import { highlightPart } from './partMaterials';
import EngineeringStudio, { FACTORY_FLOOR_Y } from './EngineeringStudio';

const MODEL_URL = `${import.meta.env.BASE_URL}models/ferrari.glb`;
const PARTS_URL = `${import.meta.env.BASE_URL}models/manufacturing-parts.glb`;
const DECODER_URL = `${import.meta.env.BASE_URL}draco/`;
const FLOOR_Y = FACTORY_FLOOR_Y;
const shellNames = new Set(['body', 'glass', 'chrome', 'trim', 'lights', 'lights_red', 'leds', 'grills', 'wipers', 'yellow_trim']);
const cameraPositions = [[7, 2.15, -4.5], [6, 4.4, -5.7], [7, 3.1, -4], [7.5, 2.9, -3], [6, 4, -5], [5.5, 4.3, -6], [5, 3, -6.5], [6, 3.5, -5.5], [7, 2.15, -4.5]].map(p => new Vector3(...p));
const installedPositions = [[0, 0.6, 1], [0.6, 0.45, 1], [0.55, 0.45, -0.8], [0, -0.25, 0], [0, 0.7, -0.2], [0.7, 0.5, -1.65], [0.3, 0.6, 0.8]].map(p => new Vector3(...p));
const installedScales = [0.55, 0.3, 0.25, 0.6, 0.6, 0.48, 0.45];

function prepareCar(scene) {
  scene.updateMatrixWorld(true);
  const root = new Group(), parts = [];
  scene.traverse(source => {
    if (!source.isMesh) return;
    let parent = source.parent, wheelSide = 0;
    while (parent) {
      if (/^wheel_(fl|fr|rl|rr)$/.test(parent.name)) { wheelSide = Math.sign(parent.position.x); break; }
      parent = parent.parent;
    }
    const shell = shellNames.has(source.name) && !wheelSide;
    const geometry = source.geometry.clone().applyMatrix4(source.matrixWorld);
    const material = source.name === 'body'
      // Deep navy bodywork ties the car to the set; warm accents echo its lights.
      ? new MeshPhysicalMaterial({ color: '#263F5D', metalness: 0.64, roughness: 0.25, clearcoat: 0.95, clearcoatRoughness: 0.08, sheen: 0.1, sheenColor: '#B49A74', specularIntensity: 0.95, envMapIntensity: 1.6 })
      : source.material.clone();
    material.side = DoubleSide;
    material.forceSinglePass = true;
    material.transparent = true;
    if (source.name === 'glass') { material.color.set('#0E1A2B'); material.opacity = 0.55; material.roughness = 0.05; material.metalness = 0.2; }
    if (/^(rim|metal|chrome)/.test(source.name)) { material.color.set('#C9CED6'); material.metalness = 1; material.roughness = 0.22; }
    if (source.name === 'yellow_trim' || source.name === 'centre') { material.color.set('#B49A74'); material.metalness = 0.68; material.roughness = 0.26; }
    if (/^(leather|interior|carpet|carbon|trim)/.test(source.name)) { material.color.set('#293544'); material.roughness = 0.78; material.metalness = 0.05; }
    for (const side of shell ? [-1, 1] : [0]) {
      const mesh = new Mesh(shell ? bisectGeometry(geometry, side) : geometry, material.clone());
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      root.add(mesh);
      parts.push({ mesh, side, wheelSide, shell, opacity: material.opacity });
    }
    material.dispose();
    if (shell) geometry.dispose();
  });
  root.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(root);
  const centerX = (bounds.min.x + bounds.max.x) / 2;
  const centerZ = (bounds.min.z + bounds.max.z) / 2;
  // Bake the origin into geometry: the chapter animation resets mesh positions.
  new Set(root.children.map(mesh => mesh.geometry)).forEach(geometry => geometry.translate(-centerX, 0, -centerZ));
  return {
    root,
    parts,
    groundMinY: bounds.min.y,
  };
}

function disposeGroup(group) {
  const geometries = new Set(), materials = new Set();
  group.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
  geometries.forEach(geometry => geometry.dispose());
  materials.forEach(material => material.dispose());
}

function Studio({ cinematic }) {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const room = new RoomEnvironment(), generator = new PMREMGenerator(gl);
    const target = generator.fromScene(room, 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = 0.85;
    room.dispose(); generator.dispose(); invalidate();
    return () => { scene.environment = null; target.dispose(); };
  }, [gl, scene, invalidate]);
  return <>
    {cinematic && <><color attach="background" args={['#253440']} /><fog attach="fog" args={['#253440', 16, 42]} /></>}
    <ambientLight intensity={0.5} />
    <directionalLight position={[3, 8, -4]} intensity={2.4} color="#F5F2EC" castShadow={cinematic} shadow-mapSize={[1024, 1024]} shadow-camera-left={-13} shadow-camera-right={13} shadow-camera-top={13} shadow-camera-bottom={-13} shadow-camera-far={35} shadow-bias={-0.0003} shadow-normalBias={0.02} />
    <directionalLight position={[-4, 4, 3]} intensity={1.5} color="#c6d9ed" />
  </>;
}

// The component studies load separately so the hero car never waits for them.
function Parts({ registry }) {
  const { scene: partScene } = useGLTF(PARTS_URL, DECODER_URL);
  const invalidate = useThree(state => state.invalidate);
  const examples = useMemo(() => manufacturingStages.slice(1, -1).map(({ id }) => {
    const group = partScene.getObjectByName(id).clone(true);
    group.traverse(mesh => {
      if (mesh.material) mesh.material = mesh.material.clone();
      if (mesh.geometry) mesh.geometry = mesh.geometry.clone();
    });
    group.visible = false;
    return group;
  }), [partScene]);
  useEffect(() => {
    registry.current = examples;
    invalidate();
    return () => { registry.current = []; examples.forEach(disposeGroup); };
  }, [examples, registry, invalidate]);
  return examples.map(group => <primitive key={group.name} object={group} dispose={null} />);
}

function Exploration({ progress, stage, reducedMotion, onReady, cinematic }) {
  const { scene } = useGLTF(MODEL_URL, DECODER_URL);
  const { camera, size, invalidate } = useThree();
  const hasRendered = useRef(false);
  const parts = useRef([]);
  const mobile = size.width <= 700;
  // Camera-right points towards negative X/Z in this three-quarter view.
  // Place the vehicle at 73% of the viewport, allowing for tall/wide screens.
  const vehiclePosition = useMemo(() => {
    if (mobile) return [0, 0, 0];
    const visibleWidth = Math.max(12, size.width / size.height * 5);
    const offset = visibleWidth * 0.23;
    const distance = Math.hypot(7, 4.5);
    return [-4.5 / distance * offset, 0, -7 / distance * offset];
  }, [mobile, size.width, size.height]);
  const car = useMemo(() => prepareCar(scene), [scene]);
  const scratch = useMemo(() => ({ right: new Vector3(), up: new Vector3(), front: new Vector3(), focus: new Vector3(), target: new Vector3(0, 0.85, 0), origin: new Vector3(), tint: new Color() }), []);
  useEffect(() => progress.on('change', () => invalidate()), [progress, invalidate]);
  useEffect(() => { invalidate(); }, [stage, reducedMotion, size, invalidate]);
  useEffect(() => { hasRendered.current = false; return () => onReady(false); }, [onReady]);
  useEffect(() => () => disposeGroup(car.root), [car]);

  useFrame(() => {
    const p = reducedMotion ? stage / LAST_STAGE : progress.get();
    const { from, to, mix } = timelineAt(p);
    const weight = index => (from === index ? 1 - mix : 0) + (to === index ? mix : 0);
    const open = 1 - weight(0) - weight(LAST_STAGE);

    scratch.target.set(0, cinematic ? (mobile ? -1.15 : 1.15) : 0.85, 0);
    if (cinematic) camera.position.set(7, 2.8, -4.5);
    else camera.position.lerpVectors(cameraPositions[from], cameraPositions[to], mix);
    camera.lookAt(scratch.target);
    const worldWidth = cinematic ? (mobile ? 6.3 : 12) : MathUtils.lerp(mobile ? 6.1 : 6.3, mobile ? 7 : 7.2, open);
    const worldHeight = cinematic ? (mobile ? 9.5 : 5) : MathUtils.lerp(2.55, 3.15, open);
    camera.zoom = Math.min(size.width / worldWidth, size.height / worldHeight);
    camera.updateProjectionMatrix(); camera.updateMatrixWorld();
    scratch.right.setFromMatrixColumn(camera.matrixWorld, 0);
    scratch.up.setFromMatrixColumn(camera.matrixWorld, 1);
    scratch.front.copy(camera.position).sub(scratch.target).normalize();
    const componentOffset = cinematic ? (mobile ? 0 : size.width / camera.zoom * 0.23) : (mobile ? 0.75 : 1.1);
    scratch.focus.copy(scratch.target).addScaledVector(scratch.right, componentOffset).addScaledVector(scratch.up, cinematic ? (mobile ? 2.5 : 0.8) : -0.04).addScaledVector(scratch.front, 3.4);
    if (cinematic) car.root.position.set(...vehiclePosition);
    else car.root.position.copy(scratch.right).multiplyScalar(-0.4 * open);
    const carScale = cinematic ? 1 : 1 - 0.08 * open;
    car.root.scale.setScalar(carScale);
    car.root.position.y = FLOOR_Y - car.groundMinY * carScale;
    // Stable three-quarter pose. Ground and tires share one world-space origin.
    car.root.rotation.set(0, 0, 0);
    for (const { mesh, side, wheelSide, shell, opacity } of car.parts) {
      mesh.position.set(side ? side * 0.4 * open : (cinematic ? 0 : wheelSide * 0.43 * open), shell ? (cinematic ? 0.32 : 0.62) * open : 0, 0);
      mesh.material.opacity = opacity * (shell ? 1 - open * 0.70 : 1 - open * 0.25);
      mesh.material.depthWrite = mesh.material.opacity > 0.98;
    }
    parts.current.forEach((group, index) => {
      const focus = weight(index + 1);
      // Fixtures are process tooling. They enter independently rather than
      // appearing to be installed in the vehicle.
      group.visible = cinematic || index === 3 ? focus > 0.001 : open > 0.01;
      scratch.origin.copy(installedPositions[index]).multiplyScalar(carScale).add(car.root.position);
      group.position.lerpVectors(scratch.origin, scratch.focus, focus);
      group.scale.setScalar(MathUtils.lerp(cinematic ? 0.05 : installedScales[index], cinematic ? (mobile ? 1.05 : 1.3) : (index === 0 ? 0.91 : 1.02), focus));
      group.rotation.set(0.12 * focus, (-0.35 + Math.sin(p * Math.PI * 2) * 0.45) * focus, 0.12 * focus);
      scratch.tint.set(index < 4 ? '#142C4F' : '#B49A74');
      highlightPart(group, scratch.tint, focus);
    });
    if (!hasRendered.current) { hasRendered.current = true; onReady(true); }
  });
  return <>
    {cinematic && <EngineeringStudio vehiclePosition={vehiclePosition} />}
    <primitive object={car.root} dispose={null} />
    <Suspense fallback={null}><Parts registry={parts} /></Suspense>
  </>;
}

// Fetch in parallel as soon as this chunk loads; the car renders as soon as its own file is ready.
useGLTF.preload(MODEL_URL, DECODER_URL);
useGLTF.preload(PARTS_URL, DECODER_URL);

export default function CarScene(props) {
  return <Canvas shadows={props.cinematic} orthographic camera={{ position: [7, 2.8, -4.5], zoom: 100, near: 0.1, far: 60 }} dpr={[1, 1.35]} frameloop="demand" gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} fallback={<div className="car-story__loading">3D is unavailable on this device. Select a process below to explore its applications.</div>}>
    <Studio cinematic={props.cinematic} />
    <Suspense fallback={null}><Exploration {...props} /></Suspense>
    {!props.cinematic && <gridHelper args={[20, 40, '#345268', '#243b4c']} position={[0, -0.1, 0]} material-transparent material-opacity={0.11} />}
  </Canvas>;
}
