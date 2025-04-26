---
layout: doc
layoutClass: m-nav-layout
title: 
sidebar: false
prev: false
next: false
---




<style src="/.vitepress/theme/style/nav.css"></style>

<script setup>
import { NAV_DATA } from '../../.vitepress/theme/utils/data.ts';
import Typewriter from '../../components/Typewriter.vue' ;
import MNavLinks from '../../components/MNavLinks.vue' 
</script>


# <Typewriter text="开发者的梦中情栈" delay="200" type="neon" loop />

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
