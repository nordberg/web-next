import dotenv from 'dotenv'
dotenv.config()

export interface Config {
  redisUrl?: string
  forceHost?: string
  teamtailorApiToken?: string
  storyblokApiToken: string
}

export const config: Config = {
  redisUrl: process.env.REDIS_URL,
  forceHost: process.env.FORCE_HOST,
  teamtailorApiToken: process.env.TEAMTAILOR_API_TOKEN,
  storyblokApiToken: process.env.STORYBLOK_API_TOKEN!,
}
