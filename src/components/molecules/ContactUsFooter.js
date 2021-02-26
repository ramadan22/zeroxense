import { React, Link, useEffect, useState, useContext } from '../../libraries'
import { UserContext } from '../../modules/masters/useContext_Master'
import { ApiTokenRedux } from '../../modules/api'

import { ButtonBg } from '../../assets/images/button'

const ContactUsFooter = () => {
  const tokenContext = useContext(UserContext)
  const [contactUs, setContactUs] = useState([])

  const getContactus = (TokenValue) => {
    ApiTokenRedux.get('/v1/contact_us', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setContactUs(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    if(tokenContext !== '')
      getContactus(tokenContext);
  }, [tokenContext])

  return (
    <>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center text-white mb-5">Contact us</h1>
      {!contactUs === false ? (
          contactUs.length > 0 ? 
            contactUs.map((res, index) => {
              return <div key={index} className="cotactus-footer text-white" dangerouslySetInnerHTML={{ __html: res.contactUsContent }}></div>
            }) : ('')
        ) : (
          <div className="cotactus-footer">Loading ...</div>
        )  
      }
      <div className="w-full flex justify-center">
        <Link to="/price" style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }} className="text-center text-white md:text-base sm:text-sm text-xs md:py-2 py-1 md:px-10 px-5 mt-10 inline-block">Get Started!</Link>
      </div>
    </>
  )
}

export default ContactUsFooter