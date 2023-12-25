<template>
  <ion-modal :is-open="isOpen">
    <ion-content>
      <div class="body">
        <button @click="close_()" class="round_bt retour bg_red">
          <ion-icon :icon="close" />
        </button>
        <button @click="done()" class="sbut valid" :class="{ prof: cats.length }">
          Valider
        </button>
        <div v-if="all_cats.length">
          <div class="heade">Choisissez vos centres d'intérêts</div>
          <div class="cats">
            <div v-for="c in all_cats" :key="c.id" @click="addOrRemoveCat(c.id)" class="item sep">
              <div class="cat">
                <div class="cat_img" style="
                      background-image: url('../../imgs/before.jpg');
                      background-size: cover;
                      background-position: top center;
                    "></div>
              </div>
              <div class="cat_cont">
                {{ c.name }}
              </div>
              <div style="padding-top: 4px">
                <ion-checkbox mode="ios" :checked="cats.filter((e) => e.id == c.id).length > 0"></ion-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="global_spinner">
          <div>
            <ion-spinner :color="'light'"  name="crescent">

            </ion-spinner>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.global_spinner{
    padding-top: 46vh;
    display: flex;
    justify-content: space-around;
}
.undo {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: rgb(255, 91, 91);
  color: white;
  font-size: 1.3rem;
  position: absolute;
  top: 50%;
  left: 3%;
  margin-top: -20px;
  z-index: 100;
  box-shadow: 0 10px 15px -3px rgb(255, 91, 91), 0 4px 6px -2px #17a74929;
}

.bg_red {
  background: #fb4073;
  color: white;
  box-shadow: 0 10px 15px -3px #fb40737b, 0 4px 6px -2px #17a74929;
}

.h_bot {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.h_cont {
  padding-bottom: 0.8rem;
  padding-top: 0.6rem;
  font-size: 0.93rem;
  font-weight: bolder;
  text-align: center;
}

.rheader {
  margin-top: 30px;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  margin-bottom: 0.6rem;
  padding-left: 0.9rem;
  padding-right: 0.9rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-radius: 15px;
  border-width: 3px;
  border-style: solid;
  border-color: rgb(234, 227, 240);
  transition: all 0.2s ease-in-out;
  background: linear-gradient(to right, #120c2b, #fb407369);
}

.prof {
  background: #fb4073;
  color: white;
  box-shadow: 0 10px 15px -3px #fb4073b4, 0 4px 6px -2px #17a74929;
}

.valid {
  position: absolute;
  top: 15px;
  right: 15px;
}

.sbut:active {
  box-shadow: none;
}

.sbut {
  padding-right: 0.6rem;
  padding-left: 0.6rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 10px;
  z-index: 100;
}

.cat_cont {
  flex-grow: 1;
  min-width: 0%;
  font-weight: bolder;
  text-align: center;
  font-weight: bolder;
}

.cat_img {
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  border-radius: 100%;
}

.cat {
  display: flex;

  align-items: center;
  min-width: 0%;
}

.item:active {
  background: #c4bde193;
}

.item {
  width: 100%;
  background: #1e1d22af;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem;
}

.sep {
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
}

.cats {
  padding-top: 1.3rem;
  padding-right: 1.4rem;
  padding-left: 1.4rem;
  padding-bottom: 2rem;
}

.heade {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 4rem;
  font-size: 1.1rem;
  font-weight: bolder;
  text-align: center;
}

.retour {
  position: absolute;
  top: 15px;
  left: 15px;
}

.is_profil {
  position: absolute;
  top: 15px;
  right: 15px;
}

.round_bt:active {
  background: #1e1d22af;
}

.norm {
  color: rgb(234, 227, 240);
  background: #110c26;
}

.notline_ {
  border-style: solid;
  border-width: 3px;
  border-color: red;
  box-shadow: 0 10px 15px -3px rgba(255, 0, 0, 0.529), 0 4px 6px -2px #17a74929;
}

.online_ {
  border-style: solid;
  border-width: 3px;
  border-color: green;
  box-shadow: 0 10px 15px -3px rgba(0, 128, 0, 0.508), 0 4px 6px -2px #17a74929;
}

.profil_line {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.round_bt {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  font-size: 1.3rem;
}

.body {
  margin: 0;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #120c2b;
  font-family: "Poppins";
  color: rgb(234, 227, 240);
}
</style>
  
<script setup lang="ts">
import { IonModal, IonContent, IonSpinner } from "@ionic/vue"
import { close } from "ionicons/icons";
import { ref, toRef, watch } from "vue";
import { Cats } from "@/global/types"
import axios from "axios";
import { access_tok, show_alert } from "@/global/utils";
import { useRouter } from "vue-router";

const props = defineProps({
  isOpen: Boolean,
  existeds : Array<Cats>
})
const is_op = toRef(props, 'isOpen')
watch(is_op, (newi, oldi) => {
  if(props.existeds) cats.value = props.existeds
})
const emit = defineEmits(['close', 'done'])
const close_ = () => {
  emit('close')
}

const done = () => {
  emit('done', cats.value)
}

const all_cats = ref<Cats[]>([])
const cats = ref<Cats[]>([])
const router = useRouter()
const get_cats = async () => {

  try {
    const resp =  await axios.get('api/get_cats/')
  if(resp.data['done']) all_cats.value = resp.data['result']                                                                                       
  }catch(e) {
    console.log(e)
    show_alert('Erreur inattendue', "Une erreur est survenue, veuillez reéssayer.")
  }

  
}

const addOrRemoveCat = (id : number) => {
      if(cats.value.filter(e => e.id == id).length) {
        cats.value = cats.value.filter(e => e.id != id)
      } else {
        cats.value.push(all_cats.value.filter(e => e.id == id)[0])
      }
}

get_cats()
</script>