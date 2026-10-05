import { ContactShadows } from '@react-three/drei';

// Architecture and vehicle share one camera and one physical floor.
export const FACTORY_FLOOR_Y = -0.19;

function Block({ position, size, color = '#354453', metalness = 0.25, roughness = 0.65, ...props }) {
  return <mesh position={position} castShadow receiveShadow {...props}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
  </mesh>;
}

function Machine({ position, rotation = 0 }) {
  return <group position={position} rotation={[0, rotation, 0]}>
    <Block position={[0, 0.18, 0]} size={[2.6, 0.36, 1.85]} color="#1a2530" />
    <Block position={[0, 1.35, 0.15]} size={[2.45, 2.35, 1.55]} color="#7f8d95" />
    <Block position={[-0.3, 1.4, -0.66]} size={[1.56, 1.75, 0.09]} color="#26343d" />
    <Block position={[-0.3, 1.66, -0.72]} size={[1.26, 0.85, 0.025]} color="#101e28" metalness={0.7} roughness={0.22} />
    <Block position={[-0.3, 0.72, -0.73]} size={[1.26, 0.25, 0.04]} color="#45545f" />
    <Block position={[0.32, 1.25, -0.79]} size={[0.04, 0.45, 0.06]} color="#c9b28c" />
    <Block position={[0.95, 1.57, -0.75]} size={[0.43, 0.8, 0.18]} color="#202b33" />
    <mesh position={[0.95, 1.74, -0.847]}>
      <planeGeometry args={[0.3, 0.26]} />
      <meshStandardMaterial color="#638986" emissive="#638986" emissiveIntensity={0.5} />
    </mesh>
    {[0, 1, 2].map(i => <Block key={i} position={[0.85 + i * 0.1, 1.4, -0.85]} size={[0.045, 0.045, 0.02]} color={i === 2 ? '#b49a74' : '#98a5ac'} />)}
    <Block position={[0, 2.58, 0]} size={[2.5, 0.13, 1.6]} color="#344650" />
    <Block position={[0.94, 2.78, 0]} size={[0.06, 0.3, 0.06]} color="#21313a" />
    <mesh position={[0.94, 2.92, 0]}>
      <cylinderGeometry args={[0.055, 0.055, 0.12, 12]} />
      <meshStandardMaterial color="#a6c8b7" emissive="#a6c8b7" emissiveIntensity={0.7} />
    </mesh>
  </group>;
}

function CeilingLight({ position }) {
  return <group position={position}>
    <Block size={[0.22, 0.12, 4.2]} color="#24333e" />
    <mesh position={[0, -0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.15, 4]} />
      <meshStandardMaterial color="#f5e8d2" emissive="#f5e8d2" emissiveIntensity={2} />
    </mesh>
  </group>;
}

export default function EngineeringStudio({ vehiclePosition }) {
  return <group position={[0, FACTORY_FLOOR_Y, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[140, 140]} />
      <meshStandardMaterial color="#53616a" metalness={0.18} roughness={0.72} />
    </mesh>
    {/* Concrete joints and painted production-bay boundaries. */}
    {[-12, -8, -4, 0, 4, 8, 12, 16].map(offset => <group key={offset}>
      <Block position={[offset, 0.001, 2]} size={[0.012, 0.003, 34]} color="#394750" />
      <Block position={[0, 0.001, offset]} size={[32, 0.003, 0.012]} color="#394750" />
    </group>)}
    <group position={[vehiclePosition[0], 0, vehiclePosition[2]]}>
      {[-1.65, 1.65].map(x => <Block key={x} position={[x, 0.005, 0]} size={[0.045, 0.006, 5.5]} color="#b49a74" />)}
      {[-2.75, 2.75].map(z => <Block key={z} position={[0, 0.005, z]} size={[3.3, 0.006, 0.045]} color="#b49a74" />)}
    </group>
    <Block position={[0, 3.3, 9]} size={[25, 6.6, 0.2]} color="#374650" />
    <Block position={[-10, 3.3, 0]} size={[0.2, 6.6, 20]} color="#35444e" />
    {/* Steel columns, wall panels, beams and overhead strip lighting. */}
    {[-9, -6, -3, 0, 3, 6, 9, 12].map(x => <group key={x}>
      <Block position={[x, 3.3, 8.84]} size={[0.035, 6.6, 0.06]} color="#25353e" />
      <Block position={[x, 6.35, 1]} size={[0.18, 0.32, 16]} color="#1d2b35" />
    </group>)}
    {[-8, -2, 4, 10].map(x => <Block key={x} position={[x, 3.2, 8.65]} size={[0.24, 6.4, 0.32]} color="#1f303c" />)}
    <Block position={[0, 5.45, 8.6]} size={[24, 0.2, 0.24]} color="#899396" />
    <Block position={[0, 4.6, 8.65]} size={[24, 0.04, 0.06]} color="#b49a74" />
    {[-6, 0, 6].map(x => <CeilingLight key={x} position={[x, 5.75, 3]} />)}
    <Machine position={[-5.5, 0, 5.5]} rotation={0.08} />
    <Machine position={[-1.6, 0, 6.5]} />
    <Machine position={[2.3, 0, 6.5]} />
    <Machine position={[6.2, 0, 6.5]} rotation={-0.12} />
    <ContactShadows position={[vehiclePosition[0], 0.008, vehiclePosition[2]]} scale={8} opacity={0.65} blur={1.3} far={1.8} resolution={256} color="#081018" />
  </group>;
}
