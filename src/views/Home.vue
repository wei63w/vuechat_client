<template>
  <div class="jumbotron masthead">
    <div class="container">
        <div class="chatbox ">
          <div class="row" v-for="item in msgArrList" :key="item.value" >
            <div class="col-xs-3">
              <label>{{item.msg.nickname}}:</label>
            </div>
            <div class="col-xs-9">
              <label>{{item.msg.msg}}</label>
            </div>
          </div>
        </div>
        <input class="inputs" v-on:keyup.enter="sendMsg" v-model="inputStr"/><button  v-on:click="sendMsg">发送</button>
        
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import io from 'socket.io-client'
import store from '@/store';

@Component({
  components: {
   
  },
  })
export default class Home extends Vue {
      inputStr:string = ''
      username = store.state.userNickName

      msgArrList:Array<string> = [];


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
        var tempjson = {nickname:this.username,msg:inputstr};
        this.websocket.emit('testone',tempjson);
        console.log('send content:'+tempjson);
        this.inputStr = '';
      }
      mounted() :void {
        console.log('mounted ...... ');
        if(this.username == ''){
           this.$router.push('/login');
        }
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
               var that = this;
               // 打开一个 web socket
                //使用websocket协议连接服务器端
               this.websocket = io('http://localhost:3000/',{"transports":['websocket']}); 
               this.websocket.on('connect',function(){
                   console.log('connect');
               })
               this.websocket.on('event',function(data:any){
                   console.log('event:'+data);
               })
               this.websocket.on('getmsg',function(data:string){//接受到信息 进行显示
                   console.log(JSON.parse(data));
                   that.msgArrList.push(JSON.parse(data));
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
  .container{
        text-align: center;
        margin: auto;
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
  .chatbox{
    height: 350px;
    border: 1px solid blue;
    padding: 20px;
  }

  .inputs{
    height: 100px;
    width: 400px;
  }
</style>