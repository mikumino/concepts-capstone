import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const GenreDoughnut = ({artists, genres}) => {

  const artistGenres = {}

  function addGenres(artistGenres, genreName){
    if (genres.genres.some(substring => genreName.includes(substring))){
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
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