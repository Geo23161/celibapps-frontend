<template >
    <ion-page >
        <ion-content >

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts" >
import { useUserStore } from "@/global/pinia";
import { access_tok, showLoading, store_obj } from "@/global/utils";
import { IonPage, IonContent } from "@ionic/vue"
import axios from "axios";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter()
const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)
const { update_user } = _userStore

const get_user = async () => {
    const load = await showLoading('Chargement...')
    const resp = await axios.get('api/get_user/', {
        headers :  {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })

    if(resp.data['done']) 
        store_obj('user', JSON.stringify(resp.data['result']))
    load.dismiss()
    update_user()
}

get_user()
</script>