<script>
export default{
  async mounted(){
    this.access_token = localStorage.getItem("access_token");
    this.GetMe();
  },
  methods:{
      async LogOut () {
        localStorage.setItem("access_token", "");
        this.$router.push({ name: 'home'})
      },
      async JoinQuiz () {
          const res = await fetch("https://localhost:7181/Game/JoinGame/" + data + "/" + this.name + "/" + this.id,{method:"PUT"})
          console.log(res);
          localStorage.setItem("player_name", this.name);
          this.$router.push({ name: 'Lobby', params:{id: data}})
        console.log(data)
        if (data != 0) {
          
        }else{
          console.log(data)
        }
      },
      async HostQuiz () {
        
        const res = await fetch('https://localhost:7181/Game/CreateGame?token=' + this.access_token)
        const data = await res.json()
        console.log(data)
        if (data != 0) {
          const res2 = await fetch("https://localhost:7181/Game/JoinGame/" + data + "/" + this.name + "/" + this.id,{method:"PUT"})
          console.log(res2);
          localStorage.setItem("player_name", this.name);
          this.$router.push({ name: 'Lobby', params:{id: data}})
        }else{
          console.log(data)
        }
      },
      GoToHome(){
        this.$router.push("/")
      },
      async GetMe(){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.spotify.com/v1/me");
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
        xhr.send();
        xhr.onload = () => {
          if ( xhr.status == 200 ){
            var data = JSON.parse(xhr.responseText);
            this.name = data.display_name;
            this.id = data.id;
            this.profileImg = data.images[0].url;
            console.log(this.id);
          }
        }
      }
    },
    data(){
      return{
        name: "",
        id: "",
        profileImg: ""
      }
    }
  }

</script>

<template>
  <main class="main-div">
    <header class="header">
      <div class="header-div" v-if="this.name != ''">
        <img :src= this.profileImg>
        <h3 >Logged in as:  {{ this.name }}</h3>
        <button @click="LogOut()" >Logout</button>
        
      </div>
      <div v-if="this.name == ''">
        <button class="btnlog" @click="GoToHome()">Login Here</button>
      </div>
        
    </header>
    <div v-if="this.name != ''" class="buttondiv">
      <button class="btn" @click="JoinQuiz()">Join Quiz</button>
      <button class="btn" @click="HostQuiz()">Host Quiz</button>
    </div>
      
  </main>
</template>

<style scoped>
  .buttondiv{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn{
    width: 200pt;
    height: 80pt;
    text-align: center;
    background-color: green;
  }
  .btnlog{
    width: 50pt;
    height: 30pt;
    text-align: center;
    background-color: green;
  }

  .main-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 30pt;
  }

  .header{
    display: flex;
    width: 100%;
  }

  .header-div{
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 20pt;
    align-self: flex-end;
  }
  img {
    max-height: 100%;
    height: auto;
    width: auto\9; /* ie8 */
}
</style>
