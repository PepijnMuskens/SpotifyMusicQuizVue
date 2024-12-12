<script>
export default{
  async mounted(){
    if ( window.location.search.length > 0 ){
      this.handleRedirect();
    }
    else{
        this.access_token = localStorage.getItem("access_token");
    }
    if(this.access_token != null){
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.spotify.com/v1/me", true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
      xhr.send();
      xhr.onload = () => {
        if ( xhr.status == 200 ){
          this.$router.push({ name: 'StartQuiz'})
        }
      }
    }
  },
  methods:{
    Join(){
      this.$router.push({ name: 'JoinGame'})
    },
    login(){
      var scope = 'user-read-private user-read-email streaming app-remote-control user-read-playback-state';
      let url = 'https://accounts.spotify.com/authorize';
      url += "?client_id=" + this.client_id;
      url += "&response_type=code";
      url += "&scope=" + scope;
      url += "&redirect_uri=" + this.redirect_uri;
      url += "&show_dialog=true";
      window.location.href = url;
      console.log(url)
    },
    handleRedirect(){
      let code = this.getCode();
      this.fetchAccessToken( code );
      window.history.pushState("", "", this.redirect_uri); // remove param from url
    },
    fetchAccessToken(code){
      let body = "grant_type=authorization_code";
      body += "&code=" + code; 
      body += "&redirect_uri=" + encodeURI(this.redirect_uri);
      body += "&client_id=" + this.client_id;
      body += "&client_secret=" + this.client_secret;
      this.callAuthorizationApi(body);
      console.log(code)
    },
    callAuthorizationApi(body){
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "https://accounts.spotify.com/api/token", true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret));
      xhr.send(body);
      xhr.onload = () => {
      if ( xhr.status == 200 ){
        console.log(xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        if ( data.access_token != undefined ){
            this.access_token = data.access_token;
            localStorage.setItem("access_token", this.access_token);
        }
        if ( data.refresh_token  != undefined ){
            this.refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", this.refresh_token);
        }
        location.reload();
      }
      else {
        console.log(xhr.responseText);
        alert(xhr.responseText);
      }
      }
      
    },
    getCode(){
      let code = null;
      const queryString = window.location.search;
      if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
       code = urlParams.get('code')
      }
      return code;
    }
  },
  data() { 
      return { 
        client_id : "31124b0e5e65469e928086656957fa7f", // your clientId
        client_secret : "13551f14e7d84c1bae74ba936a2b3801", // Your secret
        redirect_uri : "http://127.0.0.1:5173", // Your redirect uri
        access_token : null,
        refresh_token : null
      }
    }
  }

</script>

<template>
  <main>
    <button class="btn btn-primary btn-sm" @click="login()"><span class="fa fa-play-circle-o"></span>Log in</button>
    <button class="btn btn-primary btn-sm" @click="Join()"><span class="fa fa-play-circle-o"></span>Join game without spotify</button>
  </main>
</template>

<style scoped>
  .btn{
    display: flex;
    width: 100%;
  }
</style>
