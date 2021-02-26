import { React, useState, useEffect } from '../../libraries'

const Heading = (props) => {
  const { Text, Type, ClassName } = props

  const [classValue, setClassValue] = useState("")

  useEffect(() => {
    switch(Type){
      case "heading-top":
        setClassValue(`xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white leading-tight ${ClassName}`)
        break
      case "heading-section":
        setClassValue(`lg:text-4xl md:text-3xl sm:text-2xl text-xl ${ClassName}`)
        break
      default:
        setClassValue(ClassName)
    }
  }, [Type, ClassName])

  return (
    <h1 className={classValue}>{Text}</h1>
  )
}

Heading.defaultProps = {
  Text: "Text heading default",
  Type: "",
  ClassName: ""
}

export default Heading