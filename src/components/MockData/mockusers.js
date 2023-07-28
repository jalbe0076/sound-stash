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
        "masterId": 34525,
        "id": 1690505417855,
        "title": "Halfway To A Threeway",
        "artists": "Jim O'Rourke",
        "image": "https://i.discogs.com/2r7otKbppG5fmVFct_BQWsZv6sQLMJeRjoXl3-N5NWQ/rs:fit/g:sm/q:90/h:200/w:200/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0NjUy/NS0xMTE0NjE5OTQx/LmpwZw.jpeg",
        "date": "July 26, 2023",
        "rating": 5,
        "notes": "Jim is a master songwriter"
      },
      {
        "masterId": 28531,
        "id": 1690505438195,
        "title": "The Kick Inside",
        "artists": "Kate Bush",
        "image": "https://i.discogs.com/XZvjzv1I0S-rfdcoeKE6LIXxOI8-wEzff0fRGweFrr0/rs:fit/g:sm/q:90/h:598/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQxNDM3/NC0xNDExNDA3MjA5/LTc1ODcuanBlZw.jpeg",
        "date": "July 25, 2023",
        "rating": 4,
        "notes": "That good shit"
      },
      {
        "masterId": 3172911,
        "id": 1690505326044,
        "title": "The Ballad Of Darren",
        "artists": "Blur",
        "image": "https://i.discogs.com/qB9HFaesrp3LxJRE9xhzjZu93BwzSjT9ySXUu2YemQQ/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI3MzEz/NTE4LTE2OTAwMTky/MTgtMTA1My5qcGVn.jpeg",
        "date": "July 5, 2023",
        "rating": 4,
        "notes": "Hello"
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
