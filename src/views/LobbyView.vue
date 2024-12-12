<script>
export default{
  async mounted(){
    this.id = this.$route.params.id;
    
    console.log(this.player_name)
        const res = await fetch('https://localhost:7181/Game/GetGame/' + this.id)
        const data = await res.json()
        if (data != null) {
          this.players = data.players;
          this.status = data.Status;
        }else{
          console.log("error: Lobby not found")
        }
        this.owner = localStorage.getItem("player_name") == this.players[0].Name;
        if(this.owner){
          this.GetPlaylists();
          this.GetPlaybackDevices();
        }
  },
  methods:{
    async GetPlaylists(){
        const res = await fetch('https://localhost:7181/api/Userdata/GetPlaylist?userid=' + this.players[0].Id)
        const data = await res.json()
        if (data != null) {
          this.playlists = data;
        }else{
          console.log("error: no playlists Found");
      }
    },
    async GetPlaybackDevices(){
        const res = await fetch('https://localhost:7181/api/Player/GetPlaybackDevices?token=' + localStorage.getItem("access_token"));
        const data = await res.json()
        if (data != null) {
          this.devices = data;
        }else{
          console.log("error: no playlists Found");
      }
    },
    async ToggleStatus(){
      const res = await fetch('https://localhost:7181/Game/ToggleOpen/' + this.id + "/" + this.players[0].Id + "/" + !this.status, {method: "PUT"})
      const data = await res.json()
      if (data == true) {
          
        }else{
          this.status = !this.status;
          console.log("error: Lobby not found")
      }
    },
    async StartQuiz(){
      if (this.playlists.findIndex((p) => p.active) != -1 && this.devices.findIndex((d) => d.is_active) != -1){
        const res = await fetch('https://localhost:7181/Game/StartQuiz');
        const data = await res.json()
        if (data != null) {
          this.devices = data;
        }else{
          console.log("error: no playlists Found");
        }
      }
    }
    },
    data(){
        return{
          player_name: '',
          owner: false,
          id: 0,
          status: false,
          players: 
          [
            {
              Name: '',
              Id: ''
            }
          ],
          playlists:[
            {
              id: '',
              name: '',
              img: '',
              active: false
            }
          ],
          devices:[
            {
              id: '',
              name: '',
              is_active: ''
            }
          ]
        }
    }
  }

</script>

<template>
  <main class="main-div">
    <h1>Lobby Code: {{ this.id }}</h1>
    <div style="display: flex; flex-direction: column; justify-content: center; width: 100%;" v-if="this.owner">
      <h3>Owner</h3>
      <div class="item">
        <input type="checkbox" v-model="this.status" @click="ToggleStatus()">
        <p>open Lobby</p>
      </div>
      <div class="playlists">
        <div class="playlist" v-for="playlist in this.playlists" :key="playlist.id">
          <input type="checkbox" >
          <img :src="playlist.img" style="max-width: 20%; height: auto; width: auto;">
          <h3>{{ playlist.name }}</h3>
        </div>
      </div>
        <div v-for="device in this.devices" :key="device.id" style="display: flex; flex-direction: column; width: 100%;">
          <div style="display: flex; flex-direction: row; align-self: flex-end; width: 100%;">
            <input type="checkbox" v-model="device.is_active" >
          <p style="display: flex; align-self: center;">Audio device name: {{ device.name }}</p>
        </div>
      </div>
    <button style="width: 20%; align-self: center;">Start Quiz</button>
    </div>
    <div v-if="!this.owner">
      <h3>Not Owner</h3>
    </div>
    <div class="playerlist">
      <h3>Players</h3>
      <div v-for="player in this.players" :key="player.Name">
        <p>{{ player.Name }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .main-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  .item{
    display: flex;
    align-self: center;
  }

  .playlists{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }

  .playlist{
    display: flex;
    width: 20%;
    min-width: 200pt;
    margin: 10pt;
    padding: 10pt;
    background-color: rgb(43, 43, 43);
  }

  h3{
    align-self: center;
  }
</style>
