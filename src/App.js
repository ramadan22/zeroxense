import { React, Router, Route, useEffect, useState } from './libraries'
import './tailwind/tailwind.output.css'
import 'font-awesome/css/font-awesome.min.css'
import { connect } from 'react-redux'
import { ApiTokenRedux } from './modules/api'
import { UserContext } from './modules/masters/useContext_Master'
import { ModalMember, ModalDefault } from './components/molecules'
import Style from './assets/css/style'
import { ScrollTop } from './pages/scroll/ScrollTop'
import { ModalDefaultAction } from './modules/actions'
import { 
  Home, 
  News, 
  Price, 
  TermOfService, 
  PrivacyPolicy, 
  Faq, 
  DetailNews,
  ContactUs, 
  StolenLeaked,
  DefaultDetailContent,
  ActivationAccount
} from './pages'

const App = ({ ToggleStatus, ModalDefaultData, ModalDefaultAction, PackageParam }) => {
  const [tokenValue, setTokenValue] = useState(null)
  const [modalLoginStatus, setModalLoginStatus] = useState(false)
  const [modalDefault, setModalDefault] = useState({})

  useEffect(() => {
    ApiTokenRedux.post('/v1/auth/token', {client: 'app-web', secret: 'GpzE6kw3tWmgaGDEnjWdDh46j0waUV5z'})
    .then(res => {
      setTokenValue(res.data.Data.token)
    })
    .catch(function (error) {
      console.log(error);
    })
  })

  const handleCounter = (value) => {
    ModalDefaultAction({})
  }

  useEffect(() => {
    setModalLoginStatus(ToggleStatus)
  }, [ToggleStatus])

  useEffect(() => {
    setModalDefault(ModalDefaultData)
  }, [ModalDefaultData])

  return (
    <>
      {modalLoginStatus ?
        <>
          <Style overflow="hidden" paddingRight={"17px"} />
          <ModalMember ModalType={`${modalLoginStatus}`} TokenValue={tokenValue !== null ? tokenValue : ''} />
        </> : ''
      }

      {Object.keys(modalDefault).length > 0 ?
        <>
          <Style overflow="hidden" paddingRight={"17px"} />
          <ModalDefault Text={`${modalDefault.Text}`} Type={`${modalDefault.Type}`} Status={modalDefault.Status} closeStatus={(value) => handleCounter(value)} />
        </> : ''
      }


      <Router basename="/zeroxense-frontend">
        <UserContext.Provider value={tokenValue !== null ? tokenValue : ''}>
          <ScrollTop />
          <Route exact path="/" component={Home} />
          <Route exact path="/news" component={News} />
          <Route path="/Price" component={Price} />
          <Route path="/term-of-service" component={TermOfService} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/faq" component={Faq} />
          <Route path="/detail-news/:slug" component={DetailNews} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/stolen-leaked" component={StolenLeaked} />
          <Route exact path="/detail/:content/:id" component={DefaultDetailContent} />
          <Route exact path="/activation-account/:code" component={ActivationAccount} />
        </UserContext.Provider>
      </Router>
    </>
  )
}

const mapStateToProps = (state) => ({
  ToggleStatus: state.ToggleModalReducer.ToggleModalStatus,
  ModalDefaultData: state.ModalDefaultReducer.data,
  PackageParam: state.PackageReducer.params
})

const mapDispatchToProps = {
  ModalDefaultAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App)