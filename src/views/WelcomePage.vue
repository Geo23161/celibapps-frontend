<template >
    <ion-page>
        <ion-content>
            <div class="body_all" :style="{
                'background-size': 'cover',
                'background-position': 'top center',
                'background-image': `url('../../imgs/back.jpg')`,
            }">
                <div class="wrapper">
                    <div class="logoo">
                        Celibapps
                    </div>
                    <div class="text_w" >
                        Faites des rencontres inoubliables
                    </div>
                    <div class="des_w" >
                        Découvrez les célibataires de votre zone, Chattez, flirtez et amusez-vous.
                    </div>
                    <div class="butts" >
                        <button @click="router.push('/register')" class="mybut" >
                            Créer un compte
                        </button>
                        <button @click="router.push('/login')" class="default_but" >
                            Se Connecter
                        </button>
                    </div>
                    <div class="terms" @click="open_norm_lnk(base_url + 'terms/')" >
                        Termes et conditions
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.terms:active{
    color: #fb4073;
}
.terms{
    padding-top: 3vh;
    text-align: center;
    font-size: 2.2vh;
    font-weight: bolder;
    color: white;
}
.default_but:active{
    background-color: rgb(218, 218, 218);
}
.default_but{
    width: 100%;
    padding: 2.5vh;
    text-align: center;
    font-size: 2.3vh;
    border-radius: 25px;
    font-weight: bold;
}
.mybut:active{
    background-color: #f07a99;
}
.mybut{
    width: 100%;
    padding: 2.5vh;
    text-align: center;
    font-size: 2.3vh;
    border-radius: 25px;
    color: white;
    background-color: #fb4073;
    font-weight: bold;
    margin-bottom: 1rem;
}
.butts{
    padding-top: 1.6rem;
}
.des_w{
    color: rgb(236, 236, 236);
    font-size: 2.25vh;
    padding-top: 1rem;
    font-weight: 600;
}
.text_w{
    font-size: 4vh;
    font-weight: bolder;
    padding-top: 0.8rem;
    color: white;
}
.logoo {
    font-size: 4vh;
    color: #fb4073;
    font-weight: bold;
}

.wrapper {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.151), rgba(255, 255, 255, 0.021), rgba(255, 255, 255, 0.199));
    padding-top: 37vh;
    padding-right: 2rem;
    padding-left: 2rem;
}

.body_all {
    width: 100%;
    height: 100%;
    font-family: 'PT Serif', serif;
}
</style>

<script setup lang="ts" >
import { IonPage, IonContent } from "@ionic/vue"
import { ref } from "vue";
import { useRouter } from "vue-router";

const base_url = ref("https://celibapps.statusmax.site/")
const router = useRouter()

const open_norm_lnk = (lnk: string) => {
  window.location.href = lnk;
};

</script>
