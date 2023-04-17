 ## GET <b>/user</b>
  - Lista todos os usuários registrados.
   ```
        [
          {
            "id": 1,
            "name": "Delivery App Admin",
            "email": "adm@adm.com",
            "role": "administrator"
          },
          {
            "id": 2,
            "name": "Fulana Pereira",
            "email": "seller@deliveryapp.com",
            "role": "seller"
          }
        ]
   ```
   
   
   ## GET <b>/seller</b>
  - Lista todos os vendedores registrados.
   ```
        [
          {
            "id": 1,
            "name": "Delivery App Admin",
            "email": "seller1@seller.com",
            "role": "seller"
          },
          {
            "id": 2,
            "name": "Fulana Pereira",
            "email": "selle2r@selle2r.com",
            "role": "seller"
          }
        ]
   ```
   
   ## GET <b>/customer/products</b>
  - Lista todos os produtos registrados.
   ```
  [     
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "urlImage": "http://localhost:3001/images/skol_lata_350ml.png"
    },
    {
      "id": 2,
      "name": "Heineken 600ml",
      "price": "7.50",
      "urlImage": "http://localhost:3001/images/heineken_600ml.png"
    }
  ]
   ```
   
   
   # POST <b>/register</b>
   - Body Obrigatório
   ```
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "some_strong_password"
    }
   
   ```
   
   # POST <b>/login</b>
   - Body Obrigatório
   ```
    {
      "email": "johndoe@example.com",
      "password": "some_strong_password"
    }
   
   ```
