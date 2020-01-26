<template>
  <div class="signupForm">
    <form
      class="signupForm__form"
      v-on:submit="onFormSubmit"
    >
      <div class="signupForm__form__imageConatiner">
        <input
          id="profileImage"
          type="file"
          class="signupForm__form__image__input"
          accept="image/*"
          v-on:change="onChangeImage"
        />

        <img
         v-bind:src="getImage"
         class="signupForm__form__image"
        />

        <label
          v-if="!profileImage"
          for="profileImage"
          class="signupForm__form__imageInput__label"
        >
          Upload a profile picture
        </label>
      </div>

      <input
        type="text"
        class="signupForm__form__input"
        v-model="name"
        placeholder="Enter your username..."
      />

      <button type="submit" class="signupForm__form__button">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import UserImage from '../assets/profile-img.jpg';

export default {
  name: 'SignupForm',

  data() {
    return {
      name: this.userName,
      profileImage: '',
    }
  },

  props: {
    userName: {
      type: String,
      required: true,
    }
  },

  computed: {
    getImage() {
      return this.profileImage || UserImage;
    }
  },

  methods: {
    onFormSubmit(event) {
      event.preventDefault();

      if (this.name.length) {
        this.$socket.emit('USER_SIGNEDUP', {
          userName: this.name,
        });

        this.$emit('SUBMITTED', {
          userName: this.name,
          profileImage: this.profileImage,
        })
      }
    },

    onChangeImage(event) {
      const input = event.target;

      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImage = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
      }
    },
  }

}
</script>

<style lang="scss" scoped>
  .signupForm {
  }

  .signupForm__form {
  }

  .signupForm__form__input {
    padding: 8px 16px;
    border: none;
    font-size: 16px;
    margin-right: 24px;
    background: #2c3e50;
    color: #fff;
    font-weight: 700;
    border-bottom: 1px solid rgba(#fff, .5);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #fff;
      opacity: .5;
    }
  }

  .signupForm__form__image__input {
    display: none;
  }

  .signupForm__form__imageConatiner {
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin: 50px auto;
    border: 2px solid #fff;
    overflow: hidden;
    text-align: center;
  }

  .signupForm__form__imageInput__label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 25%;
    padding-top: 10px;
    font-weight: 700;
    color: #fff;
    font-size: 10px;
    background: rgba(#000, .5);
    cursor: pointer;
  }

  .signupForm__form__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .signupForm__form__button {
    padding: 8px 16px;
    background: #005ce6;
    color: #fff;
    border: none;
    font-weight: 700;
    font-size: 16px;
    border-radius: 3px;
  }
</style>
