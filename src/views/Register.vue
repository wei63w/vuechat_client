<template>
  <div class="register">
    <label> is Register page ddd </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Register extends Vue {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .register{
   height: 300px;
   width: 100%;
   border: 1px solid blue;
 }
</style>
