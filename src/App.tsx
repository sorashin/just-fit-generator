import Rhino3dmSample from './components/molecules/Rhino3dmSample'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rhino3dm: any
  }
}

function App() {
  

  

  
  return (
    <>
      <Rhino3dmSample />
      
    </>
  )
}

export default App
