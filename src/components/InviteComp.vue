<template >
    <ion-modal :isOpen="isOpen">
        <ion-content>
            <div class="body">
                <div class="sbody">
                    <div class="header">
                        <div class="menu" @click="returned()">
                            <ion-icon :icon="arrowBack" />
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 1.1rem">
                                Vérification
                            </div>
                        </div>
                        <button  @click="close_()" class="sbut" :class="{
                            blac :  !(user?.cur_abn?.verif),
                            pric : user?.cur_abn?.verif
                        }" >
                            {{ user?.cur_abn.verif ? 'Terminer' : 'Ignorer'}}
                        </button>
                    </div>
                    <div class="mbody">
                        <div class="mtitle">
                            Faire vérifier votre profil est important. Pourquoi?
                        </div>
                        <div class="no_img">
                                <img style="width: 30vw" :src="'../../imgs/invit.svg'" />
                            </div>
                        <div style="padding: 0.5vh 0.6vh;">
                            <div class="feats">
                                <ion-icon :icon="checkbox" style="font-size: 2.5vh; position: relative; top: 0.5vh;" :color="'primary'"></ion-icon> Vous obtenez plus de visibilité et de match
                            </div>
                            <div class="feats">
                                <ion-icon :icon="closeCircle" style="font-size: 2.9vh; position: relative; top: 0.6vh;" :color="'primary'"></ion-icon> Sans cela, vous ne pouvez pas écrire aux utilisateurs qui n'ont autorisés que les profiles vérifiés
                            </div>
                        </div>
                        <button @click="done()" class="mbuto pbut " >
                            Verifier mon profil
                        </button>
                    </div>
                </div>

            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
.pbut:active {
    box-shadow: none;
}

.pbut {

    box-shadow: 0 10px 25px -3px #fb407379, 0 4px 6px -2px #f2824129;
}
.mbut:active {
    background-color: #fa84a3;
}

.pric {
    background-color: #fb4073;
}

.mbuto {
    margin-top: 2vh;
    padding-top: 1vh;
    padding-bottom: 1.6vh;
    font-size: 2vh;
    text-align: center;
    width: 100%;
    border-radius: 25px;
    background-image: linear-gradient(to right, #fb4073 90%, #fa84a3);
    color: white;
    font-weight: bold;
}
.blac{
    background-color: rgb(46, 46, 46);
    color: white;
}
.no_img {
    padding-top: 1vh;
    display: flex;
    justify-content: space-around;
}
.feats {
    margin-top: 1vh;
    font-size: 1.8vh;
    padding: 0.8vh 1.2vh;
    background-color: white;
    border-radius: 10px;
}
.prof {
    background: #fb4073;
    color: white;
    box-shadow: 0 10px 15px -3px #fb4073b4, 0 4px 6px -2px #17a74929;
}


.sbut:active {
    box-shadow: none;
}

.sbut {
    padding-right: 0.6rem;
    padding-left: 0.6rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 10px;
    z-index: 100;
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
    background-color: #fc1955;
    color: white;
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
import { useUserStore } from "@/global/pinia";
import { IonModal, IonContent, IonIcon } from "@ionic/vue"
import { arrowBack, arrowForward, checkbox, checkmark, close, closeCircle } from "ionicons/icons";
import { storeToRefs } from "pinia";

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { user } = userStore


const props = defineProps({
    isOpen: Boolean
})
const emit = defineEmits(['close', 'done', 'returned'])
const close_ = () => {
    emit('close')
}

const done = () => {
    emit('done')
}

const returned = () => {
    emit('returned')
}

</script>