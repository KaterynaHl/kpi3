const validateEmail = (email) => {
    return email.includes("@");
  };
  
  const validatePost = (title, content) => {
    return title && content;
  };
  
  module.exports = {
    validateEmail,
    validatePost,
  };