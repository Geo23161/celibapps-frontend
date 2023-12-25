<template >
    <ion-page>
        <ion-content>
            <div class="body">
                <div class="sbody">
                    <div class="header" :class="{ around : !can_back, between : can_back }" >
                        <div v-if="can_back" class="menu" @click="$router.back()">
                            <ion-icon :icon="close" />
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 1.1rem">
                                <ion-icon :icon="person"
                                    style="position: relative; top: .3vh; color: #ff5959; font-size: 2.5vh; "></ion-icon>
                                Invitez des amis
                            </div>
                        </div>
                    </div>
                    <div class="mbody">
                        <div class="mtitle">
                            Plus d'utilisateur, c'est encore plus de rencontres
                        </div>

                        <div style="display: flex; justify-content: space-around; padding-top: 3vh;">
                            <img :src="'../../imgs/fun.svg'" style="width: 60vw;" />
                        </div>
                        <div style="padding-top: 3vh; text-align: center; font-size: 2vh;">
                            Ca ne fait que commencer. Aidez la communauté a s'agrandir pour des rencontres plus magiques 💑
                        </div>
                        <div  style="padding-top: 3vh;">
                            <button @click="lauch_share()" class="butto upload">
                               <ion-icon :icon="shareSocial" style="position: relative; top: .2vh;" /> Partager maintenant
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
  .butto:active {
    box-shadow: none;
  }
  
  .upload {
    background: #fb4073;
    color: white;
    box-shadow: 0 10px 15px -3px #fb407398, 0 4px 6px -2px #17a74929;
  }
  
  .butto {
    width: 100%;
    padding: 1.5vh;
    font-size: 2.1vh;
    font-weight: 600;
    border-radius: 15px;
    margin-top: 0.8rem;
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
    padding-top: 10vh;
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

.between {
    justify-content: space-between;
}

.around {
    justify-content: space-around;
}

.header {
    padding-bottom: 0.8rem;
    display: flex;
    align-items: center;
}

.sbody {
    padding-left: 2vh;
    padding-right: 2vh;
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
import { ref } from "vue"
import { access_tok, showLoading, show_alert, store_obj } from "@/global/utils";
import { IonPage, IonContent, IonIcon } from "@ionic/vue"
import axios from "axios";
import { checkbox, close, person, shareSocial } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Share } from "@capacitor/share"

const router = useRouter()
const shareObj = ref()

const get_pdetails = async () => {
    const loading = await showLoading('Patientez...')
    try {
        const resp = await axios.get('api/get_pdetails/share_comp/')
    if(resp.data['done']) {
        shareObj.value = resp.data['result']
    }
    } catch(e) {
        router.back()
    }
    loading.dismiss()
}
get_pdetails()
const can_back = ref(false)

const lauch_share = async () => {
    await store_obj('has_invited', "yes")
    can_back.value = true
    if(shareObj.value) await Share.share(shareObj.value)
}


</script>