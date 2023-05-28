import { useState } from "react";
import ColorThief from "../node_modules/colorthief/dist/color-thief.mjs";

const colorThief = new ColorThief();
console.log(colorThief.getColor);

export function App() {
  const [backgroundColor, setBackgroundColor] = useState("rgb(255,255,255)");

  function handleImageLoad(e: React.MouseEvent) {
    console.log(e.target);
    if (!e.target) return;
    const colorThief = new ColorThief();
    const colors = colorThief.getPalette(e.target, 3) ?? [];
    while (colors.length < 3) {
      // Push a white color as default
      colors.push([255, 255, 255]);
    }
    setBackgroundColor(
      `linear-gradient(rgb(255,255,255), rgb(${colors[0][0]},${colors[0][1]},${colors[0][2]}), rgb(${colors[1][0]},${colors[1][1]},${colors[1][2]}), rgb(${colors[2][0]},${colors[2][1]},${colors[2][2]}))`
    );
  }

  function handleMouseLeave() {
    setBackgroundColor(
      "linear-gradient(rgb(255,255,255), rgb(255,255,255), rgb(255,255,255), rgb(255,255,255))"
    );
  }

  return (
    <div
      className="h-full w-full flex items-center justify-center "
      style={{ background: backgroundColor }}
    >
      <div className="grid gap-20 grid-cols-3 cursor-pointer">
        {new Array(3).fill(0).map((_, index) => {
          const imgSrc = `https://picsum.photos/800/80${index}`;
          return (
            <img
              style={{ height: "400px" }}
              key={index}
              alt="图片"
              src={imgSrc}
              onMouseEnter={handleImageLoad}
              onMouseLeave={handleMouseLeave}
              crossOrigin="anonymous" // 添加这个属性
            />
          );
        })}
      </div>
    </div>
  );
}
