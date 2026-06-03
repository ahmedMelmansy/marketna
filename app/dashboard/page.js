import React from 'react'
import { getImages, getProductImages } from '../services/apiProductImages'

export default async function page() {
  const images = await getImages()
  console.log(images)
  return (
    <div>
      dashboard
    </div>
  )
}
