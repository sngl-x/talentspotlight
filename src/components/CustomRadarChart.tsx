"use client";

import React from "react";

interface DataPoint {
  category: string;
  value: number;
}

interface RadarChartProps {
  data: DataPoint[];
  size?: number;
  maxValue?: number;
}

const CustomRadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 400,
  maxValue = 5,
}) => {
  const center = size / 2;
  const radius = center - 40; // Padding for labels
  const angleStep = (2 * Math.PI) / data.length;

  const drawGrid = () => {
    const grid = [];
    for (let i = 1; i <= maxValue; i++) {
      const r = (radius / maxValue) * i;
      grid.push(
        <circle
          key={i}
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="#ddd"
        />
      );
    }
    return grid;
  };

  const drawQuadrants = () => {
    return data.map((point, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const nextAngle = angleStep * (index + 1) - Math.PI / 2;

      const startRadius = radius * (point.value / maxValue);
      const x1 = center + startRadius * Math.cos(angle);
      const y1 = center + startRadius * Math.sin(angle);
      const x2 = center + startRadius * Math.cos(nextAngle);
      const y2 = center + startRadius * Math.sin(nextAngle);

      return (
        <path
          key={index}
          d={`M${center},${center} L${x1},${y1} A${startRadius},${startRadius} 0 0,1 ${x2},${y2} Z`}
          fill={getColor(index)}
          stroke="none"
        />
      );
    });
  };

  const drawLabels = () => {
    return data.map((point, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const labelRadius = radius + 30; // Offset for label placement
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);

      return (
        <text
          key={index}
          x={x}
          y={y}
          fontSize="14"
          fontWeight="bold"
          textAnchor={x > center ? "start" : "end"} // Horizontal alignment
          alignmentBaseline={y > center ? "hanging" : "baseline"} // Vertical alignment
          fill="#333"
        >
          {point.category}
        </text>
      );
    });
  };

  const drawAxes = () => {
    return data.map((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      return (
        <line
          key={index}
          x1={center}
          y1={center}
          x2={x}
          y2={y}
          stroke="#ddd"
        />
      );
    });
  };

  const getColor = (index: number) => {
    const colors = ["#FFDDC1", "#FFD3E8", "#D9E8FF", "#B2FFDA", "#FFF3B2"];
    return colors[index % colors.length];
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`-50 -50 ${size + 100} ${size + 100}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Draw grid */}
      {drawGrid()}

      {/* Draw axes */}
      {drawAxes()}

      {/* Draw quadrants */}
      {drawQuadrants()}

      {/* Draw labels */}
      {drawLabels()}
    </svg>
  );
};

export default CustomRadarChart;
