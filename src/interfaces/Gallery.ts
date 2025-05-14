export interface GalleryImage {
  id: number
  src: string
  alt: string
  link: string
  overlay?: {
    year?: string
    title?: string
  }
}
