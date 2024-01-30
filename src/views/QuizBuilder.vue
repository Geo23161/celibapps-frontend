<template>
    <ion-page>
        <ion-content>
            <div class="my_all">

                <div class="wrapper is_down">
                    <div class="al_header">
                        <div @click="router.back()" class="menu">
                            <ion-icon :icon="close" />
                        </div>

                    </div>
                    <div class=" anim " style="display: flex; width: 100%;" :class="{
                        is_left: beguin,
                        is_right: create,
                    }">
                        <div class="al_item">
                            <div class="top_text">
                                Démarrez l'aventure en groupe.
                            </div>
                            <div class="top_image">
                                <img :src="'../../imgs/fun.svg'" style="width: 60vw;" />
                            </div>
                            <div class="top_des">
                                Formez des groupes entre ami(es) et allez à la conquête d'autres groupes: amusez-vous. 
                            </div>
                            <div style="display: flex; justify-content: space-around; padding: 3vh 4vh; ">
                                <button @click="create_group()" class="al_but">
                                    Creer un groupe
                                </button>
                            </div>
                            <div style="display: flex; justify-content: space-around; padding: 2vh 4vh; margin-top: -3vh;">
                                <button @click="beguin = true" class="albut">
                                    Rejoindre un groupe
                                </button>
                            </div>
                        </div>

                        <div class="al_item anim">
                            <div style="padding: 2vh 3vh;">
                                <div class="enter_ques">
                                    Entrez la code du groupe
                                </div>
                                <div class="al_inp" @input="set_text" contenteditable data-placeholder="code...">

                                </div>
                                <div style="display: flex; justify-content: space-around; padding: 3vh 0vh; ">
                                <button @click="join_group()" class="al_but">
                                    Valider
                                </button>
                            </div>
                            </div>
                        </div>

                        <div class="al_item">
                            <div class="top_text">
                                Code de votre groupe
                            </div>
                            <div class="top_image">
                                <div style="text-align: center; font-size: 14vw; color: #fc1955; font-weight: bold; " >
                                    {{ code }}
                                </div>
                            </div>
                            <div class="top_des" style="margin-top: 5vw;" >
                                Invitez vos amis à entrer ce code pour rejoindre votre groupe
                            </div>
                            <div style="display: flex; justify-content: space-around; padding: 2vh 4vh; margin-top: -3vh;">
                                <button @click="start_share()" class="albut">
                                    <ion-icon :icon="shareSocial" /> Partager ce code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>


<style scoped>
.sm_inp {
    padding: 1vh 2vh;
    font-size: 1.9vh;
    background-color: #ffffff;
    color: rgb(29, 29, 29);
    border-radius: 10px;
    margin-top: 2vh;
    flex-grow: 1;
}

.text_ress {
    padding-top: 5vh;
    font-size: 2.2vh;
}

.help:active {
    color: #ffffff;
}

.help {
    text-align: center;
    font-size: 2vh;
    color: #fc1955;
    padding-top: 1.2vh;
}

.al_inp:empty::before {
    content: attr(data-placeholder);
    color: rgba(29, 29, 29, 0.616);
}

*:focus {
    outline: none;
}

.al_inp {
    padding: 2vh 2vh;
    background-color: white;
    color: rgb(29, 29, 29);
    border-radius: 10px;
    margin-top: 2vh;
    font-size: 2vh;
}

.qies {
    font-size: 2vh;
}

.enter_ques {
    font-size: 2.2vh;
    padding-top: 15vh;
}

.al_item {
    min-width: 100vw;
}

.al_but:active,
.sa_but:active,
.albut:active {
    transform: scale(0.9);
}

.sa_but {
    padding: 1.5vh;
    font-size: 1.8vh;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    background-color: #fc1955;
    transition: all ease-in-out 0.2s;
}

.albut {

    background-color: #ffffff;
    color: #0d091f;
    padding: 1.6vh;
    font-size: 2.2vh;
    width: 100%;
    font-weight: bold;
    border-radius: 10px;
    transition: all ease-in-out 0.2s;
}

.al_but {
    padding: 1.6vh;
    font-size: 2.2vh;
    width: 100%;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    background-color: #fc1955;
    transition: all ease-in-out 0.2s;
}

.anim {
    transition: all ease-in-out 0.5s;
}

.is_left {
    transform: translateX(-100vw);
}
.is_right {
    transform: translateX(-200vw);
}

.top_des {
    padding: 3vh 2.5vh;
    text-align: center;
    font-size: 2.2vh;
}

.top_text {
    text-align: center;
    font-size: 2.5vh;
    font-weight: bold;
    padding-top: 8vh;
}

.top_image {
    padding-top: 6vh;
    padding-bottom: 2vh;
    display: flex;
    justify-content: space-around;
}

.menu:active,
.menu_:active {
    box-shadow: none;
    background: white;
    color: #0d091f;
}

.menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #ffffff;
    color: #0d091f;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #ffffff65, 0 4px 6px -2px #17a74929;
    font-size: 2.1vh;
}

.al_header {
    width: 100%;
    padding: 2vh 2vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wrapper {
    width: 100%;
    height: 100%;
    transition: all ease-in-out 0.5s;
}

.my_all {
    width: 100%;
    height: 100%;
    background-color: rgb(29, 29, 29);
    font-family: 'Poppins';
    color: white;
}
</style>

<script lang="ts" setup >
import { IonPage, IonContent, IonIcon, IonCheckbox } from "@ionic/vue"
import { close, shareSocial } from "ionicons/icons";
import { useRouter } from "vue-router";
import { ref } from "vue"
import { access_tok, showLoading, show_alert } from "@/global/utils";
import axios from "axios";
import { Share, ShareOptions } from "@capacitor/share"
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";

const router = useRouter()

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)

const { g_load } = userStore

const create = ref(false)
const beguin = ref(false)
const code = ref("")

const code_enter = ref("")

const start_share = async () => {
    await Share.share({
        title : "Rejoignez mon groupe sur Celibapps",
        text : `Voilà le code : ${code.value}`
    })
}

const create_group = async () => {
    const load = await showLoading('Patientez...')
    try {
        const resp = await axios.get('api/create_group/', {
            headers : {
                Authorization : `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if(resp.data['done']) {
            create.value = true
            code.value = resp.data['result']
        }
    } catch(e) {
        console.log(e)
        await show_alert('', "Une erreur est survenue, veuillez reéssayer")
    }
    load.dismiss()
}

const join_group = async () => {
    if(code_enter.value.length < 6) return await show_alert("Code invalide", "Veuillez entrer un code valide.")
    g_load.value = await showLoading('Patientez...')
    try {
        const resp = await axios.post('api/join_group/', {
            code : code_enter.value
        }, {
            headers : {
                Authorization : `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if(!resp.data['done']) {
            g_load.value.dismiss()
            g_load.value = undefined
            await show_alert('Code incorrecte', "Ce code ne correspond a aucun groupe ou le groupe correspndant est déjà plein.")
        }
    } catch(e) {
        console.log(e)
        await show_alert('', "Une erreur est survenue, veuillez reéssayer")
        g_load.value.dismiss()
            g_load.value = undefined
    }

}

const set_text = (e: any) => {
    code_enter.value = e.target.innerText;
}
</script>
