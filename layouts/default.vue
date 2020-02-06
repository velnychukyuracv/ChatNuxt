<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650px">
      <v-list subheader>
        <v-subheader>Recent chat</v-subheader>

        <v-list-item
          v-for="user in users"
          :key="user.id"
          @click.prevent
        >
          <v-list-item-avatar>
            <v-img :src="user.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="user.id == 2 ? 'deep-purple accent-4' : 'grey'">mdi-chat</v-icon>
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
        drawer: true,
        users: [
          {id: '1', name: 'User First', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
          {id: '2', name: 'User Second', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'}
        ]
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      ...mapMutations(['clearData']),
      exit() {
        this.$router.push('/?message=leftChat');
        this.clearData()
      }
    }
  }
</script>
