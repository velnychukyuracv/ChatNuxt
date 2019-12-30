<template>
  <h1>Chat page {{user.name}}</h1>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Chat',
    middleware: ['chat'],
    head() {
      return {
        title: `Chat #${this.user.chatNumber}`
      }
    },
    computed: mapGetters(['user'])
  }
</script>
