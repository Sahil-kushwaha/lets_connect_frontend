import { useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { validateAvatar } from "../utils/validator";

const ProfileEdit = ({ userData }) => {
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [age, setAge] = useState(userData?.age);
  const [gender, setGender] = useState(userData?.gender);
  const [skills, setSkills] = useState(userData?.skills);
  const [about, setAbout] = useState(userData?.about);
  //profile edit states
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [error, setError] = useState("");
  const [newSkill, setNewSkill] = useState("");
  // avatar update related states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState("");
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditProfile((prev) => {
      return !prev;
    });
  };

  // avatar update related functions
  const handleAvatarClick = () => {
    setIsModalOpen(true);
    setSelectedAvatarFile("");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAvatarSelect = (e) => {
    setSelectedAvatarFile(e.target.files[0]);
    // validate avatar file size and type
    if (validateAvatar(e.target.files)) {
      toast.warn(validateAvatar(e.target.files));
      setSelectedAvatarFile("");
      e.target.value = "";
      return;
    }
  };

  const toastId = useRef();
  const handleAvatarSubmit = async () => {
    try {
      if (!selectedAvatarFile) {
        toast.warn("Please select a file first!");
        return;
      }
      toastId.current = toast(
        <span className="text-blue-500">Uploading...</span>,
        { type: "info", autoClose: false, isLoading: true }
      );
      const formData = new FormData();
      formData.append("avatar", selectedAvatarFile);
      const res = await axios.put(
        BASE_URL + "/api/v1/profile/avatar/update",
        formData,
        { withCredentials: true }
      );
      toast.update(toastId.current, {
        render: "Avatar Uploaded Successfully ",
        type: "success",
        autoClose: "3000",
        isLoading: false,
      });
      dispatch(addUser({ ...userData, avatarUrl: res.data.data.avatarUrl }));
      setIsModalOpen(false);
    } catch (error) {
      setSelectedAvatarFile("");
      console.error(error);
      toast.update(toastId.current, {
        render: error.message,
        type: "error",
        autoClose: "3000",
        isLoading: false,
      });
    }
  };

  // Function to add a skill to the array
  const handleAddSkill = () => {
    // Only add if the input is not empty and the skill isn't already in the list
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  // Function to remove a skill from the array
  const handleRemoveSkill = (skillToRemove) => {
    // Filter out the skill to be removed
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleProfileSubmit = async () => {
    try {
      setError("");
      const res = await axios.patch(
        `${BASE_URL}/api/v1/profile/update`,
        {
          firstName,
          lastName,
          age,
          gender,
          skills,
          about,
        },
        { withCredentials: true }
      );

      if (res.data.data) dispatch(addUser(res.data.data));

      toast.success("Profile Updated Successfully");
      setIsEditProfile(false);
    } catch (error) {
      const message = error.response.data?.message;
      console.error(message);
      toast.error(message);
      setError(message);
    }
  };

  return (
    <div
      className={`${isEditProfile ? "w-full flex max-sm:flex-wrap gap-y-2 justify-center p-4 items" : "flex justify-center p-4"}`}
    >
      {isModalOpen && (
        <Modal
          isEditProfile={isEditProfile}
          handleCloseModal={handleCloseModal}
          handleAvatarSelect={handleAvatarSelect}
          handleAvatarSubmit={handleAvatarSubmit}
          selectedAvatarFile={selectedAvatarFile}
        />
      )}
      <ProfileCard
        firstName={firstName}
        lastName={lastName}
        email={userData?.emailId}
        age={age}
        skills={skills}
        about={about}
        gender={gender}
        avatarUrl={userData?.avatarUrl}
        isEdit={isEditProfile}
        handleEdit={handleEdit}
        handleAvatarClick={handleAvatarClick}
        className={"max-w-sm sm:max-w-[315px] lg:min-w-lg"}
      />
      {isEditProfile && (
        <>
          <div className="min-w-0.5 bg-radial max-sm:hidden from-5% from-neutral-400  to-neutral-950"></div>
          <div className="bg-base-300 p-8 rounded-lg shadow-lg sm:min-w-80 lg:w-lg ">
            <h2 className="text-2xl font-medium mb-4">Edit Profile</h2>
            {error && (
              <p className="text-red-500 font-medium font-serif">
                Error:: {error}
              </p>
            )}
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-blue-300 text-sm font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-400 leading-tight focus:outline-none focus:shadow-outline"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-blue-300 text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-400 leading-tight focus:outline-none focus:shadow-outline"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-blue-300 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-400 leading-tight focus:outline-none focus:shadow-outline"
                value={userData?.emailId}
              />
            </div>
            <div className="mb-4 flex justify-between">
              <div className="basis-2/3 min-w-20">
                <label
                  htmlFor="gender"
                  className="block text-blue-300 text-sm font-medium mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-400 leading-tight focus:outline-none focus:shadow-outline"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="min-w-14">
                <label
                  htmlFor="age"
                  className="block text-blue-300 text-sm font-medium mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  min={18}
                  max={60}
                  id="age"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-400 leading-tight focus:outline-none focus:shadow-outline"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="skills"
                className="block text-blue-300 text-sm font-bold mb-2"
              >
                Skills
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="skills"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-400 leading-tight focus:outline-none focus:shadow-outline"
                  value={newSkill}
                  placeholder="Skills..."
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent form submission
                      handleAddSkill();
                    }
                  }}
                />
                <button
                  type="button"
                  className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAddSkill}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Display the list of skills */}
            <div className="mb-4">
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="bg-black text-neutral-200 rounded-full border border-neutral-400 px-3 py-1 text-sm flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700 font-bold"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-blue-300 text-sm font-medium mb-2"
              >
                About
              </label>
              <textarea
                id="bio"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-400 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                value={about}
                maxLength={200}
                placeholder="Bio..."
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleProfileSubmit}
              >
                Save Profile
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileEdit;
