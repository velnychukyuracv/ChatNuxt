export const state = () => ({});

export const actions = {
  SOCKET_newMessage(context, data) {
    console.log('Message received', data)
  }
};
