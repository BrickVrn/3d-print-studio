'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

export function BambuH2SModel() {
  const groupRef = useRef<Group>(null);
  const fanRef = useRef<Mesh>(null);

  // Анимация вентилятора
  useFrame((_, delta) => {
    if (fanRef.current) {
      fanRef.current.rotation.z += delta * 10;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={1.5}>
      {/* Основной корпус принтера */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 1.2, 1.5]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Передняя панель */}
      <mesh position={[0, 0.5, 0.76]}>
        <planeGeometry args={[1.4, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Экран */}
      <mesh position={[0.6, 0.6, 0.77]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#3a3a3a" emissive="#0f766e" emissiveIntensity={0.2} />
      </mesh>

      {/* Камера печати - прозрачная */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.8, 1.2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          transparent
          opacity={0.9}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Окно камеры */}
      <mesh position={[0, 0.3, 0.61]}>
        <planeGeometry args={[1, 0.6]} />
        <meshStandardMaterial color="#4a9eff" transparent opacity={0.3} />
      </mesh>

      {/* Вентилятор (анимированный) */}
      <group position={[0.76, 0.5, 0]}>
        <mesh ref={fanRef}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 8]} />
          <meshStandardMaterial color="#0f766e" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Катушка пластика сверху */}
      <mesh position={[0, 1.3, -0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#ff6b00" />
      </mesh>
      <mesh position={[0, 1.35, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Ножки */}
      {[[-0.6, -0.1, 0.6], [0.6, -0.1, 0.6], [-0.6, -0.1, -0.6], [0.6, -0.1, -0.6]].map(
        (pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
            <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
          </mesh>
        )
      )}

      {/* Платформа печати */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.3, 0.05, 1.3]} />
        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}