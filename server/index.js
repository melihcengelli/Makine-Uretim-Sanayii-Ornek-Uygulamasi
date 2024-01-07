const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const jsonData = require(path.join(__dirname, 'mockdata.json'));
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// MySQL bağlantı bilgileri
const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

// MySQL bağlantısını başlat
db.connect((err) => {
  if (err) {
    console.error('MySQL bağlantısı başarısız:', err);
  } else {
    console.log('MySQL bağlantısı başarıyla kuruldu');
  }
});

app.use(cors());

// JSON verilerini işlemek için express.json() middleware'i
app.use(express.json());


// Temel bir HTTP GET endpoint'i
app.get('/app', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = 'SELECT degerler.makine_id,degerler.durum,degerler.time,degerler.spindle_sicakligi,degerler.spindle_zorlanmasi,makineler.makine_adi AS makine_adi,sicaklik,titresim,automatic FROM degerler JOIN makineler ON makineler.makine_id=degerler.makine_id';

  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
      res.json(results);
    }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/raporlar', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = 'SELECT raporlar.rapor_id,makineler.makine_adi,raporlar.time,raporlar.olay_metni FROM raporlar JOIN makineler ON makineler.makine_id=raporlar.makine_id ORDER BY time DESC LIMIT 15';

  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
      res.json(results);
    }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/esikdegerler', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = 'SELECT esikdegerler.makine_id,makineler.makine_adi,esikdegerler.spindle_sicakligi,esikdegerler.spindle_zorlanmasi,esikdegerler.sicaklik,esikdegerler.titresim FROM esikdegerler JOIN makineler ON esikdegerler.makine_id=makineler.makine_id';

  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
      res.json(results);
    }
  });
});



// Temel bir HTTP GET endpoint'i
app.get('/stopallmachines', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = 'UPDATE degerler SET durum=0';
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
      // MySQL sorgusu örneği
      const sqlQuery = 'SELECT degerler.makine_id,degerler.durum,degerler.time,degerler.spindle_sicakligi,degerler.spindle_zorlanmasi,makineler.makine_adi AS makine_adi,sicaklik,titresim,automatic FROM degerler JOIN makineler ON makineler.makine_id=degerler.makine_id';

      // MySQL sorgusunu çalıştırma
      db.query(sqlQuery, (err, results) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.status(500).send('Veritabanı sorgusu başarısız');
        } else {
          res.json(results);
        }
      });
    }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/sonuclar', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = 'SELECT makineler.makine_adi,sonuclar.sonuc_id, sonuclar.makine_id,sonuclar.time,sonuclar.spindle_sicakligi,sonuclar.spindle_zorlanmasi,sonuclar.sicaklik,sonuclar.titresim,sonuclar.automatic FROM sonuclar JOIN makineler ON sonuclar.makine_id=makineler.makine_id ORDER BY sonuclar.sonuc_id DESC LIMIT 15';
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        res.json(results);
      }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/situation', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = 'SELECT * FROM degerler';
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        res.json({server:true});
      }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/grafik1', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = `SELECT makineler.makine_adi,sonuclar.time,sonuclar.spindle_sicakligi,sonuclar.spindle_zorlanmasi FROM sonuclar JOIN makineler ON sonuclar.makine_id=makineler.makine_id WHERE makineler.makine_adi='CNC' ORDER BY sonuclar.sonuc_id DESC LIMIT 10`;
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        res.json(results);
      }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/grafik2', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = `SELECT makineler.makine_adi,sonuclar.time,sonuclar.spindle_sicakligi,sonuclar.spindle_zorlanmasi FROM sonuclar JOIN makineler ON sonuclar.makine_id=makineler.makine_id WHERE makineler.makine_adi='CNC Torna' ORDER BY sonuclar.sonuc_id DESC LIMIT 10`;
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        res.json(results);
      }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/grafik3', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = `SELECT makineler.makine_adi,sonuclar.time,sonuclar.sicaklik,sonuclar.titresim FROM sonuclar JOIN makineler ON sonuclar.makine_id=makineler.makine_id WHERE makineler.makine_adi='Eksantrik Pres' ORDER BY sonuclar.sonuc_id DESC LIMIT 10`;
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        res.json(results);
      }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/grafik4', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = `SELECT makineler.makine_adi,sonuclar.time,sonuclar.sicaklik,sonuclar.titresim FROM sonuclar JOIN makineler ON sonuclar.makine_id=makineler.makine_id WHERE makineler.makine_adi='Tel erezyon' ORDER BY sonuclar.sonuc_id DESC LIMIT 10`;
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        res.json(results);
      }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/grafik5', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = `SELECT makineler.makine_adi,sonuclar.time,sonuclar.spindle_zorlanmasi,sonuclar.titresim FROM sonuclar JOIN makineler ON sonuclar.makine_id=makineler.makine_id WHERE makineler.makine_adi='Freze' ORDER BY sonuclar.sonuc_id DESC LIMIT 10`;
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        res.json(results);
      }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/grafik6', (req, res) => {
  // MySQL sorgusu örneği
  const sqlQuery = `SELECT makineler.makine_adi,sonuclar.time,sonuclar.sicaklik,sonuclar.titresim FROM sonuclar JOIN makineler ON sonuclar.makine_id=makineler.makine_id WHERE makineler.makine_adi='Hidrolik Pres' ORDER BY sonuclar.sonuc_id DESC LIMIT 10`;
  // MySQL sorgusunu çalıştırma
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        res.json(results);
      }
  });
});

// Temel bir HTTP GET endpoint'i
app.get('/setNewData', (req, res) => {
  
  db.query(`UPDATE degerler SET spindle_sicakligi=${Math.floor(Math.random() * 100)}, spindle_zorlanmasi=${Math.floor(Math.random() * 100)} WHERE degerler.makine_id=1`, (err, results) => {
    if (err) {
      console.error('Sorgu hatası:', err);
      res.status(500).send('Veritabanı sorgusu başarısız');
    } else {
        db.query(`UPDATE degerler SET spindle_sicakligi=${Math.floor(Math.random() * 100)}, spindle_zorlanmasi=${Math.floor(Math.random() * 100)} WHERE degerler.makine_id=2`, (err, results) => {
          if (err) {
            console.error('Sorgu hatası:', err);
            res.status(500).send('Veritabanı sorgusu başarısız');
          } else {
            db.query(`UPDATE degerler SET sicaklik=${Math.floor(Math.random() * 100)}, titresim=${Math.floor(Math.random() * 100)} WHERE degerler.makine_id=3`, (err, results) => {
              if (err) {
                console.error('Sorgu hatası:', err);
                res.status(500).send('Veritabanı sorgusu başarısız');
              } else {
                db.query(`UPDATE degerler SET titresim=${Math.floor(Math.random() * 100)}, sicaklik=${Math.floor(Math.random() * 100)} WHERE degerler.makine_id=4`, (err, results) => {
                  if (err) {
                    console.error('Sorgu hatası:', err);
                    res.status(500).send('Veritabanı sorgusu başarısız');
                  } else {
                    db.query(`UPDATE degerler SET titresim=${Math.floor(Math.random() * 100)}, spindle_zorlanmasi=${Math.floor(Math.random() * 100)} WHERE degerler.makine_id=5`, (err, results) => {
                      if (err) {
                        console.error('Sorgu hatası:', err);
                        res.status(500).send('Veritabanı sorgusu başarısız');
                      } else {
                        db.query(`UPDATE degerler SET sicaklik=${Math.floor(Math.random() * 100)}, titresim=${Math.floor(Math.random() * 100)} WHERE degerler.makine_id=6`, (err, results) => {
                          if (err) {
                            console.error('Sorgu hatası:', err);
                            res.status(500).send('Veritabanı sorgusu başarısız');
                          } else {
                              res.json(results);
                            }
                        });
                        }
                    });
                    }
                });
                }
            });
            }
        });
      }
  });
});

// POST isteğine yanıt veren route
app.post('/api/updateDegerler', (req, res) => {
  // POST isteği ile gelen verileri alın
  //const { name, age } = req.body;

    // MySQL sorgusu örneği
    const sqlQuery = `UPDATE degerler SET time=CURRENT_TIMESTAMP`;

    // MySQL sorgusunu çalıştırma
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Sorgu hatası:', err);
        res.status(500).send('Veritabanı sorgusu başarısız');
      } else {

        // MySQL sorgusunu çalıştırma
        db.query('INSERT INTO sonuclar (makine_id,time,spindle_sicakligi,spindle_zorlanmasi,sicaklik,titresim,automatic) SELECT makine_id,time,spindle_sicakligi,spindle_zorlanmasi,sicaklik,titresim,automatic FROM degerler', (err, results) => {
          if (err) {
            console.error('Sorgu hatası:', err);
            res.status(500).send('Veritabanı sorgusu başarısız');
          }
        });


        // MySQL sorgusu örneği
        const sqlQuery = 'SELECT degerler.makine_id,degerler.durum,degerler.time,degerler.spindle_sicakligi,degerler.spindle_zorlanmasi,makineler.makine_adi AS makine_adi,sicaklik,titresim,automatic FROM degerler JOIN makineler ON makineler.makine_id=degerler.makine_id';

        // MySQL sorgusunu çalıştırma
        db.query(sqlQuery, (err, results) => {
          if (err) {
            console.error('Sorgu hatası:', err);
            res.status(500).send('Veritabanı sorgusu başarısız');
          } else {
            res.json(results);
          }
        });



      }
    });

});

// POST isteğine yanıt veren route
app.post('/api/changeesik', (req, res) => {
  // POST isteği ile gelen verileri alın
  //const { name, age } = req.body;
    const postData = req.body?.data;
    // MySQL sorgusu örneği


    switch (postData.machine) {

      case 1: 
        const sqlQuery = `UPDATE esikdegerler SET spindle_sicakligi=${postData.spindle_sicakligi_esik_deger}, spindle_zorlanmasi=${postData.spindle_zorlanmasi_esik_deger} WHERE esikdegerler.makine_id=${postData.machine}`;

        // MySQL sorgusunu çalıştırma
        db.query(sqlQuery, (err, results) => {
          if (err) {
            console.error('Sorgu hatası:', err);
            res.status(500).send('Veritabanı sorgusu başarısız');
          } else {
            // MySQL sorgusu örneği
            const sqlQuery = 'SELECT esikdegerler.makine_id,makineler.makine_adi,esikdegerler.spindle_sicakligi,esikdegerler.spindle_zorlanmasi,esikdegerler.sicaklik,esikdegerler.titresim FROM esikdegerler JOIN makineler ON esikdegerler.makine_id=makineler.makine_id';
    
            // MySQL sorgusunu çalıştırma
            db.query(sqlQuery, (err, results) => {
              if (err) {
                console.error('Sorgu hatası:', err);
                res.status(500).send('Veritabanı sorgusu başarısız');
              } else {
                res.json(results);
              }
            });
          }
        });
      break;

      case 2: 
        

        // MySQL sorgusunu çalıştırma
        db.query(`UPDATE esikdegerler SET spindle_sicakligi=${postData.spindle_sicakligi_esik_deger}, spindle_zorlanmasi=${postData.spindle_zorlanmasi_esik_deger} WHERE esikdegerler.makine_id=${postData.machine}`,
          
          (err, results) => {
          if (err) {
            console.error('Sorgu hatası:', err);
            res.status(500).send('Veritabanı sorgusu başarısız');
          } else {
            // MySQL sorgusu örneği
            const sqlQuery = 'SELECT esikdegerler.makine_id,makineler.makine_adi,esikdegerler.spindle_sicakligi,esikdegerler.spindle_zorlanmasi,esikdegerler.sicaklik,esikdegerler.titresim FROM esikdegerler JOIN makineler ON esikdegerler.makine_id=makineler.makine_id';
    
            // MySQL sorgusunu çalıştırma
            db.query(sqlQuery, (err, results) => {
              if (err) {
                console.error('Sorgu hatası:', err);
                res.status(500).send('Veritabanı sorgusu başarısız');
              } else {
                res.json(results);
              }
            });
          }
        });
      break;

      case 3: 
        // MySQL sorgusunu çalıştırma
        db.query(`UPDATE esikdegerler SET sicaklik=${postData.sicaklik_esik_deger}, titresim=${postData.titresim_esik_deger} WHERE esikdegerler.makine_id=${postData.machine}`,
                  
        (err, results) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.status(500).send('Veritabanı sorgusu başarısız');
        } else {
          // MySQL sorgusu örneği
          const sqlQuery = 'SELECT esikdegerler.makine_id,makineler.makine_adi,esikdegerler.spindle_sicakligi,esikdegerler.spindle_zorlanmasi,esikdegerler.sicaklik,esikdegerler.titresim FROM esikdegerler JOIN makineler ON esikdegerler.makine_id=makineler.makine_id';

          // MySQL sorgusunu çalıştırma
          db.query(sqlQuery, (err, results) => {
            if (err) {
              console.error('Sorgu hatası:', err);
              res.status(500).send('Veritabanı sorgusu başarısız');
            } else {
              res.json(results);
            }
          });
        }
        });
      break;

      case 4: 
        // MySQL sorgusunu çalıştırma
        db.query(`UPDATE esikdegerler SET sicaklik=${postData.sicaklik_esik_deger}, titresim=${postData.titresim_esik_deger} WHERE esikdegerler.makine_id=${postData.machine}`,
                  
        (err, results) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.status(500).send('Veritabanı sorgusu başarısız');
        } else {
          // MySQL sorgusu örneği
          const sqlQuery = 'SELECT esikdegerler.makine_id,makineler.makine_adi,esikdegerler.spindle_sicakligi,esikdegerler.spindle_zorlanmasi,esikdegerler.sicaklik,esikdegerler.titresim FROM esikdegerler JOIN makineler ON esikdegerler.makine_id=makineler.makine_id';

          // MySQL sorgusunu çalıştırma
          db.query(sqlQuery, (err, results) => {
            if (err) {
              console.error('Sorgu hatası:', err);
              res.status(500).send('Veritabanı sorgusu başarısız');
            } else {
              res.json(results);
            }
          });
        }
        });
      break;

      case 5: 
        // MySQL sorgusunu çalıştırma
        db.query(`UPDATE esikdegerler SET spindle_zorlanmasi=${postData.spindle_zorlanmasi_esik_deger}, titresim=${postData.titresim_esik_deger} WHERE esikdegerler.makine_id=${postData.machine}`,
                  
        (err, results) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.status(500).send('Veritabanı sorgusu başarısız');
        } else {
          // MySQL sorgusu örneği
          const sqlQuery = 'SELECT esikdegerler.makine_id,makineler.makine_adi,esikdegerler.spindle_sicakligi,esikdegerler.spindle_zorlanmasi,esikdegerler.sicaklik,esikdegerler.titresim FROM esikdegerler JOIN makineler ON esikdegerler.makine_id=makineler.makine_id';

          // MySQL sorgusunu çalıştırma
          db.query(sqlQuery, (err, results) => {
            if (err) {
              console.error('Sorgu hatası:', err);
              res.status(500).send('Veritabanı sorgusu başarısız');
            } else {
              res.json(results);
            }
          });
        }
        });
      break;

      case 6: 
        // MySQL sorgusunu çalıştırma
        db.query(`UPDATE esikdegerler SET sicaklik=${postData.sicaklik_esik_deger}, titresim=${postData.titresim_esik_deger} WHERE esikdegerler.makine_id=${postData.machine}`,
                  
        (err, results) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.status(500).send('Veritabanı sorgusu başarısız');
        } else {
          // MySQL sorgusu örneği
          const sqlQuery = 'SELECT esikdegerler.makine_id,makineler.makine_adi,esikdegerler.spindle_sicakligi,esikdegerler.spindle_zorlanmasi,esikdegerler.sicaklik,esikdegerler.titresim FROM esikdegerler JOIN makineler ON esikdegerler.makine_id=makineler.makine_id';

          // MySQL sorgusunu çalıştırma
          db.query(sqlQuery, (err, results) => {
            if (err) {
              console.error('Sorgu hatası:', err);
              res.status(500).send('Veritabanı sorgusu başarısız');
            } else {
              res.json(results);
            }
          });
        }
        });
      break;
      default:
    }





    

});

// POST isteğine yanıt veren route
app.post('/api/hatakaydi', (req, res) => {
  // POST isteği ile gelen verileri alın
  //const { name, age } = req.body;
    const postData = req.body?.data;
    // MySQL sorgusu örneği

    const sqlQuery = `INSERT INTO raporlar (rapor_id, makine_id, time, olay_metni) VALUES (NULL, ${postData.makine_id}, CURRENT_TIMESTAMP, '${postData.message}')`;

    // MySQL sorgusunu çalıştırma
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Sorgu hatası:', err);
        res.status(500).send('Veritabanı sorgusu başarısız');
      } else {
        // MySQL sorgusu örneği
        const sqlQuery = 'SELECT * FROM raporlar';

        // MySQL sorgusunu çalıştırma
        db.query(sqlQuery, (err, results) => {
          if (err) {
            console.error('Sorgu hatası:', err);
            res.status(500).send('Veritabanı sorgusu başarısız');
          } else {
            res.json(results);
          }
        });
      }
    });

});

// POST isteğine yanıt veren route
app.post('/api/startstopMachine', (req, res) => {
  // POST isteği ile gelen verileri alın
  //const { name, age } = req.body;
    const postData = req.body?.data;
    
    // MySQL sorgusu örneği
    const sqlQuery = `UPDATE degerler SET durum=${!postData.durum} WHERE degerler.makine_id=${postData.makine_id}`;

    // MySQL sorgusunu çalıştırma
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Sorgu hatası:', err);
        res.status(500).send('Veritabanı sorgusu başarısız');
      } else {
        // MySQL sorgusu örneği
        const sqlQuery = 'SELECT degerler.makine_id,degerler.durum,degerler.time,degerler.spindle_sicakligi,degerler.spindle_zorlanmasi,makineler.makine_adi AS makine_adi,sicaklik,titresim,automatic FROM degerler JOIN makineler ON makineler.makine_id=degerler.makine_id';

        // MySQL sorgusunu çalıştırma
        db.query(sqlQuery, (err, results) => {
          if (err) {
            console.error('Sorgu hatası:', err);
            res.status(500).send('Veritabanı sorgusu başarısız');
          } else {
            res.json(results);
          }
        });
      }
    });
    

});



// Sunucuyu belirtilen portta başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} üzerinde çalışıyor`);
});