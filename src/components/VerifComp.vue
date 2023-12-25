<template >
    <ion-modal :isOpen="isOpen">
        <ion-content>
            <div class="body">
                <div class="sbody">
                    <div class="header">
                        <div class="menu" @click="close_()">
                            <ion-icon :icon="close" />
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 1.1rem">
                                Vérifier mon profil
                            </div>
                        </div>
                    </div>
                    <div class="mbody">
                        <div class="mtitle">
                            Vérifiez votre profil pour plus de visibilité.
                        </div>
                        <div class="img_c">
                            <div :style="{
                                'background-size': 'cover',
                                'background-position': 'top center',
                                'background-image': `url('${profil}')`,
                            }" class="photo_p"></div>
                        </div>
                        <div class="ico_c">
                            <button v-if="verif && verif.status != 'rejected'" class="mbt princi">
                                <ion-icon :icon="checkmark" />
                            </button>
                            <button v-else class="mbt secoo">
                                <ion-icon :icon="close" />
                            </button>
                        </div>
                        <div class="">
                            <div v-if="verif">
                                <div v-if="verif.status != 'pending'" class="stat_">
                                    <div class="show_p" :style="{
                                        'background-color': verif.status == 'rejected' ? 'red' : 'green'
                                    }">

                                    </div>
                                    <div class="stat_text">
                                        {{ verif.status == 'rejected' ? 'Pièce illisible ou invalide' : "Profil vérifié avec succès." }}
                                    </div>
                                </div>
                                <div v-else class="stat_">
                                    <div class="show_p" :style="{
                                            'background-color': 'gray'
                                        }">

                                    </div>
                                    <div class="stat_text">
                                        Vérification en cours
                                    </div>
                                </div>
                            </div>
                            <div v-if="!verif || (verif && verif.status == 'rejected')">
                                <button v-if="!is_verifying" @click="is_verifying = true" class="mbuto pbut">
                                    <ion-icon :icon="checkbox"
                                        style="font-size: 3vh; color: white; position: relative; top: 0.2vh;" /> Vérifier
                                    mon
                                    profil
                                </button>
                                <div class="verif_box" v-else>
                                    <div class="txt" style="margin-top: 0.5rem">
                                        Instructions de vérification
                                    </div>
                                    <div style="font-size: 0.9rem; padding-top: 0.6rem">
                                        {{ command }}
                                    </div>
                                    <div class="select txt" @click="upload()">
                                        <div v-if="!file">Aucun fichier</div>
                                        <div v-else>{{ file_name }} </div>
                                        <button class="ico">
                                            <ion-icon :icon="cloudUpload" />
                                        </button>
                                    </div>
                                    <button @click="set_verif()" class="mbuto pbut">
                                        <ion-icon :icon="checkbox"
                                            style="font-size: 3vh; color: white; position: relative; top: 0.2vh;" />
                                        Vérifier
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-show="false">
                            <input id="finp" type="file" accept="image/*" capture="user"
                                @change="(ev) => empty_files((ev.target as any).files)" />
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
.stat_text {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 1rem 0.6rem;
}

.show_p {
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    border-radius: 100%;
    margin-right: 0.1rem;
}

.stat_ {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
}

.error {
    margin-top: -0.4rem;
    padding: 0.8rem;
    border-radius: 15px;
    color: rgb(174, 32, 3);
    background: rgba(174, 31, 3, 0.268);
}

.ico {
    background: rgb(41, 41, 44);
    color: #ffffff;
    border-radius: 100%;
    width: 1.8rem;
    height: 1.8rem;
    min-width: 1.8rem;
    min-height: 1.8rem;
}

.select:active {
    background: #eeebfc;
}

.select {
    margin-top: 0.7rem;
    width: 100%;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    background: #ffffff;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.txt {
    font-weight: bold;
    color: rgb(41, 41, 44);
}

.title_nor {
    font-size: 2.5vh;
    font-weight: bold;
}

.verif_box {
    padding: 1vh 2vh;
}

.pbut:active {
    box-shadow: none;
}

.pbut {

    box-shadow: 0 10px 25px -3px #65fc0079, 0 4px 6px -2px #f2824129;
}

.but {
    padding-top: 6vh;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

.mbut:active {
    background-color: #fa84a3;
}

.mbuto {
    margin-top: 2vh;
    padding-top: 1.4vh;
    padding-bottom: 2.4vh;
    font-size: 2.5vh;
    text-align: center;
    width: 100%;
    border-radius: 25px;
    background-color: rgb(0, 156, 0);
    color: white;
    font-weight: bold;
}

.secoo:active {
    box-shadow: none;
}

.secoo {
    background-color: #ff0707;
    color: white;
    box-shadow: 0 10px 15px -3px #ff070765, 0 4px 6px -2px #17a74929;
}

.mbt:active {
    box-shadow: none;
    background: white;
    color: #7759ff;
}

.princi {
    background-color: #7759ff;
    color: white;
    box-shadow: 0 10px 15px -3px #7759ff65, 0 4px 6px -2px #17a74929;
}

.mbt {
    display: block;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    font-size: 1.5rem;
}

.ico_c {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: -25px;
}

.photo_p {
    width: 180px;
    height: 250px;
    border-radius: 15px;
}

.img_c {
    display: flex;
    padding-top: 0.8rem;
    justify-content: space-around;
}

.mtitle {
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
    padding: 1rem;
}

.mbody {
    padding-top: 3.5vh;
}

.menu:active,
.menu_:active {
    box-shadow: none;
    background: white;
    color: #fb4073;
}

.menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #ff5959;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #ff595965, 0 4px 6px -2px #17a74929;
}

.header {
    padding-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sbody {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
}

.body {
    min-height: 100vh;
    width: 100%;
    padding: 10px;
    background-image: linear-gradient(to right, #f5f3fd, #e9e4ff 60%, #f5f3fd);
    font-family: "Poppins";
    overflow: scroll;
}
</style>

<script setup lang="ts" >
import { IonModal, IonContent } from "@ionic/vue"
import { checkbox, checkmark, close, cloudUpload } from "ionicons/icons";
import { computed, ref, watch } from "vue";
import { Verif } from "@/global/types"
import { access_tok, showLoading, show_alert } from "@/global/utils";
import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)

const { user } = userStore
const is_verifying = ref(false)

const props = defineProps({
    isOpen: Boolean,
    profil: String,
})

const pOpen = computed(() => {
    return props.isOpen
})

       

const verif = computed(() => {
    if (!user.value) return;
    else return user.value.cur_abn.verif
})
const emit = defineEmits(['close'])
const close_ = () => {
    emit('close')
}

const command = ref("")

const upload = () => {
    document.getElementById("finp")?.click();
};
const file = ref<any>();

const file_name = computed(() => {
    return (file.value as File).name
})

const empty_files = (fils: any[]) => {
    file.value = fils[0]
};

const get_command = async () => {
    const load = await showLoading('Patientez')
    try {
        const resp = await axios.get('api/get_command/')
        if (resp.data['done']) {
            command.value = resp.data['result']
        }
    } catch (e) {
        console.log(e)
        await show_alert('', "Une erreur est survenue lors de la récupération de l'instruction de vérification.")
    }

    load.dismiss()
}
get_command()
    


const set_verif = async () => {
    if (!file.value) return show_alert('Photo introuvable', "Veuillez soumettre une image suivant la consigne donnée en cliquant sur le champ.")
    const load = await showLoading('Patientez...')
    try {
        const form = new FormData()
        form.append('piece', file.value)
        const resp = await axios.post('api/set_verif/', form, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if (resp.data['done'] && user.value) {
            load.dismiss()
            user.value.cur_abn.verif = resp.data['result']
        } else if (!resp.data['done']) {
            await show_alert('Reservé aux abonnés', "Vous devez disposez au moins de l'abonnement Silver pour faire verifier votre profil.")
            load.dismiss()
        }
    } catch (e) {
        console.log(e)
        load.dismiss()
        show_alert('Erreur inattendue', 'Une erreur est survenue, veuillez reéssayer.')
    }
}

</script>