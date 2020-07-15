<template>
  <div class="home">
    <div class="searchWrapper">
      <label>Wpisz klub piłkarski</label>
      <input type="text" v-model="club" @input="handleInput">
    </div>
      <transition-group name="clubs" class="clubsWrapper">
          <ClubItem v-for="team in teams" :key="team.idTeam" :team="team" />
      </transition-group>
  </div>
</template>

<script>
// @ is an alias to /src
import debounce from 'lodash.debounce';
import axios from 'axios';
import ClubItem from '../components/ClubItem.vue';

const api = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php';

export default {
  name: 'Home',
  components: {
    ClubItem,
  },
  data() {
    return {
      club: '',
      teams: '',
    };
  },
  mounted() {
    this.teams = this.$store.state.teams;
  },
  methods: {
    scrollToResults: () => {
      const yPosition = document.getElementById('nav').offsetHeight;
      window.scroll(0, yPosition);
    },
    // eslint-disable-next-line func-names
    handleInput: debounce(function () {
      axios.get(`${api}?t=${this.club}`).then((res) => {
        if (res.data.teams !== null) {
          this.teams = res.data.teams.filter((item) => item.strSport === 'Soccer');
        } else {
          this.teams = null;
        }
        this.$store.commit('setTeams', this.teams);
        this.scrollToResults();
      });
    }, 1000),
  },
};
</script>

<style lang="scss" scoped>

  .clubsWrapper{
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }

  .searchWrapper{
    width:80%;
    margin: auto;
    padding-bottom: 40px;

    label{
      font-size:25px;
      color:#fff;
      pointer-event: none;
      transition: all 0.5s ease-in-out;
    }

    input{
      border:0;
      margin-top:10px;
      border-bottom:5px solid #fff;
      font-weight: bold;
      background:transparent;
      width:100%;
      padding:8px 0 5px 0;
      font-size:23px;
      color:#fff;
      &:focus{
        border:none;
        outline:none;
        border-bottom:5px solid #000;
      }
    }

    @media (min-width: 768px){
      width:30%;
    }
  }
  .clubs-enter-active,
  .clubs-leave-active { transition: 0.5s ease-in-out ; }
  .clubs-enter,
  .clubs-leave-to {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }

  .clubs-move {
    opacity: 0.5;
    transition: 0.5s;
  }
</style>
