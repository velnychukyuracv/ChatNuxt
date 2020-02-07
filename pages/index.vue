<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-snackbar
          bottom
          color="orange darken-2"
          :timeout="800000"
          v-model="snackbar">
          {{ message }}
          <v-btn icon class="button" @click="snackbar = false">
            <v-icon color="white" flat >mdi-close</v-icon>
          </v-btn>
        </v-snackbar>

        <v-card-title class="text-center">
          <h2>Nuxt chat</h2>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-text-field
              label="Name"
              required
              :rules="nameRules"
              v-model="name">
            </v-text-field>

            <v-text-field
              label="Number chat"
              required
              :rules="chatRules"
              v-model="chat">
            </v-text-field>

            <v-btn
              class="mr-4"
              color="primary"
              :disabled="!valid"
              @click="submit">
              Submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'Index',
    layout: 'empty',
    head: {
      title: 'Welcome to the chat'
    },
    sockets: {
      connect: function () {
        console.log('socket connected');
      }
    },
    data: () => ({
      snackbar: false,
      message: '',
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 10 characters',
      ],
      chat: '',
      chatRules: [
        v => !!v || 'Number chat is required'
      ]
    }),
    methods: {
      ...mapMutations(['setUser']),

      submit() {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            chatNumber: this.chat
          };

          this.$socket.emit('userJoined', user, data => {
            if (typeof data === 'string') {
              console.log('error')
            } else {
              user.id = data.userId;
              this.setUser(user);
              this.$router.push('/chat');
            }
          })
        }
      }
    },
    mounted() {
      const { message } = this.$route.query;

      if (message === 'noUser') {
        this.message = 'Please enter data';
      } else if (message === 'leftChat') {
        this.message = 'You left chat';
      }

      this.snackbar = !!this.message;

    }
  }
</script>
<style lang="scss" scoped>
  .button {
    background-color: inherit;
    border: none;
  }
</style>
