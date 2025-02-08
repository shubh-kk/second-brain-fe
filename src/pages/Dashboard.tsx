import { useState, useEffect } from "react"
import CreateContentModal from '../components/CreateContentModal'
import { PlusIcon } from '../components/icons/PlusIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { SideBar } from '../components/SideBar'
import { useContent} from "../hooks/UseContent"
import axios from "axios"
import { BACKEND_URL } from "../config"

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent() ;

  //when model closes refech the contents
  useEffect(()=> { 
    refresh() ;
  }, [modalOpen])

  return <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <div className='flex'> <SideBar /></div>
    <div className='ml-72 p-6 flex flex-col gap-4'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false)
      }} />
      <div className="flex justify-end gap-3 mb-4 w-full">
        <Button text='Add Content' onClick={() => { setModalOpen(true) }} variant={"primary"} startIcon={<PlusIcon />} />
        <Button text='Share' onClick={async () => { 
          const response = await axios.get(`${BACKEND_URL}/api/brain/share`, {share: true},{
            headers : {
              "authorization": localStorage.getItem("token")
            }
          }); 
          const shareUrl = `http://localhost:5173/share/${response.data.hash}` ;
          alert(shareUrl) ;
        }} variant={"secondary"} startIcon={<ShareIcon />} /> 
      </div>
      <div className='flex flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          contents.map(({ title, link, type }) => <Card
           type={type} title={title} link={link}
          />)
        }
      </div>
    </div>
  </div>
}

export default Dashboard