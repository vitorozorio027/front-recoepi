<template>
    <div class="">
            <v-card flat class="mt-10">
                <v-card-item>
                    <v-row>
                    <v-col cols="4">
                        <v-card-title>
                            <v-icon icon="mdi-lan" class="mr-4 text-body-2" color="teal-lighten-1" ></v-icon>
                            <v-text class="font-weight-black text-teal-lighten-1 text-caption">Usuários Cadastrados</v-text>
                        </v-card-title>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="4">
                        <div
                        class="border rounded px-1 hoverfiltro"
                        >
                        <v-icon icon="mdi-magnify" class="text-caption"></v-icon>
                        <input 
                        v-model="search"
                        class="text-caption pa-1"
                        placeholder="Filtrar"
                        style="width: 90%;"
                        >
                        
                        </div>
                        
                    </v-col>
                </v-row> 

                </v-card-item>
                  

                <v-data-table-virtual
                :headers="headers"
                :items="[]"
                :search="search"
                max-height="400"
                hover
                fixed-header
                density="compact"
                class="text-caption my-10"
                no-data-text="Sem Usuários Cadastrados !"
                >
                

                

                </v-data-table-virtual>
            </v-card>  
    </div>
</template>



<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'dms',
});



const search = ref('');

const headers = [
  {
    align: 'start',
    key: 'tag',
    title: 'Usuários',
    width:'25%'
  },
  { key: 'descricao', title: 'Satatus Usuário' , width:'40%'},
  //{ key: 'details', title: 'Detalhes da Instalação' },
  //{ key: 'dataAtualizacao', title: 'Últ. Atualização', align: 'center' }
];

  


</script>

<style>
.hoverfiltro:hover{
    cursor: pointer;
}
</style>