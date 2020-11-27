<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
/* Preset setting */
* {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: auto;
}

html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%; /* stylelint-disable-line property-no-vendor-prefix */
  scroll-behavior: smooth;
}

body {
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #2c3e50;
  overflow-y: scroll;
  font-weight: normal;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.mobile-scroll {
  width: auto;
  height: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 3%;
}
.bold {
  font-weight: 900;
}
.capitalize {
  text-transform: capitalize;
}
.container {
  max-width: 768px;
  min-width: 300px;
  width: 100%;
}
</style>
