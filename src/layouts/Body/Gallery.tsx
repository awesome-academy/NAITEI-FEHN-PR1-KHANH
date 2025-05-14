import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { GalleryImage } from '../../interfaces/Gallery'
import { api } from '../../services/api'

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true)
        const data = await api.getGalleryImages()
        setImages(data)
        setError(null)
      } catch (err) {
        setError('Failed to load gallery images. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryImages()
  }, [])

  if (loading) {
    return (
      <section className='py-8 bg-white'>
        <div className='w-screen max-w-none px-0'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-1'>
            {[...Array(8)].map((_, index) => (
              <div key={index} className='h-64 bg-gray-200 animate-pulse'></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='py-8 bg-white'>
        <div className='w-screen max-w-none px-0 text-center text-red-500'>{error}</div>
      </section>
    )
  }

  return (
    <section className='py-8 bg-white overflow-x-hidden'>
      <div className='w-screen max-w-none px-0'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-1'>
          {images.map((image) => (
            <Link key={image.id} to={image.link} className='relative group overflow-hidden block h-64'>
              <img
                src={image.src}
                alt={image.alt}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center'>
                <div className='text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  {image.overlay && (
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                      {image.overlay.year && (
                        <span className='text-sm font-light tracking-wider'>{image.overlay.year}</span>
                      )}
                      {image.overlay.title && (
                        <h2 className="text-4xl font-['Pinyon_Script'] mt-2">{image.overlay.title}</h2>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
