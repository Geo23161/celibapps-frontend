<template >
    <ion-page>
        <div style="overflow-y: hidden; height: 100%; ">
            <div class="body_all" style="position: relative;" :style="{
                'background-image': `radial-gradient(circle, ${color_b}, ${color_b}, ${color_b}, ${color_b}, ${color_b}, rgb(0, 0, 0))`
            }">
                <div class="header">
                    <div class="buts">
                        <button @click="typ_rang = 'for_you'" class="fancybut"
                            :class="{ princ: typ_rang == 'for_you', seco: typ_rang != 'for_you' }">
                            Pour toi
                        </button>
                        <button @click="change_rang('proximity')" class="fancybut"
                            :class="{ princ: typ_rang != 'for_you', seco: typ_rang == 'for_you' }">
                            A proximité
                        </button>
                    </div>
                    <div>
                        <button class="fancybutb" @click="router.push('/notifs')"
                            :class="{ princ: counter % 2 && has_new_notifs, seco: !(counter % 2 && has_new_notifs) }">
                            <ion-icon :icon="notifications"
                                style="font-size: 2.5vh; position: relative; top: 0.25vh; "></ion-icon>
                        </button>
                        <!-- <button v-if="has_new || (is_small && counter % 2 && has_new_notifs)" class="alert_b" :class="{
                            alert_colo: counter % 2
                        }">

                        </button>
                        <button @click="!is_menu ? show_menu() : 0" class="fancybutb seco"
                            style="margin-right: 0rem !important;">
                            <ion-icon :icon="ellipsisHorizontalOutline"
                                style="font-size: 3vh; position: relative; top: 0.25vh;"></ion-icon>
                        </button> -->
                    </div>
                </div>
                <div class="profs">
                    <div v-if="!global_load" class="card_cont" id="card_co">
                        <div v-for="p in imgs.slice(0, 4) " :key="p.pk" class="card transit"
                            :class="{ card1: get_index(p.pk) == 1, card2: get_index(p.pk) == 2, card3: get_index(p.pk) == 3, card4: get_index(p.pk) == 4 }"
                            :id="`card:${p.pk}`" :style="{
                                'background-size': 'cover',
                                'background-position': 'top center',
                                'background-image': `url('${p.url}')`,
                            }">
                            <div class="wrapper_card">
                                <div class="indica">
                                    <button class="mybb2">
                                        <ion-icon style="font-size: 2.5vh; position: relative; top: .2vh;"
                                            :icon="camera"></ion-icon> <span style="position: relative; bottom: .2vh;">{{
                                                p.photos
                                            }}</span>
                                    </button>
                                    <button class="mybb">
                                        {{ p.sign }}
                                    </button>
                                </div>
                                <div :id="`name_of:${p.pk}:d`" class="name_of" :class="{
                                    n_online: is_online(toDate(profils.filter(e => e.id == p.pk)[0].last as string).getTime()) 
                                }">
                                    <span :class="{
                                        not_vip: p.status != 'vip'
                                    }">{{ p.name }}</span> <user-badge :status="p.status" :width="'3.1vh'"
                                        :height="'3.1vh'" :size="p.status == 'vip' ? '1.7vh' : '2.1vh'" />
                                </div>
                                <div v-if="is_online(toDate(profils.filter(e => e.id == p.pk)[0].last as string).getTime())"
                                    class="online_of">
                                    <div class="inddid">

                                    </div>
                                    <div class="text_inddid">
                                        en ligne
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="imgs.length < 4" class="card transit is_white"
                            :class="{ card1: imgs.length == 0, card2: imgs.length == 1, card3: imgs.length == 2, card4: imgs.length == 3 }"
                            :id="`card:${0}`">
                            <div class=" no_recom" id="no_recom">
                                <div class="">
                                    <div class="centt">
                                        <img style="width: 40vw; margin: auto;" :src="'../../imgs/no_data.svg'" />
                                    </div>

                                    <div class="text_no">
                                        Plus de profil dans votre région
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="card_cont" id="card_not">
                        <div class="card card1 transit is_white" :id="`card:${-10}`">
                            <div v-if="!connex_error" class=" no_recoms" id="no_recoms">
                                <div class="">
                                    <ion-spinner color="primary" name="crescent"></ion-spinner>
                                </div>
                            </div>
                            <div v-else class=" no_recomd" id="no_recoms">
                                <div>
                                    <img :src="'../../imgs/error.svg'" />
                                    <div class="text_no">
                                        Erreur de connexion
                                    </div>
                                    <div style="display: flex; justify-content: space-around; ">
                                        <button @click="connex_error = false, get_profils()" class="fancybut princ">
                                            Reéssayer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="utils">
                    <div class="boutons">
                        <button @click="simulate_swipe(false)" class="icor_x bounce anim" id="close_but">
                            <ion-icon :icon="close"
                                style="font-size: 4vh; position: relative; top: 0.05rem; font-weight: bold;" />
                        </button>
                        <button @click="chat_with()" class="icor_xc bounce anim" id="close_but">
                            <ion-icon :icon="chatbox"
                                style="font-size: 2.3vh; position: relative; top: 0.125rem; font-weight: bold; right: 0.1vh;" />
                        </button>
                        <button @click="simulate_swipe(true)" class="icor bounce anim" id="love_but">
                            <ion-icon :icon="heart" style="font-size: 3vh; position: relative; top: 0.05rem;" />
                        </button>
                    </div>
                </div>
                <div v-if="here_first" @click="next_fstp()" class="blank_mg">
                    <div style="padding-top: 20vh;">
                        <img style="width: 100%; " :src="`../../imgs/${textImg.img}.gif`" />
                    </div>
                    <div style="padding: 2vh 2vh;">
                        <div
                            style="padding: 1vh 1vh; background-color: rgb(7, 8, 20); color: white; border-radius: 15px; font-size: 2.2vh; text-align: center;">
                            {{ textImg.txt }}
                        </div>
                    </div>
                </div>
                <div v-if="is_menu" @click="hide_menu()" class="blank_m">

                </div>
                <div class="is_match" v-if="isMacth">
                    <button @click="isMacth = false, current_match = undefined" class="icorb is_up">
                        <ion-icon :icon="close" style="font-size: 1.3rem;" />
                    </button>
                    <div class="concent">
                        <div>
                            <div class="concentric circle1">

                            </div>
                            <div class="concentric circle2">

                            </div>
                            <div class="concentric circle3">

                            </div>
                            <div class="concentric circle4">

                            </div>
                            <div class="imgs_m you_" :style="{
                                backgroundImage: `url('${current_match?.url}')`
                            }">
                                <button class="icorb animateM" :class="{ animating: cpt % 2 }">
                                    <ion-icon :icon="heart" style="font-size: 1.3rem;" />
                                </button>
                            </div>
                            <div class="imgs_m me_" :style="{
                                backgroundImage: `url('${user?.get_profil.get_picture}')`
                            }">
                                <button class="icorb deuxi animateM" :class="{ animating: cpt % 2 }">
                                    <ion-icon :icon="heart" style="font-size: 1.3rem;" />
                                </button>

                                <button class="icorb troisi animateM" :class="{ animating: cpt % 2 }">
                                    <ion-icon :icon="heart" style="font-size: 1.3rem;" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="impoT animateM" id="impott">
                        <div> C'est un match!</div>
                        <div style="font-size: 2.2vh !important; font-weight: normal !important;">
                            {{ current_match?.name }} vous kiffe aussi
                        </div>
                    </div>
                    <div class="inputM">
                        <button @click="open_new_match()" class="sendMes princ">
                            <ion-icon :icon="chatbubbles" style="font-size: 3.3vh; " /> <span
                                style="position: relative; bottom: 0.6vh;">Démarrez la conversation</span>
                        </button>
                    </div>
                    <div v-if="false" class="continueM">
                        <button class="contBut">
                            <ion-icon :icon="arrowBack" style="font-size: 1.8rem; " /> <span
                                style="position: relative; bottom: 0.4rem;">Continuer</span>
                        </button>
                    </div>
                </div>
                <div class="menu_cont animate" style="transform: translateY(90vh);" id="menu">

                    <div class="menu_title">
                        Menu
                    </div>
                    <div class="m_sepa">

                    </div>
                    <div @click="router.push('/chat')" class="menu_j ripple_parent ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>

                        <button class="menubut greenb">
                            <ion-icon :icon="chatbubble" style="font-size: 1.2rem; color: white;" />
                        </button>
                        <button v-if="has_new" class="alert_m">

                        </button>
                        <div class="menu_te " :class="{ newi: has_new }">
                            Voir les messages
                        </div>
                    </div>
                    <div class="m_sepa">

                    </div>
                    <div @click="router.push('/lov')" class="menu_j ripple_parent ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>
                        <button class="menubut redb">
                            <ion-icon :icon="heartHalf" style="font-size: 1.2rem; color: white;" />
                        </button>
                        <div class="menu_te">
                            Voir mes favoris
                        </div>
                    </div>
                    <div class="m_sepa">

                    </div>
                    <div @click="router.push('/mon_profil')" class="menu_j ripple_parent ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>
                        <button class="menubut orangeb">
                            <ion-icon :icon="person" style="font-size: 1.2rem; color: white;" />
                        </button>
                        <div class="menu_te">
                            Voir mon profil
                        </div>
                    </div>
                    <div class="m_sepa">

                    </div>
                    <div v-if="is_small" @click="router.push('/notifs')" class="menu_j ripple_parent ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>
                        <button class="menubut purpleb">
                            <ion-icon :icon="notifications" style="font-size: 1.2rem; color: white;" />
                        </button>
                        <button v-if="has_new_notifs" class="alert_m">

                        </button>
                        <div class="menu_te">
                            Voir les notifications
                        </div>
                    </div>
                    <div v-if="is_small" class="m_sepa">

                    </div>
                    <div @click="router.push('/param')" class="menu_j ripple_parent ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>
                        <button class="menubut blackb">
                            <ion-icon :icon="settings" style="font-size: 1.2rem; color: white;" />
                        </button>
                        <div class="menu_te">
                            Paramètres
                        </div>
                    </div>
                </div>
                <div class="tabmenu">
                    <div class="tabm">
                        <button class="tabbut tabhome">
                            <ion-icon style="font-size: 2.2vh;" :icon="albums" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button v-if="has_new" class="alert_b alert_colo">

                        </button>
                        <button @click="router.push('/tabs/chat')" class="tabbut seco" :class="{ accused: has_new }">
                            <ion-icon style="font-size: 2.2vh;" :icon="chatbox" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/lov')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="heartHalf" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/com')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="newspaper" />
                        </button>
                    </div>
                    <div class="tabm">
                        <button @click="router.push('/tabs/param')" class="tabbut seco">
                            <ion-icon style="font-size: 2.2vh;" :icon="settings" />
                        </button>
                    </div>
                </div>
                <div class="notthemom" v-show="is_blocked">
                    <div style="display: flex; justify-content: space-around; padding-top: 30vh;" >
                        <img style="width: 15vh; border-radius: 10px;" :src="'../../imgs/foreground.png'" />
                    </div>
                    <div
                        style="text-align: center;  font-size: 3.5vh; color: white; font-weight: bolder; padding-left: 2vh; padding-right: 2vh;">
                        🔒 Fermé actuellement
                    </div>
                    <div
                        style="text-align: center; padding-top: 1.6vh; font-size: 2.5vh; color: white; font-weight: bolder; padding-left: 2.5vh; padding-right: 2.5vh;">
                        🕒 Ouvert chaque vendredi à partir de 19h au Lundi à 00h.
                    </div>
                </div>
            </div>
            <div class="hidden" id="hidden">
                <ion-icon id="sign_ico" :icon="radioButtonOn" style="font-size: 2.5vh; position: relative; top: 0.6vh;" />
                <div class=" no_recom" id="no_recom">
                    <div class="">
                        <img style="width: 40vw;" :src="'../../imgs/no_data.svg'" />
                        <div class="text_no">
                            Plus de profil
                        </div>
                    </div>
                </div>
                <button v-for="img in full_imgs" :key="img.pk" :id="`butphot:${img.pk}`" class="mybb2">
                    <ion-icon style="font-size: 2.5vh; position: relative; top: .2vh;" :icon="camera"></ion-icon> <span
                        style="position: relative; bottom: .2vh;">{{ img.photos }}</span>
                </button>
                <div v-for="img in full_imgs" :key="img.pk" :id="`name_of:${img.pk}`" class="name_of" :class="{
                    n_online: is_online(toDate(profils.filter(e => e.id == img.pk)[0].last as string).getTime())
                }">
                    <span :class="{
                        not_vip: img.status != 'vip'
                    }">{{ img.name }}</span> <user-badge :status="img.status" :width="'3.1vh'" :height="'3.1vh'"
                        :size="img.status == 'vip' ? '1.7vh' : '2.1vh'" />
                </div>
                <div v-for="img in full_imgs" :key="img.pk" :id="`onli:${img.pk}`"
                    class="online_of">
                    <div class="inddid">

                    </div>
                    <div class="text_inddid">
                        en ligne
                    </div>
                </div>
            </div>
            <abon-limited @close="lOpen = false, ltext = 'Vous avez atteint votre limite de swipe pour aujourd\'hui.'" :text="ltext"
                :is-open="lOpen" :redirect="'/home'" />
        </div>

    </ion-page>
</template>

<style >
.text_inddid {
    font-size: 2.3vh;
    font-weight: bolder;
    color: white;
}

.inddid {
    width: 1.3vh;
    height: 1.3vh;
    border-radius: 100%;
    background-color: green;
    margin-right: 0.6rem;
    margin-top: 0.3vh;
}

.online_of {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 1.6vh;
    left: 3vh;
}

.notthemom {
    position: absolute;
    top: 0vh;
    width: 100vw;
    height: 92vh;
    z-index: 1000;
    background-color: rgba(31, 31, 31, 0.842);
}

.centt {
    display: flex;
    justify-content: space-around;
}

.not_vip {
    position: relative;
    top: .3vh;
}

.newi {
    position: relative;
    left: -1vh;
}

.alert_m {
    height: 1.6vh;
    width: 1.6vh;
    min-height: 1.6vh;
    min-width: 1.6vh;
    border-radius: 100%;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.459), transparent);
    background-color: #fb4073;
    position: relative;
    right: 2.4vh;
    bottom: 1.4vh;
}

.alert_colo {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.459), transparent);
    background-color: #fb4073;
}

.accused {
    margin-left: -1.4vh;
}

.alert_b {
    height: 1.4vh;
    width: 1.4vh;
    min-height: 1.4vh;
    min-width: 1.4vh;
    border-radius: 100%;
    position: relative;
    bottom: 2.2vh;
    left: 3.8vh;
}

.animating {
    transform: scale(1.1);
}

.is_up {
    position: absolute;
    top: 3vh;
    left: 3vh;
}

.sendMes {
    padding: 3vw 6vw;
    width: 100%;
    font-size: 2.5vh;
    font-weight: bold;
    border-radius: 10px;
}

.contBut:active {

    box-shadow: 0 10px 25px -3px #ffffffb6, 0 4px 6px -2px #f2824129;
}

.contBut {
    padding: 3vw 6vw;
    font-size: 1.2rem;
    background-color: white;
    border-radius: 10px;
    color: #fc1955;
    font-weight: bold;
}

.continueM {
    display: flex;
    justify-content: space-around;
    padding-top: 3vw;
    padding-bottom: 6vw;
    padding-left: 10vw;
    padding-right: 10vw;
    transform: translateY(calc(-241vw));
    font-size: 3vw;
}

.icor_in:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.651), transparent);
    background-color: #fb4073;
}

.icor_in {
    height: 6vh;
    width: 6vh;
    min-height: 6vh;
    min-width: 6vh;
    border-radius: 100%;
    color: white;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.459), transparent);
    background-color: #fb4073;

}

*:focus {
    outline: none;
}

.myinp {
    flex-grow: 1;
    margin-right: 0.6rem;
    height: 6vh;
    border-radius: 15px;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
    font-size: 1.1rem;
    background-color: transparent;
    color: white;
    border-style: solid;
    border-width: 3px;
    border-color: #fc1955;
}

.inputM {
    padding: 3vw 6vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(calc(-241vw));
}

.transla {
    transform: translateY(-247vw);
}

.impoT {
    text-align: center;
    font-size: 5vh;
    font-weight: bold;
    color: white;
}

.troisi {
    position: absolute;
    bottom: 0%;
    right: 0%;
}

.deuxi {
    position: absolute;
    left: 3.5vw;
    top: -4.5vw;
    height: 45px !important;
    width: 45px !important;
}


.icorb:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.651), transparent);
    background-color: #fb4073;
}

.icorb {
    height: 35px;
    width: 35px;
    border-radius: 100%;
    color: white;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.459), transparent);
    background-color: #fb4073;
}

.me_ {
    width: 44vw !important;
    height: 44vw !important;
    transform: translateY(-258vw) translateX(32vw);
}

.you_ {
    transform: translateY(-230vw) translateX(10vw);
}

.imgs_m {
    width: 35vw;
    height: 35vw;
    border-color: beige;
    border-width: 8px;
    border-style: solid;
    background-size: cover;
    background-position: top center;
    border-radius: 100%;
    position: relative;
}

.circle4 {
    border-color: #fc1955;
    border-width: 4.9px !important;
    width: 45vw !important;
    height: 45vw !important;
    transform: translateY(-182.5vw) translateX(17.5vw);

}

.circle3 {
    border-color: #fc1955da;
    border-width: 3.2px !important;
    width: 55vw !important;
    height: 55vw !important;
    transform: translateY(-132.5vw) translateX(12.5vw);

}

.circle2 {
    border-color: #fc1955b6;
    border-width: 2.8px !important;
    width: 65vw !important;
    height: 65vw !important;
    transform: translateY(-72.5vw) translateX(7.5vw);

}

.circle1 {
    border-color: #fc195569;
}

.concentric {
    width: 80vw;
    height: 80vw;
    border-width: 2px;
    border-style: solid;
    border-radius: 100%;
    position: relative;
}

.concent {
    display: flex;
    justify-content: space-around;
    padding-top: 20vh;
}

.is_match {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0%;
    background-color: rgba(0, 0, 0, 0.781);
    z-index: 500;
    font-family: 'PT Serif', serif;
}

.sign_ico {
    font-size: 2.5vh;
    position: relative;
    top: 0.6vh;
}

.mybb2 {
    padding-top: 0.5vh;
    padding-bottom: 0.5vh;
    padding-left: 1.3vh;
    padding-right: 1.3vh;
    font-size: 2vh;
    font-family: 'PT Serif', serif;
    border-radius: 15px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.247), transparent);
    background-color: #2c2c2c;
    color: white;
    font-weight: bolder;
}

.mybb {
    padding-top: 1vh;
    padding-bottom: 1vh;
    padding-left: 1.5vh;
    padding-right: 1.5vh;
    font-size: 2vh;
    font-family: 'PT Serif', serif;
    border-radius: 7px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.247), transparent);
    background-color: #fc1955;
    color: white;
    font-weight: bolder;
}

.indi {
    width: 1vh;
    height: 1vh;
    background-color: white;
    border-radius: 100%;
}

.indic {
    padding: 0.4vh 1.3vh;
    border-radius: 7px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20vw;
    background-color: rgba(20, 20, 20, 0.349);
}

.indica {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3vh 1.6vh;

}

.n_online {
    bottom: 5.3vh !important;
}

.name_of {
    position: absolute;
    bottom: 1.4vh;
    left: 3vh;
    font-size: 4.3vh;
    font-weight: bolder;
    color: white;
}

.wrapper_card {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.925));
    position: relative;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
}

.blank_mg {
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0%;
    z-index: 50;
    background-color: transparent;
    backdrop-filter: blur(8px);
    font-family: 'PT Serif', serif;
}

.blank_m {
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0%;
    z-index: 50;
    background-color: transparent;
    backdrop-filter: blur(5px);
}

.animateM {
    transition: all 0.5s ease-in-out;
}

.animate {
    transition: all 0.5s ease-in-out;
}

.ripple_parent {
    position: relative;
    overflow: hidden;
}

.blackb {
    background-color: rgb(29, 29, 29);
}

.purpleb {
    background-color: rgb(103, 2, 161);
}

.orangeb {
    background-color: rgb(255, 158, 12);
}

.menu_te {
    font-size: 2.7vh;
    font-weight: bold;

}

.redb {
    background-color: #fc1955;
}

.greenb {
    background-color: rgb(11, 216, 39);
}

.menubut {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    margin-right: 0.6rem;
    border-radius: 100%;

}

.menu_j {
    display: flex;
    align-items: center;
    padding-top: 1.5vh;
    padding-bottom: 1.5vh;
    padding-left: 1vh;
}

.m_sepa {
    width: 100%;
    height: 1px;
    background-color: white;
}

.selec {
    width: 15vw;
    height: 4px;
    background-color: white;
    border-radius: 10px;
}

.selec_cont {
    display: flex;
    justify-content: space-around;

}

.menu_title {
    text-align: center;
    font-size: 3vh;
    font-weight: bold;
    padding-top: 0.4rem;
    padding-bottom: 0.7rem;
}

.menu_cont {
    width: 100%;
    height: max-content;
    padding: 1.5vh 2.5vh;
    position: absolute;
    bottom: 0%;
    background-color: transparent;
    backdrop-filter: blur(65px);
    z-index: 100;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    color: white;
    font-family: 'PT Serif', serif;

}

.is_white {
    background-color: white !important;
}

.text_no {
    text-align: center;
    padding: 2.4vh;
    color: rgb(87, 87, 87);
    font-weight: bold;
    font-size: 2.3vh;
    font-family: 'PT Serif', serif;
}

.no_recomd {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 5vh;
}

.no_recoms {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 32vh;
}

.no_recom {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 20vh;
}

.hidden {
    display: none;
}

.waiting2 {
    transform: translateY(-8vh) scale(0.9);
    z-index: 3;
}

.waiting1 {
    transform: translateY(-1vh) scale(0.99);
    z-index: 4;

}

.transit {
    transition: all 0.4s ease-in-out;
}

.transito {
    transition: all 1s ease-in-out;
}

.bounce {
    transition: all 0.25s ease-in-out;
}

.icor_xc:active {
    transform: scale(1.2);
}

.icor_xc {
    top: 2vh;
    left: 2vh;
    height: 5.5vh;
    width: 5.5vh;
    border-radius: 100%;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #7759ff;
    margin-right: 0.6rem;
    color: white;
}

.icor_x {
    top: 2vh;
    left: 2vh;
    height: 6.5vh;
    width: 6.5vh;
    border-radius: 100%;
    color: #fc1955;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: white;
    margin-right: 0.6rem;
}

.icor {
    top: 2vh;
    left: 2vh;
    height: 6.5vh;
    width: 6.5vh;
    border-radius: 100%;
    color: white;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
}

.boutons {
    padding: 1.5vh 3vh;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.103) 10%, transparent);
    background-color: rgba(114, 114, 114, 0.199);
}

.utils {
    padding: 2vh 1vw;
    display: flex;
    justify-content: space-around;

}

.card_cont {
    width: 89vw;
    height: 100%;
    position: relative;
}

.card1 {
    z-index: 5;
}

.card2 {
    z-index: 4;
    transform: translateY(-5vh) scale(0.92);
}

.card3 {
    z-index: 3;
    transform: translateY(-11vh) scale(0.82);
}

.card4 {
    z-index: 2;
    transform: scale(0.7) !important;
}

.card {
    background-color: rgb(41, 41, 41);
    width: 89vw;
    height: 100%;
    border-radius: 25px;
    position: absolute;
    top: 0%;
    background-size: cover;
    background-position: top center;
}

.profs {
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    padding-top: 6vh;
}

.seco:active {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.507) 10%, transparent);
}

.seco {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.103) 10%, transparent);
    background-color: rgba(114, 114, 114, 0.212);
    color: white;
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

.fancybutb {
    margin-right: 0.6rem;
    height: 38px;
    width: 38px;
    font-family: 'PT Serif', serif;
    border-radius: 12px;
}

.fancybut {
    margin-right: 0.6rem;
    padding: 1.6vh 2vh;
    font-family: 'PT Serif', serif;
    border-radius: 12px;
    font-weight: bold;
}

.buts {
    display: flex;
    align-items: center;
}

.header {
    padding: 0.8rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.body_all {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.25ms ease-in-out;
    font-family: 'PT Serif', serif;
}
</style>

<script setup lang="ts" >
import { IonPage, IonContent, IonIcon, IonRippleEffect, IonSpinner, onIonViewDidEnter, useBackButton } from "@ionic/vue"
import { arrowBack, camera, car, card, chatbox, chatbubble, chatbubbles, close, ellipsisHorizontalOutline, heart, heartHalf, idCard, notifications, paperPlane, person, radioButtonOn, send, settings, text, homeOutline, home, albums, newspaper } from "ionicons/icons";
import { computed, ref, watch } from "vue";
import Hammer from "hammerjs";
import { useRouter } from "vue-router";
import { Card, Profil } from "@/global/types";
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";
import axios from "axios";
import { access_tok, room_slug, show_alert, get_obj as getOb, remove_obj, showLoading, get_position, is_online, toDate, estDansLaPlagePermise } from "@/global/utils";
import AbonLimited from "@/components/AbonLimited.vue";
import UserBadge from "@/components/UserBadge.vue";
import { StatusBar } from "@capacitor/status-bar"
import { NativeAudio } from "@capacitor-community/native-audio"


const seuil = ref(0)

const load_audio = () => {
    NativeAudio.preload({
        assetId: "swipe",
        assetPath: "swipe.mp3",
        audioChannelNum: 1,
        isUrl: false
    });
    NativeAudio.preload({
        assetId: "success",
        assetPath: "success.mp3",
        audioChannelNum: 1,
        isUrl: false
    })
}
load_audio()

const play_swipe = (sound: string) => {
    NativeAudio.play({
        assetId: sound
    })
}

const router = useRouter()
const global_load = ref(true)
const connex_error = ref(false)
const profils = ref<Profil[]>([])
const typ_rang = ref('for_you')
const createdId = ref<string[]>([])
watch(typ_rang, (newt, oldt) => {
    remove_all_child('card_co')
    setTimeout(() => {
        full_imgs.value = []
        imgs.value = []
        current_img = []
        connex_error.value = false
        global_load.value = true
        get_profils()
    }, 20)
})
const change_rang = async (newt: string) => {
    if (newt != 'for_you' && (!user.value?.quart || user.value.quart == '')) {
        await set_location(newt)

    } else {
        typ_rang.value = newt
    }
}

const set_location = async (newt: string) => {
    const quart = get_position()
    const load = await showLoading('Recherche de position...')
    try {
        const resp = await axios.post('api/set_quart/', {
            quart: JSON.stringify(quart)
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if (resp.data['done'] && user.value) {
            user.value.quart = resp.data['result']
            typ_rang.value = newt
        }
    } catch (e) {
        await show_alert('Localisation désactivée', "Vous devez permettre à l'application d'acceder a votre localisation avant d'utiliser cette fonctionnalité.")
    }
    load.dismiss()
}

const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)
const { excepts, plikes, can_swipe, matches, has_new, rooms, waiting_room, has_new_notifs, notifs, come_first, here_first, is_blocked } = userStore
const { user } = userStore
const { build_card, swipe_left, swipe_right, why_cant_swipe, force_room, initiate_chat, check_first_come } = _userStore
const current_match = ref<Card>()
const ltext = ref('Vous avez atteint votre limite de swipe quotidien.')

const swipe_right_ = (card: Card) => {
    swipe_right(card)
    if (plikes.value.includes(card.pk)) launch_match(card)
}

const launch_match = (card: Card) => {
    current_match.value = card
    setTimeout(() => {
        isMacth.value = true
        matches.value.push(card.pk)
    }, 100)
}

const number_default = ref(7)
const charging = ref(false)
const get_profils = async () => {
    charging.value = true
    let excpt = [] as number[]
    for (const car of full_imgs.value) excpt.push(car.pk)
    try {
        const resp = await axios.post('api/get_profils/' + typ_rang.value + '/', {
            excepts: JSON.stringify(excpt),
            date_string : (new Date()).toISOString()
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`
            }
        })
        connex_error.value = true
        profils.value = profils.value.concat(resp.data['result']);
        const is_new = full_imgs.value.length == 0
        const results = (resp.data['result'] as Profil[])
        is_blocked.value = !resp.data['allowed']
        //console.log(results)
        number_default.value = resp.data['other'] as number
        seuil.value = !seuil.value ? Math.floor(1 / 2 * number_default.value) : seuil.value + number_default.value
        results.forEach(element => {
            if(element.get_profil) if (!full_imgs.value.filter(e => e.pk == element.id)[0]) full_imgs.value.push(build_card(element))
        });
        if (is_new) {
            current_img = full_imgs.value.slice(0, 4)
            current_img.forEach(element => {
                imgs.value.push(element)
            });
            if (current_img.length < 4) {
                current_img.push({
                    url: '',
                    color: '#727272b6',
                    pk: 0,
                    name: '',
                    sign: '',
                    status: '',
                    photos: 0
                })
            }
            global_load.value = false
            setTimeout(() => {
                enable_swipe()
                imgs.value.forEach(element => {
                    enable_click(element.pk)
                });
                color_b.value = current_img[0].color
            }, 500)
        }
        charging.value = false
    } catch (e) {
        console.error(e)
        connex_error.value = true
    }
}
const full_imgs = ref<Card[]>([])
const imgs = ref<Card[]>([])
const get_index = (pk: number) => {

    const index = imgs.value.findIndex(item => item.pk == pk)
    return index + 1
}
let current_img = [] as Card[]

const mOpen = ref(false)
const current = ref(1)
const last = ref(4)
const color_b = ref('#727272b6')

const get_obj = (pk: number) => {
    for (const img of full_imgs.value) {
        if (img.pk == pk) return img
    }
    return {
        url: '',
        color: '#727272b6',
        pk: 0
    }
}

const get_pos = (pk: number) => {
    let i = 0;
    for (const img of full_imgs.value) {
        if (img.pk == pk) break
        i++;
    }

    return i < full_imgs.value.length ? i : -1
}

const getObj = (pk: number) => {
    let i = 0;
    for (const img of full_imgs.value) {
        if (img.pk == pk) break
        i++;
    }

    return i < full_imgs.value.length ? full_imgs.value[i] : {
        url: '',
        color: '#727272b6',
        pk: 0
    }
}

const get_next = () => {
    let i = 0;
    for (const img of full_imgs.value) {
        i++;
        if (img.pk == current_img[3].pk) break
    }
    if ((i + 1) > seuil.value) {
        console.log('recharg...')
        if (!charging.value) get_profils()
    }
    return i < full_imgs.value.length ? full_imgs.value[i] : {
        url: '',
        color: '#727272b6',
        pk: 0
    } as Card
}

const lOpen = ref(false)
const handle_cant_swipe = (slug: string) => {
    if (slug == 'abon') return router.push('/after')
    lOpen.value = true
}

const simulate_swipe = (is_love: Boolean) => {

    const fcard = document.getElementById(`card:${current_img[0].pk}`) as HTMLElement;

    const scard = document.getElementById(`card:${1 < current_img.length ? current_img[1].pk : -1}`) as HTMLElement
    const tcard = document.getElementById(`card:${2 < current_img.length ? current_img[2].pk : -1}`) as HTMLElement
    const ocard = document.getElementById(`card:${3 < current_img.length ? current_img[3].pk : -1}`) as HTMLElement
    const cont = document.getElementById('card_co') as HTMLElement

    const close_but = document.getElementById('close_but') as HTMLElement
    const love_but = document.getElementById('love_but') as HTMLElement
    if (!is_love)
        close_but.style.transform = 'scale(1.4)'
    else
        love_but.style.transform = 'scale(1.4)'

    fcard.classList.add('transito')

    fcard.style.transform = 'translateX(' + (is_love ? 1 : -1) * 600 + 'px' + ')' + ' rotateZ(' + ((is_love ? 1 : -1) * 40) + 'deg)';
    if (current_img[0].pk)
        is_love ? swipe_right_(current_img[0]) : swipe_left(current_img[0])
    scard?.classList.remove('card2')
    scard?.classList.add('waiting1')

    tcard?.classList.remove('card3')
    tcard?.classList.add('waiting2')
    setTimeout(() => {
        scard?.classList.remove('waiting1')
        tcard?.classList.remove('waiting2')
        ocard?.classList.remove('card4')

        scard?.classList.add('card1')
        tcard?.classList.add('card2')
        ocard?.classList.add('card3')

        if (current_img[current_img.length - 1].pk) {
            const nextObj = get_next()
            const next = document.createElement('div')
            next.classList.add('card')
            next.classList.add('card4')
            next.classList.add('transit')
            next.id = `card:${nextObj.pk}`
            createdId.value.push(next.id)

            if (nextObj.pk) {
                const wrapper = create_wrapper(nextObj)
                next.appendChild(wrapper)
                setTimeout(() => {
                    enable_click(nextObj.pk)
                }, 500)
            }
            if (nextObj.pk) {
                next.style.backgroundImage = 'url(' + nextObj.url + ')'
            } else {
                next.classList.add('is_white')
                //const hidden = document.getElementById('hidden') as HTMLElement
                //const no_rec = document.getElementById('no_recom') as HTMLElement
                //hidden.removeChild(no_rec)
                next.appendChild(create_no_recom())
            }
            current_img.push(nextObj)
            cont.appendChild(next)
        }
        if (current_img[0].pk && can_swipe.value) {
            play_swipe('swipe')
            current_img = current_img.filter(e => e.pk != current_img[0].pk)
            color_b.value = current_img[0].color
            cont.removeChild(fcard)
        } else {

            scard?.classList.remove('card1')
            tcard?.classList.remove('card2')
            ocard?.classList.remove('card3')
            scard?.classList.add('card2')
            tcard?.classList.add('card3')
            ocard?.classList.add('card4')
            fcard.style.transform = 'translateX(' + 0 + 'px' + ')' + ' rotateZ(' + 0 + 'deg)'
            if (current_img[0].pk) {
                const why = why_cant_swipe(current_img[0])
                setTimeout(() => {
                    handle_cant_swipe(why)
                }, 500)
            }
        }
        fcard.classList.remove('transito')
        enable_swipe()
    }, 500)

    setTimeout(() => {
        close_but.style.transform = 'scale(1)'
        love_but.style.transform = 'scale(1)'
    }, 200)
}

const enable_swipe = () => {
    const fcard = document.getElementById(`card:${current_img[0].pk}`) as HTMLElement;
    const swipeObj = new Hammer(fcard);
    swipeObj.on('pan', (ev) => {
        fcard.classList.remove('transit')
        const dx = ev.deltaX
        fcard.style.transform = 'translateX(' + dx + 'px' + ')' + ' rotateZ(' + Math.floor((dx / 620) * 45) + 'deg)'
        const scard = document.getElementById(`card:${1 < current_img.length ? current_img[1].pk : -1}`) as HTMLElement
        const tcard = document.getElementById(`card:${2 < current_img.length ? current_img[2].pk : -1}`) as HTMLElement
        const ocard = document.getElementById(`card:${3 < current_img.length ? current_img[3].pk : -1}`) as HTMLElement
        const cont = document.getElementById('card_co') as HTMLElement
        scard?.classList.remove('card2')
        scard?.classList.add('waiting1')

        tcard?.classList.remove('card3')
        tcard?.classList.add('waiting2')

        const close_but = document.getElementById('close_but') as HTMLElement
        const love_but = document.getElementById('love_but') as HTMLElement

        close_but.classList.remove('bounce')
        love_but.classList.remove('bounce')

        if (ev.deltaX < 0)
            close_but.style.transform = 'scale(' + (1 + 0.8 * Math.abs(ev.deltaX / 150)) + ')'
        else
            love_but.style.transform = 'scale(' + (1 + 0.8 * Math.abs(ev.deltaX / 150)) + ')'
        if (ev.isFinal) {
            fcard.classList.add('transit')
            if (Math.abs(ev.deltaX) > 180 && current_img[0].pk && can_swipe.value) {
                play_swipe('swipe')
                fcard.style.transform = 'translateX(' + (dx / Math.abs(dx)) * 600 + 'px' + ')' + ' rotateZ(' + 40 + 'deg)';
                if (current_img[0].pk)
                    (dx > 0) ? swipe_right_(current_img[0]) : swipe_left(current_img[0])
                scard?.classList.remove('waiting1')
                tcard?.classList.remove('waiting2')
                ocard?.classList.remove('card4')

                scard?.classList.add('card1')
                tcard?.classList.add('card2')
                ocard?.classList.add('card3')

                cont.removeChild(fcard)

                if (current_img[current_img.length - 1].pk) {
                    const nextObj = get_next()
                    const next = document.createElement('div')
                    next.classList.add('card')
                    next.classList.add('card4')
                    next.classList.add('transit')
                    next.id = `card:${nextObj.pk}`
                    createdId.value.push(next.id)
                    if (nextObj.pk) {
                        const wrapper = create_wrapper(nextObj)
                        next.appendChild(wrapper)
                        setTimeout(() => {
                            enable_click(nextObj.pk)
                        }, 500)
                    }
                    if (nextObj.pk) {
                        next.style.backgroundImage = 'url(' + nextObj.url + ')'
                    } else {
                        next.classList.add('is_white')
                        //const hidden = document.getElementById('hidden') as HTMLElement
                        //const no_rec = document.getElementById('no_recom') as HTMLElement
                        //hidden.removeChild(no_rec)
                        next.appendChild(create_no_recom())
                    }
                    current_img.push(nextObj)
                    cont.appendChild(next)

                }
                current_img = current_img.filter(e => e.pk != current_img[0].pk)
                color_b.value = current_img[0].color
                enable_swipe()

            } else {
                fcard.style.transform = 'translateX(' + 0 + 'px' + ')' + ' rotateZ(' + 0 + 'deg)'

                scard?.classList.remove('waiting1')
                tcard?.classList.remove('waiting2')

                scard?.classList.add('card2')
                tcard?.classList.add('card3')

                if (current_img[0].pk && Math.abs(ev.deltaX) > 190) {
                    const why = why_cant_swipe(current_img[0])
                    setTimeout(() => {
                        handle_cant_swipe(why)
                    }, 500)
                }

            }

            close_but.style.transform = 'scale(1)'
            love_but.style.transform = 'scale(1)'

            close_but.classList.add('bounce')
            love_but.classList.add('bounce')
        }
    })
}

const is_menu = ref(false)
const show_menu = () => {
    const menu = document.getElementById('menu') as HTMLElement
    menu.classList.add('is_hide')
    menu.style.transform = 'translateY(0px)'
    is_menu.value = true
}

const hide_menu = () => {
    const menu = document.getElementById('menu') as HTMLElement
    menu.style.transform = 'translateY(100vh)'
    is_menu.value = false
}

const enable_menu = () => {
    const menu = document.getElementById('menu') as HTMLElement

    const hm = new Hammer(menu)

    hm.on('pan', ev => {
        menu.classList.remove('animate')
        menu.style.transform = 'translateY(' + ev.deltaY + 'px)'


    })
}

const create_wrapper = (cardObj: any) => {
    const fdiv = document.createElement('div')
    fdiv.classList.add('wrapper_card')
    const sdiv = document.createElement('div')
    sdiv.classList.add('indica')

    /* const name_of = document.createElement('div')
    name_of.classList.add('name_of')
    name_of.innerText = cardObj.name */
    const name_of = document.getElementById(`name_of:${cardObj.pk}`)
    const onli_of = document.getElementById(`onli:${cardObj.pk}`)
    
    const bdiv = document.createElement('div')
    bdiv.classList.add('indica')
    const but = document.createElement('button')
    but.classList.add('mybb')
    const oth_but = document.getElementById(`butphot:${cardObj.pk}`)

    const span = document.createElement('span')
    span.innerText = cardObj.sign

    but.appendChild(span)
    if (oth_but) bdiv.appendChild(oth_but)
    bdiv.appendChild(but)

    fdiv.appendChild(bdiv)
    if (name_of) fdiv.appendChild(name_of)
    if(onli_of && is_online(toDate(profils.value.filter(e => e.id == cardObj.pk)[0].last as string).getTime())) fdiv.appendChild(onli_of)

    return fdiv
}


const enable_click = (id: number) => {
    document.getElementById(`card:${id}`)?.addEventListener('click', (ev) => {
        router.push(`/profil/${id}`)
    })
}

const isMacth = ref(false)
watch(isMacth, (newi, oldi) => {
    if (newi) {
        play_swipe('success')
        setTimeout(() => {
            document.getElementById('impott')?.classList.add('transla')
        }, 200)
    }

})
const cpt = ref(0)

const animate_match = () => {
    setInterval(() => {
        if (isMacth.value) cpt.value++;
    }, 800)
}
animate_match()

setTimeout(() => {

    get_profils()

}, 50)

const remove_all_child = (idcont: string) => {
    const cont = document.getElementById(idcont) as HTMLElement;
    for (const id of createdId.value) {
        const elt = document.getElementById(id)
        if (elt) cont.removeChild(elt)
    }
}

const create_no_recom = () => {
    const main = document.createElement('div')
    main.classList.add('no_recom')
    main.id = "no_recom"
    const par = document.createElement('div')
    const img_par = document.createElement('div')
    img_par.classList.add('centt')
    const img = document.createElement('img')
    img.src = '../../imgs/no_data.svg'
    img.style.width = '40vw'
    img.style.margin = 'auto'
    img_par.appendChild(img)
    const div = document.createElement('div')
    div.classList.add('text_no')
    div.innerText = 'Plus de profils dans votre region'
    par.appendChild(img_par)
    par.appendChild(div)
    main.appendChild(par)
    return main
}
const is_small = ref(false)

onIonViewDidEnter(() => {
    const action = localStorage.getItem('action')
    if (action) {
        const action_obj: { pk: number, action: 'love' | 'dislike' | 'chat_with' } = JSON.parse(action)
        if (action_obj.action == 'love') simulate_swipe(true)
        else if (action_obj.action == 'dislike') simulate_swipe(false)
        else chat_with()

        localStorage.removeItem('action')
    }
    if (window.innerWidth < 300) {
        is_small.value = true
    }

    const set_bar = () => {
        StatusBar.setBackgroundColor({ color: "#fb4073" })
    }

    set_bar()
})
const counter = ref(0)
setInterval(() => {
    counter.value++;
}, 800)

const load = ref<any>()
watch(waiting_room, (neww, oldw) => {
    if (neww == '' && oldw != '') {
        load.value.dismiss()
        router.push('/room/' + oldw)
    }
})

const open_new_match = async () => {
    const room = rooms.value.filter(e => e.slug == room_slug(user.value?.id as number, current_match.value?.pk as number))[0]
    if (room) router.push(`/room/${room.slug}`)
    else force_room()
}

const chat_with = () => {
    if (user.value) {
        if (!user.value.cur_abn.get_typ.features?.includes('chat_all')) {
            ltext.value = "Ecrire à tout le monde sans avoir besoin de matcher est exclusivelent réservé aux VIP."
            lOpen.value = true
        } else {
            const room = rooms.value.filter(e => e.slug == room_slug(user.value?.id as number, current_img[0].pk as number))[0]
            if (room) {
                router.push(`/room/${room.slug}`)
            } else {
                initiate_chat(user.value.id as number, current_img[0].pk as number)
            }
        }
    }
}


useBackButton(11, (process) => {
    isMacth.value = false
    current_match.value = undefined
    process()
})

/* setTimeout(() => {
    rooms.value = []
}, 1500) */

const f_stp = ref(0)

const next_fstp = () => {
    f_stp.value++;
    if (f_stp.value > 2) come_first.value = false
}

const textImg = computed(() => {
    if (!f_stp.value) return {
        img: "sr",
        txt: "Glissez le profil vers la droite si vous kiffez. Si c'est réciproque ce sera un match."
    }
    else if (f_stp.value == 1) return {
        img: "sl",
        txt: "Glissez le profil vers la gauche si vous ne kiffez pas."
    }
    else if (f_stp.value == 2) return {
        img: "cl",
        txt: "Cliquez pour voir plus de photos"
    }
    else return {
        img: "sr.svg",
        txt: "Cliquez pour voir plus de photos"
    }
})

const set_user_from_login = () => {
    const uss = localStorage.getItem('from_login')
    if (uss) {
        user.value = JSON.parse(uss)
        if (user.value) {
            localStorage.removeItem('from_login')
        }
    }
}
set_user_from_login()

check_first_come()



</script>
