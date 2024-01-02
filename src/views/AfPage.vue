<template >
    <ion-page>
        <ion-content>
            <div v-if="room" class="body_allt">
                <div class="pheader sbody">
                    <div @click="router.back()" class="menu">
                        <ion-icon :icon="arrowBack" />
                    </div>
                    <div>
                        <div
                            style="display: flex; align-items: center;font-size: 2.5vh; color: white; font-weight: bolder; ">
                            <div class="imgtop" :style="{
                                backgroundImage: `url('${get_room_you(room).get_picture}')`,

                            }">
                                <div
                                    style="width: 100%; height: 100%; border-radius: 100%; background-color: transparent; backdrop-filter: blur(8px);">
                                    
                                </div>
                            </div>
                            <div>{{ get_room_you(room).get_des[1] }}</div>
                        </div>
                    </div>
                </div>
                <div class="textop">
                    Lancez vous dans une conversation anonyme avec {{   get_room_you(room).get_des[1] }}
                </div>
                <div style="display: flex; justify-content: center; padding-top: 3vh;">
                    <img style="width: 50vw;" :src="'../../imgs/mask.webp'" />
                </div>

                <div v-if="room.get_anonymous" style="font-size: 2.3vh; padding-left: 2vh; padding-right: 2vh; color: white;">
                    <div class="caard" >
                        <div style="text-align: center; font-weight: bold;" >
                            Points commums
                        </div>
                        <div style="padding-top: 1vh;" >
                            <div v-for="point in room.get_anonymous.commons" :key="point" style="padding-bottom: 1vh;" >
                                <li v-html="point" ></li>
                            </div>
                        </div>
                    </div>
                    <div @click="room.get_anonymous.has_seen = true" style="margin-top: 3vh;" class="caard spee menu_" >
                        <div  style="text-align: center; font-weight: bolder;" >
                            Démarrer
                        </div>
                    </div>
                    <div @click="warn_delete()" style="margin-top: 3vh; background-color: red !important; color: white !important; box-shadow: 0 10px 15px -3px #f8000065, 0 4px 6px -2px #17a74929 !important;" class="caard spee menu_" >
                        <div  style="text-align: center; font-weight: bolder;" >
                            Supprimer
                        </div>
                    </div>
                </div>
                
            </div>
            <div v-else class="body_all" >
                <div style="display: flex; justify-content: center; padding-top: 45vh;" >
                    <div>
                        <ion-spinner :name="'circles'" ></ion-spinner>
                    </div>
                </div>
            </div>
            <abon-limited :is-open="bOpen" @close="bOpen = false "
                :text="'Vous avez atteint le nombre maximum de conversation anonyme, veuillez mettre à jour pour pouvoir en avoir de nouveau.'" />
        </ion-content>
    </ion-page>
</template>

<style scoped >
.spee {
    background-color: #ffffff;
    color: #0d091f;
    font-weight: bold;
    box-shadow: 0 10px 15px -3px #ffffff65, 0 4px 6px -2px #17a74929;
}

.caard {
    padding: 1vh 1.5vh;
    border-style: solid;
    border-width: 2px;
    border-color: white;
    
}
.textop {
    padding-top: 3vh;
    padding-left: 2vh;
    padding-right: 2vh;
    font-size: 2.5vh;
    font-weight: bolder;
    text-align: center;
    color: white;
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

.menu:active,
.menu_:active {
    box-shadow: none;
    background: white;
    color: #0d091f;
}

.menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #ffffff;
    color: #0d091f;
    font-weight: bold;
    box-shadow: 0 10px 15px -3px #ffffff65, 0 4px 6px -2px #17a74929;
}

.pheader {
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
}

.sbody {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2.2vh;
}

.body_allt {
    width: 100vw;
    height: 100vh;
    background-color: #0d091f;
    overflow: hidden;
    font-family: 'PT Serif';
}
</style>

<script setup lang="ts" >
import AbonLimited from "@/components/AbonLimited.vue";
import { useUserStore } from "@/global/pinia";
import { Room } from "@/global/types";
import { showLoading, show_warn } from "@/global/utils";
import router from "@/router";
import { IonPage, IonContent, IonIcon, onIonViewDidEnter, IonSpinner } from "@ionic/vue"
import { arrowBack } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router"

const route = useRoute()
const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)


const { rooms, user, can_anonym } = userStore

const bOpen = ref(false)
watch(can_anonym, (newa, olda) => {
    console.log('donne')
    bOpen.value = true
})
const { delete_room } = _userStore
const room = ref<Room>()

const get_room_you = (room: Room) => {
    return room.users.filter(e => e.id != user.value?.id)[0]
}

const has_seen = computed(() => {
    return room.value ? room.value.get_anonymous?.has_seen : false
})
watch(has_seen, async (newh, oldh) => {
    if(newh) {
        const load = await showLoading("Loading...")
        setTimeout(() => {
            router.replace('/nroom/' + room.value?.slug)
            load.dismiss()
        }, 1500)
    }
})

const warn_delete = () => {
    show_warn('Confirmer la suppression', "Voulez-vous vraiment supprimer cette proposition?", "Oui", delete_room, room.value?.id)
}

onIonViewDidEnter(() => {
    const id = parseInt(route.params['id'] as string)
    room.value = rooms.value.filter(e => e.id == id)[0]
    console.log(room.value)
})


</script>
