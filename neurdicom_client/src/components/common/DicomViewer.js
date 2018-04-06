import React, {Component} from 'react';
import * as THREE from 'three';

class DicomViewer extends Component {
    constructor(props) {
        super(props);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    onWindowResize() {
        this.camera.aspect = this.node.clientWidth / this.node.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.node.clientWidth, this.node.clientHeight);
    }

    componentDidMount() {
        let url = this.props.url;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.node.clientWidth / this.node.clientHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.node.clientWidth, this.node.clientHeight);
        this.node.appendChild(this.renderer.domElement);

        this.node.addEventListener('resize', this.onWindowResize, false);

        const vertShader = document.getElementById('mainVert').textContent;
        const fragShader = document.getElementById(this.props.colorScale + 'Frag').textContent;

        new THREE.TextureLoader().load(url, (texture) => {
            const uniforms = {
                texture: {
                    type: 't', value: texture
                }
            };
            const geometry = new THREE.PlaneGeometry(3, 3);
            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vertShader,
                fragmentShader: fragShader
            });
            this.cube = new THREE.Mesh(geometry, material);
            if (this.props.rotation === 'left')
                this.cube.rotation.z -= 0.5;
            else if (this.props.rotation === 'right')
                this.cube.rotation.z += 0.5;
            else
                this.cube.rotation.z = 0.0;
            this.scene.add(this.cube);
            this.camera.position.z = 2;
            this.renderer.render(this.scene, this.camera);
        });
    }

    componentDidUpdate() {
        const url = this.props.url;
        const vertShader = document.getElementById('mainVert').textContent;
        const fragShader = document.getElementById(this.props.colorScale + 'Frag').textContent;
        new THREE.TextureLoader().load(url, (texture) => {
            const uniforms = {
                texture: {
                    type: 't', value: texture
                }
            };
            if (this.props.rotation === 'left')
                this.cube.rotation.z -= 0.5;
            else if (this.props.rotation === 'right')
                this.cube.rotation.z += 0.5;
            else
                this.cube.rotation.z = 0.0;
            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vertShader,
                fragmentShader: fragShader
            });
            this.cube.material = material;
            this.cube.needsUpdate = true;
            this.renderer.render(this.scene, this.camera);
        });
    }

    render() {
        return (
            <div ref={node => this.node = node} style={{height: window.innerHeight}}>
            </div>
        )
    }
}

export default DicomViewer;