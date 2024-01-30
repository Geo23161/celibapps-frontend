<template>
    <ion-modal :is-open="isOpen" :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.75]" @didDismiss="clos()" >
        <ion-content class="ion-padding">
            <div style="padding: 2vw 2vw; font-size: 3.6vw; color: rgb(73, 73, 73); font-weight: bold;" >
                Découvrez les membres
            </div>
            <ion-list>
                <ion-item  v-for="member in members" :key="member.id" @click="clos(), $router.push('/profil/' + member.id)" >
                    <ion-avatar slot="start">
                        <ion-img :src="f_url(member.get_picture)"></ion-img>
                    </ion-avatar>
                    <ion-label>
                        <h2> {{ member.prenom }} </h2>
                        <p :style="{
                            color: formatOnline(member.last).includes('ligne') ? 'green' : 'gray'
                        }" > {{ formatOnline(member.last) }} </p>
                    </ion-label>
                </ion-item>
                
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup >
import { IonModal, IonContent } from "@ionic/vue"
import { ChatProfil } from "@/global/types"
import { formatOnline } from "@/global/utils";
import { useUserStore } from "@/global/pinia"
import { storeToRefs } from "pinia";


const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { f_url } = userStore_

const props = defineProps({
    isOpen: Boolean,
    members : Array<ChatProfil>
})

const emit = defineEmits(['close'])
const clos = () => {
    emit('close')
}

</script>