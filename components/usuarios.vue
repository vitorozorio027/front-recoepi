<template>
  <div>
    <v-card max-width="90%" class="mx-auto mt-6" flat>
      <v-card-item>
        <v-row>
          <v-col cols="4">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              single-line
              flat
              rounded-sm
              placeholder="Pesquisar..."
              density="compact"
              v-model="procurar"
            />
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="2">
            <v-btn
              append-icon="mdi-plus"
              block
              color="#26A69A"
              @click="abrirCriar"
            >
              Novo
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>

      <v-card-item>
        <v-data-table-virtual
          :items="usuariosFiltrados"
          :headers="headersUsuarios"
          :search="procurar"
          height="370"
          hover
          fixed-header
          density="compact"
          class="text-caption border-0"
          no-data-text="Sem dados Correspondentes!"
          loading-text="Carregando os Dados!"
        >
          <template v-slot:item="{ item }">
            <tr class="border-0">
              <td class="border-0 bg-white">
                <div class="border pa-1">{{ item.nome }}</div>
              </td>

              <td class="border-0">
                <div class="border pa-1">{{ item.email }}</div>
              </td>

              <td class="border-0 text-center">
                <div class="border pa-1">{{ item.usuario }}</div>
              </td>

              <td class="border-0 text-center">
                <div class="border pa-1">{{ item.telefone }}</div>
              </td>

              <td class="border-0 text-center">
                <div class="border pa-1">
                  {{ item.tipo === 'gestor' ? 'Gestor' : 'Funcionário' }}
                </div>
              </td>

              <td class="border-0 text-center">
                <v-chip
                  variant="outlined"
                  size="x-small"
                  :text="item.status ? 'Ativo' : 'Inativo'"
                  :color="item.status ? 'success' : 'error'"
                />
              </td>

              <td class="border-0 d-flex justify-center align-center">
                <v-icon
                  icon="mdi-book-account"
                  class="me-2"
                  @click="abrirVisualizar(item)"
                />
                <v-icon
                  icon="mdi-square-edit-outline"
                  class="me-2"
                  @click="abrirEditar(item)"
                />
                <v-icon
                  icon="mdi-trash-can"
                  @click="excluirUsuario(item)"
                />
              </td>
            </tr>
          </template>
        </v-data-table-virtual>
      </v-card-item>

      <v-dialog v-model="dialog" class="px-16">
        <v-card width="30%" class="mx-auto pb-4">
          <div class="bg-teal-lighten-1 mb-6" style="height: 50px;">
            <v-card-title class="text-h6 font-weight-bold">
              SMES - Cadastro de Usuário
            </v-card-title>
          </div>

          <div
            style="position: relative; border: 1px solid black; max-height: 100%;"
            class="rounded mx-4 elevation-1 px-2"
          >
            <v-row dense class="mt-2">
              <v-col cols="12">
                <h1 class="text-caption mx-2">Nome</h1>
                <v-text-field
                  v-model="form.nome"
                  placeholder="Digite seu nome..."
                  density="compact"
                />
              </v-col>

              <v-col cols="12">
                <h1 class="text-caption mx-2">E-mail</h1>
                <v-text-field
                  v-model="form.email"
                  placeholder="Digite seu e-mail..."
                  density="compact"
                  type="email"
                />
              </v-col>

              <v-col cols="12">
                <h1 class="text-caption mx-2">Usuário</h1>
                <v-text-field
                  v-model="form.usuario"
                  placeholder="Nome do usuário aqui"
                  density="compact"
                  :disabled="modo === 'create'"
                />
              </v-col>

              <v-col cols="12">
                <h1 class="text-caption mx-2">Telefone</h1>
                <v-text-field
                  v-model="form.telefone"
                  placeholder="Digite seu telefone..."
                  density="compact"
                  type="text"
                />
              </v-col>

              <v-col cols="12">
                <h1 class="text-caption mx-2">Tipo</h1>
                <v-select
                  v-model="form.tipo"
                  :items="tiposUsuario"
                  item-title="label"
                  item-value="value"
                  density="compact"
                  placeholder="Selecione"
                />
              </v-col>
            </v-row>

            <v-card-actions class="ma-0 pa-0">
              <v-switch
                v-model="form.status"
                label="Status"
                inset
                color="success"
                class="ma-0 pa-0"
              />

              <v-spacer />

              <v-btn
                text="Cancelar"
                append-icon="mdi-close-circle"
                @click="fecharDialog"
              />

              <v-btn
                color="teal-lighten-1"
                variant="flat"
                text="Salvar"
                append-icon="mdi-check-circle"
                :loading="salvando"
                @click="salvarUsuario"
              />
            </v-card-actions>

            <p
              style="position: absolute; top: -10px; z-index: 1; left: 20px;"
              class="bg-white px-2 text-caption"
            >
              Dados do Usuário
            </p>
          </div>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const procurar = ref('')
const dialog = ref(false)
const salvando = ref(false)
const modo = ref('create') // 'create' | 'edit' | 'view'
const usuarioEditandoId = ref(null)

const usuarios = ref([])

const headersUsuarios = [
  { title: 'Nome', align: 'start', key: 'nome', width: '30%' },
  { title: 'E-mail', key: 'email', width: '10%' },
  { title: 'Usuário', key: 'usuario', width: '20%', align: 'center' },
  { title: 'Telefone', key: 'telefone', width: '25%', align: 'center' },
  { title: 'Tipo', key: 'tipo', width: '25%', align: 'center' },
  { title: 'Status', key: 'status', align: 'center' },
  { title: '', key: 'actions', align: 'center', sortable: false },
]

const tiposUsuario = [
  { label: 'Gestor', value: 'gestor' },
  { label: 'Funcionário', value: 'funcionario' },
]

const form = ref({
  nome: '',
  email: '',
  usuario: '',
  telefone: '',
  tipo: 'funcionario',
  status: true,
  senha: '',
})

const usuariosFiltrados = computed(() => usuarios.value)

function limparFormulario() {
  form.value = {
    nome: '',
    email: '',
    usuario: '',
    telefone: '',
    tipo: 'funcionario',
    status: true,
    senha: '',
  }
  usuarioEditandoId.value = null
}

function abrirCriar() {
  limparFormulario()
  modo.value = 'create'
  dialog.value = true
}

function abrirEditar(item) {
  modo.value = 'edit'
  usuarioEditandoId.value = item.id

  form.value = {
    nome: item.nome ?? '',
    email: item.email ?? '',
    usuario: item.usuario ?? '',
    telefone: item.telefone ?? '',
    tipo: item.tipo ?? 'funcionario',
    status: !!item.status,
    senha: '',
  }

  dialog.value = true
}

function abrirVisualizar(item) {
  modo.value = 'view'
  usuarioEditandoId.value = item.id

  form.value = {
    nome: item.nome ?? '',
    email: item.email ?? '',
    usuario: item.usuario ?? '',
    telefone: item.telefone ?? '',
    tipo: item.tipo ?? 'funcionario',
    status: !!item.status,
    senha: '',
  }

  dialog.value = true
}

function fecharDialog() {
  dialog.value = false
  limparFormulario()
}

async function carregarUsuarios() {
  try {
    const resposta = await fetch('http://localhost:5000/api/usuarios', {
      method: 'GET',
      credentials: 'include',
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
      throw new Error(dados.erro || 'Erro ao carregar usuários')
    }

    usuarios.value = dados
  } catch (erro) {
    console.error(erro)
    alert(erro.message || 'Erro ao carregar usuários')
  }
}

async function salvarUsuario() {
  try {
    salvando.value = true

    const payload = {
      nome: form.value.nome,
      email: form.value.email,
      usuario: form.value.usuario,
      telefone: form.value.telefone,
      tipo: form.value.tipo,
      status: form.value.status,
    }

    if (form.value.senha) {
      payload.senha = form.value.senha
    }

    let resposta

    if (modo.value === 'create') {
      resposta = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } else if (modo.value === 'edit') {
      resposta = await fetch(`http://localhost:5000/api/usuarios/${usuarioEditandoId.value}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } else {
      fecharDialog()
      return
    }

    const dados = await resposta.json()

    if (!resposta.ok) {
      throw new Error(dados.erro || 'Erro ao salvar usuário')
    }

    await carregarUsuarios()
    fecharDialog()
  } catch (erro) {
    console.error(erro)
    alert(erro.message || 'Erro ao salvar usuário')
  } finally {
    salvando.value = false
  }
}

async function excluirUsuario(item) {
  const confirmou = confirm(`Deseja realmente excluir o usuário "${item.nome}"?`)
  if (!confirmou) return

  try {
    const resposta = await fetch(`http://localhost:5000/api/usuarios/${item.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
      throw new Error(dados.erro || 'Erro ao excluir usuário')
    }

    await carregarUsuarios()
  } catch (erro) {
    console.error(erro)
    alert(erro.message || 'Erro ao excluir usuário')
  }
}

onMounted(() => {
  carregarUsuarios()
})
</script>

<style>
.custom-text-size {
  font-size: 10px;
}

.custom-text-size .v-input__control .v-input__slot input {
  font-size: 10px;
}
</style>