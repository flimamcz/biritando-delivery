# Biritando 🍺

### Aprendizados Técnicos

 - Criar API RESTful usando Node.js e Express ;
 - Utilizar arquivos estáticos usando o Express;
 - Gerenciar um banco de dados SQL usando Sequelize ;
 - Autenticar usuários usando JWT ;
 - Requisições para nossa API usando Axios ;
 - Gerenciar o estado do aplicativo usando context api ;
 - localStorage para manter os dados;

## Endpoints

 ### GET <b>/user</b>
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
   
   
   ### GET <b>/seller</b>
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
   
   ### GET <b>/customer/products</b>
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
   
   ### GET <b>/customer/orders
   - Lista todos os pedidos registrados do usuário
  
   
   ### POST <b>/register</b>
   - Body Obrigatório
   ```
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "some_strong_password"
    }
   
   ```
   
   ### POST <b>/login</b>
   - Body Obrigatório
   ```
    {
      "email": "johndoe@example.com",
      "password": "some_strong_password"
    }
   
   ```
  
  ## Tecnologias utilizadas
  
   - <p><a href="https://react.dev/" target="_blank">React</a></p>
   - <p><a href="https://axios-http.com/ptbr/" target="_blank">Axios</a></p>
   - <p><a href="https://nodejs.org/en/about" target="_blank">NodeJS</a></p>
   - <p><a href="https://expressjs.com/" target="_blank">Express</a></p>
   - <p><a href="https://sequelize.org/" target="_blank">Sequelize</a></p>
   - <p><a href="https://www.mysql.com/" target="_blank">Mysql</a></p>
   - <p><a href="https://jwt.io/" target="_blank">JWT</a></p>
  
  ## Iniciando o projeto
  
   - Pré-requisitos
     - Node (> 16)
     - Mysql (Local ou container docker) - Aprenda a configurar via docker <a href="#tutorial-docker-mysql">Aqui</a>
  - 1 Clone o projeto
  
    ```
      git clone git@github.com:flimamcz/biritando-delivery.git
    ```
  
  - 2 Entre na pasta do projeto
  
    ```
      cd biritando-delivery/
    ```
  - 3 Instale as depedências na pasta raiz
  
     ```
        npm install
     ```
  
  - 4 Entre na pasta front-end e instale as depedências
  
    ```
       cd front-end && npm install
    ```
  
  - 5 Entre na pasta back-end e instale as depedências
  
    ```
       cd back-end && npm install
    ```
  
  - 6 E por último na pasta raiz execute o seguinte comando
  
    ```
       npm run pretest
    ```
   
