<template>
  <div class="signupForm">
    <form
      class="signupForm__form"
      v-on:submit="onFormSubmit"
    >
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
export default {
  name: 'SignupForm',

  data() {
    return {
      name: this.userName,
    }
  },

  props: {
    userName: {
      type: String,
      required: true,
    }
  },

  methods: {
    onFormSubmit(event) {
      event.preventDefault();

      if (this.name.length) {
        this.$socket.emit('USER_SIGNEDUP', { userName: this.name });

        this.$emit('SUBMITTED', {
          userName: this.name,
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .signupForm {
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
