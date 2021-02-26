import { React, Link, ReactSVG, useEffect, useState } from '../../libraries'
import { Rectangle5 } from '../../assets/images/button'
import { LogoIAS } from '../../assets/images'
import { connect } from 'react-redux'
import { ToggleModalAction } from '../../modules/actions/ToggleModal__Action'

const NavTop = (props) => {
  const { Active, ToggleModalAction } = props
  const [transform, setTransform] = useState('') 
  const [faBarsValue, setFaBarsValue] = useState('entering') 
  const [faRemoveValue, setFaRemoveValue] = useState('') 
  const [navMobileValue, setNavMobileValue] = useState('') 
  
  const handleClick = () => {
    ToggleModalAction(true)
    closeBg()
    setFaRemoveValue('')
    setFaBarsValue('entering')
    setNavMobileValue('')
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [transform])

  const handleScroll = (event) => {
    let windowScroll = document.documentElement.scrollTop
    let scrollTop = parseInt(event.srcElement.body.scrollTop)+40

    if(windowScroll>scrollTop){
      setTransform('entering')
    } else {
      setTransform('')
    }
  }

  const openBg = () => {
    let windowScroll = document.documentElement.scrollTop
    let scrollTop = parseInt(document.body.scrollTop)+40

    if(windowScroll>scrollTop){
      setTransform('')
      console.log("here")
    } 
  }

  const closeBg = () => {
    let windowScroll = document.documentElement.scrollTop
    let scrollTop = parseInt(document.body.scrollTop)+40

    if(windowScroll>scrollTop){
      setTransform('entering')
    } 
  }

  const handleClickFaBars = () => {
    openBg()
    setFaBarsValue('')
    setFaRemoveValue('entering')
    setNavMobileValue('entering')
  }
  
  const handleClickFaRemove = () => {
    closeBg()
    setFaRemoveValue('')
    setFaBarsValue('entering')
    setNavMobileValue('')
  }

  const defaultStyleTransition = {
    transition: 'all 0.5s ease',
    backgroundColor: 'transparent',
    color: '#fff'
  }

  const styleTransition = {
    entering: {
      backgroundColor: '#fff',
      color: '#000',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }
  }

  const navMobile = {
    entering: {
      opacity: '1',
      zIndex: '10',
      marginLeft: '0px'
    }
  }

  const faBars = {
    entering: {
      opacity: '1',
      zIndex: '1'
    }
  }
  
  const faRemove = {
    entering: {
      opacity: '1',
      zIndex: '1'
    }
  }

  return (
    <>
      <div className="wrap-navbar-top lg:container w-full h-full mx-auto px-3 pb-3 fixed top-0 bg-black md:overflow-visible overflow-auto opacity-0" style={{ transition: 'opacity 0.5s ease, margin-left 0.5s ease', zIndex: '-1', marginLeft: '-100px', ...navMobile[navMobileValue] }}>
        <div className="flex flex-wrap">
          <div className="xl:w-2/12 md:w-3/12 w-full md:pt-0 pt-5">
            <Link to="/">
              <ReactSVG 
                beforeInjection={(svg) => {
                  svg.classList.add('svg-logo-top')
                }}
              src={LogoIAS} />
            </Link>
          </div>
          <div className="xl:w-7/12 md:w-6/12 w-full h-full md:pl-10 text-white my-auto md:pt-0 pt-5">
            <Link to="/" className={`md:w-auto w-full md:float-none float-left xl:text-base text-sm font-bold border-white border-b border-solid md:py-2 py-4 md:pr-5`} style={{ borderColor: Active === 'home' ? '#1F7E80' : '' }}>Home</Link>
            <Link to="/news" className={`md:w-auto w-full md:float-none float-left xl:text-base text-sm font-bold border-white border-b border-solid border-white md:py-2 py-4 md:px-5`} style={{ borderColor: Active === 'news' ? '#1F7E80' : '' }}>News</Link>
            <Link to="/price" className={`md:w-auto w-full md:float-none float-left xl:text-base text-sm font-bold border-white border-b border-solid border-white md:py-2 py-4 md:px-5`} style={{ borderColor: Active === 'price' ? '#1F7E80' : '' }}>Price</Link>
            <Link to="/contact-us" className={`md:w-auto w-full md:float-none float-left xl:text-base text-sm font-bold border-white border-b border-solid border-white md:py-2 py-4 md:pl-5`} style={{ borderColor: Active === 'contactus' ? '#1F7E80' : '' }}>Contact us</Link>
          </div>
          <div className="md:w-3/12 w-full flex md:pt-0 pt-5">
            <button style={{ backgroundImage: `url(${Rectangle5})`, backgroundSize: '100% 100%' }} className="uppercase md:ml-auto my-auto text-white w-24 h-8" onClick={handleClick}>Log In</button>
          </div>
        </div>
      </div>
      <div className={`nav-top md:hidden block w-full fixed top-0 right-0 pr-3 py-5 flex justify-end text-2xl z-10`} style={{ ...defaultStyleTransition, backgroundColor: Active === 'news' ? '#000' : '', ...styleTransition[transform] }}>
        <i className="fa fa-bars" 
          onClick={handleClickFaBars} 
          style={{ 
            transition: 'opacity 0.5s ease', 
            position: 'absolute', 
            zIndex: '-1', 
            opacity: '0', 
            marginTop: '8px',
            top: '0',
            ...faBars[faBarsValue] }}>
        </i>
        <i className="fa fa-remove" 
          onClick={handleClickFaRemove} 
          style={{ 
            transition: 'opacity 0.5s ease', 
            position: 'absolute', 
            zIndex: '-1', 
            opacity: '0', 
            marginTop: '8px',
            top: '0',
            ...faRemove[faRemoveValue] }}>
        </i>
      </div>
    </>
  )
}

NavTop.defaultProps = {
  Active: ""
}

// const mapStateToProps = (state) => ({
//   ToggleStatus: state.ToggleModalReducer.ToggleModalStatus
// })

const mapDispatchToProps = {
  ToggleModalAction
}

export default connect(null, mapDispatchToProps)(NavTop)