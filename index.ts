import { APCAcontrast, sRGBtoY } from "apca-w3";
import { colorParsley } from "colorparsley";

const whiteY = sRGBtoY([255, 255, 255]);
const blackY = sRGBtoY([0, 0, 0]);

const setColor = (header: HTMLHeadingElement, input: HTMLInputElement) => {
  const bgColor = input.value;
  header.style.setProperty("--background-color", bgColor);
  const yBgColor = sRGBtoY(colorParsley(bgColor));
  const whiteContrast = Math.abs(APCAcontrast(whiteY, yBgColor) as number);
  const blackContrast = Math.abs(APCAcontrast(blackY, yBgColor) as number);
  header.style.setProperty(
    "--text-color",
    whiteContrast > blackContrast ? "white" : "black"
  );
};

window.addEventListener("load", () => {
  const colorInput: HTMLInputElement | null = document.querySelector(".picker");
  const header = document.querySelector("h1");

  if (!colorInput || !header) return;

  colorInput.addEventListener("input", (e) => setColor(header, colorInput));
  setColor(header, colorInput);
});
