<template >
    <ion-page>
        <ion-content>
            <div v-if="grp" style="overflow-y: hidden; height: 100%;">
                <div class="body_all">
                    <div class="first_tool">
                        <button @click="$router.back()" class="backbut">
                            <ion-icon :icon="arrowBack" style="position: relative; top: .1rem;" />
                        </button>
                        <div class="texthe">
                            <div class="rtext">
                                <span style="color: white; "> Code: </span>
                                <span style="color: #fc1955; font-size: 4vw;">
                                    {{ grp.code }}
                                </span>
                            </div>
                        </div>
                        <button @click="warn_delete()" class="backbut">
                            <ion-icon :icon="trash" style="position: relative; top: .1rem;" />
                        </button>
                    </div>
                    <div class="status_cont">
                        <div class="titles">
                            Membres
                        </div>
                        <div class="imgs">

                            <div v-for="us in grp.users" class="img_prof">
                                <div class="imgto " :style="{
                                    backgroundImage: `url('${f_url(us.get_picture)}')`
                                }">
                                </div>
                                <div class="txti">
                                    <div class="namee" style="font-weight: bold; font-size: 3.54vw;">
                                        {{ us.prenom }}
                                    </div>
                                    <div class="subna hello" :style="{
                                    	color : formatOnline(us.last).includes('ligne') ? 'yellow' : 'gray'
                                    }" >
                                        {{ formatOnline(us.last) }}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="grp.users.length > 1" class="messages_cont"
                        style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                        <div v-for="room in entre_nous" class="profs_i ripple_parent ion-activatable"
                            @click="router.push('/groom/' + room.slug)">
                            <ion-ripple-effect></ion-ripple-effect>
                            <button v-if="room.get_groups?.length == 1" class="g_flag" style="margin-right: .7rem;">
                                <ion-icon :icon="people" />
                            </button>
                            <div v-else class="g_tofs">
                                <div v-if="get_rooms_users(my_groups, room)[0]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[0].get_picture}')`
                                            }">
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[1]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[1].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[2]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[2].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[3]" class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[3].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                            </div>

                            <div class="prof_bdy">
                                <div class="prof_ti">
                                    <div class="name_ti">
                                        {{ room.get_groups?.length == 1 ? "Entre nous" : mgrp_name(my_groups, room, user?.id as number) }}
                                    </div>
                                    <div class="time_ti" :class="{ is_rose: not_seens(room).length }">
                                        {{ findTime(last_message(room).created_at) }}
                                    </div>
                                </div>
                                <div class="prof_cp">
                                    <div v-if="last_message(room, true).text" class="text_cp"
                                        :class="{ bold: last_message(room, true).step != 'seen' && last_message(room, true).user != user?.id }">
                                        {{ last_message(room, true).text }}
                                    </div>
                                    <div v-else-if="last_message(room, true).image" class="text_cp"
                                        :class="{ bold: last_message(room, true).step != 'seen' && last_message(room, true).user != user?.id }">
                                        <ion-icon :icon="image"
                                            style="font-size: 4.45vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Photo
                                    </div>
                                    <div v-else-if="last_message(room).video" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="videocam"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Video
                                    </div>
                                    <div v-else-if="last_message(room).audio" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="musicalNote"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Audio
                                    </div>
                                    <button v-if="last_message(room).step != 'seen' && last_message(room).user != user?.id"
                                        class="new_1">
                                        {{ not_seens(room).length }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-if="sem_match.length" class="titles" style="display: flex; align-items: center; padding-top: 2.5vw;">
                            <div>
                                <img :src="'../../imgs/icon1.png'" style="width: 8vw; position: relative; top: 0.25vh; " />
                            </div>
                            <div style=" margin-left: 0.6rem;">Groupe proposé</div>
                        </div>
                        <div v-for="room in sem_match" class="profs_i ripple_parent ion-activatable"
                            @click="router.push('/groom/' + room.slug)">
                            <ion-ripple-effect></ion-ripple-effect>
                            <button v-if="room.get_groups?.length == 1" class="g_flag" style="margin-right: .7rem;">
                                <ion-icon :icon="people" />
                            </button>
                            <div v-else class="g_tofs">
                                <div v-if="get_rooms_users(my_groups, room)[0]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[0].get_picture}')`
                                            }">
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[1]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[1].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[2]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[2].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[3]" class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[3].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                            </div>

                            <div class="prof_bdy">
                                <div class="prof_ti">
                                    <div class="name_ti">
                                        {{ room.get_groups?.length == 1 ? "Entre nous" : mgrp_name(my_groups, room, user?.id as number) }}
                                    </div>
                                    <div class="time_ti" :class="{ is_rose: not_seens(room).length }">
                                        {{ findTime(last_message(room).created_at) }}
                                    </div>
                                </div>
                                <div class="prof_cp">
                                    <div v-if="last_message(room, true).text" class="text_cp"
                                        :class="{ bold: last_message(room, true).step != 'seen' && last_message(room, true).user != user?.id }">
                                        {{ last_message(room, true).text }}
                                    </div>
                                    <div v-else-if="last_message(room, true).image" class="text_cp"
                                        :class="{ bold: last_message(room, true).step != 'seen' && last_message(room, true).user != user?.id }">
                                        <ion-icon :icon="image"
                                            style="font-size: 4.45vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Photo
                                    </div>
                                    <div v-else-if="last_message(room).video" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="videocam"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Video
                                    </div>
                                    <div v-else-if="last_message(room).audio" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="musicalNote"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Audio
                                    </div>
                                    <button v-if="last_message(room).step != 'seen' && last_message(room).user != user?.id"
                                        class="new_1">
                                        {{ not_seens(room).length }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-if="rooms.length" class="titles" style="display: flex; align-items: center; padding-top: 2.5vw;">
                            <div>
                                <img :src="'../../imgs/icon2.png'" style="width: 8vw; position: relative; top: 0.25vh; " />
                            </div>
                            <div style=" margin-left: 0.6rem;">Groupe matchés</div>
                        </div>
                        <div v-for="room in rooms" class="profs_i ripple_parent ion-activatable"
                            @click="router.push('/groom/' + room.slug)">
                            <ion-ripple-effect></ion-ripple-effect>
                            <button v-if="room.get_groups?.length == 1" class="g_flag" style="margin-right: .7rem;">
                                <ion-icon :icon="people" />
                            </button>
                            <div v-else class="g_tofs">
                                <div v-if="get_rooms_users(my_groups, room)[0]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[0].get_picture}')`
                                            }">
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[1]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[1].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[2]"  class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[2].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                                            <div v-if="get_rooms_users(my_groups, room)[3]" class="imgtop border_online" :style="{
                                                backgroundImage: `url('${get_rooms_users(my_groups, room)[3].get_picture}')`
                                            }" style="margin-left: -7vw ;" >
                                            </div>
                            </div>

                            <div class="prof_bdy">
                                <div class="prof_ti">
                                    <div class="name_ti">
                                        {{ room.get_groups?.length == 1 ? "Entre nous" : mgrp_name(my_groups, room, user?.id as number) }}
                                    </div>
                                    <div class="time_ti" :class="{ is_rose: not_seens(room).length }">
                                        {{ findTime(last_message(room).created_at) }}
                                    </div>
                                </div>
                                <div class="prof_cp">
                                    <div v-if="last_message(room, true).text" class="text_cp"
                                        :class="{ bold: last_message(room, true).step != 'seen' && last_message(room, true).user != user?.id }">
                                        {{ last_message(room, true).text }}
                                    </div>
                                    <div v-else-if="last_message(room, true).image" class="text_cp"
                                        :class="{ bold: last_message(room, true).step != 'seen' && last_message(room, true).user != user?.id }">
                                        <ion-icon :icon="image"
                                            style="font-size: 4.45vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Photo
                                    </div>
                                    <div v-else-if="last_message(room).video" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="videocam"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Video
                                    </div>
                                    <div v-else-if="last_message(room).audio" class="text_cp"
                                        :class="{ bold: last_message(room).step != 'seen' && last_message(room).user != user?.id }">
                                        <ion-icon :icon="musicalNote"
                                            style="font-size: 4.425vw; position: relative; top: 0.885vw;"></ion-icon>
                                        Audio
                                    </div>
                                    <button v-if="last_message(room).step != 'seen' && last_message(room).user != user?.id"
                                        class="new_1">
                                        {{ not_seens(room).length }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="messages_cont"
                        style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                        <div style="display: flex; justify-content: space-around; padding-top: 21.24vw;">
                            <img :src="'../../imgs/waiting.svg'" style="width: 50vw;" />
                        </div>
                        <div style="text-align: center;padding-top: 1.77vw; font-size: 4.425vw;">
                            En attente de membres...
                        </div>
                    </div>
                </div>
            </div>
            <ion-toast :isOpen="seen_del" :mode="'ios'" :buttons="toats_buts"
                    :message="`${recent_del?.prenom} s'est retiré de ce groupe.`"
                    layout="stacked"></ion-toast>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.see_more {
    display: flex;
    align-items: center;

}

.g_flag {
    width: 11vw;
    height: 11vw;
    min-width: 11vw;
    min-height: 11vw;
    background-color: #fc195533;
    color: #fc1955;
    border-radius: 10px;
}

.g_item {
    display: flex;
    align-items: center;
    padding: 2.5vw 0vw;
}

.border_online {
    border-width: 2px;
    border-style: solid;
    border-color: rgb(36, 221, 36);
}

.g_tofs {
    display: flex;
}

.g_header {
    display: flex;
    align-items: center;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    padding: 2.5vw 0vw;
    border-bottom-color: rgba(29, 29, 29, 0.1);
}

.groupp {
    width: 100%;
    padding: 3vw 0vw;
}

.al_but:active {
    transform: scale(0.9);
}

.al_but {
    padding: 1.2vh;
    font-size: 2.1vh;
    width: 100%;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.103) 10%, transparent);
    background-color: #fc1955;
    transition: all ease-in-out 0.2s;
}

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

<script lang="ts" setup >
import { IonPage, IonContent, onIonViewDidEnter, IonToast, ToastButton } from "@ionic/vue"
import { arrowBack, image, musicalNote, people, trash, videocam } from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/global/pinia"
import { storeToRefs } from "pinia";
import { findTime, formatOnline, mgrp_name, show_warn, get_rooms_users } from "@/global/utils";
import { Group } from "@/global/types";
import { computed, ref, watch } from "vue";

const router = useRouter()
const route = useRoute()
const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)
const { f_url, last_message, not_seens, quit_group } = _userStore
const { my_groups, user, recent_del } = userStore

const id = ref(0)
const grp = computed(() => {
    return my_groups.value.filter(e => e.id == id.value)[0]
})

const entre_nous = computed(() => {
    return grp.value?.rooms.filter(e => e.get_groups?.length == 1)
})

const sem_match = computed(() => {
    return grp.value?.rooms.filter(e => !e.is_match).filter(e => e.get_groups?.length != 1)
})

const rooms = computed(() => {
    return grp.value?.rooms.filter(e => e.is_match).filter(e => e.get_groups?.length != 1)
})

const seen_del = ref(false)
const toats_buts = ref<ToastButton[]>([
    {
        text: "J'ai compris",
        handler: () => {
            seen_del.value = false;
        }
    }
])

onIonViewDidEnter(() => {
    id.value = parseInt(route.params.id as string)
    console.log(grp.value)

    if(recent_del.value?.slug == grp.value.id) seen_del.value = true

})

const warn_delete = () => {
    show_warn('Confirmer ', "Voulez-vous vraiment vous retirer de ce groupe. Cette action est irréversible", "Oui", quit_group, grp.value?.id)
}

watch(recent_del, (newr, oldr) => {
    if(newr?.slug == grp.value.id) seen_del.value = true
})

</script>
