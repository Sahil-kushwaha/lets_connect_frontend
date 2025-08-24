import { UserPen } from "lucide-react";
const ProfileCard = ({
  firstName,
  lastName,
  email,
  avatarUrl,
  age,
  gender,
  skills,
  about,
  isEdit,
  handleEdit,
  handleAvatarClick,
}) => {
  function captalizeFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="card bg-base-300  shadow-sm">
      <figure className="relative">
        <div className="rounded-[50%] h-34 w-34 border mt-3 overflow-clip">
          <img
            src={avatarUrl}
            alt="avatar"
            className="object-center w-full h-auto"
          />
        </div>
        <button
          className="relative cursor-pointer top-15"
          onClick={handleAvatarClick}
        >
          <UserPen />
        </button>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-neutral-200">
          <span>{captalizeFirst(firstName)}</span>
          <span>{captalizeFirst(lastName)}</span>
        </h2>
        <div className="h-[1px] bg-radial from-10% from-neutral-400  to-neutral-950"></div>
        <p>
          <span className="text-blue-300">Email :</span>{" "}
          <span className="text-neutral-400">{email}</span>
        </p>
        {gender && (
          <p>
            <span className="text-blue-300">Gender :</span>{" "}
            <span className="text-neutral-400">{gender}</span>
          </p>
        )}
        {age && (
          <p>
            <span className="text-blue-300">Age :</span>{" "}
            <span className="text-neutral-400">{age}</span>
          </p>
        )}
        {about && (
          <p className="">
            <span className="text-blue-300">About :</span>{" "}
            <span className="text-neutral-400  break-words">{about}</span>
          </p>
        )}
        {skills && (
          <p>
            <span className="text-blue-300">Skills :</span>{" "}
            <span className="text-neutral-400">{skills.join(" , ")}</span>
          </p>
        )}
        <div className="card-actions justify-end">
          <button
            className="btn bg-blue-500 hover:bg-blue-700"
            onClick={handleEdit}
          >
            {isEdit ? "Abort" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
