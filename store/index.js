export const state = () => ({
  user: {},
  users: [],
  messages: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {};
    state.users = [];
    state.messages = [];
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  }
};

export const getters = {
  user: state => state.user,
  users: state => state.users,
  messages: state => state.messages
};
