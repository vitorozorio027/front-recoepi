<template>
    <div class="">
            <v-card flat class="mt-10">
                <v-card-item>
                    <v-row>
                    <v-col cols="4">
                        <v-card-title>
                            <v-icon icon="mdi-lan" class="mr-4 text-body-2" color="teal-lighten-1" ></v-icon>
                            <v-text class="font-weight-black text-teal-lighten-1 text-caption">Ocorrencias</v-text>
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
                        @keypress="pesquisa"
                        style="width: 90%;"
                        >
                        
                        </div>
                        
                    </v-col>
                </v-row> 

                </v-card-item>
                  

                <v-data-table-virtual
                :headers="headers"
                :items="data"
                :search="search"
                height="400"
                hover
                fixed-header
                density="compact"
                class="text-caption my-10"
                no-data-text="Sem Ocorrencias Registradas !"
                >
                
                 <template v-bind:item="{ item }">
                    <tr class="border-0">
                        <td class="border-0 bg-white">
                            <div class="border pa-1">{{ item.id }}</div>
                        </td>

                        <td class="border-0">
                            <div class="border pa-1">{{ item.nome }}</div>
                        </td>

                        <td class="border-0 text-center">
                            <div class="border pa-1">{{ item.data }}</div>
                        </td>
                    </tr>
                </template>
                

                </v-data-table-virtual>
            </v-card>  
    </div>
</template>



<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'dms',
});

const data = ref([])

const search = ref('');

const headers = [
  { key: 'id', title: 'ID' },
  { key: 'nome', title: 'Ocorrencia' },
  { key: 'data', title: 'Data e Hora' },
];


onMounted(async () => {
    const resposta = await fetch(`http://localhost:5000/api/dashboard`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const dados = await resposta.json();

    if (!resposta.ok) {
        alert(dados.erro)
        return;
    }

    data.value = dados;
})

const pesquisa =  async () => {
    const resposta = await fetch(`http://localhost:5000/api/dashboard/pesquisa`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const dados = await resposta.json();

    if (!resposta.ok) {
        alert(dados.aviso)
        return;
    }

    data.value = dados;
}
</script>

<style>
.hoverfiltro:hover{
    cursor: pointer;
}
</style>