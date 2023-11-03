# RN-Todo-List
리액트 네이티브 실습

## 강의 듣기 전 구현해본 내용
* Todo CRUD (등록, 조회, 수정, 삭제)
* 첫 로딩 Splash 화면
* AsyncStorage 데이터 저장 (새로고침 유지)
* 수정 인풋에 auto focus

## 강의를 들으면서 새로 배운 점
* SafeAreaView
  * iOS에만 적용 (Android는 x)
  * 아이폰의 notch 디자인(상단에 가려지는 부분)을 피하기 위해 자체적 padding이 들어간 View
  * 가장 바깥 Container에 View 대신 사용
* StatusBar
  * expo와 react-native 두 군데서 모두 제공
  * 실습에서는 react-native의 것을 사용하여 StatusBar의 색상을 바꿈
  * 색상 관련 속성
    * `backgroundColor`: StatusBar의 배경색 변경
    * `barStyle`: StatusBar의 시간, 와이파이 등 글자색 변경 (default, light-content, dark-content 3가지)
* Dimensions
  * 기기마다 다른 width를 부여할 때 사용
  * 현재 기기의 화면 크기를 알 수 있음
  * 다양한 크기의 기기에서 동일한 모습으로 나타날 수 있도록 구현
  * 사용: `const width = Dimensions.get('window').width`로 width를 가져와서 props로 전달하고<br/>
   styled-components에서 `width: ${({ width }) => width - 40}px`(width 타입은 number) <br/>
   => 기기의 양쪽에 동일하게 20px씩 여백이 생김
* useWindowDimensions
  * Dimensions는 고정된 값이라 기기를 회전하면 여백이 안 맞아질 수 있음
  * 화면의 크기가 변경되면 값을 자동으로 업데이트
  * 사용: Dimensions와 거의 비, `const width = useWindowDimensions().width`로 width를 가져옴
* flex: 1
  * Todo의 각 항목을 구현할 때 IconButton 3개 외에 텍스트 컨텐츠 부분으로 꽉 채우기 위해 부모 Container에 flex: 1을 부여
  * IconButton의 사이즈가 고정되어 있다는 전제 하에, 가운데 입력된 텍스트 영역이 버튼을 제외하고 꽉 채워짐

## 트러블 슈팅
* TodoInput을 모듈화하는 과정 중 `missed semicolon` 에러가 발생했다.
  * 세미콜론이 miss된 곳을 도저히 찾을 수 없었고 vscode 세미콜론 setting도 해봤지만 소용 없었다.
  * 해결: css.ts에 ${theme.size60} 등의 import해온 style 코드를 넣으면 발생한다는 걸 알게 되어 '60px' 등으로 다시 수정했다.
* forwordRef 관련
  * 다음과 같은 warning이 떠서 TodoInput을 forwardRef로 감쌌다. <br/>
    <img src="https://github.com/Yena-Yun/RN-Todo-List/assets/68722179/3f329695-3300-4467-bec6-15244c6d2afc" width='400' /> <br/>
  * forwardRef는 반드시 props와 ref 두 가지만 인자로 줘야 했다.
  * 기존의 ref를 포함했던 interface에서 ref를 제거하고 props에만 타입을 주었다. <br/>
    <img src="https://github.com/Yena-Yun/RN-Todo-List/assets/68722179/e3759e7b-25d2-4e18-b8b1-d244e37f519a" width='500' /> <br/>


