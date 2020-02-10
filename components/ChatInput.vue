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
  import { mapGetters } from 'vuex';

  export default {
    name: 'ChatInput',
    data() {
      return {
        text: null
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      send() {
        this.$socket.emit('createMessage', {
          text: this.text,
          id: this.user.id
        }, data => {
          if (typeof data !== 'string') {
            this.text = ''
          }
        })
      }
    }
  }
</script>
