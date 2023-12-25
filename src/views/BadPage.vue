<template >
    <ion-page>
        <ion-content>
            <div class="body">
                <div class="sbody">
                    <div class="header">
                        <div>
                            <div style="font-weight: bold; font-size: 1.1rem">
                                <ion-icon :icon="person" style="position: relative; top: .3vh; color: red; font-size: 2.5vh; " ></ion-icon> Mauvais Profil
                            </div>
                        </div>
                    </div>
                    <div class="mbody">
                        <div class="mtitle">
                            Veuillez choisir une meilleure photo de profil
                        </div>
                        <div class="img_c">
                            <div :style="{
                                'background-size': 'cover',
                                'background-position': 'top center',
                                'background-image': `url('${f_url(user?.get_profil.get_picture as string)}')`,
                            }" class="photo_p"></div>
                        </div>
                        <div class="ico_c">
                            <button class="mbt secoo">
                                <ion-icon :icon="close" />
                            </button>
                        </div>
                        <div class="">
                            <button @click="click_id('myfilei')" class="mbuto pbut">
                                <ion-icon :icon="checkbox"
                                    style="font-size: 3vh; color: white; position: relative; top: 0.2vh;" />
                                Changer
                            </button>
                        </div>
                    </div>
                </div>
                <div style="display: none;">
                    <input type="file" accept="image/*" id="myfilei"
                        @change="e => set_profil((e.target as any).files[0])" />
                </div>
            </div>

        </ion-content>
    </ion-page>
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
    font-size: 1rem;
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
    justify-content: space-around;
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

<script lang="ts" setup >
import { useUserStore } from "@/global/pinia";
import { access_tok, showLoading, show_alert } from "@/global/utils";
import { IonPage, IonContent, IonIcon } from "@ionic/vue"
import axios from "axios";
import { checkbox, close, person } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter()

const set_profil = async (file: File) => {
    const loading = await showLoading('Changement...')
    const form = new FormData()
    form.append('file', file)
    try {
        const resp = await axios.post('api/replace_profil/', form, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, loading)}`,
                "Content-Type": "multipart/form-data"
            }
        })
        if (resp.data["done"]) {
            user.value = resp.data['result']
            router.back()
        }
    } catch (e) {
        console.error(e)
        show_alert('Erreur inattendue', "Une erreur est survenue lors de la mise à jour de votre profil, veuillez réessayer.")
    }

    loading.dismiss()
}

const click_id = (id: string) => {
    document.getElementById(id)?.click()
}
const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { f_url } = userStore_
const { user } = userStore

</script>