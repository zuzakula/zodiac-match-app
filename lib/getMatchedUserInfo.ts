export const getMatchedUserInfo = (users, loggedUser) => {
  const newUsers = { ...users };
  delete newUsers[loggedUser];

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};
