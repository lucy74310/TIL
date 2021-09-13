## Front - React Js

### 1. React Js 란 
- 프레임워크가 아니라 라이브러리
- Component 로 이루어져있다.
    - module과 비슷하게 재사용성이 뛰어남 (컴포넌트만 가져가면 다른 APP에서 사용)
- Virtual Dom
    - Real Dom : 10 개의 리스트 -> 그중 한가지 Update -> 전체 리스트 reload
    - Virtual Dom : 10 개의 리스트 -> 그중 한가지 Update -> 하나만 reload (갖고 있는 property는 같다. Real Dom 을 가볍게 복사한게 Virtual Dom) 
      - Diffing 과정
        1. Virtual Dom이 Real Dome 의 스냅샷을 찍어논다.
        2. 리스트 하나 Update 
        3. Virtual Dom이 하나하나를 살펴보면서, 스냅샷 찍어논거랑 지금 상태랑 차이를 분석해서 바뀐 부분을 찾는다. 
        4. 바뀐 부분만 Real Dom에서 바꿔준다. 

### 2. Create React App

- cli command : create-react-app 
  - 쓰는 이유 : webpac이나 babel 같은 것을 직접 하나하나 설정할 필요 없이 자동으로 설정을 다 해준다.
    - Babel : 자바스크립트 ES6, ES7 등 해마다 추가되는 JS 메소드들, 추가된 메소드들 옛날 브라우저에서 작동안될 수도 있는데, 최신 자바스크립트 문법을 사용하여도 구형 부라우저에서 돌수 있도록 ES5 문법으로 변환시켜 주는것
    - Webpack : 이전에 비해 다양한 라이브러리/모듈, 복잡한 구조를 가진 JS 프로젝트 -> 간단하게 만들어주는(묶어주는) 역할. 

```
npx create-react-app
```

- npm VS npx
  - What is npm ? (Node Package Manager) 
    - registry 역할 (라이브러리들을 담고있는 역할)
    - application build 할 때 사용

    - 원래는 npm install -g create-react-app 
      - 디렉토리에 node_modules에 다운 
      - -g : global 디렉토리에 다운 
        - /usr/local/bin on Linux
        - \AppData\npm on Windows

  - What is npx ? 
    - npm registry에 있는 것을 찾아서 다운로드 없이 실행시켜줌
      (npm 글로벌로 다운받을 필요 없어짐)
      1. 글로벌로 각자 머신에 받을 필요 없음 -> Disk 절약
      2. 항상 최신 버전 사용 



### 3. Create React App Structure

- 기본구조 
```
README.md
> node_modules
package.json
> public
  index.html // public 하위 파일은 오직 index.html에서만 쓸수있음
> src
  App.js
  index.js
  index.css
  ...
```

  - Webpack 이 관리하는 부분 : src 
    - 이미지 파일을 public 이 아닌 src 에 넣어야 Webpack이 관리해줌


### 4. Bolier Plate Structure
- 변경 구조 
  ```
  > _actions // Redux
  > _reducer // Redux
  > components
    > views // Page
      > Footer
      > LandingPage
      > LoginPage 
      > NavBar
      > RegisterPage   
  App.js // Routing 
  Config.js // Environment Variable
  > hoc // Higher Order Component 컴포넌트 안에 다른 컴포넌트를 갖는 function ex] 권한여부체크
  > utils // 여러군데서 호출되는 기능
  index.js
  package.json
  > public
    index.html // public 하위 파일은 오직 index.html에서만 쓸수있음
  > src
    App.js
    index.js
    index.css
    ...
  ```

- 기본컴포넌트 : rfce 단축키 (VS Code > ES7 React/Redux ... snippets 다운)

### 5. React Routing

- 페이지 이동시 React Router Dom 사용
https://reactrouter.com/web/guides/quick-start
```
npm install react-router-dom --save
```

App.js -> Routing

### 6. Data Flow (AXOIS)

- axios 라이브러리 (jquery의 ajax)
 ``` 
          request
          ------> 
  client  [axios] server
          <------     
          response
          
  

cd client
npm install axios --save
```

- server/client port 다름 -> CORS issue 
  ```              
  domain-a.com ---------> domain-a.com  (O)
               <--------  

  domain-a.com ---------> domain-b.com  (x)
               <--------
  ```
  - Proxy 를 통해 해결하기 

  ```
  npm install http-proxy-middleware --save
  ```
 - setupProxt.js
  https://create-react-app.dev/docs/proxying-api-requests-in-development/


 - ProxyServer ? 
    ```
                -------->                   -------->
          User                PROXY SERVER                INTERNET
                <--------                   <--------
   ```
    1. 방화벽
    2. 웹필터
    3. 캐시, 공유데이터 제공
   



### 7. Front, Back 한번에 키기 (concurrently)
```
cd client
npm install concurrently --save
```

- server project > package.json > scripts
  ```
  "scripts": {
      ...
      "dev": "concurrently \"npm run watch\" \"npm run start --prefix ../client\""
      ...
    },
  ```



### 8. Css Framework 
- Ant Design 
  https://ant.design/
  
  ```
  cd client
  npm install antd --save
  ```

### 9. Redux

- Redux ? predictable state container 상태관리 라이브러리 
- Props VS State
  - Props 
    - 컴포넌트간 주고받음 (부모 -> 자식)
    - 부모컴퍼넌트에서 자식에게 전달한 value는 자식컴포넌트에서 변할수 없음 (immutable) -> 다시 부모가 내려줘야 함
      ````
      <ChatMessages
        messages={messages}
        currntMmber={member}
      />
      ````
  - State
    - muttable 
      - 컴포넌트 안에서 변하게 할 수 있음 (변하면서 rerendering)
      ```
      state = {
        message: '',
        attachFile: undefined,
        openMenu: false
      }
      ```

- Redux 는 State 관리 툴 
  ```
  ex ] 여러 컴포넌트에서 Comment 라는걸 접근중 
  - Comment의 State 최상위 컴포넌트에서 관리됨 
  - 하위 컴포넌트에서 Comment에 action이 발생하면 최상위 컴포넌트에 알려주기 위해서 하나하나 상위컴포넌트로 타고 올라가야 함 
  - 상위컴포넌트에 두지 않고 Redux Store에 저장해 놓으면, 바로 접근할 수 있다. 
  ```



#### Redux Data Flow (strict unidirectional - 단방향)

```
  ACTION ------------> REDUCER -------------> STORE
    |                                           |
    <-------------- REACT COMPONENT <-----------              
        DISPATCH                      SUBSCRIBE   
```

- ACTION 
  - 무엇이 일어났는지 설명 
  - Object 형태
  ```
  { type: 'LIKE_ARTICLE', articleId: 42 }
  { type: 'ADD_TODO', text: "Read the Redux docs" }
  ```


- REDUCER
  - "ACTION을 함으로 인해서 STATE가 A -> B 로 변했다" 라는걸 설명해주는 곳 
  ```
  (previousState, action) => nextState

  previousState 과 action object 받은 후 nextState return
  ```

- STORE
  - APP의 전체 STATE 을 감싸주는 역할
    - 여러 메소드들을 이용해서 STATE 관리 

#### Redux 설정하기 

- Dependencies
  1. redux
  2. react-redux
  3. redux-promise (redux middleware)
  4. redux-thunk (redux middleware)


- redux-promise, redux-thunk 설치이유 
  - redux 잘쓸수있게 도와줌 
  - redux store 안에 모든 state 관리
    -> store의 state 변경하려면 Dispatch를 통해 action 으로 변경시킴
    -> action은 plain object 형태 
      - BUT, store에서 항상 객체 형태로 받는게 아니라, 
        promise, function 등 형태로 받을때도 있음. 그럼 redux store가 받지 못함 
        - redux-thunk : dispatch한테 function 받는 방법 알려줌
        - redux-promise : dispatch한테 promise 받는 방법 알려줌



- redux dev tools (google extension)


- Combine Reduer ?? 
  - Reducer가 나눠져 있는데, combineReducer를 이용해서 Root Reducer에서 하나로 합쳐줌 


### 10. React Hook / Class Component & Functional Component

#### React Component 
1. Class Component
```
import React, { Component } from 'react'

class Hello extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default
```
  - 더 많은 기능 사용 가능
  - 코드가 김
  - 복잡해짐
  - 성능 느려짐

2. Functional Component
```
import React, { Component } from 'react'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
export default

```
  - 제공기능이 한정적
  - 코드 간단
  - 성능이 좀더 좋음



#### https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

- 페이지 킬때 어떤 순서로 시작이 되는지
- 생성/ 업데이트/ 종료 --> functional 컴포넌트에서 사용 불가 
  ->대부분 Class 컴포넌트 사용  
  -> react 16.8 에서 Hook 발표 
  -> Functional Component에서도 lifecycle 적용 


- State 초기화

  - class
  ```
  constructor(props) {
    super(props)
    this.state = { name: "" };
  }
  ```

  - functional
  ```
  const [Name, setName] = useState("")
  ```

- componentDidMount => useEffect

  - class
  ```
  componentDidMunt() {
    Axios.~~~
  }
  ```
  - functional
  ```
  useEffect(() => {
    Axio.~~~
  })
  ```


### 11. Login PAGE
- 간단하게 ( <-> Formik, Yup 라이브러리 사용할수도 있음.)
email -> password -> confirm 

### 12. Logout Page

### 13. 인증 (HCO)

인증이 있어야만 들어갈 수 있는 페이지 

Higher Order Component : function 임. <br>
    ㄴ 다른 컴포넌트를 받은 다음에 새로운 컴포넌트를 리턴하는 function
    

    ------------------------------------------------------------------------
    | Auth (HOC) ---> Server에서 유저 상태정보 get -> 자격 x --> 다른 페이지  |
    |    -------------------------------------       자격 O                 | 
    |    |                                   |          |                   |
    |    |    LOGGED IN COMPONENT            |  <--------                   |
    |    |      (Admin, Landing)             |                              |
    |    -------------------------------------                              |
    -------------------------------------------------------------------------
        
        1. Auth 컴포넌트가 백앤드에 request 를 날려서
        Landing page에 들어와 있는 유저의 상태정보를 가져온다.
        ex ) 로그인 유저인가, 어드민 유저인가 등 
        2. 자격이 안되면 다른페이지로 보냄

    - HOC 를 작성하고 그 안에 컴포넌트를 넣어주는 방법 
        1. App.js
        2. 안에넣을 컴포넌트를 Auth( ) 로 감싸준다.
            ```
            <Route exact path="/" component={Auth(LandingPage)}></Route>
            ```
        
