<template >
    <ion-page >
        <ion-content >
            <div class="global_spinner" >
                <div >
                    <ion-spinner name="crescent" >

                    </ion-spinner>
                </div>
            </div>
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
import {IonPage, IonContent, IonSpinner, onIonViewDidEnter} from "@ionic/vue"
import { useUserStore } from "@/global/pinia"
import { storeToRefs} from "pinia"
import { useRouter } from "vue-router";

const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)

const { user } = userStore
const { update_user } = _userStore
const router = useRouter()



onIonViewDidEnter( async () => {
    await update_user()
    if(user.value) {
        if (!user.value.cur_abn) return router.push('/home')
        return router.push('/tabs/home')
    }
    else return router.push('/welcome')
})

</script>