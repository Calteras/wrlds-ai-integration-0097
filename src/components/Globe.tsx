import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── GPS → 3D sphere coordinate
// Matches Three.js SphereGeometry UV layout so markers align with the map texture.
// lat: −90 (South Pole) → +90 (North Pole)
// lng: −180 (West)      → +180 (East)
const latLngToVec3 = (lat: number, lng: number, r: number): THREE.Vector3 => {
  const phi   = (90 - lat) * (Math.PI / 180); // colatitude
  const theta = (lng + 180) * (Math.PI / 180); // azimuth offset matches Three.js UV
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
};

// ── City nodes  ── Real-world GPS coordinates (WGS-84)
// Add / remove / reposition any entry here; the globe updates automatically.
const CITIES: { name: string; lat: number; lng: number; hq: boolean }[] = [
  // ── Calterras HQ ──────────────────────────────────────
  { name: "Jakarta",       lat:  -6.2088, lng: 106.8456, hq: true  },

  // ── Southeast Asia ────────────────────────────────────
  { name: "Singapore",     lat:   1.3521, lng: 103.8198, hq: false },
  { name: "Kuala Lumpur",  lat:   3.1390, lng: 101.6869, hq: false },
  { name: "Bangkok",       lat:  13.7563, lng: 100.5018, hq: false },
  { name: "Manila",        lat:  14.5995, lng: 120.9842, hq: false },
  { name: "Ho Chi Minh",   lat:  10.8231, lng: 106.6297, hq: false },
  { name: "Surabaya",      lat:  -7.2575, lng: 112.7521, hq: false },

  // ── East Asia ─────────────────────────────────────────
  { name: "Tokyo",         lat:  35.6762, lng: 139.6503, hq: false },
  { name: "Shanghai",      lat:  31.2304, lng: 121.4737, hq: false },

  // ── Oceania ───────────────────────────────────────────
  { name: "Sydney",        lat: -33.8688, lng: 151.2093, hq: false },

  // ── Middle East ───────────────────────────────────────
  { name: "Dubai",         lat:  25.2048, lng:  55.2708, hq: false },

  // ── Europe ────────────────────────────────────────────
  { name: "London",        lat:  51.5074, lng:  -0.1278, hq: false },

  // ── Americas ──────────────────────────────────────────
  { name: "San Francisco", lat:  37.7749, lng: -122.4194, hq: false },
];

// Arc connections — index pairs reference CITIES array above
const ARCS: [number, number][] = [
  [0, 1],  // Jakarta  → Singapore
  [0, 3],  // Jakarta  → Bangkok
  [0, 4],  // Jakarta  → Manila
  [0, 5],  // Jakarta  → Ho Chi Minh
  [0, 6],  // Jakarta  → Surabaya
  [0, 9],  // Jakarta  → Sydney
  [1, 2],  // Singapore→ Kuala Lumpur
  [1, 3],  // Singapore→ Bangkok
  [1, 7],  // Singapore→ Tokyo
  [1, 10], // Singapore→ Dubai
  [7, 12], // Tokyo    → San Francisco
  [10, 11],// Dubai    → London
  [11, 12],// London   → San Francisco
  [4, 8],  // Manila   → Shanghai
];

const C_BLUE   = 0x60a5fa; // blue-400  — secondary nodes & arcs
const C_ORANGE = 0xf97316; // orange-500 — HQ node
const C_CYAN   = 0x38bdf8; // sky-400   — arc glow

// ── Component ─────────────────────────────────────────────────────────────────

export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let width  = container.clientWidth  || 600;
    let height = container.clientHeight || 600;

    // ── Renderer ────────────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // WebGL not supported — fail silently
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Scene / Camera ───────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const R = 2; // globe radius

    // ── Globe group (rotates together) ───────────────────────────────────────
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // ── Lights ───────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x1a3050, 3));
    const dirLight = new THREE.DirectionalLight(0x4488ff, 2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // ── Atmosphere ───────────────────────────────────────────────────────────
    const atmMesh = new THREE.Mesh(
      new THREE.SphereGeometry(R, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.82 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 5.0);
            gl_FragColor = vec4(0.18, 0.5, 1.0, 1.0) * intensity;
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      })
    );
    atmMesh.scale.setScalar(1.18);
    scene.add(atmMesh); // outside globeGroup so it doesn't rotate

    // ── Globe core (dark sphere) ─────────────────────────────────────────────
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(R, 64, 64),
      new THREE.MeshPhongMaterial({
        color:    0x020c1e,
        emissive: 0x010810,
        shininess: 10,
      })
    );
    globeGroup.add(globe);

    // ── Continent map overlay ─────────────────────────────────────────────────
    const mapOverlay = new THREE.Mesh(
      new THREE.SphereGeometry(R + 0.003, 64, 64),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("https://i.imgur.com/JLFp6Ws.png"),
        transparent: true,
        opacity: 0.9,
      })
    );
    globeGroup.add(mapOverlay);

    // ── Dot-matrix surface (Fibonacci distribution) ──────────────────────────
    const DOT_COUNT = 6000;
    const dotPositions: number[] = [];
    const dotColors:    number[] = [];

    for (let i = 0; i < DOT_COUNT; i++) {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / DOT_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.cos(phi);
      const z = R * Math.sin(phi) * Math.sin(theta);
      dotPositions.push(x, y, z);
      const b = 0.08 + Math.random() * 0.12;
      dotColors.push(b * 0.3, b * 0.65, b * 1.0); // blue-tinted
    }

    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
    dotsGeo.setAttribute("color",    new THREE.Float32BufferAttribute(dotColors,    3));
    const dots = new THREE.Points(
      dotsGeo,
      new THREE.PointsMaterial({
        size: 0.013,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      })
    );
    globeGroup.add(dots);

    // ── Lat / Lng grid lines ─────────────────────────────────────────────────
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x1e3a5c,
      transparent: true,
      opacity: 0.3,
    });

    for (let lat = -75; lat <= 75; lat += 15) {
      const pts: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 2) pts.push(latLngToVec3(lat, lng - 180, R + 0.002));
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }
    for (let lng = 0; lng < 360; lng += 15) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2) pts.push(latLngToVec3(lat, lng - 180, R + 0.002));
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    // ── City markers ─────────────────────────────────────────────────────────
    interface PulsingRing { mesh: THREE.Mesh; speed: number; phase: number }
    const pulsingRings: PulsingRing[] = [];

    CITIES.forEach(({ lat, lng, hq }) => {
      const color   = hq ? C_ORANGE : C_BLUE;
      const pos     = latLngToVec3(lat, lng, R);
      const normal  = pos.clone().normalize();

      // Gradient beam — full opacity at base, fades to transparent at tip
      const beamH = hq ? 0.65 : 0.45;
      const beamR = 0.004;
      const beamGeo = new THREE.CylinderGeometry(beamR, beamR, beamH, 6, 12);
      const colorVec = new THREE.Color(color);
      const beamMat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: colorVec } },
        vertexShader: `
          varying float vProgress;
          void main() {
            vProgress = (position.y + ${(beamH * 0.5).toFixed(5)}) / ${beamH.toFixed(5)};
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vProgress;
          void main() {
            float alpha = pow(1.0 - vProgress, 1.3) * 0.92;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.copy(pos).addScaledVector(normal, beamH / 2);
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      globeGroup.add(beam);

      // Base dot
      const dotMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
      const dot    = new THREE.Mesh(new THREE.SphereGeometry(hq ? 0.030 : 0.020, 10, 10), dotMat);
      dot.position.copy(pos).addScaledVector(normal, 0.020);
      globeGroup.add(dot);

      // Inner ripple ring — bigger, fainter
      const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
      const ring    = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.095, 48), ringMat);
      ring.position.copy(pos).addScaledVector(normal, 0.025);
      ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      globeGroup.add(ring);
      pulsingRings.push({ mesh: ring, speed: 0.6 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2 });

      // Outer ripple ring — bigger, fainter
      const outerRingMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
      const outerRing    = new THREE.Mesh(new THREE.RingGeometry(0.14, 0.158, 48), outerRingMat);
      outerRing.position.copy(pos).addScaledVector(normal, 0.022);
      outerRing.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      globeGroup.add(outerRing);
      pulsingRings.push({ mesh: outerRing, speed: 0.4 + Math.random() * 0.35, phase: Math.random() * Math.PI * 2 + 1 });
    });

    // ── Arc connections (THREE.Line — avoids TubeGeometry bundling issue) ──────
    const ARC_POINTS  = 80;                    // curve sample count
    const VERTEX_MAX  = ARC_POINTS + 1;        // total vertices per arc line

    interface ArcEntry { line: THREE.Line }
    const arcEntries: ArcEntry[] = ARCS.map(([a, b]) => {
      const from = latLngToVec3(CITIES[a].lat, CITIES[a].lng, R);
      const to   = latLngToVec3(CITIES[b].lat, CITIES[b].lng, R);
      const arcHeight = 0.3 + from.distanceTo(to) * 0.18;
      const mid  = from.clone().add(to).normalize().multiplyScalar(R + arcHeight);
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);

      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(ARC_POINTS));
      geo.setDrawRange(0, 0); // start invisible

      const mat  = new THREE.LineBasicMaterial({ color: C_CYAN, transparent: true, opacity: 0 });
      const line = new THREE.Line(geo, mat);
      globeGroup.add(line);
      return { line };
    });

    // ── Mid-arc node spheres ──────────────────────────────────────────────────
    ARCS.forEach(([a, b]) => {
      const from = latLngToVec3(CITIES[a].lat, CITIES[a].lng, R);
      const to   = latLngToVec3(CITIES[b].lat, CITIES[b].lng, R);
      const arcHeight = 0.3 + from.distanceTo(to) * 0.18;
      const mid  = from.clone().add(to).normalize().multiplyScalar(R + arcHeight);
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 8, 8),
        new THREE.MeshBasicMaterial({ color: C_CYAN, transparent: true, opacity: 0.45 })
      );
      node.position.copy(mid);
      globeGroup.add(node);
    });

    // ── Starfield ─────────────────────────────────────────────────────────────
    const starPositions: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const r   = 60 + Math.random() * 80;
      const phi = Math.random() * Math.PI * 2;
      const th  = Math.random() * Math.PI;
      starPositions.push(
        r * Math.sin(th) * Math.cos(phi),
        r * Math.sin(th) * Math.sin(phi),
        r * Math.cos(th)
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.45 })
      )
    );

    // ── Animation ─────────────────────────────────────────────────────────────
    let raf: number;
    let isDragging  = false;
    let prevMouseX  = 0;
    const clock     = new THREE.Clock();

    // Arc draw state
    let arcIdx      = 0;
    let arcDraw     = 0;      // vertices drawn so far (0 → VERTEX_MAX)
    let arcHold     = 0;      // frames held at full
    let arcFade     = false;

    const DRAW_SPEED  = 3;    // vertices added per frame
    const HOLD_FRAMES = 50;
    const FADE_SPEED  = 0.04;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Rotate globe
      if (!isDragging) globeGroup.rotation.y += 0.00085;

      // Pulse rings — scale outward and fade as they expand
      pulsingRings.forEach(({ mesh, speed, phase }) => {
        const s = 1 + 0.7 * Math.abs(Math.sin(t * speed + phase));
        mesh.scale.set(s, s, 1);
        const baseOpacity = (mesh.geometry as THREE.RingGeometry).parameters.innerRadius > 0.1 ? 0.12 : 0.25;
        (mesh.material as THREE.MeshBasicMaterial).opacity =
          baseOpacity * (1 - (s - 1) / 0.7);
      });

      // Arc animation state machine
      const entry = arcEntries[arcIdx];
      const mat   = entry.line.material as THREE.LineBasicMaterial;

      if (!arcFade) {
        arcDraw = Math.min(arcDraw + DRAW_SPEED, VERTEX_MAX);
        entry.line.geometry.setDrawRange(0, arcDraw);
        mat.opacity = 0.85;

        if (arcDraw >= VERTEX_MAX) {
          arcHold++;
          if (arcHold >= HOLD_FRAMES) { arcFade = true; arcHold = 0; }
        }
      } else {
        mat.opacity = Math.max(0, mat.opacity - FADE_SPEED);
        if (mat.opacity <= 0) {
          entry.line.geometry.setDrawRange(0, 0);
          arcDraw = 0;
          arcFade = false;
          arcIdx  = (arcIdx + 1) % arcEntries.length;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Drag to rotate ────────────────────────────────────────────────────────
    const onDown  = (e: MouseEvent) => { isDragging = true; prevMouseX = e.clientX; };
    const onMove  = (e: MouseEvent) => {
      if (!isDragging) return;
      globeGroup.rotation.y += (e.clientX - prevMouseX) * 0.005;
      prevMouseX = e.clientX;
    };
    const onUp    = () => { isDragging = false; };

    container.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!containerRef.current) return;
      width  = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`w-[150%] h-[150%] ${className}`} />;
};
