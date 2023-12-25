<template>
  <ion-page>
    <div class="body">
      <div class="header_p" :style="{
        'background-size': 'cover',
        'background-position': 'top center',
        'background-image': `url('${f_url(user?.get_profil.get_picture as string)}')`,
      }">
        <div class="wrapper">
          <button @click="router.back()" class="back">
            <ion-icon :icon="arrowBack" />
          </button>
          <button class="prof">Paramètres</button>
        </div>
      </div>
      <div id="info" class="list first">
        <ion-list mode="ios">
          <ion-list-header>
            <ion-label>Informations et Profil</ion-label>
          </ion-list-header>
          <ion-item @click="router.push('/mon_profil')" button>
            <ion-icon :icon="aperture" slot="start" />
            <ion-label>Modifier mon profil</ion-label>
          </ion-item>
          <ion-item @click="uOpen = true" button>
            <ion-icon :icon="person" slot="start" />
            <ion-label>Modifiez mes informations</ion-label>
          </ion-item>
          <ion-item @click="pOpen = true" button>
            <ion-icon :icon="lockClosedOutline" slot="start" />
            <ion-label style="color: red">Mot de passe</ion-label>
          </ion-item>
        </ion-list>
      </div>
      <div id="match" class="list">
        <ion-list mode="ios">
          <ion-list-header>
            <ion-label>Critère de Rencontre</ion-label>
          </ion-list-header>
          <ion-item @click="iOpen = true" button>
            <ion-icon :icon="star" slot="start" />
            <ion-label>Centres d'intérêts</ion-label>
          </ion-item>
          <ion-item @click="lOpen = true" button>
            <ion-icon :icon="location" slot="start" />
            <ion-label>Place ou lieu </ion-label>
          </ion-item>
          <ion-item>
            <ion-toggle :checked="only_verif" @click.stop="set_only_verified()">
              <ion-label>Ecrire seulement avec</ion-label>
              <ion-note color="medium">des profils vérifiés</ion-note>
            </ion-toggle>
          </ion-item>
        </ion-list>
      </div>
      <div id="abn" class="list">
        <ion-list mode="ios">
          <ion-list-header>
            <ion-label>Abonnement et Avantages</ion-label>
          </ion-list-header>
          <ion-item @click="vOpen = true" button>
            <ion-icon :icon="checkmarkCircle" slot="start" />
            <ion-label>Vérifier mon profil </ion-label>
          </ion-item>
          <ion-item @click="aOpen = true" button>
            <ion-icon :icon="ribbon" slot="start" />
            <ion-label>Abonnement actuel </ion-label>
          </ion-item>
          <ion-item @click="mOpen = true" button>
            <ion-icon :icon="trendingUp" slot="start" />
            <ion-label>Mettre à jour mon abonnement </ion-label>
          </ion-item>

        </ion-list>
      </div>
      <div id="about" class="list">
        <ion-list mode="ios">
          <ion-list-header>
            <ion-label>A propos </ion-label>
          </ion-list-header>
          <ion-item>
            <ion-label class="ion-text-wrap">
              <div style="font-weight: bolder"> Celibapps v1.0 </div>
              <div style="padding-top: 0.3rem">
                L'application Celibapps ainsi que le logo sont des marques déposées par ELife Global.
              </div>
            </ion-label>
          </ion-item>
          <ion-item v-if="contact" @click="open_norm_lnk('https://wa.me/' + contact.whatsapp)" button>
            <ion-avatar slot="start">
              <img :src="'../../imgs/whatsapp.png'" />
            </ion-avatar>
            <ion-label>
              Contactez-nous sur whatsapp
            </ion-label>
          </ion-item>
          <ion-item @click="open_norm_lnk(contact?.privacy as string)" button>
            <ion-label>
              Politique de confidentialité
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </div>
    <my-info :is-open="uOpen" @close="uOpen = false" @done="e => set_info(e)" />
    <passwaord-update :is-open="pOpen" @close="pOpen = false" @done="pOpen = false" />
    <interest-comp :is-open="iOpen" @close="iOpen = false" :existeds="user?.cats" @done="e => set_cats(e)" />
    <location-picker :is-open="lOpen" @close="lOpen = false" @done="e => set_place(e)" />
    <verif-comp :is-open="vOpen" :profil="f_url(user?.get_profil.get_picture as string)" @close="vOpen = false" />
    <cur-abon :is-open="aOpen" @close="aOpen = false" />
    <activ-abon :is-open="mOpen" @close="mOpen = false" @done="mOpen = false"></activ-abon>
  </ion-page>
</template>
  
<style scoped>
.purple {
  color: #fb4073;
}

.red {
  color: red;
}

.mod_bo {
  padding-top: 0.3rem;
  font-weight: bolder;
  font-size: 1.22rem;
}

.mod_tit {
  font-size: 0.9rem;
  font-weight: 600;
}

.romance {
  background: rgb(255, 66, 66);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(255, 66, 66, 0.761),
    0 4px 6px -2px #17a74929;
}

.amis {
  background: green;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 128, 0, 0.782), 0 4px 6px -2px #17a74929;
}

.mod_but {
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  border-radius: 100%;
  margin-right: 0.6rem;
  font-size: 1.6rem;
}

.mode {
  display: flex;
  align-items: center;
}

.first {
  padding-top: 1.4rem !important;
}

.list {
  width: 100%;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}

.prof:active {
  box-shadow: none;
}

.prof {
  position: absolute;
  bottom: 0%;
  right: 0%;
  font-size: 0.9rem;
  font-weight: bolder;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  background: white;
  color: #fb4073;
  box-shadow: 0 10px 15px -3px white, 0 4px 6px -2px #17a74929;
  border-top-left-radius: 10px;
}

.names {
  position: absolute;
  bottom: 0.3rem;
  left: 0.3rem;
  font-size: 1.1rem;
  font-weight: bolder;
  color: white;
}

.back:active {
  background: #fb4073;
}

.back {
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.433);
  color: white;
  font-size: 1.6rem;
}

.wrapper {
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #fb4073bd, transparent);
  position: relative;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.header_p {
  width: 100%;
  height: 30%;
  min-height: 300px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.body {
  margin: 0;
  min-height: 100%;
  width: 100%;
  background: rgb(234, 227, 240);
  color: rgb(38, 38, 38);
  font-family: "Poppins";
  overflow: scroll;
}
</style>
  
<script setup lang="ts">
import {
  arrowBack,
  person,
  lockClosedOutline,
  aperture,
  star,
  location,
  checkmarkCircle,
  ribbon,
  trendingUp
} from "ionicons/icons";
import {
  IonPage,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonAvatar,
  onIonViewWillEnter,
  alertController,
  onIonViewDidEnter,
  IonToggle,
  IonNote
} from "@ionic/vue";
import {
  access_tok,
  presentToast,
  showLoading,
  show_alert,
  store_obj,
} from "@/global/utils";
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import MyInfo from "@/components/MyInfo.vue";
import { computed, ref } from "vue";
import PasswaordUpdate from "@/components/PasswaordUpdate.vue";
import { Cats } from "@/global/types";
import InterestComp from "@/components/InterestComp.vue";
import LocationPicker from "@/components/LocationPicker.vue";
import VerifComp from "@/components/VerifComp.vue";
import CurAbon from "@/components/CurAbon.vue";
import ActivAbon from "@/components/ActivAbon.vue";
import { StatusBar } from "@capacitor/status-bar"

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { user } = userStore
const { f_url } = userStore_
const router = useRouter()
const uOpen = ref(false)
const pOpen = ref(false)
const iOpen = ref(false)
const lOpen = ref(false)
const aOpen = ref(false)
const mOpen = ref(false)
const vOpen = ref(false)

const set_info = async (obj: any) => {
  const load = await showLoading('Sauvegarde...')
  try {
    const resp = await axios.post('api/set_info/', obj, {
      headers: {
        Authorization: `Bearer ${await access_tok(router, load)}`
      }
    })
    if (resp.data['done']) {
      user.value = resp.data['result']
      load.dismiss()
      uOpen.value = false
      presentToast("bottom", "Informations enregistrées avec succès", "success", 5000)
    }
  } catch (e) {
    await show_alert('Sauvegarde impossible', "Une erreur est survenue lors de la sauvegarde, veuillez fermer et ouvrir à nouveau l'application.")
    load.dismiss()
  }

}

const set_cats = async (cats: Cats[]) => {
  const load = await showLoading('Enregistrement...')
  try {
    const pks = []
    for (const cat of cats) pks.push(cat.id)
    const resp = await axios.post('api/set_cats/', {
      pks: JSON.stringify(pks)
    }, {
      headers: {
        Authorization: `Bearer ${await access_tok(router, load)}`
      }
    })
    if (resp.data['done']) {
      user.value = resp.data['result']
      load.dismiss()
      iOpen.value = false
      presentToast('bottom', "Centres d'intérêts ajoutés avec succès.")
    }
  } catch (e) {
    load.dismiss()
    show_alert('', "Une erreur est survenue lors de l'enregistrement, veuillez reéssayer.")
  }
}

const set_place = async (place: any) => {
  const load = await showLoading('Patientez...')
  try {
    const resp = await axios.post('api/set_place/', {
      place: JSON.stringify(place)
    }, {
      headers: {
        Authorization: `Bearer ${await access_tok(router, load)}`
      }
    })
    if (resp.data['done']) load.dismiss()
  } catch (e) {
    console.log(e)
    show_alert('Erreur inattendue', "Une erreur est survenue lors de l'enregistrement, veuillez reéssayer.")
  }
  lOpen.value = false
}

const contact = ref<{ whatsapp: string, privacy: string }>()
const get_contact = async () => {
  const resp = await axios.get('api/get_contact/', {
    headers: {
      Authorization: `Bearer ${await access_tok(router, undefined)}`
    }
  })
  if (resp.data['done']) {
    contact.value = resp.data['result']
  }
}
get_contact()

const open_norm_lnk = (lnk: string) => {
  window.location.href = lnk;
};
const route = useRoute()

onIonViewDidEnter(() => {
  const target = route.query['target'] as string
  setTimeout(() => {
    if (target) {
      if (target == 'activ_abn') {
        mOpen.value = true
      } else if (target == 'cur_abn') {
        aOpen.value = true
      }
    }
  }, 600)

  const set_bar = () => {
    StatusBar.setBackgroundColor({ color: "#fb4073" })
  }

  set_bar()
})

const only_verif = computed(() => {
  return user.value?.only_verified
})



const set_only_verified = async () => {
  const load = await showLoading('Enregistrement...')
  try {
    const resp = await axios.get('api/only_verified/', {
      headers: {
        Authorization: `Bearer ${await access_tok(router, load)}`
      }
    })
    if (resp.data['done'] && user.value) {
      user.value.only_verified = resp.data['result']
    }
  } catch (e) {
    await show_alert('Erreur inattendue', "Une erreur est survenue lors de l'enregistrement, veuillez reéssayer.")
  }
  load.dismiss()
}


</script>