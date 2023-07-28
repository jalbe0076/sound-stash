const mockusers = [
  { userId: 1, username: 'user1', password: 'password', journal: [], collections: [] },
  { 
    userId: 2, 
    username: 'user2', 
    password: 'password2', 
    journal: [
      {
        "masterId": 49903,
        "id": 1690505462563,
        "title": "Ace Frehley",
        "artists": "Kiss / Ace Frehley",
        "image": "https://i.discogs.com/kg3tyd9Z3esesnRuwElJ0_lgCWiT8BqWkrD2gPzY5cw/rs:fit/g:sm/q:90/h:480/w:480/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2MTE4/Ni0xMTMxNzExMjI1/LmpwZWc.jpeg",
        "date": "July 27, 2023",
        "rating": 4,
        "notes": "Coding session music lol"
      },
      {
        "masterId": 1388938,
        "id": 1690578742270,
        "title": "Shima",
        "artists": "Celer",
        "image": "https://i.discogs.com/THVAe1xrdJA46iQu_0aNz1OsPMLzv3diO7YJWeHlENo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMjIy/OTUwLTE1MzA4MjU0/MDQtNDE5NC5qcGVn.jpeg",
        "date": "July 26, 2023",
        "rating": 4,
        "notes": "Perfect music for winding down in the evening."
      },
      {
        "masterId": 35759,
        "id": 1690578815238,
        "title": "So",
        "artists": "Peter Gabriel",
        "image": "https://i.discogs.com/IZ3_zj2EwVyh4KugEmW07i67zDcm8xj_JRVh8mTEktU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM3OTAz/Ni0xMjc1NjMyMzA5/LmpwZWc.jpeg",
        "date": "July 24, 2023",
        "rating": 4.5,
        "notes": "Kate Bush / Peter Gabriel dream collab track"
      },
      {
        "masterId": 110080,
        "id": 1690578839091,
        "title": "Aida",
        "artists": "Derek Bailey",
        "image": "https://i.discogs.com/wnV6B2LYE93V76NYGU041S89_cyYiXzOwgVZXlBmLO4/rs:fit/g:sm/q:90/h:250/w:250/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNTU4/NzEtMTI5NjUxMDg5/MC5qcGVn.jpeg",
        "date": "July 21, 2023",
        "rating": 5,
        "notes": "Probably my favorite Derek Bailey record"
      }
    ], 
    collections: [
      {
        masterId: 3132672,
        title: 'In Times New Roman...',
        artist: 'Queens Of The Stone Age',
        thumb: 'https://i.discogs.com/ddBAvRvdJlWId20q346TD5-pt9MZ7aqLMZESYCkMtGg/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI3Mzc3/MTA2LTE2ODY3MDg3/NDAtNjM1MS5qcGVn.jpeg'
      }, 
      {
        masterId: 226227,
        title: 'Star Wars (Main Title)',
        artist: 'The London Symphony Orchestra',
        thumb: 'https://i.discogs.com/EMvO22FsUM98fVJAPP1tnHALp3LllZX50C3gd5YiFoY/rs:fit/g:sm/q:90/h:480/w:471/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU4NzQ4/MC0xMjg5MzE2MjI1/LmpwZWc.jpeg'
      },
      {
        masterId: 877619,
        title: 'The Fame Monster',
        artist: 'Lady Gaga',
        thumb: 'https://i.discogs.com/xfA9Qre5NvdlyaFOPBl_jTMgrvBJIoL0MnjA6T45mmA/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIxNTg3/ODYtMTI2NzgzNzg5/Mi5qcGVn.jpeg'
      },
      {
        masterId: 1397206,
        title: 'Broughtupsy',
        artist: 'Bonjay',
        thumb: 'https://i.discogs.com/r1mruw2TYFz6zlDP_1nptPkJ0oNAmo2BEq63Vqke7Fw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMjkw/MzcxLTE1MzIyNjky/ODEtNDAzNS5qcGVn.jpeg'
      },
      {
        masterId: 2122279,
        title: 'Delta Kream',
        artist: 'The Black Keys',
        thumb: 'https://i.discogs.com/3rqJc97QQVrTJdDGTyxhUGWVQPyhcrWJKW-l4Y4wlbU/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4Njc0/MjM2LTE2MjA2Nzk1/OTYtOTI5MS5qcGVn.jpeg'
      }
    ]
  } 
];
    
  export default mockusers;
