<template >
    <ion-page>
        <div style="overflow-y: hidden; height: 100%;">
            <div class="body_all">
                <button v-show="false" @click="router.push('/notifs')" class="icorb" :class="{
                    norms : has_new_notifs && counter % 2
                }" style="position: absolute; top: 2.9vh; left: 2vh;">
                    <ion-icon :icon="notifications" style="font-size: 1.3rem;" />
                </button>
                <n-carousel id="caro" :default-index="defaultInd" :current-index="curInd"
                    style="height: 100%; flex-grow: 1; ">
                    <div v-for="img in imgs" :key="img.id" :style="{
                        backgroundImage: `url('${img.get_picture}')`
                    }" class="cimg">

                        <div class="wrapper_carrd">
                            <div class="indica">
                                
                                <div>
                                    <button
                                        @click="show_warn('Confirmation requise', 'Êtes-vous sûre de vouloir supprimer cette photo?', 'Oui', delete_img, img.id)"
                                        v-if="!img.is_profil" class="mybb" style="margin-right: 0.6rem;">
                                        <ion-icon :icon="trash" style="font-size: 1.2rem;" /> <span
                                            style="position: relative; bottom: 0.5vh;">Supprimer</span>
                                    </button>
                                    <button
                                        @click="show_warn('Confirmation', 'Voulez-vous vraiment remplacer votre photo de profil', 'Oui', click_id, 'myfilei')"
                                        v-else class="mybb" style="margin-right: 0.6rem;">
                                        <ion-icon :icon="reload" style="font-size: 3vh;" /> <span
                                            style="position: relative; bottom: 0.7vh;">Remplacer</span>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        @click="click_id('myfilein')"
                                        class="mybb" style="margin-right: 0.6rem;">
                                        <ion-icon :icon="add" style="font-size: 1.2rem;" /> <span
                                            style="position: relative; bottom: 0.5vh;">Ajouter</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="false" class="cimg add_pic">

                        <div class="somm">
                            <div style="display: flex; justify-content: space-around; z-index: 1000;">
                                <div id="mybbu" class="icor bounce anim add_b">
                                    <ion-icon :icon="add"
                                        style="font-size: 5vh; position: relative; top: 2vh; left: 1.8vh;" />
                                </div>
                            </div>
                            <div class="text_icc">
                                Appuyez pour ajouter une nouvelle photo
                            </div>
                        </div>
                    </div>
                </n-carousel>

                <div v-if="false" class="botbut">

                    <button @click="router.push('/param')" class="icor_x bounce anim" id="close_but"
                        style="margin-right: 5vw;">
                        <ion-icon :icon="settings"
                            style="font-size: 4vh; position: relative; top: 0.05rem; font-weight: bold;" />
                    </button>
                    <button @click="router.push('/chat')" class="icor bounce anim" id="love_but">
                        <ion-icon :icon="chatbubbles" style="font-size: 3vh; position: relative; top: 0.05rem;" />
                    </button>
                    <button @click="click_id('myfilein')" class="icorp bounce anim" style="margin-left: 5vw;">
                        <ion-icon :icon="camera" style="font-size: 3vh; position: relative; top: 0.05rem;" />
                    </button>
                </div>
                <div class="tabmenu" style="background-color: rgba(39, 39, 39) !important; border-radius: 0px !important;">
                    <div class="tabm">
                        <button @click="router.push('/tabs/home')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="albums" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button v-if="has_new" class="alert_b alert_colo" >

                        </button>
                        <button @click="router.push('/tabs/chat')" class="tabbut seco"
                            :class="{ accused: has_new || (counter % 2 && has_new_notifs) }">
                            <ion-icon style="font-size: 2.2vh;" :icon="chatbox" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/lov')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="heartHalf" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/mon_profil')" class="tabbut tabhome">
                            <ion-icon style="font-size: 2.2vh;" :icon="person" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/param')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="settings" />
                        </button>
                    </div>
                </div>
            </div>
            <div style="display: none;">
                <input type="file" accept="image/*" id="myfilein" @change="e => submit_img((e.target as any).files[0])" />
                <input type="file" accept="image/*" id="myfilei" @change="e => set_profil((e.target as any).files[0])" />
            </div>
        </div>
    </ion-page>
</template>

<style scoped >
.norms {
    background-color: rgb(37, 37, 37) !important;
    color: white !important;
}
.secoo:active {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.507) 10%, transparent);
}

.secoo {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.103) 10%, transparent);
    background-color: rgba(114, 114, 114);
    color: white;
}

.text_icc {
    text-align: center;
    width: 100%;
    color: white;
    padding-left: 2vh;
    padding-right: 2vh;
    font-size: 2.7vh;

}

.add_b {
    width: 9vh !important;
    height: 9vh !important;
}

.add_pic {
    background-color: rgb(37, 37, 37);
    position: relative;
}

.icorb:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.651), transparent);
    background-color: #fb4073;
}

.icorb {
    height: 5vh;
    z-index: 522;
    width: 5vh;
    border-radius: 100%;
    color: white;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.459), transparent);
    background-color: #fb4073;
}

.mybb {
    padding-top: 1vh;
    padding-bottom: 1vh;
    padding-left: 1.5vh;
    padding-right: 1.5vh;
    font-size: 2vh;
    font-family: 'PT Serif', serif;
    border-radius: 15px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.247), transparent);
    background-color: #fc1955;
    color: white;
    font-weight: bolder;
}

.indi {
    width: 1vh;
    height: 1vh;
    background-color: white;
    border-radius: 100%;
}

.indic {
    padding: 0.4vh 1.3vh;
    border-radius: 7px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20vw;
    background-color: rgba(20, 20, 20, 0.349);
}

.indica {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3vh 1.6vh;

}

.name_of {
    position: absolute;
    bottom: 2vh;
    left: 3vh;
    font-size: 5vh;
    font-weight: bolder;
    color: white;
}

.wrapper_carrd {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 90%, rgba(39, 39, 39));
    position: relative;
}

.animate {
    transition: all 0.5s ease-in-out;
}

.bounce:active {

    transform: scale(1.2);
}

.bounce {
    transition: all 0.25s ease-in-out;
}

.icor_x {
    top: 2vh;
    left: 2vh;
    height: 7vh;
    width: 7vh;
    border-radius: 100%;
    color: #ffffff;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: rgb(37, 37, 37);
    margin-right: 0.6rem;
}

.icorp {
    top: 2vh;
    left: 2vh;
    height: 7vh;
    width: 7vh;
    border-radius: 100%;
    color: white;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #6819fc;
}

.icor {
    top: 2vh;
    left: 2vh;
    height: 7vh;
    width: 7vh;
    border-radius: 100%;
    color: white;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
}

.botbut {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5vh 2vh;
}

.cimg {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: top center;
}

.body_all {
    width: 100%;
    height: 100%;
    font-family: 'PT Serif', serif;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
</style>

<script setup lang="ts">
import { useUserStore } from "@/global/pinia";
import { Photo } from "@/global/types";
import { access_tok, showLoading, show_alert, show_warn } from "@/global/utils";
import { IonPage, IonContent, onIonViewDidEnter, IonIcon } from "@ionic/vue"
import axios from "axios";
import { add, albums, camera, chatbox, chatbubbles, close, closeCircle, heart, heartHalf, notifications, person, refresh, refreshCircle, reload, settings, trash } from "ionicons/icons";
import { NCarousel } from "naive-ui"
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { StatusBar } from "@capacitor/status-bar"

const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)
const defaultInd = ref(0)
const curInd = ref()
const { user, has_new, has_new_notifs } = userStore
const router = useRouter()
const new_photo = ref<Photo>()
watch(new_photo, (newp, oldp) => {
    if (newp && user.value) {
        user.value.photos.push(newp);
        curInd.value = set_defInd(newp.id)
        setTimeout(() => {
            curInd.value = undefined
        }, 500)
    }
}, { deep: true })

const counter = ref(0)
setInterval(() => {
    counter.value++;
}, 800)

const imgs = computed(() => {
    if (!user.value) return [] as Photo[]
    return user.value.photos
})
const set_defInd = (pk: number) => {
    let i = 0, cpt = 0;
    imgs.value.forEach(element => {
        if (element.id == pk) cpt = i;
        i++;
    });
    return cpt;
}

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
        if (resp.data["done"]) user.value = resp.data['result']
    } catch (e) {
        console.error(e)
        show_alert('Erreur inattendue', "Une erreur est survenue lors de la mise à jour de votre profil, veuillez réessayer.")
    }

    loading.dismiss()
}

const submit_img = async (file: File) => {
    const loading = await showLoading("Ajout...")
    const form = new FormData()
    form.append('file', file)
    try {
        const resp = await axios.post('api/submit_img/', form, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${await access_tok(router, undefined)}`
            }
        })
        loading.dismiss()
        if (resp.data['done']) {
            new_photo.value = resp.data['result']['obj']
        }
    } catch (e) {
        loading.dismiss()
        show_alert("Impossible de continuer", "Une erreur est survenue, Veuillez réessayez.")
    }

}

const delete_img = async (id: number) => {
    const load = await showLoading('Suppression...')
    try {
        const resp = await axios.post('api/delete_img/', {
            pk: id
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`,
            }
        })
        if (resp.data['done']) {
            if (user.value) user.value.photos = user.value.photos.filter(e => e.id != id)

        }
    } catch (e) {
        console.error(e)
        show_alert('Impossible de supprimer', "Une erreur est survenue lors de la suppression de votre photo, veuillez réessayer.")
    }
    load.dismiss()
}
const route = useRoute()

const click_id = (id: string) => {
    document.getElementById(id)?.click()
}

onIonViewDidEnter(() => {
    setTimeout(() => {
        const focus = route.query['focus']
        if (focus == 'add') {
            defaultInd.value = imgs.value.length
        } else {
            const pk = parseInt(focus as string)
            curInd.value = set_defInd(pk)
            setTimeout(() => {
                curInd.value = undefined
            }, 500)
        }
    }, 500)

    const set_bar = () => {
        StatusBar.setBackgroundColor({ color: "#fb4073" })
    }

    set_bar()
})
</script>
