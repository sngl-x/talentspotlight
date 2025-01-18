import React from "react";

interface RadarDataPoint {
  category: string;
  value: number;
}

const RadarChart: React.FC<{ data: RadarDataPoint[]; size: number; maxValue: number }> = ({
  data,
  size,
  maxValue,
}) => {
  const center = size / 2;
  const radius = size / 2 - 40;
  const angleStep = (2 * Math.PI) / data.length;

  const points = data.map((point, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (point.value / maxValue) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  });

  const quadrantLabels = [
    { text: "Leadership", x: center - radius - 60, y: center - radius - 20 },
    { text: "People", x: center + radius + 20, y: center - radius - 20 },
    { text: "Competence & Learning", x: center + radius + 20, y: center + radius + 40 },
    { text: "Transparency & Communication", x: center - radius - 100, y: center + radius + 40 },
  ];

  const categoryColors = [
    { start: 0, end: 2, color: "rgba(255, 215, 0, 0.2)" }, // Leadership (yellow)
    { start: 2, end: 4, color: "rgba(0, 191, 255, 0.2)" }, // People (blue)
    { start: 4, end: 6, color: "rgba(255, 165, 0, 0.2)" }, // Transparency (orange)
    { start: 6, end: 8, color: "rgba(138, 43, 226, 0.2)" }, // Competence (purple)
  ];

  return (
    <svg width={size} height={size}>
      {/* Background Shading for Quadrants */}
      {categoryColors.map((segment, index) => (
        <path
          key={index}
          d={`M${center},${center} ${points[segment.start]} ${
            points[segment.end - 1]
          } Z`}
          fill={segment.color}
        />
      ))}

      {/* Grid Circles */}
      {[...Array(maxValue)].map((_, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={(radius / maxValue) * (i + 1)}
          fill="none"
          stroke="#ccc"
        />
      ))}

      {/* Axes */}
      {data.map((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return <line key={index} x1={center} y1={center} x2={x} y2={y} stroke="#ccc" />;
      })}

      {/* Category Labels */}
      {data.map((point, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = center + (radius + 20) * Math.cos(angle);
        const y = center + (radius + 20) * Math.sin(angle);
        return (
          <text
            key={index}
            x={x}
            y={y}
            fontSize="12"
            textAnchor="middle"
            fill="#333"
          >
            {point.category}
          </text>
        );
      })}

      {/* Quadrant Labels */}
      {quadrantLabels.map((label, index) => (
        <text
          key={index}
          x={label.x}
          y={label.y}
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          fill="#333"
        >
          {label.text}
        </text>
      ))}

      {/* Data Polygon */}
      <polygon points={points.join(" ")} fill="rgba(0, 123, 255, 0.5)" stroke="#007bff" />
    </svg>
  );
};

export default RadarChart;
