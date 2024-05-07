import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const GenreDoughnut = ({artists, genres}) => {

  const artistGenres = {}
  const TEMP = {
    genres: ["acoustic","afrobeat","alt-rock","alternative","ambient","anime","black-metal","bluegrass","blues","bossanova","brazil","breakbeat","british","cantopop","chicago-house","children","chill","classical","club","comedy","country","dance","dancehall","death-metal","deep-house","detroit-techno","disco","disney","drum-and-bass","dub","dubstep","edm","electro","electronic","emo","folk","forro","french","funk","garage","german","gospel","goth","grindcore","groove","grunge","guitar","happy","hard-rock","hardcore","hardstyle","heavy-metal","hip-hop","holidays","honky-tonk","house","idm","indian","indie","indie-pop","industrial","iranian","j-dance","j-idol","j-pop","j-rock","jazz","k-pop","kids","latin","latino","malay","mandopop","metal","metal-misc","metalcore","minimal-techno","movies","mpb","new-age","new-release","opera","pagode","party","philippines-opm","piano","pop","pop-film","post-dubstep","power-pop","progressive-house","psych-rock","punk","punk-rock","r-n-b","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll","rockabilly","romance","sad","salsa","samba","sertanejo","show-tunes","singer-songwriter","ska","sleep","songwriter","soul","soundtracks","spanish","study","summer","swedish","synth-pop","tango","techno","trance","trip-hop","turkish","work-out","world-music"]
  }

  function addGenres(artistGenres, genreName){
    if (TEMP.genres.some(substring => genreName.includes(substring))){
      if (artistGenres.hasOwnProperty(genreName)){
        artistGenres[genreName]++
      }
      else {
        artistGenres[genreName] = 1
      }
    }
  }
  artists.map(function(artist) {
    for (let x in artist.genres){
      addGenres(artistGenres, artist.genres[x])
    }
  })
  
  const sortedCounts = Object.keys(artistGenres).sort((a, b) => artistGenres[b] - artistGenres[a]);
  const sortedGenres = sortedCounts.reduce((sorted, key) => {
    sorted[key] = artistGenres[key];
    return sorted;
  }, {});
  
  console.log(Object.values(sortedGenres).slice(0, 10));
  console.log(Object.keys(sortedGenres).slice(0, 10));

  ChartJS.register(ArcElement, Tooltip)
  const data = {
      labels: Object.keys(sortedGenres).slice(0, 10),
      datasets: [
        {
          label: 'Artists w/ Genre: ',
          data: Object.values(sortedGenres).slice(0, 10),
          backgroundColor: [
            'rgba(255, 99, 132, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 206, 86, 0.4)',
            'rgba(75, 192, 192, 0.4)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(255, 159, 64, 0.4)',
            'rgba(109, 164, 242, 0.4)',
            'rgba(166, 10, 181, 0.4)',
            'rgba(79, 48, 11, 0.4)',
            'rgba(19, 130, 89, 0.4)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(109, 164, 242, 1)',
            'rgba(166, 10, 181, 1)',
            'rgba(79, 48, 11, 1)',
            'rgba(19, 130, 89, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className='flex flex-col py-4'>
          <Doughnut data={data} />
      </div>
    )
}

export default GenreDoughnut;