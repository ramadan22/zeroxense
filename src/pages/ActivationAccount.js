import { React, useContext, useState, useHistory } from '../libraries'
import { ApiTokenRedux } from '../modules/api'
import { UserContext } from '../modules/masters/useContext_Master'
import { NavTop, HighlightClient, ContactUsFooter, Footer, HelmetComponent } from '../components/molecules'
import { ButtonBg } from '../assets/images/button'
import { bgContentHome } from '../assets/images'
import { connect } from 'react-redux'
import { ModalDefaultAction } from '../modules/actions'

const ActivationAccount = ({ match, ModalDefaultAction }) => {
  const history = useHistory()
  const [spiner, setSpiner] = useState(false)
  const tokenContext = useContext(UserContext)
  const [HelmetData] = useState({
    title: "ZEROXense - Activation Account"
  })

  const handleClick = () => {
    const code = match.params.code
    setSpiner(true)
    ApiTokenRedux.post('/v1/register/activation', { code: code }, {
      headers: {
        Authorization: `Bearer ${tokenContext}`
      }
    })
    .then(res => {
      setSpiner(false)
      history.push("/")
      ModalDefaultAction({Text: 'Activation account successfully', Type: 'success', Status: "login"})
    })
    .catch(function (error) {
      setSpiner(false)
      ModalDefaultAction({Text: error.response.data.Message, Type: 'failed'})
      console.log(error.response)
    })
  }

  return (
    <>
      <HelmetComponent data={HelmetData} />
      <div style={{ backgroundColor: '#000000'}}>
        <NavTop />
      </div>
      <div className="wrap-navbar-content lg:container">
        <div className="flex relative">
          <div className="border border-solid border-gray-300 shadow-lg py-8 px-4 mx-auto mt-32 mb-32 rounded" style={{ width: '500px' }}>
            <h2 className="text-2xl text-center font-bold">Activation Account</h2>
            <p className="text-center mt-3">please click the active button to activate <br />your account</p>
            <div className="flex">
              <button className="text-white py-1 px-6 mt-10 mx-auto" style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }} onClick={handleClick}>
                {spiner ? <i className="fa fa-spinner fa-spin mr-1"></i> : ''} Active
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10" style={{ backgroundImage: `url(${bgContentHome})`, minHeight: "250px", marginTop: "0px", paddingTop: "100px", paddingBottom: "100px" }}>
        <HighlightClient />
      </div>
      <div style={{ backgroundColor: '#2B2E35', marginTop: '0px' }} className="pt-20">
        <div className="wrap-navbar-content lg:container">
          <ContactUsFooter />
          <Footer />
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = {
  ModalDefaultAction
}

export default connect(null, mapDispatchToProps)(ActivationAccount)