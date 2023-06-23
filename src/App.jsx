import { Home } from "./pages/Home"
import { TaskManager } from "./pages/TaskManager"
import {Routes,Route} from 'react-router-dom'
import {EditPage} from './pages/EditPage'
function App() {
  return (
   <div className="flex w-full items-center justify-start flex-col bg-zinc-200 min-h-screen font-Roboto">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/edit/:id'} element={<EditPage />} />
      </Routes>
   </div>
  )
}

export default App
