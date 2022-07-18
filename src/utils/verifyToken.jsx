const verifyToken = () => {
  const token = localStorage.getItem("token") || "";
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return config;
};
export default verifyToken;
