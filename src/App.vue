<template>
  <div id="app">
    <div class="header">
      <span class="header__logo">
        Chat app
      </span>
    </div>

    <div class=main>
      <signup-form
        v-if="!signedUp"
        v-bind:userName="userName"
        v-on:SUBMITTED="onSubmitUserName"
      />

      <rooms-selector
        v-if="signedUp && !selectedRoom.length"
        v-on:ROOM_SELECTED="onRoomSelected"
      />

      <chat-container
        v-if="!!selectedRoom.length"
        v-bind:selectedRoom="selectedRoom"
        v-bind:userName="userName"
        v-bind:profileImage="profileImage"
      />
    </div>
  </div>
</template>

<script>
import SignupForm from './components/SignupForm.vue';
import RoomsSelector from './components/RoomsSelector.vue';
import ChatContainer from './components/ChatContainer.vue';

export default {
  name: 'app',

  data() {
    return {
      userName: '',
      profileImage: '' || './assets/profile-ing.jpg',
      signedUp: false,
      selectedRoom: '',
    }
  },

  components: {
    SignupForm,
    RoomsSelector,
    ChatContainer,
  },

  methods: {
    onSubmitUserName(data) {
      this.signedUp = true;
      this.userName = data.userName;
      this.profileImage = data.profileImage;
    },

    onRoomSelected(data) {
      this.selectedRoom = data.room;

      this.$socket.emit('JOINED_ROOM', {
        room: data.room,
        userName: this.userName,
      });
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: #2c3e50;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

.header {
  display: flex;
  padding: 16px;
}

.header__logo {
  font-size: 30px;
  font-weight: 900;
  color: #fff;
}

.main {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
