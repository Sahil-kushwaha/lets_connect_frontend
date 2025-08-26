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

export const validateSignUpData = ({ firstName, email, password }) => {
  if (firstName.trim().length < 2) {
    return "First name must be at least 3 characters";
  }
  const emailPattern = /^[a-zA-Z._%-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.trim())) {
    return "Enter valid E-mail Id";
  }
  if (password.trim().length < 6 && password.length > 10) {
    return "Password must be between 6 and 10 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password Include At least one Capital letter";
  }
  return 0;
};
