import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // SETUP SCENE
    const scene = new THREE.Scene();

    // SETUP RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // SETUP LIGHTS
    const light1 = new THREE.PointLight(0x5a54ff, 0.75);
    light1.position.set(-150, 150, -50);

    const light2 = new THREE.PointLight(0x4158f6, 0.75);
    light2.position.set(-400, 200, 150);

    const light3 = new THREE.PointLight(0x803bff, 0.7);
    light3.position.set(100, 250, -100);

    scene.add(light1, light2, light3);

    // SETUP HALO (Atmosphere)
    const atmosphereShader = {
      uniforms: {},
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
          float intensity = pow(0.99 - dot(vNormal, vec3(0, 0, 1.0)), 6.0);
          gl_FragColor = vec4(0.28, 0.48, 1.0, 1.0) * intensity;
        }
      `,
    };

    const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: atmosphereShader.vertexShader,
      fragmentShader: atmosphereShader.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const atm = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atm.scale.set(1.05, 1.05, 1.05);
    atm.position.set(-0.1, 0.1, 0);
    scene.add(atm);

    // SETUP GLOBE
    const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xeeeeee,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    // SETUP MAP OVERLAY
    const loader = new THREE.TextureLoader();
    const overlayMaterial = new THREE.MeshBasicMaterial({
      map: loader.load("https://i.imgur.com/JLFp6Ws.png"),
      transparent: true,
    });

    const overlaySphereGeometry = new THREE.SphereGeometry(2.003, 64, 64);
    const overlaySphere = new THREE.Mesh(
      overlaySphereGeometry,
      overlayMaterial
    );
    overlaySphere.castShadow = true;
    overlaySphere.receiveShadow = true;
    sphere.add(overlaySphere);

    // SETUP BEZIER CURVES (Tubes)
    const numPoints = 100;
    const start = new THREE.Vector3(0, 1.5, 1.3);
    const middle = new THREE.Vector3(0.6, 0.6, 3.2);
    const end = new THREE.Vector3(1.5, -1, 0.8);

    const curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd965fa,
    });

    const tubes: THREE.Mesh[] = [];

    const createTube = (rotX: number, rotY: number, rotZ: number) => {
      // Use TubeBufferGeometry for better performance and setDrawRange support in older Three.js versions
      // @ts-expect-error - TubeBufferGeometry exists in older Three.js versions
      const tubeGeo = new THREE.TubeBufferGeometry(
        curveQuad,
        numPoints,
        0.01,
        20,
        false
      );
      tubeGeo.setDrawRange(0, 0);
      const mesh = new THREE.Mesh(tubeGeo, tubeMaterial);
      mesh.rotation.set(rotX, rotY, rotZ);
      sphere.add(mesh);
      tubes.push(mesh);
      return mesh;
    };

    createTube(0, 0, 0); // tube1
    createTube(-0.1, 0.75, 0.75); // tube2
    createTube(0.2, 2.1, 0.5); // tube3
    createTube(0.2, 2.3, 0.8); // tube4
    createTube(2, 2.9, 1.1); // tube5
    createTube(4.4, 7.1, 1); // tube6
    createTube(4.4, 2.1, 3); // tube7
    createTube(1.1, 2.5, 1); // tube8

    // SETUP SPIRES (Cylinders)
    const cylinderGeometry = new THREE.CylinderGeometry(0.01, 0.01, 4.25, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ddff,
      transparent: true,
      opacity: 0.5,
    });

    const createCylinder = (rotX: number, rotY: number, rotZ: number) => {
      const mesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      mesh.rotation.set(rotX, rotY, rotZ);
      sphere.add(mesh);
    };

    createCylinder(0.75, 0, 0);
    createCylinder(0.74, 0, -0.05);
    createCylinder(0.72, 0, -0.07);
    createCylinder(-1, 0, 2);
    createCylinder(0.8, 0, 0.5);
    createCylinder(1.05, 0, 0);
    createCylinder(2, 0, 3);
    createCylinder(0.8, 0, 2.5);

    // SETUP CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    // ANIMATION STATE
    let renderCount = 0;
    let currentGrowing = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let animationFrameId: number;

    const growTube = (index: number, count: number) => {
      const limit = Math.ceil(count / 3) * 3;
      const tube = tubes[index];
      if (tube && tube.geometry instanceof THREE.TubeGeometry) {
        tube.geometry.setDrawRange(0, limit);
      }

      const prevIndex = index > 2 ? index - 3 : tubes.length - 3 + index;
      const prevTube = tubes[prevIndex];
      if (prevTube && prevTube.geometry instanceof THREE.TubeGeometry) {
        prevTube.geometry.setDrawRange(limit, 10000);
      }
    };

    const animate = () => {
      if (renderCount < 10000) {
        renderCount += 80;
        growTube(currentGrowing, renderCount);
      } else {
        renderCount = 0;
        if (currentGrowing >= tubes.length - 1) {
          currentGrowing = 0;
        } else {
          currentGrowing++;
        }
      }

      if (!isDragging) {
        sphere.rotation.y += 0.00105;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // EVENT LISTENERS
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.offsetX, y: e.offsetY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaMove = { x: e.offsetX - previousMousePosition.x };
      if (isDragging) {
        sphere.rotation.y += deltaMove.x * 0.004;
      }
      previousMousePosition = { x: e.offsetX, y: e.offsetY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseOut = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseout", handleMouseOut);

    // RESIZE HANDLER
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseout", handleMouseOut);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-[150%] h-[150%] ${className}`} />
  );
};
