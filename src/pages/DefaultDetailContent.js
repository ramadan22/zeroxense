import { React, useEffect, useContext, useState } from '../libraries'
import { UserContext } from '../modules/masters/useContext_Master'
import { NavTop, ContactUsFooter, Footer, HelmetComponent } from '../components/molecules'
import { ApiTokenRedux } from '../modules/api'

const DefaultDetailContent = ({ match }) => {
  const tokenContext = useContext(UserContext)
  const [detailData, setDetailData] = useState({})
  const [HelmetData] = useState({
    title: "ZEROXense"
  })

  const BannerContent = (id) => {
    ApiTokenRedux.get(`/v1/banner/show/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenContext}`
      }
    })
    .then(res => {
      setDetailData(res.data.Data)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }

  useEffect(() => {
    const id = match.params.id.split('-')
    BannerContent(id[0])
  }, [match.params])

  return (
    <>
      <HelmetComponent data={HelmetData} />
      <div className="pb-5" style={{ backgroundColor: '#000000' }}>
        <NavTop />
      </div>
      <div className="wrap-navbar-content lg:container" style={{ minHeight: '250px' }}>
        {Object.keys(detailData).length > 0 ? (
          <>
            <h1 className="sm:w-2/3 w-full px-5 lg:text-4xl md:text-3xl sm:text-2xl text-xl">{`${detailData.bannerTitle}`}</h1>
            <div className="my-10 px-5" dangerouslySetInnerHTML={{ __html: `${detailData.bannerContent}` }}></div>
          </>
        ) : ('')}
      </div>
      <div style={{ backgroundColor: '#2B2E35' }} className="pt-20">
        <div className="wrap-navbar-content lg:container">
          <ContactUsFooter />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default DefaultDetailContent