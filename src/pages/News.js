import { React, useState, useEffect, Link, useContext } from '../libraries'
import { UserContext } from '../modules/masters/useContext_Master'
import { Heading } from '../components/atoms'
import { NavTop, HighlightClient, ContactUsFooter, Footer, HelmetComponent } from '../components/molecules'
import { bgContentHome } from '../assets/images'
import { ApiTokenRedux } from '../modules/api'

const News = () => {
  const tokenContext = useContext(UserContext)

  const [recentNews, setRecentNews] = useState([])

  const [Text] = useState({
    HeadingTop: "Collects private and leaked data from digital world"
  })

  const [HelmetData] = useState({
    title: "ZEROXense - News",
    description: "",
    keywords: ""
  })

  const ListNews = ({data}) => {
    const listNews = []
    for (var i = 3; i < data.length; i++) {
      listNews.push(
        <div key={i} className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-64 sm:p-2 py-2 pl-0 pr-4 flex-none">
          <Link to={`/detail-news/${data[i].slug}`}>
            <div className="flex flex-wrap rounded-lg" style={{ backgroundImage: `url(${data[i].newsImage})`, backgroundSize: 'cover', height: '350px' }}>
              <div className="w-full mt-auto text-white px-4 pb-6">
                <Heading ClassName="text-md mb-2" Text={`${data[i].newsTitle.length > 55 ? `${data[i].newsTitle.substring(0, 55)} ...` : `${data[i].newsTitle}`}`} />
                <p className="leading-snug" style={{ fontSize: '10px' }}>
                  {data[i].newsContent.replace(/<[^>]+>/g, '').length > 150 ? `${data[i].newsContent.replace(/<[^>]+>/g, '').substring(0, 150)} ...` : `${data[i].newsContent.replace(/<[^>]+>/g, '')}`}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )
    }
    return listNews
  }

  const getRecentNews = (TokenValue) => {
    ApiTokenRedux.get('/v1/news', {
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


  useEffect(() => {
    if(tokenContext !== "")
      getRecentNews(tokenContext);
  }, [tokenContext])

  return (
    <>
      <HelmetComponent data={HelmetData} />
      <div style={{ backgroundImage: 'linear-gradient(0deg, #182253 28.01%, #03040A 50.23%, #000000 100%)' }}>
        <NavTop Active="news" />
        <div className="wrap-navbar-content wrap-price-list lg:container pb-8">
          <div className="w-2/3 mt-10 mb-5">
            <Heading Type="heading-top" Text={Text.HeadingTop} />
          </div>
          <div className="w-full pt-10">
            <Heading Type="heading-section" Text="Our Recent News" ClassName="text-white mb-5" />
            <div className="flex sm:flex-wrap flex-no-wrap sm:overflow-visible overflow-x-scroll sm:overflow-y-visible overflow-y-hidden text-white">
              {!recentNews === false && recentNews[0] ?
                <Link className="sm:w-1/2 w-64 sm:flex-none flex" to={`detail-news/${recentNews[0].slug}`}>
                  <div className="sm:w-full w-64 flex flex-wrap px-3 highlight-news-first" style={{ backgroundImage: `url(${recentNews[0].newsImage})`, backgroundSize: 'cover' }}>
                    <div className="mt-auto pb-5 text-left">
                      <h4 className="text-xl">
                        {recentNews[0].newsTitle.length > 55 ? `${recentNews[0].newsTitle.substring(0, 55)} ...` : `${recentNews[0].newsTitle}`}
                      </h4>
                      <p className="text-xs">
                        {recentNews[0].newsContent.replace(/<[^>]+>/g, '').length > 150 ? `${recentNews[0].newsContent.replace(/<[^>]+>/g, '').substring(0, 150)} ...` : `${recentNews[0].newsContent.replace(/<[^>]+>/g, '')}`}
                      </p>
                    </div>
                  </div>
                </Link> : ('')
                // <div className="w-1/2 px-3 flex flex-wrap animate" style={{ height: '500px' }}>Loading ...</div>
              }
              <div className="sm:w-1/2 sm:flex-wrap flex pl-3">
                {!recentNews === false && recentNews[1] ?
                  <Link className="sm:w-full w-64 flex-none sm:float-left float-none sm:pl-0 pl-3" to={`detail-news/${recentNews[1].slug}`}>
                    <div className="flex flex-wrap mb-3 highlight-news-second" style={{ backgroundImage: `url(${recentNews[1].newsImage})`, backgroundSize: '100% 100%' }}>
                      <div className="mt-auto px-3 pb-3 text-left">
                        <h4 className="text-xl">
                          {recentNews[1].newsTitle.length > 55 ? `${recentNews[1].newsTitle.substring(0, 55)} ...` : `${recentNews[1].newsTitle}`}
                        </h4>
                        <p className="text-xs">
                          {recentNews[1].newsContent.replace(/<[^>]+>/g, '').length > 150 ? `${recentNews[1].newsContent.replace(/<[^>]+>/g, '').substring(0, 150)} ...` : `${recentNews[1].newsContent.replace(/<[^>]+>/g, '')}`}
                        </p>
                      </div>
                    </div> 
                  </Link> : ('')
                  // <div className="w-full mb-3 flex flex-wrap animate" style={{ height: '244px' }}>Loading ...</div>
                }
                {!recentNews === false && recentNews[2] ?
                  <Link className="sm:w-full w-64 flex-none sm:float-left float-none sm:pl-0 pl-3" to={`detail-news/${recentNews[2].slug}`}>
                    <div className="flex flex-wrap highlight-news-second" style={{ backgroundImage: `url(${recentNews[2].newsImage})`, backgroundSize: '100% 100%' }}>
                      <div className="mt-auto px-3 pb-3 text-left">
                        <h4 className="text-xl">
                          {recentNews[2].newsTitle.length > 55 ? `${recentNews[2].newsTitle.substring(0, 55)} ...` : `${recentNews[2].newsTitle}`}
                        </h4>
                        <p className="text-xs">
                          {recentNews[2].newsContent.replace(/<[^>]+>/g, '').length > 150 ? `${recentNews[2].newsContent.replace(/<[^>]+>/g, '').substring(0, 150)} ...` : `${recentNews[2].newsContent.replace(/<[^>]+>/g, '')}`}
                        </p>
                      </div>
                    </div> 
                  </Link> : ('')
                  // <div className="w-full flex flex-wrap animate" style={{ height: '244px' }}>Loading ...</div>
                }
              </div>
            </div>
          </div>
          <div className="w-full mt-10 flex sm:flex-wrap flex-no-wrap sm:overflow-x-visible overflow-x-scroll">
            {!recentNews === false ? 
              recentNews.length > 0 ? 
                  <ListNews data={recentNews} />
                : ''
              : ''
            }
          </div>
        </div>
      </div>
      <div className="mt-10" style={{ backgroundImage: `url(${bgContentHome})`, minHeight: "250px", marginTop: "-450px", paddingTop: "450px", paddingBottom: "450px" }}>
        <HighlightClient />
      </div>
      <div style={{ backgroundColor: '#2B2E35', marginTop: '-450px' }} className="pt-20">
        <div className="wrap-navbar-content lg:container">
          <ContactUsFooter />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default News