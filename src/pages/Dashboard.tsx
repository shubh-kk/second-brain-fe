import axios from "axios"
import copy from 'clipboard-copy'
import { useState, useEffect } from "react"

import CreateContentModal from '../components/CreateContentModal'
import { PlusIcon } from '../components/icons/PlusIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { SideBar } from '../components/SideBar'
import { useContent } from "../hooks/UseContent"
import { BACKEND_URL } from "../config"

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { contents, refresh } = useContent();

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, 
        { share: true },
        {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }
      );

      const shareUrl = `http://localhost:5173/share/${response.data.link}`;
      await copy(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (error: any) {
      console.error('Share error:', error);
      alert(error.response?.data?.msg || 'Failed to generate share link');
    }finally {
      setIsSharing(false);
    }
  };
  // when modal closes, refresh the contents
  useEffect(() => {
    refresh();
  }, [modalOpen]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className='flex'>
        <SideBar />
      </div>
      <div className='ml-72 p-6 flex flex-col gap-4'>
        <CreateContentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
        <div className="flex justify-end gap-3 mb-4 w-full">
          <Button 
            text='Add Content' 
            onClick={() => setModalOpen(true)} 
            variant="primary" 
            startIcon={<PlusIcon />} 
          />
          <Button
            text={isSharing ? '' : 'Share'}
            onClick={handleShare}
            variant="secondary"
            startIcon={isSharing ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : <ShareIcon />}
            disabled={isSharing}
          />
        </div>
        <div className='flex flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {contents.map(({ title, link, type, _id }) => (
            <Card
              key={_id}
              type={type}
              title={title}
              link={link}
              contentId={_id}
              onDelete={refresh}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;