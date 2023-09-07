import { Vec3 } from "../lib/TSM.js";
export class Attribute {
    constructor(attr) {
        this.values = attr.values;
        this.count = attr.count;
        this.itemSize = attr.itemSize;
    }
}
export class MeshGeometry {
    constructor(mesh) {
        this.edges = [];
        this.faces_edges = [];
        this.edges_adj = [];
        this.vertex_adj = [];
        this.edge_angles = [];
        this.position = new Attribute(mesh.position);
        this.normal = new Attribute(mesh.normal);
        if (mesh.uv) {
            this.uv = new Attribute(mesh.uv);
        }
        let index = [];
        for (let i = 0; i < this.position.values.length; i += 9) {
            this.vertex_adj.push([i / 3 + 1, i / 3 + 2]);
            this.vertex_adj.push([i / 3 + 2, i / 3]);
            this.vertex_adj.push([i / 3, i / 3 + 1]);
            const e1 = [i / 3, i / 3 + 1];
            const e2 = [i / 3 + 1, i / 3 + 2];
            const e3 = [i / 3 + 2, i / 3];
            /*
            this.edges.push(e1);
            this.edges_adj.push([i/3+2]);
            this.faces_edges.push(this.edges.length-1);
      
            this.edges.push(e2);
            this.edges_adj.push([i/3]);
            this.faces_edges.push(this.edges.length-1);
      
            this.edges.push(e3);
            this.edges_adj.push([i/3+1]);
            this.faces_edges.push(this.edges.length-1);
            */
            let edge_index = -1;
            edge_index = this.edges.findIndex((element) => {
                return (this.position.values[3 * element[0]] === this.position.values[3 * e1[0]]
                    && this.position.values[3 * element[0] + 1] === this.position.values[3 * e1[0] + 1]
                    && this.position.values[3 * element[0] + 2] === this.position.values[3 * e1[0] + 2]
                    && this.position.values[3 * element[1]] === this.position.values[3 * e1[1]]
                    && this.position.values[3 * element[1] + 1] === this.position.values[3 * e1[1] + 1]
                    && this.position.values[3 * element[1] + 2] === this.position.values[3 * e1[1] + 2]) ||
                    (this.position.values[3 * element[0]] === this.position.values[3 * e1[1]]
                        && this.position.values[3 * element[0] + 1] === this.position.values[3 * e1[1] + 1]
                        && this.position.values[3 * element[0] + 2] === this.position.values[3 * e1[1] + 2]
                        && this.position.values[3 * element[1]] === this.position.values[3 * e1[0]]
                        && this.position.values[3 * element[1] + 1] === this.position.values[3 * e1[0] + 1]
                        && this.position.values[3 * element[1] + 2] === this.position.values[3 * e1[0] + 2]);
            });
            this.edges.push(e1);
            this.edges_adj.push([i / 3 + 2]);
            this.faces_edges.push(this.edges.length - 1);
            this.edge_angles.push(0);
            if (0 <= edge_index) {
                let e = this.edges_adj[edge_index][0];
                this.edges_adj[edge_index].push(i / 3 + 2);
                this.edges_adj[this.edges.length - 1].push(e);
            }
            edge_index = -1;
            edge_index = this.edges.findIndex((element) => {
                return (this.position.values[3 * element[0]] === this.position.values[3 * e2[0]]
                    && this.position.values[3 * element[0] + 1] === this.position.values[3 * e2[0] + 1]
                    && this.position.values[3 * element[0] + 2] === this.position.values[3 * e2[0] + 2]
                    && this.position.values[3 * element[1]] === this.position.values[3 * e2[1]]
                    && this.position.values[3 * element[1] + 1] === this.position.values[3 * e2[1] + 1]
                    && this.position.values[3 * element[1] + 2] === this.position.values[3 * e2[1] + 2]) ||
                    (this.position.values[3 * element[0]] === this.position.values[3 * e2[1]]
                        && this.position.values[3 * element[0] + 1] === this.position.values[3 * e2[1] + 1]
                        && this.position.values[3 * element[0] + 2] === this.position.values[3 * e2[1] + 2]
                        && this.position.values[3 * element[1]] === this.position.values[3 * e2[0]]
                        && this.position.values[3 * element[1] + 1] === this.position.values[3 * e2[0] + 1]
                        && this.position.values[3 * element[1] + 2] === this.position.values[3 * e2[0] + 2]);
            });
            this.edges.push(e2);
            this.edges_adj.push([i / 3]);
            this.faces_edges.push(this.edges.length - 1);
            this.edge_angles.push(0);
            if (0 <= edge_index) {
                let e = this.edges_adj[edge_index][0];
                this.edges_adj[edge_index].push(i / 3);
                this.edges_adj[this.edges.length - 1].push(e);
            }
            edge_index = -1;
            edge_index = this.edges.findIndex((element) => {
                return (this.position.values[3 * element[0]] === this.position.values[3 * e3[0]]
                    && this.position.values[3 * element[0] + 1] === this.position.values[3 * e3[0] + 1]
                    && this.position.values[3 * element[0] + 2] === this.position.values[3 * e3[0] + 2]
                    && this.position.values[3 * element[1]] === this.position.values[3 * e3[1]]
                    && this.position.values[3 * element[1] + 1] === this.position.values[3 * e3[1] + 1]
                    && this.position.values[3 * element[1] + 2] === this.position.values[3 * e3[1] + 2]) ||
                    (this.position.values[3 * element[0]] === this.position.values[3 * e3[1]]
                        && this.position.values[3 * element[0] + 1] === this.position.values[3 * e3[1] + 1]
                        && this.position.values[3 * element[0] + 2] === this.position.values[3 * e3[1] + 2]
                        && this.position.values[3 * element[1]] === this.position.values[3 * e3[0]]
                        && this.position.values[3 * element[1] + 1] === this.position.values[3 * e3[0] + 1]
                        && this.position.values[3 * element[1] + 2] === this.position.values[3 * e3[0] + 2]);
            });
            this.edges.push(e3);
            this.edges_adj.push([i / 3 + 1]);
            this.faces_edges.push(this.edges.length - 1);
            this.edge_angles.push(0);
            if (0 <= edge_index) {
                let e = this.edges_adj[edge_index][0];
                this.edges_adj[edge_index].push(i / 3 + 1);
                this.edges_adj[this.edges.length - 1].push(e);
            }
        }
        for (let i = 0; i < this.position.values.length / 3; i++) {
            for (let j = 0; j < i; j++) {
                if (this.position.values[3 * i] === this.position.values[3 * j]
                    && this.position.values[3 * i + 1] === this.position.values[3 * j + 1]
                    && this.position.values[3 * i + 2] === this.position.values[3 * j + 2]) {
                    let concat = Array.from(new Set(this.vertex_adj[i].concat(this.vertex_adj[j])));
                    this.vertex_adj[i] = concat;
                    this.vertex_adj[j] = concat;
                }
            }
        }
    }
}
export class Bone {
    constructor(bone) {
        this.parent = bone.parent;
        this.children = Array.from(bone.children);
        this.position = bone.position.copy();
        this.endpoint = bone.endpoint.copy();
        this.rotation = bone.rotation.copy();
        this.offset = bone.offset;
        this.initialPosition = bone.initialPosition.copy();
        this.initialEndpoint = bone.initialEndpoint.copy();
        this.initialTransformation = bone.initialTransformation.copy();
    }
}
export class Mesh {
    constructor(mesh) {
        this.edges = []; // each index has two vertex index
        this.edges_adj = []; // each index has two opposite vertex index
        this.faces_edges = []; // three edges index is a faces
        this.vertex_adj = [];
        this.edge_angles = [];
        this.geometry = new MeshGeometry(mesh.geometry);
        this.worldMatrix = mesh.worldMatrix.copy();
        this.rotation = mesh.rotation.copy();
        this.bones = [];
        mesh.bones.forEach(bone => {
            this.bones.push(new Bone(bone));
        });
        this.materialName = mesh.materialName;
        this.imgSrc = null;
        this.boneIndices = Array.from(mesh.boneIndices);
        this.bonePositions = new Float32Array(mesh.bonePositions);
        this.boneIndexAttribute = new Float32Array(mesh.boneIndexAttribute);
        this.positions = this.geometry.position.values;
        this.edges = this.geometry.edges;
        this.faces_edges = this.geometry.faces_edges;
        this.edges_adj = this.geometry.edges_adj;
        this.vertex_adj = this.geometry.vertex_adj;
        this.edge_angles = this.geometry.edge_angles;
        let outlintes = [];
        let index = [];
        let shift = [];
        let localuv = [];
        for (let i = 0; i < this.geometry.position.values.length; i += 9) {
            localuv.push(1.0);
            localuv.push(0.0);
            localuv.push(0.0);
            localuv.push(0.0);
            localuv.push(1.0);
            localuv.push(0.0);
            localuv.push(0.0);
            localuv.push(0.0);
            localuv.push(1.0);
        }
        this.localuv = new Float32Array(localuv);
        this.norms = this.geometry.normal.values;
        this.outlines = outlintes;
        this.index = index;
        this.shift = shift;
    }
    update() {
        let localuv = [];
        let norms = [];
        for (let i = 0; i < this.positions.length; i += 9) {
            localuv.push(1.0);
            localuv.push(0.0);
            localuv.push(0.0);
            localuv.push(0.0);
            localuv.push(1.0);
            localuv.push(0.0);
            localuv.push(0.0);
            localuv.push(0.0);
            localuv.push(1.0);
            let v1 = new Vec3([this.positions[i + 3] - this.positions[i + 0],
                this.positions[i + 4] - this.positions[i + 1],
                this.positions[i + 5] - this.positions[i + 2]]);
            let v2 = new Vec3([this.positions[i + 6] - this.positions[i + 3],
                this.positions[i + 7] - this.positions[i + 4],
                this.positions[i + 8] - this.positions[i + 5]]);
            let norm = Vec3.cross(v1, v2);
            norms.push(norm.x, norm.y, norm.z);
            norms.push(norm.x, norm.y, norm.z);
            norms.push(norm.x, norm.y, norm.z);
        }
        this.localuv = new Float32Array(localuv);
        this.norms = new Float32Array(norms);
        this.edges = [];
        this.faces_edges = [];
        this.edges_adj = [];
        this.vertex_adj = [];
        for (let i = 0; i < this.positions.length; i += 9) {
            console.log(i / 3);
            this.vertex_adj.push([i / 3 + 1, i / 3 + 2]);
            this.vertex_adj.push([i / 3 + 2, i / 3]);
            this.vertex_adj.push([i / 3, i / 3 + 1]);
            const e1 = [i / 3, i / 3 + 1];
            const e2 = [i / 3 + 1, i / 3 + 2];
            const e3 = [i / 3 + 2, i / 3];
            /*
            this.edges.push(e1);
            this.edges_adj.push([i/3+2]);
            this.faces_edges.push(this.edges.length-1);
      
            this.edges.push(e2);
            this.edges_adj.push([i/3]);
            this.faces_edges.push(this.edges.length-1);
      
            this.edges.push(e3);
            this.edges_adj.push([i/3+1]);
            this.faces_edges.push(this.edges.length-1);
            */
            let edge_index = -1;
            edge_index = this.edges.findIndex((element) => {
                return (this.positions[3 * element[0]] === this.positions[3 * e1[0]]
                    && this.positions[3 * element[0] + 1] === this.positions[3 * e1[0] + 1]
                    && this.positions[3 * element[0] + 2] === this.positions[3 * e1[0] + 2]
                    && this.positions[3 * element[1]] === this.positions[3 * e1[1]]
                    && this.positions[3 * element[1] + 1] === this.positions[3 * e1[1] + 1]
                    && this.positions[3 * element[1] + 2] === this.positions[3 * e1[1] + 2]) ||
                    (this.positions[3 * element[0]] === this.positions[3 * e1[1]]
                        && this.positions[3 * element[0] + 1] === this.positions[3 * e1[1] + 1]
                        && this.positions[3 * element[0] + 2] === this.positions[3 * e1[1] + 2]
                        && this.positions[3 * element[1]] === this.positions[3 * e1[0]]
                        && this.positions[3 * element[1] + 1] === this.positions[3 * e1[0] + 1]
                        && this.positions[3 * element[1] + 2] === this.positions[3 * e1[0] + 2]);
            });
            this.edges.push(e1);
            this.edges_adj.push([i / 3 + 2]);
            this.faces_edges.push(this.edges.length - 1);
            if (0 <= edge_index) {
                let e = this.edges_adj[edge_index][0];
                this.edges_adj[edge_index].push(i / 3 + 2);
                this.edges_adj[this.edges.length - 1].push(e);
            }
            edge_index = -1;
            edge_index = this.edges.findIndex((element) => {
                return (this.positions[3 * element[0]] === this.positions[3 * e2[0]]
                    && this.positions[3 * element[0] + 1] === this.positions[3 * e2[0] + 1]
                    && this.positions[3 * element[0] + 2] === this.positions[3 * e2[0] + 2]
                    && this.positions[3 * element[1]] === this.positions[3 * e2[1]]
                    && this.positions[3 * element[1] + 1] === this.positions[3 * e2[1] + 1]
                    && this.positions[3 * element[1] + 2] === this.positions[3 * e2[1] + 2]) ||
                    (this.positions[3 * element[0]] === this.positions[3 * e2[1]]
                        && this.positions[3 * element[0] + 1] === this.positions[3 * e2[1] + 1]
                        && this.positions[3 * element[0] + 2] === this.positions[3 * e2[1] + 2]
                        && this.positions[3 * element[1]] === this.positions[3 * e2[0]]
                        && this.positions[3 * element[1] + 1] === this.positions[3 * e2[0] + 1]
                        && this.positions[3 * element[1] + 2] === this.positions[3 * e2[0] + 2]);
            });
            this.edges.push(e2);
            this.edges_adj.push([i / 3]);
            this.faces_edges.push(this.edges.length - 1);
            if (0 <= edge_index) {
                let e = this.edges_adj[edge_index][0];
                this.edges_adj[edge_index].push(i / 3);
                this.edges_adj[this.edges.length - 1].push(e);
            }
            edge_index = -1;
            edge_index = this.edges.findIndex((element) => {
                return (this.positions[3 * element[0]] === this.positions[3 * e3[0]]
                    && this.positions[3 * element[0] + 1] === this.positions[3 * e3[0] + 1]
                    && this.positions[3 * element[0] + 2] === this.positions[3 * e3[0] + 2]
                    && this.positions[3 * element[1]] === this.positions[3 * e3[1]]
                    && this.positions[3 * element[1] + 1] === this.positions[3 * e3[1] + 1]
                    && this.positions[3 * element[1] + 2] === this.positions[3 * e3[1] + 2]) ||
                    (this.positions[3 * element[0]] === this.positions[3 * e3[1]]
                        && this.positions[3 * element[0] + 1] === this.positions[3 * e3[1] + 1]
                        && this.positions[3 * element[0] + 2] === this.positions[3 * e3[1] + 2]
                        && this.positions[3 * element[1]] === this.positions[3 * e3[0]]
                        && this.positions[3 * element[1] + 1] === this.positions[3 * e3[0] + 1]
                        && this.positions[3 * element[1] + 2] === this.positions[3 * e3[0] + 2]);
            });
            this.edges.push(e3);
            this.edges_adj.push([i / 3 + 1]);
            this.faces_edges.push(this.edges.length - 1);
            if (0 <= edge_index) {
                let e = this.edges_adj[edge_index][0];
                this.edges_adj[edge_index].push(i / 3 + 1);
                this.edges_adj[this.edges.length - 1].push(e);
            }
        }
        for (let i = 0; i < this.positions.length / 3; i++) {
            for (let j = 0; j < i; j++) {
                if (this.positions[3 * i] === this.positions[3 * j]
                    && this.positions[3 * i + 1] === this.positions[3 * j + 1]
                    && this.positions[3 * i + 2] === this.positions[3 * j + 2]) {
                    let concat = Array.from(new Set(this.vertex_adj[i].concat(this.vertex_adj[j])));
                    this.vertex_adj[i] = concat;
                    this.vertex_adj[j] = concat;
                }
            }
        }
    }
    loop_subdivision() {
        // Compute odd vertices
        let evenVertexPositions = new Float32Array(this.positions);
        //for(let i = 0; i < this.edge_angles.length; i++) {
        //  if(this.edge_angles[i] > 0.785){
        //    this.vertex_adj[this.edges[i][0]] = [];
        //    this.vertex_adj[this.edges[i][1]] = [];
        //  }
        //}
        for (let i = 0; i < this.vertex_adj.length; i++) {
            let k = this.vertex_adj[i].length;
            let beta = 0.05;
            let sum = [0, 0, 0];
            for (let j = 0; j < this.vertex_adj[i].length; j++) {
                sum[0] += beta * this.positions[3 * this.vertex_adj[i][j]];
                sum[1] += beta * this.positions[3 * this.vertex_adj[i][j] + 1];
                sum[2] += beta * this.positions[3 * this.vertex_adj[i][j] + 2];
            }
            sum[0] += (1 - k * beta) * this.positions[3 * i];
            sum[1] += (1 - k * beta) * this.positions[3 * i + 1];
            sum[2] += (1 - k * beta) * this.positions[3 * i + 2];
            evenVertexPositions[3 * i] = sum[0];
            evenVertexPositions[3 * i + 1] = sum[1];
            evenVertexPositions[3 * i + 2] = sum[2];
        }
        let newVertexPositions = []; // three index from oddVertex and vertex position
        for (let i = 0; i < this.faces_edges.length; i += 3) {
            let oldVertexpos = [];
            let newVertexpos = [];
            for (let j = 0; j < 3; j++) { // for each of the three edges
                let sum = [0, 0, 0]; // compute new odd positions
                let edge_index = this.faces_edges[i + j];
                if (this.edges_adj[edge_index].length == 2) {
                    for (let k = 0; k < 2; k++) {
                        sum[0] += 3.0 * this.positions[3 * this.edges[edge_index][k]] / 8.0;
                        sum[1] += 3.0 * this.positions[3 * this.edges[edge_index][k] + 1] / 8.0;
                        sum[2] += 3.0 * this.positions[3 * this.edges[edge_index][k] + 2] / 8.0;
                    }
                    for (let k = 0; k < 2; k++) {
                        sum[0] += 1.0 * this.positions[3 * this.edges_adj[edge_index][k]] / 8.0;
                        sum[1] += 1.0 * this.positions[3 * this.edges_adj[edge_index][k] + 1] / 8.0;
                        sum[2] += 1.0 * this.positions[3 * this.edges_adj[edge_index][k] + 2] / 8.0;
                    }
                }
                else {
                    for (let k = 0; k < 2; k++) {
                        sum[0] += this.positions[3 * this.edges[edge_index][k]] / 2.0;
                        sum[1] += this.positions[3 * this.edges[edge_index][k] + 1] / 2.0;
                        sum[2] += this.positions[3 * this.edges[edge_index][k] + 2] / 2.0;
                    }
                }
                newVertexpos.push(sum[0], sum[1], sum[2]);
                oldVertexpos.push(evenVertexPositions[3 * this.edges[edge_index][1]], evenVertexPositions[3 * this.edges[edge_index][1] + 1], evenVertexPositions[3 * this.edges[edge_index][1] + 2]);
            }
            newVertexPositions.push(newVertexpos[0], newVertexpos[1], newVertexpos[2]);
            newVertexPositions.push(oldVertexpos[0], oldVertexpos[1], oldVertexpos[2]);
            newVertexPositions.push(newVertexpos[3], newVertexpos[4], newVertexpos[5]);
            newVertexPositions.push(newVertexpos[3], newVertexpos[4], newVertexpos[5]);
            newVertexPositions.push(oldVertexpos[3], oldVertexpos[4], oldVertexpos[5]);
            newVertexPositions.push(newVertexpos[6], newVertexpos[7], newVertexpos[8]);
            newVertexPositions.push(newVertexpos[6], newVertexpos[7], newVertexpos[8]);
            newVertexPositions.push(oldVertexpos[6], oldVertexpos[7], oldVertexpos[8]);
            newVertexPositions.push(newVertexpos[0], newVertexpos[1], newVertexpos[2]);
            newVertexPositions.push(newVertexpos[0], newVertexpos[1], newVertexpos[2]);
            newVertexPositions.push(newVertexpos[3], newVertexpos[4], newVertexpos[5]);
            newVertexPositions.push(newVertexpos[6], newVertexpos[7], newVertexpos[8]);
        }
        this.positions = new Float32Array(newVertexPositions);
        this.update();
    }
    getpositions() {
        return this.positions;
    }
    getBoneIndices() {
        return new Uint32Array(this.index);
    }
    getBoneshift() {
        return new Float32Array(this.shift);
    }
    getBonePositions() {
        return new Float32Array(this.outlines);
    }
    getBoneIndexAttribute() {
        return this.boneIndexAttribute;
    }
    getBoneTranslations() {
        let trans = new Float32Array(3 * this.bones.length);
        this.bones.forEach((bone, index) => {
            let res = bone.position.xyz;
            for (let i = 0; i < res.length; i++) {
                trans[3 * index + i] = res[i];
            }
        });
        return trans;
    }
    fIndices() {
        let faceCount = this.getpositions().length / 3;
        let fIndices = new Uint32Array(faceCount * 3);
        for (let i = 0; i < faceCount * 3; i += 3) {
            fIndices[i] = i;
            fIndices[i + 1] = i + 1;
            fIndices[i + 2] = i + 2;
        }
        return fIndices;
    }
    getBoneRotations() {
        let trans = new Float32Array(4 * this.bones.length);
        this.bones.forEach((bone, index) => {
            let res = bone.rotation.xyzw;
            for (let i = 0; i < res.length; i++) {
                trans[4 * index + i] = res[i];
            }
        });
        return trans;
    }
}
//# sourceMappingURL=Scene.js.map