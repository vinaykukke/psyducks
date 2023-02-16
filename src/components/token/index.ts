import {
  circle,
  triangle,
  square,
  hexagon,
  chaos,
  coil,
  spiral,
  blur,
  flurry,
  twinkle,
  scales,
  rainbow,
  gyrateHexagon,
  gyrateSquare,
  gyrateTriangle,
  gyrateHexagonFlower,
} from "./shapes";
import { random } from "./helpers/getRandom";

enum SHAPES {
  circle = "circle",
  triangle = "triangle",
  square = "square",
  hexagon = "hexagon",
  chaos = "chaos",
  chaosThick = "chaosThick",
  coil = "coil",
  spiral = "spiral",
  blur = "blur",
  flurry = "flurry",
  twinkle = "twinkle",
  scales = "scales",
  rainbow = "rainbow",
  gyrateHexagon = "gyrateHexagon",
  gyrateHexagonFlower = "gyrateHexagonFlower",
  gyrateTriangle = "gyrateTriangle",
  gyrateSquare = "gyrateSquare",
}

const pattern = () => {
  let shape: string;

  switch (random(SHAPES)) {
    case SHAPES.circle:
      shape = circle();
      break;

    case SHAPES.triangle:
      shape = triangle();
      break;

    case SHAPES.square:
      shape = square();
      break;

    case SHAPES.hexagon:
      shape = hexagon();
      break;

    case SHAPES.chaos:
      shape = chaos();
      break;

    case SHAPES.coil:
      shape = coil();
      break;

    case SHAPES.spiral:
      shape = spiral();
      break;

    case SHAPES.blur:
      shape = blur();
      break;

    case SHAPES.flurry:
      shape = flurry();
      break;

    case SHAPES.twinkle:
      shape = twinkle();
      break;

    case SHAPES.scales:
      shape = scales();
      break;

    case SHAPES.rainbow:
      shape = rainbow();
      break;

    case SHAPES.gyrateHexagon:
      shape = gyrateHexagon();
      break;

    case SHAPES.gyrateHexagonFlower:
      shape = gyrateHexagonFlower();
      break;

    case SHAPES.gyrateSquare:
      shape = gyrateSquare();
      break;

    case SHAPES.gyrateTriangle:
      shape = gyrateTriangle();
      break;

    default:
      shape = hexagon();
      break;
  }

  return shape;
};

const nft = () => Buffer.from(pattern()).toString("base64");

export default nft;
