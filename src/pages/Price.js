import { React, Link, useContext, useEffect, useState } from '../libraries'
import { UserContext } from '../modules/masters/useContext_Master'
import { Heading } from '../components/atoms'
import { NavTop, PriceThumbnail, ContactUsFooter, Footer, HelmetComponent } from '../components/molecules'
import { LoadingPackages } from '../components/molecules/loading'
import { ButtonBg } from '../assets/images/button'
import { TopBg } from '../assets/images'
import { ApiTokenRedux } from '../modules/api'

const Price = () => {
  const tokenContext = useContext(UserContext)
  const [packages, setPackages] = useState([])
  const [HelmetData] = useState({
    title: "ZEROXense - Packager Price"
  })

  const getPackage = (TokenValue) => {
    ApiTokenRedux.get('/v1/packages', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setPackages(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    if(tokenContext !== "")
      getPackage(tokenContext);
  }, [tokenContext])

  return (
    <>
      <HelmetComponent data={HelmetData} />
      <div className="relative" style={{ backgroundImage: `url(${TopBg})`, height: '600px' }}>
        <NavTop Active="price" />
        <div className="wrap-navbar-content lg:container pb-8">
          <Heading ClassName="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white text-center pt-10" Text="Pricing and Plans" />
          <Heading Type="heading-section" ClassName="text-center text-white" Text="More features, more power, less bugs." />
          <p className="text-md text-center text-white mt-2">First 30 days absolutely free for any plan, no credit required to get started.</p>
        </div>
        <div className="wrap-navbar-content wrap-price-list lg:container sm:mb-20 mb-12 relative">
          <div className="wrap-inner mt-5">
            {packages.length > 0 ? (
              packages.map((res, index) => {
                return (
                  <div key={index} className={`md:w-1/3 sm:w-1/2 w-4/5 md:mx-none mx-auto md:${index === 1 ? "mt-0" : "mt-6"} mt-5 lg:px-5 sm:px-2 sm:px-0 pr-5 sm:float-left flex-none`}>
                    <PriceThumbnail data={res} />
                  </div>)})
              ) : (
                <>
                  <LoadingPackages />
                  <LoadingPackages />
                  <LoadingPackages />
                </>
              )
            }
            <div className="w-1/3 mt-6 px-5 hidden">
              <PriceThumbnail />
            </div>
            <div className="w-1/3 hidden">
              <div className="bg-white rounded-lg shadow-lg pb-5">
                <h4 className="text-4xl mt-6">Free</h4>
                <p className="mb-2">Gratis Selamanya!</p>
                <div className="mt-1 mb-1 px-6 py-3 text-sm bg-gray-200"><span className="text-red-400">150</span> the ipsum dolor sit amet</div>
                <div className="mt-1 mb-1 px-6 py-3 text-sm"><span className="text-red-400">Consectetur</span> adipiscing elit</div>
                <div className="mt-1 mb-1 px-6 py-3 text-sm bg-gray-200" style={{ color: '#CACCCF' }}>Ed do eiusmo</div>
                <div className="mt-1 mb-1 px-6 py-3 text-sm" style={{ color: '#CACCCF' }}>Tempor incididunt ut</div>
                <div className="mt-1 mb-1 px-6 py-3 text-sm bg-gray-200" style={{ color: '#CACCCF' }}>Labore et dolore magna aliqua</div>
                <div className="mt-3 mb-3 px-6 py-4 text-lg">Rp. 0 / perbulan</div>
                <div className="flex flex-wrap">
                  <div className="text-center text-sm w-1/2 flex pl-6">
                    <Link style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }} className="w-full text-center text-white text-sm py-1">Coba Sekarang!</Link>
                  </div>
                  <Link className="text-center text-sm w-1/2 pr-6">Start Trial</Link>
                </div>
              </div>
            </div>
            <div className="w-1/3 mt-6 px-5 hidden">
              <PriceThumbnail />
            </div>
            <div className="w-full sm:hidden block" style={{ clear: 'both' }}></div>
          </div>
        </div>
        <p className="w-full text-center sm:mt-10 mt-0 md:text-lg sm:text-base text-sm px-5"><span style={{ color: '#F6A609' }}>Limitied offer</span>, Save 20% an annual plans. Get it now!</p>
      </div>
      <div className="sm:hidden block" style={{ clear: 'both' }}></div>
      <div className="wrap-footer-price custom-height">
        <div className="wrap-navbar-content lg:container">
          <ContactUsFooter />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Price