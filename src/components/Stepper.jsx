import 'animate.css'
import { useState } from 'react'
import { useHover } from '../utilities/hooks'
import { GoDotFill } from "react-icons/go"
import Modal from 'react-modal'
import StepExamples from './StepExamples'
import InformPicture from '../assets/steps-pictures/informar.png'
import PlanPicture from '../assets/steps-pictures/planificar.png'
import DecidePicture from '../assets/steps-pictures/decidir.png'
import ExecutePicture from '../assets/steps-pictures/ejecutar.png'
import ControlPicture from '../assets/steps-pictures/controlar.png'
import EvaluatePicture from '../assets/steps-pictures/valorar.png'


const StepCircle = ({ number, isSelected }) => {
  const [isHovering, hoveringEvents] = useHover()

  return (
    <div
      className={
        `flex justify-center items-center rounded-full w-fit h-fit p-3 bg-primary transition ease-in-out delay-150 duration-300 ${isHovering ? "-translate-y-1 scale-105" : ""}`
      }
    >
      <div
        {...hoveringEvents}
        className={
          `flex justify-center items-center rounded-full w-24 h-24 cursor-pointer transition-colors delay-75 duration-100 ${isSelected || isHovering ? "bg-primary" : "bg-background"}`
        }
      >
        <span
          className={
            `text-5xl font-bold transition-colors delay-75 duration-100 ${isSelected || isHovering ? "text-white" : "text-primary"} transition ease-in-out delay-150 duration-300 ${isHovering ? "font-extrabold" : ""}`
          }
        >
          {number}
        </span>
      </div>
    </div>
  )
}

const StepBar = () => {
  return (
    <div
      className={
        `w-4 min-h-24 grow rounded-lg bg-primary`
      }
    >
    </div>
  )
}

const StepExamplesButton = ({ onClick }) => {
  const [isHovering, hoveringEvents] = useHover()

  return (
    <button
      {...hoveringEvents}
      onClick={onClick}
      className={
        `bg-primary px-2 py-1 rounded-lg transition ease-in-out delay-150 duration-300 ${isHovering ? "-translate-y-1 scale-105" : ""}`
      }
    >
      <span
        className={
          `text-sm text-white transition ease-in-out delay-150 duration-300 ${isHovering ? "font-bold" : "font-medium"}`
        }
      >
        Ver ejemplos
      </span>
    </button>
  )
}

const Step = ({
  title, description, examples, picture, number, isSelected, onSelect, hideBar, isInitial
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex gap-x-7">
        <div
          onClick={onSelect}
          className="flex flex-col gap-y-2 items-center"
        >
          <StepCircle number={number} isSelected={isSelected} />

          {
            !hideBar ?
              <StepBar /> :
              null
          }
        </div>

        <div className="flex flex-col gap-y-4 pt-7 max-w-96">
          <span className="text-3xl font-bold text-text">
            {title}
          </span>

          {
            isSelected ?
              (
                <div className="flex flex-col gap-y-4 animate__animated animate__fadeIn">
                  <span className="text-lg text-text ease-in-out">
                    {description}
                  </span>

                  {
                    !isInitial ?
                      (

                        <StepExamplesButton
                          onClick={() => setIsModalOpen(true)}
                        />
                      ) :
                      null
                  }
                </div>
              ) :
              null
          }
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            padding: 0,
            height: "fit-content",
            margin: "auto"
          }
        }}
      >
        <StepExamples
          title={title}
          examples={examples}
          picture={picture}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  )
}

const Stepper = ({ steps }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const stepsElements = steps.map(({ title, description, examples, picture, isInitial }, index) => {
    return (
      <Step
        key={index}
        title={title}
        description={description}
        examples={examples}
        picture={picture}
        number={isInitial ? <GoDotFill /> : index}
        isSelected={index === selectedIndex}
        onSelect={() => setSelectedIndex(index)}
        hideBar={index === steps.length - 1}
        isInitial={isInitial}
      />
    )
  })

  return (
    <div className="flex flex-col gap-y-2 bg-background">
      {stepsElements}
    </div>
  )
}

export default () => {
  const steps = [
    {
      title: "¿Qué es el modelo de proyectos?",
      description: "Una metodología estructurada por fases para que realices efectivamente cualquiera de tus proyectos.",
      isInitial: true
    },
    {
      title: "Informar",
      description: "Los integrantes se dedican a recopilar información de diversas fuentes como el Internet, los libros, entre otros. Esto con el fin de construir una base de conocimiento útil para la realización del proyecto.",
      picture: InformPicture,
      examples: [
        {
          project: "Cocinar una pizza",
          instruction: "Averiguar los ingredientes necesarios para cocinar una pizza e investigar sobre el proceso de elaboración de una pizza."
        },
        {
          project: "Hacer las compras de la casa",
          instruction: "Revisar lo que hace falta en la casa para determinar qué productos hay que comprar."
        }
      ]
    },
    {
      title: "Planificar",
      description: "Se elabora un plan de trabajo que indica las tareas necesarias para la realización del proyecto, sus respectivos tiempos, junto con las herramientas y/o medios a utilizar para el cumplimiento de tales tareas. Este plan de trabajo es solo una aproximación de cómo se va a realizar el proyecto, entonces es necesario disponer de una margen abierto en cada aspecto, para realizar adaptaciones justificadas debido a las circunstancias, en caso de ser necesario.",
      picture: PlanPicture,
      examples: [
        {
          project: "Ir de viaje a Luxemburgo",
          instruction: "Elaborar un cronograma de las actividades relacionadas al viaje, como alistar la maleta, tomar el vuelo, visitar ciertas localidades, entre otros."
        },
        {
          project: "Cambiar el sistema operativo de una computadora",
          instruction: "Definir el medio de instalación (DVD o USB), el tipo de instalación (NetInstall o autocontenida), las nuevas particiones el disco duro, el sistema de ficheros a utilizar y otras tareas relacionadas a la instalación."
        }
      ]
    },
    {
      title: "Decidir",
      description: "Los integrantes deciden cuál de las posibles estrategias seguir para realizar el proyecto de la manera más efectiva posible.",
      picture: DecidePicture,
      examples: [
        {
          project: "Trasladarse de Cartago a San José",
          instruction: "Analizar las ventajas y desventajas de los medios de transporte que hay disponibles para transportarse de Cartago a San José, que son el autobús, el tren o algún tipo de taxi. Seguido, escoger el transporte más apropiado para las circunstancias presentes."
        },
        {
          project: "Confeccionar los suéteres de la generación 2024 del CTP Don Bosco",
          instruction: "Escoger uno de todos los proveedores de soluciones textiles que hay disponibles para la confección de los suéteres."
        }
      ]
    },
    {
      title: "Ejecutar",
      description: "Los integrantes realizan las tareas asignadas según el plan de trabajo previamente elaborado, en los tiempos establecidos, usando las herramientas y/o medios definidos.",
      picture: ExecutePicture,
      examples: [
        {
          project: "Informar a la población sobre el precio de las acciones comunes de las entidades registradas en la Bolsa Nacional de Valores",
          instruction: "Desarrollar una aplicación web que le permita a los usuarios visualizar los precios de las acciones de algunas de las entidades registradas en la Bolsa Nacional de Valores, en tiempo real."
        },
        {
          project: "Redactar un ensayo sobre la Segunda Guerra Mundial",
          instruction: "Escribir en el programa Word el contenido de un ensayo sobre la Segunda Guerra Mundial."
        }
      ]
    },
    {
      title: "Controlar",
      description: "Durante la ejecución, constantemente se comparan los resultados parciales de las tareas con los resultados esperados respectivos. Además, se hacen las correcciones requeridas de manera continua.",
      picture: ControlPicture,
      examples: [
        {
          project: "Pintar una pared de concreto",
          instruction: "Pasar las manos de pintura que sean necesarias para que la pared quede bien pintada, si de momento no está bien pintada."
        },
        {
          project: "Bajar de peso",
          instruction: "Pesar mi cuerpo periódicamente para medir mi progreso y dimensionar la efectividad de mi dieta y rutina de ejercicios. Si mi dieta o rutina de ejercicios no está siendo efectiva, modificarla apropiadamente."
        }
      ]
    },
    {
      title: "Valorar",
      description: "Una vez finalizado el proyecto, los integrantes realizan una autoevaluación sobre el producto final del proyecto y el proceso de realización de este. De esta manera, los integrantes identifican los posibles errores cometidos durante el proceso de realización del proyecto.",
      picture: EvaluatePicture,
      examples: [
        {
          project: "Preparar una exposición sobre las bases de datos relacionales",
          instruction: "Practicar la exposición para ver si es efectiva e identificar errores en la exposición que la hacen inefectiva de ser el caso."
        },
        {
          project: "Realizar el correo del amor y la amistad en el CTP Don Bosco",
          instruction: "Evaluar si se entregaron todos los pedidos a tiempo y de una manera efectiva, seguido, identificar errores en el proceso y cambiar la estrategia de ser necesario."
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col justify-center items-center py-3 px-5 bg-background">
      <Stepper steps={steps} />
    </div>
  )
}
