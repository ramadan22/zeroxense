import { React, useState, useContext } from '../libraries'
import { UserContext } from '../modules/masters/useContext_Master'
import { Heading } from '../components/atoms'
import { NavTop, Footer, FooterContentGeneral, ModalDefault, HelmetComponent } from '../components/molecules'
import { TopBg } from '../assets/images'
import { ButtonBgLong } from '../assets/images/button'
import { ApiTokenRedux } from '../modules/api'
import Style from '../assets/css/style'

const ContactUs = () => {
  const tokenContext = useContext(UserContext)
  const [spiner, setSpiner] = useState(false)
  const [formContact, setFormContact] = useState({
    email: '',
    question: '',
    message: ''
  })
  const [ModalData, setModalData] = useState({
    Text: '',
    Type: ''
  })

  const [HelmetData] = useState({
    title: "ZEROXense - Contact Us"
  })

  const formSubmit = (TokenValue, params) => {
    ApiTokenRedux.post('/v1/contact_request/create', params, 
    {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setSpiner(false)
      if(res.status === 200)
        setModalData({...ModalData, Text: 'Your message has been sent successfully', Type: 'success'});
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const handleChange = (event) => {
    setFormContact({...formContact, [event.target.getAttribute('name')]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    formSubmit(tokenContext, formContact)
  }

  const handleCounter = (value) => {
    setModalData({...ModalData, Text: '', Type: ''});
  }

  return (
    <>
      <HelmetComponent data={HelmetData} />
      {ModalData.Type !== '' && ModalData.Type === 'success' ?
        <>
          <Style overflow="hidden" paddingRight={"17px"} />
          <ModalDefault Text={`${ModalData.Text}`} Type={`${ModalData.Type}`} closeStatus={(value) => handleCounter(value)} /> 
        </> : ''
      }
      <div className="relative wrap-contact" style={{ backgroundImage: `url(${TopBg})` }}>
        <NavTop Active="contactus" />
        <div className="wrap-navbar-content lg:container md:pt-0 pt-10">
          <div className="flex flex-wrap">
            <div className="md:w-1/2 w-full md:pr-6 pr-0 flex flex-wrap">
              <div className="w-full my-auto">
                <Heading Type="heading-section" Text="Need help anything?" ClassName="text-white text-left" />
                <p className="text-md text-left text-white mt-2">Let us know how we can help. Contact ZeroXense Support.</p>
              </div>
            </div>
            <div className="md:w-1/2 w-full md:pl-6 pl-0">
              <div className="box-contactus">
                <form onSubmit={handleSubmit}>
                  <h3 className="md:text-3xl sm:text-2xl text-xl text-left text-black mb-1">Submit a request</h3>
                  <p className="sm:text-base text-sm text-left text-black mt-2 mb-3Z">We’re here to help any questions or code</p>
                  <p className="sm:text-sm text-xs mb-2 mt-2">Your Email Address</p>
                  <input type="email" onChange={handleChange} name="email" required className="mb-4 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#ddd' }} placeholder="Insert your email address" />
                  <p className="sm:text-sm text-xs mb-2">How would you describe your questions ?</p>
                  <input type="text" onChange={handleChange} required name="question" className="mb-4 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#ddd' }} placeholder="Insert your describe questions" />
                  <p className="sm:text-sm text-xs mb-2">Your Message ?</p>
                  <input type="text" onChange={handleChange} required name="message" className="mb-4 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#ddd' }} placeholder="Insert your message here .." />
                  <button type="submit" className="h-10 mt-5 w-full focus:outline-none active:border-color-white uppercase text-white" style={{ backgroundImage: `url(${ButtonBgLong})`, backgroundSize: '100% 100%' }}>
                    {spiner ? <i className="fa fa-spinner fa-spin mr-1"></i> : ''} Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-32">
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

export default ContactUs