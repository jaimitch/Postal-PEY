<template>
    <div class="modal">
        <div class="modal-text">
        This is a tool tip that is long enough that the text will wrap!
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ToolTip',
    methods: {

    },
    computed: {
    },
  };
</script>

<style scoped>
.modal {
    position: absolute;
    top: 45vh;
    left:50%;
    min-width: 20vw;
    min-height: 20vh;
    max-width: 20vw;
    max-height: 20vh;
    border-radius: 12px;
    z-index:50;
  }
  .modal-text{
      position:relative;
      top: 3.5vw;
      text-align:center;
      padding: 1vw;
  }
</style>