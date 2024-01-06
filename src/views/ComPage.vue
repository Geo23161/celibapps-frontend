<template >
    <ion-page>
        <ion-content :scroll-y="false" >
            <div class="com_body">
                <div class="real_body">
                    <div style="display: flex; justify-content: space-around; padding-top: 2vh; padding-bottom: 2vh;">
                        <img style="width: 7vh; border-radius: 10px;" :src="'../../imgs/foreground.png'" />
                    </div>
                    <ion-segment :mode="'md'" :value="section">
                        <ion-segment-button @click="section = 'all'" style="color: white !important;" value="all">
                            <ion-label>Tout</ion-label>
                        </ion-segment-button>
                        <ion-segment-button @click="section = 'my'" style="color: white !important;" value="my">
                            <ion-label>Moi</ion-label>
                        </ion-segment-button>
                    </ion-segment>
                    <div v-if="oa_post" @click="section = 'all', starter(true)" style="width: 100%; padding: 1vh 3vh; text-align: center; color: white; font-size: 2vh; font-weight : 600; padding-top: .3vh !important; " class="is_upoo refress" >
                        <ion-icon :icon="refreshCircle" style="font-size: 3vh; position: relative; top: .7vh;" /> Nouveaux posts
                    </div>
                    <div v-if="r_posts.length || global_loading" id="containers" style="overflow: scroll; position: relative;">
                        <div>
                            <div v-for="p in r_posts" :key="p.id" class="post">
                                <div>
                                    <div class="imgtop" :style="{
                                        backgroundImage: `url('${p.user.get_picture}')`,
                                    }">
                                        <div v-if="p.is_anonymous"
                                            style="width: 100%; height: 100%; border-radius: 100%; background-color: transparent; backdrop-filter: blur(8px);">

                                        </div>
                                    </div>
                                </div>
                                <div class="p_body">
                                    <div class="p_header">
                                        <div style="flex-grow: 1;">
                                            <div
                                                style="font-weight: bolder; color: #fc1955; font-size: 2.2vh; padding-bottom: 0vh;">
                                                {{ p.is_anonymous ? 'Anonyme' : p.user.prenom }}
                                            </div>
                                            <div style=" color: rgb(107, 107, 107); font-size: 1.5vh;">
                                                {{ getDurationSince(toDate(p.user.created_at)) }}
                                            </div>
                                        </div>
                                        <button @click="open_menu(p)" class="p_menu">
                                            <ion-icon :icon="ellipsisVerticalOutline"
                                                style="color: white; font-size: 6vw;" />
                                        </button>
                                    </div>
                                    <div v-if="p.text" class="p_text">
                                        {{ get_text(p.text, p) }} <span v-if="p.text.length > 100"
                                            style="font-weight: bold; color: #fc1955;"
                                            @click="court.includes(p.id) ? (court = court.filter(e => e != p.id)) : court.push(p.id)">Voir
                                            {{ court.includes(p.id) ? 'moins' : 'plus' }}</span>
                                    </div>
                                    <div v-if="p.get_image " class="h_txt" >
                                        <img @click="click_id(p.id + ':img')" class="imgfull" :src="p.get_image" />
                                    </div>
                                    <div class="p_interac">
                                        <button @click="likes_fact(p)" class="pp_icon">
                                            <ion-icon :icon="p.i_like ? heart : heartOutline" style="font-size: 5vw;" />
                                            <span style="font-size: 3vw; position: relative; bottom: 1.5vw;">{{ p.get_likes
                                            }}</span>
                                        </button>
                                        <button @click="open_post(p)" class="pp_icon">
                                            <ion-icon :icon="p.i_comment ? chatbox : chatboxOutline"
                                                style="font-size: 5vw;" /> <span
                                                style="font-size: 3vw; position: relative; bottom: 1.5vw;">{{ p.get_comments
                                                }}</span>
                                        </button>
                                        <div style="font-size: 1.8vh; font-weight: bold; color: white;">
                                            {{ findTime(p.created_at) }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div v-if="global_loading">
                            <div style="display: flex; justify-content: center; padding-top: 4vh;">
                                <div>
                                    <ion-spinner :name="'circles'" style="color: white;" ></ion-spinner>
                                </div>
                            </div>
                        </div>
                        <button v-if="!is_writing" @click="is_writing = true" class="w_button">
                            <ion-icon :icon="pencil" style="font-size: 3vh;" />
                        </button>
                    </div>
                    <div v-else style="overflow: scroll; position: relative; flex-grow: 1;">
                        <div>
                            <div style="display: flex; justify-content: space-around; padding-top: 21.24vw;">
                                <img :src="'../../imgs/noti.svg'" style="width: 50vw;" />
                            </div>
                            <div style="text-align: center;padding-top: 1.77vw; font-size: 4.425vw; color: white;">
                                Aucun post trouvé
                            </div>
                            <button v-if="!is_writing" @click="is_writing = true" class="w_button">
                                <ion-icon :icon="pencil" style="font-size: 3vh;" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tabmenu" style="background-color: rgba(39, 39, 39) !important; border-radius: 0px !important;">
                    <div class="tabm">
                        <button @click="router.push('/tabs/home')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="albums" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button v-if="has_new" class="alert_b alert_colo">

                        </button>
                        <button @click="router.push('/tabs/chat')" class="tabbut seco"
                            :class="{ accused: has_new || (counter % 2 && has_new_notifs) }">
                            <ion-icon style="font-size: 2.2vh;" :icon="chatbox" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/lov')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="heartHalf" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/mon_profil')" class="tabbut tabhome">
                            <ion-icon style="font-size: 2.2vh;" :icon="newspaper" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/param')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="settings" />
                        </button>
                    </div>
                </div>
                <div class="add_post" :class="{ hide_adding: !is_writing }">
                    <div class="r_post">
                        <div class="title_h">
                            <div style="font-size: 2.3vh; ">
                                Dire quelque chose
                            </div>
                            <button @click="is_writing = false" class="close_as">
                                <ion-icon :icon="close" style="color: white; font-size: 3vh;" />
                            </button>
                        </div>
                        <div @input="set_text" class="my__in editable-div"
                            contenteditable="true" data-placeholder="Ecrivez ici...">

                        </div>
                        <div class="img_as">
                            <div style="font-size: 2.2vh; color: white; font-weight: bold;">
                                Ajouter une image<br>
                            </div>
                            <button v-if="!image" @click="click_id('myfilei')" class="imgg_a">
                                <ion-icon :icon="add" style="font-size: 10vw; color: white;" />
                            </button>
                            <div v-else class="add_imgg" :style="{
                                backgroundImage: `url('${image_url}')`
                            }">

                            </div>
                        </div>
                        <button @click="create_post()" class="send_aa" :class="{ is_upoo : text != '' || image, is_norm : !(text != '' || image) }" >
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
            <div style="display: none;">
                <input type="file" accept="image/*" id="myfilei" @change="e => set_profil((e.target as any).files[0])" />
            </div>
            <div v-show="false">
                        <photo-provider>
                            <photo-consumer v-for="img in r_posts" :key="img.id" :intro="'Celibapps'" :src="img.get_image">
                                <img :src="img.get_image" :id="img.id + ':img'" style="width: 40vw:" class="view-box" />
                            </photo-consumer>
                        </photo-provider>
                    </div>
            <ion-action-sheet :is-open="aOpen" header="Menu" :buttons="actionSheetButtons"
                @didDismiss="aOpen = false"></ion-action-sheet>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.add_imgg {
    width: 25vw;
    height: 25vw;
    border-radius: 15px;
    background-position: top center;
    background-size: cover;
}

.hide_adding {
    transform: translateY(80vh);
}

.is_norm:active {
   background-color: rgb(38, 38, 38);
}

.is_norm {
    background-color: rgb(34, 34, 34);
}

.refress:active {
	background-color: rgb(34, 34, 34);
}

.is_upoo {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
}

.send_aa {
    display: block;
    width: 100%;
    padding: 1.8vh;
    border-radius: 15px;
    font-size: 2.2vh;
    font-weight: bold;
    margin-top: 2vh;
    color: white;
}

.imgg_a:active {
    background-color: rgb(41, 41, 41);
}

.imgg_a {
    width: 25vw;
    height: 25vw;
    background-color: rgb(34, 34, 34);
    border-radius: 15px;

}

.img_as {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.6vh;
}

*:focus {
    outline: none;
}

.editable-div:empty:before {
    content: attr(data-placeholder);
    color: #aaa;
    position: absolute;
    top: 2vh;
    left: 2vh;
    pointer-events: none;
    font-size: 2.2vh;
}

.my__in {
    width: 100%;
    flex-grow: 1;
    border-radius: 15px;
    background-color: rgb(34, 34, 34);
    margin-top: .6vh;
    min-height: 50px;
    position: relative;
    padding: 2vh 2vh;
    font-size: 2.2vh;
}

.close_as:active {
    background-color: rgb(29, 29, 29);
}

.close_as {
    width: 5vh;
    height: 5vh;
    border-radius: 100%;
    background-color: transparent;
}

.title_h {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.r_post {
    width: 90vw;
    height: 60vh;
    border-radius: 20px;
    background-color: rgb(48, 48, 48);
    padding: 1.5vh 2vh;
    color: white;
    display: flex;
    flex-direction: column;

}

.add_post {
    position: absolute;
    bottom: 0vh;
    width: 100%;
    height: 70vh;
    padding-left: 5vw;
    transition: all 1s ease-in-out;
}

.w_button {
    position: fixed;
    bottom: 10vh;
    right: 3vh;
    width: 6.8vh;
    height: 6.8vh;
    border-radius: 100%;
    background-color: white;
    box-shadow: 0 10px 15px -3px #fffffff5, 0 4px 6px -2px #17a74929;
    color: rgb(58, 58, 58);
}

.imgfull {
    border-radius: 15px;
    width: 100%;
}

.h_txt {
    padding-top: 1vh;
}

.pp_icon:active {
    background-color: rgb(48, 48, 48);
}

.pp_icon {
    border-radius: 10px;
    width: 12.5vw;
    height: 8vw;
    color: white;
    background-color: transparent;
}

.p_interac {
    padding: 0.8vh 1.2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0vh !important;
    padding-top: 1vh !important;
}

.p_text {
    padding-top: .8vh;
    font-size: 2vh;
    color: white;
}

.p_menu:active {
    background-color: rgb(58, 58, 58);
}

.p_menu {
    width: 8vw;
    height: 11vw;
    border-radius: 10px;
    display: block;
    background-color: transparent;
}

.p_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.4vh;
}

.p_body {
    flex-grow: 1;
}

.imgtop {
    width: 12vw;
    height: 12vw;
    min-width: 12vw;
    min-height: 12vw;
    border-radius: 100%;
    background-size: cover;
    background-position: top center;
    margin-right: 1.5vh;
    position: relative;
}

.post {
    padding: 2vh 2vh;
    display: flex;
    width: 100%;
    border-bottom-color: rgb(59, 59, 59);
    border-bottom-width: 2px;
    border-bottom-style: solid;
}

.real_body {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    min-height: 0%;
    display: flex;
    flex-direction: column;
}

.com_body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgb(29, 29, 29);
    font-family: 'Poppins';
    overflow: hidden;
}
</style>

<script setup lang="ts" >
import { useUserStore } from "@/global/pinia";
import { access_tok, getDurationSince, presentToast, showLoading, show_alert, toDate, findTime } from "@/global/utils";
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonIcon, IonActionSheet, ActionSheetButton, ActionSheetOptions } from "@ionic/vue"
import axios from "axios";
import { albums, chatbox, chatboxOutline, ellipseOutline, ellipsisVertical, ellipsisVerticalOutline, heartHalf, heartOutline, newspaper, settings, shareSocial, shareSocialOutline, heart, paperPlane, brush, pencil, close, add, open, exit, personRemove, refreshCircle } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router"

const router = useRouter()
const aOpen = ref(false)

const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)
const { user, has_new, has_new_notifs, has_post } = userStore

const counter = ref(0)
setInterval(() => {
    counter.value++;
}, 800)

const posts = ref<any[]>([])
const my_posts = ref<any[]>([])
const section = ref('all')
watch(section, (news, olds) => {
	starter(true)
})

const r_posts = computed(() => {
    return section.value == 'all' ? posts.value : my_posts.value
})
const global_loading = ref(false)

const court = ref<number[]>([])

const get_text = (text: string, p : any) => {
    return text.length <= 100 ? text : (court.value.includes(p.id) ? text + " " : text.slice(0, 101) + '...')
}

const excepts = computed(() => {
    const exx = [] as number[]
    for (const p of r_posts.value) {
        exx.push(p.id)
    }
    return exx
})

const is_writing = ref(false)

const get_posts = async () => {
    global_loading.value = true
    const resp = await axios.post('api/get_posts/', {
        excepts: JSON.stringify(excepts.value)
    }, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`,
            "Content-Type": "multipart/form-data"
        },
    })
    if (resp.data['done']) {
        posts.value = posts.value.concat(resp.data['result'])
        if (!resp.data['result'].length) emptys.value.push('all')
    }
    
    global_loading.value = false
}

const emptys = ref<string[]>([])


const get_my_posts = async () => {
    global_loading.value = true
    const resp = await axios.post('api/get_my_posts/', {
        excepts: JSON.stringify(excepts.value)
    }, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`,
            "Content-Type": "multipart/form-data"
        },
    })
    if (resp.data['done']) {
        my_posts.value = posts.value.concat(resp.data['result'])
        if (!resp.data['result'].length) emptys.value.push('my')
    }
    global_loading.value = false
}
const oa_post = ref(false)

watch(has_post, (newh, oldh) => {
    if(!blocking.value) oa_post.value = newh
})

const starter = async (is_new = false) => {
if(is_new) posts.value = [], my_posts.value = [];
    has_post.value = false
    section.value == 'all' ? (await get_posts()) : (await get_my_posts())
}
starter()

const cur_post = ref()
const open_menu = (p: any) => {
    cur_post.value = p
    aOpen.value = true
}

const signal_post = async (p: any) => {
    const load = await showLoading('Patientez...')
    try {
        const resp = await axios.get('api/signaler_user/' + p.user.id + '/?post=' + p.id, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`,
            },
        })
        await presentToast('bottom', "Nous avons enregistrer avec succès votre demande. Merci")
    } catch {
        await show_alert('Erreur imprévue', "Une erreur est survenue, veuillez reéssayer plus tard.")
    }

    load.dismiss()
}

const exil_post = async (p: any) => {
    const load = await showLoading('Patientez...')
    try {
        const resp = await axios.get('api/exile_post/' + p.id + '/', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`,
            },
        })
        await presentToast('bottom', "Nous avons enregistrer avec succès votre demande. Merci");
        (section.value == 'all' ? posts : my_posts).value = (section.value == 'all' ? posts : my_posts).value.filter(e => e.id != p.id);
    } catch(e) {
    	console.log(e)
        await show_alert('Erreur imprévue', "Une erreur est survenue, veuillez reéssayer plus tard.")
    }

    load.dismiss()
}

const actionSheetButtons: ActionSheetButton[] = [
    {
        text: "Voir les commentaires",
        icon: open,
        handler: () => {
            open_post(cur_post.value)
        },

    },
    {
        text: "Ne plus me montrer",
        icon: exit,
        handler() {
            exil_post(cur_post.value)
        },
    },
    {
        text: "Signaler ce post",
        icon: personRemove,
        handler() {
            signal_post(cur_post.value)
        },
    }
]

const set_likes = async (p: any) => {
    const resp = await axios.get('api/likes_fact/' + p.id + '/' ,{
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`,
        },
    })
}

const likes_fact = async (p: any) => {
    p.get_likes = (p.i_like ? p.get_likes - 1 : p.get_likes + 1)
    p.i_like = !p.i_like
    set_likes(p)
}

const open_post = async (p: any) => {
    localStorage.setItem('last:post', JSON.stringify(p))
    router.push('/res/' + p.id)
}

const enable_more_load = () => {
    const cont = document.getElementById('containers')
    if (cont) {
        cont.addEventListener('scroll', ev => {
            if (cont.scrollHeight - cont.scrollTop - cont.clientHeight < 5 && !emptys.value.includes(section.value)) {
                (section.value == 'all' ? get_posts : get_my_posts)()
            }
        })

    }
}
enable_more_load()

const text = ref("")
const image = ref<Blob>()
const image_url = computed(() => {
    return URL.createObjectURL(image.value as Blob)
})

const set_profil = (f: Blob) => {
    image.value = f
}

const click_id = (id: string) => {
    document.getElementById(id)?.click()
}
const blocking = ref(false)
const create_post = async () => {
    if(text.value == "" && !image.value) {
        return show_alert('Impossible de continuer', "Veuillez ajouter un texte ou une image avant de continuer.")
    }
           
    const load = await showLoading('Envoi...')
    const form = new FormData()
    if (text.value != "") form.append('text', text.value)
    if (image.value) form.append('image', image.value)

    try {
    	blocking.value = true
        const resp = await axios.post('api/create_post/', form, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`,
                "Content-Type": "multipart/form-data"
            },
        })
        if(resp.data['done']) {
            (section.value == 'all' ? posts : my_posts).value.unshift(resp.data['result'])
            is_writing.value = false
            if(image) {
            	image.value = undefined
            }
            setTimeout(() => {
            	blocking.value = false
            }, 3000)
        }
    } catch {
        await show_alert('Erreur imprévue', "Une erreur est survenue lors de l'envoi de votre post, veuillez reéssayer.")
    }

    load.dismiss()

}

const set_text = (e : any) => {
	text.value = e.target.innerText;
}
</script>
