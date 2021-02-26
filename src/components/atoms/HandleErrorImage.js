import imgnotfound from '../../assets/images/image-not-found.png'

const HandleErrorImage = (ev) => {
  ev.target.src = imgnotfound
}

export default HandleErrorImage