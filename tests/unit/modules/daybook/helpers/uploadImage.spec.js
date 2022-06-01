import 'setimmediate'
import cloudinary from 'cloudinary'
import axios from 'axios'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
  cloud_name: 'cristianrp',
  api_key: '284518584541986',
  api_secret: '1ffhloPvzoF04PaJI-NIdDKhzKs'
})

describe('Tests on uploadImage', () => {
  test('should upload a file and return a url', async( done ) => {
    const { data } = await axios.get('https://res.cloudinary.com/cristianrp/image/upload/v1654006112/cld-sample-2.jpg', {
      responseType: 'arraybuffer'
    })

    const file = new File( [ data ], 'photo.jpg' )

    const url = await uploadImage( file )

    expect( typeof url ).toBe('string')

    const segments = url.split('/')
    const imageId = segments[ segments.length - 1 ].replace('.jpg', '')
    cloudinary.v2.api.delete_resources( imageId, {}, () => {
      done()
    })
  })
})
