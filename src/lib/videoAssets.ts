// Local video assets imported using Vite's @assets alias
import cityOfPlantsVideo from "@assets/videos/city-of-plants.mp4";
import audiCityLabVideo from "@assets/videos/audi-city-lab.mp4";
import gardenOfMomentsVideo from "@assets/videos/garden-of-moments.mp4";
import postPostVideo from "@assets/videos/post-post.mp4";
import airplaneInstrumentVideo from "@assets/videos/airplane-instrument.mp4";
import plaidElexVideo from "@assets/videos/plaid-elex.mp4";
import plaid35SummersVideo from "@assets/videos/plaid-35-summers.mp4";
import fieldOfInstrumentsVideo from "@assets/videos/field-of-instruments.mp4";
import mogeesPro1Video from "@assets/videos/MogeesPro1.mp4";
import mogeesPro2Video from "@assets/videos/MogeesPro2.mp4";
import mogeesPlayAppsVideo from "@assets/videos/MogeesPlayApps.mp4";

export const localVideos = {
  "city-of-plants": cityOfPlantsVideo,
  "audi-city-lab": audiCityLabVideo,
  "garden-of-moments": gardenOfMomentsVideo,
  "post-post": postPostVideo,
  "airplane-instrument": airplaneInstrumentVideo,
  "plaid-elex": plaidElexVideo,
  "plaid-35-summers": plaid35SummersVideo,
  "field-of-instruments": fieldOfInstrumentsVideo,
  "mogees-pro-1": mogeesPro1Video,
  "mogees-pro-2": mogeesPro2Video,
  "mogees-play-apps": mogeesPlayAppsVideo,
} as const;

export type LocalVideoId = keyof typeof localVideos;
