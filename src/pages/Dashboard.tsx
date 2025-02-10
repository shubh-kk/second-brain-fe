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

// Dashboard component for displaying and managing content
function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [isSharing, setIsSharing] = useState(false); // State to manage sharing status
  const { contents, refresh } = useContent(); // Custom hook to fetch content

  // Function to handle sharing content
  const handleShare = async () => {
    try {
      setIsSharing(true); // Set sharing state to true
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, 
        { share: true },
        {
          headers: {
            "Authorization": localStorage.getItem("token") // Include token in headers
          }
        }
      );

      const shareUrl = `http://localhost:5173/share/${response.data.link}`; // Construct share URL
      await copy(shareUrl); // Copy share URL to clipboard
      alert('Share link copied to clipboard!'); // Notify user
    } catch (error: any) {
      console.error('Share error:', error);
      alert(error.response?.data?.msg || 'Failed to generate share link'); // Handle error
    } finally {
      setIsSharing(false); // Reset sharing state
    }
  };

  // Refresh contents when modal closes
  useEffect(() => {
    refresh();
  }, [modalOpen]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <SideBar /> {/* Sidebar for navigation */}
      <div className="md:ml-72 p-6 flex flex-col gap-4">
        <CreateContentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} // Close modal on button click
        />
        <div className="flex justify-end gap-3 mb-4 w-full">
          <Button 
            text='Add Content' 
            onClick={() => setModalOpen(true)} // Open modal on button click
            variant="primary" 
            startIcon={<PlusIcon />} 
          />
          <Button
            text={isSharing ? '' : 'Share'} // Change button text based on sharing state
            onClick={handleShare}
            variant="secondary"
            startIcon={isSharing ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : <ShareIcon />}
            disabled={isSharing} // Disable button while sharing
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {contents.map(({ title, link, type, _id }) => (
            <Card
              key={_id}
              type={type}
              title={title}
              link={link}
              contentId={_id}
              onDelete={refresh} // Refresh contents after deletion
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;