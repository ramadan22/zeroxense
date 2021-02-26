import { React, useState } from '../libraries'
import { Heading } from '../components/atoms'
import { NavTop, FooterContentGeneral, Footer, HelmetComponent } from '../components/molecules'
import { 
  TopBg, 
  ImageStoleLeaked, 
  ImageWarningTriangle, 
  ImageKey, 
  ImageWatch, 
  IconMail 
} from '../assets/images'

const StolenLeaked = () => {
  const [HelmetData] = useState({
    title: "ZEROXense - Stolen & Leaked"
  })

  return (
    <>
      <HelmetComponent data={HelmetData} />
      <div className="relative lg:pt-0 md:pt-24 pt-16" style={{ backgroundImage: `url(${TopBg})`, height: '600px', marginBottom: "300px" }}>
        <NavTop />
        <div className="wrap-navbar-content lg:container px-20 pb-8">
          <div className="md:px-6 sm:px-4 px-2 pt-4 pb-4 bg-white shadow-lg rounded-lg text-left flex flex-wrap">
            <div className="md:w-1/2 w-full">
              <img src={ImageStoleLeaked} alt="stole leaked" className="w-full md:h-auto h-64 object-cover" />
            </div>
            <div className="md:w-1/2 w-full">
              <div className="flex flex-wrap mt-5">
                <img src={ImageWarningTriangle} alt="warning triangle" className="mx-auto md:h-32 sm:h-24 h-16" />
              </div>
              <h1 className="text-center md:mt-10 sm:mt-6 mt-2 md:text-3xl sm:text-xl text-lg" style={{color: '#182253'}}>Your passwords have leaked</h1>
              <p className="text-center md:px-8 sm:px-4 px-2 leading-tight md:mt-4 mt-2 md:text-base text-sm" style={{color: '#182253'}}>Criminals may be able to log in to your personal accounts, message your contacts, siphon your money, and potentially steal your identity. Lorem Ipsum</p>
              <div className="flex flex-wrap sm:px-8 px-0 lg:mt-16 sm:mt-10 mt-6">
                <div className="w-1/2">
                  <img src={ImageKey} alt="key" className="lg:h-24 sm:h-16 h-10 mx-auto" />
                  <h2 className="text-center xl:text-3xl text-base mt-3">14 passwords</h2>
                  <p className="text-center sm:text-sm text-xs mt-2">have leaked</p>
                </div>
                <div className="w-1/2">
                  <img src={ImageWatch} alt="key" className="lg:h-24 sm:h-16 h-10 mx-auto" />
                  <h2 className="text-center xl:text-3xl text-base mt-3">2 years</h2>
                  <p className="text-center sm:text-sm text-xs mt-2">since last leak</p>
                </div>
                <div className="w-full flex justify-center lg:mt-12 sm:mt-8 mt-6 md:text-base text-xs">
                  <img src={IconMail} alt="icon mail" className="mb-auto inline mr-3" /> Please check your email to fix this right away
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-bottom-set md:mb-32 mb-24 text-center pb-16" style={{backgroundColor: '#182253', borderBottomLeftRadius: '70% 20%', borderBottomRightRadius: '70% 20%'}}>
        <div className="wrap-navbar-content lg:container pt-10">
          <Heading Type="heading-section" Text="How did my account details get stolen?" ClassName="text-white mb-6" />
          <p className="text-white mb-2 md:px-16 sm:px-10 px-2">Every year, billions of login details from hundreds of websites are taken in hacker attacks. These stolen email addresses and passwords are then exposed on the dark web or sold on the black market, where criminals pay to gain access to your sensitive data. Companies or organizations you do business with can also leak or publish their users’ sensitive data by accident. </p>
          <p className="text-white md:px-16 sm:px-10 px-2">If criminals get a hold of one of your accounts, they can potentially impersonate you, message your contacts, access your cloud storage, steal your money, and even jump to your other accounts. That’s why we take password safety so seriously.</p>
        </div>
      </div>
      <div className="md:mb-32 mb-24">
        <FooterContentGeneral />
      </div>
      <div style={{ backgroundColor: '#2B2E35' }} className="relative">
        <div className="container mx-auto md:px-20 sm:px-10 px-5">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default StolenLeaked