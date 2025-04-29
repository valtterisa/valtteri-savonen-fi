import { useRef, useEffect } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  className?: string;
}

export function ThreeBackground({ className }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Add geometries
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      // Create cluster of particles more centrally located
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Mesh
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Handle resize
    const handleResize = () => {
      // Update sizes
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Mouse move effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Automatic animation parameters
    let time = 0;
    const autoAmplitudeX = 0.3;
    const autoAmplitudeY = 0.2;
    const autoFrequencyX = 0.0005;
    const autoFrequencyY = 0.0007;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      time += 1;

      // Slow rotation
      particlesMesh.rotation.y += 0.001;

      // Calculate automatic movement patterns
      const autoX = Math.sin(time * autoFrequencyX) * autoAmplitudeX;
      const autoY = Math.cos(time * autoFrequencyY) * autoAmplitudeY;

      // Combine automatic movement with mouse input
      const targetX = -mouseY * 0.3 + autoY;
      const targetY = mouseX * 0.5 + autoX;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className || ""}`}
    ></div>
  );
}
