import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';

const DeleteButton = ({ handleDeleteClick }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full">
      <button
            className="bg-red-600 text-white py-4 rounded-md flex items-center justify-center hover:bg-red-700 w-full"
            onClick={handleDeleteClick}
        >
        Delete <FaRegTrashCan className="ml-2 text-sm" />
      </button>
    </div>
  )
}

export default DeleteButton