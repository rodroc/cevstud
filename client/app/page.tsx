import SiteHeader from '@/components/SiteHeader'
import Masthead from '@/components/Masthead'
import WebDevSection from '@/components/WebDevSection'
import MobileAppsSection from '@/components/MobileAppsSection'
import BrandIdentitySection from '@/components/BrandIdentitySection'
import ThreeDSection from '@/components/ThreeDSection'
import ContactForm from '@/components/ContactForm'
import SiteFooter from '@/components/SiteFooter'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Masthead />
        <WebDevSection />
        <MobileAppsSection />
        <BrandIdentitySection />
        <ThreeDSection />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  )
}
