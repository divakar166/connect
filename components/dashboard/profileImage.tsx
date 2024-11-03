import Image from 'next/image';
import { useState } from 'react';

interface ProfileImageProps {
  src: string;
  onImageSelect: (file: File) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, onImageSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        onImageSelect(files[0]);
      }
    };
    fileInput.click();
  };

  return (
    <div
      className="relative w-[150px] h-[150px] outline-slate-400 outline-1 outline rounded-full overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleImageClick}
    >
      <Image
        src={src || '/default-profile.png'}
        alt="Profile Image"
        width={150}
        height={150}
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm rounded-full">
          Click to change
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
