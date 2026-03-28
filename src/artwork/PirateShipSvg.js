/**
 * PirateShipContent — all SVG drawing elements for the pirate ship.
 * Must be rendered INSIDE an <Svg> element (not standalone).
 * viewBox of the parent Svg should be "0 0 400 500".
 *
 * PirateShipSvg — full standalone ship component for reference/preview use.
 */
import React from 'react';
import Svg, {
  Defs, LinearGradient, Stop,
  Rect, Circle, Path, Polygon, Line, Ellipse, G, Text,
} from 'react-native-svg';

// Unique id suffix to avoid gradient ID collisions when multiple Svgs are on screen
export function PirateShipContent({ idSuffix = 'main' }) {
  const skyId = `sky_${idSuffix}`;
  const seaId = `sea_${idSuffix}`;

  return (
    <>
      <Defs>
        <LinearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#5BC8F5" />
          <Stop offset="1" stopColor="#C8EDFF" />
        </LinearGradient>
        <LinearGradient id={seaId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1E88E5" />
          <Stop offset="1" stopColor="#0D47A1" />
        </LinearGradient>
      </Defs>

      {/* ── Sky ── */}
      <Rect x="0" y="0" width="400" height="310" fill={`url(#${skyId})`} />

      {/* ── Sun ── */}
      <Circle cx="355" cy="58" r="38" fill="#FFD600" />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 355 + Math.cos(rad) * 44;
        const y1 = 58 + Math.sin(rad) * 44;
        const x2 = 355 + Math.cos(rad) * 58;
        const y2 = 58 + Math.sin(rad) * 58;
        return (
          <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
        );
      })}

      {/* ── Clouds ── */}
      <G>
        <Ellipse cx="55" cy="70" rx="38" ry="22" fill="white" />
        <Ellipse cx="85" cy="58" rx="30" ry="20" fill="white" />
        <Ellipse cx="25" cy="64" rx="24" ry="16" fill="white" />
      </G>
      <G>
        <Ellipse cx="195" cy="45" rx="32" ry="18" fill="white" />
        <Ellipse cx="220" cy="35" rx="25" ry="16" fill="white" />
        <Ellipse cx="170" cy="42" rx="20" ry="14" fill="white" />
      </G>

      {/* ── Ocean ── */}
      {/* Main sea body */}
      <Rect x="0" y="305" width="400" height="195" fill={`url(#${seaId})`} />
      {/* Wave 1 */}
      <Path
        d="M0,305 Q50,290 100,305 Q150,320 200,305 Q250,290 300,305 Q350,320 400,305 L400,330 L0,330 Z"
        fill="#29B6F6"
        opacity="0.7"
      />
      {/* Wave 2 */}
      <Path
        d="M0,330 Q60,315 120,330 Q180,345 240,330 Q300,315 360,330 Q380,335 400,330 L400,355 L0,355 Z"
        fill="#0288D1"
        opacity="0.6"
      />
      {/* Foam flecks */}
      <Ellipse cx="80" cy="310" rx="14" ry="5" fill="white" opacity="0.6" />
      <Ellipse cx="240" cy="308" rx="12" ry="4" fill="white" opacity="0.5" />
      <Ellipse cx="350" cy="312" rx="10" ry="4" fill="white" opacity="0.6" />

      {/* ── Ship Hull ── */}
      <Rect x="40" y="290" width="320" height="165" rx="22" ry="22" fill="#6D3A1F" />
      {/* Hull highlight (lighter top edge) */}
      <Rect x="40" y="290" width="320" height="18" rx="10" ry="10" fill="#8B4513" />
      {/* Hull underside / keel */}
      <Path d="M60,455 Q200,475 340,455 L320,455 Q200,465 80,455 Z" fill="#4A2510" />

      {/* ── Deck (top rail) ── */}
      <Rect x="44" y="284" width="312" height="16" rx="8" ry="8" fill="#A0522D" />
      {/* Rail pickets */}
      {[70, 110, 150, 190, 230, 270, 310].map((x, i) => (
        <Rect key={i} x={x} y="272" width="8" height="28" rx="3" fill="#8B4513" />
      ))}
      {/* Top rail bar */}
      <Rect x="44" y="268" width="312" height="10" rx="5" fill="#A0522D" />

      {/* ── Portholes ── */}
      {[110, 200, 290].map((cx, i) => (
        <G key={i}>
          <Circle cx={cx} cy="355" r="18" fill="#3E2723" />
          <Circle cx={cx} cy="355" r="13" fill="#1A1A2E" />
          <Circle cx={cx - 4} cy="349" r="4" fill="#4FC3F7" opacity="0.5" />
        </G>
      ))}

      {/* ── Cannons ── */}
      {[110, 290].map((cx, i) => (
        <G key={i}>
          <Rect x={cx - 22} y="368" width="44" height="18" rx="9" fill="#757575" />
          <Circle cx={cx + (i === 0 ? 20 : -20)} cy="377" r="9" fill="#616161" />
          <Rect x={cx - 30} y="371" width="12" height="12" rx="2" fill="#5D4037" />
        </G>
      ))}

      {/* ── Main Mast ── */}
      <Rect x="188" y="72" width="14" height="220" rx="4" fill="#5D4037" />
      {/* Cross beam */}
      <Rect x="130" y="110" width="130" height="10" rx="4" fill="#6D4C41" />
      {/* Small crow's nest */}
      <Rect x="174" y="96" width="42" height="24" rx="6" fill="#8D6E63" />

      {/* ── Fore Mast ── */}
      <Rect x="305" y="120" width="10" height="170" rx="3" fill="#5D4037" />
      {/* Fore cross beam */}
      <Rect x="272" y="155" width="76" height="8" rx="3" fill="#6D4C41" />

      {/* ── Main Sail ── */}
      <Polygon
        points="135,120 325,120 310,278 150,278"
        fill="#FFFFF0"
        stroke="#D4C5A9"
        strokeWidth="2"
      />
      {/* Sail shadow/crease lines */}
      <Line x1="195" y1="122" x2="188" y2="276" stroke="#D4C5A9" strokeWidth="1.5" opacity="0.7" />
      <Line x1="255" y1="122" x2="262" y2="276" stroke="#D4C5A9" strokeWidth="1.5" opacity="0.7" />

      {/* Skull on main sail */}
      <G>
        {/* Skull head */}
        <Circle cx="222" cy="182" r="22" fill="#1A1A1A" />
        {/* Skull eye sockets */}
        <Circle cx="215" cy="178" r="6" fill="#FFFFF0" />
        <Circle cx="229" cy="178" r="6" fill="#FFFFF0" />
        {/* Skull nose */}
        <Path d="M219,188 L222,193 L225,188 Z" fill="#1A1A1A" />
        {/* Skull teeth */}
        <Rect x="212" y="194" width="6" height="7" rx="1" fill="#FFFFF0" />
        <Rect x="219" y="194" width="6" height="7" rx="1" fill="#FFFFF0" />
        <Rect x="226" y="194" width="6" height="7" rx="1" fill="#FFFFF0" />
        {/* Crossbones */}
        <Line x1="198" y1="215" x2="246" y2="240" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
        <Line x1="246" y1="215" x2="198" y2="240" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
        <Circle cx="196" cy="213" r="8" fill="#1A1A1A" />
        <Circle cx="248" cy="213" r="8" fill="#1A1A1A" />
        <Circle cx="196" cy="242" r="8" fill="#1A1A1A" />
        <Circle cx="248" cy="242" r="8" fill="#1A1A1A" />
      </G>

      {/* ── Jolly Roger Flag ── */}
      <Rect x="188" y="48" width="58" height="36" rx="3" fill="#1A1A1A" />
      {/* Mini skull on flag */}
      <Circle cx="210" cy="62" r="8" fill="#FFFFF0" />
      <Circle cx="207" cy="60" r="2.5" fill="#1A1A1A" />
      <Circle cx="213" cy="60" r="2.5" fill="#1A1A1A" />
      <Line x1="203" y1="72" x2="220" y2="78" stroke="#FFFFF0" strokeWidth="3" strokeLinecap="round" />
      <Line x1="220" y1="72" x2="203" y2="78" stroke="#FFFFF0" strokeWidth="3" strokeLinecap="round" />
      {/* Flag pole top */}
      <Circle cx="188" cy="44" r="5" fill="#FFD600" />

      {/* ── Fore Sail ── */}
      <Polygon
        points="278,163 378,163 368,285 272,285"
        fill="#FFFFF0"
        stroke="#D4C5A9"
        strokeWidth="2"
        opacity="0.95"
      />
      {/* Small cross on fore sail */}
      <Line x1="325" y1="185" x2="325" y2="265" stroke="#D4C5A9" strokeWidth="2" opacity="0.6" />
      <Line x1="300" y1="215" x2="350" y2="215" stroke="#D4C5A9" strokeWidth="2" opacity="0.6" />

      {/* ── Bow Decoration ── */}
      <Path
        d="M40,350 Q20,340 18,310 Q16,295 40,292"
        stroke="#FFB300"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx="18" cy="306" r="7" fill="#FFB300" />

      {/* ── Stern Decoration ── */}
      <Path
        d="M360,350 Q382,340 383,315 Q384,295 360,290"
        stroke="#FFB300"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <Rect x="352" y="300" width="32" height="22" rx="4" fill="#FFD600" />
      <Text x="355" y="315" fontSize="10" fill="#8B4513" fontWeight="bold">ARR</Text>

      {/* ── Anchor ── */}
      <G>
        <Circle cx="200" cy="420" r="12" fill="none" stroke="#9E9E9E" strokeWidth="5" />
        <Line x1="200" y1="408" x2="200" y2="440" stroke="#9E9E9E" strokeWidth="5" strokeLinecap="round" />
        <Line x1="184" y1="440" x2="216" y2="440" stroke="#9E9E9E" strokeWidth="5" strokeLinecap="round" />
        <Line x1="184" y1="428" x2="192" y2="440" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
        <Line x1="216" y1="428" x2="208" y2="440" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
        <Rect x="192" y="403" width="16" height="9" rx="3" fill="#9E9E9E" />
      </G>

      {/* ── Rope coil decoration on deck ── */}
      <Circle cx="155" cy="285" r="9" fill="none" stroke="#A0522D" strokeWidth="4" />
      <Circle cx="155" cy="285" r="4" fill="#8B4513" />

      {/* ── Small flag on fore mast ── */}
      <Polygon points="310,120 340,130 310,140" fill="#FF1744" />
    </>
  );
}

export default function PirateShipSvg({ width = 400, height = 500, style }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid meet"
      style={style}
    >
      <PirateShipContent idSuffix="preview" />
    </Svg>
  );
}
