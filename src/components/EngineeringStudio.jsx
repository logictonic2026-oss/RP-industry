import { ContactShadows } from '@react-three/drei';

// This group follows the vehicle on the same floor plane. Shadows are rendered
// only when the demand-driven canvas updates, including scroll and resize.
export default function EngineeringStudio() {
  return <>
    <ContactShadows position={[0, 0, 0]} scale={10} opacity={0.9} blur={1.6} far={2.4} resolution={512} color="#02060b" />
    <spotLight position={[-3, 6, 2]} angle={0.8} penumbra={1} intensity={48} color="#e7c39b" />
    <pointLight position={[3, 3, -4]} intensity={12} distance={12} color="#c6d9ed" />
  </>;
}
