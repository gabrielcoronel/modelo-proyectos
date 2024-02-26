import { useState } from 'react'
import { useHover } from '../utilities/hooks'
import { FaPlay } from "react-icons/fa"
import Modal from 'react-modal'
import ExampleDisplay from './ExampleDisplay'

export default () => {
  const [isHovering, hoveringEvents] = useHover()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center w-full py-4 px-3 bg-primary shadow-2xl shadow-primary">
        <span className="text-3xl font-bold text-background">
          Modelo de Proyectos
        </span>

        <span
          {...hoveringEvents}
          className={
            `flex items-center gap-x-2 text-lg text-background cursor-pointer transition-all ease-in-out delay-150 duration-300 ${isHovering ? "-translate-y-1 scale-105 font-bold" : ""}`
          }
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlay /> Ejemplo interactivo
        </span>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            padding: 0
          }
        }}
      >
        <ExampleDisplay
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  )
}
