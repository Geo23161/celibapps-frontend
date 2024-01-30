<template >
    <ion-modal mode="ios" :is-open="isOpen" @didDismiss="close">
        <ion-content :scroll-y="true">
            <div class="oo_body">
                <div class="al_header">
                    <div @click="close()" class="menu">
                        <ion-icon :icon="clos" />
                    </div>
                </div>
                <div class="hap_but">
                    <button class="icor_xm" style="display: block !important; width: 10vh; height: 10vh;" id="chatm_but">
                        <ion-icon :icon="happy"
                            style="font-size: 5.5vh; position: relative; font-weight: bold; top: .2vh; " />
                    </button>
                </div>
                <div style="font-size: 2.5vh; font-weight: bold; text-align: center; padding-top: 2vh; ">
                    Quel est votre mood?
                </div>
                <div style="text-align: center; color: rgb(185, 185, 185); font-size: 2vh;">
                    Partagez ce que vous ressentez à ce moment. Modifier cela quand vous voulez.
                </div>
                <div style="padding-top: 2vh; overflow-y: auto; max-height: 100%;">
                    <div @click="done(0)" class="itm">
                        <div style="flex-grow: 1; margin-right: .6rem;">
                            Aucune envie
                        </div>
                        <ion-checkbox :checked="actual == 0" :color="'success'"></ion-checkbox>
                    </div>
                    <div v-for="m in moods" :key="m.id" @click="done(m.id)" class="itm">
                        <div style="flex-grow: 1;">
                            {{ m.name }}
                        </div>
                        <ion-checkbox  :checked="actual == m.id" :color="'success'"></ion-checkbox>
                    </div>
                    
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
ion-content {
    --background: #120c2b;
    --color: rgb(234, 227, 240);
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
    background-color: rgb(10, 216, 54);
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #ffffff65, 0 4px 6px -2px #17a74929;
    font-size: 2.1vh;
}

.al_header {
    width: 100%;
    padding: 1vh .5vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.itm:active {
    background-color: rgba(247, 247, 247, 0.425);
}

.itm {
    display: flex;
    font-size: 2.2vh;
    align-items: center;
    padding: 1.5vh 2vh;
    margin: 2vh 0vh;
    font-weight: bold;
    background-color: rgba(247, 247, 247, 0.219);
    border-radius: 10px;

}

.icor_xm:active {
    transform: scale(1.2);
}

.icor_xm {
    top: 2vh;
    left: 2vh;
    height: 5.5vh;
    width: 5.5vh;
    border-radius: 100%;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    margin-right: 0.6rem;
    background-color: rgb(10, 216, 54);
    color: rgb(255, 255, 255);
}

.hap_but {
    padding-top: 1vh;
    display: flex;
    justify-content: space-around;
}

.oo_body {
    width: 100%;
    min-height: auto;
    padding: 2vh 2vh;
    background: #120c2b;
    font-family: "Poppins";
    color: rgb(234, 227, 240);
}
</style>


<script lang="ts" setup >
import { IonModal, IonContent, IonCheckbox } from "@ionic/vue"
import { happy, close as clos } from "ionicons/icons";
import { access_tok, showLoading, show_alert } from "@/global/utils"
import { ref } from "vue"
import axios from "axios";
import { useRouter } from "vue-router";

const props = defineProps({
    isOpen: Boolean,
    actual: Number
})
console.log(props)

const emit = defineEmits(['close', 'done'])

const close = () => {
    emit('close')
}

const moods = ref([] as any[])
const router = useRouter()

const get_moods = async () => {
    const load = await showLoading('Recherche....')
    try {
        const resp = await axios.get('api/all_moods/', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if (resp.data['done']) moods.value = resp.data['result']
    } catch (e) {
        console.log(e)
        await show_alert('Erreur de connexion', "Veuillez vérifier votre connexion internet et reessayer.")
    }
    load.dismiss()
}
get_moods()

const done = async (id: number) => {
    const load = await showLoading('Enregistrement...')
    try {
        const resp = await axios.post('api/set_mood/', {
            pk: id
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if(resp.data['done']) {
            emit('done', resp.data['result'])
        }
    } catch(e) {
        console.log(e)
    }
    load.dismiss()
}



</script>
