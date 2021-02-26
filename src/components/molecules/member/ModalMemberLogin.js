import { React, useState, useEffect, createRef, connect } from '../../../libraries'
import { ButtonBg } from '../../../assets/images/button'
import { ApiTokenRedux } from '../../../modules/api'
import { ModalDefaultAction } from '../../../modules/actions'

const ModalMemberLogin = ({TokenValue, Counter, PackageParam, ModalDefaultAction}) => {
  const clickSubmit = createRef()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [tokenPost, setTokenPost] = useState('')
  const [spiner, setSpiner] = useState(false)
  const [param, setParam] = useState({
    Username: '',
    Password: ''
  })

  const handleChange = (event) => {
    setParam({...param, [event.target.getAttribute('name')]:event.target.value})
  }

  const handleClick = () => {
    setSpiner(true)
    ApiTokenRedux.post('/v1/auth/authenticate', param,
    {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setSpiner(false)
      setButtonDisabled(false)
      setTokenPost(res.data.Data.token)
    })
    .catch(function (error) {
      setSpiner(false)
      Counter(false)
      ModalDefaultAction({Text: error.response.data.Message, Type: 'failed'})
      console.log(error.response)
    })
  }

  const handleClickRegister = () => {
    Counter('register')
  }

  useEffect(() => {
    if(tokenPost !== '')
      clickSubmit.current.click()
  }, [tokenPost, clickSubmit])

  return (
    <>
      <form action={`http://travel.codelabsproject.com/zeroxense-user/ext/login${Object.keys(PackageParam).length > 0 ? "?package="+PackageParam.transCode : ""}`} method="POST">
        <h2 className="font-bold text-2xl mb-4 text-center">Login</h2>
        <p className="text-sm mb-2">Username</p>
        <input type="hidden" name="Token" value={`${tokenPost}`} />
        <input type="text" name="Username" onChange={handleChange} value={`${param.Username}`} className="mb-3 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#626367' }} placeholder="Username" required />
        <p className="text-sm mb-2">Password</p>
        <input type="password" name="Password" onChange={handleChange} value={`${param.Password}`} className="mb-3 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#626367' }} placeholder="Password" />
        <div className="flex flex-wrap mb-6">
          <input type="checkbox" className="mr-2 my-auto" />
          <p className="text-sm">Rember me</p>
        </div>
        <button type="submit" className="hidden" disabled={buttonDisabled} ref={clickSubmit}></button>
        <button type="button" className="h-10 w-full uppercase text-white" onClick={handleClick} style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }}>
          {spiner ? <i className="fa fa-spinner fa-spin mr-1"></i> : ''} Log in
        </button>
        <p className="text-sm text-center">Don't Have an account? <span className="text-blue-300 cursor-pointer" onClick={handleClickRegister}>Sign up</span></p>
      </form>
    </>
  )
}

const mapStateToProps = (state) => ({
  PackageParam: state.PackageReducer.params
})

const mapDispatchToProps = {
  ModalDefaultAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMemberLogin)