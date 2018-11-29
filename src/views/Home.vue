<template>
  <div class="home">
      <input v-model="inputStr"/><button v-on:click="sendMsg">发送</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import io from 'socket.io-client'

@Component({
  components: {
   
  },
  })
export default class Home extends Vue {
      inputStr:string = ''

      arr:any = {
        'Message': '消息',
        'Contact': '联系人',
        'Dynamic': '动态'
      }
      
      shift:any
      open:boolean = false
      userInfo:string = this.$store.state.userInfo
      websocket:any = null;
      sendMsg():void{
        var inputstr = this.inputStr;
        
        this.websocket.emit('testone',inputstr);
        console.log('send content:'+inputstr);
      }

      mounted() :void {
      this.$nextTick(function () {
        this.shift = this.$route.name;
        console.log('this router name is :'+this.shift);
        this.websocketConfig();
      })
    }


     websocketConfig():void{
       if ("WebSocket" in window)
            {
               console.log("您的浏览器支持 WebSocket!");
               
               // 打开一个 web socket
                //使用websocket协议连接服务器端
               this.websocket = io('http://localhost:3000/',{"transports":['websocket']}); 
               this.websocket.on('connect',function(){
                   console.log('connect');
               })
               this.websocket.on('event',function(data:any){
                   console.log('event:'+data);
               })
               this.websocket.on('disconnect',function(){
                   console.log('disconnect');
               })
            }
            
            else
            {
               // 浏览器不支持 WebSocket
               console.log("您的浏览器不支持 WebSocket!");
            }
   }
}
</script>

<style lang="scss" scoped>
  .index {
    height: 100vh;
  }   
  .mu-bottom-nav {
    bottom: 0;
    border-top:2px solid #F1F4F3;
    width: 100vw;
  }
  .home{
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-align: center;
        -ms-flex-pack: center;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #f5f5f5;
  }
</style>