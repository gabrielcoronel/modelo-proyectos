import { useState } from 'react'
import { useHover } from '../utilities/hooks'
import { GrPrevious, GrNext } from "react-icons/gr"
import first from '../assets/example-pictures/1.jpeg'
import ModalCloseButton from './ModalCloseButton'

const CarouselButton = ({ icon, onClick, isHidden }) => {
  const [isHovering, hoveringEvents] = useHover()

  return (
    <span
      {...hoveringEvents}
      onClick={onClick}
      className={
        `text-5xl text-primary transition ease-in-out delay-150 duration-300 ${isHovering ? "-translate-y-1 scale-110" : ""} ${isHidden ? "invisible" : ""}`
      }
    >
      {icon}
    </span>
  )
}

const StepCarousel = ({ steps }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const canIncrementCurrentIndex = currentIndex < steps.length - 1
  const canDecrementCurrentIndex = currentIndex > 0

  const incremenetCurrentIndex = () => {
    if (canIncrementCurrentIndex) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const decremenetCurrentIndex = () => {
    if (canDecrementCurrentIndex) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="bg-background flex justify-evenly items-center gap-x-7 w-full">
      <CarouselButton
        icon={<GrPrevious />}
        onClick={decremenetCurrentIndex}
        isHidden={!canDecrementCurrentIndex}
      />

      <div
        className="flex flex-col justify-center items-center gap-y-3"
      >
        <img
          className="h-80 w-100 rounded-md"
          src={steps[currentIndex].picture}
        />

        <span className="text-lg text-text text-center w-2/3">
          {steps[currentIndex].description}
        </span>
      </div>

      <CarouselButton
        icon={<GrNext />}
        onClick={incremenetCurrentIndex}
        isHidden={!canIncrementCurrentIndex}
      /> 
    </div>
  )
}

export default ({ onClose }) => {
  const steps = [
    { picture: first, description: "First step" },
    { picture: first, description: "Second step" },
    { picture: first, description: "En este paso nos aseguramos que el resumen cumpla su función de presentar información fácil de escanear En este paso nos aseguramos que el resumen cumpla su función de presentar información fácil de escanear" },
  ]

  return (
    <div className="bg-background flex flex-col gap-y-5 p-3 justify-start items-center h-full">
      <div className="flex justify-end items-center w-full">
        <ModalCloseButton onClose={onClose} />
      </div>

      <div className="flex justify-center items-center grow w-full">
        <StepCarousel steps={steps} />
      </div>
    </div>
  )
}
