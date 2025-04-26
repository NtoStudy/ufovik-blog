<template>
    <div class="audio-player">
      <audio
        ref="audioRef"
        :src="audioSrc"
        :autoplay="autoplay"
        :loop="loop"
        @timeupdate="updateProgress"
      ></audio>
      <div class="progress-bar" ref="progressBarRef">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  defineProps<{
    audioSrc: string; // 音频文件的路径
    autoplay?: boolean; // 是否自动播放，默认为false
    loop?: boolean; // 是否循环播放，默认为false
  }>();
  
  const audioRef = ref<HTMLAudioElement | null>(null);
  const progressBarRef = ref<HTMLDivElement | null>(null);
  const progress = ref<number>(0);
  
  // 更新进度条
  const updateProgress = () => {
    if (audioRef.value && progressBarRef.value) {
      const percentage = (audioRef.value.currentTime / audioRef.value.duration) * 100;
      progress.value = percentage;
    }
  };
  
  // 组件挂载后，调整进度条位置以固定在页面底部
  onMounted(() => {
    if (progressBarRef.value) {
      progressBarRef.value.style.position = 'fixed';
      progressBarRef.value.style.zIndex = '99999';
      progressBarRef.value.style.bottom = '0';
      progressBarRef.value.style.width = '100%';
      progressBarRef.value.style.background = 'transparent';
    }
  });
  </script>
  
  <style scoped>
  .audio-player {
    position: relative;
  }
  
  .progress-bar {
    height: 4px;
  }
  
  .progress {
    height: 100%;
    background: #90cf92;
    transition: width 0.1s;
  }
  </style>
  