/**
 * Generate static SEO pages for each project
 * Run after build: node scripts/generate-project-pages.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const projectsDir = path.join(distDir, 'projects');

// Project data (mirrored from src/lib/data.ts)
const projects = [
  {
    id: "field-of-instruments",
    title: "Field of Instruments",
    subtitle: "La Défense, Paris",
    description: "Public installation composed of 21 metallic sound instruments distributed across an open urban space. Each instrument responds to touch, scraping, and percussive gestures, producing sound through tuned physical interactions.",
  },
  {
    id: "audi-city-lab",
    title: "Fifth Ring",
    subtitle: "Milan Design Week",
    description: "Interactive installation that treats architecture as a responsive instrument. Piazza del Quadrilatero in Milan is temporarily flooded with a shallow layer of water, transforming the ground into a reflective surface and a medium for interaction.",
  },
  {
    id: "city-of-plants",
    title: "City of Plants",
    subtitle: "Venice Biennale",
    description: "Interactive installation that brings plants, humans, and algorithms into a shared sensory system. The work consists of three enclosed spheres, each hosting a living plant ecosystem.",
  },
  {
    id: "post-post",
    title: "Post Post",
    subtitle: "Jerusalem",
    description: "Site-specific interactive installation that reconfigures a public square as a space for collective play and composition. A series of colored postal boxes are transformed into continuous tactile interfaces.",
  },
  {
    id: "venice-biennale-2023",
    title: "BelMondo Tracks",
    subtitle: "Venice Biennale",
    description: "A project documenting the BelMondo Tracks initiative in Calabria's abandoned Belmonte castle garden. The work combines light architectural interventions and interactive sound furniture.",
  },
  {
    id: "plaid-elex",
    title: "ELEX",
    subtitle: "Music video with Plaid",
    description: "Music collaboration between Bruno Zamborlin and Plaid (Warp Records). An exploration of sound and visual interaction.",
  },
  {
    id: "garden-of-moments",
    title: "Garden of Moments",
    subtitle: "AlUla",
    description: "Multisensory installation situated in the desert landscape of Al Ula. At its center stands a semi-spherical sculptural structure whose surface integrates tactile textures designed to be touched and explored.",
  },
  {
    id: "airplane-instrument",
    title: "Aircraft as Instrument",
    subtitle: "Moscow",
    description: "Soviet airplane Yak-42 became the biggest music instrument in this music video for singer-songwriter Jekka.",
  },
  {
    id: "plaid-35-summers",
    title: "35 Summers (live)",
    subtitle: "Performance with Plaid",
    description: "Performing 35 Summers live at the London RoundHouse for Imogen Heap's Reverb festival.",
  },
  {
    id: "mazda",
    title: "Automotive as Instrument",
    subtitle: "Commercial work",
    description: "Playing a Mazda car. Commercial video and interactive installation for SXSW.",
  },
  {
    id: "plaid-diana",
    title: "Diana (live)",
    subtitle: "Performance with Plaid",
    description: "Performable sound sculpture, featured as part of MTV Digital Days at Galleria di Diana, Venaria Palace, Turin.",
  },
  {
    id: "mogees-pro",
    title: "Mogees Pro",
    subtitle: "Product",
    description: "Mogees was a hardware sensor and companion app developed between 2013 and 2017 to turn any physical surface into a playable musical instrument.",
  },
  {
    id: "mogees-play",
    title: "Mogees Play",
    subtitle: "Product",
    description: "Mogees was a hardware sensor and companion app developed between 2013 and 2017 to turn any physical surface into a playable musical instrument.",
  },
  {
    id: "mogees-apps",
    title: "Mogees Apps",
    subtitle: "Product",
    description: "Mogees was a hardware sensor and companion app developed between 2013 and 2017 to turn any physical surface into a playable musical instrument.",
  },
  {
    id: "playing-stove",
    title: "Stove as Instrument",
    subtitle: "London",
    description: "Demonstration project exploring how a domestic cooking surface can function as a musical interface using vibration sensing and real-time signal analysis.",
  },
];

const generateHTML = (project) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>${project.title} | Bruno Zamborlin</title>
  <meta name="description" content="${project.description}">

  <meta property="og:title" content="${project.title} | Bruno Zamborlin">
  <meta property="og:description" content="${project.description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://brunozamborlin.net/projects/${project.id}.html">
  <meta property="og:image" content="https://brunozamborlin.net/opengraph.jpg">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${project.title} | Bruno Zamborlin">
  <meta name="twitter:description" content="${project.description}">
  <meta name="twitter:image" content="https://brunozamborlin.net/opengraph.jpg">

  <link rel="canonical" href="https://brunozamborlin.net/projects/${project.id}.html">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "${project.title}",
    "description": "${project.description}",
    "author": {
      "@type": "Person",
      "name": "Bruno Zamborlin",
      "url": "https://brunozamborlin.net"
    },
    "url": "https://brunozamborlin.net/projects/${project.id}.html"
  }
  </script>

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
      background: #000;
      color: #fff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .container {
      max-width: 800px;
      text-align: center;
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-size: 1rem;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2rem;
    }
    .description {
      font-size: 1.125rem;
      line-height: 1.7;
      color: rgba(255,255,255,0.8);
      margin-bottom: 3rem;
    }
    .cta {
      display: inline-block;
      padding: 1rem 2rem;
      background: #fff;
      color: #000;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: opacity 0.2s;
    }
    .cta:hover { opacity: 0.8; }
    .back {
      margin-top: 1rem;
      display: inline-block;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      font-size: 0.875rem;
    }
    .back:hover { color: #fff; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${project.title}</h1>
    <p class="subtitle">${project.subtitle}</p>
    <p class="description">${project.description}</p>
    <a href="/?project=${project.id}" class="cta">View Project</a>
    <br>
    <a href="/" class="back">← Back to Portfolio</a>
  </div>
</body>
</html>`;

// Create projects directory
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Generate HTML for each project
projects.forEach(project => {
  const html = generateHTML(project);
  const filePath = path.join(projectsDir, `${project.id}.html`);
  fs.writeFileSync(filePath, html);
  console.log(`Generated: projects/${project.id}.html`);
});

console.log(`\n✓ Generated ${projects.length} project pages`);
