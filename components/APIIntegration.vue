<template>
    <div>
        <v-dialog fullscreen v-model="dialogOpen">
            <v-card>
                <v-toolbar dark color="teal-lighten-1">
                    <v-toolbar-title>Gerenciador de Imagens</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="close">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-card class="pa-4">
                                <v-select
                                    label="Selecione o tipo de upload"
                                    :items="['Arquivo', 'Pasta']"
                                    v-model="valueSelected"
                                    @update:modelValue="controlInputsVisibility"
                                ></v-select>
                                <v-file-input
                                    v-model="uploadedFiles"
                                    accept="image/*"
                                    label="Selecione imagens"
                                    @change="handleFileUpload"
                                    v-if="isArchiveUpload"
                                ></v-file-input>

                                <v-file-input
                                    v-model="uploadedFolder"
                                    webkitdirectory
                                    directory
                                    label="Selecione uma pasta"
                                    @change="handleFolderUpload"
                                    class="mt-4"
                                    v-if="isFolderUpload"
                                ></v-file-input>

                                <v-btn
                                    color="teal-lighten-1"
                                    block
                                    class="mt-4"
                                    @click="processUploads"
                                    :disabled="images.length === 0"
                                >
                                    Processar Upload
                                </v-btn>
                            </v-card>

                            <v-card class="mt-4">
                                <v-list>
                                    <v-list-item-group v-model="currentImageIndex" color="primary">
                                        <v-list-item
                                            v-for="(img, idx) in images"
                                            :key="idx"
                                        >
                                            <v-list-item-content>
                                                <v-list-item-title>{{ idx + 1 }}. {{ img.name }}</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="9">
                            <v-card class="d-flex flex-column" style="height: 100%;">
                                <div class="image-viewer-container" style="flex: 1; display: flex; align-items: center; justify-content: center; background-color: #f5f5f5;">
                                    <img
                                        v-if="currentImage"
                                        :src="currentImage.url"
                                        :alt="currentImage.name"
                                        style="max-width: 100%; max-height: 100%; object-fit: contain;"
                                    />
                                    <p v-else class="grey--text">Nenhuma imagem selecionada</p>
                                </div>

                                <v-card-actions class="justify-center pa-4">
                                    <v-btn
                                        icon
                                        @click="previousImage"
                                        :disabled="images.length === 0"
                                    >
                                        <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>

                                    <span class="mx-4">
                                        {{ currentImageIndex + 1 }} / {{ images.length }}
                                    </span>

                                    <v-btn
                                        icon
                                        @click="nextImage"
                                        :disabled="images.length === 0"
                                    >
                                        <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn
                                        color="error"
                                        @click="deleteImage"
                                        :disabled="images.length === 0"
                                    >
                                        <v-icon left>mdi-delete</v-icon>
                                        Deletar
                                    </v-btn>

                                    <v-btn
                                        color="success"
                                        @click="downloadImage"
                                        :disabled="images.length === 0"
                                    >
                                        <v-icon left>mdi-download</v-icon>
                                        Baixar
                                    </v-btn>
                                </v-card-actions>

                                <v-card-subtitle v-if="currentImage" class="pa-4 text-center">
                                    {{ currentImage.name }}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'APIIntegration',
    data() {
        return {
            dialogOpen: false,
            uploadedFiles: null,
            uploadedFolder: null,
            images: [],
            currentImageIndex: 0,
            isFolderUpload: false,
            isArchiveUpload: false,
            valueSelected: ''
        }
    },
    computed: {
        currentImage() {
            return this.images.length ? this.images[this.currentImageIndex] : null
        },
        defineExpose() {
            open,
            close
        }
    },
    methods: {
        handleFileUpload(event) {
            const files = event.target.files

            if (!files) return

            const list = Array.from(files)

            list.forEach(file => {

                if (!file.type.startsWith('image/')) return

                const url = URL.createObjectURL(file)

                this.images.push({
                    name: file.name,
                    file,
                    url
                })
            })
            
        },
        handleFolderUpload(event) {
            const files = event.target.files
            if (!files) return
            const list = Array.from(files)
            list.sort((a, b) => (a.webkitRelativePath || a.name).localeCompare(b.webkitRelativePath || b.name))
            list.forEach(file => {
                if (!file.type.startsWith('image/')) return
                const url = URL.createObjectURL(file)
                this.images.push({ name: file.name, file, url })
            })
            this.uploadedFolder = null
        },
        async processUploads() {
            await this.requestAnalize()
        },
        previousImage() {
            if (this.images.length === 0) return
            this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length
        },
        nextImage() {
            if (this.images.length === 0) return
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length
        },
        deleteImage() {
            if (!this.currentImage) return
            try { URL.revokeObjectURL(this.currentImage.url) } catch(e){}
            this.images.splice(this.currentImageIndex, 1)
            if (this.currentImageIndex >= this.images.length) this.currentImageIndex = Math.max(0, this.images.length - 1)
        },
        downloadImage() {
            if (!this.currentImage) return
            const link = document.createElement('a')
            link.href = this.currentImage.url
            link.download = this.currentImage.name
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        async requestAnalize() {
            if (!this.currentImage) return
            
            const formData = new FormData()
            formData.append('file', this.currentImage.file)
            // formData.append('name', this.currentImage.name)
            
            try {
                const response = await fetch(`http://127.0.0.1:8001/analizar_imagem`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                })
                
                if (response.ok) {
                    const blob = await response.blob()
                    const imageUrl = URL.createObjectURL(blob)
                    this.currentImage.url = imageUrl
                } else {
                    console.error('Erro na análise:', response.statusText)
                }
            } catch (error) {
                console.error('Erro ao enviar arquivo:', error)
            }
        },
        open() {
            this.dialogOpen = true
        },
        close() {
            this.valueSelected = ''
            this.dialogOpen = false
            this.isArchiveUpload = false
            this.isFolderUpload = false
            this.currentImage.url = ''
        },
        controlInputsVisibility() {
            if (this.valueSelected === 'Pasta') {
                this.isFolderUpload = true
                this.isArchiveUpload = false
            } else if (this.valueSelected === 'Arquivo') {
                this.isArchiveUpload = true
                this.isFolderUpload = false
            }
        }
    },
    beforeDestroy() {
        this.images.forEach(img => { try { URL.revokeObjectURL(img.url) } catch(e){} })
    }
}
</script>