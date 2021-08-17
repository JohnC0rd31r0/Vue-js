<template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">Minha lista de tarefas</h1>
    <v-form>
        <v-text-field label="Novo Aluno" class="largura" v-model="novaTarefa">
        </v-text-field >
        <v-text-field label="email" v-model="novoEmail" class="largura" >
        </v-text-field >
         <v-checkbox v-model="novoStatus" label="Reprovado"></v-checkbox>
         <div class="botao">
            <v-btn @click="adicionar(novaTarefa,novoEmail,novoStatus)">Adicionar</v-btn>
         </div>
    </v-form>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="tarefa of tarefas" :key="tarefa.id">
          <v-container class= "d-flex justify-space-between" >
          <div>
            <p>Nome: {{tarefa.titulo}}</p>
            <p>Email: {{tarefa.email}}</p>
            <p>Situação: {{tarefa.status}}</p>
          </div>
            <v-btn class="excluir" @click="excluirAlunos(tarefa.id)">Excluir Aluno
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-container>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <v-row>
      <v-col class="resultado">Total de Alunos: {{totalAlunos}}</v-col>
      <v-col class="resultado">Aprovados: {{totalAprovados}}</v-col>
      <v-col class="resultado">Reprovados: {{totalReprovados}}</v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data(){
    return{
      uid: "",
      novaTarefa: "",
      novoEmail:"",
      novoStatus:'',
      tarefas:[],
    };
  },

  mounted(){
    this.uid = fb.auth.currentUser.uid
    this.buscarTarefasDoServidor()
    this.totalAlunos()
    this.totalAprovados()
    this.totalReprovados()
  },
    methods: {
      
      async buscarTarefasDoServidor(){
        this.tarefas = []
        const logTasks = await fb.tasksCollection.where('owner', '==', this.uid).get();
        for(const doc of logTasks.docs){
          this.tarefas.push({
            id: doc.id,
            titulo: doc.data().titulo,
            email: doc.data().email,
            status: doc.data().status,
          })
        }
      },

      async adicionar(cont1,cont2,cont3){
        await fb.tasksCollection.add({
          titulo: cont1,
          email: cont2,
          status: this.passoudeAno(cont3),
          dataGravacao: new Date().toISOString().slice(0, 10),
          owner: this.uid,
        })
        this.novaTarefa = ''
        this.novoEmail = ''
        this.novoStatus = ''
        this.buscarTarefasDoServidor()
      },
      
      async excluirAlunos(id){
        const alunos = await fb.tasksCollection.where('owner', '==', this.uid).get()
        if (alunos) {
          fb.tasksCollection.doc(id).delete()
          this.tarefas = []
          this.buscarTarefasDoServidor()
        }}, 
        passoudeAno(status) {
        if (status === true) {
          return "Reprovado";
        } else return "Aprovado";
      },
    },
    computed: {
    totalAlunos() {
      return this.tarefas.length;
    },
    totalAprovados() {
      const aprovados = this.tarefas.filter(
        (tarefa) => tarefa.status === "Aprovado"
      );
      return aprovados.length;
    },
    totalReprovados() {
      return this.totalAlunos - this.totalAprovados;
    },
},
}
</script>

<style>
  .excluir{margin-top: 40px;}
  .largura{width: 600px;
  align-items: center;}
  .botao{margin-left: 25%;
  margin-bottom: 10px;}
  .resultado{
    margin-inline: 30px;
  }
</style>