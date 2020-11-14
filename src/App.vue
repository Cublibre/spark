<template>
  <div id="app">

  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poppins');
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    /* Layout */
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* Fonts and colors */
    font-family: 'Poppins', 'Helvetica', sans-serif;
    font-size: 100%;
    background-color: #FBDA61;
    background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
  }
</style>
