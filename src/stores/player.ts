import { defineStore, storeToRefs } from "pinia";
import { onMounted, onUnmounted, watch } from "vue";
import { LoopOnce, ShuffleOne, PlayOnce } from '@icon-park/vue-next';
import type { Song } from "@/models/song";
import type { SongUrl } from "@/models/song_url";
import { useDetail, useSongUrl } from "@/services/api";
import type { Icon } from "@icon-park/vue-next/lib/runtime";

const localStorageKeyTypeMap: Record<string, string> = {
  volume: 'PLAYER-VOLUME',
}

const loopTypeMap: Record<string, any> = {
  singleCirculation: { key: 0, title: 'singleCirculation', icon: PlayOnce, },
  listCirculation: { key: 1, title: 'listCirculation', icon: LoopOnce },
  random: { key: 2, title: 'random', icon: ShuffleOne },
}

const usePlayerStore = defineStore('player', {
  state() {
    return {
      audio: new Audio(),
      loopType: loopTypeMap.singleCirculation.key,
      volume: localStorage.getItem(localStorageKeyTypeMap.volume)?.toInt() || 60,
      playList: [] as Song[],
      showPlayList: false,
      id: 0, // current playing song's id
      url: '',
      songUrl: {} as SongUrl,
      song: {} as Song,
      isPlaying: false,
      isPause: false,
      isDraggingSlider: false, // is dragging slider bar
      isEnded: false, 
      muted: false, // is sound off
      currentTime: 0,
      duration: 0,
    };
  },
  getters: {
    playListCount: (state) => state.playList.length || 0,
    currentIndex: state => state.playList.findIndex(song => song.id === state.id),
    nextSong(state): Song{
      const { playListCount, currentIndex } = this;
      // in last, change to first
      if(currentIndex === playListCount -1) {
        return state.playList.first();
      }
      return state.playList[currentIndex + 1];
    },
    prevSong(state): Song {
      const { currentIndex } = this;
      // in first, change to last
      if(currentIndex === 0) {
        return state.playList.last();
      }
      return state.playList[currentIndex - 1];
    },
    loopTypeIcon(state): Icon{
      const keys = Object.keys(loopTypeMap);
      let targetIcon: Icon = PlayOnce;
      keys.forEach((k: string) => {
        if((k && loopTypeMap[k].key) === state.loopType){
          targetIcon = loopTypeMap[k].icon;
        }
      })
      return targetIcon;
    }
  },
  actions: {
    init(){
      this.audio.volume = this.volume / 100;
    },
    // add song to playlist
    pushSongToPlayList(replace: boolean, ...list: Song[]){
      if(replace){
        this.playList = list;
        return;
      }
      list.forEach(song => {
        // check is already exist in list
        const findIndex = this.playList.findIndex(p => p.id === song.id);
        if(findIndex === -1){
          this.playList.push(song);
        }
      })
    },
    clearPlayList(){
      this.playList = [] as Song[];
      this.showPlayList = false;
      this.id = 0;
      this.url =  '';
      this.songUrl = {} as SongUrl;
      this.song = {} as Song;
      this.isPlaying = false;
      this.isPause = false;
      this.isDraggingSlider = false;
      this.isEnded = false;
      this.muted = false;
      this.currentTime = 0;
      setTimeout(() => {
        this.duration = 0;
      }, 500);
    },
    async play(id: number) {
      if(id === this.id) return;
      this.isPlaying = false;
      const data = await useSongUrl(id);
      this.audio.src = data.url;
      this.audio.play().then(res => {
        this.isPlaying = true;
        this.songUrl = data;
        this.id = id;
        this.getSongDetail();
      }).catch(err => {
        console.log("🚀 ~ file: player.ts:104 ~ this.audio.play ~ err:", err)
      })
    },
    async getSongDetail() {
      this.song = await useDetail(this.id);
      this.pushSongToPlayList(false, this.song);
    },
    rePlay(){
      setTimeout(() => {
        this.currentTime = 0;
        this.audio.play();
      }, 1500)
    },
    prev(){
      this.play(this.prevSong.id);
    },
    next(){
      if(this.loopType === loopTypeMap.random.key){
        this.randomPlay();
      } else {
        this.play(this.nextSong.id);
      }
    },
    randomPlay(){
      this.play(this.playList.sample().id);
    },
    // flag: true ---> play, flag: false ---> pause
    togglePlay(flag: boolean){
      if(!this.song.id) return;
      this.isPlaying = flag;
      if(flag){
        this.audio.play();
        this.isPause = false;
      } else {
        this.audio.pause();
        this.isPause = true;
      }
    },
    setPlay() {
      this.togglePlay(true);
    },
    setPause() {
      this.togglePlay(false);
    },
    toggleLoopType(){
      if(this.loopType === Object.keys(loopTypeMap).length -1){
        this.loopType = 0;
        return;
      }
      this.loopType ++;
    },
    toggleMuted(){
      this.muted = !this.muted;
      this.audio.muted = this.muted;
    },
    setVolume(n: number){
      n = n > 100 ? 100 : n;
      n = n < 0 ? 0 : n;
      this.volume = n;
      this.audio.volume = n / 100;
      localStorage.setItem(localStorageKeyTypeMap.volume, n.toString());
    },
    // 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）
    onSliderChange(val: number) {
      this.currentTime = val;
      this.isDraggingSlider = false;
      this.audio.currentTime = val;
    },
    //数据改变时触发（使用鼠标拖曳时，活动过程实时触发）
    onDraggingSlider(){
      this.isDraggingSlider = true;
    },
    handlePlayTime(){
      if(this.isPlaying && !this.isDraggingSlider){
        this.currentTime = parseInt(this.audio.currentTime.toString())
        this.duration = parseInt(this.audio.duration.toString());
        this.isEnded = this.audio.ended;
      }
    },
    playEnd(){
      console.log('play end');
      switch(this.loopType){
        case loopTypeMap.listCirculation.key:
          this.next();
          break;
        case loopTypeMap.singleCirculation.key:
          this.rePlay();
          break;
        case loopTypeMap.random.key:
          this.randomPlay();
          break;
        default: 
          break;
      }
    },
  },
});

const userPlayerInit = () => {
  let timer: number | undefined;
  const { init, handlePlayTime, playEnd } = usePlayerStore();
  const { isEnded } = storeToRefs(usePlayerStore());
  watch(isEnded, (value) => {
    if(value) {
      playEnd();
    }
  });
  onMounted(() => {
    init();
    console.log('start to setInterval');
    timer = setInterval(handlePlayTime, 1000);
  });
  onUnmounted(() => {
    clearInterval(timer);
  })
}

export {
  localStorageKeyTypeMap,
  usePlayerStore,
  userPlayerInit,
}