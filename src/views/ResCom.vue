<template >
    <ion-page>
        <ion-content :scroll-y="false" >
            <div class="com_body">
                <div class="real_body">
                    <div style="display: flex; justify-content: space-around; padding-top: 2vh; padding-bottom: 2vh;">
                        <img style="width: 7vh; border-radius: 10px;" :src="'../../imgs/foreground.png'" />
                    </div>
                    <div>
                        <div class="post">
                            <div>
                                <div class="imgtop" :style="{
                                    backgroundImage: `url('../../imgs/test3.jpg')`,
                                }">
                                    <div
                                        style="width: 100%; height: 100%; border-radius: 100%; background-color: transparent; backdrop-filter: blur(8px);">

                                    </div>
                                </div>
                            </div>
                            <div class="p_body">
                                <div class="p_header">
                                    <div style="flex-grow: 1;">
                                        <div
                                            style="font-weight: bolder; color: #fc1955; font-size: 2.2vh; padding-bottom: 0vh;">
                                            Alice
                                        </div>
                                        <div style=" color: rgb(107, 107, 107); font-size: 1.5vh;">
                                            depuis 2 ans
                                        </div>
                                    </div>
                                    <button class="p_menu">
                                        <ion-icon :icon="ellipsisVerticalOutline" style="color: white; font-size: 6vw;" />
                                    </button>
                                </div>
                                <div class="p_text">
                                    {{ get_text("Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolorum, fuga quam eum impedit enim quibusdam iste quae unde consectetur, ea quaerat commodi ex possimus velit nisi, quidem non fugit.") }} <span
                                        v-if="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolorum, fuga quam eum impedit enim quibusdam iste quae unde consectetur, ea quaerat commodi ex possimus velit nisi, quidem non fugit.'.length > 100"
                                        style="font-weight: bold; color: #fc1955;"
                                        @click="court.includes(1) ? (court = court.filter(e => e != 1)) : court.push(1)">Voir
                                        {{ court.includes(1) ? 'moins' : 'plus' }}</span>
                                </div>
                                <div class="p_interac">
                                    <button class="pp_icon">
                                        <ion-icon :icon="heartOutline" style="font-size: 5vw;" /> <span
                                            style="font-size: 3vw; position: relative; bottom: 1.5vw;">1</span>
                                    </button>
                                    <button class="pp_icon">
                                        <ion-icon :icon="chatboxOutline" style="font-size: 5vw;" /> <span
                                            style="font-size: 3vw; position: relative; bottom: 1.5vw;">1</span>
                                    </button>
                                    <div style="font-size: 1.8vh; font-weight: bold; color: white;">
                                        2 jours
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 2vh 1.5vh; align-items: center;">
                        <button class="retou">
                            <ion-icon :icon="arrowBack" />
                        </button>
                        <div style="font-size: 2.4vh; color: white; font-weight: bold; ">
                            Commentaires
                        </div>
                    </div>
                    <div v-show="false" style="overflow: scroll; position: relative; flex-grow: 1;">
                        <div  class="post">
                            <div>
                                <div class="imgtop" :style="{
                                    backgroundImage: `url('../../imgs/test3.jpg')`,
                                }">
                                    <div
                                        style="width: 100%; height: 100%; border-radius: 100%; background-color: transparent; backdrop-filter: blur(8px);">

                                    </div>
                                </div>
                            </div>
                            <div class="p_body">
                                <div class="p_header">
                                    <div style="flex-grow: 1;">
                                        <div
                                            style="font-weight: bolder; color: #fc1955; font-size: 2.2vh; padding-bottom: 0vh;">
                                            Alice
                                        </div>
                                        <div style=" color: rgb(107, 107, 107); font-size: 1.5vh;">
                                            depuis 2 ans
                                        </div>
                                    </div>
                                    <button class="p_menu">
                                        <ion-icon :icon="ellipsisVerticalOutline" style="color: white; font-size: 6vw;" />
                                    </button>
                                </div>
                                <div class="p_text">
                                    <div>
                                        {{ get_text("Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolorum.") }} <span
                                            v-if="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolorum.'.length > 100"
                                            style="font-weight: bold; color: #fc1955;"
                                            @click="court.includes(1) ? (court = court.filter(e => e != 1)) : court.push(1)">Voir
                                            {{ court.includes(1) ? 'moins' : 'plus' }}</span>
                                    </div>
                                    <div class="h_txt ">
                                        <img class="imgfull" :src="'../../imgs/tt.jpg'" />
                                    </div>
                                </div>
                                <div class="p_interac">
                                    <button class="pp_icon">
                                        <ion-icon :icon="heart" style="font-size: 5vw;" /> <span
                                            style="font-size: 3vw; position: relative; bottom: 1.5vw;">1</span>
                                    </button>
                                    <button class="pp_icon">
                                        <ion-icon :icon="chatboxOutline" style="font-size: 5vw;" /> <span
                                            style="font-size: 3vw; position: relative; bottom: 1.5vw;">1</span>
                                    </button>
                                    <div style="font-size: 1.8vh; font-weight: bold; color: white;">
                                        2 jours
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button @click="is_writing = true" class="w_button">
                            <ion-icon :icon="pencil" style="font-size: 3vh;" />
                        </button>
                    </div>
                    <div style="overflow: scroll; position: relative; flex-grow: 1;">
                        <div >
                        <div style="display: flex; justify-content: space-around; padding-top: 21.24vw;">
                            <img :src="'../../imgs/noti.svg'" style="width: 50vw;" />
                        </div>
                        <div style="text-align: center;padding-top: 1.77vw; font-size: 4.425vw; color: white;">
                            Aucune commentaire trouvé
                        </div>
                        <button @click="is_writing = true" class="w_button">
                            <ion-icon :icon="pencil" style="font-size: 3vh;" />
                        </button>
                    </div>
                    </div>
                </div>
                <div class="add_post" :class="{ hide_adding: !is_writing }">
                    <div class="r_post">
                        <div class="title_h">
                            <div style="font-size: 2.3vh; ">
                                Dire quelque chose
                            </div>
                            <button class="close_as">
                                <ion-icon :icon="close" style="color: white; font-size: 3vh;" />
                            </button>
                        </div>
                        <div class="my__in editable-div" contenteditable="true" data-placeholder="Ecrivez ici...">

                        </div>
                        <div class="img_as">
                            <div style="font-size: 2.2vh; color: white; font-weight: bold;">
                                Ajouter une image<br>
                            </div>
                            <button class="imgg_a">
                                <ion-icon :icon="add" style="font-size: 10vw; color: white;" />
                            </button>
                        </div>
                        <button class="send_aa is_norm">
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.retou:active {
    background-color: rgb(58, 58, 58);
}

.retou {
    width: 12vw;
    display: block;
    height: 12vw;
    border-radius: 100%;
    font-size: 7vw;
    color: white;
    background-color: transparent;
}

.hide_adding {
    transform: translateY(80vh);
}

.is_norm {
    background-color: rgb(34, 34, 34);
}

.is_up {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
}

.send_aa {
    display: block;
    width: 100%;
    padding: 1.8vh;
    border-radius: 15px;
    font-size: 2.2vh;
    font-weight: bold;
    margin-top: 2vh;
    color: white;
}

.imgg_a:active {
    background-color: rgb(41, 41, 41);
}

.imgg_a {
    width: 25vw;
    height: 25vw;
    background-color: rgb(34, 34, 34);
    border-radius: 15px;

}

.img_as {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.6vh;
}

*:focus {
    outline: none;
}

.editable-div:empty:before {
    content: attr(data-placeholder);
    color: #aaa;
    position: absolute;
    top: 2vh;
    left: 2vh;
    pointer-events: none;
    font-size: 2.2vh;
}

.my__in {
    width: 100%;
    flex-grow: 1;
    border-radius: 15px;
    background-color: rgb(34, 34, 34);
    margin-top: .6vh;
    min-height: 50px;
    position: relative;
    padding: 2vh 2vh;
    font-size: 2.2vh;
    overflow: scroll;
}

.close_as:active {
    background-color: rgb(29, 29, 29);
}

.close_as {
    width: 5vh;
    height: 5vh;
    border-radius: 100%;
    background-color: transparent;
}

.title_h {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.r_post {
    width: 90vw;
    height: 60vh;
    border-radius: 20px;
    background-color: rgb(48, 48, 48);
    padding: 1.5vh 2vh;
    color: white;
    display: flex;
    flex-direction: column;

}

.add_post {
    position: absolute;
    bottom: 0vh;
    width: 100%;
    height: 70vh;
    padding-left: 5vw;
    transition: all 1s ease-in-out;
}

.w_button {
    position: fixed;
    bottom: 6vh;
    right: 3vh;
    width: 6.8vh;
    height: 6.8vh;
    border-radius: 100%;
    background-color: white;
    box-shadow: 0 10px 15px -3px #fffffff5, 0 4px 6px -2px #17a74929;
    color: rgb(58, 58, 58);
}

.imgfull {
    border-radius: 15px;
    width: 100%;
}

.h_txt {
    padding-top: 1vh;
}

.pp_icon {
    border-radius: 10px;
    width: 12.5vw;
    height: 8vw;
    color: white;
    background-color: transparent;
}

.p_interac {
    padding: 0.8vh 1.2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0vh !important;
    padding-top: 1vh !important;
}

.p_text {
    padding-top: .8vh;
    font-size: 2vh;
    color: white;
}

.p_menu:active {
    background-color: rgb(58, 58, 58);
}

.p_menu {
    width: 8vw;
    height: 11vw;
    border-radius: 10px;
    display: block;
    background-color: transparent;
}

.p_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.4vh;
}

.p_body {
    flex-grow: 1;
}

.imgtop {
    width: 12vw;
    height: 12vw;
    min-width: 12vw;
    min-height: 12vw;
    border-radius: 100%;
    background-size: cover;
    background-position: top center;
    margin-right: 1.5vh;
    position: relative;
}

.post {
    padding: 2vh 2vh;
    display: flex;
    width: 100%;
    border-bottom-color: rgb(59, 59, 59);
    border-bottom-width: 2px;
    border-bottom-style: solid;
}

.real_body {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    min-height: 0%;
    display: flex;
    flex-direction: column;
}

.com_body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgb(29, 29, 29);
    font-family: 'Poppins';

}</style>

<script setup lang="ts" >
import { useUserStore } from "@/global/pinia";
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonIcon } from "@ionic/vue"
import { albums, chatbox, chatboxOutline, ellipseOutline, ellipsisVertical, ellipsisVerticalOutline, heartHalf, heartOutline, newspaper, settings, shareSocial, shareSocialOutline, heart, paperPlane, brush, pencil, close, add, arrowBack } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router"

const router = useRouter()

const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)
const { user, has_new, has_new_notifs } = userStore

const counter = ref(0)
setInterval(() => {
    counter.value++;
}, 800)

const section = ref('all')
const court = ref<number[]>([])

const get_text = (text: string) => {
    return text.length <= 100 ? text : (court.value.includes(1) ? text + " " : text.slice(0, 101) + '...')
}

const is_writing = ref(false)

</script>