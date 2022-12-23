import { useEffect, useRef } from "react";
import styles from "./orbit.module.scss";

const Orbit = () => {
  const earth = useRef<SVGCircleElement>(null);
  const venus = useRef<SVGCircleElement>(null);
  const lineGroup = useRef<SVGAElement>(null);

  useEffect(() => {
    if (earth.current && venus.current && lineGroup.current) {
      let i = 0;
      const earthDeg = 5,
        earthOrbits = 8,
        venusOrbits = 13,
        resonance = earthOrbits / venusOrbits,
        centre = 250,
        earthDist = centre - parseInt(earth.current.getAttribute("cy"), 10),
        venusDist = centre - parseInt(venus.current.getAttribute("cy"), 10);
      const orbitals = setInterval(function () {
        earth.current.setAttribute(
          "transform",
          "rotate(" + i + " " + centre + " " + centre + ")"
        );
        venus.current.setAttribute(
          "transform",
          "rotate(" + i / resonance + " " + centre + " " + centre + ")"
        );
        const earthX = Math.cos((i * Math.PI) / 180) * earthDist + centre,
          earthY = Math.sin((i * Math.PI) / 180) * earthDist + centre,
          venusX =
            Math.cos(((i / (earthOrbits / 13)) * Math.PI) / 180) * venusDist +
            centre,
          venusY =
            Math.sin(((i / (earthOrbits / 13)) * Math.PI) / 180) * venusDist +
            centre,
          resLine = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );

        resLine.setAttribute("x1", earthX.toString());
        resLine.setAttribute("y1", earthY.toString());
        resLine.setAttribute("x2", venusX.toString());
        resLine.setAttribute("y2", venusY.toString());
        resLine.setAttribute("stroke", "hsla(" + i + ", 50%, 50%, 0.5)");
        lineGroup.current.appendChild(resLine);

        i += earthDeg;
        if (i == 360 * earthOrbits + earthDeg) clearInterval(orbitals);
      }, 60);
    }
  }, []);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={styles.svg_orbit}
    >
      <g id="orbits" className={styles.orbits}>
        <circle id="venusorbit" cx="250" cy="250" r="120" />
        <circle
          id="earthorbit"
          cx="250"
          cy="250"
          r="165"
          fill="white"
          strokeWidth={1}
        />
      </g>
      <g
        ref={lineGroup}
        id="lineGroup"
        className={styles.lineGroup}
        transform="rotate(-90 250 250)"
      />
      <circle
        ref={earth}
        id="earth"
        className={styles.earth}
        cx="250"
        cy="85"
        r="8"
      />
      <circle
        ref={venus}
        id="venus"
        className={styles.venus}
        cx="250"
        cy="130"
        r="5"
      />
      <circle className={styles.sol} id="sol" cx="250" cy="250" r="16" />
    </svg>
  );
};

export default Orbit;
