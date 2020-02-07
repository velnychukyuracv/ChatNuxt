<template>
  <div class="Chat">
    <div class="Chat-dialog" ref="block">
      <message v-for="message in messages"
               :key="message.id"
               :name="message.name"
               :text="message.text"
               :owner="message.id === user.id">
      </message>
    </div>
    <div class="Chat-input">
      <chat-input />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Chat',
    components: {
      Message:   () => import('@/components/Message'),
      ChatInput: () => import('@/components/ChatInput')
    },
    middleware: ['chat'],
    head() {
      return {
        title: `Chat #${this.user.chatNumber}`
      }
    },
    computed: mapGetters(['user', 'messages']),
    watch: {
      messages() {
        setTimeout(() => {
          this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Chat {
    height: 100%;
    position: relative;
    overflow: hidden;

    &-dialog {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 80px;
      padding: 1rem;
      overflow-y: auto;
    }

    &-input {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      height: 80px;
      background-color: white;
    }
  }
</style>
