<template >
    <ion-page>
        <ion-content>
            <div class="body_all">
                <div class="header">
                    <div @click="stp > 1 ? (stp--) : (router.back())" class="ico_c ripple_parent ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="chevronBackOutline"
                            style="font-size: 4vh; position: relative; top: 0.3rem; right: 0.15rem;"></ion-icon> <span
                            v-if="stp > 1"
                            style="font-size: 2.6vh; position: relative; bottom: .35vh; color: #fb4073;">Retour</span>
                    </div>
                    <div class="step">
                        <span class="current">{{ stp }}</span>/4
                    </div>
                </div>
                <div v-if="stp == 1" class="body_cont">
                    <div class="title">
                        Celibapps
                    </div>
                    <div class="title_mess">
                        Créez votre compte
                    </div>
                    <form @submit.prevent="stp = 2">
                        <div class="forms">
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="personCircle" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input class="rinput" v-model="prenom" required type="text" placeholder="Votre Prénom" />
                            </div>
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="mail" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input class="rinput" v-model="email" required type="email" placeholder="Email" />
                            </div>
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="lockClosed" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input class="rinput" v-model="password" required :type="hiden ? 'password' : 'text'"
                                    placeholder="Mot de passe" />
                                <div @click="hiden = !hiden" class="ic_p">
                                    <ion-icon v-if="hiden" :icon="eye" style="position: relative; top: 0.05rem;" />
                                    <ion-icon v-else :icon="eyeOff" style="position: relative; top: 0.05rem;" />
                                </div>
                            </div>

                        </div>
                        <div class="butt">
                            <button type="submit" class="mbut">
                                Continuer
                            </button>
                        </div>
                    </form>
                    <div class="already">
                        Déjà inscrit? <a class="ancre" @click="router.push('/login')">Se connecter</a>
                    </div>
                </div>
                <div v-else-if="stp == 2" class="body_cont">
                    <div class="title_2">
                        Celibapps
                    </div>
                    <div class="title_mess">
                        Selectionnez votre genre
                    </div>
                    <div class="g_cont">
                        <div @click="sex = 'Homme'" class="gender" :class="{ is_selected: sex == 'Homme' }">
                            <div class="sign" :class="{ tselec: sex == 'Homme' }">
                                <ion-icon :icon="maleOutline"></ion-icon>
                            </div>
                            <div class="text_sign" :class="{ tselec: sex == 'Homme' }">
                                Homme
                            </div>
                        </div>
                        <div @click="sex = 'Femme'" :class="{ is_selected: sex == 'Femme' }" class="gender">
                            <div class="sign" :class="{ tselec: sex == 'Femme' }">
                                <ion-icon :icon="femaleOutline"></ion-icon>
                            </div>
                            <div class="text_sign" :class="{ tselec: sex == 'Femme' }">
                                Femme
                            </div>
                        </div>
                    </div>
                    <div class="birth_d">
                        Date de naissance
                    </div>
                    <div style="padding-top: 0.9rem;">
                        <ion-datetime :presentation="'date'"
                            @ion-change="e => birth = (e.detail.value as string)"></ion-datetime>
                    </div>
                    <div class="butt">
                        <button class="mbut" @click="check_stp2()">
                            Suivant
                        </button>
                    </div>
                </div>
                <div v-else-if="stp == 4" class="body_cont">
                    <div class="title_2">
                        Celibapps
                    </div>
                    <div class="title_mess4">
                        Donnez au moins 02 qualités de votre partenaire de rêve
                    </div>
                    <div class="forms">
                        <div class="minput">
                            <div class="icon_f">
                                <ion-icon :icon="heartHalf" style="position: relative; top: 0.05rem;" />
                            </div>
                            <input v-model="searching" class="rinput" type="text"
                                placeholder="Sens de l'humour, Ambition, Soutien, affection" />
                        </div>
                    </div>
                    <div class="sep">
                        <div class="txt" style="margin-top: 0.5rem">
                            Centres d'interêt
                        </div>
                        <div @click="cOpen = true" class="select txt" >
                            <div>
                                {{ inter_text }}
                            </div>
                            <button @click="qOpen = true" class="icon">
                                <ion-icon style="font-size: 2.2vh; position: relatve; top: 0.2rem" :icon="caretDown" />
                            </button>
                        </div>
                    </div>
                    <div class="sep">
                        <div class="txt" style="margin-top: 0.5rem">
                            Ville ou Quartier
                        </div>
                        <div @click="qOpen = true" class="select txt" >
                            <div>
                                {{ loc_text }}
                            </div>
                            <button class="icon">
                                <ion-icon style="font-size: 2.2vh; position: relatve; top: 0.2rem" :icon="location" />
                            </button>
                        </div>
                    </div>
                    <div class="butt">
                        <button class="mbut" @click="register_user()">
                            S'inscrire
                        </button>
                    </div>
                </div>
                <div v-else-if="stp == 3" class="body_cont">
                    <div class="title_2">
                        Celibapps
                    </div>
                    <div class="title_mess" style="font-size: 3.8vh !important;">
                        Ajoutez une photo de profil
                    </div>
                    <div class="tinfo">
                        Assurez-vous de choisir une image très belle où vous apparaissez clairement pour faire la différence.
                    </div>
                    <div class="profil_cont">
                        <div class="img_p" :class="{ empty: img_url == '' }" :style="{
                            'background-size': 'cover',
                            'background-position': 'top center',
                            'background-image': `url('${img_url}')`,
                        }">
                            <div v-if="img_url == ''" class="myico">
                                <ion-icon :icon="imageOutline" />
                            </div>
                            <button @click="img_url = '', img_pk = 0" v-else class="icor">
                                <ion-icon :icon="close" style="font-size: 1.3rem;" />
                            </button>
                        </div>
                    </div>
                    <div class="notice">

                    </div>
                    <div class="butt">
                        <button @click="click_id('myfilein')" class="mbuto pbut" v-if="img_url == ''">
                            <ion-icon :icon="camera"
                                style="font-size: 3vh; color: white; position: relative; top: 0.2vh;" /> Ajoutez une photo
                        </button>
                        <button class="mbuto pbut " @click="stp = 4" v-else>
                            Continuer <ion-icon :icon="arrowForward"
                                style="font-size: 3vh; color: white; position: relative; top: 0.8vh;" />
                        </button>
                    </div>
                </div>
            </div>
            <div v-show="false">
                <input type="file" accept="image/*" id="myfilein" @change="e => submit_img((e.target as any).files[0])" />
            </div>
            <interest-comp :is-open="cOpen" @done="e => (cOpen = false, cats = e)" @close="cOpen = false" ></interest-comp>
            <location-picker :is-open="qOpen" @close="qOpen = false" @done="e => (pquart = e, qOpen = false)" ></location-picker>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.icon {
  background: rgb(5, 5, 59);
  color: #ffffff;
  border-radius: 100%;
  width: 3.7vh;
  height: 3.7vh;
  min-width: 3.7vh;
  min-height: 3.7vh;
}
.txt {
  font-weight: bold;
  color: rgb(41, 41, 44);
}
.select:active {
  background: #969696;
}

.select {
  margin-top: 0.7rem;
  width: 100%;
  padding-left: 0.9rem;
  padding-right: 0.9rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  background: #e6e6e6;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sep {
  padding-top: 2vh;
  padding-bottom: 1vh;
}
.icor:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.651), transparent);
    background-color: #fb4073;
}

.icor {
    position: absolute;
    top: 2vh;
    left: 2vh;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    color: white;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.459), transparent);
    background-color: #fb4073;
}

.tinfo {
    padding-top: 1.5vh;
    padding-bottom: 1vh;
    font-size: 2.2vh;
    color: rgb(61, 61, 61);
}

.myico {
    position: absolute;
    font-size: 5vh;
    top: calc(50% - 2vh);
    left: calc(50% - 3vh);
}

.empty {
    border-style: solid;
    border-width: 1.5px;
    border-color: rgb(41, 41, 41);
}


.pbut:active {
    box-shadow: none;
}

.pbut {

    box-shadow: 0 10px 25px -3px #fb407379, 0 4px 6px -2px #f2824129;
}

.img_p {
    width: 75vw;
    height: 40vh;
    border-radius: 15px;
    position: relative;
}

.profil_cont {
    padding-top: 2.5vh;
    display: flex;
    justify-content: space-around;

}

.birth_d {
    padding-top: 5vh;
    font-size: 2.7vh;
    font-weight: bold;
    color: rgb(41, 41, 41);
}

.tselec {
    color: white !important;
}

.is_selected {
    background-color: rgb(41, 41, 41) !important;
}

.text_sign {
    text-align: center;
    font-size: 3vh;
    font-weight: bolder;
    color: rgb(41, 41, 41);
    padding-top: 3vh;
}

.sign {
    font-size: 6vh;
    position: relative;
    top: 4vh;
    left: calc(22.5vw - 4vh);
    color: rgb(150, 150, 150);
}

.gender {
    width: 45vw;
    height: 18vh;
    margin-right: 0.4rem;
    border-radius: 7px;
    box-shadow: 0 10px 15px -3px #d8d8d865, 0 4px 6px -2px #f2824129;
}

.g_cont {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 0.9rem;
}

.current {
    color: rgb(56, 56, 56);
}

.step {
    font-size: 2.5vh;
    color: rgb(163, 163, 163);
    padding-right: 0.5rem;
    font-weight: bold;
}

.ic_p {
    font-size: 1.2rem;
    color: rgb(54, 54, 54);
}

.ancre:active {
    color: #f8688e;
}

.ancre {
    color: #fb4073;
}

.already {
    padding-top: 3vh;
    text-align: center;
    font-size: 2.2vh;
    color: rgb(51, 51, 51);
    font-weight: bold;
}

.mbut:active {
    background-color: #fa84a3;
}

.mbuto {
    padding-top: 2vh;
    padding-bottom: 3vh;
    font-size: 2.5vh;
    text-align: center;
    width: 100%;
    border-radius: 25px;
    background-image: linear-gradient(to right, #fb4073 90%, #fa84a3);
    color: white;
    font-weight: bold;
}

.mbut {
    padding: 0.7rem;
    font-size: 2.5vh;
    text-align: center;
    width: 100%;
    border-radius: 25px;
    background-image: linear-gradient(to right, #fb4073 90%, #fa84a3);
    color: white;
    font-weight: bold;
}

.butt {
    padding-top: 5vh;
}

.rinput {
    border: none;
    font-size: 1rem;
    color: rgb(44, 44, 44);
    background-color: white;
    flex-grow: 1;
}

*:focus {
    outline: none;
}

.icon_f {
    font-size: 1.2rem;
    margin-right: 1.2rem;
    color: rgb(54, 54, 54);
}

.minput {
    padding: 1.2rem 0.4rem;
    display: flex;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: rgb(179, 179, 179);
    border-bottom-style: solid;
}

.forms {
    padding-top : 4vh;
}

.title_mess4 {
    padding-top: 0.8rem;
    font-size: 3.2vh;
    color: rgb(41, 41, 41);
    font-weight: bold;
}

.title_mess {
    padding-top: 0.8rem;
    font-size: 4.3vh;
    color: rgb(41, 41, 41);
    font-weight: bold;
}

.title_2 {
    padding-top: 1vh;
    font-size: 3vh;
    font-weight: bold;
    color: #fb4073;
}

.title {
    padding-top: 6vh;
    font-size: 3vh;
    font-weight: bold;
    color: #fb4073;
}

.body_cont {
    padding: 1rem 1rem;
}

.body_all {
    font-family: 'PT Serif', serif;
    width: 100%;
    height: 100%;
    background-color: white;
}

.ripple_parent {
    position: relative;
    overflow: hidden;
}

.ico_c {
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-top: 0.2rem;
    padding-bottom: 0.5rem;
    border-radius: 7px;
}

.header {
    padding: 0.8rem 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(49, 49, 49);
}
</style>

<script setup lang="ts" >
import router from "@/router";
import { IonPage, IonContent, IonIcon, IonRippleEffect, IonDatetime, isPlatform } from "@ionic/vue"
import { arrowForward, camera, caretBack, caretBackOutline, caretDown, chevronBackOutline, close, closeCircle, closeCircleOutline, eye, eyeOff, femaleOutline, heartHalf, imageOutline, location, lockClosed, mail, maleOutline, personCircle, search } from "ionicons/icons";
import { computed, ref, watch } from "vue";
import { show_alert, showLoading, store_obj, access_tok, get_obj, format_all, show_warn } from "@/global/utils"
import axios from "axios";
import { Geolocation } from "@capacitor/geolocation"
import InterestComp from "@/components/InterestComp.vue";
import LocationPicker from "@/components/LocationPicker.vue";
import { Cats } from "@/global/types";

const hiden = ref(true)
const stp = ref(1)
const sex = ref('')
const img_url = ref('')
const img_pk = ref(0)
const birth = ref('')
const searching = ref("")
const prenom = ref('')
const email = ref('')
const password = ref('')
const log_e = (e: any) => {
    console.log(e)
}

const check_stp2 = () => {
    if (sex.value == '') return show_alert('Impossible de continuer', "Veuillez indiquer votre genre avant de continuer.")
    if (birth.value == "") return show_alert("Impossible de continuer", "Veuillez choisir votre date de naissance avant de continuer")
    stp.value++;
}

const submit_img = async (file: File) => {
    {
        const loading = await showLoading("Ajout...")

        const form = new FormData()
        form.append('file', file)
        try {
            const resp = await axios.post('api/submit_img/', form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            loading.dismiss()
            if (resp.data['done']) {
                img_url.value = resp.data['result']['url']
                img_pk.value = resp.data['result']['pk']
            }
        } catch (e) {
            loading.dismiss()
            show_alert("Impossible de continuer", "Une erreur est survenue, Veuillez réessayez.")
        }

    }
}

const quart = ref<{
    lat: number,
    lng: number
}>()

const pquart = ref()
const cats = ref<Cats[]>([])
const qOpen = ref(false)
const cOpen = ref(false)
const inter_text = computed(() => {
    return  `${cats.value.length} intérêt${ cats.value.length > 1 ? 's' : ''} choisi${ cats.value.length > 1 ? 's' : ''}`
})
const loc_text = computed(() => {
    return !pquart.value ? 'Choisir ici' : pquart.value.name as string
})

const get_position = async () => {
    const is_native = isPlatform('android') || isPlatform("ios")
    if (!is_native) {
        if (!navigator.geolocation) return null;
        navigator.geolocation.getCurrentPosition(pos => (quart.value = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        }))
    } else {
        const coords = await Geolocation.getCurrentPosition()
        quart.value = {
            lat: coords.coords.latitude,
            lng: coords.coords.longitude
        }
    }
}
get_position()

const click_id = (id: string) => {
    document.getElementById(id)?.click()
}

const verify_same = async (token? : string) => {
    const resp = await axios.get('api/get_user/', {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if (resp.data['done']) {
        await format_all()
        await store_obj('user', JSON.stringify(resp.data['result']))
        await store_obj("tokens", token)
        setTimeout(async () => {
            router.push('/great')
        }, 60)
    }
}

const connect = async () => {
    const load = await showLoading('Connexion...')
    try {
        const resp = await axios.post('token/', {
            email: email.value,
            password: password.value
        })
        await store_obj("tokens", JSON.stringify(resp.data))
        try {
            await verify_same(JSON.stringify(resp.data))
        } catch (e) {
            show_alert('', 'Une erreur est survenue lors de votre connexion, veuillez reéssayer.')
        }
        load.dismiss()
        
    } catch (e) {
        load.dismiss()
        show_alert('Connexion impossible', "Veuillez vérifier vos identifiants")
    }

}

const register_user = async () => {
    if (searching.value == "") return show_alert('Impossible de continuer', "Veuillez entrer au moins 02 qualités de votre partenaire de rêve.")
    if(!pquart.value) return show_alert('Impossible de continuer', "Veuillez sélectionner votre ville ou votre quartier.")
    if(!cats.value.length) return show_alert('Impossible de continuer', "Veuillez choisir au moins un centre d'intérêt.")
    const load = await showLoading('Inscription...')

    try {
        const resp = await axios.post('api/register_user/', {
            prenom: prenom.value,
            email: email.value,
            password: password.value,
            birth: birth.value,
            sex: sex.value,
            img_pk: img_pk.value,
            searching: searching.value,
            quart: JSON.stringify(quart.value),
            pquart : JSON.stringify(pquart.value),
            cats : JSON.stringify(cats.value)
        })
        if (resp.data['done']) {
            await store_obj('user', JSON.stringify(resp.data.result))
            await connect()
        } else {
            if (resp.data['reason'] == 'already') show_alert("Email déjà utilisé", "Votre email a déjà été utilisé lors de la création d'un compte.")
        }
        load.dismiss()
    } catch (e) {
        load.dismiss()
        show_alert("Impossible de continuer", "Une erreur est survenue, Veuillez réessayez.")
    }
}

const set_o = async () => {
    await store_obj('hey', 'this')
    alert(await get_obj('hey'))
}

</script>