<template>
  <div class="roomsContainer">
      <div class="rooms__header">
        Selecet a room
      </div>

      <div class="rooms__items">
        <div
          class="room__item"
          v-on:click="onRoomSelected"
        >
          Moives/TV
        </div>

        <div
          class="room__item"
          v-on:click="onRoomSelected"
        >
          Culture
        </div>

        <div
          class="room__item"
          v-on:click="onRoomSelected"
        >
          Music
        </div>

        <div
          class="room__item"
          v-on:click="onRoomSelected"
        >
          Sport
        </div>

        <div
          class="room__item"
          v-on:click="onRoomSelected"
        >
          Education
        </div>

        <div
          class="room__item"
          v-on:click="onRoomSelected"
        >
          Random
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'RoomsSelector',

  methods: {
    onRoomSelected(event) {
      this.$emit('ROOM_SELECTED', {
        room: event.target.innerText
      });
    }
  }

}
</script>

<style lang="scss" scoped>

.roomsContainer {
}

.rooms__header {
  margin-bottom: 40px;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
}

.rooms__items {
  display: flex;
  justify-content: center
}

.room__item {
  margin-right: 16px;
  padding: 16px;
  background: #ffcc99;
  color: #000;
  font-weight: 700;
  font-size: 18px;
  border-radius: 3px;
  cursor: pointer;
  transition: background .3s, transform .3s;

  &:hover {
    background: #ffcc97;
    transform: translateY(-4px)
  }

  &:last-child {
    margin: 0;
  }
}
</style>
