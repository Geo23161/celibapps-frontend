<template>
  <ion-page>
    <div class="lbody flex_l" v-if="typ == ''">
      <div class="header">
        <button @click="$router.push('/notifs')" class="backbut">
          <ion-icon :icon="notifications" :class="{has_no : has_new_notifs && counter % 2}" style="position: relative; top: .1rem;" />
        </button>
        <div class="header_cont">

          <button style="
                font-size: 1.8rem;
                color: rgb(255, 38, 38);
                padding-top: 0.5rem;
                width: 3rem;
                height: 3rem;
                background: transparent;
              ">
            <ion-icon :icon="heart" />
          </button>
          <div style="font-size: 1.5rem; font-weight: bold">Favoris</div>
        </div>
      </div>
      <div class="cop">
        <div class="tit">Que voulez-vous voir?</div>
        <div>
          <div class="sep">
            <div class="item" @click="typ = 'i_likes'">
              <div style="display: flex; align-items: center">
                <button class="all_b">
                  <ion-icon :icon="heartCircle" />
                </button>
                <div class="mytitle">Les Profils que j'ai kiffé</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="sep">
            <div class="item" @click="typ = 'likes_me'">
              <div style="display: flex; align-items: center">
                <button class="all_b">
                  <ion-icon :icon="peopleCircle" />
                </button>
                <div class="mytitle">Les profils qui ont kiffé le mien</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin: -2vh;">
        <div style="width: 100%; height: 100%;">
          <div class="tabmenu" style="background-color: rgb(51, 51, 51) !important;">
            <div class="tabm">
              <button @click="router.push('/tabs/home')" class="tabbut seco">
                <ion-icon style="font-size: 2.2vh;" :icon="albums" />
              </button>
            </div>
            <div class="tabm">
              <button v-if="has_new" class="alert_b alert_colo" >

              </button>
              <button @click="router.push('/tabs/chat')" class="tabbut seco"
                :class="{ accused: has_new  }">
                <ion-icon style="font-size: 2.2vh;" :icon="chatbox" />
              </button>
            </div>
            <div class="tabm">
              <button @click="router.push('/tabs/lov')" class="tabbut tabhome">
                <ion-icon style="font-size: 2.4vh; position: relative; top: .18vh;" :icon="heartHalf" />
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
    </div>
    <div class="lbody " v-else>
      <div class="pheader sbody">
        <div class="menu" @click="typ = ''">
          <ion-icon :icon="arrowBack" />
        </div>
        <div>
          <div style="font-weight: bold; font-size: 1.8rem">Profils</div>
        </div>
      </div>
      <div v-if="profiles.length">
        <ion-grid>
          <ion-row>
            <ion-col size-xs="6" size-lg="3" v-for="p in profiles" :key="p.id">
              <div class="card_lov">
                <div @click=" typ == 'likes_me' && !can_see ? handle_cant_see() : router.push('/profil/' + p.id)" :style="{
                  'background-size': 'cover',
                  'background-position': 'top center',
                  'background-image': `url('${p.get_profil.get_picture}')`,
                }" class="card_img">
                  <div v-if="typ == 'likes_me' && !can_see" style="width: 100%; height: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;" class="blur_lov">

                  </div>
                  <div style="position: absolute; top: 0.3rem; right: 0.3rem">
                    <button class="astro_but">
                      <ion-icon :icon="camera" style="font-size: 1.1rem; position: relative; top: 0.2rem" /> <span>
                        {{ p.photos.length }}
                      </span>
                    </button>
                  </div>
                </div>
                <div style="position: absolute; bottom: 0.9rem; right: 0.6rem">
                  <button v-if="typ == 'i_likes'" @click="want_lov(p)" class="mybut activ">
                    <ion-icon class="ico" :icon="notifications" />
                  </button>
                  <button v-else class="mybut activ"
                    @click="typ == 'likes_me' && !can_see ? handle_cant_see() : open_new_match(p.id)">
                    <ion-icon class="ico" :icon="heart" />
                  </button>
                </div>
                <div class="card_body">
                  <div>
                    <div style="max-height: 100%">
                      <div v-if="!(typ == 'likes_me' && !can_see)" class="title">
                        {{ p.prenom }}
                      </div>
                      <div style="display: flex; align-items: center; ">
                        <div style="font-size: 1.1rem; padding-top: 0.1rem; padding-right: 0.3rem;">
                          <ion-icon :icon="filter" />
                        </div>
                        <div style="font-size: 0.9rem; white-space: nowrap; ">
                          {{ p.get_sign }}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-around;" v-else-if="!searching">
        <div style="position: absolute; top: 25%; width: 60%">
          <img :src="'../../imgs/no_data.svg'"  />
          <div style="text-align: center; font-weight: 600; padding: 0.7rem">
            Aucun profil trouvé
          </div>
        </div>
      </div>
      <div v-else>
        <div style="padding-top: 20vh; display: flex; justify-content: space-around; ">
          <div>
            <ion-spinner :name="'bubbles'" :color="'light'"></ion-spinner>
          </div>
        </div>
      </div>
    </div>
    <abon-limited
      @close="lOpen = false, ltext = 'Pour voir ceux qui ont kiffé votre profil vous devez avoir au moins un ticket Silver Plus.'"
      :text="ltext" :is-open="lOpen" :redirect="'/home'" />
  </ion-page>
</template>
  
<style scoped>

.has_no {
    color: #fc1955 !important;
}
.backbut:active {
  background-color: rgba(255, 255, 255, 0.24);
}

.backbut {
  width: 6vh;
  height: 6vh;
  min-width: 6vh;
  min-height: 6vh;
  font-size: 3.3vh;
  border-radius: 100%;
  background-color: transparent;
  color: white;
}

.blur_lov {
  backdrop-filter: blur(14px);
}

.card_img:active {
  background: #cfc6f8
}

.ico {
  position: relative;
  top: 0.1rem;
  right: 0.05rem
}

.notifo {
  color: white;
  background: #2dd36f;
  box-shadow: 0 10px 15px -3px #2dd36fff, 0 4px 6px -2px #17a74929;
}

.activ {
  color: white;
  background: #7759ff;
  box-shadow: 0 10px 15px -3px #7759ffff, 0 4px 6px -2px #17a74929;
}

.mybut:active {
  box-shadow: none;
}

.mybut {
  margin-left: 0.5rem;
  display: block;
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 100%;
  font-size: 1rem;
}

.astro_but {
  border-radius: 10px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  padding-top: 0.2rem;
  padding-bottom: 0.3rem;
  background: #ff5959;
  color: white;
  font-size: 0.9rem;
}

ion-grid {
  --ion-grid-padding: 0.2rem;
}

.title {
  font-size: 1.1rem;
  font-weight: bolder;
  padding-bottom: 0.1rem;
}

.card_body {
  padding: 0.5rem;
  color: rgb(29, 29, 29) !important;
}

.card_img {
  width: 100%;
  height: 10rem;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  position: relative;
}

.card_lov {
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.menu:active,
.menu_:active {
  box-shadow: none;
  background: white;
  color: #7759ff;
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

.pheader {
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sbody {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.6rem;
}

.back_ {
  position: absolute;
  top: 1rem;
  left: 0.6rem;
}

.all_b {
  margin-right: 0.6rem;
  width: 45px;
  height: 45px;
  min-width: 45px;
  min-height: 45px;
  border-radius: 15px;
  font-size: 1.8rem;
  background: #fb407333;
  color: #fb4073;
  padding-top: 0.2rem;
}

.item:active {
  background-color: #424242;
}

.mytitle {
  font-size: 1rem;
  font-weight: bold;
}

.item_ac {
  width: 100%;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #7759ff;
  color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.item {
  width: 100%;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(51, 51, 51);
  color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.sep {
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.tit {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bolder;
}

.cop {
  padding-top: 15vh;
  flex-grow: 1;
}

.header_cont {
  display: flex;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex_l {
  display: flex;
  flex-direction: column;
}

.lbody {
  width: 100%;
  height: 100%;
  background: rgb(29, 29, 29);
  padding: 2vh;
  color: white;
  overflow-y: scroll;
}


.title {
  font-size: 6vw;
  font-weight: bold;
}
</style>
  
<script setup lang="ts">
import {
  location,
  close,
  heart,
  filter,
  heartOutline,
  body,
  heartCircle,
  peopleCircle,
  refresh,
  arrowBack,
  micCircle,
  search,
  camera,
  notifications,
  albums,
  chatbox,
  heartHalf,
  settings,
  person,
  newspaper
} from "ionicons/icons";
import {
  IonIcon,
  IonRippleEffect,
  IonSpinner,
  isPlatform,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  onIonViewWillEnter,
  onIonViewDidEnter,
} from "@ionic/vue";
import { computed, ref, watch } from "vue";
import {
  access_tok,
  get_obj,
  presentToast,
  showLoading,
  show_alert,
  store_obj,
  room_slug
} from "@/global/utils";
import axios from "axios";
import { useRouter } from "vue-router";
import { Profil } from "@/global/types";
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";
import AbonLimited from "@/components/AbonLimited.vue";
import { StatusBar } from "@capacitor/status-bar"

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)

const { user, rooms, matches, has_new, has_new_notifs } = userStore
const { force_room, initiate_chat } = userStore_
const i_likes = ref<Profil[]>([])
const likes_me = ref<Profil[]>([])

const typ = ref("")

const counter = ref(0)
setInterval(() => {
    counter.value++;
}, 800)

const profiles = computed(() => {
  return typ.value == 'i_likes' ? i_likes.value : likes_me.value
})

const router = useRouter()

const img_key = ref(0)
const searching = ref(false)

const get_profiles = async () => {
  searching.value = true
  try {
    const resp = await axios.get('api/get_favorites/' + typ.value + '/', {
      headers: {
        Authorization: `Bearer ${await access_tok(router, undefined)}`
      }
    })
    if (resp.data['done']) {
      if (typ.value == 'i_likes') i_likes.value = resp.data['result']
      else {
        likes_me.value = resp.data['result']
      }
    }
  } catch (e) {
    console.log(e)
  }
  searching.value = false
}

watch(typ, (newt, oldt) => {
  if (newt == 'likes_me' && !can_see.value) {
    setTimeout(() => {
      lOpen.value = true
    }, 500)
  }
  if (newt == 'i_likes' && i_likes.value.length == 0) {
    get_profiles()
  } else if (newt == 'likes_me' && likes_me.value.length == 0) {
    get_profiles()
  }
})

const want_lov = async (p: Profil) => {
  const load = await showLoading('Envoi...')
  try {
    const resp = await axios('api/want_lov/' + p.id, {
      headers: {
        Authorization: `Bearer ${await access_tok(router, load)}`
      }
    })
    if (resp.data['done']) {
      await presentToast('top', "Notification envoyé à " + p.prenom + " avec succès.", "success")
    } else {
      await show_alert('Déjà envoyé.', 'Vous avez déjà envoyé une alerte à ' + p.prenom + ' durant la semaine.')
    }
  } catch (e) {
    console.log(e)
    await show_alert('', 'Une erreur est survenue, Veuillez reéssayer.')
  }
  load.dismiss()
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



onIonViewDidEnter(() => {
  const action = localStorage.getItem('action')
  if (action) {
    const action_obj: { pk: number, action: 'love' | 'dislike' | 'chat_with' } = JSON.parse(action)
    if (action_obj.action == 'love') {
      if (typ.value == 'likes_me') {
        open_new_match(action_obj.pk)
      }
    }
    else if (action_obj.action == 'dislike') {
      if (typ.value == 'i_likes') {
        i_likes.value = i_likes.value.filter(e => e.id != action_obj.pk)
      }
    }
    else {
      chat_with(action_obj.pk)
    }

    localStorage.removeItem('action')
  }

  const set_bar = () => {
    StatusBar.setBackgroundColor({ color: "#1d1d1d" })
  }

  set_bar()
})

const ltext = ref('Pour voir ceux qui ont kiffé votre profil vous devez avoir au moins un ticket Silver Plus.')
const lOpen = ref(false)

const chat_with = (id: number) => {
  if (user.value) {
    if (!user.value.cur_abn.get_typ.features?.includes('chat_all')) {
      ltext.value = "Ecrire à tout le monde sans avoir besoin de matcher est exclusivelent réservé aux VIP."
      lOpen.value = true
    } else {
      const room = rooms.value.filter(e => e.slug == room_slug(user.value?.id as number, id as number))[0]
      if (room) {
        router.push(`/room/${room.slug}`)
      } else {
        initiate_chat(user.value.id as number, id as number)
      }
    }
  }
}

const can_see = computed(() => {
  if (!user.value) return false
  if (!user.value.cur_abn) return false
  if (!user.value.cur_abn.get_typ.features) return false
  return user.value.cur_abn.get_typ.features.includes('likes_me')
})

const handle_cant_see = () => {
  ltext.value = `Votre ticket actuel ne vous permet pas d'acceder a cette fonctionnalité.`
  lOpen.value = true;
}

</script>
