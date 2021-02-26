import { React, useState, useEffect, useContext } from '../libraries'
import { UserContext } from '../modules/masters/useContext_Master'
import { FaChevronDown } from '../assets/icons'
import { Heading } from '../components/atoms'
import { NavTop, Footer, FooterContentGeneral, HelmetComponent } from '../components/molecules'
import { TopBg } from '../assets/images'
import { ApiTokenRedux } from '../modules/api'

const Faq = () => {
  const tokenContext = useContext(UserContext)
  const [faqList, setFaqList] = useState([])
  const [HelmetData] = useState({
    title: "ZEROXense - FAQ"
  })

  const getFaqList = (TokenValue) => {
    ApiTokenRedux.get('/v1/faqs', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setFaqList(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    if(tokenContext !== "")
      getFaqList(tokenContext);
  }, [tokenContext])

  return (
    <>
      <HelmetComponent data={HelmetData} />
      <div className="relative mb-10">
        <div className="w-full absolute top-0" style={{ backgroundImage: `url(${TopBg})`, height: '500px' }}></div>
        <NavTop Active="faq" />
        <div className="wrap-navbar-content lg:container relative">
          <Heading Type="heading-top" ClassName="text-white pt-10 mb-5" Text="FAQ" />
          <p className="text-white leading-tight md:text-base sm:text-sm text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun</p>
          <div className="px-6 pt-4 pb-1 pb-10con mt-5 bg-white shadow-lg rounded-lg text-left">
            {!faqList === false && faqList ? 
              <ComponentFaqList data={faqList && faqList} /> : ('')
              // <div className="w-full text-left cursor-pointer my-6">Loading ...</div>
            }
          </div>
        </div>
      </div>
      <div className="mb-32">
        <FooterContentGeneral />
      </div>
      <div style={{ backgroundColor: '#2B2E35' }} className="relative">
        <div className="wrap-navbar-content lg:container">
          <Footer />
        </div>
      </div>
    </>
  )
}

const ComponentFaqList = ({data,}) => {
  const [toggleStatus, setToggleStatus] = useState(null)

  const handleToggle = (evt) => {
    const attribute = evt.currentTarget.getAttribute("data-value")
    const status = parseInt((toggleStatus !== attribute && attribute))
    setToggleStatus(status)
  }

  let list = []
  
  if(data.length > 0){
    for(let i=0;i<data.length;i++){
      list.push(
        <div key={data[i].faqId} className="w-full text-left cursor-pointer my-6" data-value={data[i].faqId} onClick={handleToggle}>
          <div className="w-full flex sm:flex-wrap flex-no-wrap items-center">
            <p className="sm:text-base text-sm">{`${data[i].faqTitle}`}</p>
            <FaChevronDown className="ml-auto" />
          </div>
          <div className={`block bg-gray-300 p-3 mt-3 transition-all opacity-0 ${toggleStatus !== null ? ((toggleStatus === data[i].faqId) ? "block" : "hidden") : ((i !== 0) && "hidden")}`}>
            <div className="w-full sm:text-sm text-xs" dangerouslySetInnerHTML={{__html: data[i].faqContent}}></div>
          </div>
        </div>
      )
    }
  }

  return list
}

export default Faq