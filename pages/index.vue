<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card minWidth="400">
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
  export default {
    layout: 'empty',
    sockets: {
      connect: function () {
        console.log('socket connected');
      }
    },
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      chat: '',
      chatRules: [
        v => !!v || 'Number chat is required'
      ]
    }),
    methods: {
      submit() {
        if (this.$refs.form.validate()) {

        }
      }
    }
  }
</script>
