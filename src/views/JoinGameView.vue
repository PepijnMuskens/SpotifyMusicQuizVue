<script>
export default{
  async mounted(){

  },
  methods:{
    async Join(){
      const res = await fetch("https://localhost:7181/Game/JoinGame/" + this.lobbycode + "/" + this.name + "/" + this.id,{method:"PUT"})
        console.log(res);
        localStorage.setItem("player_name", this.name);
        const data = await res.json()
        console.log(data)
        if (data == true) {
          console.log('susses')
          this.$router.push({ name: 'Lobby', params:{id: this.lobbycode}})
        }else{
          console.log(data)
        }
    }
    },
    data(){
        return{
          name: '',
          id: '0',
          lobbycode: ''
        }
    }
  }

</script>

<template>
  <main class="main-div">
    <h1>Join Game</h1>
    <p>Lobby Code</p>
    <input v-model="lobbycode">
    <p>Name</p>
    <input v-model="name">
    <button @click="Join()">Join</button>
  </main>
</template>

<style scoped>
  .main-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 100%;
  }
</style>
