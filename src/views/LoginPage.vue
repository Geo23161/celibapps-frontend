<template >
    <ion-page>
        <ion-content>
            <div class="body_all_lo">
                <div class="header">
                    <div @click="router.back()" class="ico_c ripple_parent ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="chevronBackOutline"
                            style="font-size: 4vh; position: relative; top: 0.3rem; right: 0.15rem;"></ion-icon>
                    </div>
                </div>
                <div class="body_cont">
                    <div class="title">
                        Celibapps
                    </div>
                    <div class="title_mess">
                        Connectez-vous à votre compte
                    </div>
                    <form @submit.prevent="connect()">
                        <div class="forms">
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="mail" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input required v-model="email" type="email" class="rinput" placeholder="Email" />
                            </div>
                            <div class="minput">
                                <div class="icon_f">
                                    <ion-icon :icon="lockClosed" style="position: relative; top: 0.05rem;" />
                                </div>
                                <input required v-model="password" class="rinput" :type="typ" placeholder="Mot de passe" />
                                <div class="ic_p" @click="typ = (typ == 'password' ? 'text' : 'password')">
                                    <ion-icon v-if="typ == 'password'" :icon="eye"
                                        style="position: relative; top: 0.05rem;" />
                                    <ion-icon v-else :icon="eyeOff" style="position: relative; top: 0.05rem;" />
                                </div>
                            </div>
                        </div>
                        <div class="butt">
                            <button type="submit" class="mbut">
                                Connexion
                            </button>
                        </div>
                    </form>
                    <div class="already">
                        Nouveau sur Celibapps? <a class="ancre" @click="router.push('/register')">S'Inscrire</a>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
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
    background-color: #f8688e;
}

.mbut {
    padding: 0.7rem;
    font-size: 2.5vh;
    text-align: center;
    width: 100%;
    border-radius: 25px;
    background-image: linear-gradient(to right, #fb4073, #f8688e);
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
    border-bottom-color: rgb(43, 43, 43);
    border-bottom-style: solid;
}

.forms {
    padding-top: 4vh;
}

.title_mess {
    padding-top: 0.8rem;
    font-size: 4.3vh;
    color: rgb(41, 41, 41);
    font-weight: bold;
}

.title {
    padding-top: 10vh;
    font-size: 3vh;
    font-weight: bold;
    color: #fb4073;
}

.body_cont {
    padding: 1rem 1.6rem;
}

.title {}

.body_all_lo {
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
import { IonPage, IonContent, IonIcon, IonRippleEffect, alertController, onIonViewDidEnter } from "@ionic/vue"
import { useRouter } from "vue-router"
import { ref, watch } from "vue"
import { caretBack, caretBackOutline, chevronBackOutline, eye, eyeOff, lockClosed, mail } from "ionicons/icons";
import { showLoading, show_alert, store_obj, get_obj, access_tok, format_all } from "@/global/utils";
import axios from "axios";
import { StatusBar } from "@capacitor/status-bar";

const router = useRouter()
const email = ref()
const password = ref()
const typ = ref('password')
const user = ref()
const is_good = ref(false)
const data = ref()
const idents = ref<{
    email : string,
    password : string
}>()
watch(is_good, (newi, oldi) => {
    setTimeout(() => {
        store_obj('user', JSON.stringify(user.value))
        store_obj("tokens", JSON.stringify(data.value))
        store_obj('ksjfniusfgiunsfjnfsin', JSON.stringify(idents.value))
        router.push('/home')
    }, 20)
})

const show_warn = async (title: string, mess: string, oktext: string, handle: (param: any) => any, param: any) => {
    const alert = await alertController.create({
        header: title,
        message: mess,
        buttons: [
            {
                text: 'Non',
                role: 'cancel',
            },
            {
                text: oktext,
                role: 'confirm',
                handler: () => {
                    handle(param)
                    is_good.value = true
                },
            },
        ],
    });

    await alert.present();
};

const verify_same = async () => {

    const set_new_login = async () => {
        await format_all()
        is_good.value = true
    }

    const resp = await axios.get('api/get_user/', {
        headers: {
            Authorization: `Bearer ${data.value.access}`
        }
    })
    if (resp.data['done']) {
        user.value = resp.data['result']
        let old_user = await get_obj('user')
        if (old_user) {
            old_user = JSON.parse(old_user)
            if (old_user.id != user.value.id) {
                return await show_warn('Double utilisateur', 'Un autre utilisateur est enregistré sur cet appareil. En continuant vous ecraserez toutes les données.', 'Continuer', set_new_login, undefined)
            }
        }
        is_good.value = true
        localStorage.setItem('from_login', JSON.stringify(resp.data['result']))
    }
}

const connect = async () => {
    const load = await showLoading('Connexion...')
    try {
        const resp = await axios.post('token/', {
            email: email.value,
            password: password.value
        })
        data.value = resp.data
        idents.value = {
            email: email.value,
            password: password.value
        }
        load.dismiss()
        const lo = await showLoading('Verification...')
        try {

            await verify_same()
            lo.dismiss()
        } catch (e) {
            console.log(e)
            show_alert('', 'Une erreur est survenue lors de votre connexion, veuillez reéssayer.')
            lo.dismiss()
        }
    } catch (e) {
        load.dismiss()
        show_alert('Connexion impossible', "Veuillez vérifier vos identifiants")
    }

}

onIonViewDidEnter(() => {
    const set_bar = () => {
        StatusBar.setBackgroundColor({ color: "#fb4073" })
    }

    set_bar()
})
</script>
