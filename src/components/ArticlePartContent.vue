<template>
   <v-card class="pa-2">

    <div>
      <div class="display-1">
        {{ part.articleTitle }}
      </div>
      <div class="headline">
        {{ part.partTitle }}
      </div>
      <v-divider class="black"></v-divider>
    </div>

    <div align="center" justify="center" class="mt-2 mb-2">
      <youtube :video-id="part.youtube_id" :player-width="playerWidth"/>
    </div>

    <div class="mt-2">
      <v-slider
        v-model="fontSize"
        :label="`Размер шрифта (${fontSize})`"
        step="1"
        max="30"
        min="10"
        tick-size="5"
        color="green"
      ></v-slider>
      <v-tabs
        v-model="tabMode"
        color="green"
        fixed-tabs
      >
        <v-tab
          :key="'eng'"
          ripple
        >
          Текст с подсказками
        </v-tab>

        <v-tab
          :key="'sidebyside'"
          ripple
        >
          Параллельно
        </v-tab>

        <v-tab-item :key="'eng'">
          <div
            v-for="(paragraph, i) in part.content"
            :key="`par1${i}}`"
          >
            <span> &nbsp;&nbsp; </span>
            <span
              v-for="(sentence, j) in paragraph.sentences"
              :key="`par1${i}sen1${j}`"
              :style="textStyle"
            >
              <span>
                {{ sentence.originText }}
              </span>
              <v-icon
                :size="fontSize"
                @click.prevent="toggleVisibility(i, j)"
              >
                help
              </v-icon>
              <span
                v-if="getVisibilityFlag(i, j).value"
                class="success--text"
                style="font-weight:bold"
              >
                {{ sentence.transText }}
              </span>
            </span>
          </div>
        </v-tab-item>

        <v-tab-item :key="'sidebyside'">
          <v-container>
            <v-layout
              row
              wrap
              v-for="(paragraph, i) in part.content"
              :key="`par2${i}}`"
            >

              <v-flex xs6>
                <span>&nbsp;&nbsp;</span>
                <span
                  v-for="(sentence, j) in paragraph.sentences"
                  :key="`par2${i}sen2${j}_origin`"
                  :style="textStyle"
                >
                  <span>
                    {{ sentence.originText }}
                  </span>
                </span>
              </v-flex>

              <v-flex xs6>
                <span>&nbsp;&nbsp;</span>
                <span
                  v-for="(sentence, j) in paragraph.sentences"
                  :key="`par2${i}sen2${j}_trans`"
                  :style="textStyle"
                >
                  <span>
                    {{ sentence.transText }}
                  </span>
                </span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>

      </v-tabs>
    </div>
   </v-card>
</template>

<script>
  export default {
    props: {
      part: {
        type: Object,
        required: true,
      }
    },
    data () {
      return {
        tabMode: 'eng',
        visibilityKeys: [],
        fontSize: 18,
      }
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
      playerWidth () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
        }
      },
      textStyle () {
        return { fontSize: `${this.fontSize}px` }
      },
    },
    created () {
      for (let i = 0; i < this.part.content.length; i++) {
        for (let j = 0; j < this.part.content[i].sentences.length; j++) {
          this.visibilityKeys.push({
            key: `${i}${j}`,
            value: false,
          })
        }
      }
    },
    methods: {
      getVisibilityFlag (i, j) {
        return this.visibilityKeys.find(item => item.key === `${i}${j}`)
      },
      toggleVisibility (i, j) {
        let flag = this.getVisibilityFlag(i, j)
        flag.value = !flag.value
      }
    },
  }
</script>

<style scoped>

</style>
