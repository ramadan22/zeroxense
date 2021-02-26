import { React, useState, connect, useEffect } from '../../../libraries'
import { ButtonBg } from '../../../assets/images/button'
import { ApiTokenRedux } from '../../../modules/api'
import { ModalDefaultAction } from '../../../modules/actions'

const ModalMemberFormRegister = ({ TokenValue, Counter, ModalDefaultAction }) => {
  const [spiner, setSpiner] = useState(false)
  const [param, setParam] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [check, setCheck] = useState(false)

  const handleChange = (event) => {
    setParam({...param, [event.target.getAttribute('name')]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    ApiTokenRedux.post('/v1/register', param, {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setSpiner(false)
      Counter(false)
      ModalDefaultAction({Text: 'Register successfully', Type: 'success'})
    })
    .catch(function (error) {
      console.log(error.response)
      Counter(false)
      ModalDefaultAction({Text: error.response.data.Message, Type: 'info'})
    })
  }

  const handleClickLogin = () => {
    Counter('login')
  }

  useEffect(() => {
    if(param.password !== '' && param.passwordConfirmation !== '' && param.password === param.passwordConfirmation){
      setCheck(true)
    } else {
      setCheck(false)
    }
  }, [param.password, param.passwordConfirmation] )

  return (
    <>
      <h2 className="font-bold text-2xl mb-4 text-center">Sign up</h2>
      <form onSubmit={handleSubmit}>
        <p className="text-sm mb-2">Username*</p>
        <input type="text" name="username" className="mb-3 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#626367' }} placeholder="Username" onChange={handleChange} required />
        <p className="text-sm mb-2">Email*</p>
        <input type="email" name="email" className="mb-3 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#626367' }} placeholder="Email" onChange={handleChange} required />
        <p className="text-sm mb-2">Password*</p>
        <input type="password" name="password" className="mb-3 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#626367' }} placeholder="Password" onChange={handleChange} minlength="8" required />
        <p className="text-sm mb-2">Repeat Password*</p>
        <input type="password" name="passwordConfirmation" className="mb-1 rounded-lg w-full border border-solid placeholder-gray-500 py-2 px-3 text-sm" style={{ borderColor: '#626367' }} placeholder="Repeat Password" onChange={handleChange} required />
        <p className="text-xs text-green-600 text-left flex mb-4">
          {check ? (
            <>
              <i className="fa fa-check my-auto mr-1 inline"></i> The password is the same
            </>
          ) : ('')} &nbsp;
        </p>
        <div className="flex flex-wrap mb-6 hidden">
          <input type="checkbox" className="mr-2 my-auto" />
          <p className="text-sm">Rember me</p>
        </div>
        <button className="h-10 w-full uppercase text-white" style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }}>
          {spiner ? <i className="fa fa-spinner fa-spin mr-1"></i> : ''} Submit
        </button>
      </form>
      <p className="text-sm text-center">Already have an account? <span className="text-blue-300 cursor-pointer" onClick={handleClickLogin}>Login</span></p>
    </>
  )
}

const mapDispatchToProps = {
  ModalDefaultAction
}

export default connect(null, mapDispatchToProps)(ModalMemberFormRegister)