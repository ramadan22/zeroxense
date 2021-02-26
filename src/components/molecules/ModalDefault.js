import { React } from '../../libraries'
import { Transition } from 'react-transition-group'
import { ButtonBg } from '../../assets/images/button'
import { connect } from 'react-redux'
import { ToggleModalAction } from '../../modules/actions'

import { Backdrop } from '../atoms'

const ModalDefault = (props) => {
  const { closeStatus, Text, Type, Status, ToggleModalAction } = props

  const handleClose = (value) => {
    closeStatus(false);
    if(value === "login")
      ToggleModalAction(true);
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
          <div style={{...defaultStyle, ...transitionStyles[status]}} className="w-full h-full flex flex-wrap fixed z-40 overflow-y-auto" data-key="exept">
            <div className="w-1/3 h-auto bg-white pt-8 px-12 mx-auto my-auto flex flex-wrap rounded">
              <div className="w-24 h-24 flex rounded-full bg-green-500 text-white text-3xl mx-auto" style={{ marginTop: "-75px", backgroundColor: (`${Type === 'info' ? '#17a2b8' : ''}${Type === 'success' ? '#28a745' : ''}${Type === 'failed' ? '#dc3545' : ''}`)  }}>
                {Type === 'success' ? (
                  <i className="fa fa-check fa-2x m-auto"></i>
                ) : ('')}
                {Type === 'info' ? (
                  <i className="fa fa-info fa-2x m-auto"></i>
                ) : ('')}
                {Type === 'failed' ? (
                  <i className="fa fa-times fa-2x m-auto"></i>
                ) : ('')}
              </div>
              <div className="w-full text-xl mt-5 text-green-600 text-center leading-tight">
                {`${Text !== undefined ? Text : ''}`}
              </div>
              {Status !== undefined ? (
                <button className="text-white px-10 py-1 mb-5 mt-10 mx-auto" style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }} onClick={(value) => handleClose('login')}>Login Now</button>
              ) : (
                <button className="border border-solid border-gray-300 px-10 py-1 rounded mb-5 mt-10 mx-auto" onClick={handleClose}>Close</button>
              )}
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

const mapDispatchToProps = {
  ToggleModalAction
}

export default connect(null, mapDispatchToProps)(ModalDefault)