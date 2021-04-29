<template>
  <div>
    <v-tooltip bottom>
      <v-avatar v-if="word.type == 1" color="teal" :size="size">
        <span class="white--text"> W </span>
      </v-avatar>
      <span>Word / Слово</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-avatar v-if="word.type == 2" color="indigo" :size="size">
        <span class="white--text"> PH </span>
      </v-avatar>
      <!-- need to do (add the helper when hover 'word/phrase') -->
      <span>Phrase / Фраза</span>
    </v-tooltip>
    {{ word.origText }}
    <v-icon v-if="canPronounceWord" @click="pronounce(word)">music_note</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    word: Object,
    size: Number,
    showAudio: { type: Boolean, default: false },
  },
  data() {
    return {
      canPronounceWord: false,
      voice: null,
    };
  },
  methods: {
    pronounce(word) {
      let msg = new SpeechSynthesisUtterance();
      msg.voice = this.voice;
      msg.rate = 1;
      msg.pitch = 1;
      msg.volume = 1;
      msg.text = word.origText;

      speechSynthesis.speak(msg);
    },
  },

  created() {
    if (this.showAudio) {
      if ("speechSynthesis" in window) {
        let englishVoices = speechSynthesis
          .getVoices()
          .filter((v) => v.name.toLowerCase().indexOf("english") >= 1);

        if (englishVoices.length) {
          this.canPronounceWord = true;
          this.voice = englishVoices[0];
        }
      }
    }
  },
};
</script>

<style scoped>
</style>
