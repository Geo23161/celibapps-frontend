<template >
    <ion-page>
        <ion-content>
            <div v-if="group" class="gr_body">
                <div style="position: fixed; z-index: 150;">
                    <div class="header">
                        <div @click="router.back()" class="menu">
                            <ion-icon :icon="close" />
                        </div>
                    </div>
                </div>
                <div class="wrapper">
                    <div v-if="group.users.length == 2" class="group_two">
                        <div :style="{
                            backgroundImage: `url('${group.users[0].get_profil.get_picture}')`
                        }" @click="router.push('/profil/' + group.users[0].id)" class="img_all num1 num2">
                            <div
                                style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%; ">
                                <div class="txt_f">
                                    <span>{{ group.users[0].prenom }}</span>
                                </div>
                            </div>
                        </div>
                        <div :style="{
                            backgroundImage: `url('${group.users[1].get_profil.get_picture}')`
                        }" class="img_all num3 num4" @click="router.push('/profil/' + group.users[1].id)">
                            <div
                                style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%; ">
                                <div class="txt_f">
                                    <span>{{ group.users[1].prenom }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="group.users.length == 3" class="group_two">
                        <div class="help_2" style="height: 85vh">
                            <div class="img_all num1" :style="{
                                backgroundImage: `url('${group.users[0].get_profil.get_picture}')`
                            }" @click="router.push('/profil/' + group.users[0].id)" >
                                <div
                                    style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%; ">
                                    <div class="txt_f">
                                        <span>{{ group.users[0].prenom }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="img_all num2" :style="{
                                backgroundImage: `url('${group.users[1].get_profil.get_picture}')`
                            }" @click="router.push('/profil/' + group.users[1].id)" >
                                <div
                                    style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%; ">
                                    <div class="txt_f">
                                        <span>{{ group.users[1].prenom }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :style="{
                            backgroundImage: `url('${group.users[2].get_profil.get_picture}')`
                        }" class="img_all num3-4" @click="router.push('/profil/' + group.users[2].id)" >
                            <div
                                style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%; ">
                                <div class="txt_f">
                                    <span>{{ group.users[2].prenom }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="group_two">
                        <div class="help_2">
                            <div class="img_all num1" :style="{
                                backgroundImage: `url('${group.users[0].get_profil.get_picture}')`
                            }" @click="router.push('/profil/' + group.users[0].id)" >
                                <div
                                    style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%;">
                                    <div class="txt_f">
                                        <span>{{ group.users[0].prenom }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="img_all num2" :style="{
                                backgroundImage: `url('${group.users[1].get_profil.get_picture}')`
                            }" @click="router.push('/profil/' + group.users[1].id)" >
                                <div
                                    style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%;">
                                    <div class="txt_f">
                                        <span>{{ group.users[1].prenom }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="help_2 num3">
                            <div class="img_all" :style="{
                                backgroundImage: `url('${group.users[2].get_profil.get_picture}')`
                            }" @click="router.push('/profil/' + group.users[2].id)" >
                                <div
                                    style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%;">
                                    <div class="txt_f">
                                        <span>{{ group.users[2].prenom }}</span>
                                    </div>
                                </div>

                            </div>
                            <div class="img_all num4" :style="{
                                backgroundImage: `url('${group.users[3].get_profil.get_picture}')`
                            }" @click="router.push('/profil/' + group.users[3].id)" >
                                <div
                                    style="width: 100%; height: 100%; background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.664)) ; position: relative; top: 0%; ">
                                    <div class="txt_f" >
                                        <span>{{ group.users[3].prenom }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.txt_f {
    font-size: 3.4vh;
    font-weight: bold;
    position: absolute;
    bottom: 2.7vh;
    left: 2vh;
    color: white;
}
.imgtoop {
    width: 25vw;
    height: 25vw;
    border-radius: 100%;
    margin: 2vh;
}

.help_2 {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
}

.img_all {
    background-position: top center;
    background-size: cover;
    height: 100%;
    width: 100%;
    border-radius: 0px !important ;
}

.group_two {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%
}

.wrapper {
    width: 100%;
    height: 100%;
}

.menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #fc1955;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #fc195565, 0 4px 6px -2px #17a74929;

}

.header {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.gr_body {
    width: 100%;
    height: 100%;

}
</style>

<script setup lang="ts" >
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue"
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { access_tok, showLoading, show_alert } from "@/global/utils"
import axios from "axios";
import { UserGroup } from "@/global/types";
import { close } from "ionicons/icons";

const id = ref(0)
const router = useRouter()
const route = useRoute()
const group = ref<UserGroup>()

const get_group = async () => {
    const load = await showLoading('Patientez...')
    try {
        const resp = await axios.post('api/get_group/', {
            id: id.value
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if (resp.data['done']) group.value = resp.data['result']
    } catch (e) {
        console.log(e)
        await show_alert('', "Une erreur est survenue, veuillez reéssayer")
    }
    load.dismiss()
}

onIonViewDidEnter(() => {
    id.value = parseInt(route.params['id'] as string)
    get_group()
})

</script>
