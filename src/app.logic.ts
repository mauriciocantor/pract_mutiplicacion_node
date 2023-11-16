import fs from "fs";
import {yarg} from "./config/plugins/args.plugin";


let header = '';
let text ="";
const {b,l,s} = yarg;
const base = b;

header = `
=============================
     Tabla del ${base}
============================= \n
`;

const path = 'outputs';
for(let i= 1; i<=(l ); i++){
    let operation = `${base} X ${i} = ${base * i} \n`;
    text += operation;
}
text = header + text;
if (s) console.log(text);

fs.mkdirSync(path, {recursive: true});
fs.writeFileSync(`${path}/tabla-${base}.txt`,text);

console.log('file created!!!');