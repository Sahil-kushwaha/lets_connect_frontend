import { X } from "lucide-react";
const Modal = ({
  isEditProfile,
  handleCloseModal,
  handleAvatarSelect,
  handleAvatarSubmit,
  selectedAvatarFile,
}) => {
  return (
    <div className="absolute inset-0 min-w-full min-h-full backdrop-blur-xl p-0 m-0 z-50 flex justify-center p-10 overflow-hidden">
      <div
        className={`min-w-1/3 ${isEditProfile ? "h-96" : ""} flex flex-col  gap-6 border border-neutral-400 bg-base-300 rounded-2xl pt-10 px-6 `}
      >
        <button className="cursor-pointer fixed" onClick={handleCloseModal}>
          <X />
        </button>
        <label
          htmlFor="avatar"
          className="block text-blue-300 text-lg font-medium mb-2 text-center"
        >
          Select Avatar
        </label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/jpeg ,image/png ,image/jpg"
          className="shadow appearance-none  bg-neutral-800 border rounded w-full py-2 px-3 text-neutral-100 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleAvatarSelect}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAvatarSubmit}
        >
          Upload File
        </button>
        {selectedAvatarFile && (
          <p className="text-yellow-300 pb-2">
            Selected File: {selectedAvatarFile.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default Modal;
