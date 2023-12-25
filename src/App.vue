<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style>
.seco:active {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.507) 10%, transparent);
}

.seco {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.103) 10%, transparent);
    background-color: rgba(114, 114, 114, 0.212);
    color: white;
}


.accused {
    margin-left: -1.4vh;
}
.alert_colo {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.459), transparent);
    background-color: #fb4073;
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

.tabmess:active {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.507) 10%, transparent);
    background-color: rgb(11, 216, 39);
}

.tabmess {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    box-shadow: 0 10px 25px -3px rgb(11, 216, 39), 0 4px 6px -2px #f2824129 !important;
    background-color: rgb(11, 216, 39);
    color: white;
    transform: scale(1.3);
}

.tabhome:active {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.507) 10%, transparent);
    background-color: #fc1955;
}

.tabhome {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    box-shadow: 0 10px 25px -3px #fc1955, 0 4px 6px -2px #f2824129 !important;
    background-color: #fc1955;
    color: white;
    transform: scale(1.3);
}

.tabbut {
    width: 5vh;
    height: 5vh;
    border-radius: 100%;
    min-height: 5vh;
    min-width: 5vh;
}

.tabm {
    padding: 1.2vh;
}

.tabmenu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    backdrop-filter: blur(35px);
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
}
</style>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { StatusBar } from "@capacitor/status-bar"

const set_bar = () => {
  StatusBar.setBackgroundColor({color : "#fb4073"})
}

set_bar()



</script>
