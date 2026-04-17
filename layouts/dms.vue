<template>
  <v-app>
    <v-app-bar color="teal-lighten-1" style="height: 55px;" class="d-flex justify-center align-center">
      <v-app-bar-title>
        <v-list class="d-flex bg-transparent">
          <v-list-item>
            <v-btn icon="mdi-menu" variant="text" @click="drawer = !drawer"></v-btn>
          </v-list-item>
          <v-list-item class="text-body-2 font-weight-black">{{ pageTitle }}</v-list-item>
        </v-list>
      </v-app-bar-title>
      <template #append>
        <div class="d-flex bg-transparent mr-6 align-center">
          <v-badge color="error" dot>
            <v-icon icon="mdi-bell" size="small"></v-icon>
          </v-badge>
          <v-icon icon="mdi-forum" size="small" class="mx-4"></v-icon>
          <v-avatar color="teal-lighten-1">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </div>
      </template>
    </v-app-bar>
    
    <v-navigation-drawer
      :width="drawer ? '250' : '70'"
      class="pt-2 pb-2 px-2 h-100"
      v-model="drawer"
      :temporary="drawerstate"
      color="teal-lighten-1"
    >
      <v-list>
        <v-list-item class="mb-4" prepend-icon="mdi-home-account">
          <v-btn variant="text" text="Home" class="text-caption font-weight-regular" to="/Dashboard"></v-btn>
        </v-list-item>

        <div>
          <div class="d-flex align-center pl-4 mb-2">
            <div class="w-auto mr-4 font-weight-black" style="font-size: 12px;" v-if="drawer">Sistema</div>
            <div class="w-75"><hr></div>
          </div>

          <v-list-item prepend-icon="mdi-account-multiple-plus" class="text-caption">
            <v-btn variant="text" text="Cadastro de Usuários" class="text-caption font-weight-regular" to="/usuarios"></v-btn>
          </v-list-item>

        </div>

      </v-list>
      <v-btn @click="showLogoutDialog = true" icon="mdi-logout" style="float: right; margin-top: 400px; background-color: #26A69A; color: white"></v-btn>
    </v-navigation-drawer>
    
    <v-dialog v-model="showLogoutDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Tem certeza que deseja sair?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showLogoutDialog = false">Não</v-btn>
          <v-btn color="blue darken-1" text @click="logout">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <slot />
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

const TitlePages = useTitlePagesStore()
const pageTitle = ref(TitlePages.pageTitle)
const drawerstate = ref(TitlePages.drawerstate)

const cookies = useCookies(['locale'])

watch(() => TitlePages.pageTitle, (newTitle) => {
  pageTitle.value = newTitle
})

watch(() => TitlePages.drawerstate, (newdrawerstate) => {
  drawerstate.value = newdrawerstate
})

const drawer = ref(false)
const showLogoutDialog = ref(false)
const router = useRouter()

const links = [
  ['mdi-book-edit', 'Programação Rota', '/programacao']
]

const logout = () => {
  showLogoutDialog.value = false
  fetch('http://localhost:5000/api/usuarios/logout', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        alert('Erro ao realizar logout');
      } else {
        cookies.remove('user-info')
        router.push('/')
      }
    })
}
</script>

<style>
input:focus {
  box-shadow: 0 0 0 0;
  outline: 0;
}

.v-field.v-field--appended {
  --v-field-padding-end: 0px;
}
.v-input--density-compact .v-field--variant-outlined, .v-input--density-compact 
.v-field--single-line, .v-input--density-compact .v-field--no-label {
  --v-field-padding-bottom: 0px;
}

.v-input--density-compact {
  --v-input-control-height: 0px !important;
  --v-input-padding-top: 0px !important;
}
.v-field--variant-outlined, .v-field--single-line, .v-field--no-label {
  --v-field-padding-top: 0px;
}

.v-input--density-compact .v-field--variant-outlined, .v-input--density-compact .v-field--single-line, .v-input--density-compact .v-field--no-label {
  --v-field-padding-bottom: 0px;
}
</style>
