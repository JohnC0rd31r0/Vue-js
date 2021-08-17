<template>
  <v-app>
    <v-app-bar app color="primary" dark elavation="1">
      <v-app-bar-nav-icon @click.stop="sidebar = !sidebar" @click="nomeSobrenome">
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-icon>mdi-account</v-icon>
    </v-app-bar>
    <v-navigation-drawer app v-model="sidebar">
      <v-list dense color="primary" dark>
        <v-list-item>
          <v-list-item-action>
            <v-icon @click.stop="sidebar = !sidebar">mdi-chevron-left</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <h3>Lista de Tarefas</h3>
          </v-list-item-title> 
        </v-list-item>
      </v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
         </v-list-item-avatar>
        <v-list-item-content>{{this.nome}} {{this.sobrenome}}</v-list-item-content>
        <v-btn icon small><v-icon>mdi-chevron-left</v-icon></v-btn>
      </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="item of items" :key="item.title" link :to="item.to">
            <v-list-item-icon>
              <v-icon>
                {{item.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{item.title}}
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app class="py-3"><span><em>MyTodoList &copy;2021</em></span></v-footer>
  </v-app>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data(){
    return{
      sidebar: true,
      items:[
        {title: "Home", icon: "mdi-account", to:"/"},
        {title: "Perfil", icon: "mdi-account-cog", to:"/perfil"},
        {title: "Sair", icon: "mdi-exit-to-app", to:"/login"}
      ],
      uid: '',
      nome: '',
      sobrenome: '',
    }
  },
  mounted(){
    this.uid = fb.auth.currentUser.uid
    this.nomeSobrenome()
  },
  methods:{
    async nomeSobrenome(){
      const logPerfil = await fb.profileCollection.where('uid', '==', this.uid).get();
      for(const pessoa of logPerfil.docs){
        this.nome = pessoa.data().nome
        this.sobrenome = pessoa.data().sobrenome
      }
    }
  },

}
</script>