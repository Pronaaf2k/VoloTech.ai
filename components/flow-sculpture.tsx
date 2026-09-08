"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

class FlowCurve extends THREE.Curve<THREE.Vector3> {
  constructor() { super(); this.arcLengthDivisions = 1600; }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    return target.set(3.15 * Math.cos(angle), 1.24 * Math.sin(2 * angle), 1.35 * Math.sin(angle));
  }
}

function ribbonGeometry(offset: number) {
  const path = new FlowCurve();
  const segments = 320;
  const frames = path.computeFrenetFrames(segments, true);
  const vertices: number[] = [];
  const indices: number[] = [];
  const width = .21;
  const depth = .035;
  for (let i = 0; i <= segments; i++) {
    // Frenet frames use arc-length sampling. Sample positions the same way
    // so the ribbon cross-sections stay perpendicular through the inner turns.
    const point = path.getPointAt(i / segments);
    const normal = frames.normals[i];
    const binormal = frames.binormals[i];
    for (const [side, face] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      const vertex = point.clone().addScaledVector(normal, offset + side * width / 2).addScaledVector(binormal, face * depth);
      vertices.push(vertex.x, vertex.y, vertex.z);
    }
    if (i < segments) {
      for (let side = 0; side < 4; side++) {
        const a = i * 4 + side;
        const b = i * 4 + (side + 1) % 4;
        indices.push(a, b, a + 4, b, b + 4, a + 4);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  // Share shading across the closed seam as well as the vertex positions.
  const normals = geometry.getAttribute('normal');
  for (let side = 0; side < 4; side++) {
    const end = segments * 4 + side;
    const normal = new THREE.Vector3().fromBufferAttribute(normals, side)
      .add(new THREE.Vector3().fromBufferAttribute(normals, end)).normalize();
    normals.setXYZ(side, normal.x, normal.y, normal.z);
    normals.setXYZ(end, normal.x, normal.y, normal.z);
  }
  return geometry;
}

function StudioLighting() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = generator.fromScene(room, .04);
    // Three.js owns this mutable scene outside React.
    // eslint-disable-next-line react-hooks/immutability
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.95;
    return () => { scene.environment = null; environment.dispose(); room.dispose(); generator.dispose(); };
  }, [gl, scene]);
  return <><ambientLight intensity={.3} /><directionalLight position={[2, 5, 4]} intensity={2} color="#ffe5ce" /><directionalLight position={[-4, -2, 2]} intensity={1.8} color="#ff6b2b" /></>;
}

function Sculpture({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometries = useMemo(() => Array.from({ length: 6 }, (_, index) => ribbonGeometry((index - 2.5) * .27)), []);
  useEffect(() => () => geometries.forEach(geometry => geometry.dispose()), [geometries]);
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || reduced) return;
    const time = clock.getElapsedTime();
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, .28 + pointer.y * .14 + Math.sin(time * .24) * .06, 3, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -.18 + pointer.x * .2, 3, delta);
    group.current.rotation.z = .43 + Math.sin(time * .18) * .025;
  });
  return <group ref={group} rotation={[.28, -.18, .43]}>{geometries.map((geometry, i) => <mesh geometry={geometry} key={i}><meshStandardMaterial color="#ff641b" metalness={.72} roughness={.32} side={THREE.DoubleSide} /></mesh>)}</group>;
}

export default function FlowSculpture() {
  const reduced = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [supported] = useState(() => {
    const probe = document.createElement("canvas").getContext("webgl2");
    probe?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(probe);
  });
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div className="sculpture-stage" ref={container} role="img" aria-label="Six orange metal ribbons forming a flowing sculpture that responds to your pointer">
    {supported ? <Canvas camera={{ position: [0, 0, 10.8], fov: 42 }} dpr={[1, 1.5]} frameloop={visible && !reduced ? 'always' : 'demand'} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} fallback={<SculptureFallback />}><Suspense fallback={null}><StudioLighting /><Sculpture reduced={Boolean(reduced)} /></Suspense></Canvas> : <SculptureFallback />}
  </div>;
}
function SculptureFallback() { return <div className="sculpture-fallback" aria-hidden="true">{Array.from({length:6},(_,i)=><i key={i} style={{transform:`rotate(-32deg) translateY(${i*17}px)`}} />)}</div>; }


