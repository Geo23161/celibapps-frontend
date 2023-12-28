<template >
    <ion-modal :isOpen="isOpen" :breakpoints="[0.4, 0.75]" :initial-breakpoint="0.4" @didDismiss="close_" >
        <ion-content >
            <div class="body" >
                <div v-if="abn" class="sbody" >
                    <div class="header" >
                        Mon Ticket
                    </div>
                    <div  class="i_tem" >
                        <div class="i_name" >
                            Etat
                        </div>
                        <div class="i_body" >
                            <div style="display: flex; align-items: center; " >
                                <div style="width: 1vh; height: 1vh; border-radius: 100%; margin-right: 0.5rem;" :style="{
                                    backgroundColor: abn.is_on ? 'green' : 'red'
                                }" >

                                </div>
                                <div >
                                    {{ abn.is_on ? 'Actif' : 'Expiré' }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="i_tem" >
                        <div class="i_name" >
                            Type
                        </div>
                        <div class="i_body" >
                            <user-badge :status="abn.status" :width="'3.1vh'" :height="'3.1vh'" :size="'2.1vh'" /> {{ typ }}
                        </div>
                    </div>
                    <div class="i_tem" >
                        <div class="i_name" >
                            Date 
                        </div>
                        <div class="i_body" >
                            {{ format_date(toDate(abn.created_at)) }}
                        </div>
                    </div>
                    <div class="i_tem" >
                        <div class="i_name" >
                            Ref ID
                        </div>
                        <div class="i_body" >
                            N° CTCK{{ abn.id }}
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
.i_body{
    font-size: 2.3vh;
    color: rgb(37, 37, 37);
}
.i_name{
    font-size: 2.3vh;
    color: rgb(95, 95, 95);
}
.i_tem{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5vh 0rem;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: rgb(175, 175, 175);
}
.header{
    text-align: center;
    font-size: 2.5vh;
}
.sbody {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
}

.body {
    min-height: 100vh;
    width: 100%;
    padding: 10px;
    background-image: linear-gradient(to right, #f5f3fd, #e9e4ff 60%, #f5f3fd);
    font-family: "Poppins";
    overflow: scroll;
}
</style>

<script setup lang="ts" >
    import { useUserStore } from "@/global/pinia";
import { IonModal, IonContent } from "@ionic/vue"
import { format_date, toDate } from "@/global/utils"
import { storeToRefs } from "pinia";
import { computed } from "vue";
import UserBadge from "./UserBadge.vue";
    const userStore_ = useUserStore()
    const userStore = storeToRefs(userStore_)
    const { user } = userStore

    const emit = defineEmits(['close'])

    const props = defineProps({
        isOpen : Boolean
    })

    const abn = computed(() => {
        if (!user.value) return ;
        return user.value.cur_abn
    })

    const close_ = () => {
        emit('close')
    }

    const typ = computed(() => {
        if(abn.value?.status == 'free') {
            return 'Gratuit'
        } else if(abn.value?.status == 'silver') {
            return 'Silver'
        } else if(abn.value?.status == 'silver_plus') {
            return 'Silver+'
        }
         else if(abn.value?.status == 'golden') {
            return 'Golden'
        } else {
            return 'VIP'
        }
    })
</script>