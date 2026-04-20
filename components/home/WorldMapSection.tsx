'use client';

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useState } from 'react';

// Data statis untuk marker (contoh)
const markers = [
  { markerOffset: -15, name: 'Laut Cina Selatan', coordinates: [115, 12] as [number, number] },
  { markerOffset: -15, name: 'Ukraina', coordinates: [31, 49] as [number, number] },
  { markerOffset: -15, name: 'Taiwan', coordinates: [121, 23.5] as [number, number] },
];

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

export function WorldMapSection() {
  const [tooltip, setTooltip] = useState('');

  return (
    <section className="container py-12 md:py-16 bg-muted/30">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-3xl font-bold mb-6">Peta Interaktif Analisis Regional</h2>
        <p className="text-muted-foreground mb-8">
          Klik pada marker untuk melihat fokus analisis geopolitik.
        </p>
        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border">
          <ComposableMap projection="geoEqualEarth">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#F53', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle
                  r={8}
                  fill="#F00"
                  stroke="#fff"
                  strokeWidth={2}
                  onMouseEnter={() => setTooltip(name)}
                  onMouseLeave={() => setTooltip('')}
                  style={{ cursor: 'pointer' }}
                />
                {tooltip === name && (
                  <text
                    textAnchor="middle"
                    y={markerOffset}
                    style={{ fontFamily: 'system-ui', fontSize: 12, fill: '#333' }}
                  >
                    {name}
                  </text>
                )}
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    </section>
  );
}
