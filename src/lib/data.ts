import audiVideo from "@assets/minigifs/audi-city-lab-miniloop.mp4";
import biennaleVideo from "@assets/minigifs/venice-biennale-2023-miniloop.mp4";
import cityOfPlantsVideo from "@assets/minigifs/city-of-plants-miniloop.mp4";
import gardenOfMomentsVideo from "@assets/minigifs/garden-of-moments-miniloop.mp4";
import plaidElexVideo from "@assets/minigifs/plaid-elex-miniloop.mp4";
import jekkaVideo from "@assets/minigifs/airplane-instrument-miniloop.mp4";
import postpostVideo from "@assets/minigifs/post-post-miniloop.mp4";
import tedVideo from "@assets/minigifs/tedx-sf-miniloop.mp4";
import summerVideo from "@assets/minigifs/plaid-35-summers-miniloop.mp4";
import mazdaVideo from "@assets/minigifs/mazda-miniloop.mp4";
import dianaVideo from "@assets/minigifs/plaid-diana-miniloop.mp4";
import stoveVideo from "@assets/minigifs/playing-stove-miniloop.mp4";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: "Art/Performances" | "Installations" | "Technology";
  videoUrl: string;
  description: string;
  credits?: string;
  thumbnailVideo?: string;
  thumbnailImage?: string;
}

export const projects: Project[] = [
  {
    id: "city-of-plants",
    title: "City of Plants – Venice Biennale 2025",
    location: "Venice",
    category: "Art/Performances",
    videoUrl: "local:city-of-plants",
    description: "An interactive installation by MAD Architects and Bruno Zamborlin that merges natural, human, and artificial intelligence into a single living ecosystem of sound and light. The work integrates real plants with environmental sensors, LED systems, and visitor interaction to create an evolving ambient composition where plant biofeedback, human movement, and algorithmic processes are translated into synchronized sound and visual responses. The installation proposes a shared intelligence system where plants, humans, and AI linked through a common language of vibrations, data, and perception create a co-creative environment. Visitor footsteps trigger musical tones that harmonize with plant-generated drones, making human presence part of an integrated ecological soundscape rather than an external disruption.",
    thumbnailVideo: cityOfPlantsVideo
  },
  {
    id: "audi-city-lab",
    title: "Audi City Lab",
    location: "Milan",
    category: "Installations",
    videoUrl: "local:audi-city-lab",
    description: "Spaces as living entities. An artistic installation in Milan's Piazza del Quadrilatero featuring water flooding the space and transforming it into a liquid mirror. The installation uses innovative sensors by Bruno Zamborlin to capture human movement and translate it into sound waves, creating an interactive musical experience where visitors become part of the artwork. Every step, every movement on the walkway becomes an artistic expression creating an immersive and collective experience that blurs the line between spectator and artwork. Features include water flooding creating reflective surfaces, interactive sensor technology responding to movement and touch, sound generation synchronized with visitor interaction, ring of light that pulses with movement, four cars on display functioning as instruments, reflections on water synchronized with activity. Collaboration with MAD architects.",
    thumbnailVideo: audiVideo
  },
  {
    id: "garden-of-moments",
    title: "Garden of Moments",
    location: "Al Ula",
    category: "Installations",
    videoUrl: "local:garden-of-moments",
    description: "Synesthetic Touch: Feel the World in Sound and Light. A multisensory installation situated in Al Ula's desert featuring a semispherical interactive sculpture with textured surfaces that engage sight, sound, and touch. Eight surrounding seats function as interactive instruments, facilitating collaboration, dialogue, and deep listening.",
    credits: "Designer/Producer: Balich Wonder Studio. Creative Direction/Design: Marco Klefisch. Interaction & Sound Design: Bruno Zamborlin. Music Composition: Michele Tadini. Lighting Design: D'alesio & Santoro.",
    thumbnailVideo: gardenOfMomentsVideo
  },
  {
    id: "post-post",
    title: "Post post",
    location: "Jerusalem",
    category: "Installations",
    videoUrl: "local:post-post",
    description: "Spaces as Playgrounds. The Post Post installation reimagines an entire square as a canvas for collective creativity and play. Here, iconic coloured letterboxes becomes vibrant, interactive instruments. The installation invites visitors to touch interactive letterboxes that trigger colored light displays on a postal office facade, creating real-time sound and light compositions. The work emphasizes community building, collective music creation, and active listening as central themes.",
    credits: "Collaborators: Yuvi Gerstein & Shuli Oded",
    thumbnailVideo: postpostVideo
  },
  {
    id: "venice-biennale-2023",
    title: "Venice Biennale 2023",
    location: "Venice",
    category: "Art/Performances",
    videoUrl: "https://www.youtube.com/watch?v=EOGTSC-pW5w",
    description: "A project documenting the BelMondo Tracks initiative in Calabria's abandoned Belmonte castle garden. The work combines light architectural interventions and the creation of interactive sound furniture to encourage community listening and engagement. Vibrations from revitalization activities were transformed into musical instruments for the installation. Partnership with Orizzontale architecture. Music composition by Michele Tadini. Interactive installation at Italian Pavilion featuring a living room with vibration sensors. Explores relational practices and digital tools with a view to playfulness and active listening.",
    thumbnailVideo: biennaleVideo
  },
  {
    id: "airplane-instrument",
    title: "Airplane as a musical instrument",
    location: "Moscow",
    category: "Technology",
    videoUrl: "local:airplane-instrument",
    description: "Soviet airplane Yak-42 became the biggest music instrument in this music video for singer-songwriter Jekka.",
    thumbnailVideo: jekkaVideo
  },
  {
    id: "plaid-elex",
    title: "Plaid + Bruno Zamborlin: ELEX",
    location: "London",
    category: "Art/Performances",
    videoUrl: "local:plaid-elex",
    description: "Music collaboration between Bruno Zamborlin and Plaid (Warp records)",
    thumbnailVideo: plaidElexVideo
  },
  {
    id: "mazda",
    title: "Mazda commercial",
    location: "London",
    category: "Technology",
    videoUrl: "https://www.youtube.com/watch?v=QlCNhOm3cCs",
    description: "Playing a Mazda car Commercial video and interactive installation for SXSW",
    thumbnailVideo: mazdaVideo
  },
  {
    id: "plaid-diana",
    title: "Plaid + Bruno Zamborlin: Diana",
    location: "Turin",
    category: "Art/Performances",
    videoUrl: "https://www.youtube.com/watch?v=o95Momw3-vA",
    description: "Performable sound sculpture, featured as part of MTV Digital Days at Galleria di Diana, Venaria Palace, Turin.",
    thumbnailVideo: dianaVideo
  },
  {
    id: "plaid-35-summers",
    title: "Plaid + Bruno Zamborlin: 35 Summers (live)",
    location: "RoundHouse (London)",
    category: "Art/Performances",
    videoUrl: "local:plaid-35-summers",
    description: "Performing 35 Summers live at the London RoundHouse for Imogen Heap's Reverb festival",
    thumbnailVideo: summerVideo
  },
  {
    id: "playing-stove",
    title: "Playing a stove",
    location: "London",
    category: "Technology",
    videoUrl: "https://www.youtube.com/watch?v=_7J6iBd2qVg",
    description: "Watch 10-year-old Diego play Beethoven's Fur Elise on a cooking stove. Using specialized technology, each tap Diego makes on the stove surfaces progresses to the next note of the song, which has been pre-sequenced.",
    thumbnailVideo: stoveVideo
  },
];

export const categories = ["All", "Art/Performances", "Installations", "Technology"];

export const about = {
  bio: "Bruno Zamborlin, PhD, is an AI researcher and artist, recognized for revolutionizing human-computer interaction through his startups: Mogees, HyperSurfaces, and HyperSentience. His work focuses on transforming everyday objects and surfaces into interactive, intelligent entities, thereby redefining our interaction with the space and between us. Based in London and Milan, Bruno Zamborlin is a four times TEDx speaker and honorary research fellow at Goldsmiths, univ. Of London. His artworks have been showcased at venues like the Venice Biennale and the London Victoria & Albert Museum.",
  practice: "At the core of Zamborlin's work is a keen desire to create connections—whether between friends, strangers, or the spaces that envelop them. By transforming everyday objects and surfaces into interactive canvases, Zamborlin invites participants into a shared experience, turning mundane moments into opportunities for discovery and connection, fostering a sense of community and shared wonder.\n\nZamborlin's work gives voice to the world around us. Through his pioneering application of vibration sensors and algorithms, spaces and objects gain the ability to respond to human touch, movement, and even atmospheric changes, effectively speaking to us in a language of light, sound and data. This interaction blurs the lines between the animate and inanimate, inviting observers to reconsider their relationship with their surroundings.\n\nIn a society increasingly mediated by touchscreens and virtual interfaces, Zamborlin's work is a reminder of the richness of the physical world. By emphasizing tactile engagement and the sensory experiences of the environment and people around us, he offers a counter-narrative to the digital disconnection, rekindling an appreciation for the tangible and fostering a deeper, more meaningful interaction with the world.",
  contact: "b@brunozamborlin.ai"
};

export const technology = {
  videoUrl: "local:tedx-sf",
  thumbnailVideo: tedVideo,
  text: [
    "By coupling vibration sensors with specialized algorithms, inanimate objects, surfaces, and entire spaces can be enabled to respond to human touch and atmospheric phenomena in real-time.",
    "The natural acoustics of solid surfaces can be altered so as to produce musical sounds which are always unique, as is every lightest touch, gentle caress, or falling raindrop.",
    "These algorithms can also control lighting and video displays, creating synesthetic experiences of touch, sound and light.",
    "Such data-enabled surfaces open up new possibilities for understanding and engaging with the spaces around us."
  ]
}
