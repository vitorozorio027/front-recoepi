<template >
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
                           
                            ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="2">
                        <v-btn append-icon="mdi-plus" block color="#26A69A" @click="dialog = true">Novo</v-btn>
                    </v-col>
                </v-row>
            </v-card-item>

                
            <v-card-item>
                <v-data-table-virtual
                :items="listUsuarios"
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
                            <div class="border pa-1 ">
                                {{ item.email }}
                            </div>
                       
                        </td>
                        <td class="border-0 text-center">
                            <div class="border pa-1">
                                {{ item.telefone }}
                            </div>
                            
                        </td>
                        <td class="border-0 text-center ">
                            <div class="border pa-1">
                                {{ item.empresa }}
                            </div>
                        </td>
                        <td class="border-0 text-center">
                            <v-chip variant="outlined" size="x-small" :text="item.status?'Ativo':'Inativo'" :color="item.status?'success':'error'"></v-chip>
                        </td>    
                        <td class="border-0 d-flex justify-center align-center" :id="item.status">
                            <v-icon icon="mdi-book-account" @click="dialog = true"></v-icon>
                            <v-icon icon="mdi-square-edit-outline" @click="dialog = true"></v-icon>
                            <v-icon icon="mdi-trash-can" @click="dialog = true"></v-icon>
                        </td>    
                    </tr>
                    </template>
                </v-data-table-virtual>
            </v-card-item>





            

                <!--modal-->
                <v-dialog
                v-model="dialog"
                class="px-16"
                >
                    <v-card  width="30%"  class="mx-auto pb-4">
                        <div class="bg-teal-lighten-1 mb-6" style="height: 50px;">
                            <v-card-title class="text-h6 font-weight-bold">SMES - Cadastro de Usuário</v-card-title>
                        </div>
                        
                        <div
                        style="position: relative; border: 1px solid black; max-height: 100%; "
                        class=" rounded  mx-4 elevation-1 px-2 "
                        >
                        <v-row dense class="mt-2">
  <v-col cols="12">
    <h1 class="text-caption mx-2">Nome</h1>
    <v-text-field placeholder="Digite seu nome..." density="compact" />
  </v-col>

  <v-col cols="12">
    <h1 class="text-caption mx-2">E-mail</h1>
    <v-text-field placeholder="Digite seu e-mail..." density="compact" type="email" />
  </v-col>

  <v-col cols="12">
    <h1 class="text-caption mx-2">Usuário</h1>
    <v-text-field placeholder="Nome do usuário aqui" density="compact" disabled />
  </v-col>

  <v-col cols="12">
    <h1 class="text-caption mx-2">Telefone</h1>
    <v-text-field placeholder="Digite seu telefone..." density="compact" type="number" />
  </v-col>

</v-row>

                            <v-card-actions v-if="true" class=" ma-0 pa-0">
                           
                            <v-switch label="Status" inset  color="success" class="ma-0 pa-0"></v-switch>

                            <v-spacer></v-spacer>

                            <v-btn
                                color="teal-lighten-1"
                                variant="flat"
                                text="Salvar"
                                append-icon="mdi-check-circle"
                                @click="dialog = false"
                            ></v-btn>
                            </v-card-actions>
                            <p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Dados do Usuário</p>
                        </div>
                    </v-card>
                </v-dialog>
        </v-card>
    </div>
</template>



<script setup>
import { ref } from 'vue'

const procurar = ref('');
const headersUsuarios = [
        {
          title: 'Nome',
          align: 'start',
          key: 'nome',
          width: "30%",
          
        },
        { title: 'E-mail', key: 'email', width: "10%"},
        { title: 'Usuário', key: 'usuario', width: "20%", align: 'center' },
        { title: 'Telefone', key: 'telefone' , width: "25%", align: 'center'},
        { title: 'Status', key: 'status', align: 'center'},
        { title: '', key: 'actions', align: 'center', sortable:false},
]



const dialog = ref (false)

const visible = ref(false)

</script>

<style>
.custom-text-size {
  font-size: 10px;
}

.custom-text-size .v-input__control .v-input__slot input {
  font-size: 10px;
}
</style>