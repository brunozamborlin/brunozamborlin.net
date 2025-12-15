// Local video assets imported using Vite's @assets alias
import cityOfPlantsVideo from "@assets/videos/city-of-plants.mp4";
import audiCityLabVideo from "@assets/videos/audi-city-lab.mp4";
import gardenOfMomentsVideo from "@assets/videos/garden-of-moments.mp4";
import postPostVideo from "@assets/videos/post-post.mp4";
import tedxSfVideo from "@assets/videos/tedx-sf.mp4";
import airplaneInstrumentVideo from "@assets/videos/airplane-instrument.mp4";
import plaidElexVideo from "@assets/videos/plaid-elex.mp4";
import plaid35SummersVideo from "@assets/videos/plaid-35-summers.mp4";
import hypersurfacesVideo from "@assets/videos/hypersurfaces.mp4";

export const localVideos = {
  "city-of-plants": cityOfPlantsVideo,
  "audi-city-lab": audiCityLabVideo,
  "garden-of-moments": gardenOfMomentsVideo,
  "post-post": postPostVideo,
  "tedx-sf": tedxSfVideo,
  "airplane-instrument": airplaneInstrumentVideo,
  "plaid-elex": plaidElexVideo,
  "plaid-35-summers": plaid35SummersVideo,
  "hypersurfaces": hypersurfacesVideo,
} as const;

export type LocalVideoId = keyof typeof localVideos;
