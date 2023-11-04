# RN 실습

## ⛳ 강의 듣기 전 먼저 구현

- Todo CRUD (등록, 조회, 수정, 삭제)
- 첫 로딩 Splash 화면
- AsyncStorage 데이터 저장 (새로고침 유지)
- 수정 인풋에 auto focus

## 🧨 작업 중 트러블 슈팅

- TodoInput을 모듈화하는 과정 중 `missed semicolon` 에러 발생
  - 세미콜론이 miss된 곳이 없었고 vscode setting의 semicolon도 모두 체크했지만 해결 x
  - 해결: 조사 후 css.ts에 ${theme.size60} 등의 import해온 style 코드를 넣으면 발생하는 에러란 걸 알게 되어 기존의 '60px' 등으로 다시 수정 <br/>
- forwordRef 관련 경고
  - 다음과 같은 warning이 뜸 <br/>
    <img src="https://github.com/Yena-Yun/RN-Todo-List/assets/68722179/3f329695-3300-4467-bec6-15244c6d2afc" width='400' /> <br/>
  - 해결: TodoInput을 forwardRef로 감싸고 forwardRef 컴포넌트에 props와 ref 두 가지를 인자로 부여 (기존에 interface에 있던 ref를 제거하고 props에만 타입 제공) <br/>
    <img src="https://github.com/Yena-Yun/RN-Todo-List/assets/68722179/e3759e7b-25d2-4e18-b8b1-d244e37f519a" width='500' /> <br/> <br/>
- `렌더링할 데이터.map()`에 `reverse()` 추가 시 발생한 버벅임
  - storageValues.reverse().map()을 통해 todo 항목을 최신부터 렌더링하려고 시도
    - 백엔드나 mock 데이터의 날짜 데이터가 없어서 단순히 등록될 때의 역순으로 데이터 정렬 시도
  - reverse()를 붙인 후 발생한 문제
    - 새로운 todo를 입력할 때 한 글자 칠 때마다 매번 todo 정렬이 바뀜
    - 새로 todo가 추가될 때도 잠깐 기존을 보여줬다가 순식간에 역행으로 바뀜
  - 해결: onCreateTask 함수에서 saveAsyncStorage에 newTodo가 추가되는 위치를 뒤에서 앞으로 옮김 (newTodo가 기존 값(...storageValues)보다 먼저 추가되도록 설정)
    - `saveAsyncStorage([...storageValues, newTodo])` -> `saveAsyncStorage([newTodo, ...storageValues])`

## 🥏 강의에서 새로 배운 점

- SafeAreaView
  - iOS에만 적용 (Android는 x)
  - 아이폰의 notch 디자인(상단에 가려지는 부분)을 피하기 위해 자체적 padding이 들어간 View
  - 가장 바깥 Container에 View 대신 사용
- StatusBar
  - expo와 react-native 두 군데서 모두 제공
  - 실습에서는 react-native의 것을 사용하여 StatusBar의 색상을 바꿈
  - 색상 관련 속성
    - `backgroundColor`: StatusBar의 배경색 변경
    - `barStyle`: StatusBar의 시간, 와이파이 등 글자색 변경 (default, light-content, dark-content 3가지)
- Dimensions
  - 기기마다 다른 width를 부여할 때 사용
  - 현재 기기의 화면 크기를 알 수 있음
  - 다양한 크기의 기기에서 동일한 모습으로 나타날 수 있도록 구현
  - 사용: `const width = Dimensions.get('window').width`로 width를 가져와서 props로 전달하고<br/>
    styled-components에서 `width: ${({ width }) => width - 40}px`(width 타입은 number) <br/>
    => 기기의 양쪽에 동일하게 20px씩 여백이 생김
- useWindowDimensions
  - Dimensions는 고정된 값이라 기기를 회전하면 여백이 안 맞아질 수 있음
  - 화면의 크기가 변경되면 값을 자동으로 업데이트
  - 사용: Dimensions와 유사, `const width = useWindowDimensions().width`로 width를 가져옴
- flex: 1을 통한 스타일링
  - Todo의 각 항목을 구현할 때 IconButton 3개 외에 텍스트 컨텐츠 부분으로 꽉 채우기 위해 부모 Container에 `flex: 1`을 부여
  - 결과: IconButton의 사이즈가 고정되어 있다는 전제 하에, 가운데 입력된 텍스트 영역이 버튼을 제외하고 꽉 채워짐
- TextInput의 onBlur 속성
  - 인풋의 바깥쪽을 눌렀을 때 실행할 함수를 넣어서 사용
  - 예: Edit 인풋 입력 중 Add 인풋 터치 시 Edit 입력 초기화 (반대도 마찬가지)
- AsyncStorage
  - RN의 로컬스토리지
  - string 타입의 key: value 데이터를 기기에 **비동기**로 저장하고 불러옴
  - 비동기로 동작하기 때문에 async/await(+ try/catch) 필요
  - 앱을 처음 켰을 때나 새로고침 시 데이터 유지
