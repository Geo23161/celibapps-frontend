<template >
    <ion-page>
        <ion-content>
            <div v-if="searching" style=" height: 100%; display: flex; flex-direction: column;">
                <div class="logo">
                    <img style="width: 10vh;" :src="'../../imgs/logo.png'" />
                </div>
                <div
                    style=" display: flex; justify-content: center; flex-direction: column; width: 100%; font-family: 'PT Serif', serif; height: 100%;">
                    <div style="display: flex; justify-content: space-around; ">
                        <img style="width: 70vw;" :src="'../../imgs/sea.svg'" />
                    </div>
                    <div style="padding: 2.3vh 3vh; text-align: center; font-size: 2.5vh;">
                        Recherches des célibataires selon vos critères...
                    </div>
                    <div style="display: flex; justify-content: space-around;">
                        <ion-spinner :name="'bubbles'" color="primary"></ion-spinner>
                    </div>
                </div>
            </div>
            <div v-else class="my_bg">
                <div class="header_h">
                    <div class="logo">
                        <img style="width: 10vh;" :src="'../../imgs/logo.png'" />
                    </div>
                    <div class="title">
                        Bienvenue sur Celibapps
                    </div>
                    <div class="subb">
                        Plus qu'une appli de rencontre, un style de vie pour célibataire.
                    </div>

                </div>
                <div class="det_cont">
                    <div style="display: flex; justify-content: space-around;">
                        <img style="width: 50vw;" :src="'../../imgs/enjoy.svg'" />
                    </div>
                    <div>
                        <div class="details_o">
                            <ion-icon :icon="chatbubbles" :color="'primary'"
                                style="position: relative; top: .5vh; font-size: 3.5vh; "></ion-icon> Chattez, Flirtez...
                        </div>
                        <div class="details_o">
                            <ion-icon :icon="happy" :color="'primary'"
                                style="position: relative; top: .5vh; font-size: 3.5vh; "></ion-icon> Amusez-vous a chaque
                            rencontre...
                        </div>
                        <div class="details_o">
                            <ion-icon :icon="heart" :color="'primary'"
                                style="position: relative; top: .5vh; font-size: 3.5vh; "></ion-icon> Jusqu'à ce que l'amour
                            vous tombent
                            dessus...
                        </div>
                    </div>
                </div>
                <div @click="set_search()" class="but__tt">
                    <button class="butt">
                        Commencer
                    </button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.det_cont {
    flex-grow: 1;
    margin-left: -1vh;
    margin-right: -1vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.butt:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.527), transparent);
    background-color: #fc1955;
}

.butt {
    padding: 1.3vh 2vh;
    font-weight: bold;
    width: 100%;
    font-size: 2.4vh;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
    color: white;
    border-radius: 25px;

}

.but__tt {
    padding: 0vh 1vh;
    width: 100%;
}

.details_o {
    padding: 1.6vh 1.5vh;
    font-size: 3.2vh;
    font-weight: bold;

}

.subb {
    text-align: center;
    padding-bottom: 1.5vh;
    padding-top: .4vh;
    font-size: 2vh;
}

.title {
    text-align: center;
    font-size: 2.8vh;
    color: rgb(49, 49, 49);
    font-weight: bolder;
}

.logo {
    display: flex;
    justify-content: space-around;

}

.header_h {
    padding-top: 2vh;
}

.my_bg {
    font-family: 'PT Serif', serif;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 2vh 2.3vh;
    background-color: white;
    color: rgb(49, 49, 49);
}
</style>

<script lang="ts" setup >
import { access_tok, show_alert } from "@/global/utils";
import { IonPage, IonContent, IonIcon, IonSpinner } from "@ionic/vue"
import axios from "axios";
import { aperture, chatbubbles, happy, heart } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const searching = ref(false)

const get_user = async () => {
    try {
        const resp = await axios.get('api/get_user/', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if (resp.data['done']) {
            localStorage.setItem('from_login', JSON.stringify(resp.data['result']))
        }
    }
    catch (e) {
        await show_alert('Erreur imprévue', "Une erreur est survenue lors de l'initialisation.")
    }
}

const set_search = () => {
    searching.value = true
    setTimeout(async () => {
        searching.value = false
        await get_user()
            router.push('/home')
    }, 3500)
}

</script>