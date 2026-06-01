import { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.1) * 8;
      positions[i + 1] = (Math.random() - 0.25) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 3;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.025, transparent: true, opacity: 0.42 })
    );
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.08 });
    const lineGroup = new THREE.Group();
    for (let i = 0; i < 12; i += 1) {
      const start = new THREE.Vector3((Math.random() - 0.05) * 7, (Math.random() - 0.25) * 3.5, -0.8);
      const end = start.clone().add(new THREE.Vector3(Math.random() * 1.4, Math.random() * 0.8 - 0.4, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      lineGroup.add(new THREE.Line(geometry, lineMaterial));
    }
    scene.add(lineGroup);

    let frameId;
    const animate = () => {
      particles.rotation.y -= 0.0006;
      lineGroup.rotation.y -= 0.0004;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      mount.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      lineGroup.children.forEach((line) => line.geometry.dispose());
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 opacity-60" aria-hidden="true" />;
};

export default HeroScene;
