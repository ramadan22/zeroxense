import { React, useState } from '../../../libraries'
import { Transition } from 'react-transition-group'
import { Backdrop } from '../../atoms'
import { LogoUsers } from '../../../assets/images'
import ModalMemberLogin from './ModalMemberLogin'
import ModalMemberFormRegister from './ModalMemberFormRegister'
import { connect } from 'react-redux'
import { ToggleModalAction, PackageAction } from '../../../modules/actions'

const ModalMember = ({ ToggleModalAction, ModalType, TokenValue, PackageAction, PackageParam }) => {
  const [statusForm, setStatusForm] = useState(`${ModalType === 'register' ? ModalType : "login"}`)

  const ModalMember = (value) => {
    setStatusForm(value)
  }
  
  const handleModalClose = (event) => {
    if(event.target.getAttribute('data-key') !== null){
      ToggleModalAction(false)
      if(Object.keys(PackageParam).length > 0){
        PackageAction({})
      }
    }
  }

  const handleCounter = (value) => {
    if(value === false || value === true){
      ToggleModalAction(value)
    } else {
      setStatusForm(value)
    }
  }

  const handleModalClose2 = (event) => {
    ToggleModalAction(false);
  }

  const defaultStyle = {
    transition: `all 0.5s ease`,
    marginTop: '-100px',
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1, marginTop: '0' },
  }

  return (
    <>
      <Backdrop />
      <Transition timeout={100} in={true} appear>
        {(status) => (
          <div style={{...defaultStyle, ...transitionStyles[status]}} className="w-full h-full flex flex-wrap left-0 top-0 fixed z-40 overflow-y-auto" data-key="exept" onClick={handleModalClose}>
            <div className="lg:w-1/3 md:w-2/3 w-full md:h-auto h-full bg-white md:pb-5 pb-0 mx-auto my-auto flex flex-wrap md:rounded rounded-none">
              <div className="w-full pt-1 px-2 md:hidden block text-right">
                <i className="fa fa-remove text-gray-300 cursor-pointer" onClick={handleModalClose2}></i>
              </div>
              <div className="w-full flex flex-wrap py-3 panel-shadow-modal-member">
                <div className="mr-auto pl-10 flex flex-wrap">
                  <img src={LogoUsers} alt="logo users" className="my-auto" />
                </div>
                <div className="ml-auto text-sm pr-10">
                  <button className={`${statusForm !== null && statusForm === 'login' ? 'border-2' : ''} rounded-sm border-solid border-blue-300 font-bold py-1 px-3 focus:outline-none`} onClick={(value) => ModalMember('login')}>Login</button>
                  <button className={`${statusForm !== null && statusForm === 'register' ? 'border-2' : ''} border-solid border-blue-300 font-bold py-1 px-3 focus:outline-none`} onClick={(value) => ModalMember('register')}>Sign up</button>
                </div>
              </div>
              <div className="w-full mt-3 px-16">
                {statusForm !== null && statusForm === 'login' ?
                  <ModalMemberLogin TokenValue={TokenValue} Counter={(value) => handleCounter(value)} /> : ''
                }
                {statusForm !== null && statusForm === 'register' ?
                  <ModalMemberFormRegister TokenValue={TokenValue} Counter={(value) => handleCounter(value)} /> : ''
                }
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

const mapStateToProps = (state) => ({
  // ToggleStatus: state.ToggleModalReducer.ToggleModalStatus
  PackageParam: state.PackageReducer.params
})

const mapDispatchToProps = {
  ToggleModalAction,
  PackageAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMember)