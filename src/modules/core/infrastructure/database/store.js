const store = {
    users: [],
    posts: [],
  };
  
  const resetStore = () => {
    store.users = [];
    store.posts = [];
  };
  
  module.exports = {
    store,
    resetStore,
  };