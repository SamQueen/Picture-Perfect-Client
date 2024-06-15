import React from 'react'

const CustomButton = ({text, type}: CustomButton) => {
  
    if (type === 'primary') {
        return (
            <div className='text-sm px-4 py-1 bg-blue-400 w-fit text-white rounded cursor-pointer'>
                {text}
            </div>
        )
    }
  
    return (
        <div className='text-sm px-4 py-1 bg-gray-200 w-fit text-black rounded cursor-pointer'>
            {text}
        </div>
    )
}

export default CustomButton