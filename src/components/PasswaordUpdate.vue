<template>
    <ion-modal :is-open="isOpen">
        <ion-content class="gbody" >
            <div class="body">
                <div class="sbody">
                    <div class="header">
                        <div class="menu" @click="close()">
                            <ion-icon :icon="arrowBack" />
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 1.1rem">
                                Mot de passe
                            </div>
                        </div>
                    </div>
                    <div class="mbody">
                        <div class="mtitle">Entrez le nouveau mot de passe</div>
                        <div style="padding-top: 0.8rem; padding-bottom: 0.8rem">
                            <img style="width: 100%" :src="'../../imgs/password.svg'" />
                        </div>
                        <div class="">
                            <div class="sep">
                                <ion-input class="custom" required placeholder="nouveau..." type="password"
                                    @ionInput="(e) => (npassword = e.target.value as string)" />
                            </div>
                            <div class="sep">
                                <ion-input class="custom" placeholder="ancien..." required type="password"
                                    @ionInput="(e) => (opassword = e.target.value as string)" />
                            </div>
                        </div>
                        <div style="padding-top: 0.1rem; padding-bottom: 1rem">
                            <div class="upl" @click="set_password()" >
                                <div style="font-size: 1.4rem; margin-right: 0.5rem">
                                    <ion-icon :icon="checkbox" />
                                </div>
                                <div>Changer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>
  
<style scoped>
.gbody {
    --background: linear-gradient(to right, #f5f3fd, #e9e4ff 60%, #f5f3fd);
}
.upl:active {
    background: #9c86ff;
}

.upl {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.4rem;
    border-radius: 15px;
    background-color: #fb4073;
    color: white;
}

ion-input.custom {
    --background: #ffffff;
    --color: rgb(41, 41, 44);
    --placeholder-color: rgb(41, 41, 44);
    --placeholder-opacity: 0.6;
    --padding-bottom: 20px;
    --padding-end: 15px;
    --padding-start: 15px;
    --padding-top: 20px;
    --placeholder-font-weight: bold;
    border-radius: 15px;
}

.sep {
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
}

.mtitle {
    font-size: 2.2vh;
    font-weight: bold;
    text-align: center;
    padding: 1rem;
}

.mbody {
    padding-top: 3.5vh;
}

.menu:active,
.menu_:active {
    box-shadow: none;
    background: white;
    color: #fb4073;
}

.menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #fb4073;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #fb407365, 0 4px 6px -2px #17a74929;
}

.header {
    padding-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sbody {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2rem;
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
  
<script lang="ts">
import { close, camera, arrowBack, checkbox, eyeOff } from "ionicons/icons";
import { defineComponent, defineEmits, ref } from "vue";
import { IonModal, IonContent, IonIcon, IonInput } from "@ionic/vue";
import { access_tok, presentToast, showLoading, show_alert } from "@/global/utils";
import axios from "axios";
import { useRouter } from "vue-router";
export default defineComponent({
    props: {
        isOpen: Boolean,
    },
    components: {
        IonModal,
        IonContent,
        IonIcon,
        IonInput
    },
    setup(props, ctx) {
        const emits = defineEmits(["clos", "done"]);
        const npassword = ref("");
        const opassword = ref("");
        const close = () => {
            ctx.emit("close");
        };
        const done = () => {
            ctx.emit("done");
        };
        const router = useRouter();
        const set_password = async () => {
            const load = await showLoading("Loading...");
            const resp = await axios.post("api/set_password/", {
                newpass: npassword.value,
                oldpass: opassword.value
            }, {
                headers: {
                    Authorization: `Bearer ${await access_tok(router, load)}`,
                },
            });
            if (resp.data['done']) {
                done()
                presentToast('bottom', "Mots de passe mis à jour!")
            } else {
                presentToast('top', "Mot de passe incorrecte", "danger")
            }
            load.dismiss()
        };
        return {
            done,
            close,
            arrowBack,
            npassword,
            opassword,
            checkbox,
            eyeOff,
            set_password
        };
    },
});
</script>