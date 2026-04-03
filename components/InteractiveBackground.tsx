'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface InteractiveBackgroundProps {
  scrollProgress: number
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number | null>(null)
  const morphMeshRef = useRef<any>(null)
  const clockRef = useRef(new THREE.Clock())
  const particlesRef = useRef<THREE.Points | null>(null)
  const ringsRef = useRef<THREE.Mesh[]>([])
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    if (!mountRef.current) return

    const W = window.innerWidth
    const H = window.innerHeight

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f7fa)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200)
    camera.position.set(0, 0, 9)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xd6e8ff, 2.0)
    keyLight.position.set(6, 8, 6)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0xe8d0f0, 1.8, 30)
    fillLight.position.set(-6, 2, 4)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xfff0e8, 0.6)
    rimLight.position.set(-4, -4, -6)
    scene.add(rimLight)

    // Morph geometries for 5 sections
    const morphGeos = [
      new THREE.IcosahedronGeometry(2.2, 3),
      new THREE.TorusKnotGeometry(1.5, 0.45, 140, 18),
      new THREE.OctahedronGeometry(2.2, 2),
      new THREE.TorusGeometry(1.8, 0.6, 40, 80),
      new THREE.DodecahedronGeometry(1.8, 0),
    ]

    // Build morph positions
    const baseGeo = new THREE.IcosahedronGeometry(2.2, 3)
    const basePositions = baseGeo.attributes.position
    const vertCount = basePositions.count

    const buildMorphPositions = (geo: THREE.BufferGeometry) => {
      const arr = new Float32Array(vertCount * 3)
      const pos = geo.attributes.position
      const srcCount = pos.count
      for (let i = 0; i < vertCount; i++) {
        const bx = basePositions.getX(i)
        const by = basePositions.getY(i)
        const bz = basePositions.getZ(i)
        let minDist = Infinity
        let closest = 0
        for (let j = 0; j < srcCount; j++) {
          const dx = pos.getX(j) - bx
          const dy = pos.getY(j) - by
          const dz = pos.getZ(j) - bz
          const d = dx * dx + dy * dy + dz * dz
          if (d < minDist) {
            minDist = d
            closest = j
          }
        }
        arr[i * 3] = pos.getX(closest)
        arr[i * 3 + 1] = pos.getY(closest)
        arr[i * 3 + 2] = pos.getZ(closest)
      }
      return arr
    }

    const sectionMorphPositions = morphGeos.map(g => buildMorphPositions(g))

    // Accent colors for each section
    const accentColors = [
      new THREE.Color(0xb8cfe8), // blush blue - Hero
      new THREE.Color(0xd4b8e8), // lavender - About
      new THREE.Color(0xb8d8d0), // seafoam - Skills
      new THREE.Color(0xe8d4b8), // warm cream - Projects
      new THREE.Color(0xc8b8e8), // periwinkle - Contact
    ]

    // Create main morphing mesh
    const meshGeo = new THREE.BufferGeometry()
    const meshPositions = new Float32Array(sectionMorphPositions[0])
    meshGeo.setAttribute('position', new THREE.BufferAttribute(meshPositions, 3))
    meshGeo.computeVertexNormals()

    const meshMat = new THREE.MeshPhysicalMaterial({
      color: accentColors[0],
      roughness: 0.12,
      metalness: 0.0,
      transmission: 0.55,
      thickness: 1.2,
      ior: 1.4,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    })
    const morphMesh = new THREE.Mesh(meshGeo, meshMat)
    scene.add(morphMesh)

    // Wireframe overlay
    const wireGeo = new THREE.WireframeGeometry(meshGeo)
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
    })
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat)
    scene.add(wireMesh)

    // Inner glow sphere
    const glowGeo = new THREE.SphereGeometry(1.6, 32, 32)
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: accentColors[0],
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    scene.add(glowMesh)

    // Particles
    const particleCount = 900
    const pPositions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)
    const dustPalette = [
      new THREE.Color(0xb8cfe8),
      new THREE.Color(0xd4b8e8),
      new THREE.Color(0xb8d8d0),
      new THREE.Color(0xdde6f0),
    ]
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 30
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 30
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
      const c = dustPalette[Math.floor(Math.random() * dustPalette.length)]
      pColors[i * 3] = c.r
      pColors[i * 3 + 1] = c.g
      pColors[i * 3 + 2] = c.b
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))
    const pMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)
    particlesRef.current = particles

    // Rings
    const rings = []
    for (let r = 0; r < 2; r++) {
      const ringGeo = new THREE.TorusGeometry(2.8 + r * 0.6, 0.008, 8, 120)
      const ringMat = new THREE.MeshBasicMaterial({
        color: r === 0 ? 0xb8cfe8 : 0xd4b8e8,
        transparent: true,
        opacity: 0.3,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2 + r * 0.4
      scene.add(ring)
      rings.push(ring)
    }
    ringsRef.current = rings

    morphMeshRef.current = {
      mesh: morphMesh,
      mat: meshMat,
      geo: meshGeo,
      wire: wireMesh,
      glow: glowMesh,
      glowMat: glowMat,
      accentColors,
    }

    // Mouse & Touch parallax
    let mouseX = 0
    let mouseY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        mouseX = (touch.clientX / window.innerWidth - 0.5) * 2
        mouseY = (touch.clientY / window.innerHeight - 0.5) * 2
      }
    }
    
    const handleTouchEnd = () => {
      // Slowly return to center when touch ends
      mouseX *= 0.9
      mouseY *= 0.9
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    // Handle resize
    const handleResize = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const t = clockRef.current.getElapsedTime()

      // Morph based on scroll progress (0-4 for 5 sections)
      const s = scrollProgressRef.current * 4
      const si = Math.floor(s)
      const sf = s - si
      const nextIdx = Math.min(si + 1, 4)

      // Morph between shapes
      const fromPos = sectionMorphPositions[si]
      const toPos = sectionMorphPositions[nextIdx]
      const posAttr = meshGeo.attributes.position
      for (let i = 0; i < vertCount; i++) {
        posAttr.array[i * 3] = fromPos[i * 3] + (toPos[i * 3] - fromPos[i * 3]) * sf
        posAttr.array[i * 3 + 1] = fromPos[i * 3 + 1] + (toPos[i * 3 + 1] - fromPos[i * 3 + 1]) * sf
        posAttr.array[i * 3 + 2] = fromPos[i * 3 + 2] + (toPos[i * 3 + 2] - fromPos[i * 3 + 2]) * sf
      }
      posAttr.needsUpdate = true
      meshGeo.computeVertexNormals()

      // Color morph
      const fromColor = accentColors[si]
      const toColor = accentColors[nextIdx]
      const lerpedColor = fromColor.clone().lerp(toColor, sf)
      meshMat.color.copy(lerpedColor)
      glowMat.emissive.copy(lerpedColor)

      // Rotation
      morphMesh.rotation.y = t * 0.18 + mouseX * 0.25
      morphMesh.rotation.x = Math.sin(t * 0.12) * 0.18 + mouseY * 0.12
      morphMesh.rotation.z = t * 0.06
      wireMesh.rotation.copy(morphMesh.rotation)
      glowMesh.rotation.copy(morphMesh.rotation)

      // Rings
      ringsRef.current[0].rotation.z = t * 0.09
      ringsRef.current[0].rotation.y = Math.sin(t * 0.07) * 0.3
      ringsRef.current[1].rotation.z = -t * 0.07
      ringsRef.current[1].rotation.x = Math.PI / 2 + Math.cos(t * 0.05) * 0.4

      // Camera parallax
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      // Particles drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = t * 0.006
        particlesRef.current.rotation.x = Math.sin(t * 0.004) * 0.03
      }

      // Animate lights
      fillLight.position.x = Math.sin(t * 0.3) * 7
      fillLight.position.z = Math.cos(t * 0.25) * 5

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  // Update animation based on scroll progress
  useEffect(() => {
    scrollProgressRef.current = scrollProgress
  }, [scrollProgress])

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

export default InteractiveBackground
