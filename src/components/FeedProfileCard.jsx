const FeedProfileCard = ({
  firstName,
  lastName,
  avatarUrl,
  gender,
  skills,
  about,
  handleIgnore,
  handleInterest,
  className,
}) => {
  function captalizeFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div
      className={`card bg-base-300 max-w-56 max-h-96 shadow-sm ${className}`}
    >
      <figure>
        <div className="rounded-[50%] h-34 w-34 border mt-3 overflow-clip">
          <img
            src={avatarUrl}
            alt="avatar"
            className="object-center w-full h-auto"
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-neutral-200">
          <span>{captalizeFirst(firstName)}</span>
          <span>{captalizeFirst(lastName)}</span>
        </h2>
        <div className="h-[1px] bg-radial from-10% from-neutral-400  to-neutral-950"></div>
        {gender && (
          <p>
            <span className="text-blue-300">Gender :</span>{" "}
            <span className="text-neutral-400">{gender}</span>
          </p>
        )}
        {about && (
          <p className="text-neutral-400 text-nowrap overflow-hidden overflow-ellipsis">
            <span className="text-blue-300">About :</span>
            {about}
          </p>
        )}
        {skills && (
          <p className="text-neutral-400 text-nowrap overflow-hidden overflow-ellipsis">
            <span className="text-blue-300">Skills :</span> {skills.join(" , ")}
          </p>
        )}
        <div className="card-actions justify-end">
          <button
            className="btn bg-green-500 hover:bg-green-700"
            onClick={handleInterest}
          >
            Interest
          </button>
          <button
            className="btn bg-blue-500 hover:bg-blue-700"
            onClick={handleIgnore}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedProfileCard;
