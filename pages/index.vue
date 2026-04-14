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
      <v-card-title class="mb-3"><v-img src="/logo_PI.png" width="135" class="mx-auto"></v-img></v-card-title>
      <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>

      <v-text-field
        density="comfortable"
        placeholder="Digite seu nome de usuário"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
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
        :append-inner-icon="visible ? 'mdi-eye' :  'mdi-eye-off'"
        :type="visible ? 'text' : 'password'"
        density="comfortable"
        placeholder="Digite a sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>



      <v-btn
        class="mb-4 mt-3"
        color="teal-lighten-1"
        size="large"
        to="/Dashboard"
        block
      >
        Iniciar a Sessão
      </v-btn>

    
    </v-card>
      
    </div>
     
  </template>
  
  <script setup>
  import { ref } from 'vue'
  definePageMeta({
    layout: false,
  });

const visible = ref(false)
  </script>