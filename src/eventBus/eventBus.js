import Vue from "vue";

export const EventBus = new Vue({
  methods: {
    notify(eventName, eventParams) {
      this.$emit(eventName, eventParams);
    },
  },
});

// createBus = setupBus
export function createBus() {
  Object.defineProperties(Vue.prototype, {
    $bus: {
      get: function() {
        return EventBus;
      },
    },
  });
}
