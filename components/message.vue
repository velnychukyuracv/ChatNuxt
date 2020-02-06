<template>
  <div class="Message">
    <div v-if="name === 'admin'" class="Message--system">
      <p class="text-center">{{text}}</p>
      <hr>
    </div>
    <div v-else class="Message-wrapper">
      <div :class="['Message--wrapper-msg', '{ owner }']">
        <small>
          <strong>{{name}}</strong>
        </small>
        <p>{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    props: {
      name: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      owner: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Message {
    &--system {
      margin-bottom: 1rem;

      p {
        margin-bottom: 1rem;
      }
    }
    &--wrapper {
      display: flex;
      flex-direction: column;
      &-msg {
        padding: 1rem;
        width: 60%;
        margin: 0 1rem 1rem 1rem;
        box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
        border-radius: 4px;
        background: #1976d2;
        position: relative;
        p {
          margin-bottom: 0;
        }
      }
    }
  }

  .owner {
    background: #fff;
    color: #000;
    align-self: flex-end;
  }
</style>
