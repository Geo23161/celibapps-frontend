<template>
    <ion-modal
      mode="ios"
      :is-open="isOpen"
      :breakpoints="[0.25, 0.5, 0.7, 0.8]"
      :initial-breakpoint="0.55"
      @didDismiss="close"
    >
      <ion-content>
        <div class="body">
          <div class="btit">{{ (help as string[])[0] }}</div>
          <div class="img_cont">
            <img v-if="!lvl" :src="'../../imgs/help.svg'" style="width: 60%" />
          </div>
          <div class="btext" v-html="(help as string[])[1]"></div>
        </div>
      </ion-content>
    </ion-modal>
  </template>
  
  <style scoped>
  .butto:active {
    box-shadow: none;
  }
  
  .upload {
    background: #fb4073;
    color: white;
    box-shadow: 0 10px 15px -3px #fb407398, 0 4px 6px -2px #17a74929;
  }
  
  .butto {
    width: 100%;
    padding: 0.7rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 15px;
    margin-top: 0.8rem;
  }
  
  .btext {
    font-size: 1.85vh;
    text-align: center;
    color: white;
  }
  
  .img_cont {
    padding-top: 1.7rem;
    padding-bottom: 0.6rem;
    display: flex;
    justify-content: space-around;
  }
  
  .btit {
    padding-top: 0.3rem;
    font-size: 1.3rem;
    font-weight: bolder;
    text-align: center;
    color: white;
  }
  
  .body {
    height: 100%;
    width: 100%;
    padding: 1rem;
    background-image: linear-gradient(to right, #202020, #110508 60%, #202020);
    font-family: "Poppins";
  }
  </style>
  
  <script lang="ts">
  import { defineComponent, defineEmits } from "vue";
  import { IonModal, IonContent } from "@ionic/vue";
  import { arrowForward } from "ionicons/icons";
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    components: {
      IonModal,
      IonContent,
    },
    props: {
      isOpen: Boolean,
      redirect: String,
      help : Array<String>,
      lvl : Number
    },
    setup(props, ctx) {
      const emits = defineEmits(["close", "done"]);
      const close = () => {
        ctx.emit("close");
      };
      const router = useRouter();

      const launch = () => {
        ctx.emit('done')
      }

      return {
        close,
        router,
        arrowForward,
        launch
      };
    },
  });
  </script>