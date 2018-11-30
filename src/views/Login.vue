<template>
  <div id="hello" class="hello">
        <form @submit="onSubmit" class="form-signin" >
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail"  class="sr-only">Email address</label>
          <input type="email" v-model="form.email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" v-model="form.password" id="inputPassword" class="form-control" placeholder="Password" required>
          <div class="checkbox mb-3">
              <label>
              <input type="checkbox" value="remember-me" v-model="form.checked"> Remember me
              </label>
          </div>
          <button v-on:click="toLogin" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <router-link to="/register">register</router-link> | 
          <router-link to="/home">home</router-link> | 
          <router-link to="/about">about</router-link>
          <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
      </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// import ws from 'nodejs-websocket'
import SocketIO from 'socket.io'
import store from '@/store';


@Component({
  components: {
      
  }
})
export default class Login extends Vue {
   @Prop() private msg!: string;
   username:string = '';
   password:string = '';
   isChecked:boolean = true;
   show:boolean = true;

   websocket:any = null;

   form:any = {
       email:'',
       password:'',
       checked:false
   }

   mounted(){
       this.show = false;
   }
   onSubmit(e:any):boolean {
      e.preventDefault();
      console.log(this.form.email);
      //存储用户名
    //   store.dispatch('setUserNickName',this.form.email);
      store.commit('setUserNickName',this.form.email);
      this.$router.push('/home');
      return true
    //   alert(JSON.stringify(this.form));
    }
   toLogin():void{
     console.log('to login');
   }
   validate():void{
       console.log('to validate');
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-align: center;
        -ms-flex-pack: center;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
}
</style>
