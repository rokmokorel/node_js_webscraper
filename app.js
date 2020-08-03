const a = [
    {
      newsHeader: 'Microsoft continue TikTok talks, SpaceX crew splashes down',
      category: 'videos',
      url: 'https://www.cnet.com/videos/microsoft-continue-tiktok-talks-spacex-crew-splashes-down/'
    },
    {
      newsHeader: 'AirPods vs. AirPods Pro: Should you spend the extra $100?',
      category: 'news',
      url: 'https://www.cnet.com/news/apple-airpods-versus-airpods-pro-cost-100-dollars-more-main-differences-true-wireless-earbuds/'
    },
    {
      newsHeader: '2020 Toyota Tacoma TRD Off-Road review: Rough around the edges',
      category: 'roadshow',
      url: 'https://www.cnet.com/roadshow/reviews/2020-toyota-tacoma-review/'
    },
    {
      newsHeader: 'Spotify vs. Apple Music: Which is right for you?',
      category: 'news',
      url: 'https://www.cnet.com/news/apple-music-versus-spotify-best-music-podcasts-streaming-service-price-catalog-features-plans-compared/'
    },
    {
      newsHeader: 'How soon might the next stimulus check get to you? Here are some potential IRS payment dates',
      category: 'personal-finance',
      url: 'https://www.cnet.com/personal-finance/how-soon-might-the-next-stimulus-payment-get-to-you-here-are-some-potential-irs-payment-dates/'
    }
  ];
  
  const b = [
    {
      shortSummary: 'Ponderous and uncomfortable, this midsize truck is somehow still hugely popular.',
      tags: 'Toyota Tacoma | Toyota | Trucks | Ford | Toyota | ',
      author: 'Craig Cole',
      datePublished: 'Aug. 3, 2020 2:00 a.m. PT',
      mainImageUrl: 'https://cnet3.cbsistatic.com/img/vRs1tFXEMWGX08nI2vPE2gBUmxw=/2020/07/14/716eb347-8cab-4361-be0f-285bc4db4584/2020-toyota-tacoma-trd-off-road-16.jpg'
    },
    {
      shortSummary: 'Ponderous and uncomfortable, this midsize truck is somehow still hugely popular.',
      tags: 'Toyota Tacoma | Toyota | Trucks | Ford | Toyota | ',
      author: 'Craig Cole',
      datePublished: 'Aug. 3, 2020 2:00 a.m. PT',
      mainImageUrl: 'https://cnet3.cbsistatic.com/img/vRs1tFXEMWGX08nI2vPE2gBUmxw=/2020/07/14/716eb347-8cab-4361-be0f-285bc4db4584/2020-toyota-tacoma-trd-off-road-16.jpg'
    },
    {
      shortSummary: 'Ponderous and uncomfortable, this midsize truck is somehow still hugely popular.',
      tags: 'Toyota Tacoma | Toyota | Trucks | Ford | Toyota | ',
      author: 'Craig Cole',
      datePublished: 'Aug. 3, 2020 2:00 a.m. PT',
      mainImageUrl: 'https://cnet3.cbsistatic.com/img/vRs1tFXEMWGX08nI2vPE2gBUmxw=/2020/07/14/716eb347-8cab-4361-be0f-285bc4db4584/2020-toyota-tacoma-trd-off-road-16.jpg'
    },
    {
      shortSummary: 'Ponderous and uncomfortable, this midsize truck is somehow still hugely popular.',
      tags: 'Toyota Tacoma | Toyota | Trucks | Ford | Toyota | ',
      author: 'Craig Cole',
      datePublished: 'Aug. 3, 2020 2:00 a.m. PT',
      mainImageUrl: 'https://cnet3.cbsistatic.com/img/vRs1tFXEMWGX08nI2vPE2gBUmxw=/2020/07/14/716eb347-8cab-4361-be0f-285bc4db4584/2020-toyota-tacoma-trd-off-road-16.jpg'
    },
    {
      shortSummary: 'Ponderous and uncomfortable, this midsize truck is somehow still hugely popular.',
      tags: 'Toyota Tacoma | Toyota | Trucks | Ford | Toyota | ',
      author: 'Craig Cole',
      datePublished: 'Aug. 3, 2020 2:00 a.m. PT',
      mainImageUrl: 'https://cnet3.cbsistatic.com/img/vRs1tFXEMWGX08nI2vPE2gBUmxw=/2020/07/14/716eb347-8cab-4361-be0f-285bc4db4584/2020-toyota-tacoma-trd-off-road-16.jpg'
    }
  ];

  var d = [];


  
  for (var i = 0; i < 5; i++) {
      d[i] = {
        ...a[i],
        ...b[i],
    }
  };
  console.log(d);