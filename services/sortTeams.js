module.exports.default = function sortTeams(team1, team2) {
 // team is sorted below according to points
  if (team1.points === team2.points) {
    return team1.name.localeCompare(team2.name, "en", { sensitivity: "base" }) >
      0
      ? 1
      : -1;
  }
  return team1.points < team2.points ? 1 : -1;
};
