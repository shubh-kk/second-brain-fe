import './App.css'
import { useState } from "react"
import CreateContentModal from './CreateContentModal'
import { PlusIcon } from './components/icons/PlusIcon'
import { ShareIcon } from './components/icons/ShareIcon'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { SideBar } from './components/SideBar'

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <div className='flex'> <SideBar /></div>
    <div className='ml-72 p-6 flex flex-col gap-4'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false)
      }} />
      <div className="flex justify-end gap-3 mb-4 w-full">
        <Button text='Add Content' onClick={() => { setModalOpen(true) }} variant={"primary"} startIcon={<PlusIcon />} />
        <Button text='Share' onClick={() => { }} variant={"secondary"} fullWidth={true} startIcon={<ShareIcon />} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card title='Youtube' link='https://www.youtube.com/watch?v=u3c8OQaeLWo' type='youtube' />
        <Card title='Twitter' link='https://x.com/shubh_khodke/status/1885697153793761374' type='twitter' />
      </div>
    </div>
  </div>
}

export default App
