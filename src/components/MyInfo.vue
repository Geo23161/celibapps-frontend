<template >
    <ion-modal :isOpen="isOpen">
        <ion-content>
            <div class="body_all_">
                <div class="header_">
                    <div @click="close_()" class="ico_c ripple_parent ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="chevronBackOutline"
                            style="font-size: 4vh; position: relative; top: 0.3rem; right: 0.15rem;"></ion-icon> <span
                            style="font-size: 2.6vh; position: relative; bottom: .35vh; color: #fb4073;">Retour</span>
                    </div>
                </div>
                <form @submit.prevent="done()" class="body_cont">
                    <div>
                        <div class="title_mess4">
                            Votre Prénom
                        </div>
                        <div class="forms">
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="personCircle" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input class="rinput" v-model="prenom" required type="text" placeholder="Votre Prénom" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="title_mess4">
                            Votre Email
                        </div>
                        <div class="forms">
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="mail" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input class="rinput" v-model="email" required type="email" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="title_mess4">
                            Votre Genre
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
                    </div>
                    <div>
                        <div class="title_mess4">
                            Ecrivez un truc intéressant sur vous
                        </div>
                        <div class="forms">
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="person" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input v-model="searching" class="rinput" type="text" placeholder="J'aime ..." />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="title_mess4">
                            Votre surnom pour les discussions anonymes
                        </div>
                        <div class="forms">
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="heartHalf" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input v-model="searching_w" class="rinput" type="text"
                                    placeholder="Ex: L'irresistible ou le timide..." />
                            </div>
                        </div>
                    </div>
                    <div class="butt">
                        <button type="submit" class="mbut">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
.forms {
    padding-top: 1vh;
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

.title_mess4 {
    padding-top: 3vh;
    font-size: 3.8vh;
    color: rgb(41, 41, 41);
    font-weight: bold;
}

.body_cont {
    padding: 1rem 1rem;
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

.body_all_ {
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

.header_ {
    padding: 0.8rem 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(49, 49, 49);
}
</style>

<script setup lang="ts" >
import { useUserStore } from "@/global/pinia";
import { IonModal, IonContent, IonIcon, IonRippleEffect } from "@ionic/vue"
import { chevronBackOutline, femaleOutline, mail, maleOutline, personCircle, person, heartHalf } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { user } = userStore

const props = defineProps({
    isOpen: Boolean,
})

const popen = computed(() => {
    return props.isOpen
})
watch(popen, (newp, oldp) => {
    setTimeout(() => {
        email.value = user.value?.email as string
        prenom.value = user.value?.prenom as string
        sex.value = user.value?.sex as string
        if(user.value?.get_des) {
            searching.value = user.value.get_des[0]
            searching_w.value = user.value.get_des[1]
        }
    }, 60);
})

const emits = defineEmits(['close', 'done'])
const close_ = () => {
    emits("close")
}
const prenom = ref('')
const sex = ref('Homme')
const email = ref('')
const searching = ref('')
const searching_w = ref('')

const done = () => {
    emits('done', { email: email.value, prenom: prenom.value, sex: sex.value, searching : [searching.value, searching_w.value] })
}

</script>