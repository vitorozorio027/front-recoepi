<template >

<div class="px-8 pt-16">
                <div class="pt-10">
                                <div class="d-flex justify-space-between mb-6">
                                        <div class="w-25">
                                                <v-text-field
                                                :loading="loading"
                                                append-inner-icon="mdi-magnify"
                                                density="comfortable"
                                                label="Pesquisar"
                                                variant="solo"
                                                hide-details
                                                single-line
                                                size="x-small"
                                                @click:append-inner="onClick"
                                                ></v-text-field>

                                        </div>

                                        <div >
                                                <v-btn
                                                class="mr-4"
                                                color="teal-lighten-1"
                                                @click="addCard"
                                                >Novo</v-btn>
                                                <v-btn
                                                color="teal-lighten-1"
                                                >Salvar</v-btn>
                                        </div> 
                                </div>

                                <!--Outra secção-->
                                <div
                                style="position: relative; border: 1px solid #BDBDBD; "
                                class=" rounded  mx-auto mt-4  pa-6 h-100"
                                ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Inspeção Planejadas</p>
                                       
                                
                                <!--SECÇÃO PLANEJAMENTO-->
                                        <div style="height: 370px; overflow-y: auto">
                                                <div class="d-flex  font-weight-bold mb-2" style="font-size: 10px;">
                                                        <p style="width: 9%;" class="ml-2">Modalidade</p>
                                                        <p style="width: 6%;" class="ml-2">Ordem</p>
                                                        <p style="width: 25%;" class="ml-2">Descrição da Inspeção</p>
                                                        <p style="width: 9%;" class="ml-2">Data inicio</p>
                                                        <p style="width: 9%;" class="ml-2">Data fim</p>
                                                        <p style="width: 9%;" class="ml-2">Analista</p>
                                                        <p style="width: 6%;" class="ml-2">Inspetor</p>
                                                        <p class="ml-4">Escopo</p>
                                                        <p class="ml-2">Recurso</p>
                                                        <p class="ml-7">status</p>
                                                </div>








                                                 <!--SECÃO DE CARD-->

                                      
                                                <div class="d-flex px-1 mb-2 elevation-2 rounded border align-center" 
                                                 v-for="(card, i ) in cards"
                                                 :key="i"
                                                 style="height: 45px;"
                                                >

                                                    
                                                        <div style="width: 8%;"  class="mt-6">
                                                                <v-select
                                                                v-model="modalidadeDigitada"
                                                                variant="outlined"
                                                                density="compact"
                                                                :items="['Mecânico', 'Elétrico']"
                                                                flat
                                                                >
                                                                        <template v-slot:selection="{ item }">
                                                                        <span style="font-size: 10px;">{{ item.title }}</span>
                                                                        </template> 
                                                                </v-select>
                                                        </div>


<div style="width: 6%;" class="mx-2">
  <input type="text" v-model="ordemDigitada" class="border border-sm w-100 text-caption px-1 rounded">
</div>


                                                        
                                                        <div style="width: 25%;" class="">
                                                                <input type="text" v-model="descInsp" class="border border-sm w-100 text-caption px-1  rounded">
                                                        </div>

                                                        <div style="width: 9%;" class="mx-2">
                                                                <input type="date" v-model="dataInicio" class="border border-sm w-100 text-caption px-1  rounded">
                                                        </div>

                                                        <div style="width: 9%;" class="">
                                                                <input type="date" v-model="dataFim" class="border border-sm w-100 text-caption px-1  rounded">
                                                        </div>
                                                        <div style="width: 9%;" class="mx-2">
                                                                <input type="text" class="border border-sm w-100 text-caption px-1  rounded">
                                                        </div>
                                                        <div style="width: 9%;" class="">
                                                                <input type="text" class="border border-sm w-100 text-caption px-1  rounded">
                                                        </div>
                                                        <div  class=" mx-2">
                                                                <v-icon
                                                                icon="mdi-database-search"
                                                                class="text-h6 mr-4"
                                                                @click="abrirModal('escopo')"
                                                                ></v-icon>
                                                                
                                                        </div>
                                                        <div  class=" ">
                                                                <v-icon
                                                                icon="mdi-cogs"
                                                                class="text-h6"
                                                                @click="abrirModal('recurso')"
                                                                ></v-icon>
                                                              
                                                        </div>
                                                        <div style="width: 5%;" class="mx-4">
                                                                <input type="text" v-model="statusDigitado" style="font-size: 10px;" class="border border-sm w-100 px-1 py-1 rounded  text-center" value="Pendente">
                                                        </div>
                                                        <div class="d-flex justify-center align-center ">
                                                                <v-icon icon="mdi-magnify" class="text-body-2 d-none d-lg-block" @click="true"></v-icon>
                                                                <nuxt-link to="/inspecao" ><v-icon icon="mdi-text-box-check" class="text-body-2  d-block" ></v-icon></nuxt-link>
                                                                <v-icon icon="mdi-trash-can" class="text-body-2 d-none d-lg-block" @click="removerProgramacao(i)"></v-icon>
                                                        </div>
                                   
                                             
                                        </div>
                                        </div>


























                                        <!--MODAL-->
                                        <v-dialog
                                        v-model="dialog"
                                        width="auto"
                                        persistent
                                        >
                                                <!--CARD ESCOPO-->
                                                <v-card width="800" v-if="opcao=='escopo'">
                                                        <v-card-title class="bg-teal-lighten-1">
                                                                Escopo
                                                        </v-card-title>
                                                        <div style="overflow-y: auto;">
                                                                <v-card-item>
                                                                        <div
                                                                        style="position: relative; border: 1px solid black;   height: 220px;"
                                                                        class=" rounded  mx-4 mt-4 elevation-4 px-4 pb-2 "
                                                                        ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Locais Disponiveis</p>
                                                                        <div class="my-2 w-75">
                                                                                <v-icon icon="mdi-magnify"></v-icon>
                                                                                <input type="search" v-model="procurar" class="border mt-2 px-2 py-1 rounded text-caption w-75" placeholder="procurar...">
                                                                        </div>
                                                                        
                                                                        
                                                                        <v-data-table-virtual
                                                                        :items="elements"
                                                                        :headers="headers"
                                                                        :search="procurar"
                                                                        height="150"
                                                                        show-select
                                                                        hover
                                                                        fixed-header
                                                                        density="compact"
                                                                        class="text-caption "
                                                                        no-data-text="Sem dados Correspondentes!"
                                                                        loading-text="Carregando os Dados!"
                                                                        return-object
                                                                        v-model="selectedProgramacao"
                                                                        >  
                                                                        <template v-slot:header.title="{ column }" >
                                                                                <p class="text-grey-lighten-1"> {{ column.title }} </p>
                                                                        </template>

                                                                
                                                                        </v-data-table-virtual> 
                                                                        </div>
                                                                </v-card-item>
                                                                <div class="d-flex justify-center align-center">
                                                                        <v-icon icon="mdi-swap-vertical-bold" size="30"></v-icon>
                                                                </div>
                                                                <v-card-item>
                                                        
                                                                        <div
                                                                        style="position: relative; border: 1px solid black;   max-height: 220px;"
                                                                        class=" rounded  mx-4 mt-2 elevation-4 px-2 "
                                                                        ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Locais Selecionados</p>
                                                                                <div class="w-100 d-flex justify-space-between align-center">
                                                                                <div class="my-2 w-50">
                                                                                        <v-icon icon="mdi-magnify"></v-icon>
                                                                                        <input type="search" v-model="procurarProgramacao" class="border mt-2 px-2 py-1 rounded text-caption w-75" placeholder="procurar...">
                                                                                </div>
                                                                                <div class="d-flex justify-center align-center">
                                                                                        <v-icon icon="mdi-broom" @click="selectedProgramacao = []"></v-icon>
                                                                                        <p class="text-caption ml-2">Qtd.Posições: {{ selectedProgramacao.length }}</p>
                                                                                </div>

                                                                        </div>
                                                                


                                                                                <v-data-table-virtual
                                                                                :items="selectedProgramacao"
                                                                                :headers="headersProgramacao"
                                                                                height="150"
                                                                                :search="procurarProgramacao"
                                                                                hover
                                                                                fixed-header
                                                                                density="compact"
                                                                                class="text-caption"
                                                                                no-data-text="Aguardando seleção!"
                                                                                loading-text="Carregando os Dados!"
                                                                        
                                                                                
                                                                                >  
                                                                                        <template v-slot:item.actions="{ item }">
                                                                                                <v-icon icon="mdi-trash-can" @click="removerProgramacaoSelecionada(item)" ></v-icon>
                                                                                        </template>
                                                                                        
                                                                                </v-data-table-virtual> 
                                                                        </div>
                                                                </v-card-item>

                                                                <v-card-item>
                                                                        <hr>
                                                                        <v-card-actions>
                                                                                <v-spacer></v-spacer>
                                                                                <v-btn color="error" variant="flat" @click="dialog = false">Cancelar</v-btn>
                                                                                <v-btn variant="flat" color="teal-lighten-1">Salvar</v-btn>
                                                                        </v-card-actions>
                                                                </v-card-item>
                                                        </div>
                                                </v-card>


                                                <!--CARD RECURSO-->
                                                <v-card
                                                v-if="opcao!='escopo'"
                                                width="700"
                                               
                                                >
                                                <v-card-title class="bg-teal-lighten-1">
                                                                Recurso
                                                </v-card-title>
                                                <v-card-item>
                                                        <v-textarea label="Descreva aqui..." 
                                                        variant="outlined"
                                                        flat
                                                        counter="1000"
                                                        rows="14"
                                                        single-line
                                                        ></v-textarea>
                                                </v-card-item>

                                                <v-card-item>
                                                        <hr>
                                                        <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="error" variant="flat" @click="dialog = false">Cancelar</v-btn>
                                                                <v-btn variant="flat" color="teal-lighten-1">Salvar</v-btn>
                                                        </v-card-actions>
                                                </v-card-item>
                                                </v-card>
                                        </v-dialog>
                                </div>



                </div>
        </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';

const dialog = ref(false);
const loading = ref(false);
const selectedProgramacao = ref([]);
const procurar = ref('');
const modalidadeDigitada = ref('');
const ordemDigitada = ref('');
const descInsp = ref('');
const dataInicio = ref('');
const dataFim = ref('');
const statusDigitado = ref('');
const procurarProgramacao = ref('');

const headers = [
  { title: 'Selecionar Todos', align: 'start', key: 'title' },
];

const headersProgramacao = [
  { title: '', align: 'start', key: 'title' },
  { title: '', key: 'actions', align: 'center', sortable: false },
];

const elements = [
  { title: 'Espaço reservado para os Locais s2i-PO00001' },
  { title: 'Espaço reservado para os Locais s2i-PO00002' },
  { title: 'Espaço reservado para os Locais s2i-PO00003' },
  // Outros elementos omitidos para brevidade
  { title: 'Espaço reservado para os Locais s2i-PO00030' }
];

const cards = ref([]);

// Carregar dados do localStorage ao iniciar
onMounted(() => {
  if (localStorage.getItem('cards')) {
    cards.value = JSON.parse(localStorage.getItem('cards'));
  }

  // Carregar valores dos campos de texto
    if (localStorage.getItem('modalidadeDigitada')) {
    modalidadeDigitada.value = localStorage.getItem('modalidadeDigitada');
  }

  if (localStorage.getItem('ordemDigitada')) {
    ordemDigitada.value = localStorage.getItem('ordemDigitada');
  }

  if (localStorage.getItem('descInsp')) {
    descInsp.value = localStorage.getItem('descInsp');
  }

  if (localStorage.getItem('dataInicio')) {
    dataInicio.value = localStorage.getItem('dataInicio');
  }

  if (localStorage.getItem('dataFim')) {
    dataFim.value = localStorage.getItem('dataFim');
  }

  if (localStorage.getItem('statusDigitado')) {
    statusDigitado.value = localStorage.getItem('statusDigitado');
  }
});

const addCard = () => {
  const newCard = {
    Modalidade: modalidadeDigitada.value,
    Ordem: ordemDigitada.value, // Salvar o valor do campo Ordem
    Desc_Insp: descInsp.value,
    Data_inicio: dataInicio.value,
    Data_fim: dataFim.value,
    Analista: '',
    Inspetor: '',
        
  };
  cards.value.push(newCard);
  // Salvar no localStorage
  localStorage.setItem('cards', JSON.stringify(cards.value));
};

const opcao = ref('');
const abrirModal = (op) => {
  opcao.value = op;
  dialog.value = true;
};

const removerProgramacao = (index) => {
  cards.value.splice(index, 1);
  // Atualizar localStorage após remoção
  localStorage.setItem('cards', JSON.stringify(cards.value));
};

const removerProgramacaoSelecionada = (item) => {
  const index = selectedProgramacao.value.findIndex((element) => element.title === item.title);
  if (index !== -1) {
    selectedProgramacao.value.splice(index, 1);
  }
};

// Watch para monitorar mudanças nos parametros
watch(modalidadeDigitada, (newValue) => {
  localStorage.setItem('modalidadeDigitada', newValue);
});

watch(ordemDigitada, (newValue) => {
  localStorage.setItem('ordemDigitada', newValue);
});

watch(descInsp, (newValue) => {
  localStorage.setItem('descInsp', newValue);
});

watch(dataInicio, (newValue) => {
  localStorage.setItem('dataInicio', newValue);
});

watch(dataFim, (newValue) => {
  localStorage.setItem('dataFim', newValue);
});

watch(statusDigitado, (newValue) => {
  localStorage.setItem('statusDigitado', newValue);
});

</script>




<style>
input:focus {
box-shadow: 0 0 0 0;
outline: 0;
}


</style>

