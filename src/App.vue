<template>
  <div id="app">
    <!-- TODO: Remove this temporary navbar -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/search">Find a partner</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");
@import url("https://use.fontawesome.com/releases/v5.2.0/css/all.css");
html,
body {
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
  font-family: "Poppins", "Helvetica", sans-serif;
  font-size: 100%;
  background-color: #fbda61;
  background-image: linear-gradient(45deg, #fbda61 0%, #ff5acd 100%);
}
</style>
