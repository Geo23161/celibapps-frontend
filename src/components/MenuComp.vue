<template >
    <ion-modal :isOpen="isOpen" :initial-breakpoint="0.4" :breakpoints="[0.25, 0.4, 0.7]" class="newW" >
        <ion-content >
            <div class="bdy_a" >

            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
.newW{
    --background : red;
}
.bdy_a{
    width: 100%;
    height: 100%;
    background-color: transparent;
    backdrop-filter: blur(10px);
}
</style>

<script setup lang="ts" >
    import {IonModal, IonContent} from "@ionic/vue"

    const props = defineProps({
        isOpen : Boolean
    })
</script>