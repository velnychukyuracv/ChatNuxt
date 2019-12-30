export const state = () => ({
  user: {}
});

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
};

export const getters = {
  user: state => state.user,
};

export const actions = {
  SOCKET_newMessage(context, data) {
    console.log('Message received', data)
  }
};
