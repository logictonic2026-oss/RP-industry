/* oxlint-disable react/immutability -- Three.js scene resources are configured in effects. */
import { Suspense, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

function Lighting() {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const environment = new RoomEnvironment(), generator = new PMREMGenerator(gl);
    const texture = generator.fromScene(environment, 0.04);
    scene.environment = texture.texture;
    environment.dispose(); generator.dispose(); invalidate();
    return () => { scene.environment = null; texture.dispose(); };
  }, [gl, scene, invalidate]);
  return <><ambientLight intensity={0.7} /><directionalLight position={[4, 6, 3]} intensity={2.5} /></>;
}
function Part({ id, onReady }) {
  const { scene } = useGLTF('/models/manufacturing-parts.glb');
  const model = useMemo(() => {
    const source = scene.getObjectByName(id);
    if (!source) throw new Error(`Missing component: ${id}`);
    const copy = source.clone(true);
    copy.traverse(object => {
      if (object.isLineSegments || object.userData.isOutline) object.visible = false;
    });
    return copy;
  }, [scene, id]);
  useEffect(() => { onReady?.(); }, [onReady]);
  return <primitive object={model} rotation={[0.08, -0.4, 0]} dispose={null} />;
}
export default function ModelView({ id, onReady }) {
  return <Canvas camera={{ position: [2.8, 2.1, 3.2], fov: 34 }} dpr={[1, 1.4]} frameloop="demand" gl={{ alpha: true, antialias: true }}>
    <Lighting /><Suspense fallback={null}><Part id={id} onReady={onReady} /></Suspense><OrbitControls makeDefault enablePan={false} enableZoom={false} enableDamping dampingFactor={0.12} />
  </Canvas>;
}
