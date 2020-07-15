<template>
<div class="matchItemWrapper" @click="showDetails = !showDetails">
  <div class="shortInfo">
    <div class="team">
      {{ homeTeamName }}
    </div>
    <div class="matchResult">
      <time>{{ date }}</time>
      <p v-if="score != null">{{ score }}</p>
      <p v-else>-:-</p>
      <time>{{ time }}</time>
    </div>
    <div class="team">
      {{ awayTeamName }}
    </div>
  </div>
 <transition name="slide">
   <div v-if="showDetails" class="moreInfo">
     <div class="moreInfoTeams">
       <h3>Home Team:</h3>
       <div>
         <h4>Goals:</h4>
         <ol>
           <li v-for="(element, index) of goalsHome" :key="index">{{ element }}</li>
         </ol>
       </div>
       <div v-if="dataEvent.strHomeLineupDefense !== undefined">
         <h4>Squads:</h4>
         <p>Goalkeeper: <span>{{ dataEvent.strHomeLineupGoalkeeper }}</span></p>
         <p>Defense: <span>{{ dataEvent.strHomeLineupDefense }}</span></p>
         <p>Midfield: <span>{{ dataEvent.strHomeLineupMidfield }}</span></p>
         <p>Forward: <span>{{ dataEvent.strHomeLineupForward }}</span></p>
         <p>Substitutes: <span>{{ dataEvent.strAwayLineupSubstitutes}}</span></p>
       </div>
     </div>
     <div class="moreInfoTeams">
       <h3>Away Team:</h3>
       <div>
         <h4>Goals:</h4>
         <ol>
           <li v-for="(element, index) of goalsAway" :key="index">{{ element }}</li>
         </ol>
       </div>
       <div v-if="dataEvent.strHomeLineupDefense !== undefined">
         <h4>Squads:</h4>
         <p>Goalkeeper: <span>{{ dataEvent.strAwayLineupGoalkeeper }}</span></p>
         <p>Defense: <span>{{ dataEvent.strAwayLineupDefense }}</span></p>
         <p>Midfield: <span>{{ dataEvent.strAwayLineupMidfield }}</span></p>
         <p>Forward: <span>{{ dataEvent.strAwayLineupForward }}</span></p>
         <p>Substitutes: <span>{{ dataEvent.strAwayLineupSubstitutes}}</span></p>
       </div>
     </div>
   </div>
 </transition>
</div>
</template>

<script>
import axios from 'axios';

const api = 'https://www.thesportsdb.com/api/v1/json/1/lookupevent.php';

export default {
  name: 'LastMatchItem',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      homeTeamName: null,
      awayTeamName: null,
      date: null,
      time: null,
      score: null,
      showDetails: false,
      goalsHome: null,
      goalsAway: null,
      dataEvent: null,
    };
  },
  mounted() {
    this.homeTeamName = this.event.strHomeTeam;
    this.awayTeamName = this.event.strAwayTeam;
    if (this.event.intHomeScore != null) {
      this.score = `${this.event.intHomeScore}:${this.event.intAwayScore}`;
    }
    this.date = this.event.dateEvent;
    this.time = this.event.strTime;
    axios.get(`${api}?id=${this.event.idEvent}`)
      .then((res) => {
        // eslint-disable-next-line prefer-destructuring
        this.dataEvent = res.data.events[0];
        console.log(this.dataEvent);
        if (this.dataEvent.strHomeGoalDetails !== null) {
          this.goalsHome = this.dataEvent.strHomeGoalDetails.split(';').filter((item) => item !== '');
        }
        if (this.dataEvent.strAwayGoalDetails !== null) {
          this.goalsAway = this.dataEvent.strAwayGoalDetails.split(';').filter((item) => item !== '');
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.matchItemWrapper{
  min-width: 50%;
  margin: 10px;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  color: white;
  border-radius: 5px;
}
  .shortInfo{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .matchResult{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      :nth-child(n){
        padding: 4px;
      }
      p{
        font-size: 1.2rem;
      }
    }
  }
  .moreInfo{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    div{
      text-align: left;
    }
    .moreInfoTeams{
      div{
        margin:0 10px;
      }
      p{
        margin:0 10px;
        padding: 3px;
      }
      li{
        padding: 3px;
      }
    }
  }
.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
