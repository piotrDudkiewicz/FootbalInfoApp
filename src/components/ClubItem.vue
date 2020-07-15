<template>
    <div @click="setTeam" class="itemClubWrapper">
      <img :src="teamLogo">
      <h3>{{ teamName }}</h3>
    </div>
</template>

<script>
export default {
  name: 'ClubItem',
  data() {
    return {
      teamName: null,
      teamLogo: null,
    };
  },
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.teamLogo = this.team.strTeamBadge;
    this.teamName = this.team.strTeam;
  },
  methods: {
    setTeam() {
      this.$store.commit('setTeam', this.team);
      this.$router.push('ClubDetails');
    },
  },
};
</script>

<style lang="scss" scoped>
  .itemClubWrapper{
    color:white;
    width: 80%;
    margin: 10px;
    padding:20px;
    background: black;
    border-radius: 12px;
    box-shadow: 6px 4px 49px 12px rgba(0,0,0,0.40);

    @media (min-width: 1281px) {
      width: 20%;
    }

    @media (min-width: 1025px) and (max-width: 1280px) {
      width: 25%;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      width: 40%;
    }

    @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
      width: 30%;
    }
    @media (min-width: 481px) and (max-width: 767px) {
      width:45%;
    }
      img{
      width:80px !important;
      height: 80px !important;
    }
  }
</style>
