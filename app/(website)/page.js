import React from 'react'
import HeroSection from './websiteComponent/HeroSection'
import FeaturesSection from './websiteComponent/FeaturesSection'
import PromoBanner from './websiteComponent/PromoBanner'
import NewsletterSection from './websiteComponent/NewsletterSection'
import Categories from './features/Home/Categories'

export default function page() {
  return (
    <div>
      <HeroSection/>
      <FeaturesSection/>
      <PromoBanner/>
      <Categories/>
      <NewsletterSection/>
    </div>
  )
}
