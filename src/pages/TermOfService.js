import { React, useEffect, useState, useContext } from '../libraries'
import { UserContext } from '../modules/masters/useContext_Master'
import { Heading } from '../components/atoms'
import { NavTop, Footer, FooterContentGeneral, HelmetComponent } from '../components/molecules'
import { TopBg } from '../assets/images'
import { ApiTokenRedux } from '../modules/api'

const TermOfService = () => {
  const tokenContext = useContext(UserContext)
  const [termData, setTermData] = useState({})
  const [HelmetData] = useState({
    title: "ZEROXense - Term of Use"
  })

  const getTerm = (TokenValue) => {
    ApiTokenRedux.get('/v1/terms', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setTermData(res.data.Data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    if(tokenContext !== "")
      getTerm(tokenContext);
  }, [tokenContext])

  return (
    <>
      <HelmetComponent data={HelmetData} />
      <div className="relative mb-10">
        <div className="w-full absolute top-0" style={{ backgroundImage: `url(${TopBg})`, height: '500px' }}></div>
        <NavTop />
        <div className="wrap-navbar-content lg:container relative">
          <Heading Type="heading-top" ClassName="text-white pt-10 mb-5" Text="Terms of service" />
          <p className="text-white leading-tight md:text-base sm:text-sm text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun</p>
          <div className="px-6 pt-4 pb-10 mt-5 bg-white shadow-lg rounded-lg text-left">
            {!termData === false && termData ?
              <>
                <h4 className="md:text-3xl sm:text-2xl text-xl mb-3">{termData.termTitle}</h4>
                <div className="md:text-base sm:text-sm text-xs" dangerouslySetInnerHTML={{__html: termData.termContent}}></div>
              </> :
              <div>Loading ...</div>
            }
          </div>
        </div>
      </div>
      <div className="mb-32">
        <FooterContentGeneral />
      </div>
      <div style={{ backgroundColor: '#2B2E35' }} className="relative">
        <div className="wrap-navbar-content lg:container">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default TermOfService