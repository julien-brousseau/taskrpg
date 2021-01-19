<template>
  <transition name="pop">

    <div v-if="showFloatingXp" class="xp">
      <h3>+ {{ showFloatingXp }} xp</h3>
    </div>
    
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['showFloatingXp'])
  }
}
</script>

<style scoped>
.xp {
  margin-top: 22px;
}
h3 {
  color:green;
  margin-right: 20px;
  font-size: 18px;
}

/* Transition animation */
.pop-enter-active {
  animation: slide-in 100ms ease-in forwards;
}
.pop-leave-active {
  animation: slide-out 200ms ease-out forwards;
}
@keyframes slide-in {
  from {
    transform: translateY(15px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-15px);
    opacity: 0
  }
}
</style>
