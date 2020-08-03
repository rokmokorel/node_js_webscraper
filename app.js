


function scrapeCnet() {
  result = (async () => {
    var a =
    {
      prvi: {
        ime: 'Rok',
        priimek: 'Mokorel',
        starost: 25
      },
      drugi: {
        ime: 'Aleksandra',
        priimek: 'Krajnovic',
        starost: 23
      }
    }
    setTimeout(() => console.log('done'), 1000);
    return a;
  })();
  console.log(result);
  return JSON.stringify(result);
}

function someAsyncFunc() {
  return new Promise(resolve => {
    var data = (async () => {
      var a =
      {
        prvi: {
          ime: 'Rok',
          priimek: 'Mokorel',
          starost: 25
        },
        drugi: {
          ime: 'Aleksandra',
          priimek: 'Krajnovic',
          starost: 23
        }
      }
      return a;
    })();
    resolve(data);
  });
}

var http = require('http');
const { stringify } = require('querystring');

const hostname = '127.0.0.1';
const port = 5060;

const server = http.createServer();
server.on('request', async (req, res) => {
  const data = await someAsyncFunc();
  console.log(req.url);
  console.log(data);
  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});