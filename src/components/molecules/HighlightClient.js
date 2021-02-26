import { React, useEffect, useState, useContext } from '../../libraries'
import { UserContext } from '../../modules/masters/useContext_Master'
import { ApiTokenRedux } from '../../modules/api'

const HighlightClient = () => {
  const tokenContext = useContext(UserContext)
  const [clientData, setClientData] = useState([])

  const getClient = (TokenValue) => {
    ApiTokenRedux.get('/v1/clients', {
      headers: {
        Authorization: `Bearer ${TokenValue}`
      }
    })
    .then(res => {
      setClientData(res.data.Data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    if(tokenContext !== "")
      getClient(tokenContext);
  }, [tokenContext])

  return (
    <div className="wrap-navbar-content lg:container md:pt-0 pt-10">
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center text-white mb-5">Our Clients</h1>
      <div className="flex flex-wrap justify-center">
        {!clientData === false ? (
            clientData.length > 0 ? (
              clientData.map((res, index) => {
                return <img key={index} src={`${res.clientImage}`} alt="logo client" className="mx-5 my-10 md:w-32 w-24" />
              })
            ) : ('')
          ) : ('')
        }
      </div>
    </div>
  )
}

export default HighlightClient