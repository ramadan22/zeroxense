import { React, Helmet, useState, useEffect } from '../../../libraries'
import { LogoIAS } from '../../../assets/images'

const HelmetComponent = ({ data }) => {
  const fullUrl = window.location.href
  const [image, setImage] = useState(LogoIAS)
  const [description, setDescription] = useState("")
  const [keywords, setKeywords] = useState("")

  useEffect(() => {
    if(Object.keys(data).length > 0 && data.image !== undefined)
      setImage(data.image)
  }, [data])

  useEffect(() => {
    if(Object.keys(data).length > 0 && data.description !== undefined)
      setDescription(data.description)
  }, [data])

  useEffect(() => {
    if(Object.keys(data).length > 0 && data.keywords !== undefined)
      setKeywords(data.keywords)
  }, [data])

  return (
    <Helmet>
      <title>{`${data.title}`}</title>
      <meta name="robots" content="noindex" />
      <meta name="description" content={`${description}`} />
      <meta name="keywords" content={`${keywords}`} />

      <meta property="og:url" content={`${fullUrl}`} />
      {/* <meta property="og:type" content="article" /> */}
      <meta property="og:title" content={`${data.title}`} />
      <meta property="og:description" content={`${description}`} />
      <meta property="og:image" content={`${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${data.title}`} />
      <meta name="twitter:description" content={`${description}`} />
      <meta name="twitter:image" content={`${keywords}`} />
    </Helmet>
  )
}

HelmetComponent.defaultProps = {
  data: {}
}

export default HelmetComponent