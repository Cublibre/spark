<template>
  <div id="app">
    <Card />
  </div>
</template>

<script>
import Card from './components/Card'
export default {
  name: 'App',
  components: {
    Card,
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  @import url('https://use.fontawesome.com/releases/v5.2.0/css/all.css');
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
