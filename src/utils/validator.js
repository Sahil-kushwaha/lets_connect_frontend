export const validateAvatar = (files) => {
  const validFileFormat = ["image/jpg", "image/jpeg", "image/png"];
  if (!validFileFormat.includes(files[0].type)) {
    return "Only .jpg, .jpeg, .png file allowed";
  }
  const MaxSize = 1; // in mb
  const allowedMaxSizeInByte = MaxSize * 1024 * 1024;
  const fileSize = files[0].size;
  if (fileSize > allowedMaxSizeInByte) {
    return "file must be less than 1mb";
  }
  return 0;
};
