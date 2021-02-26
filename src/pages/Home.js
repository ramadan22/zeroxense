import { React, Link, useState, useEffect, useContext, DateFormat } from '../libraries'
import { PieChart } from 'react-minimal-pie-chart'
import { UserContext } from '../modules/masters/useContext_Master'
import { ButtonBg } from '../assets/images/button'
import { Heading } from '../components/atoms'
import { NavTop, HighlightClient, ContactUsFooter, PriceThumbnail, ModalDefault, Footer, HelmetComponent } from '../components/molecules'
import { LoadingPackages } from '../components/molecules/loading'
import { ApiTokenRedux } from '../modules/api'
import { bgContentHome } from '../assets/images'
import Style from '../assets/css/style'

const Home = () => {
  const tokenContext = useContext(UserContext)
  const [recentNews, setRecentNews] = useState([])
  const [packages, setPackages] = useState([])
  const [notifications, setNotifications] = useState([])
  const [staticData, setStaticData] = useState({})
  const [banner, setBanner] = useState(null)
  const [spiner, setSpiner] = useState(false)
  const [emailLeaked, setEmailLeaked] = useState(null)
  const [ModalData, setModalData] = useState({
    Text: '',
    Type: ''
  })

  const [HelmetData] = useState({
    title: "ZEROXense - Home",
    description: "",
    keywords: ""
  })

  const handleChangeEmailLeaked = (event) => {
    setEmailLeaked(event.target.value)
  }

  const handleSubmitEmailLeaked = (event) => {
    event.preventDefault()
    setSpiner(true)
    ApiTokenRedux.post('/v1/leaked/info', {email: emailLeaked}, {
      headers: {
        Authorization: `Bearer ${tokenContext}`
      }
    })
    .then(res => {
      setSpiner(false)
      setModalData({...ModalData, Text: res.data.Message, Type: 'info'})
    })
    .catch(function (error) {
      setSpiner(false)
      console.log(error)
    })
  }

  const handleCounter = (value) => {
    setModalData({...ModalData, Text: '', Type: ''})
  }

  const getNews = (TokenValue) => {
    ApiTokenRedux.get('/v1/news?limit=4', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setRecentNews(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const getPackage = (TokenValue) => {
    ApiTokenRedux.get('/v1/packages', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setPackages(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const getBanner = (TokenValue) => {
    ApiTokenRedux.get('/v1/banners?limit=1', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setBanner(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const getNotifications = (TokenValue) => {
    ApiTokenRedux.get('/v1/notifications?limit=15', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setNotifications(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const getStatic = (TokenValue) => {
    ApiTokenRedux.get('/v1/statistic/data', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setStaticData(res.data.Data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    if(tokenContext !== "")
      getNews(tokenContext);
  }, [tokenContext])

  useEffect(() => {
    if(tokenContext !== "")
      getPackage(tokenContext);
  }, [tokenContext])
  
  useEffect(() => {
    if(tokenContext !== "")
      getBanner(tokenContext);
  }, [tokenContext])

  useEffect(() => {
    if(tokenContext !== "")
      getNotifications(tokenContext);
  }, [tokenContext])

  useEffect(() => {
    if(tokenContext !== "")
      getStatic(tokenContext);
  }, [tokenContext])

  const ListNotification = ({data}) => {
    return (
      <div className="w-full flex flex-wrap text-white mb-1" style={{ fontSize: "10px" }}>
        <div className="sm:w-2/12 w-3/12">{`${data.notificationTitle}`}</div>
        <div className="sm:w-5/12 w-6/12 pr-1" dangerouslySetInnerHTML={{ __html: data.notificationContent }}></div>
        <div className="sm:w-5/12 w-3/12 pl-1">
          <DateFormat dateTime={data.createdAt} />
        </div>
      </div>
    )
  }

  return (
    <>
      <HelmetComponent data={HelmetData} />
      {ModalData.Type !== '' && ModalData.Type === 'info' ? (
        <>
          <Style overflow="hidden" paddingRight="17px" />
          <ModalDefault Text={`${ModalData.Text}`} Type={`${ModalData.Type}`} closeStatus={(value) => handleCounter(value)} />
        </>
      ) : ('')}
      <div style={{ backgroundImage: `url(${banner ? banner[0].bannerImage : ''})`, backgroundSize: 'cover' }}>
        <NavTop Active="home" />
        <div className="wrap-navbar-content lg:container">
          <div className="md:w-2/3 w-full md:mt-10 md:pt-0 pt-12 mb-5">
            <Heading Type="heading-top" Text={`${banner ? banner[0].bannerTitle : ''}`} />
          </div>
          <div className="md:w-5/12 sm:w-8/12 w-full mb-5">
            <div className="text-white leading-tight md:text-base sm:text-sm text-xs" dangerouslySetInnerHTML={{ __html: banner ? banner[0].bannerLessContent : '' }}></div>
          </div>
          <Link to={`/detail/banner-content/${banner ? banner[0].bannerId : ''}-${banner ? banner[0].bannerTitle.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-') : ''}`} className="text-white border-b border-solid pl-1 pr-4 mt-5 md:text-base sm:text-sm text-xs" style={{ borderColor: '#1F7E80' }}>Read More</Link>
          <div className="flex flex-wrap mt-6">
            <div className="md:w-1/2 w-full">
              <h4 className="lg:text-lg md:text-base sm:text-sm text-xs mb-2 text-white">Find out with ZEROXense</h4>
              <form onSubmit={handleSubmitEmailLeaked}>
                <div className="flex text-sm">
                  <input type="email" onChange={handleChangeEmailLeaked} className="h-10 w-64 px-3 py-4 rounded-l-sm focus:outline-none" placeholder="Enter your Email address" required />
                  <button type="submit" className="text-white text-xs bg-right w-32 focus:outline-none" style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: 'cover' }}>
                    {spiner ? <i className="fa fa-spinner fa-spin mr-1"></i> : ''} Check Now
                  </button>
                </div>
                <p className="text-white text-xs mt-2">Check if your password has been leaked and get a report to your email</p>
              </form>
            </div>
            <div className="md:w-1/2 w-full md:pt-0 pt-10 flex md:justify-end">
              {notifications ?
                <div className="notification-banner">
                  <h4 className="text-lg mb-2 text-white">Important Notifications!</h4>
                  <div className="h-24 overflow-auto w-full">
                    {notifications.length > 0 ? 
                      notifications.map((res, index) => {
                        return <ListNotification key={index} data={res} />
                      }) : ''
                    }
                  </div>
                </div> : ''
              }
            </div>
          </div>
        </div>
      </div>
      <div className="wrap-navbar-content lg:container text-center pt-10 pb-10">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl">Live Statistic</h1>
        <div className="flex flex-wrap justify-center mt-6">
          <div className="lg:h-64 h-auto lg:w-3/12 sm:w-6/12 w-full lg:p-16 md:p-24 p-16 sm:pb-16 pb-0 pt-5 relative bg-white sm:border-r border-0 border-solid" style={{ borderColor: 'rgba(232, 232, 232, 1)' }}>
            <div className="relative flex justify-center">
              <PieChart
                data={[
                  { title: 'Two', value: Object.keys(staticData).length > 0 ? parseInt(staticData.database.percentage) : 0, color: 'rgba(251, 78, 78, 1)' },
                  { title: 'One', value: Object.keys(staticData).length > 0 ? 100-parseInt(staticData.database.percentage) : 0, color: '#fff' }
                ]}
              />
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', borderColor: '#fff', backgroundColor: 'rgba(251, 78, 78, 1)', borderWidth: '15px' }} className="border-solid m-auto inset-y-0 absolute z-10"></div>
            </div>
            <p className="text-sm mt-5 mb-2">{`${Object.keys(staticData).length > 0 ? parseInt(staticData.database.percentage) : 0}`}% Total Database</p>
            <p className="text-2xl" style={{ color: 'rgba(251, 78, 78, 1)' }}>{`${Object.keys(staticData).length > 0 ? parseInt(staticData.database.total) : 0}`}</p>
          </div>
          <div className="lg:h-64 h-auto lg:w-3/12 sm:w-6/12 w-full lg:p-16 md:p-24 p-16 sm:pb-16 pb-0 pt-5 relative bg-white">
            <div className="relative flex justify-center">
              <PieChart
                data={[
                  { title: 'Two', value: Object.keys(staticData).length > 0 ? parseInt(staticData.domain.percentage) : 0, color: 'rgba(31, 134, 219, 1)' },
                  { title: 'One', value: Object.keys(staticData).length > 0 ? 100-parseInt(staticData.domain.percentage) : 0, color: '#fff' }
                ]}
              />
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', borderColor: '#fff', backgroundColor: 'rgba(31, 134, 219, 1)', borderWidth: '15px' }} className="border-solid m-auto inset-y-0 absolute z-10"></div>
            </div>
            <p className="text-sm mt-5 mb-2">{`${Object.keys(staticData).length > 0 ? parseInt(staticData.domain.percentage) : 0}`}% Domain</p>
            <p className="text-2xl" style={{ color: 'rgba(31, 134, 219, 1)' }}>{`${Object.keys(staticData).length > 0 ? parseInt(staticData.domain.total) : 0}`}</p>
          </div>
          <div className="lg:h-64 h-auto lg:w-3/12 sm:w-6/12 w-full lg:p-16 md:p-24 p-16 sm:pb-16 pb-0 pt-5 relative bg-white lg:border-l boder-0 border-solid" style={{ borderColor: 'rgba(232, 232, 232, 1)' }}>
            <div className="w-full relative flex flex-wrap justify-center">
              <PieChart
                data={[
                  { title: 'Two', value: Object.keys(staticData).length > 0 ? parseInt(staticData.record.percentage) : 0, color: 'rgba(246, 166, 9, 1)' },
                  { title: 'One', value: Object.keys(staticData).length > 0 ? 100-parseInt(staticData.record.percentage) : 0, color: '#fff' }
                ]}
              />
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', borderColor: '#fff', backgroundColor: 'rgba(246, 166, 9, 1)', borderWidth: '15px' }} className="border-solid m-auto inset-y-0 absolute z-10"></div>
            </div>
            <p className="text-sm mt-5 mb-2">{`${Object.keys(staticData).length > 0 ? parseInt(staticData.record.percentage) : 0}`}% All Record</p>
            <p className="text-2xl" style={{ color: 'rgba(246, 166, 9, 1)' }}>{`${Object.keys(staticData).length > 0 ? parseInt(staticData.record.total) : 0}`}</p>
          </div>
        </div>
      </div>
      <div className="wrap-navbar-content lg:container text-center text-white mt-10">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl text-black mb-10">Recent News</h1>
        <div className="flex flex-wrap justify-center">
          <div className="lg:w-8/12 md:w-10/12 w-full flex flex-wrap">
            <div className="sm:w-1/2 sm:mb-0 mb-2 w-full pr-2">
            {recentNews.length > 0 && recentNews[0] ?
              <Link to={`detail-news/${recentNews[0].slug}`}>
                <div className="rounded-md flex flex-wrap px-6" style={{ height: '300px', backgroundImage: `url(${recentNews[0].newsImage})`, backgroundSize: 'cover' }}>
                  <div className="mt-auto pb-5 text-left">
                    <h4 className="md:text-xl sm:text-lg text-base">
                      {recentNews[0].newsTitle.length > 55 ? `${recentNews[0].newsTitle.substring(0, 55)} ...` : `${recentNews[0].newsTitle}`}
                    </h4>
                    <p className="text-xs">
                      {recentNews[0].newsContent.replace(/<[^>]+>/g, '').length > 150 ? `${recentNews[0].newsContent.replace(/<[^>]+>/g, '').substring(0, 150)} ...` : `${recentNews[0].newsContent.replace(/<[^>]+>/g, '')}`}
                    </p>
                  </div>
                </div>
              </Link> : 
              <div className="rounded-md flex flex-wrap px-6 animate rounded-md" style={{ height: '300px' }}></div>
            }
            </div>
            <div className="sm:w-1/2 w-full flex flex-wrap">
              <div className="w-1/2 sm:mb-0 mb-2 pr-1 mb-2">
                {recentNews.length > 0 && recentNews[1] ?
                  <Link to={`detail-news/${recentNews[1].slug}`}>
                    <div className="flex flex-wrap sm:px-3 px-1 pb-3 text-left rounded-md" style={{ height: '142px', backgroundImage: `url(${recentNews[1].newsImage})`, backgroundSize: 'cover' }}>
                      <div className="mt-auto">
                        <h4 className="sm:text-sm sm:font-normal font-bold text-xs">
                          {recentNews[1].newsTitle.length > 20 ? `${recentNews[1].newsTitle.substring(0, 20)} ...` : `${recentNews[1].newsTitle}`}
                        </h4>
                        <p style={{ fontSize: '10px' }}>
                          {recentNews[1].newsContent.replace(/<[^>]+>/g, '').length > 40 ? `${recentNews[1].newsContent.replace(/<[^>]+>/g, '').substring(0, 40)} ...` : `${recentNews[1].newsContent.replace(/<[^>]+>/g, '')}`}
                        </p>
                      </div>
                    </div>
                  </Link> : 
                  <div className="flex flex-wrap px-3 pb-3 text-left animate rounded-md" style={{ height: '142px' }}></div>
                }
              </div>
              <div className="w-1/2 sm:mb-0 mb-2 pl-1 mb-2">
                {recentNews.length > 0 && recentNews[2] ?
                  <Link to={`detail-news/${recentNews[2].slug}`}>
                    <div className="flex flex-wrap sm:px-3 px-1 pb-3 text-left rounded-md" style={{ height: '142px', backgroundImage: `url(${recentNews[2].newsImage})`, backgroundSize: 'cover' }}>
                      <div className="mt-auto">
                        <h4 className="sm:text-sm sm:font-normal font-bold text-xs">
                          {recentNews[2].newsTitle.length > 20 ? `${recentNews[2].newsTitle.substring(0, 20)} ...` : `${recentNews[2].newsTitle}`}
                        </h4>
                        <p style={{ fontSize: '10px' }}>
                          {recentNews[2].newsContent.replace(/<[^>]+>/g, '').length > 40 ? `${recentNews[2].newsContent.replace(/<[^>]+>/g, '').substring(0, 40)} ...` : `${recentNews[2].newsContent.replace(/<[^>]+>/g, '')}`}
                        </p>
                      </div>
                    </div>
                  </Link> : 
                  <div className="flex flex-wrap px-3 pb-3 text-left animate" style={{ height: '142px' }}></div>
                }
              </div>
              {recentNews.length > 0 ?
                recentNews[3] && 
                  <Link to={`detail-news/${recentNews[3].slug}`} className="w-full">
                    <div className="w-full pr-2 rounded-md flex flex-wrap px-4" style={{ height: '150px', backgroundImage: `url(${recentNews[3].newsImage})`, backgroundSize: 'cover' }}>
                      <div className="mt-auto text-left pb-4">
                        <h4 className="md:text-xl sm:text-lg text-base">
                          {recentNews[3].newsTitle.length > 30 ? `${recentNews[3].newsTitle.substring(0, 30)} ...` : `${recentNews[3].newsTitle}`}
                        </h4>
                        <p className="text-sm">
                          {recentNews[3].newsContent.replace(/<[^>]+>/g, '').length > 100 ? `${recentNews[3].newsContent.replace(/<[^>]+>/g, '').substring(0, 100)} ...` : `${recentNews[3].newsContent.replace(/<[^>]+>/g, '')}`}
                        </p>
                      </div>
                    </div>
                  </Link> 
              : <div className="w-full pr-2 rounded-md flex flex-wrap px-4 animate" style={{ height: '150px' }}></div> }
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10" style={{ backgroundImage: `url(${bgContentHome})`, backgroundSize: 'cover', minHeight: "550px", marginTop: "-160px", paddingTop: "200px", paddingBottom: "400px" }}>
        <HighlightClient />
      </div>
      <div className="w-full relative" style={{ top: "-350px" }}>
        <div className="wrap-navbar-content wrap-price-list lg:container md:mb-20 sm:mb-10 mb-0">
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center text-white mb-5 mt-10">Pricing and Package</h1>
          <div className="wrap-inner pb-10">
            {packages && packages.length > 0 ? (
              packages.map((res, index) => {
                return (
                  <div key={index} className={`md:w-1/3 sm:w-1/2 w-4/5 md:mx-none mx-auto md:${index === 1 ? "mt-0" : "mt-6"} mt-6 lg:px-5 sm:px-2 sm:px-0 pr-5 sm:float-left flex-none`}>
                    <PriceThumbnail data={res} />
                  </div>)})
              ) : (
                <>
                  <LoadingPackages />
                  <LoadingPackages />
                  <LoadingPackages />
                </>
              )
            }
            <div className="w-full sm:hidden block" style={{ clear: 'both' }}></div>
          </div>
        </div>
        <p className="w-full text-center md:mt-20 sm:10 mt-5 md:text-lg sm:text-base text-sm px-5"><span style={{ color: '#F6A609' }}>Limitied offer</span>, Save 20% an annual plans. Get it now!</p>
      </div>
      <div style={{ backgroundColor: '#2B2E35', marginTop: '-300px' }} className="pt-20">
        <div className="wrap-navbar-content lg:container">
          <ContactUsFooter />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Home