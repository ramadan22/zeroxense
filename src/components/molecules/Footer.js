import { React, ReactSVG, Link } from '../../libraries'
import { LogoIAS } from '../../assets/images'

const Footer = () => {
  return (
    <div className="wrap-footer">
      <ReactSVG
        src={LogoIAS}
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 120px')
        }} />
      <div className="ml-auto text-white flex sm:flex-no-wrap flex-wrap justify-center my-auto">
        <Link to="/term-of-service" className="nav-footer">Term of service</Link>
        <Link to="/privacy-policy" className="nav-footer">Privacy Police</Link>
        <Link to="/faq" className="nav-footer">FAQ</Link>
        <Link to="/contact-us" className="nav-footer">Support</Link>
      </div>
    </div>
  )
}

export default Footer