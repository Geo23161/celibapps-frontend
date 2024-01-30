<template>
    <ion-page>
        <ion-content>
            <mood-comp :is-open="true" ></mood-comp>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup >
import ActivAbon from "@/components/ActivAbon.vue";
import InviteComp from "@/components/InviteComp.vue";
import MoodComp from "@/components/MoodComp.vue";
import MoreMessage from "@/components/MoreMessage.vue";
import { access_tok } from "@/global/utils";
import { IonPage, IonContent } from "@ionic/vue"
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";


const mOpen = ref(false)

const base_url = ref("http://localhost:8080/")

setTimeout( async () => {
    axios({
        url: base_url.value + "api/devices/",
        method: "GET",
        data: {
            registration_id: "djosfnjngfjngrjnndfjnjig",
            type: 'web',
        },
        headers: {
            Authorization: `Bearer ${await access_tok(useRouter(), undefined)}`,
        },
    }).then(resp => {
        console.log(resp.data)
    }).catch(e => console.log(e))
}, 500)

setTimeout(() => {
    mOpen.value = true
}, 1000)
</script>