import { writeFile } from 'node:fs/promises';
import { Group } from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { createManufacturingParts } from '../src/components/manufacturingParts.js';

// GLTFExporter's binary writer uses this small browser API, even without images.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(result => { this.result = result; this.onloadend?.(); });
  }
};
const assembly = new Group();
createManufacturingParts().forEach(part => assembly.add(part));
const glb = await new GLTFExporter().parseAsync(assembly, { binary: true });
const output = new URL('../public/models/manufacturing-parts.glb', import.meta.url);
await writeFile(output, Buffer.from(glb));
console.log(`Built seven manufacturing examples: ${glb.byteLength} bytes`);
