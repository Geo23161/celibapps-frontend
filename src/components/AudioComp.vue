<template>
    <ion-modal
      mode="ios"
      :is-open="isOpen"
      :breakpoints="[0.25]"
      :initial-breakpoint="0.25"
      @didDismiss="close"
    >
      <div class="reader">
        <div class="header">
          <button class="indic pulse">
            <ion-icon style="position: relative; top: 2px" :icon="micCircle" />
          </button>
          <div class="title">{{name}}</div>
          <button @click="close()" class="closs">
            <ion-icon style="position: relative; top: 2px" :icon="clos" />
          </button>
        </div>
        <div class="audio">
          <button @click="toogle_playing()" class="plays">
            <ion-icon :icon=" is_playing ? pause : play" />
          </button>
          <div class="range">
            <ion-range :value="parseInt(myval)" @ionChange="handleChange" mode="md"></ion-range>
            <div class="details">
              <div>{{ current_a }}</div>
              <div>{{ total_a }}</div>
            </div>
          </div>
        </div>
      </div>
    </ion-modal>
  </template>
  
  <style scoped>
  .details {
    display: flex;
    justify-content: space-between;
    font-size: 0.73rem;
    color: rgb(97, 97, 97);
    margin-top: -10px;
  }
  
  ion-range {
    --bar-background-active: #7759ff;
    --knob-background: #7759ff;
    --knob-size: 12px;
  }
  
  .range {
    flex-grow: 1;
    padding: 0.4rem;
  }
  
  .plays {
    width: 45px;
    height: 45px;
    min-width: 45px;
    min-height: 45px;
    border-radius: 100%;
    font-size: 1.5rem;
    color: #7759ff;
  }
  
  .audio {
    margin-top: 0.8rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    display: flex;
    align-items: center;
    border-style: solid;
    border-width: 0.5px;
    border-color: rgb(41, 41, 44);
    border-radius: 15px;
  }
  
  .pulse {
    animation: pulse-animation 2s infinite;
  }
  
  @keyframes pulse-animation {
    0% {
      box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
    }
    100% {
      box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
    }
  }
  
  .title {
    font-size: 1.1rem;
    font-weight: bolder;
    color: rgb(41, 41, 41);
  }
  
  .closs {
    width: 35px;
    height: 35px;
    min-width: 35px;
    min-height: 35px;
    border-radius: 100%;
    background-color: #ff4242;
    color: white;
    margin-left: 0.8rem;
    font-size: 1.3rem;
  }
  
  .indic {
    width: 35px;
    height: 35px;
    min-width: 35px;
    min-height: 35px;
    border-radius: 100%;
    background-color: #7759ff;
    margin-right: 0.8rem;
    box-shadow: 0px 0px 1px 1px #0000001a;
    color: white;
    font-size: 1.3rem;
  }
  
  .theader {
    display: flex;
    align-items: center;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.3rem;
  }
  
  .reader {
    width: 100%;
    padding: 0.8rem;
    font-family: "Poppins";
  }
  </style>
  
  <script lang="ts">
  import { computed, defineComponent, defineEmits, ref, toRef, watch, Ref } from "vue";
  import { IonModal, IonContent, IonRange } from "@ionic/vue";
  import { micCircle, close as clos, play, pause } from "ionicons/icons";
  
  export default defineComponent({
    props: {
      isOpen: Boolean,
      sound: String,
      name : String,
      dur : String,
    },
    components: {
      IonModal,
      IonRange
    },
    setup(props, ctx) {
      const emits = defineEmits(["close"]);
      const close = () => {
        ctx.emit("close");
      };
      const dur = toRef(props, "dur") as Ref<string>
      const myval = ref("0");
      const is_op = toRef(props, "isOpen");
      const sound = toRef(props, "sound");
      const is_playing = ref(false);
      const current_a = ref("00:00");
      const duration = ref(0);
      let audio_interval : NodeJS.Timer | number = 0;
      const total_a = computed(() => {
        return get_time_format(duration.value);
      });
      const get_time_format = (time: number) => {
        let minutes: string | number = Math.floor(time / 60);
        let seconds: string | number = Math.floor(time - minutes * 60);
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        return `${minutes}:${seconds}`;
      };
      const audio = ref<HTMLAudioElement>();
      watch(is_op, (newop, oldop) => {
        if (newop) {
          duration.value = parseInt(dur.value)
          setTimeout(() => {
            const audi = new Audio(sound.value);
            audio.value = audi;
            audio.value.addEventListener("pause", () => {
              is_playing.value = false;
            });
            audio.value.addEventListener("ended", () => {
              is_playing.value = false;
              current_a.value = "00:00";
            });
            audio.value.addEventListener("play", () => {
              is_playing.value = true;
            });
            audio.value.addEventListener("playing", () => {
              is_playing.value = true;
            });
            audio.value.addEventListener("loadedmetadata", () => {
              setTimeout(() => {
                audio.value?.play()
              }, 400)
            });
            audio.value.addEventListener("durationchange", () => {
  
              if (audio.value?.duration != Infinity && audio.value) {
                duration.value = audio.value.duration;
              }
            });
          }, 50);
        } else {
          audio.value?.pause()
  
        }
      });
  
      audio_interval = setInterval(() => {
        if (is_playing.value && audio.value) {
          current_a.value = get_time_format(audio.value.currentTime as number);
          myval.value = (
            (audio.value.currentTime / duration.value) *
            100
          ).toString();
        }
      }, 1000);
      const set_current = (val: string) => {
        if (audio.value) {
          audio.value.currentTime = (parseInt(val) / 100) * duration.value;
        }
      };
      const toogle_playing = () => {
        if (audio.value) {
          if (!is_playing.value) audio.value.play();
          else {
            audio.value.pause();
          }
        }
      };
      const handleChange = (e : any) => {
        const { detail } = e
        set_current(detail.value)
      }
      return {
        emits,
        close,
        micCircle,
        clos,
        play,
        pause,
        toogle_playing,
        total_a,
        current_a,
        myval,
        set_current,
        is_playing,
        handleChange
      };
    },
  });
  </script>