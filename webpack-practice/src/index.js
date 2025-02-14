// index.js
import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

// Default import the image that we packed through webpack
import odinImage from "./odin.png";
   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);
