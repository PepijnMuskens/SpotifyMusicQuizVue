<script>
export default{
  methods:{
    async getAnswers(guess){
      if(guess != 0){
        const requestOptions = {
          method: 'GET',
          headers: { 'x-rapidapi-key': '662ba3d517mshcb3fea0ab3dc1b6p1d560ejsnb261a4d1e441' }
        }
        const res = await fetch('https://shazam.p.rapidapi.com/search?term='+ guess, requestOptions)
        const data = await res.json()
        console.log(data.tracks.hits)
        var i =0;
        data.tracks.hits.forEach(element => {
          this.PossibleGuesses[i] = {name:element.track.title, artist:element.track.subtitle}
          i++;
        });
      }
      
      },

      async Play(){
        
        var audio = new Audio('data:audio/mpeg;base64,'+this.round.songs[this.index].fullSongBase64);
        audio.play();
        setTimeout(()=> {audio.pause();}, this.currentGuessTime);
      },

      async MoreTime(){
        this.attempt++;
        this.currentGuessTime += this.round.extraTime;
      },

      async Guess(name){
        if(name == this.round.songs[this.index].name){ //correct guess
          this.round.score += 1100 - this.attempt * 100;
        }
        this.index++

        if(this.index >= this.round.songs.length){
          if(this.round.number == 2){
            this.$router.push({ name: 'StartQuiz'})
          }
          const res = await fetch('https://musiq-quiz.onrender.com/roundinfo/'+this.$route.params.id+'/'+ (this.round.number + 1));
          const data = await res.json();
          this.round = data;
          this.index = 0;
        }
        this.currentGuessTime = this.round.guessTime;
        this.attempt = 1;
        this.PossibleGuesses =[];
        this.guess = '';
      }
    },
    data(){
        return{
          guess: '',
          index: 0,
          currentGuessTime: 0,
          attempt: 1,
          PossibleGuesses:[
            {
              name:'',
              artist: ''
            }
          ],
            round:{
                name:'',
                number: 0,
                score: 0,
                guessTime: 2000,
                extraTime: 2000,
                songs:[
                    {
                      name:'',
                      fullSongBase64:''
                    }
                ]
            }
        }
    },
    async beforeMount(){
      const res = await fetch('https://musiq-quiz.onrender.com/roundinfo/'+this.$route.params.id+'/'+ 1)
      const data = await res.json()
      this.round = data;
      this.currentGuessTime = this.round.guessTime;
      this.PossibleGuesses = [];
    }
  }

</script>

<template>
  <main class="main-div">
    <div class="answers-div">
      <h1>Round {{ this.round.number }}: {{ this.round.name }}</h1>
      <h1>Score: {{ this.round.score }}</h1>
      <div style="height: 200pt;">
        <button @click="Play()">
          Play
        </button>
      </div>
      <button @click="MoreTime()" v-if="this.attempt < 5"> extra time</button>
      <button @click="Guess('')" v-if="this.attempt >= 5"> Give Up</button>
      <input v-model="this.guess">
        <div v-for="guess in this.PossibleGuesses" :key="guess.name" style="padding-top: 10pt;">
          <button class="btnansw" @click="Guess(guess.name)">{{ guess.name}} <br>~<br> {{guess.artist}} </button>
        </div>
    </div>
    <button class="btn"  @click="getAnswers(this.guess)">Guess</button>
  </main>
</template>

<style scoped>
.btnansw{
    width: 160pt;
    text-align: center;
    background-color: rgb(229, 255, 0);
  }
  .btn{
    width: 200pt;
    height: 80pt;
    text-align: center;
    background-color: blue;
  }

  .main-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .answers-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 100%;
  }
</style>
