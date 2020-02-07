<template>
  <v-app app>
    <v-navigation-drawer app
                         mobile-break-point="650px"
                         v-model="drawer">
      <v-list subheader>
        <v-subheader>Chat users</v-subheader>

        <v-list-item
          v-for="u in users"
          :key="u.id"
          @click.prevent
        >
          <v-list-item-content>
            <v-list-item-title>{{u.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'">mdi-chat</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">
        <v-btn icon @click="exit">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Chat # {{user.chatNumber}}
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        drawer: true
      }
    },
    computed: {
      ...mapGetters(['user', 'users'])
    },
    methods: {
      ...mapMutations(['clearData']),
      exit() {
        this.$socket.emit('userLeft', this.user.id, () => {
          this.$router.push('/?message=leftChat');
          this.clearData();
        });
      }
    }
  }
</script>
