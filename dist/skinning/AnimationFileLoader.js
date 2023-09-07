import { ColladaLoader } from "../lib/threejs/examples/jsm/loaders/ColladaLoader.js";
import { Vec3 } from "../lib/tsm/Vec3.js";
import { Mat4 } from "../lib/TSM.js";
import { Quat } from "../lib/tsm/Quat.js";
import { Mesh } from "../skinning/Scene.js";
export class AttributeLoader {
    constructor(values, count, itemSize) {
        this.values = values;
        this.count = count;
        this.itemSize = itemSize;
    }
}
export class MeshGeometryLoader {
    constructor(geometry, wMat) {
        ///vertex positions, face indices, normals, colors, UVs
        console.log(geometry);
        let gPosition = geometry.attributes.position;
        this.position = new AttributeLoader(gPosition.array, gPosition.count, gPosition.itemSize);
        let gNormal = geometry.attributes.normal;
        this.normal = new AttributeLoader(gNormal.array, gNormal.count, gNormal.itemSize);
        if (geometry.attributes.uv) {
            let gUV = geometry.attributes.uv;
            this.uv = new AttributeLoader(gUV.array, gUV.count, gUV.itemSize);
        }
        else {
            this.uv = null;
        }
        for (let i = 0; i < gPosition.count; i++) {
            let pos = this.position.values.slice(i * 3, i * 3 + 3);
            let vPos = new Vec3([pos[0], pos[1], pos[2]]);
            vPos = wMat.multiplyPt3(vPos);
            this.position.values[i * 3] = vPos.x;
            this.position.values[i * 3 + 1] = vPos.y;
            this.position.values[i * 3 + 2] = vPos.z;
            let normals = this.normal.values.slice(i * 3, i * 3 + 3);
            let vNorm = new Vec3([normals[0], normals[1], normals[2]]);
            vNorm = wMat.multiplyVec3(vNorm);
            this.normal.values[i * 3] = vNorm.x;
            this.normal.values[i * 3 + 1] = vNorm.y;
            this.normal.values[i * 3 + 2] = vNorm.z;
        }
    }
}
export class BoneLoader {
    constructor(parentId, childrenIds, offset, wmat) {
        this.parent = parentId;
        this.children = childrenIds;
        this.position = wmat.multiplyPt3(new Vec3([0, 0, 0]));
        this.initialPosition = this.position.copy();
        this.endpoint = wmat.multiplyPt3(new Vec3([0, offset, 0]));
        this.initialEndpoint = this.endpoint.copy();
        this.rotation = new Quat().setIdentity();
        this.offset = offset;
        this.initialTransformation = wmat.copy();
    }
}
export class MeshLoader {
    constructor(regularMesh) {
        this.rotation = new Vec3([0, 0, 0]);
        this.name = regularMesh.name;
        let rotMat = new Mat4().setIdentity();
        rotMat.rotate(-1.57, new Vec3([1, 0, 0]));
        rotMat.rotate(0.9, new Vec3([0, 0, 1]));
        this.worldMatrix = rotMat;
        this.geometry = new MeshGeometryLoader(regularMesh.geometry, this.worldMatrix); ///
        this.bones = [];
        this.boneIndices = [];
        this.bonePositions = new Float32Array([]);
        this.boneIndexAttribute = new Float32Array([]);
        let material = regularMesh.material;
        this.materialName = material.name;
    }
    initialize() {
        this.boneIndices = [];
        this.bonePositions = new Float32Array(6 * this.bones.length);
        this.boneIndexAttribute = new Float32Array(2 * this.bones.length);
        this.bones.forEach((bone, index) => {
            this.boneIndices.push(2 * index);
            this.boneIndices.push(2 * index + 1);
            this.boneIndexAttribute[2 * index] = index;
            this.boneIndexAttribute[2 * index + 1] = index;
            this.bonePositions[index * 6] = 0;
            this.bonePositions[index * 6 + 1] = 0;
            this.bonePositions[index * 6 + 2] = 0;
            this.bonePositions[index * 6 + 3] = bone.initialEndpoint.x - bone.initialPosition.x;
            this.bonePositions[index * 6 + 4] = bone.initialEndpoint.y - bone.initialPosition.y;
            this.bonePositions[index * 6 + 5] = bone.initialEndpoint.z - bone.initialPosition.z;
        });
    }
}
class CLoader {
    constructor(location) {
        this.fileLocation = location;
        this.loader = new ColladaLoader();
        this.scene = null;
        this.regularMeshes = [];
        this.meshes = [];
    }
    load(callback) {
        this.loader.load(this.fileLocation, (collada) => {
            console.log("File loaded successfully");
            collada.scene.updateWorldMatrix(true, true);
            console.log(collada);
            this.scene = collada.scene;
            this.findRegularMeshes();
            this.regularMeshes.forEach(m => {
                this.meshes.push(new Mesh(new MeshLoader(m)));
            });
            // getting the images
            let lib = collada.library;
            let mats = lib.materials;
            let imgs = lib.images;
            let effects = lib.effects;
            let matToTexture = new Map();
            for (let property in effects) {
                let matName = "";
                for (let matProp in mats) {
                    if (mats[matProp].url === property) {
                        matName = mats[matProp].name;
                        break;
                    }
                }
                let imgName = "";
                for (let imgProp in effects[property].profile.surfaces) {
                    imgName = effects[property].profile.surfaces[imgProp].init_from;
                }
                let imgSrc = "";
                for (let imgProp in imgs) {
                    if (imgName === imgProp) {
                        imgSrc = imgs[imgProp].init_from;
                        break;
                    }
                }
                if (imgSrc === "" || !imgSrc) {
                    console.log("Image source not found");
                }
                else {
                    matToTexture.set(matName, imgSrc);
                }
                this.meshes.forEach(mesh => {
                    let imgSrc = matToTexture.get(mesh.materialName);
                    if (imgSrc) {
                        mesh.imgSrc = imgSrc;
                    }
                });
            }
            callback();
        }, undefined, (event) => {
            console.error("Loading collada file failed");
            console.error(event);
        });
    }
    findRegularMeshes(element) {
        if (this.scene == null) {
            console.error('Error loading scene');
            throw new Error('Scene was null when finding skinned meshes');
        }
        let objArr;
        if (element) {
            objArr = element.children;
        }
        else {
            objArr = this.scene.children;
        }
        objArr.forEach(child => {
            if (element) {
                child.rotateX(element.rotation.x);
                child.rotateY(element.rotation.y);
                child.rotateZ(element.rotation.z);
            }
            else if (this.scene) {
                child.rotateX(this.scene.rotation.x);
                child.rotateY(this.scene.rotation.y);
                child.rotateZ(this.scene.rotation.z);
            }
            if (child.type === 'Mesh') {
                let mesh = child;
                //let geo = new THREE.EdgesGeometry( mesh.geometry , 1); // or WireframeGeometry
                //var mat = new LineBasicMaterial( { color: 0xffffff } );
                //var wireframe = new LineSegments( geo, mat );
                //mesh.add( wireframe );
                this.regularMeshes.push(mesh);
            }
            else {
                this.findRegularMeshes(child);
            }
        });
    }
}
export { CLoader as CLoader, };
//# sourceMappingURL=AnimationFileLoader.js.map