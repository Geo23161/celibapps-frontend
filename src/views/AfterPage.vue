<template >
    <ion-page >
        <ion-content >
            <div class="global_spinner" >
                <div >
                    <ion-spinner name="crescent" >

                    </ion-spinner>
                </div>
            </div>
            <activ-abon :is-open="step == 'abon'" :is_first="is_first" @close="step = 'must_verif', is_first = false" @done="step = 'must_verif', is_first = false" ></activ-abon>
            <invite-comp :is-open="step == 'must_verif'" @close="step = 'home', router.push('/home')" @done="step = 'verif_now'" @returned="step = 'abon'"  ></invite-comp>
            <verif-comp :is-open="step == 'verif_now'" :profil="f_url(user?.get_profil.get_picture as string)" @close="user?.cur_abn.verif ? (router.push('/home'), step = 'home') : step = 'must_verif'" />
        </ion-content>
    </ion-page>
</template>

<style scoped >
.global_spinner{
    padding-top: 46vh;
    display: flex;
    justify-content: space-around;
}
</style>

<script setup lang="ts" >
import ActivAbon from "@/components/ActivAbon.vue";
import InviteComp from "@/components/InviteComp.vue";
import VerifComp from "@/components/VerifComp.vue";
import { useUserStore } from "@/global/pinia";
import router from "@/router";
import { IonPage, IonContent, IonSpinner } from "@ionic/vue"
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const {user} = userStore
const { f_url } = userStore_
const step = ref("abon")
const abon_typ = computed(() => {
    return user.value?.cur_abn ? user.value.cur_abn.status : 'free' 
})
const is_first = ref(true)

</script>