<template>
    <div id="app">
      <div id="nav">
        <transition name="logo">
          <router-link to="/" id="logo"><img src="./assets/Football.png" /></router-link>
        </transition>
      </div>
      <router-view/>
    </div>
</template>

<style lang="scss">
  *{
    box-sizing: border-box;
    margin:0;
  }

  body, html {
    height: 100%;
  }

  body{
    padding: 0;
    background-image: url("./assets/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    @media(min-width: 1024px) {
      padding: 0 200px 0;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      padding: 0 100px 0;
    }
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#logo{
  img{
    width:100px;
    height: 100px;
  }
  @media (min-width: 768px){
    img{
      width: 200px;
      height: 200px;
    }
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #060c09;
    }
  }
}
</style>
