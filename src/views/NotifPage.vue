<template>
    <ion-page>
        <ion-content>
            <div class="body">
                <div class="chat is_ad">
                    <div>
                        <div class="chat_h">
                            <button @click="router.back()" class="mybut chat_h_but"
                                style="margin-right: 0.5rem; margin-left: 0">
                                <ion-icon class="ico" :icon="arrowBack" />
                            </button>
                            <div class="h_profil ion-activatable ripple-parent">
                                <ion-ripple-effect></ion-ripple-effect>
                                
                                <div>
                                    <div class="h_title">Notifications</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat_b" :class="{ is_ad: true }">
                        <div v-if="notifs.length" style="padding-top: 0.9rem">
                            <div v-for="n in get_notifs" :key="n.id" :id="'smessage_cont:' + n.id"
                                class="smessage_cont " :class="{
                                    not_seen : !seen_notifs.includes(n.id)
                                }" >
                                <div @click=" ['new_match', 'delete_room', 'new_like', 'expired_abon', 'send_inter'].includes(n.typ) ? 0 : ( n.typ.includes('want_lov') ? send_lov(n) : router.push(n.get_urls[0]))" :id="'smessage:' + n.id" :class="{
                                        smessage : n.typ != 'send_sl',
                                        sl_mess : n.typ == 'send_sl'
                                    }">
                                    <div v-if="['new_match', 'send_inter', 'send_sl'].includes(n.typ) || n.typ.includes('want_lov') " class="simg" :style="{
                                        'background-size': 'cover',
                                        'background-position': 'top center',
                                        'background-image': `url('${f_url(n.get_photo)}')`,
                                    }"></div>
                                    <button v-else-if="n.typ == 'new_abon'" class="butfor princ" >
                                        <ion-icon :icon="cash" style="position: relative; top: .5vh;" ></ion-icon>
                                    </button>
                                    <button v-else-if="n.typ == 'new_mess'" class="butfor princ" >
                                        <ion-icon :icon="chatbubbles" style="position: relative; top: .5vh;" ></ion-icon>
                                    </button>
                                    <button v-else-if="n.typ == 'new_like'" class="butfor princ" >
                                        <ion-icon :icon="heartHalf" style="position: relative; top: .5vh;" ></ion-icon>
                                    </button>
                                    <button v-else-if="n.typ == 'delete_room'" class="butfor princ" >
                                        <ion-icon :icon="heartDislike" style="position: relative; top: .5vh;" ></ion-icon>
                                    </button>
                                    <button v-else-if="n.typ == 'expired_abon'" class="butfor princ" >
                                        <ion-icon :icon="closeCircle" style="position: relative; top: .1vh; font-size: 5vh;" ></ion-icon>
                                    </button>
                                    <button v-else-if="n.typ == 'new_gmatch'" class="butfor princ" >
                                        <ion-icon :icon="people" style="position: relative; top: .1vh; font-size: 5vh;" ></ion-icon>
                                    </button>
                                    <div v-else-if="n.typ == 'new_anonym'" class=""  >
                                        <img style="width: 25vw;" :src="'../../imgs/mask.webp'" />
                                    </div>
                                    <div class="mess_body" :class="{ is_slv :  n.typ == 'send_sl'  }" >
                                        {{ n.text }}
                                    </div>
                                </div>
                                <div v-if="n.typ == 'send_inter' && format_urls(n.get_urls[1])[1]" class="mess">
                                    <div>
                                        <div class="comp">
                                            {{ format_urls(n.get_urls[1])[1] }}
                                        </div>
                                    </div>
                                </div>
                                <div v-if="['new_match', 'send_inter', 'send_sl'].includes(n.typ)"  class="sbut_cont">
                                    <button @click="router.push(n.get_urls[0])" class="sbut prof">
                                        <ion-icon :icon="eye" style="position: relative; top: 1px" />
                                        Profile
                                    </button>
                                    <button v-if="n.typ != 'send_inter' && n.typ != 'send_sl'" @click=" router.push(n.get_urls[1])" class="sbut write" style="margin-left: 1rem">
                                        <ion-icon :icon="chatbox" style="position: relative; top: 1px" />
                                        Ecrire
                                    </button>
                                    <button v-else @click=" initiate_chat(format_urls(n.get_urls[1])[0])" class="sbut write" style="margin-left: 1rem">
                                        <ion-icon :icon="chatbox" style="position: relative; top: 1px" />
                                        Ecrire
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-else>
                            <div class="no_img">
                                <img style="width: 50vw" :src="'../../imgs/notif.svg'" />
                            </div>
                            <div class="no_text">Aucune notification</div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
.is_slv {
 color : rgb(49, 49, 49) !important;
}

.not_seen {
    background-color: #201844;
}
.princ:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.527), transparent);
    background-color: #fc1955;
}

.princ {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
    color: white;
}
.butfor {
    width: 8vh;
    height: 8vh;
    min-width: 8vh;
    min-height: 8vh;
    border-radius: 100%;
    font-size: 4vh;
}
.no_text {
    text-align: center;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
}

.no_img {
    padding-top: 25vh;
    padding-right: 2rem;
    padding-right: 2rem;
    display: flex;
    justify-content: space-around;
}

.stext {
    padding: 0.3rem;
    background: rgb(234, 227, 240);
}

.sep_text {
    margin-top: -1rem;
    display: flex;
    justify-content: space-around;
}

.separateur {
    width: 100%;
    height: 1px;
    background: #100b2685;
    border-radius: 2px;
}

.day {
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    font-size: 0.9rem;
    font-weight: 600;
    color: #100b26;
    margin-top: 1.7rem;
    margin-bottom: 0.3rem;
}

.quiz_bot {
    font-size: 0.74rem;
    justify-content: space-between;
    display: flex;
}

.quiz_cont {
    font-size: 0.8rem;
}

.n_brille {
    background: #5959597e;
    color: #3a3a3a;
}

.is_vid {
    font-size: 2.5rem !important;
}

.brille_v {
    background: rgba(206, 6, 6, 0.405);
    color: rgb(206, 6, 6);
}

.brille {
    background: rgba(255, 82, 82, 0.364);
    color: rgb(255, 82, 82);
}

.quiz_ico {
    width: 65px;
    height: 65px;
    min-width: 65px;
    min-height: 65px;
    border-radius: 14px;
    font-size: 3rem;
    margin-right: 0.6rem;
    padding-top: 0.4rem;
    transition: all 0.2s ease-in-out;
}

.quizm:active {
    background: rgb(226, 226, 226);
}

.quizm {
    width: 100%;
    background: white;
    color: #100b26;
    border-radius: 10px;
    font-size: 0.78rem;
    display: flex;
    align-items: center;
    padding: 0.3rem;
}

.quizm_cont {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    padding-top: 1rem !important;
    padding-bottom: 0.6rem;
    width: 100%;
}

.c_favor {
    color: rgb(53, 53, 53) !important;
}

.is_favor {
    background: rgb(255, 18, 18) !important;
    color: white !important;
}

.b_favor_l {
    border-top-color: rgb(255, 18, 18) !important;
    border-right-color: rgb(255, 18, 18) !important;
}

.b_favor_r {
    border-top: rgb(255, 18, 18) !important;
    border-right-color: rgb(255, 18, 18) !important;
}

.error {
    background: rgb(255, 54, 54);
}

.viewed {
    background: #fb4073;
}

.delivered {
    background: rgb(102, 102, 102);
}

.not_send {
    border: 2px solid rgb(102, 102, 102);
}

.you_see {
    right: 3px;
}

.seen_indi {
    position: absolute;
    width: 9px;
    height: 9px;
    bottom: 0.6rem;
    border-radius: 100%;
}

.comp {
    margin-left: 0.01rem;
    margin-right: 1rem;
    padding: 0.8rem;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    background: #191333;
    color: #fb4073;
    font-size: 1rem;
    font-weight: bolder;
}

.mess {
    margin-left: 74px;
    position: relative;
    top: -0.3rem;
}

.write {
    background: #7759ff;
    color: white;
    box-shadow: 0 10px 15px -3px #7759ff, 0 4px 6px -2px #17a74929;
}

.prof {
    background: #fb4073;
    color: white;
    box-shadow: 0 10px 15px -3px #fb4073b4, 0 4px 6px -2px #17a74929;
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

.sbut_cont {
    padding-left: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -0.7rem;
}

.mess_body {
    padding-top: 0.2rem;
    padding-left: 0.6rem;
    padding-right: 0.4rem;
    padding-bottom: 0.6rem;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
}

.simg {
    width: 74px;
    height: 74px;
    min-width: 74px;
    min-height: 74px;
    border-radius: 100%;
}

.is_ad {
    border-radius: 0px !important;
    background: #100b26 !important;
}

.sl_mess {
    display: flex;
    align-items: center;
    width: 100%;
    border-style: solid;
    border-width: 0px;
    border-color: rgb(255, 234, 43);
    border-radius: 35px;
    background: rgb(255, 234, 43); 
    color: rgb(49, 49, 49);
}

.smessage:active{
    background-color: #201844;
}
.smessage {
    display: flex;
    align-items: center;
    width: 100%;
    border-style: solid;
    border-width: 0px;
    border-color: rgb(41, 41, 44);
    border-radius: 35px;
    background: #191333;
}

.smessage_a {
    background: rgba(255, 255, 255, 0.385);
}

.smessage_cont {
    width: 100%;
    padding-left: 2vh;
    padding-right: 2vh;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
}

.f_m {
    background: rgb(242, 242, 242) !important;
}

.in_mess {
    margin-bottom: 0.4rem;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.rep_s {
    font-size: 0.74rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.rep_title {
    font-size: 0.74rem;
    font-weight: 600;
    padding-bottom: 0.1rem;
    color: rgb(255, 91, 91);
}

.rep_o {
    background: rgb(255, 91, 91);
    box-shadow: 0 10px 15px -3px rgb(255, 91, 91), 0 4px 6px -2px #17a74929;
    color: white;
    width: 35px !important;
    height: 35px !important;
    min-width: 35px;
    min-height: 35px;
    position: relative;
    right: 20px;
    top: 13px;
}

.rep_message {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    border-left-style: solid;
    border-left-width: 5px;
    border-left-color: rgb(255, 91, 91);
    background: rgb(216, 216, 216);
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    min-width: 0%;
}

.rep_cont {
    padding: 0.4rem;
    background: rgb(234, 227, 240);
    flex-grow: 1;
    min-width: 0%;
    margin-left: 8%;
    margin-right: 9.5%;
    margin-bottom: -14px;
    margin-top: 0.8rem;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.reply {
    display: flex;
    align-items: center;
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

.selected {
    background: #fb40732e;
}

.ripple-parent {
    position: relative;
    overflow: hidden;
}

.mus {
    width: 51px;
    height: 51px;
    border-radius: 15px;
}

.audio_cont {
    display: flex;
    align-items: center;
}

.details {
    display: flex;
    justify-content: space-between;
    font-size: 0.73rem;
    color: rgb(97, 97, 97);
    margin-top: -10px;
}

.audio_mess {
    width: 70vw !important;
    padding-top: 0.1rem !important;
}

ion-range {
    --bar-background-active: #fb4073;
    --knob-background: #fb4073;
    --knob-size: 12px;
}

.range {
    flex-grow: 1;
}

.but_play:active {
    background: #fb407320;
}

.but_play {
    background: #fb4073;
    color: white;
}

.audio_ {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem;
}

.myplay {
    position: absolute;
    top: 50%;
    right: 50%;
    margin-right: -27.5px !important;
    margin-top: -20px;
}

.img_bot {
    padding-top: 0.3rem;
    padding-bottom: 0.4rem;
    padding-right: 0.6rem;
    padding-left: 0.6rem;
    max-width: 60vw;
}

div .time_img {
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 0.4rem;
    background: rgba(0, 0, 0, 0.282);
    color: white;
}

.img_ {
    width: 100%;
    border-radius: 15px;
    max-width: 60vw;
    max-height: 400px;
}

div .img_mess {
    padding-top: 0.3rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-bottom: 0rem;
}

.time {
    position: absolute;
    bottom: 0.2rem;
    right: 0.4rem;
    font-size: 0.7rem;
    color: rgb(97, 97, 97);
}

.back_you {
    background: white;
}

.back_me {
    background: #bbacff;
}

.is_prev_y {
    margin-left: 7.5px;
}

.is_prev_m {
    margin-right: 7.5px;
}

div .y_prev {
    border-top-left-radius: 0px;
}

div .m_prev {
    border-top-right-radius: 0px;
}

.message {
    font-size: 0.9rem;
    color: #100b26;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-bottom: 1rem;
    padding-top: 0.5rem;
    max-width: 75vw;
    min-width: 20vw;
    width: max-content;
    border-radius: 15px;
    position: relative;
}

.arrow_right_a:active {
    border-top: 5px solid #9991c0;
    border-left: 5px solid #9991c0;
}

.arrow_right {
    width: 0%;
    height: 0%;
    border-top: 5px solid #bbacff;
    border-left: 5px solid #bbacff;
    border-bottom: 5px solid transparent;
    border-right: 5px solid transparent;
}

.arrow_left_a {
    border-top: 5px solid rgb(208, 205, 205);
    border-right: 5px solid rgb(208, 205, 205);
}

.arrow_left {
    width: 0%;
    height: 0%;
    border-top: 5px solid white;
    border-right: 5px solid white;
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
}

.messages {
    display: flex;
    align-items: flex-start;
}

._bot {
    padding-bottom: 0.4rem;
}

._top {
    padding-top: 0.4rem;
}

._me_a:active {
    background: #9991c0e3;
}

._me {
    justify-content: flex-end;
}

._you_a:active {
    background: rgb(240, 240, 240);
}

._you {
    justify-content: flex-start;
}

.message_cont {
    display: flex;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    transition: all 0.2s ease-out;
    width: 100%;
    max-width: 100%;
    position: relative;
}

.chat_b {
    flex-grow: 1;
    min-width: 0;
    overflow: scroll;
    background: rgb(234, 227, 240);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-bottom: 1rem;
}

.h_subs {
    padding-top: 4px;
    font-size: 0.75rem;
}

.h_title {
    font-size: 0.9rem;
    font-weight: bold;
    white-space: nowrap;
}

.h_img {
    width: 45px;
    height: 45px;
    min-height: 45px;
    min-width: 45px;
    border-radius: 100%;
    margin-right: 0.6rem;
}

.h_profil {
    flex-grow: 1;
    display: flex;
    align-items: center;
    min-width: 0%;
}

.chat_h_but:active {
    background: rgba(255, 255, 255, 0.501);
}

.chat_h_but {
    background: transparent;
    color: white;
}

.chat_h {
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #100b26;
    color: white;
}

.optht:active,
.play_but {
    background: #fb4073;
    color: white;
}

.bg_red {
    background: rgba(255, 94, 94, 0.309);
}

.opt_activ {
    background: #fb407348;
    color: #fb4073;
}

.clign {
    border-right-width: 1.25px;
    border-right-color: #fb4073;
    border-right-style: solid;
    top: 0.22rem;
    right: 0.2rem;
    position: relative;
}

.fake {
    display: inline-block;
    min-width: 5px;
    min-height: 18px;
}

.emoj:active {
    background: rgb(79, 76, 76);
}

.emoj {
    display: inline-block;
    padding: 0.5rem;
}

.moov {
    background: #fb407323;
}

.emoji_bottom {
    width: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(225, 218, 232);
}

.emojis {
    padding-left: 1rem;
    padding-right: 1rem;
    flex-grow: 1;
    padding-top: 0.5rem;
    padding-bottom: 0.8rem;
    color: rgb(234, 227, 240);
    overflow: scroll;
    font-size: 1.2rem;
}

.text_r {
    border-radius: 15px;
    position: relative;
    top: 0.08rem;
    padding-top: 0.4rem;
}

.activ_r {
    background: #fb4073;
    color: white;
    box-shadow: 0 10px 15px -3px #fb4073ff, 0 4px 6px -2px #17a74929;
}

.recent:active {
    background: #231f33;
    color: #878787;
}

.icon_r {
    border-radius: 50%;
    padding-top: 0.3rem;
}

.recent {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.3rem;
    margin-right: 0.3rem;
    white-space: nowrap;
}

.emoji_header {
    display: flex;
    align-items: center;
    padding-bottom: 0.4rem;
    color: rgb(225, 218, 232);
    padding-left: 1rem;
    padding-right: 0.8rem;
    overflow-x: scroll;
    width: 100%;
    min-height: 5vh;
    font-size: 0.8rem;
}

.emoji_cont {
    width: 100%;
    max-height: 40vh;
    height: 38vh;
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
}

.see {
    color: #120c2b;
}

.not_see {
    color: rgb(234, 227, 240);
}

.red {
    color: rgb(255, 78, 78);
}

.annul {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    position: relative;
    right: 11vw;
}

.clignote {
    position: relative;
    bottom: 0.1rem;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: red;
}

.count {
    display: flex;
    align-items: center;
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.mic_show {
    background: rgb(234, 227, 240);
    color: #120c2b;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 25px;
    border-width: 1px;
    border-style: solid;
    border-color: red;
    min-height: 40px;
    max-height: 160px;
    min-width: 90vw;
}

.cont_m {
    padding-top: 1.5vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    max-width: 100vw;
}

.scrolll {
    min-width: 60px;
    width: 60px;
    min-height: 60px;
    height: 60px;
}

.touch {
    font-size: 1.8rem;
    box-shadow: none;
    position: relative;
    right: 15vw;
}

.mico {
    transition: all 0.6s ease-in-out;
}

.cli-enter-active {
    transition: all 0.2s ease-in;
}

.cli-leave-active {
    transition: top 0.1s ease-out;
}

.cli-enter-from {
    opacity: 0;
}

.cli-leave-to {
    opacity: 0;
}

.chat-enter-active {
    transition: bottom 1s ease-in;
}

.chat-leave-active {
    transition: top 0.1s ease-out;
}

.chat-enter-from {
    transform: translateY(20px);
    opacity: 0;
}

.chat-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.emoji {
    color: rgb(255, 153, 1);
    background: rgb(234, 227, 240);
}

.music {
    color: rgb(255, 95, 125);
    background: rgb(234, 227, 240);
}

.vid {
    color: rgb(238, 79, 68);
    background: rgb(234, 227, 240);
}

.img {
    color: blue;
    background: rgb(234, 227, 240);
}

.cam {
    color: green;
    background: rgb(234, 227, 240);
}

.sp {
    margin-right: 0.5rem;
}

.opt_b {
    padding-bottom: 0.8rem;
}

.opt {
    padding-top: 0.6rem;
    display: flex;
    align-items: center;
}

.ico {
    position: relative;
    top: 0.1rem;
}

.activ {
    color: white;
    background: #fb4073;
    box-shadow: 0 10px 15px -3px #fb4073ff, 0 4px 6px -2px #17a74929;
}

.n_activ {
    color: #120c2bb3;
    background: rgb(234, 227, 240);
}

.mybut:active {
    box-shadow: none;
}

.mybut {
    margin-left: 0.5rem;
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    font-size: 1.3rem;
}

[contenteditable]:empty:before {
    content: attr(placeholder);
    position: absolute;
    display: block;
    color: rgb(68, 68, 68);
}

.placeholder {
    color: #120c2bb3;
}

.back {
    background: #120c2b;
}

.inpt:focus {
    border: none;
}

.inpt {
    background: rgb(234, 227, 240);
    color: #120c2b;
    flex-grow: 1;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 25px;
    border-width: 0px;
    min-height: 40px;
    max-height: 160px;
    overflow: scroll;
    caret-color: #fb4073;
}

.cont {
    padding-top: 1.5vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.bottom {
    width: 100%;
    position: relative;
}

.chat {
    flex-grow: 1;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    width: 100%;
    background: white;
    min-height: 0%;
    display: flex;
    flex-direction: column;
    position: relative;
}

*:focus {
    outline: none;
}

.body {
    margin: 0;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #120c2b;
    font-family: "Poppins";
}
</style>
  
<script setup lang="ts">
import { IonPage, IonContent, IonIcon, onIonViewDidEnter } from "@ionic/vue"
import { arrowBack, cash, chatbox, chatbubbles, checkbox, closeCircle, eye, heartDislike, heartHalf, people } from "ionicons/icons";
import { useRouter } from "vue-router";
import { useUserStore } from "@/global/pinia"
import { storeToRefs } from "pinia";
import { Notif } from "@/global/types";
import { StatusBar } from "@capacitor/status-bar"
import { room_slug } from "@/global/utils";


const router = useRouter()
const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { f_url, force_room } = userStore_
const { notifs, seen_notifs, user, get_notifs, oth_matches, rooms } = userStore

onIonViewDidEnter(() => {
    setTimeout(() =>  {
        const f_notifs = [] as number[]
        for(const n of notifs.value) {
            if(!f_notifs.includes(n.id)) f_notifs.push(n.id)
        }
        seen_notifs.value = f_notifs
    }, 1000)

    const set_bar = () => {
    StatusBar.setBackgroundColor({color : "#120c2b"})
    }
    set_bar()
})

const send_lov = (n : Notif) => {
    const my_id = n.typ.split(':')[1]
    localStorage.setItem('notif:id:' + my_id, 'ya')
    setTimeout(() => {
        router.push(n.get_urls[0])
    })
}

const initiate_chat = (match_obj : string) => {
    const obj = JSON.parse(match_obj)
    oth_matches.value.push(obj)
    const room = rooms.value.filter(e => e.slug == room_slug(user.value?.id as number, obj['user']))[0]
    if (room) router.push(`/room/${room.slug}`)
    else force_room()
}

const format_urls = (txt : string) => {
	return txt.split('[]')
}

</script>
