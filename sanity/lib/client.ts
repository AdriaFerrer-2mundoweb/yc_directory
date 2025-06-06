import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective: 'published',
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio'
  },
})

// Create a preview-enabled client
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: '/studio'
  },
})

// Helper function to choose which client to use
export const getClient = (usePreview = false) => (usePreview ? previewClient : client)
