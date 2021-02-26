import { React, Link } from '../../libraries'
import { ButtonBg } from '../../assets/images/button'
import { connect } from 'react-redux'
import { PackageAction } from '../../modules/actions'
import { ToggleModalAction } from '../../modules/actions/ToggleModal__Action'

const PriceThumbnail = (props) => {
  const { data, PackageAction, ToggleModalAction } = props

  const FeaturesList = ({dataList}) => {
    var list = []
    for(let i = 0; i < dataList.length; i++){
      list.push(<div key={i} className={`w-full mt-1 mb-1 px-6 py-2 lg:text-sm text-sm ${i%2 === 0 ? 'bg-gray-200' : '' }`}>{`${dataList[i]}`}</div>)
    }
    return list
  }

  const handleClick = (event) => {
    const code = event.target.value
    PackageAction({transCode: code})
    ToggleModalAction(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg pb-5 pt-3 flex flex-wrap sm:w-full w-auto h-full">
      <div className="w-full mb-auto">
        <h4 className="lg:text-3xl text-2xl">{`${data ? data.packageTitle : ''}`}</h4>
        <p className="lg:text-base text-sm mb-5">{`${data ? data.packageSubtitle : ''}`}</p>
        {data && data.packageFeatures.length > 0 ? (
          <FeaturesList dataList={data.packageFeatures} />
        ) : ('')}
      </div>
      {/* <div className="mt-1 mb-1 px-6 py-2 text-sm bg-gray-200"><span className="text-red-400">150</span> the ipsum dolor sit amet</div>
      <div className="mt-1 mb-1 px-6 py-2 text-sm"><span className="text-red-400">Consectetur</span> adipiscing elit</div>
      <div className="mt-1 mb-1 px-6 py-2 text-sm bg-gray-200" style={{ color: '#CACCCF' }}>Ed do eiusmo</div>
      <div className="mt-1 mb-1 px-6 py-2 text-sm" style={{ color: '#CACCCF' }}>Tempor incididunt ut</div>
      <div className="mt-1 mb-1 px-6 py-2 text-sm bg-gray-200" style={{ color: '#CACCCF' }}>Labore et dolore magna aliqua</div> */}
      <div className="w-full mt-auto">
        <div className="mt-3 mb-3 px-6 py-4 lg:text-lg text-base">Rp. {`${data ? parseInt(data.price).toLocaleString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.').replace(/,/g, '.') : ''}`} / {`${data ? data.packageExpiredType : ''}`}</div>
        <div className="flex flex-wrap">
          <div className="text-center text-sm w-1/2 flex lg:pl-6 pl-3">
            <button value={`${data ? data.packageCode : ''}`} onClick={data && data.hasTrial === 1 ? (value) => handleClick('register') : handleClick} style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }} className="w-full text-center text-white lg:text-sm text-xs py-1 focus:outline-none">Coba Sekarang!</button>
          </div>
          <Link to="/contact-us" className="text-center text-sm w-1/2 lg:pr-6 pr-3 my-auto">Contact Us?</Link>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = { 
  PackageAction,
  ToggleModalAction
}

export default connect(null, mapDispatchToProps)(PriceThumbnail)