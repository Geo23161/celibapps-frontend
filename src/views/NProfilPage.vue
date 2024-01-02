<template>
    <ion-page>
    	<ion-content :scroll-y="true" >
      <div class="bodyjj" id="rbody" v-if="has_load && visitor" style="width: 100%">
        <div style="position: fixed; z-index: 150;" >
            <div class="header">
              <div @click="router.back()" class="menu">
                <ion-icon :icon="close" />
              </div>
            </div>
          </div>
        <div
          style="position: fixed; z-index: -10;"
          :style="{
            width: '100%',
            height: '63vh',
            'background-size': 'cover',
            'background-position': 'top center',
            'background-image': `url('${visitor?.get_profil.get_picture}')`,
          }"
        >
          
        </div>
        <div class="rbodyjj"  >
          <div class="present">
            <div>
              <div class="title">
                {{ visitor?.prenom }},
                {{ visitor?.get_age}}
              </div>
              <div class="pop">
                <div style="font-size: 4vw">
                  {{ visitor?.get_sign }}
                </div>
              </div>
            </div>
            <button @click="store_match({ pk: visitor.id, action: 'love' })" class="sound princ">
              <ion-icon
                style="position: relative; top: .2vh;"
                :icon="heart"
              />
            </button>
          </div>
          <div class="divid"></div>
          <div class="p_cont">
          	<div style="font-weight: 600; padding-bottom: 1.2vh">
              Photos
            </div>
            <div class="photos">
              <div
                v-for="img in visitor.photos"
                :key="img.id"
                @click="click_img(img.id + ':img')"
                :style="{
                  'background-size': 'cover',
                  'background-position': 'top center',
                  'background-image': `url('${img.get_picture}')`,
                }"
                class="photo"
              ></div>
            </div>
          </div>
          <div v-if="false" class="eta">
            <div style="font-weight: 600; padding-bottom: .8vh">
              Un truc sur moi...
            </div>
            <div style="font-size: 0.9rem">
              {{ visitor.get_des[1] }}
            </div>
          </div>
          <div v-if="visitor.get_des" class="eta">
            <div style="font-weight: 600; padding-bottom: .8vh">
              Un truc sur moi...
            </div>
            <div style="font-size: 0.9rem">
              {{ visitor.get_des[0] }}
            </div>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center; padding-top: 45%; font-size: 2rem">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
      <div v-show="false">
        <photo-provider v-if="visitor" >
          <photo-consumer
            v-for="img in visitor.photos"
            :key="img.id"
            :intro="'Lovelee'"
            :src="img.get_picture"
          >
            <img
              :src="img.get_picture"
              :id="img.id + ':img'"
              style="width: 40vw:"
              class="view-box"
            />
          </photo-consumer>
        </photo-provider>
      </div>
      </ion-content >
    </ion-page>
  </template>
  
  <style scoped>
  .princ:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.527), transparent);
    background-color: #fc1955;
}

.princ {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
    box-shadow: 0 10px 25px -3px #fc1955b6, 0 4px 6px -2px #f2824129;
    color: white;
}
  
  .myti {
    text-align: center;
    padding-bottom: 0.9rem;
    font-size: 1.2rem;
  }
  
  .ico {
    position: relative;
    top: 0.1rem;
  }
  
  .send {
    background: #7759ff;
    color: white;
    box-shadow: 0 10px 15px -3px #7759ff65, 0 4px 6px -2px #17a74929;
  }
  
  .close {
    background: #ff440b;
    color: white;
    box-shadow: 0 10px 15px -3px #ff440bc0, 0 4px 6px -2px #17a74929;
  }
  
  .mybut:active {
    box-shadow: none;
  }
  
  .mybut {
    margin-left: 0.5rem;
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    font-size: 1.3rem;
  }
  
  .inpt:focus {
    border: none;
  }
  
  .inpt {
    background: transparent;
    color: #120c2b;
    flex-grow: 1;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 25px;
    border-width: 2px;
    border-color: #7759ff;
    min-height: 40px;
    max-height: 160px;
    overflow: scroll;
    caret-color: #7759ff;
  }
  
  [contenteditable]:empty:before {
    content: attr(placeholder);
    position: absolute;
    display: block;
    color: rgb(68, 68, 68);
  }
  
  .messag {
    display: flex;
    align-items: center;
  }
  
  .messaging {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.9rem;
    padding-bottom: 0.4rem;
  }
  
  .is_activ {
    background: rgba(128, 128, 128, 0.583) !important;
    color: #7759ff !important ;
  }
  
  .sound {
    width: 13vw;
    height: 13vw;
    border-radius: 100%;
    font-size: 6vw;
  }
  
  .present {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .ic {
    display: block;
    width: 4rem;
    min-width: 4rem;
    height: 4rem;
    border-radius: 100%;
    font-size: 2rem;
    background: #ff440b;
    color: white;
  }
  
  .mbut {
    width: 100%;
    display: block;
    padding: 0.5rem;
    border-radius: 15px;
    margin-right: 0.6rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    background: #7759ff;
  }
  
  .bottom {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .item:active {
    background-color: #f5f3fd;
  }
  
  .mytitle {
    font-size: 1rem;
    font-weight: bold;
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
    background: #ffffff;
    border-style: solid;
    border-width: 0.5px;
    border-color: rgb(41, 41, 44);
  }
  
  .eta {
    padding-top: 1.5vh;
    padding-bottom: .8vh;
  }
  
  .photo:hover {
    width: 140px;
    height: 150px;
    min-width: 120px;
  }
  
  .photo {
    margin-right: 0.7rem;
    width: 120px;
    min-width: 120px;
    height: 120px;
    border-radius: 15px;
    transition: all 0.5s ease-in-out;
  }
  
  .photos {
    width: 100%;
    display: flex;
    align-items: center;
    overflow-x: scroll;
  }
  
  .p_cont {
    margin-right: -1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  .divid {
    margin-top: 1vh;
    margin-bottom: 1vh;
    width: 100%;
    height: 2px;
    background: rgb(182, 182, 182);
  }
  
  .pop {
    padding-top: .6vh;
    padding-bottom: .6vh;
    display: flex;
    align-items: center;
  }
  
  .title {
    font-size: 6vw;
    font-weight: bold;
  }
  
  .rbodyjj {
    width: 100%;
    padding : 3vh 2vh;
    background: white;
    color : rgb(39,39,39);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-top: 58vh;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    
  }
  
  
  .menu:active,
  .menu_:active {
    box-shadow: none;
    background: transparent;
    color: #7759ff;
  }
  
  .men:first-child {
    margin-right: 0.3rem;
  }
  
  .men:nth-child(2) {
    margin-right: 0.3rem;
  }
  
  .men {
    padding-top: 0.3rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #ff440b;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    margin-right: 0.6rem;
  }
  
  .menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #fc1955;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #fc195565, 0 4px 6px -2px #17a74929;

  }
  
  .header {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .bodyjj {
    min-height: 100vh;
    width: 100%;
    font-family: "Poppins";
    overflow: scroll;
    color: rgb(41, 41, 44);
  }
  
  
  </style>
  
  <script setup lang="ts">
  import { Profil } from "@/global/types";
import {
    access_tok,
    presentToast,
    showLoading,
    show_alert,
    room_slug
  } from "@/global/utils";
  import {
    IonPage,
    IonSpinner,
    IonIcon,
    onIonViewWillEnter,
    onIonViewWillLeave,
    IonContent,
    onIonViewDidEnter
  } from "@ionic/vue";
  import axios from "axios";
  import {
    close,
    pencil,
    star,
    shareOutline,
    send,
    heart,
    settings,
    micCircle,
    location,
    heartOutline,
    
  } from "ionicons/icons";
  import { computed, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useUserStore } from "@/global/pinia"
import { storeToRefs } from "pinia";

  const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { force_room } = userStore_
const { matches, rooms, user } = userStore
  
  const visitor = ref<Profil>();
  const likes = ref(0);
  const dislikes = ref(0);
  const has_load = ref(false);
  const pId = ref(0);
  const route = useRoute();
  const debut = ref(0);
  const router = useRouter();
  
  const aOpen = ref(false);
  
  const get_profile = async (id: number) => {
    const resp = await axios.get(`api/get_profile/${id}`, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if (resp.data['done']) {
        visitor.value = resp.data['result']
        console.log(visitor.value)
        has_load.value = true;
    }
}

  
  const click_img = (id: string) => {
    document.getElementById(id)?.click();
  };
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
  
  const created_n = ref(0);
  const want_message = ref(false);
  
  
  
  const start = async () => {
    pId.value = parseInt(route.params["id"] as string);
    debut.value = new Date().getTime();
    await get_profile(pId.value);
  };
  start()
  
  const from_notif = ref(false)
onIonViewDidEnter(() => {
    

    if (localStorage.getItem('notif:id:' + pId.value)) {
        from_notif.value = true
        localStorage.removeItem('notif:id:' + pId.value)
    }

    
})
  
  </script>
