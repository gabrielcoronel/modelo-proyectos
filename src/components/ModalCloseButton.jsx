import { useHover } from '../utilities/hooks'
import { IoClose } from "react-icons/io5"

export default ({ onClose }) => {
  const [isHovering, hoveringEvents] = useHover()

  return (
    <span
      {...hoveringEvents}
      className={
        `text-4xl text-primary cursor-pointer transition ease-in-out delay-150 duration-300 ${isHovering ? "-translate-y-1 scale-110" : ""}`
      }
      onClick={onClose}
    >
      <IoClose />
    </span>
  )
}
