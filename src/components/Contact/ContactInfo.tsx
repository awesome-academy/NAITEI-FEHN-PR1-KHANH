import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaGooglePlusG,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaVk
} from 'react-icons/fa'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Link } from 'react-router-dom'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
})

const ContactInfo = () => {
  const position: [number, number] = [21.0285, 105.8542]

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
      <div className='lg:col-span-2 h-96 bg-gray-200 rounded-lg overflow-hidden'>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={true}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              Wine House
              <br />
              Tầng 4, Tòa nhà Hanoi Group
              <br />
              Số 442 Đội Cấn, P. Cống Vị, Q. Ba Đình, Hà Nội
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className='flex flex-col justify-center bg-gray-50 p-6'>
        <div className='mb-8'>
          <div className='text-yellow-600 mb-4'>
            <div className="font-['Pinyon_Script'] text-3xl">Wine house</div>
            <div className='text-sm'>Since 1980</div>
          </div>
        </div>

        <div className='space-y-4 mb-8'>
          <div className='flex items-start'>
            <FaMapMarkerAlt className='text-gray-500 mt-1 mr-3 flex-shrink-0' />
            <div className='text-gray-700 text-sm'>
              <div>Tầng 4, Tòa nhà Hanoi Group Số 442 Đội</div>
              <div>Cấn, P. Cống Vị, Q. Ba Đình, Hà Nội</div>
            </div>
          </div>

          <div className='flex items-center'>
            <FaPhone className='text-gray-500 mr-3 flex-shrink-0' />
            <span className='text-gray-700 text-sm'>(04) 6674 2332</span>
          </div>

          <div className='flex items-center'>
            <FaEnvelope className='text-gray-500 mr-3 flex-shrink-0' />
            <span className='text-gray-700 text-sm'>support@milano.com</span>
          </div>
        </div>

        <div>
          <h3 className='text-gray-700 font-medium mb-4 text-sm'>FOLLOW US:</h3>
          <div className='flex space-x-3'>
            <Link to='#' className='text-gray-400 hover:text-gray-600 transition-colors'>
              <FaFacebookF size={16} />
            </Link>
            <Link to='#' className='text-gray-400 hover:text-gray-600 transition-colors'>
              <FaGooglePlusG size={16} />
            </Link>
            <Link to='#' className='text-gray-400 hover:text-gray-600 transition-colors'>
              <FaTwitter size={16} />
            </Link>
            <Link to='#' className='text-gray-400 hover:text-gray-600 transition-colors'>
              <FaYoutube size={16} />
            </Link>
            <Link to='#' className='text-gray-400 hover:text-gray-600 transition-colors'>
              <FaPinterest size={16} />
            </Link>
            <Link to='#' className='text-gray-400 hover:text-gray-600 transition-colors'>
              <FaVk size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
