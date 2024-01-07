import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { User, Photo, DaySwipe, ProfilSeen, Profil, Card, Essential, SocketMessage, Room, Message, ChatProfil, Niveau, StoreFiles, ProfilStore, Launcher, ProfilStores, PSUrl, Notif } from "./types"
import { access_tok, get_obj, remove_obj, store_obj, toDate, showLoading, show_alert, is_online, presentToast, generateUniqueFileName, set_notifications, estDansLaPlagePermise } from './utils';
import { useWebSocket } from "@vueuse/core"
import { Filesystem, Directory } from "@capacitor/filesystem"
import writer_blob from "capacitor-blob-writer"
import { Capacitor } from "@capacitor/core"
import axios from 'axios';
import router from '@/router';
//const socket_url = "wss://celibapps.statusmax.site/chat/?token="
const socket_url = "ws://localhost:8080/chat/?token="

interface AudioComp {
    is_playing: boolean,
    current_a: string,
    total_a: string,
    myVal: string,
    audio: HTMLAudioElement,
    obj: any
}

export const useUserStore = defineStore('user', () => {

    const day_mess = ref<{
        [key: string]: number[]
    }>({})
    const can_share =computed(() => {
        return Object.keys(all_swipe.value).length > 1
    })
    watch(day_mess, (newd, oldd) => {
        store_obj('day_mess', JSON.stringify(newd))
    })
    const day_discuss = ref()
    const asset_url = ref('https://res.cloudinary.com/dsmjumzll/image/upload/v1')
    const has_sen = ref(1)
    const charged_files = ref<string[]>([])
    const rooms = ref<Room[]>([])
    const has_post = ref(false)

    const offnonym = ref<{room : string, val : number[]}[]>([])
    watch(offnonym, (newo, oldo) => {
        if(oldo) store_obj('offnonym', JSON.stringify(newo))
    })

    setTimeout( async () => {
        const offnonym_ = await get_obj('offnonym')
        if(offnonym_) offnonym.value = JSON.parse(offnonym_)
    }, 2500)

    watch(rooms, (newr, oldr) => {
        if (newr) store_obj('rooms', JSON.stringify(newr))
    }, { deep: true })
    const seen_rooms = ref<number[]>([])
    watch(seen_rooms, (news, olds) => {
        store_obj('seen_rooms', JSON.stringify(news))
    }, {deep : true})
    const messages = ref<Message[]>([])
    watch(messages, (newm, oldm) => {
        if (newm) store_obj('messages', JSON.stringify(newm))
    }, { deep: true })
    const storeFs = ref<StoreFiles[]>([])
    watch(storeFs, (news, olds) => {
        if (news) store_obj('storeFs', JSON.stringify(news))
    }, { deep: true })
    const has_new_room = ref(false)
    const initialised = ref(false)
    const s_url = ref(socket_url)
    setTimeout(async () => {
        s_url.value = socket_url + (await access_tok(useRouter(), undefined))
    }, 50)
    const { send, status } = useWebSocket(s_url, {
        autoReconnect: {
            delay: 10000
        },
        onConnected: (ws) => {
            console.log('Websocket connected: ')
        },
        onDisconnected: async (ws, ev) => {
            console.error('ws disconnected, retrying...')
            s_url.value = socket_url + (await access_tok(useRouter(), undefined))
        },
        onMessage: (ws, ev) => {
            const message: SocketMessage = JSON.parse(ev.data)
            if (message.type == 'initialisation') {
                if (!initialised.value) handle_initialisation(message)
                const deleteds = message.other as number[]
                messages.value = messages.value.filter(e => !deleteds.includes(e.id))
            } else if (message.type == 'new_room') {
                if (!rooms.value.filter(e => e.id == (message.result as Room).id).length) rooms.value.push(message.result as Room), launchers.value.push({ slug: (message.result as Room).slug, launcher: null })
                send(JSON.stringify({
                    type : 'register_me',
                    result : (message.result as Room).slug
                }))
                has_new_room.value = true
                if(g_load.value) {
                    setTimeout(() => {
                        g_load.value.dismiss()
                        g_load.value = undefined
                        router.push(`/room/${(message.result as Room).slug}`)
                    }, 200)
                }
            } else if (message.type == 'new_message') {
                add_message(message.result as Message)
                for(const pk of message.other) if(!only_verified.value.includes(pk)) only_verified.value.push(pk)
                if(!day_mess.value[day_string.value]) {
                    day_mess.value[day_string.value] = []
                }
                if(!day_mess.value[day_string.value].includes((message.result as Message).get_room)) day_mess.value[day_string.value].push((message.result as Message).get_room)
                
            } else if (message.type == 'messsage_update') {
                update_message(message.result)
            } else if (message.type == 'keeping') {
                for (const utp of message.result) update_message(utp)
                for (const rm of message.other) {
                    if (!rooms.value.filter(e => e.id == rm.id).length)
                        rooms.value.push(rm)
                }
            } else if (message.type == 'send_online') {
                const user = message.result as ChatProfil
                for (const room of rooms.value) {
                    if (room.users.filter(e => e.id == user.id).length) {
                        room.users = room.users.filter(e => e.id != user.id)
                        room.users.push(user)
                    }
                }
            } else if (message.type == 'd_m') {
                const pk = message.result as number
                messages.value = messages.value.filter(e => e.id != pk)
                storeFs.value = storeFs.value.filter(e => e.id != pk)

            } else if (message.type == 's_o') {

                const ls = message.result as any[]
                rooms.value.filter(e => e.users.filter(e => e.id == ls[0]).length)[0].users.filter(e => e.id == ls[0])[0].last = ls[1]
            } else if (message.type == 'launcher_send') {
                const laun = message.result as Launcher
                const room = rooms.value.filter(e => e.id == laun.id)[0]
                if (room) {
                    launchers.value.filter(e => e.slug == room.slug)[0].launcher = laun
                }
            } else if (message.type == 'refuse_la') {
                refuse_la(message.result)
            } else if (message.type == 'new_niveau') {
                const niv: Niveau = message.result
                get_room_(message.other as string).niveau = niv
                launchers.value.filter(e => e.slug == message.other)[0].launcher = null
                l_accepted.value = false
            } else if (message.type == 'refused') {
                l_refused.value = false
            } else if (message.type == 's_m') {
                state_obj.value = message.result
                messages.value = messages.value.filter(e => !([e.id, e.old_pk].includes(state_obj.value.old_pk)))
            } else if ( message.type == 'new_notif') {
                const notif = message.result as Notif
                const dt = new Date()
                const new_notifs = notifs.value.filter(e => (( dt.getTime() - toDate(e.created_at).getTime() ) / 1000) < 31 * 24 * 60 *60)
                if(!notifs.value.filter(e => e.id == notif.id)[0]) new_notifs.push(notif)
                notifs.value = new_notifs
            } else if ( message.type == 'offnonym') {
                const result = message.result
                offnonym.value = [result].concat(offnonym.value.filter(e => e.room != result.room)) 
            } else if (message.type == 'anonym_on') {
                const room = rooms.value.filter(e => e.slug == message.result)[0]
                if(room) {
                    room.is_proposed = false
                    room.get_anonymous = undefined
                    offnonym.value = offnonym.value.filter(e => e.room != room.slug)
                    router.replace('/room/' + room.slug)
                    show_alert('Mode anonyme désactivé', "Vous pouvez maintenant voir le profil de " + room.users.filter(e => e.id != user.value?.id)[0].prenom + " car le mode anonyme a été désactivé.")
                }
            } else if (message.type == 'new_post') { 
                has_post.value = true
            }
        },
    })



    const refuse_la = (result: any) => {
        const laun = result as Launcher
        const room = rooms.value.filter(e => e.id == laun.id)[0]
        const you = room.users.filter(e => e.id != user.value?.id)[0]
        if (launchers.value.filter(e => e.slug == room.slug)[0].launcher) show_alert('Demande rejeté.', `${you.prenom} a rejeté votre demande de passage à l'etape suivante.`)
        launchers.value.filter(e => e.slug == room.slug)[0].launcher = null
        l_refused.value = false
    }

    const send_times = ref(0)

    const send_essentials = () => {
        const rescues = messages.value.filter(e => e.id != user.value?.id).filter(e => e.step != 'seen')
        const pks = []
        const nivs = [] as { room: number, niv: string }[]
        const mlikes = [] as number[]
        const mmatches = [] as number[]
        const not_mmatches = [] as any[]
        const oth_mmatches = [] as any[]
        for(const l of likes.value) mlikes.push(l)
        for(const m of matches.value) mmatches.push(m)
        for(const m of oth_matches.value) oth_mmatches.push(m)
        for(const m of not_matches.value) not_mmatches.push(m)
        for (const res of rescues) pks.push(res.id)
        for (const r of rooms.value) nivs.push({ room: r.id, niv: `${r.niveau.level}:${r.niveau.get_task.id}` })
        const content = {
            'type': 'heartbeat',
            'essentials': new_essentials.value,
            'likes': mlikes,
            'matches': mmatches,
            'rescues': pks,
            'nivs': nivs,
            'time' : send_times.value,
            'oth_matches' : oth_mmatches,
            'not_matches' : not_mmatches
        }
        send_times.value = 1
        remove_obj('seen_tofs')
        remove_obj('already_seens')
        remove_obj('all_swipe')
        send(JSON.stringify(content))

        setTimeout(() => {
            matches.value = []
            likes.value = []
            oth_matches.value = []
            not_matches.value = []
        }, 100)

    }
    setInterval(() => {
        send_essentials()
        if(user.value && !notif_registred.value) {
                set_notifications()
                setTimeout(() => {
                    notif_registred.value = true
                }, 200)
        }
    }, 60000)
    
    const handle_initialisation = async (message: SocketMessage) => {
        const res = message['result']
        const room_pks = [] as number[]
        for (const room of (res['rooms'] as Room[])) {
            if (rooms.value.filter(e => e.id == room.id).length == 0) rooms.value.push(room), has_new_room.value = true
            room_pks.push(room.id)
        }
        const pks = [] as number[]
        for (const message of (res['messages'] as Message[])) {
            if (message.step != 'seen') pks.push(message.id)
            add_message(message)
        }
        const ess = res['essentials']
        set_essential(ess)
        if(user.value?.cur_abn) {
            if (user.value && res['verif']) {
                user.value.cur_abn.verif = res['verif']
            } else if (!res['verif'] && user.value) {
                 user.value.cur_abn.verif = undefined
            }
        }
        if(res['asset_url']) {

            asset_url.value = res['asset_url']
        }
        day_discuss.value = res['day_discuss']

        const content: SocketMessage = {
            type: 'keeping',
            result: pks,
            other: room_pks
        }
        const ntfs = res['notifs'] as Notif[]
        for(const ntf of ntfs) {
            if(!notifs.value.filter(e => e.id == ntf.id)[0]) notifs.value.push(ntf)
        }

        send(JSON.stringify(content))
        initialised.value = true
        send_essentials()

        if(res['bad_profil']) {
            setTimeout(() => {
                router.push('/bad')
            }, 2000)
        }
        else if (res["should_invite"]) {
            const has_inv =  await get_obj('has_invited')
            setTimeout(() => {
                if(!has_inv && can_share.value) {
                    router.push('/invite')
                }
            }, 500)
        }
    }
    const add_message = (message: Message) => {
        messages.value = messages.value.filter(e => e.id != message.id)
        const old_pk = message.old_pk as number
        if (storeFs.value.filter(e => e.id == old_pk)[0]) {
            storeFs.value.filter(e => e.id == old_pk)[0].id = message.id
        }
        messages.value.push(message)
        const m: SocketMessage = {
            type: 'r_m',
            result: message.id
        }
        if (message.user != user.value?.id) {
            send(JSON.stringify(m))
        }

    }
    const update_message = (stpk: (string | number)[]) => {
        for (const message of messages.value) {
            if (stpk[1] == message.id) {
                message.step = stpk[0] as string
            }
        }

    }

    const has_new = computed(() => {
        return (messages.value.filter(e => (e.user != user.value?.id && e.step != 'seen')).length > 0)
    })


    const day_string = computed(() => {
        const dt = new Date()
        return `${dt.getFullYear()}:${dt.getMonth() + 1}:${dt.getDate()}`
    })
    const notif_registred = ref(false)
    const user = ref<User>()
    watch(user, (newu, oldu) => {
        store_obj('user', JSON.stringify(newu))
        
    }, { deep: true })
    const has_checked = ref(false)
    const seen_tofs = ref<number[]>([])
    const already_seens = ref<ProfilSeen[]>([])
    watch(already_seens, (newa, olda) => {
        store_obj('already_seens', JSON.stringify(newa))
    }, { deep: true })
    watch(seen_tofs, (news, olds) => {
        store_obj('seen_tofs', JSON.stringify(news))
    }, { deep: true })

    const excepts = computed(() => {
        const liste = [] as number[]
        already_seens.value.forEach(element => {
            const since = new Date(element.since)
            const dt = new Date()
            if ((dt.getTime() - since.getTime()) < (4 * 24 * 60 * 60)) liste.push(element.id)
        });
        return liste
    })
    const likes = ref<number[]>([])
    watch(likes, (newl, oldl) => {
        store_obj('likes', JSON.stringify(newl))
    }, { deep : true })
    const dislikes = ref<number[]>([])
    const all_swipe = ref<DaySwipe>({})
    const matches = ref<number[]>([])
    const oth_matches = ref<{
        user : number,
        typ : string,
        obj : string
    }[]>([])
    const not_matches = ref<{
        user : number,
        typ : string,
        obj : string
    }[]>([])
    watch(matches, (newm, oldm) => {
        store_obj('matches', JSON.stringify(newm))
    }, {deep : true})
    watch(all_swipe, (newu, oldu) => {
        store_obj('all_swipe', JSON.stringify(newu))
    }, { deep: true })
    const day_limit = computed(() => {
        if (!user.value) return 0
        if (!user.value.cur_abn) return 0
        return user.value.cur_abn.get_typ.limit
    })
	
    const can_swipe = computed(() => {
        if ((!user.value?.cur_abn) || !user.value.cur_abn.is_on) {
            if(!all_swipe.value[day_string.value]) all_swipe.value[day_string.value] = 0;
            return all_swipe.value[day_string.value] < 10
        }
        return all_swipe.value[day_string.value] ? (all_swipe.value[day_string.value] < day_limit.value) : true
    })
    
    const update_user = async () => {
        const stored_user = await get_obj('user')
        if (stored_user) user.value = JSON.parse(stored_user)
    }

    const new_essentials = ref<Essential>({
        all_swipe: {},
        seen_tofs: [],
        already_seens: []
    })
    const store_card = (card: Card) => {

        const as = {
            id: card.pk,
            since: (new Date()).toUTCString()
        }
        already_seens.value.push(as)
        new_essentials.value?.already_seens.push(as)

        seen_tofs.value.push(urlToPk.value[`card:${card.pk}`])
        new_essentials.value?.seen_tofs.push(urlToPk.value[`card:${card.pk}`])

        if (!all_swipe.value[day_string.value]) all_swipe.value[day_string.value] = 1
        else all_swipe.value[day_string.value]++;
        (new_essentials.value as Essential).all_swipe[day_string.value] = all_swipe.value[day_string.value]

    }

    const swipe_right = (card: Card) => {
        likes.value.push(card.pk)
        store_card(card)
    }
    const swipe_left = (card: Card) => {
        dislikes.value.push(card.pk)
        store_card(card)
    }
    const why_cant_swipe = (card: Card) => {
        if (!user.value?.cur_abn) return 'abon'
        if (!user.value.cur_abn.is_on) return 'expired'
        else return 'limit'
    }

    const urlToPk = ref<{
        [key: string]: number
    }>({})

    const build_card = (profil: Profil) => {
        let rimg = "", color = "", pk = 0
        if (!seen_tofs.value.includes(profil.get_profil.id)) rimg = profil.get_profil.get_picture, color = profil.get_profil.color, pk = profil.get_profil.id
        else {
            profil.photos.forEach(element => {
                if (!seen_tofs.value.includes(element.id)) rimg = element.get_picture, color = element.color, pk = element.id
            });
        }
        if (rimg == '') rimg = profil.get_profil.get_picture, color = profil.get_profil.color, pk = profil.get_profil.id
        const card: Card = {
            url: rimg.includes('https://') ? rimg : asset_url.value + rimg ,
            name: profil.prenom,
            color,
            sign: profil.get_sign,
            pk: profil.id,
            status : profil.get_status,
            photos : profil.photos.length,
            get_age : profil.get_age as string,
            i_like : profil.i_like,
            commons : profil.commons,
            reaction : profil.reaction
        }
        urlToPk.value[`card:${card.pk}`] = pk
        return card
    }

    const plikes = computed(() => {
        if (!user.value) return []
        return user.value.get_likes
    })



    const set_essential = async (ess: Essential) => {
        seen_tofs.value = ess.seen_tofs
        already_seens.value = ess.already_seens
        all_swipe.value = ess.all_swipe

        let seens = await get_obj('already_seens')
        if (seens) {
            seens = JSON.parse(seens)
            for (const seen of seens) {
                new_essentials.value?.already_seens.push(seen)
            }
        }

        let swipes = await get_obj('all_swipe')
        if (swipes) {
            swipes = JSON.parse(swipes)
            for (const swpe in swipes) {
                (new_essentials.value as Essential).all_swipe[swpe] = swipes[swpe]
            }
        }
    }
    const set_all = async () => {
        update_user()
        const profil_stores_ = await get_obj('profil_stores')
        if (profil_stores_) profil_stores.value = JSON.parse(profil_stores_)
        const rooms_ = await get_obj('rooms')
        if (rooms_) rooms.value = JSON.parse(rooms_)
        const messages_ = await get_obj('messages')
        if (messages_) messages.value = JSON.parse(messages_)

        const stores_ = await get_obj('storeFs')
        if (stores_) storeFs.value = JSON.parse(stores_)

        for (const r of rooms.value) launchers.value.push({ slug: r.slug, launcher: null })

        const has_sen_ = await get_obj('has_sen')
        if (has_sen_ == 0 || has_sen_ == 1) has_sen.value = has_sen_

        const payment_ = await get_obj('payment')
        if(payment_) if (!(payment_ as string).includes('null')) payment.value = JSON.parse(payment_)

        const seen_rooms_ = await get_obj('seen_rooms')
        if(seen_rooms_) seen_rooms.value = JSON.parse(seen_rooms_)

        const notif_registred_ = await get_obj('notif_registred')
        if(notif_registred_) notif_registred.value = true

        const notifs_ = await get_obj('notifs')
        if(notifs_) notifs.value = JSON.parse(notifs_)

        const seen_notifs_ = await get_obj('seen_notifs')
        if(seen_notifs_) seen_notifs.value = JSON.parse(seen_notifs_)

        const day_mess_ = await get_obj('day_mess')
        if(day_mess_) day_mess.value = JSON.parse(day_mess_)

        const matches_ = await get_obj('matches')
        if(matches_) matches.value = JSON.parse(matches_)

        const likes_ = await get_obj('likes')
        if(likes_) likes.value = JSON.parse(likes_)
    }
    set_all()

    const check_first_come = async () => {
	
        const come_first_ = await get_obj('come_first')
        if(!come_first_ && !is_blocked.value) come_first.value = true    
    }

    const here_first = computed(() => {
        return come_first.value
    })

    const last_message = (room: Room) => {
        const mess = messages.value.filter(e => e.get_room == room.id).sort((a, b) => (toDate(b.created_at).getTime() - toDate(a.created_at).getTime()))[0]
        if (mess) return mess
        else {
            const no_mess: Message = {
                id: 0,
                get_room: room.id,
                created_at: room.created_at,
                step: 'seen',
                text: !room.is_proposed ? room.why : "Soyez le premier à demarrer la conversation" ,
                image: null,
                audio: null,
                video: null,
                user: 0
            }
            return no_mess
        }
    }

    const proposed_rooms = computed(() => {
        return rooms.value.filter(e => e.is_proposed).sort((a, b) => (toDate(last_message(b).created_at).getTime() - toDate(last_message(a).created_at).getTime()))
    })

    const gained_rooms = computed(() => {
        return rooms.value.filter(e => !e.is_proposed).sort((a, b) => (toDate(last_message(b).created_at).getTime() - toDate(last_message(a).created_at).getTime()))
    })
    
    const user_matches = computed(() => {
        const users = [] as ChatProfil[]
        for (const room of rooms.value) {
            const _you = room.users.filter(e => e.id != user.value?.id)[0]
            if (users.filter(e => e.id == _you.id).length == 0) users.push(_you)
        }
        return users
    })

    const get_room_from_message = (roomId: number) => {
        return rooms.value.filter(e => e.id == roomId)[0]
    }

    const not_seens = (room: Room) => {
        return messages.value.filter(e => e.get_room == room.id).filter(e => e.step != 'seen').filter(e => e.user != user.value?.id)
    }

    const get_room_ = (slug: string) => {
        return rooms.value.filter(e => e.slug == slug)[0]
    }

    const get_room_messages = (room: string, lvl: number) => {
        const messags = messages.value.filter(e => e.get_room == get_room_(room).id).sort((a, b) => toDate(b.created_at).getTime() - toDate(a.created_at).getTime())
        return messags.slice(lvl * 30 + (lvl ? 1 : 0), (lvl + 1) * 30).reverse()
    }

    const can_anonym = ref<boolean>(true)

    const delete_room = async (id: number) => {
        const load = await showLoading('Loading...')
        try {
            const resp = await axios.get('api/delete_room/' + id, {
                headers: {
                    Authorization: `Bearer ${await access_tok(router, load)}`
                }
            })
            if (resp.data['done']) {
                const slug = rooms.value.filter(e => e.id == id)[0].slug
                rooms.value = rooms.value.filter(e => e.id != id)
                seen_rooms.value = seen_rooms.value.filter(e => e != id)
                messages.value = messages.value.filter(e => e.get_room != id)
                send(JSON.stringify({
                    type : 'rmv_me',
                    result : slug
                }))
                router.back()
            }
        } catch (e) {
            show_alert('Erreur de survenue', "Une erreur est survenue lors de la suppression ")
        }
        load.dismiss()
    }
    

    const next_niveau = async (id: number) => {
        const load = await showLoading('Loading...')
        try {
            const resp = await axios.get('api/next_niveau/' + id, {
                headers: {
                    Authorization: `Bearer ${await access_tok(router, load)}`
                }
            })
            if (resp.data['done']) {
                rooms.value.filter(e => e.id == id)[0].niveau = resp.data['done'] as Niveau
            }

        } catch (e) {
            show_alert('Erreur de survenue', "Une erreur est survenue lors de la suppression *4")
        }
        load.dismiss()
    }

    const add_store = (id: number) => {
        const stF: StoreFiles = {
            id,
            path: '',
            src: '',
            downloaded: false,
            obj: null
        }
        const m = messages.value.filter(e => e.id == id)[0]
        if (m.audio || m.video) {
            stF.obj = {
                typ: m.audio ? 'audio' : 'video',
                path: '',
                src: '',
                size: '00:00'
            }
        }
        storeFs.value.push(stF)
        return stF
    }

    /* const pstores  = ref<ProfilStore[]>([])
    watch(pstores, (newp, oldp) => {
        store_obj('pstores', JSON.stringify(newp))
    })

    const get_profil = (user : ChatProfil) => {

    } */

    const is_match = (id: number) => {
        const users = []
        for (const r of rooms.value) {
            const us = r.users.filter(e => e.id != user.value?.id)[0].id
            users.push(us)
        }
        return users.includes(id)
    }

    const remove_message = (id: number) => {
        messages.value = messages.value.filter(e => e.id != id)
    }

    const delete_message = async (id: number, typ: 'me' | 'all') => {
        if (typ == 'me') remove_message(id)
        else {
            const load = await showLoading('Suppression...')
            try {
                const resp = await axios.get('api/delete_message/' + id + '/', {
                    headers: {
                        Authorization: `Bearer ${await access_tok(router, load)}`
                    }
                })
            } catch (e) {

                show_alert('', 'Une erreur est survenue lors de la suppression, veuillez reéssayer.')
            }
            load.dismiss()

        }
    }

    const all_mess = computed(() => {
        return messages.value
    })

    const find_next = (room: string, first: number) => {
        const messags = messages.value.filter(e => e.get_room == get_room_(room).id).sort((a, b) => toDate(b.created_at).getTime() - toDate(a.created_at).getTime())
        let found = false
        const mess: Message[] = []
        for (const m of messags) {
            if (mess.length >= 10) break;
            if (found) {
                mess.push(m)
            }
            if (m.id == first) found = true
        }
        return mess
    }
    const audios = ref<{
        id: number,
        player: AudioComp
    }[]>([])

    const launchers = ref<{ slug: string, launcher: Launcher | null }[]>([])
    const l_accepted = ref(false)
    const l_refused = ref(false)

    const payment = ref<{
        transactionId: string,
        state: string
    } | null>(null)
    watch(payment, (newp, oldp) => {
        store_obj('payment', JSON.stringify(newp))
        if (newp) {
            set_abon(newp)
        }
    }, { deep: true })

    const set_abon = async (pay: {
        transactionId: string,
        state: string
    }) => {
        const load = await showLoading('Activation du ticket...')
        try {
            const resp = await axios.post('api/set_abon/', {
                transactionId: pay.transactionId,
                state: pay.state
            }, {
                headers: {
                    Authorization: `Bearer ${await access_tok(router, load)}`
                }
            })
            if (resp.data['done']) {
                user.value = resp.data['result']
                payment.value = null
                if(pay.state != 'free') all_swipe.value[day_string.value] = 0
                presentToast('top', 'Ticket mis à jour avec succès', "success", 5000)
            } else {
                show_alert('Paiement invalide', "L'identifiant de paiement est incorrecte. Veuillez reéssayer.")
            }
            load.dismiss()
        } catch (e) {
            load.dismiss()
            show_alert('Erreur inattendue', "Une erreur est survenue lors de la mise à jour de votre ticket, veuillez reéssayer.")
        }

    }

    const state_obj = ref<{
        state: string,
        target: number,
        old_pk: number
    }>({
        state: 'on',
        target: 0,
        old_pk: 0
    })

    const profil_stores = ref<ProfilStores[]>([])
    watch(profil_stores, async (newps, oldps) => {
        await store_obj('profil_stores', JSON.stringify(profil_stores.value))
        for (const ps of newps) {
            if (ps.path != '') {
                add_ps_url(ps)
            } else {
               if(ps.url) if(ps.url != '') set_path(ps.url)
            }
        }
    }, { deep: true })

    const set_path = async (url: string) => {
        const resp = await axios({
            url,
            method: "GET",
            responseType: "blob",
        })
        const blob = resp.data as Blob
        const path = `medias/profils/${generateUniqueFileName()}`
        try {
            const writer = await writer_blob({
                path,
                directory: Directory.Data,
                blob,
                fast_mode: true,
                recursive: true,
            })
            profil_stores.value.filter(e => e.url == url)[0].path = path
        } catch (e) {
            console.log(e)
        }
    }

    const ps_url = ref<PSUrl[]>([])
    watch(ps_url, (newss, oldss) => {
        for (const psu of newss) {
            if (psu.src == '') set_src(psu)
        }
    }, { deep: true })

    const set_src = (psu: PSUrl) => {
        if (Capacitor.getPlatform() === "web") {
            Filesystem.readFile({
                path: psu.store.path,
                directory: Directory.Data
            }).then(function ({ data }) {
                const url = URL.createObjectURL(data as Blob);
                ps_url.value.filter(e => e.store.url == psu.store.url)[0].src = url
            });
        } else {

            // It is much easier to get a URL on iOS and Android.

            Filesystem.getUri({
                path: psu.store.path,
                directory: Directory.Data
            }).then(function ({ uri }) {
                ps_url.value.filter(e => e.store.url == psu.store.url)[0].src = Capacitor.convertFileSrc(uri);
            });
        }
    }

    const add_ps_url = (ps: ProfilStores) => {
        if (!ps_url.value.filter(e => e.store.url == ps.url)[0]) {
            ps_url.value.push({
                store: ps,
                src: ''
            })
        }
    }
    const get_or_add = (url: string) => {

        if (!profil_stores.value.filter(e => e.url == url)[0]) profil_stores.value.push({
            url,
            path: ''
        })
        return profil_stores.value.filter(e => e.url == url)[0]
    }

    const f_url = (url: string) => {
            const ps = get_or_add(url)
            if (ps.path) {
                const psu = ps_url.value.filter(e => e.store.url == url)[0]
                if(psu) if (psu.src != '') return psu.src
            }

        return user.value?.sex == 'Homme' ? '../../imgs/woman.png' : '../../imgs/man.png'
    }

    const waiting_room = ref('')
    const g_load = ref<any>()
    const force_room = async () => {
        g_load.value = await showLoading('Initialisation...')
        setTimeout(() => {
            send_essentials()
        }, 20)
    }
    
    const notifs = ref<Notif[]>([])
    const get_notifs = computed(() => {
        return notifs.value.sort((a, b) => toDate(b.created_at).getTime() - toDate(a.created_at).getTime())
    })
    watch(notifs, (newn, oldn) => {
        store_obj('notifs', JSON.stringify(newn))
    }, {deep : true})

    const seen_notifs = ref<number[]>([])
    watch(seen_notifs, (news, olds) => {
        store_obj('seen_notifs', JSON.stringify(news))
    }, {deep : true})

    const has_new_notifs = computed(() => {
        return notifs.value.filter(e => !seen_notifs.value.includes(e.id)).length
    })

    const initiate_chat = async (auth : number, targ : number) => {
        g_load.value = await showLoading('Initialisation')
        setTimeout(() => {
            send(JSON.stringify({
                'type' : 'initiate_chat',
                'result' : {
                    'author' : auth,
                    'target' : targ
                }
            }))
        }, 20)
    }

    const come_first = ref(false)
    watch(come_first, (newc, oldc) => {
        if(newc) {
            store_obj('come_first', 'yes')
        }
    })

    const only_verified = ref<number[]>([])

    const is_blocked = ref(false) 

    return {
        can_anonym,
        user,
        update_user,
        excepts,
        can_swipe,
        swipe_left,
        swipe_right,
        why_cant_swipe,
        build_card,
        plikes,
        matches,
        has_new,
        proposed_rooms,
        gained_rooms,
        user_matches,
        messages,
        rooms,
        get_room_from_message,
        last_message,
        not_seens,
        get_room_messages,
        get_room_,
        delete_room,
        next_niveau,
        storeFs,
        add_store,
        send,
        is_match,
        delete_message,
        all_mess,
        find_next,
        charged_files,
        audios,
        launchers,
        refuse_la,
        l_accepted,
        l_refused,
        has_sen,
        payment,
        state_obj,
        f_url,
        waiting_room,
        has_new_room,
        force_room,
        seen_notifs,
        notifs,
        get_notifs,
        has_new_notifs,
        initiate_chat,
        seen_rooms,
        come_first,
        only_verified,
        day_discuss,
        day_mess,
        check_first_come,
        offnonym,
        here_first,
        is_blocked,
        oth_matches,
        not_matches,
        has_post
    }
})
