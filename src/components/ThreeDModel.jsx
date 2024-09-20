import React, { Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ path }) {
    const { scene } = useGLTF(path);
    return <primitive object={scene} scale={[0.1, 0.1, 0.1]} position={[0, 0, 0]} />;
}

function MovingLight() {
    const [lightPosition, setLightPosition] = useState([0, 0, 10]);

    useFrame(({ mouse, viewport }) => {
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        setLightPosition([x, -y, x / -y]);
    });

    return (
        <pointLight
            position={lightPosition}
            intensity={30} // Increase the intensity
            distance={1000} // Increase the distance
            decay={0.5} // Adjust the decay
        />
    );
}

function ThreeDModel() {
    return (
        <Canvas style={{ height: '100vh', width: '100vw' }}>
            <ambientLight intensity={10} />
            <Suspense fallback={null}>
                <Model path="./scroll.glb" />
            </Suspense>
            <MovingLight />
            <OrbitControls enableZoom={false}
                autoRotate={true}
                enablePan={false} />
        </Canvas>

    );
}

export default ThreeDModel;
