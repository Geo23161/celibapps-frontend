<template >
    <ion-page>
        <div style="overflow-y: hidden; height: 100%;">
            <div class="body_all">
                <div class="first_tool">
                    <button @click="$router.push('/notifs')" class="backbut">
                        <ion-icon :class="{ has_no: new_notifs && counter % 2 }" :icon="notifications"
                            style="position: relative; top: .1rem;" />
                    </button>
                    <div class="texthe">
                        <div class="rtext">
                            <span class="hello">
                                Salut,
                            </span>
                            <span class="namee">
                                {{ user?.prenom }}
                            </span>
                        </div>
                        <div class="imgt" :style="{
                            backgroundImage: `url('${f_url(user?.get_profil.get_picture as string)}')`
                        }">

                        </div>
                    </div>
                </div>
                <div class="second_tool">
                    <div class="search_input">
                        <button class="sico">
                            <ion-icon style="position: relative; top: 0.62vw;" :icon="search" />
                        </button>
                        <input v-model="searchw" class="rinp" placeholder="rechercher" />
                    </div>
                </div>
                <div v-if="!is_searching" class="status_cont">
                    <div class="titles">
                        Nouvelles Photos
                    </div>
                    <div v-if="!searching" class="imgs">
                        <div class="img_prof " @click="router.push('/mon_profil')">
                            <div class="imgto" :style="{
                                backgroundImage: `url('${f_url(user?.get_profil.get_picture as string)}')`
                            }">
                                <button class="add_ico">

                                    <ion-icon :icon="addCircle" style="position: relative; top: 0.35vw; right: 0.0716vw;" />
                                </button>
                            </div>
                            <div class="txti">
                                <div class="namee" style="font-weight: bold; font-size: 3.54vw;">
                                    Vous
                                </div>
                                <div class="subna hello">
                                    Ajoutez
                                </div>
                            </div>
                        </div>
                        <div v-for="photo in get_matchp" :key="photo.id" @click="router.push('/profil/' + photo.user.id)"
                            class="img_prof">
                            <div class="imgto " :class="{ borde: photo.new }" :style="{
                                backgroundImage: `url('${f_url(photo.user.get_picture as string)}')`
                            }">
                            </div>
                            <div class="txti">
                                <div class="namee" style="font-weight: bold; font-size: 3.54vw;">
                                    {{ photo.user.prenom }}
                                </div>
                                <div v-if="photo.new" class="subna hello">
                                    {{ photo.new }} ajouté{{ photo.new > 1 ? 's' : '' }}
                                </div>
                                <div v-else class="subna hello">
                                    0 ajouté
                                </div>

                            </div>
                        </div>
                    </div>
                    <div v-else class="imgs">
                        <ion-skeleton-text class="img_prof is_ske" :animated="true">

                        </ion-skeleton-text>
                        <ion-skeleton-text class="img_prof is_ske" :animated="true">

                        </ion-skeleton-text>
                        <ion-skeleton-text class="img_prof is_ske" :animated="true">

                        </ion-skeleton-text>
                        <ion-skeleton-text class="img_prof is_ske" :animated="true">

                        </ion-skeleton-text>
                        <ion-skeleton-text class="img_prof is_ske" :animated="true">

                        </ion-skeleton-text>
                    </div>
                </div>

                <div v-if="!is_searching" class="messages_cont" style="padding-top: 1vh !important;" >
                    <div style="margin-left: -1vh;" >
                        
                        <ion-chip :outline="true" :color=" section == 'match' ? 'primary' : ''" @click="section = 'match'" >
                            <ion-avatar>
                                <img :src="'../../imgs/before.jpg'" />
                            </ion-avatar>
                            <ion-label>Matchs</ion-label>
                        </ion-chip >
                        <ion-chip :outline="true" :color=" section == 'anonym' ? 'primary' : ''" @click="section = 'anonym'" >
                            <ion-avatar>
                                <img 
                                    :src="'../../imgs/mask.webp'" />
                            </ion-avatar>
                            <ion-label>Anonymes</ion-label>
                            <ion-icon v-if="has_nonyms" :icon="notificationsCircle" :color=" (has_nonyms && counter % 2) ? 'primary' : ''" ></ion-icon>
                        </ion-chip>
                    </div>
                    <div v-if="section == 'anonym'">
                        <div v-show="false" class="titles" style="display: flex; align-items: center;">
                            <div>
                                <img :src="'../../imgs/mask.webp'" style="width: 8vw; position: relative; top: 0.25vh; " />
                            </div>
                            <div style=" margin-left: 0.6rem;">Anonymes</div>
                        </div>
                        <div v-for="room in proposed_rooms" :key="room.id"
                            @click=" room.get_anonymous?.has_seen ? router.push('/nroom/' + room.slug) : router.push('/af/' + room.id)"
                            class="profs_i ripple_parent ion-activatable">
                            <ion-ripple-effect></ion-ripple-effect>
                            <div class="imgtop" :style="{
                                backgroundImage: `url('${f_url(get_room_you(room).get_picture)}')`,

                            }">
                                <div
                                    style="width: 100%; height: 100%; border-radius: 100%; background-color: transparent; backdrop-filter: blur(8px);">

                                </div>
                                <button v-if="is_online(toDate(get_room_you(room).last).getTime())" class="online">

                                </button>
                            </div>
                            <div class="prof_bdy">
                                <div class="prof_ti">
                                    <div class="name_ti">
                                        {{ get_room_you(room).get_des[1] }} <button v-if="!is_seen(room.id) && has_done"
                                            class="liitle_new princ">new</button>
                                    </div>
                                    <div class="time_ti" :class="{ is_rose: not_seens(room).length }">
                                        {{ findTime(last_message(room).created_at) }}
                                    </div>
                                </div>
                                <div v-if="room.get_anonymous?.has_seen" class="prof_cp">
                                    <div v-if="last_message(room).text" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        {{ last_message(room).text }}
                                    </div>
                                    <div v-else-if="last_message(room).image" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="image"
                                            style="font-size: 4.45vw; position: relative; top: 0.885vw;"></ion-icon> Photo
                                    </div>
                                    <div v-else-if="last_message(room).video" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="videocam"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon> Video
                                    </div>
                                    <div v-else-if="last_message(room).audio" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="musicalNote"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon> Audio
                                    </div>
                                    <button v-if="last_message(room).step != 'seen' && last_message(room).user != user?.id"
                                        class="new_1">
                                        {{ not_seens(room).length }}
                                    </button>
                                </div>
                                <div v-else-if="get_room_messages(room.slug, 0).length" class="prof_cp">
                                    <div class="text_cp bold">
                                        vous a déjà laissé un message
                                    </div>
                                </div>
                                <div v-else-if="!room.get_anonymous?.has_seen" class="prof_cp">
                                    <div v-if="last_message(room).text" class="text_cp bold">
                                        Lancez vous dans une conversation anonyme avec {{ get_room_you(room).prenom }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="section == 'match'">
                        <div v-show="false" class="titles" style="display: flex; align-items: center; padding-top: 2vh;">
                            <div>
                                <img :src="'../../imgs/before.jpg'"
                                    style="width: 8vw; position: relative; top: 0.25vh; border-radius: 100%; " />
                            </div>
                            <div style=" margin-left: 0.6rem;">Matchs en cours</div>
                        </div>
                        <div v-for="room in gained_rooms" :key="room.id" @click="router.push('/room/' + room.slug)"
                            class="profs_i ripple_parent ion-activatable">
                            <ion-ripple-effect></ion-ripple-effect>
                            <div class="imgtop" :style="{
                                backgroundImage: `url('${f_url(get_room_you(room).get_picture)}')`
                            }">
                                <button v-if="is_online(toDate(get_room_you(room).last).getTime())" class="online">
                                </button>
                            </div>
                            <div class="prof_bdy">
                                <div class="prof_ti">
                                    <div class="name_ti">
                                        {{ get_room_you(room).prenom }} <button v-if="!is_seen(room.id) && has_done"
                                            class="liitle_new princ">new</button>
                                    </div>
                                    <div class="time_ti" :class="{ is_rose: not_seens(room).length }">
                                        {{ findTime(last_message(room).created_at) }}
                                    </div>
                                </div>
                                <div class="prof_cp">
                                    <div v-if="last_message(room).text" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        {{ last_message(room).text }}
                                    </div>
                                    <div v-else-if="last_message(room).image" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="image"
                                            style="font-size: 4.45vw; position: relative; top: 0.885vw;"></ion-icon> Photo
                                    </div>
                                    <div v-else-if="last_message(room).video" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="videocam"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon> Video
                                    </div>
                                    <div v-else-if="last_message(room).audio" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="musicalNote"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon> Audio
                                    </div>
                                    <button v-if="last_message(room).step != 'seen' && last_message(room).user != user?.id"
                                        class="new_1">
                                        {{ not_seens(room).length }}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div v-if="!relativ_rooms.length">
                        <div style="display: flex; justify-content: space-around; padding-top: 21.24vw;">
                            <img :src="'../../imgs/noti.svg'" style="width: 50vw;" />
                        </div>
                        <div style="text-align: center;padding-top: 1.77vw; font-size: 4.425vw;">
                            Aucune conversation trouvée
                        </div>
                    </div>
                </div>
                <div v-else class="messages_cont">
                    <div class="chips">
                        <button @click="typ_search = 'message'" class="chip " :class="{ activv: typ_search == 'message' }">
                            Messages
                        </button>
                        <button @click="typ_search = 'profil'" :class="{ activv: typ_search == 'profil' }" class="chip">
                            Personnes
                        </button>
                    </div>
                    <div class="titles" style="padding-top: 7.08vw;">
                        Résultats de recherche
                    </div>
                    <div v-if="!searchi">
                        <div v-for="result in search_results" :key="result.date" @click="router.push(result.url)"
                            class="profs_i ripple_parent ion-activatable ">
                            <ion-ripple-effect></ion-ripple-effect>
                            <div v-if="result.profil" class="imgtop" :style="{
                                backgroundImage: `url('${result.profil}')`
                            }">
                                <button v-if="is_online(result.date)" class="online">


                                </button>
                            </div>
                            <div class="prof_bdy">
                                <div class="prof_ti">
                                    <div class="name_ti" v-html="typ_search == 'message' ? result.name : result.text">

                                    </div>
                                    <div class="time_ti">
                                        {{ findTime(result.created) }}
                                    </div>
                                </div>
                                <div class="prof_cp">
                                    <div :class="{ text_cps: typ_search == 'message', text_cp: typ_search != 'message' }"
                                        v-html="typ_search == 'message' ? result.text : last_message(result.room as Room).text">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-around; padding-top: 12.39vw;" v-else>
                        <div>
                            <ion-spinner :name="'bubbles'" :color="'primary'"></ion-spinner>
                        </div>
                    </div>
                </div>
                <div class="tabmenu">
                    <div class="tabm">
                        <button @click="router.push('/tabs/home')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="albums" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/chat')" class="tabbut tabhome">
                            <ion-icon style="font-size: 2.2vh;" :icon="chatbox" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/lov')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="heartHalf" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/com')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="newspaper" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/param')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="settings" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </ion-page>
</template>

<style scoped >
.seco:active {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.507) 10%, transparent);
}

.seco {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.103) 10%, transparent);
    background-color: rgba(114, 114, 114, 0.212);
    color: white;
}

.has_no {
    color: #fc1955 !important;
}

.princ:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.527), transparent);
    background-color: #fc1955;
}

.princ {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
    color: white;
}

.liitle_new {
    display: inline-block;
    padding: 0.708vw 1.69vw;
    border-radius: 7px;
    font-size: 2.12vw;
    padding-top: 0.44vw !important;
    position: relative;
    bottom: 0.53vw;
    font-weight: bold;
}

.pt-1 {
    padding-top: 1.77vw;
}

.is_ske {
    height: 10.6vw;
    width: 21.24vw !important;
    min-width: 21.24vw !important;
}

*::-webkit-scrollbar {
    display: none;
}

.activv {
    background-color: #fc1955;
    color: white;
}

.chip {
    margin-right: 0.9rem;
    padding: 1.77vw 3.54vw;
    border-radius: 15px;
    font-size: 3.894vw;
    font-weight: bold;
}

.chips {
    display: flex;
    align-items: center;
}

.ripple_parent {
    position: relative;
    overflow: hidden;
}

.not_new {
    max-width: 70vw !important;
}

.is_rose {
    color: #fc1955 !important;
}

.new_1 {
    padding: 0.885vw 1.41vw;
    border-radius: 100%;
    background-color: #fc1955;
    color: white;
    font-size: 2.65vw;
    font-weight: bold;
}

.text_cps {
    flex-grow: 1;
    color: rgb(122, 122, 122);
    max-width: 59vw;
}

.bold {
    font-weight: bold;
    color: black !important;
}

.text_cp {
    flex-grow: 1;
    color: rgb(122, 122, 122);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 62vw;
}

.prof_cp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    width: 100%;
    font-size: 2.8vw;
}

.time_ti {
    color: rgb(122, 122, 122);
    white-space: nowrap;
    font-size: 2.8vw;
}

.name_ti {
    font-weight: bold;
    white-space: nowrap;
    flex-grow: 1;
    max-width: 40vw;
    overflow-x: hidden;
}

.prof_ti {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3.54vw;
    max-width: 100%;
    width: 100%;
}

.prof_bdy {
    flex-grow: 1;
    padding-top: 0.6vw;
}

.online {
    width: 3.54vw;
    height: 3.54vw;
    min-width: 3.54vw;
    min-height: 3.54vw;
    border-radius: 100%;
    background-color: rgb(36, 221, 36);
    color: white;
    position: absolute;
    bottom: 0%;
    right: 0%;
    border-width: 3px;
    border-color: white;
    border-style: solid;
}

.imgtop {
    width: 11vw;
    height: 11vw;
    min-width: 11vw;
    min-height: 11vw;
    border-radius: 100%;
    background-size: cover;
    background-position: top center;
    margin-right: 0.5rem;
    position: relative;
}

.profs_i {
    padding-top: 2.21vw;
    padding-bottom: 2.21vw;
    display: flex;
    align-items: center;
}

.messages_cont {
    width: 100%;
    padding: 5.9vw 5.1vw;
    background-color: white;
    color: rgb(51, 51, 51);
    /* border-top-right-radius: 30px;
    border-top-left-radius: 30px; */
    margin-top: -5.1vw;
    flex-grow: 1;
    overflow-y: scroll;
    transition: all 0.8ms ease-in-out;
    border-radius: 30px;
}

.borde {
    border-style: solid;
    border-width: 2px;
    border-color: #fc1955;
}

.subna {
    padding-top: .177vw;
    white-space: nowrap;
}

.texti {
    padding-top: 0.8vw;

}

.add_ico {
    width: 3.74vw;
    height: 3.74vw;
    min-width: 3.74vw;
    min-height: 3.74vw;
    border-radius: 100%;
    background-color: #fc1955;
    color: white;
    position: absolute;
    bottom: 0%;
    right: 0%;
}

.imgto {
    width: 10vw;
    height: 10vw;
    min-width: 10vw;
    min-height: 10vw;
    border-radius: 100%;
    background-size: cover;
    background-position: top center;
    margin-right: 0.5rem;
    position: relative;
}

.img_prof:active {
    background-color: rgba(255, 255, 255, 0.24);
}

.img_prof {
    display: flex;
    align-items: center;
    margin-right: 0.8rem;
}

.imgs {
    display: flex;
    align-items: center;
    padding-top: 3.06vw;
    overflow-y: hidden;
    overflow-x: scroll;
}

.titles {
    font-weight: bold;
    font-size: 4.1vw;
}

.status_cont {
    width: 100%;
    padding: 5.1vw 5.1vw;
    background-color: rgb(51, 51, 51);
    color: white;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    padding-bottom: 8.5vw !important;
}

.rinp {
    flex-grow: 1;
    height: 5.8vw;
    background-color: transparent;
    color: white;
    border: none;
    font-size: 3.5vw;
}

*:focus {
    outline: none;
}

.sico {
    background-color: transparent;
    width: 8.12vw;
    height: 8.12vw;
    color: rgb(146, 146, 146);
    font-size: 5.31vw;
}

.search_input {
    width: 100%;
    height: 9.8vw;
    background-color: rgb(51, 51, 51);
    display: flex;
    align-items: center;
    border-radius: 10px;
}

.second_tool {
    padding: 1.77vw 5.31vw;
    margin-bottom: 5.31vw;
}

.imgt {
    width: 7.08vw;
    height: 7.08vw;
    min-width: 7.08vw;
    min-height: 7.08vw;
    border-radius: 100%;
    background-size: cover;
    background-position: top center;
    border-style: solid;
    border-width: 2px;
    border-color: #fc1955;
}

.namee {
    color: white;
}

.hello {
    color: rgb(146, 146, 146);
    font-size: 3.54vw;
}

.rtext {
    font-size: 3.54vw;
    font-weight: bold;
    margin-right: 0.6rem;
}

.texthe {
    display: flex;
    align-items: center;
}

.backbut:active {
    background-color: rgba(255, 255, 255, 0.24);
}

.backbut {
    width: 10vw;
    height: 10vw;
    min-width: 10vw;
    min-height: 10vw;
    font-size: 5.8vw;
    border-radius: 100%;
    background-color: transparent;
    color: white;
}

.first_tool {
    padding: 3.4vw 4.25vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.body_all {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(29, 29, 29);
    font-family: 'PT Serif', serif;
}
</style>

<script setup lang="ts" >
interface UserPhotos {
    id: number,
    new: number,
    tots: number,
    user: ChatProfil
}

interface SearchResult {
    profil: string | null,
    name: string,
    text: string,
    is_me: boolean,
    date: number,
    created: string,
    url: string,
    room?: Room
}

import { IonPage, IonContent, IonIcon, IonRippleEffect, IonSkeletonText, IonSpinner, onIonViewDidEnter, IonChip, IonAvatar, IonLabel } from "@ionic/vue"
import { addCircle, arrowBack, search, image, videocam, musicalNote, albums, chatbox, heartHalf, person, settings, notifications, notificationsCircle, eyeOff, newspaper } from "ionicons/icons";
import { computed, ref, watch } from "vue";
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";
import { ChatProfil, Room } from "@/global/types";
import { useRouter } from "vue-router";
import axios from "axios";
import { access_tok, show_alert, rechercheMotSansAccents, toDate, is_online, findTime } from "@/global/utils";
import unidecode from "unidecode";
import { StatusBar } from "@capacitor/status-bar"

const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)
const { user_matches, user, rooms, messages, proposed_rooms, gained_rooms, has_new_room, notifs, seen_notifs, seen_rooms, has_new_notifs } = userStore
const { get_room_from_message, last_message, not_seens, f_url, get_room_messages } = _userStore
const match_photos = ref<UserPhotos[]>([])
const get_matchp = computed(() => {
    const has_n = match_photos.value.filter(e => !e.new)
    const has_no = match_photos.value.filter(e => e.new)

    return has_no.sort((a, b) => (b.new - a.new)).concat(has_n)
})
const router = useRouter()

const searchw = ref("")
watch(searchw, (news, olds) => {
    if (news) {
        searchi.value = false
    }
})
const is_searching = computed(() => {
    return searchw.value != ""
})
const typ_search = ref<'message' | 'profil'>('profil')

const searching = ref(false)
const get_new_photos = async () => {
    searching.value = true
    try {
        const resp = await axios.get('api/get_new_photos/', {
            headers: {
                Authorization: `Bearer  ${await access_tok(router, undefined)}`
            }
        })
        if (resp.data['done']) {
            for (const obj of resp.data['result']) if (!match_photos.value.filter(e => e.id == obj.id)[0]) match_photos.value.push(set_photo(obj))
        }
    } catch (e) {
        console.error(e)
        show_alert('Erreur imprevue', "Une erreur est survenue lors de la recuperation des nouvelles photos.")
    }
    searching.value = false
}

const set_photo = (obj: {
    id: number,
    new: number,
    tots: number,
}) => {
    const user = user_matches.value.filter(e => e.id == obj.id)[0]
    return {
        id: obj.id,
        new: obj.new,
        tots: obj.tots,
        user
    }
}

const get_room_you = (room: Room) => {
    return room.users.filter(e => e.id != user.value?.id)[0]
}

const searchi = ref(true)
const search_results = computed(() => {
    return typ_search.value == 'message' ? search_in_message(searchw.value) : search_in_people(searchw.value)
})

const search_in_message = (searchw: string) => {
    searchi.value = true
    const results = [] as SearchResult[]
    const text_messages = messages.value.filter(e => e.text)
    for (const messag of text_messages) {
        if (rechercheMotSansAccents(messag.text as string, searchw)) {
            const regex = new RegExp(searchw, 'gi')
            const html = messag.text?.replace(regex, `<span style="color: #fb4073; font-weight: bold;">$&</span>`) as string
            const room = get_room_from_message(messag.get_room)
            results.push({
                name: room.users.filter(e => e.id != user.value?.id)[0].prenom,
                profil: null,
                text: html,
                is_me: messag.user == user.value?.id,
                date: toDate(messag.created_at).getTime(),
                created: messag.created_at,
                url: '/room/' + room.slug + '?mess=' + messag.id
            })
        }
    }
    searchi.value = false
    return results.sort((a, b) => b.date - a.date)
}

const search_in_people = (searchw: string) => {

    searchi.value = true
    const results = [] as SearchResult[]

    for (const room of rooms.value) {
        const _you = room.users.filter(e => e.id != user.value?.id)[0]
        if (rechercheMotSansAccents(_you.prenom, searchw)) {
            const regex = new RegExp(searchw, 'gi')
            const html = _you.prenom?.replace(regex, `<span style="color: #fb4073; font-weight: bold;">$&</span>`) as string
            results.push({
                profil: _you.get_picture,
                text: html,
                name: _you.prenom,
                is_me: false,
                date: toDate(room.created_at).getTime(),
                created: room.created_at,
                url: '/room/' + room.slug,
                room: room
            })
        }
    }
    searchi.value = false
    return results.sort((a, b) => b.date - a.date)
}

const seen_rms = ref<number[]>([])
const is_seen = (id: number) => {
    return seen_rms.value.includes(id)
}

const has_done = ref(false)

const new_notifs = computed(() => {
    return notifs.value.filter(e => (!seen_notifs.value.includes(e.id) && !(["new_match", "new_mess"].includes(e.typ)))).length
})

onIonViewDidEnter(() => {

    setTimeout(() => {
        has_new_room.value = false
        for (const n of notifs.value) {
            if (!seen_notifs.value.includes(n.id) && n.typ == 'new_match') seen_notifs.value.push(n.id)
        }

    }, 1000)
    const rms = seen_rooms.value
    for (const r of rms) seen_rms.value.push(r)
    setTimeout(() => {
        for (const r of rooms.value) {
            if (!seen_rooms.value.includes(r.id)) seen_rooms.value.push(r.id)
        }
        has_done.value = true
    }, 200)

    const set_bar = () => {
        StatusBar.setBackgroundColor({ color: "#1d1d1d" })
    }

    set_bar()
})

get_new_photos()

const counter = ref(0)
setInterval(() => {
    counter.value++;
}, 800)

const section = ref("match")
const relativ_rooms = computed(() => {
    return section.value == 'match' ? gained_rooms.value : proposed_rooms.value
})

const has_nonyms = computed(() => {
	let has_new = false
	
	for(const ro of proposed_rooms.value) {
		if(!is_seen(ro.id) || get_room_messages(ro.slug, 0).filter(e => e.step != 'seen' && e.user != user.value?.id)) has_new = true
	}
	return has_new
})

</script>
