import 'animate.css'
import { useState } from 'react'
import { useHover } from '../utilities/hooks'
import { GrPrevious, GrNext } from "react-icons/gr"
import ModalCloseButton from './ModalCloseButton'
import InformPicture from '../assets/example-pictures/informar.jpeg'
import PlanPicture from '../assets/example-pictures/planificar.jpeg'
import DecidePicture from '../assets/example-pictures/decidir.jpeg'
import ExecutePicture from '../assets/example-pictures/ejecutar.jpeg'
import ControlPicture from '../assets/example-pictures/controlar.jpeg'
import EvaluatePicture from '../assets/example-pictures/valorar.jpeg'

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

const StepCarousel = ({ steps, index, onChangeIndex }) => {
  const canIncrementIndex = index < steps.length - 1
  const canDecrementIndex = index > 0

  const incremenetCurrentIndex = () => {
    if (canIncrementIndex) {
      onChangeIndex(index + 1)
    }
  }

  const decremenetCurrentIndex = () => {
    if (canDecrementIndex) {
      onChangeIndex(index - 1)
    }
  }

  return (
    <div className="bg-background flex justify-evenly items-center gap-x-3 w-full">
      <CarouselButton
        icon={<GrPrevious />}
        onClick={decremenetCurrentIndex}
        isHidden={!canDecrementIndex}
      />

      <div
        key={index}
        className="flex flex-col justify-center items-center w-2/3 animate__animated animate__fadeIn"
      >
        <img
          className="h-full w-60 rounded-md -rotate-90"
          src={steps[index].picture}
        />

        <span className="text-lg text-text text-justify w-2/3">
          {steps[index].description}
        </span>
      </div>

      <CarouselButton
        icon={<GrNext />}
        onClick={incremenetCurrentIndex}
        isHidden={!canIncrementIndex}
      /> 
    </div>
  )
}

export default ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const steps = [
    {
      picture: InformPicture,
      title: "Informar",
      description: "Se recopila la materia de química desde el material brindado por la profesora."
    },
    {
      picture: PlanPicture,
      title: "Planificar",
      description: "Se define cómo se va a estructurar la información (mapa conceptual, tablas, párrafos, entre otros), además, se define un tiempo para escribir cada parte del resumen."
    },
    {
      picture: DecidePicture,
      title: "Decidir",
      description: "Se hace un análisis de las ventajas y desventajas de los medios disponibles para escribir el resumen (papel y lapicero, digital o infografías) y con base a este análisis se escoge un medio. En este caso, se decide escribir el resumen con papel y lapicero."
    },
    {
      picture: ExecutePicture,
      title: "Ejecutar",
      description: "Se escriben las distintas partes del resumen en los tiempos establecidos."
    },
    {
      picture: ControlPicture,
      title: "Controlar",
      description: "Después de escribir cada parte, se lee la parte para ver si la información está resumida de la manera correcta, contiene toda la información necesaria y la información se puede escanear fácilmente. Si la parte no cumple los requisitos, se tacha y se reescribe de la manera correcta."
    },
    {
      picture: EvaluatePicture,
      title: "Valorar",
      description: "Cuando el resumen está listo, se estudia y se verifica que se pueda aprender fácilmente mediante este. Se pone en práctica el conocimiento adquirido mediante el resumen con una práctica asignada por la profesora."
    },
  ]

  return (
    <div className="bg-background flex flex-col gap-y-5 p-3 justify-start items-center h-full">
      <div className="flex justify-between items-center w-full">
        <span className="text-2xl font-bold text-primary">
          Haciendo un resumen de química: {steps[currentIndex].title}
        </span>

        <ModalCloseButton onClose={onClose} />
      </div>

      <div className="flex justify-center items-center grow w-full">
        <StepCarousel
          steps={steps}
          index={currentIndex}
          onChangeIndex={setCurrentIndex}
        />
      </div>
    </div>
  )
}
