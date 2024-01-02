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
                                Mon ticket
                            </div>
                        </div>
                    </div>
                    <div class="tbody">
                        <ion-segment @ionChange="e => actu = e.detail.value as string" mode="md" :value="actu">
                            <ion-segment-button value="pay">
                                <ion-label>Paiement</ion-label>
                            </ion-segment-button>
                            <ion-segment-button value="code">
                                <ion-label>Code d'invitaion</ion-label>
                            </ion-segment-button>
                        </ion-segment>
                    </div>
                    <div v-if="actu == 'pay'">
                        
                        <div v-if="abons.length" class="mbody">
                            <div class="mtitle">
                                Choississez votre ticket du mois pour débloquer plus
                            </div>
                            <div v-if="get_abon('free')" class="abon">
                                <div class="atitle">
                                    <user-badge :status="'free'" :width="'3.1vh'" :height="'3.1vh'" :size="'2.1vh'" /> <span
                                        style="font-weight: bold; font-size: 2.8vh ; position: relative; top: .1vh;">Gratuit</span>
                                </div>
                                <div style="font-size: 2.2vh; color: rgb(105, 105, 105);">
                                    {{ get_abon('free').sub }}
                                </div>
                                <div class="price">
                                    <div class="rprice">
                                        {{ get_abon('free').amount }}F
                                    </div>
                                    <div class="nmo">
                                        par mois
                                    </div>
                                </div>
                                <div style="padding: 0.6vh 1vh;">
                                    <button @click="set_free()" class="activate" :class="['free']">
                                        Activer
                                    </button>
                                </div>
                                <div class="features">
                                    <div class="ftitle">
                                        Avantages
                                    </div>
                                    <div v-for="key in get_abon('free').keys" :key="key" class="feats">
                                        <ion-icon :icon="checkmark" :color="'primary'"></ion-icon> {{ key }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="get_abon('silver')" class="abon">
                                <div class="atitle">
                                    <user-badge :status="'silver'" :width="'3.1vh'" :height="'3.1vh'" :size="'2.1vh'" />
                                    <span
                                        style="font-weight: bold; font-size: 2.8vh ; position: relative; top: .1vh;">Silver</span>
                                </div>
                                <div style="font-size: 2.2vh; color: rgb(105, 105, 105);">
                                    {{ get_abon('silver').sub }}
                                </div>
                                <div class="price">
                                    <div class="rprice">
                                        {{ get_abon('silver').amount }}F
                                    </div>
                                    <div class="nmo">
                                        par mois
                                    </div>
                                </div>
                                <div style="padding: 0.6vh 1vh;">
                                    <button @click="opne_kki(get_abon('silver'))" class="activate" :class="['silver']">
                                        Activer
                                    </button>
                                </div>
                                <div class="features">
                                    <div class="ftitle">
                                        Avantages
                                    </div>
                                    <div v-for="key in get_abon('silver').keys" :key="key" class="feats">
                                        <ion-icon :icon="checkmark" :color="'primary'"></ion-icon> {{ key }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="get_abon('silver_plus')" class="abon">
                                <div class="atitle">
                                    <user-badge :status="'silver_plus'" :width="'3.1vh'" :height="'3.1vh'"
                                        :size="'2.1vh'" />
                                    <span
                                        style="font-weight: bold; font-size: 2.8vh ; position: relative; top: .1vh;">Silver
                                        Plus</span>
                                </div>
                                <div style="font-size: 2.2vh; color: rgb(105, 105, 105);">
                                    {{ get_abon('silver_plus').sub }}
                                </div>
                                <div class="price">
                                    <div class="rprice">
                                        {{ get_abon('silver_plus').amount }}F
                                    </div>
                                    <div class="nmo">
                                        par mois
                                    </div>
                                </div>
                                <div style="padding: 0.6vh 1vh;">
                                    <button @click="opne_kki(get_abon('silver_plus'))" class="activate"
                                        :class="['silver_plus']">
                                        Activer
                                    </button>
                                </div>
                                <div class="features">
                                    <div class="ftitle">
                                        Avantages
                                    </div>
                                    <div v-for="key in get_abon('silver_plus').keys" :key="key" class="feats">
                                        <ion-icon :icon="checkmark" :color="'primary'"></ion-icon> {{ key }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="get_abon('golden')" class="abon">
                                <div class="atitle">
                                    <user-badge :status="'golden'" :width="'3.1vh'" :height="'3.1vh'" :size="'2.1vh'" />
                                    <span
                                        style="font-weight: bold; font-size: 2.8vh ; position: relative; top: .1vh;">Golden</span>
                                </div>
                                <div style="font-size: 2.2vh; color: rgb(105, 105, 105);">
                                    {{ get_abon('golden').sub }}
                                </div>
                                <div class="price">
                                    <div class="rprice">
                                        {{ get_abon('golden').amount }}F
                                    </div>
                                    <div class="nmo">
                                        par mois
                                    </div>
                                </div>
                                <div style="padding: 0.6vh 1vh;">
                                    <button @click="opne_kki(get_abon('golden'))" class="activate" :class="['golden']">
                                        Activer
                                    </button>
                                </div>
                                <div class="features">
                                    <div class="ftitle">
                                        Avantages
                                    </div>
                                    <div v-for="key in get_abon('golden').keys" :key="key" class="feats">
                                        <ion-icon :icon="checkmark" :color="'primary'"></ion-icon> {{ key }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="get_abon('vip')" class="abon">
                                <div class="atitle">
                                    <user-badge :status="'vip'" :width="'3.1vh'" :height="'3.1vh'" :size="'1.4vh'" /> <span
                                        style="font-weight: bold; font-size: 2.8vh ; position: relative; top: .2vh;">VIP
                                    </span>
                                </div>
                                <div style="font-size: 2.2vh; color: rgb(105, 105, 105);">
                                    {{ get_abon('vip').sub }}
                                </div>
                                <div class="price">
                                    <div class="rprice">
                                        {{ get_abon('golden').amount }}F
                                    </div>
                                    <div class="nmo">
                                        par mois
                                    </div>
                                </div>
                                <div style="padding: 0.6vh 1vh;">
                                    <button @click="opne_kki(get_abon('vip'))" class="activate" :class="['vip']">
                                        Activer
                                    </button>
                                </div>
                                <div class="features">
                                    <div class="ftitle">
                                        Avantages
                                    </div>
                                    <div v-for="key in get_abon('vip').keys" :key="key" class="feats">
                                        <ion-icon :icon="checkmark" :color="'primary'"></ion-icon> {{ key }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="global_spinner">
                                <div>
                                    <ion-spinner name="crescent">

                                    </ion-spinner>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="state.status != 'waiting'" class="mbody">
                            <div class="mtitle">
                                Entrez votre code d'invitation et gagnez gratuitement un ticket
                            </div>
                            <div class="no_img">
                                <img style="width: 30vw" :src="'../../imgs/code.svg'" />
                            </div>
                            <div class="forms">
                                <div class="minput">
                                    <div class="icon_f">
                                        <ion-icon :icon="personAdd" style="position: relative; top: 0.15rem;" />
                                    </div>
                                    <input class="rinput" v-model="code" type="text" placeholder="Entrez le code..." />
                                </div>
                            </div>
                            <div class="butt">
                                <button class="mbut" @click="send_code()">
                                    Valider
                                </button>
                            </div>

                        </div>
                        <div v-else class="mbody">
                            <div class="mtitle">
                                Code d'invitation en cours de validation
                            </div>
                            <div class="no_img">
                                <img style="width: 40vw" :src="'../../imgs/wait.svg'" />
                            </div>
                            <div style="font-size: 2.1vh; text-align: center; padding-top: 1.5vh;">
                                {{ state.reason }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ion-toast :isOpen="!has_come" :mode="'ios'" :buttons="toats_buts"
                :message="`Si vous avez un code, veuillez cliquez sur CODE D'INVITATION pour activer votre ticket. `"
                layout="stacked"></ion-toast>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
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
    background-color: transparent;
    flex-grow: 1;
}

* :focus {
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
    padding-top: 4vh;
}

.no_img {
    padding-top: 1vh;
    display: flex;
    justify-content: space-around;
}

.tbody {
    padding: 1.2vh 0.2vh;
}

.silver_plus {
    background-color: #fc9e32;
    color: white;
}

.global_spinner {
    padding-top: 46vh;
    display: flex;
    justify-content: space-around;
}

.feats {
    padding-top: 1.5vh;
}

.ftitle {
    font-weight: bold;
    font-size: 2vh;

}

.features {
    padding-top: 3vh;
}

.vip:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.527), transparent);
    background-color: #fc1955;
}

.vip {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #edfc19 !important;
    color: black;
}

.golden {
    background: linear-gradient(to left, #c09433, #faf298, #c09433);
}

.silver:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.651), transparent);
    background-color: #5d28f0;
}

.silver {
    background-color: #5d28f0;
    color: white;
}

.free:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.651), transparent);
    background-color: red;
}

.free {
    background-color: red;
    color: white;
}

.activate {
    width: 100%;
    padding: 1vh 2vh;
    font-size: 2.6vh;
    font-weight: bold;
    border-radius: 10px;
}

.nmo {
    color: rgb(105, 105, 105);
    display: inline-block;
    margin-left: 0.6rem;
}

.rprice {
    font-weight: bolder;
    font-size: 3.8vh;
    display: inline-block;
}

.price {
    margin-top: 4vh;

}

.atitle {
    font-size: 2.5vh;
}

.abon {
    padding: 3vh 2vh;
    border-radius: 15px;
    background-color: white;
    margin-bottom: 3vh;
}

.mtitle {
    font-size: 2.2vh;
    font-weight: bold;
    text-align: center;
    padding: 1rem;
}

.mbody {
    padding-top: 1vh;
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
    background-color: #fb4073;
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
import { IonModal, IonContent, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonToast, ToastButton } from "@ionic/vue"
import { checkmark, close, personAdd, refresh } from "ionicons/icons";
import UserBadge from "./UserBadge.vue";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { access_tok, get_obj, show_alert, store_obj, showLoading, presentToast } from "@/global/utils";
import { addKkiapayListener, openKkiapayWidget } from "kkiapay"
import { useUserStore } from "@/global/pinia"
import { storeToRefs } from "pinia";


const props = defineProps({
    isOpen: Boolean,
    is_first: Boolean
})

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { payment, user } = userStore

const emit = defineEmits(['close', 'done'])

const close_ = () => {
    if (!user.value?.cur_abn) {
        set_free()
    } else
        emit('close')
}
const done = (state: string) => {
    emit('done', state)
}

const abons = ref<{
    typ: string,
    amount: number,
    keys: string[],
    sub: string
}[]>([])
const sandbox = ref(false)
const api = ref('')
const get_abon = (state: string) => {
    return abons.value.filter(e => e.typ == state)[0]
}

const get_abons = async () => {
    try {
        const resp = await axios.get('api/get_abons/', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if (resp.data['done']) abons.value = resp.data['result'], sandbox.value = resp.data['is_dev'], api.value = resp.data['api']
    } catch (e) {
        show_alert('Erreur inattendue', "Une erreur est survenue, veuillez reéssayer.")
    }
}
get_abons()


const opne_kki = async (abn: {
    typ: string,
    amount: number,
    keys: string[],
    sub: string
}) => {
    const load = await showLoading('Paientez...')
    setTimeout(() => {
        load.dismiss()
    }, 2400)
    openKkiapayWidget({
        amount: abn.amount,
        api_key: api.value,
        sandbox: sandbox.value,
    })

    addKkiapayListener('success', resp => {
        payment.value = {
            transactionId: resp.transactionId,
            state: abn.typ
        }
        done(abn.typ)
    })
}

const set_free = () => {
    payment.value = {
        transactionId: '00000000',
        state: 'free'
    }
    done('free')
}

const actu = ref('pay')
const code = ref('')
const state = ref({
    status: '',
    reason: ''
})
const get_state = async () => {
    try {
        const resp = await axios.get('api/get_state/', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if (resp.data['done']) {
            state.value = resp.data['result']
        }
    } catch (e) {
        console.log(e)
    }
}
get_state()

const has_come = ref(false)
const set_come = async () => {
    const has_come_ = await get_obj('has_come')
    if (has_come_) has_come.value = true
}
set_come()

const toats_buts = ref<ToastButton[]>([
    {
        text: "J'ai compris",
        handler: async () => {
            await store_obj('has_come', 'yes')
        }
    }
])

const send_code = async () => {
    if (code.value == '') return show_alert('Impossible de valider', "Votre code est vide. Veuillez entrrer un code valide.")
    const load = await showLoading('Validation...')
    try {
        const resp = await axios.post('api/send_code/', {
            code: code.value
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if (!resp.data['done']) {
            show_alert('Code invalide', "Votre code est incorrecte ou a déjà été utilisé et validé.")
        } else {
            if (resp.data['result']['usercode']['status'] == 'done') {
                user.value = resp.data['result']['user']
                done(resp.data['result']['for_abon'])
                presentToast("bottom", "Votre ticket a été activé avec succès.", "success", 5000)
            } else {
                state.value = resp.data['result']['usercode']
            }
        }
    } catch (e) {
        console.log(e)
        show_alert ("Impossible de valider", "Une erreur est survenue lors de la validation du code, veuillez reéssayer.")
    }
    load.dismiss()
}

</script>
