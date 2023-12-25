<template >
    <ion-page>
        <ion-content :scroll-y="false">
            <div v-if="!profile" class="global_spinner">
                <div>
                    <ion-spinner color="primary" name="crescent">

                    </ion-spinner>
                </div>
            </div>
            <div v-else class="body_all">
                <button @click="router.back()" class="icorb" style="position: absolute; top: 2vh; left: 2vh;">
                    <ion-icon :icon="close" style="font-size: 1.3rem;" />
                </button>
                <n-carousel
                    style="height: 100%; flex-grow: 1; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;">
                    <div v-for="img in imgs" :key="img.id" :style="{
                        backgroundImage: `url('${img.get_picture}')`
                    }" class="cimg">
                        <div class="wrapper_card">
                            <div class="indica"></div>
                        </div>
                    </div>
                </n-carousel>
                <div class="botbut">
                    <button @click="store_match({ pk: profile.id, action: 'dislike' })" class="icor_x bounce anim"
                        id="close_but" style="margin-right: 5vw;">
                        <ion-icon :icon="close"
                            style="font-size: 4vh; position: relative; top: 0.05rem; font-weight: bold;" />
                    </button>
                    <button v-if="!from_notif" @click="store_match({ pk: profile.id, action: 'chat_with' })"
                        class="icor_xc bounce anim" id="close_but">
                        <ion-icon :icon="chatbox"
                            style="font-size: 3vh; position: relative; top: 0.125rem; font-weight: bold; right: 0.1vh;" />
                    </button>
                    <button @click="store_match({ pk: profile.id, action: 'love' })" class="icor bounce anim" id="love_but">
                        <ion-icon :icon="heart" style="font-size: 3vh; position: relative; top: 0.05rem;" />
                    </button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.icor_xc:active {
    transform: scale(1.2);
}

.icor_xc {
    top: 2vh;
    left: 2vh;
    height: 6vh;
    width: 6vh;
    border-radius: 100%;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #7759ff;
    margin-right: 0.6rem;
    color: white;
}

.global_spinner {
    padding-top: 46vh;
    display: flex;
    justify-content: space-around;
}

.text_icc {
    position: absolute;
    top: calc(40% + 11vh);
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
    position: absolute;
    top: 40% !important;
    left: 50% !important;
    margin-left: -4.5vh;
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
    height: 35px;
    z-index: 522;
    width: 35px;
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

.wrapper_card {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 90%, rgba(0, 0, 0, 0.89));
    position: relative;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
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
    padding: 5vh 2vh;
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
import { Photo, Profil } from "@/global/types";
import { access_tok, showLoading, store_obj, room_slug } from "@/global/utils";
import { IonPage, IonContent, IonSpinner, onIonViewDidEnter } from "@ionic/vue"
import axios from "axios";
import { add, chatbox, chatbubbles, close, closeCircle, heart, person, refresh, refreshCircle, reload, settings, trash } from "ionicons/icons";
import { NCarousel } from "naive-ui"
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/global/pinia"
import { storeToRefs } from "pinia";
import { StatusBar } from "@capacitor/status-bar"

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { force_room } = userStore_
const { matches, rooms, user } = userStore

const profile = ref<Profil>()
const imgs = computed(() => {
    if (!profile.value) return []
    return profile.value.photos
})
const router = useRouter()

const get_profile = async (id: number) => {
    const resp = await axios.get(`api/get_profile/${id}`, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if (resp.data['done']) {
        profile.value = resp.data['result']
    }
}
const route = useRoute()
const store_match = (action: { pk: number, action: 'love' | 'dislike' | 'chat_with' }) => {
    if (from_notif.value) {
        if (action.action == 'love') {

            return open_new_match(action.pk)
        }
        else return router.back()
    }
    localStorage.setItem('action', JSON.stringify(action))
    router.back()
}

const open_new_match = async (id: number) => {
    const room = rooms.value.filter(e => e.slug == room_slug(user.value?.id as number, id as number))[0]
    if (room) router.push(`/room/${room.slug}`)
    else {
        matches.value.push(id)
        setTimeout(() => {
            force_room()
        }, 10)
    }
}

const from_notif = ref(false)
onIonViewDidEnter(() => {
    const my_id = parseInt(route.params['id'] as string)
    get_profile(my_id)

    if (localStorage.getItem('notif:id:' + my_id)) {
        from_notif.value = true
        localStorage.removeItem('notif:id:' + my_id)
    }

    const set_bar = () => {
        StatusBar.setBackgroundColor({ color: "#fb4073" })
    }

    set_bar()
})



</script>