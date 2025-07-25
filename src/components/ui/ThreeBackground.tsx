'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    mountRef.current.appendChild(renderer.domElement);

    // Crear partículas musicales
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material de partículas con gradiente
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Crear ondas musicales
    const waveGeometry = new THREE.RingGeometry(1, 1.1, 32);
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });

    const waves: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const wave = new THREE.Mesh(waveGeometry, waveMaterial.clone());
      wave.position.z = -2 - i * 0.5;
      wave.rotation.x = Math.PI / 2;
      waves.push(wave);
      scene.add(wave);
    }

    camera.position.z = 5;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Función de animación
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotar partículas
      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.001;

      // Animar ondas
      waves.forEach((wave, index) => {
        wave.rotation.z += 0.01 + index * 0.002;
        wave.scale.setScalar(1 + Math.sin(Date.now() * 0.001 + index) * 0.1);
        (wave.material as THREE.MeshBasicMaterial).opacity = 
          0.3 + Math.sin(Date.now() * 0.002 + index) * 0.1;
      });

      // Efecto de respiración en las partículas
      const time = Date.now() * 0.001;
      particlesMesh.scale.setScalar(1 + Math.sin(time) * 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // Manejar redimensionamiento
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

// Componente de notas musicales flotantes
export const FloatingNotes: React.FC<{ className?: string }> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Crear notas musicales
    const noteGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const noteMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.8,
    });

    const notes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const note = new THREE.Mesh(noteGeometry, noteMaterial.clone());
      note.position.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
      notes.push(note);
      scene.add(note);
    }

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);

      notes.forEach((note, index) => {
        note.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        note.rotation.x += 0.01;
        note.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
};