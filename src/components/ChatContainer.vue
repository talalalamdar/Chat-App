<template>
  <div class="chatConatiner">
    <div class="chat__header">
      <span>  {{ selectedRoom }} </span>
    </div>

    <div class="chat__inner">
      <div>
        <div
          v-for="(item, index) in messages"
          v-bind:key="index"
        >
          <div
            v-if="!item.hasOwnProperty('connected')"
            class="chat__inner__message"
          >
            <div
              class="chat__inner__message__user"
            >
                <div class="chat__inner__message__userImageWrapper">
                  <img
                    class="chat__inner__message__userImage"
                    v-bind:src="userImage(item)"
                  />
                </div>

                <span
                  class="chat__inner__message__userName"
                >
                  {{ item.userName }}
                </span>
            </div>

            <div class="chat__inner__message__inner">
              <span
                v-if="item.message"
              >
                {{ item.message }}
              </span>
            </div>
          </div>

          <div
            class="chat__inner__message__join"
            v-if="item.connected"
          >
           {{ item.userName }} has joined this room
          </div>

          <div
            class="chat__inner__message__left"
            v-if="item.connected === false"
          >
           {{ item.userName }} has left this room
          </div>
        </div>
      </div>

      <span
        class="chat__inner__typingUser"
        v-if="typingUser.length"
      >
        {{ typingUser }} is typing...
      </span>
    </div>

    <form
      class="chat__form"
      v-on:submit="onSubmitMessage"
    >
      <input
        type="text"
        class="chat__form__input"
        placeholder="Type here to chat"
        v-model="messageInput"
        v-on:change="onUpdateMessage"
      />

      <button
        type="submit"
        class="chat__form__submit"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console */
import UserImage from '../assets/profile-img.jpg';

export default {
  data() {
    return {
      messageInput: '',
      messages: [],
      typingUser: '',
    }
  },

  watch: {
    messageInput(newValue) {
      if (newValue.length) {
        this.$socket.emit('USER_TYPING', {
          userName: this.userName,
          room: this.selectedRoom,
        });
      } else {
        this.$socket.emit('USER_TYPING', {
          userName: '',
          room: this.selectedRoom,
        });
      }
    },
  },

  props: {
    selectedRoom: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      required: true,
    }
  },

  methods: {
    onUpdateMessage(event) {
      this.messageInput = event.target.value;
    },

    userImage(item) {
      return item.profileImage || UserImage;
    },

    onSubmitMessage(event) {
      event.preventDefault();

      if (this.messageInput) {
        this.$socket.emit('SEND_MESSAGE', {
          message:this.messageInput,
          userName: this.userName,
          room: this.selectedRoom,
          profileImage: this.profileImage,
        });

        this.messageInput = '';
        this.typingUser = '';
      }
    },

    handleIncomingMessage(data) {
      this.messages = [...this.messages, data];
    },

    handleUserIsTyping(data) {
      this.typingUser = data.userName;
    },
  },

  mounted() {
    this.sockets.subscribe('NEW_MESSAGE', this.handleIncomingMessage);
    this.sockets.subscribe('USER_TYPING', this.handleUserIsTyping);
  }
}
</script>

<style lang="scss" scoped>

.chatConatiner {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.chat__header {
  display: flex;
  padding: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.chat__inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 16px;
  height: 70vh;
  background: #fff;
  border-radius: 3px;
  text-align: left;
  overflow: scroll;
}

.chat__inner__message {
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  color: #000;
  font-weight: 500;
  font-size: 16px;
  border-radius: 12px;
}

.chat__inner__message__inner {
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  background: #ffcc99;
  color: #000;
  font-weight: 500;
  font-size: 16px;
  border-radius: 12px;
}

.chat__inner__message__user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
}

.chat__inner__message__userImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat__inner__message__userImageWrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.chat__inner__message__join {
  padding-left: 8px;
  margin-bottom: 3px;
  color: #009933;
  font-weight: 600;
  font-size: 16px;
}

.chat__inner__message__left {
  padding-left: 8px;
  margin-bottom: 3px;
  color: #ff0000;
  font-weight: 600;
  font-size: 16px;
}

.chat__inner__typingUser {
  color: #000;
  opacity: .4;
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
}

.chat__inner__message__userName {
  font-weight: 600;
  font-size: 12px;
  opacity: .6;
}

.chat__form {
  display: flex;
}

.chat__form__input {
  margin-right: 16px;
  padding: 8px 16px;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  border-radius: 3px;
  border: none;

  &::placeholder {
    opacity: .5;
  }
}

.chat__form__submit {
  padding: 8px 16px;
  color: #fff;
  background: #009900;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 3px;
}

</style>
