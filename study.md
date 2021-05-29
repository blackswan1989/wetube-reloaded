<br>

# Nomadcoders - Wetube Clone Study File [1]

<br>
<br>

## #1.0 ~ #2.4

- NodeJS는 javascript를 브라우저 밖에서 사용하게 해준다.
- Express는 NodeJS를 사용하여 쉽게 서버를 구성할 수 있게 만든 프레임워크(클래스와 라이브러리의 집합체)이다.
- Babel은 최신 문법을 구문법으로 변환시켜준다.
- Nodemon은 파일 변화를 감지하여 서버를 자동으로 재시작 시켜준다.

<br>
<br>

## #3.0 ~ #3.11

1. `Request` : 서버에 대한 요청으로 http request는 웹사이트에 접속하고 서버에 정보를 보내는 방법이다.
2. `Response` : 서버의 요청에 대한 응답
3. `GET` : HTTP method (HTTP는 서버와 소통하는 방법중 하나이다.)
4. `/` : 서버의 root 또는 첫 페이지
5. Middileware : 브라우저가 request에서 response로 넘어가는 사이의 모든 controller(handler)를 의미 한다.

<br>

- express의 route handler의 object 두가지는 `request`와 `response`가 있다. 네이밍은 보통 `(req, res)`로 작성해 준다.
  
  ```
  const handleHome = (req, res) => 
  {
    return res.send("<h1>Home</h1>");   // requset를 받으면 그에 대한 return을 해주어야 한다.
  }

  app.get("/", handleHome);             // (root, callback)
  ```

<br>

- 모든 handler는 controller라고 할 수 있으며, 모든 controller는 middleware가 될 수 있다.

  ```
  // testMiddleware는 route(req)와 handleHome(res) 사이의 middleware이다.
  const testMiddleware = (req, res, next) => 
  { 
    console.log(`going to: ${req.url}`);    // [LOG] going to: /
    next();                                 // next함수는 testMiddleware 다음인 handleHome을 실행시켜준다.
  }

  const handleHome = (req, res, next) => 
  { 
    return res.send("<h1>Home</h1>");       // handleHome 다음엔 아무것도 없기 때문에 next를 사용할 수 없다.
  }

  app.get("/", testMiddleware, handleHome); // (root, middleware ,callback)
  ```

<br>

- Middleware 의 활용

  ```
  const privateMiddleware = (req, res, next) => 
  { 
    const url = req.url;
    
    if(url === "/protected")                      // url 주소가 protected 일때 return 시키며 Not Allowed 를 표시한다.
      return res.send("<h1>Not Allowed</h1>")
    
    console.log("Allowed, you may countinue.")    // return되지 않을 때 출력되고 next()로 넘어간다.
    next()
  }

  const handleProtected = (req, res) => 
  { 
    return res.send("<h1>Welcome to the private lounge.</h1>") 
  }

  app.use(logger,);                       // (middleware)
  app.use(privateMiddleware);             // (middleware)
  app.get("/", handleHome);               // (root ,callback)
  app.get("/protected", handleProtected); // (root, callback)
  ```