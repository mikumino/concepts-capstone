import { Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const GenreDoughnut = ({artists}) => {

  const artistGenres = {
    names: {
      name: {},
      count: {}
    }
  }

  function addGenres(artistGenres, genreName){
    if (artistGenres.hasOwnProperty(genreName)){
      artistGenres.names.name = genreName
      artistGenres.names[genreName].count++
    }
    else {
      // artistGenres.names[genreName].count = 1;
    }
  }
  artists.map(function(artist) {
    for (let x in artist.genres){
      addGenres(artistGenres, artist.genres[x])
    }
  })
  console.log(artistGenres)
  // console.log(artistGenres)
  // console.log(artistGenres[5][2])
  ChartJS.register(ArcElement, Tooltip)
  const data = {
      labels: artistGenres,
      datasets: [
        {
          label: 'Artists w/ Genre: ',
          data: [12, 19, 3, 5, 2, 3, ],
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