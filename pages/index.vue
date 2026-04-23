<template>
   

    <div 
    style="background-image: url('/fundo_PI2.png'); background-size: cover;" 
    class="h-screen w-100 d-flex justify-end align-center pa-3"
    >
      
    <v-card
      class="mx-auto px-12 pb-8 pt-6"
      elevation="8"
      width="448"
      style="border-radius: 25px; 
      box-shadow: 0 100px 300px rgba(0,0,0,0.9);"
    >
      <v-card-title class="mb-3"><v-img src="../public/Logo_PI.png" width="135" class="mx-auto"></v-img></v-card-title>
      <v-alert type="error" v-model="errorMensagem">Usuário e/ou Senha inválidos</v-alert>
      <v-alert type="info" v-model="aviso">Senha alterada com sucesso</v-alert>
      <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>

      <v-text-field
        density="comfortable"
        placeholder="Digite seu nome de usuário"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        v-model="username"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" v-if="!primeiroAcesso">
        Senha

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Esqueceu a senha?</a>
      </div>

      <v-text-field
        v-if="!primeiroAcesso"
        :append-inner-icon="visible ? 'mdi-eye' :  'mdi-eye-off'"
        :type="visible ? 'text' : 'password'"
        density="comfortable"
        placeholder="Digite a sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="password"
      ></v-text-field>

      <v-text-field
        v-if="primeiroAcesso"
        :append-inner-icon="visible ? 'mdi-eye' :  'mdi-eye-off'"
        :type="visible ? 'text' : 'password'"
        density="comfortable"
        placeholder="Digite a nova senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="newPassword"
      ></v-text-field>

      <v-text-field
        v-if="primeiroAcesso"
        :append-inner-icon="visible ? 'mdi-eye' :  'mdi-eye-off'"
        :type="visible ? 'text' : 'password'"
        density="comfortable"
        placeholder="Confirme a nova senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="confirmedPassword"
      ></v-text-field>



      <v-btn
        class="mb-4 mt-3"
        color="teal-lighten-1"
        size="large"
        @click="validCredentials"
        block
      >
        Iniciar a Sessão
      </v-btn>

    
    </v-card>
      
    </div>

    <v-dialog max-width="500" v-model="dialog">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Open Dialog"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Acesso ao sistema">
          <v-card-text>
            Primeiro acesso ao sistema, troque a senha por motivos de segurança
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Trocar senha"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
     
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    definePageMeta({
      layout: false,
    });

    const modoAcesso =  {
      PRIMEIRO_ACESSO: 'primeiro_acesso',
      ACESSO_NORMAL: 'acesso_normal'
    }

    const visible = ref(false)
    const username = ref('')
    const password = ref('')
    const newPassword = ref('')
    const confirmedPassword = ref('')
    const errorMensagem = ref(false);
    const aviso = ref(false)
    const primeiroAcesso = ref(false);
    const acaoAcesso = ref(modoAcesso.ACESSO_NORMAL)
    const dialog = ref(false)

    function validCredentials() {
      if (acaoAcesso.value === modoAcesso.ACESSO_NORMAL) {
          fetch('http://localhost:5000/api/usuarios/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include', 
            body: JSON.stringify ({
              nome_usuario: username.value,
              senha_usuario: password.value
            })
          }).then(response => response.json())
            .then(data => {
              if (data.mensagem) {
                errorMensagem.value = false;
                location.href = '/Dashboard'
              } else if (data.aviso) {
                acaoAcesso.value = modoAcesso.PRIMEIRO_ACESSO
                errorMensagem.value = false;
                primeiroAcesso.value = true;
                dialog.value = true;
              }else {
                errorMensagem.value = true;
              }
            })
            .catch(error => console.log(JSON.stringify(error)))
        } else if (acaoAcesso.value === modoAcesso.PRIMEIRO_ACESSO) {
          fetch('http://localhost:5000/api/usuarios/alterar-senha', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              usuario: username.value,
              senha_nova: newPassword.value 
            })
          }).then(response => response.json())
            .then(data => {
              primeiroAcesso.value = false;
              aviso.value = true
              username.value = ''
              password.value = ''
              newPassword.value = ''
              confirmedPassword.value = ''
              acaoAcesso.value = modoAcesso.ACESSO_NORMAL
            })
            .catch(error => alert('Erro inesperado'))
        }
      }
    
    onMounted(() => {
      fetch('http://localhost:5000/api/usuarios/validar',{
        method: 'GET',
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {
            location.href = '/Dashboard'
          }
        })
    });
  </script>