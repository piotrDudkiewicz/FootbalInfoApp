<template>
<div class="clubDetailsWrapper">
    <div class="clubHeader">
      <div class="clubName">
        <h1>{{ teamName }}</h1>
        <img :src="teamLogo">
      </div>
      <div class="clubInfo">
        <p>
          League:
          <span>{{ teamLeague }}</span>
        </p>
        <p>
          Country:
          <span>{{ teamFrom }}</span>
        </p>
        <div class="socialLinks" v-if="facebookLink || instagramLink" >
          <a id="facebookLink" class="social" v-if="facebookLink" :href="facebookLink"> </a>
          <a id="instagramLink" class="social" v-if="instagramLink" :href="instagramLink"></a>
        </div>
      </div>
    </div>
  <div class="clubDescription" v-if="teamDescriptionEN">
    <h2>History</h2>
    <p>
      {{ teamDescriptionEN }}
    </p>
  </div>
  <div class="matches">
    <div class="lastMatches" v-if="lastEvents">
      <h2>Last Matches</h2>
      <LastMatchItem v-for="event in lastEvents" :key="event.idEvent" :event="event"/>
    </div>
    <div v-if="nextEvents" class="nextMatches">
      <h2>Next Matches</h2>
      <LastMatchItem v-for="event in nextEvents" :key="event.idEvent" :event="event"/>
    </div>
  </div>
  <div v-if="leagueTable" class="leagueTable">
    <table>
      <thead>
      <th></th>
      <th>Club</th>
      <th>g</th>
      <th>gf</th>
      <th>ga</th>
      <th>gd</th>
      <th>wi</th>
      <th>d</th>
      <th>l</th>
      <th>p</th>
      </thead>
      <tbody>
      <tr v-for="(element, index) of leagueTable" :key="index">
        <td>{{ ++index }}</td>
        <td v-for="(el, id) of element" :key="id">
          {{ el }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import LastMatchItem from '../components/LastMatchItem.vue';

const api = 'https://www.thesportsdb.com/api/v1/json/1/';

export default {
  name: 'ClubDetails',
  components: {
    LastMatchItem,
  },
  data() {
    return {
      team: null,
      teamName: null,
      teamLogo: null,
      teamDescriptionEN: null,
      teamFrom: null,
      teamLeague: null,
      lastEvents: null,
      nextEvents: null,
      facebookLink: null,
      instagramLink: null,
      leagueTable: null,
    };
  },
  mounted() {
    this.team = this.$store.state.team;
    this.teamLogo = this.team.strTeamBadge;
    this.teamName = this.team.strTeam;
    this.teamDescriptionEN = this.team.strDescriptionEN;
    this.teamFrom = this.team.strCountry;
    this.teamLeague = this.team.strLeague;

    if (this.team.strInstagram) {
      this.instagramLink = `https://${this.team.strInstagram}`;
    }

    if (this.team.strFacebook) {
      this.facebookLink = `https://${this.team.strFacebook}`;
    }

    axios.get(`${api}eventslast.php?id=${this.team.idTeam}`)
      .then((res) => {
        this.lastEvents = res.data.results;
      });

    axios.get(`${api}eventsnext.php?id=${this.team.idTeam}`)
      .then((res) => {
        this.nextEvents = res.data.events;
      });

    axios.get(`${api}lookuptable.php?l=${this.team.idLeague}`)
      .then((res) => {
        // eslint-disable-next-line array-callback-return,no-param-reassign
        this.leagueTable = res.data.table.filter((element) => delete element.teamid);
      });
  },
};
</script>

<style lang="scss" scoped>
.clubDetailsWrapper{
  width:100%;
  background: rgb(252, 250, 250);
  margin:20px 0 20px;
  p{
    text-align: justify ;
  }
}
.clubHeader{
  width:100%;
  background-image: url("../assets/detailsBanner.png");
  background-position: 50% 75%;
  color: #fdfbff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  @media (min-width: 768px){
    flex-direction: row;
    justify-content: space-between;
  }
}
.clubName{
    img{
      width:35vw;
      background: #e8fdff;
      padding: 10px;
      border-radius: 10px;
      border: 2px solid rgba(243, 154, 0, 1);
      box-shadow: 6px 4px 49px 12px rgba(250,247,250,0.2);
    }
    @media (min-width: 768px) {
      img {
        width: 10vw;
      }
    }
}

.clubInfo{
  display: grid;
  grid-gap: 10px ;
  padding-left: 20px;
    p{
      text-align: left;
      span{
        font-weight: bold;
      }
    }
}

.clubDescription{
  padding: 30px;
  h2{
    margin-bottom: 10px;
  }
}

#facebookLink{
  background: url("../assets/facebook.svg") no-repeat top left;
  background-size: contain;
}

#instagramLink{
  background: url("../assets/instagram-sketched.svg") no-repeat top left;
  background-size: contain;
}

.social {
  display: block;
  width: 40px;
  height: 40px;
}

.socialLinks{
  display: grid;
  grid-template-columns: 40px 40px;
  column-gap: 10px;
}
  .matches{
    flex-direction: column;
    justify-content: center;
    @media (min-width: 768px) {
      display: flex;
      padding: 30px;
      width: 100%;
      flex-direction: row;
      justify-content: center;
      .lastMatches, .nextMatches{
        width: 50%;
      }
      h2{
        margin-bottom: 10px;
      }
    }
    }
  .leagueTable{
    padding: 30px;
    table {
      border-collapse: collapse;
      border-radius: 5px;
      width: 100%;
      background: rgba(0, 0, 0, 0.8);;
      color: white;
    }

    th, td {
      padding: 10px 3px;
      text-align: left;
      border-bottom: 1px solid #585656;
    }
    @media (min-width: 768px){
      th, td {
        padding: 10px;
      }
    }
  }
</style>
