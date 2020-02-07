<template>
  <v-flex cols="12">
    <v-text-field
      outlined
      label="Enter message"
      v-model="text"
      @keydown.enter="send"
    />
  </v-flex>
</template>

<script>
  export default {
    name: 'ChatInput',
    data() {
      return {
        text: null
      }
    },
    methods: {
      send() {
        this.$socket.emit('createMessage', {
          text: this.text,
          id: this.$store.state.user.id
        }, data => {
          if (typeof data !== 'string') {
            this.text = ''
          }
        })
      }
    }
  }
</script>
