import { React, Link, useLocation, useEffect, useState, useContext } from '../libraries'
import { UserContext } from '../modules/masters/useContext_Master'
import { Heading, HandleErrorImage } from '../components/atoms'
import { NavTop, HighlightClient, ContactUsFooter, Footer, HelmetComponent } from '../components/molecules'
import { ButtonBg } from '../assets/images/button'
import { Union } from '../assets/images'
import { ApiTokenRedux } from '../modules/api'
import {  
  bgContentHome,
  LogoFacebook,
  LogoTwitter,
  LogoLinkedin,
  LogoShare
} from '../assets/images'

const ListSideNews = ({data}) => {
  return (
    <div className="w-full flex flex-wrap mb-5">
      <div className="bg-gray-400 md:h-12 sm:h-24 h-12 w-1/5">
        <Link to={`/detail-news/${data.slug}`}>
          <img src={`${data.newsImage}`} onError={HandleErrorImage} alt={`${data.newsTitle}`} className="h-full w-full object-cover" />
        </Link>
      </div>
      <p className="w-4/5 text-xs text-left pl-3 leading-tight my-auto">
        <Link to={`/detail-news/${data.slug}`}>
          {`${data.newsTitle.length > 40 ? data.newsTitle.substring(0,50)+'...' : data.newsTitle }`}
        </Link>
      </p>
    </div>
  )
}

const DetailNews = () => {
  const tokenContext = useContext(UserContext)
  const [detailNews, setDetailNews] = useState({})
  const [popularNews, setPopularNews] = useState({})
  const [recentPost, setRecentPost] = useState({})
  const [inputSearch, setInputSearch] = useState('')
  const [listSearch, setListSearch] = useState([])
  const [allNews, setAllNews] = useState([])
  const [nextNews, setNextNews] = useState([])
  const [previousNews, setPreviousNews] = useState([])
  const [HelmetData, SetHelmetData] = useState({})

  const paramsLocation = useLocation()

  const fullUrl = window.location.href

  const paramSend = paramsLocation.pathname.split("/").pop()

  const getDetailNews = (TokenValue) => {
    setListSearch([])
    ApiTokenRedux.get(`/v1/news/show?slug=${paramSend}`, {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setDetailNews(res.data.Data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const getPopularNews = (TokenValue) => {
    ApiTokenRedux.get(`/v1/news/popular?limit=6`, {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setPopularNews(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const getRecentPost = (TokenValue) => {
    ApiTokenRedux.get(`/v1/news/recent?limit=6`, {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setRecentPost(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const listNews = []

  for (var i = 0; i < 6; i++) {
    listNews.push(
      <div key={i} className="w-full flex flex-wrap mb-5">
        <div className="bg-gray-400 h-12 w-1/5"></div>
        <p className="w-4/5 text-xs text-left pl-3 leading-tight my-auto">Euismod urna rhoncus Lorem Ipsum Adsz</p>
      </div>
    )
  }

  const handleChange = (event) => {
    setInputSearch(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    ApiTokenRedux.get(`/v1/news?keyword=${inputSearch}`, {
      headers: {
        Authorization: `Bearer ${tokenContext}`
      }
    })
    .then(res => {
      setListSearch(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }

  useEffect(() => {
    if(tokenContext !== "") 
      getDetailNews(tokenContext);
    
  }, [paramSend, tokenContext])

  useEffect(() => {
    if(tokenContext !== "")
      getPopularNews(tokenContext);
  }, [tokenContext])

  useEffect(() => {
    if(tokenContext !== "")
      getRecentPost(tokenContext);
  }, [tokenContext])

  useEffect(() => {
    ApiTokenRedux.get(`/v1/news`, {
      headers: {
        Authorization: `Bearer ${tokenContext}`
      }
    })
    .then(res => {
      setAllNews(res.data.Data.data)
    })
    .catch(function (error) {
      setAllNews([])
    })
  }, [tokenContext, detailNews])

  useEffect(() => {
    allNews.map((res, index) => {
      if(res.slug === paramSend){
        setNextNews(allNews[index+1] !== undefined ? allNews[index+1].slug : allNews[index].slug)
        setPreviousNews(allNews[index-1] !== undefined ? allNews[index-1].slug : allNews[index].slug)
      }
    })
  }, [allNews])

  useEffect(() => {
    if(Object.keys(detailNews).length > 0){
      let keywordsPros = `${detailNews.slug}`
      let keywords = ""
      keywordsPros.split('-').map(res => {
        keywords = keywords+res+","
      })
      keywords = keywords.substring(0, (keywords.length - 1))
      let description = `${detailNews.newsContent}`
      SetHelmetData({
        title: `ZEROXense - News - ${detailNews.newsTitle}`,
        description: description.replace(/<[^>]+>/g, '').substring(0, 160),
        keywords: keywords,
        image: `${detailNews.newsImage}`
      })
    }
  }, [detailNews])

  return (
    <>
      {Object.keys(HelmetData).length > 0 ? (
        <HelmetComponent data={HelmetData} />
      ) : ('')}
      <div style={{ backgroundImage: 'linear-gradient(0deg, #182253 28.01%, #03040A 50.23%, #000000 100%)'}}>
        <NavTop />
        <div className="wrap-navbar-content lg:container pb-8">
          <div className="w-full pt-10">
            <div className="flex flex-wrap text-white">
              <div className="md:w-1/4 w-full md:px-3 px-0 md:pt-0 pt-5">
                <div className="flex flex-wrap">
                  <div className="w-full relative border border-solid rounded pb-1" style={{borderColor: '#20958aad'}}>
                    <form onSubmit={handleSearch} className="w-full flex pr-2">
                      <input type="search" onChange={handleChange} value={`${inputSearch}`} className={`w-full text-xs h-8 rounded bg-transparent border-0 focus:outline-none px-3 pt-1 mr-auto my-auto`} placeholder="Text here .." />
                      <button className="focus:outline-none">
                        <img src={Union} alt="icon search" className="inline ml-auto my-auto" />
                      </button>
                    </form>
                  </div>
                  <h1 className="lg:text-2xl md:text-xl sm:text-lg text-base text-white mb-5 pt-5">Popular Post</h1>
                  {!popularNews === false ? (
                      popularNews.length > 0 ? (
                        popularNews.map((res, index) => {
                          return (<ListSideNews key={index} data={res} />)
                        })
                       ) : ('')
                    ) : (''
                      // <div className="w-full flex flex-wrap mb-5">Loading ...</div>
                    )
                  }
                  <h1 className="lg:text-2xl md:text-xl sm:text-lg text-base text-white mb-5 pt-5">Popular Post</h1>
                  {!recentPost === false ? (
                      recentPost.length > 0 ? (
                        recentPost.map((res, index) => {
                          return (<ListSideNews key={index} data={res} />)
                        })
                       ) : ('')
                    ) : (''
                      // <div className="w-full flex flex-wrap mb-5">Loading ...</div>
                    )
                  }
                </div>
              </div>
              <div className="md:w-3/4 w-full md:pl-16 px-0">
                {listSearch.length > 0 ? (
                  listSearch.map((res, index) => {
                    return(
                      <div className="w-full mb-10 pb-5">
                        <Heading Type="heading-section" Text={`${!res === false && res.newsTitle !== undefined ? res.newsTitle : ''}`} ClassName="text-white mb-5" />
                        {!res === false && res.newsImage !== undefined ?
                          <img src={`${res.newsImage}`} onError={HandleErrorImage} alt="dummy 1" className="w-full object-cover shadow rounded mb-4" style={{height: '620px'}} /> :
                          <div className="w-full animate rounded" style={{height: '620px'}}></div>
                        }
                        <div className="w-full mb-5">
                          {`${!res === false && res.newsContent !== undefined ? 
                              ((res.newsContent.replace(/<[^>]+>/g, '').length > 225) ? res.newsContent.replace(/<[^>]+>/g, '').substring(0, 225) : res.newsContent.replace(/<[^>]+>/g, '')) 
                          : ('')}`}
                        </div>
                        <div className="flex mb-10">
                          <Link to={`detail-news/${res.slug}`} style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }} className="text-center text-white mx-auto py-1 px-6 mt-10 inline-block text-sm">See Article</Link>
                        </div>
                        <hr style={{ borderColor: '#313546' }} />
                      </div>
                    )
                  })
                ) : ('')}
                {listSearch.length < 1 &&
                  <>
                    <Heading Type="heading-section" Text={`${!detailNews === false && detailNews.newsTitle !== undefined ? detailNews.newsTitle : ''}`} ClassName="text-white mb-5" />
                    {!detailNews === false && detailNews.newsImage !== undefined ?
                      <img src={`${detailNews.newsImage}`} onError={HandleErrorImage} alt="dummy 1" className="w-full object-cover shadow rounded" style={{height: '620px'}} /> :
                      <div className="w-full animate rounded" style={{height: '620px'}}></div>
                    }
                    <div className="flex mb-20">
                      <Link to="" style={{ backgroundImage: `url(${ButtonBg})`, backgroundSize: '100% 100%' }} className="text-center text-white mx-auto py-1 px-20 mt-10 inline-block">Lorem ipsum?</Link>
                    </div>
                    <div className="w-full" style={{minHeight: '500px'}} dangerouslySetInnerHTML={{__html: !detailNews === false && detailNews.newsContent !== undefined ? detailNews.newsContent : ''}}></div>
                    <div className="flex flex-wrap mt-10 mb-10 justify-end">
                      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${fullUrl}`} rel="noopener noreferrer" target="_blank">
                        <img src={LogoLinkedin} alt="logo linkedin" className="inline mr-4" />
                      </a>
                      <a href={`https://www.facebook.com/sharer.php?u=${fullUrl}`} rel="noopener noreferrer" target="_blank">
                        <img src={LogoFacebook} alt="logo facebook" className="inline mr-4" />
                      </a>
                      <a href={`https://twitter.com/intent/tweet?url=${fullUrl}`} rel="noopener noreferrer" target="_blank">
                        <img src={LogoTwitter} alt="logo twitter" className="inline mr-4" />
                      </a>
                      <img src={LogoShare} alt="logo share" className="inline" />
                      <div className="w-full mt-4"></div>
                      <div className="w-1/2">
                        <Link to={`/detail-news/${previousNews !== undefined ? previousNews : "#"}`} className={`w-full inline-block text-center border border-solid border-white py-2 md:text-lg sm:text-base text-sm`}>Previous Post</Link>
                      </div>
                      <div className="w-1/2">
                        <Link to={`/detail-news/${nextNews !== undefined ? nextNews : "#"}`} className={`w-full inline-block text-center border border-solid border-white py-2 md:text-lg sm:text-base text-sm`}>Next Post</Link>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
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

export default DetailNews