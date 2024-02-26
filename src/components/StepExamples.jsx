import ModalCloseButton from './ModalCloseButton'

const ExampleTile = ({ project, instruction }) => {
  return (
    <div className="flex flex-col items-start gap-y-3 w-full">
      <span className="text-xl font-bold text-text">
        {project}
      </span>

      <span className="text-lg text-text">
        {instruction}
      </span>
    </div>
  )
}

export default ({ title, examples, picture, onClose }) => {
  const exampleTiles = examples.map(({ project, instruction }, index) => {
    return (
      <ExampleTile
        key={index}
        project={project}
        instruction={instruction}
      />
    )
  })
  return (
    <div className="bg-background flex flex-col gap-y-5 p-3 justify-start items-center h-full">
      <div className="flex justify-between items-center w-full">
        <span className="text-2xl font-bold text-primary">
          Ejemplos de {title.toLowerCase()}
        </span>

        <ModalCloseButton onClose={onClose} />
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col gap-y-7 grow w-1/2">
          {exampleTiles}
        </div>

        <div className="flex justify-center items-center grow w-1/2">
          <img
            className="w-80 h-80 py-7"
            src={picture}
          />
        </div>
      </div>
    </div>
  )
}
