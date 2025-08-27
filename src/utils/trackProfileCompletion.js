export const profileCompletionPercentage = (profileAttributes) => {
  const totalIdentifier = profileAttributes.length;

  const completedAttributes = profileAttributes.reduce((acc, val) => {
    if (val) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return Math.round((completedAttributes / totalIdentifier) * 100);
};
