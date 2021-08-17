<template>
    <v-container fill-height fluid text-center>
        <v-container class="teste">
          <v-row>
            <v-col class="primary--text text-center mx-auto pb-4 pt-16" cols="1" sm="4" offset="4"><h1>Login </h1></v-col>
          </v-row>
            <v-col cols="6" offset="3">
              <v-form  >
                <v-text-field label="Email" v-model="user.email"></v-text-field>
                <v-text-field label="Senha" v-model="user.password" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show"></v-text-field>
                <v-btn color = "primary" @click="login">Login</v-btn>
              </v-form>
            </v-col>
          
        </v-container>
        <v-snackbar color="red" v-model="errorLogin" danger multline timeout="2000">Usuário ou senha inválidos</v-snackbar>

        <v-dialog v-model="novaConta" persistent max-width="300" hide-overlay>
          <v-card>
            <v-card-title>
              Conta não encontrada.
            </v-card-title>
            <v-card-text>
              A conta não foi localizada. Deseja criar uma nova vonta com os dados informados?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="criarNovaConta">Sim</v-btn>
              <v-btn color="red darken-1" text @click="novaConta=false">Não</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data(){
    return {
  user:{},
  show: false,
  errorLogin: false,
  novaConta: false,
  }},

  methods: {
    async login(){
      try {await fb.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      this.$router.push({name: 'Home'})
    } catch(error){ 
      const errorCode = error.code
         switch(errorCode){
            case "auth/wrong-password":
              this.errorLogin = true
              break;
            case "auth/invalid-email":
              this.errorLogin = true;
              break;
            case "auth/user-not-found":
              this.novaConta = true
              break;
            default:
              this.errorLogin = true;
              break;
                }

    }
    },
    async criarNovaConta(){
      this.novaConta = false;
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email, this.user.password);
        this.login()
      }
  }
}
</script>

<style>
  .teste{border: 2px solid rgb(25, 108, 141);
  border-radius: 8px;
  width: 800px;
  height: 400px;}
</style>